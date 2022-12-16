import { Injectable } from '@angular/core';
import { viewType,stepType,recordType,xoType } from "./gamemodel.model";
@Injectable({
  providedIn: 'root'
})
export class GameService {
  /*
    gameID 該局遊戲ID
    allID 紀錄中所有遊戲ID
    mode  模式名稱
    step 遊戲步數
    result 遊戲狀態 0:勝負未分 1:O獲勝 -1:X獲勝 2:平手
    allRecords 所有遊戲紀錄
    gameRecords 該局遊戲紀錄
    gameStep 紀錄該局遊戲紀錄
    recordStep 紀錄狀態時的遊戲步數
  */
  gameID:number
  recordID:string
  allID:string[]
  mode:string
  step:number
  result:number
  allRecords:recordType
  gameRecords:stepType[]
  gameStep:stepType[]
  recordStep:number

  constructor() {
    this.recordID = ''
    this.gameID = 0
    this.allID = []
    this.result = 0
    this.recordStep = 0
    this.gameRecords = []
    this.allRecords = {}
    this.mode = ''
    this.step = 0
    this.gameStep = []
  }
  // 拿取模式
  getMode() {
    return this.mode
  }
  // 設定模式
  setMode(name: string) {
    this.mode = name
  }
  // 重置模式
  clearMode() {
    this.mode = ''
  }
  // 玩家點擊時紀錄
  playerCilck(place:number,size:string) {
    // 已有勝負時不可點擊
    if(this.result) return

    this.step++
    if(this.step % 2 == 1) {
      this.gameStep.push({wherePlace: place,content: 1,useSize:size,stepID:this.step})
      return 1
    } else {
      this.gameStep.push({wherePlace: place,content: -1,useSize:size,stepID:this.step})
      return -1
    }
  }
  // 判斷是否可放入當前格子
  ableClick(oData:xoType[],xData:xoType[],sign:string,where:number,viewData:viewType) {
    // 檢查模式、結果、是否選擇尺寸
    if(this.mode === 'record' || this.result !== 0 || (where === -1)) return false
    // 檢查數量、是否點擊敵對格或空白格
    const canClickO = (oData[where].amount > 0) && (sign === "O") && (viewData.data <= 0)
    const canClickX = (xData[where].amount > 0) && (sign === "X") && (viewData.data >= 0)
    
    return (sign === "O") ? canClickO : canClickX
  }
  // 是否能覆蓋
  canCover (nowSign:string,oData:xoType[],xData:xoType[],viewWeight:number) {
    const choseWeight = (nowSign === "O" ? oData.find((item) => item.isChose)?.weight : xData.find((item) => item.isChose)?.weight) || 0
    return choseWeight > viewWeight
  }
  // 拿取畫面權重
  getViewWeight (nowSign:string,oData:xoType[],xData:xoType[]) {
    return (nowSign === 'O' ? oData.find((item) => item.isChose)?.weight : xData.find((item) => item.isChose)?.weight) || 0
  }
  // 判斷勝負
  judgeVictory(viewData:viewType[],oData?:xoType[],xData?:xoType[]) {
    this.result = 0
    const condition1 = Math.abs(viewData[0].data + viewData[4].data + viewData[8].data)
    const condition2 = Math.abs(viewData[2].data + viewData[4].data + viewData[6].data)
    this.result = ((condition1 === 3) || (condition2 === 3)) ? viewData[4].data : this.result

    for(let i = 0 ;i<3; i++) {
      const condition3 = Math.abs(viewData[3*i].data + viewData[3*i+1].data + viewData[3*i+2].data)
      const condition4 = Math.abs(viewData[i].data + viewData[i+3].data + viewData[i+6].data)
      this.result = (condition3 === 3) ? viewData[3*i].data : (condition4 === 3)
        ? viewData[i].data : this.result
    }
    // 計算對戰或紀錄模式時平手條件
    if(oData && xData) {
      // 整合OX資料
      let allArr = oData.concat(xData)
      // 畫面上最小重
      let minViewWeight = Math.min(...viewData.map(item => item.weight))
      // 選擇欄位剩餘的最大重
      let maxChoseWeight = Math.max(...allArr.filter(item => item.amount > 0).map(item => item.weight))
      // 選擇欄位剩餘數量
      let count = allArr.reduce((acc, item) => acc + item.amount,0)
      // 選擇欄位剩餘數量等於零和勝負未分 選擇欄位剩餘的最大重等於畫面上最小重和勝負未分 是平手
      if(((count === 0) && (this.result === 0)) || ((minViewWeight === maxChoseWeight) && (this.result === 0))) this.result = 2
    } else if(!this.gameRecords[this.recordStep] && this.result === 0) this.result = 2

    if((this.result !== 0) && (this.mode === 'battle')) this.noteGame()
  
  }
  // 拿取勝利者
  getWin() {
    return this.result
  }
  //重置遊戲
  resetGame() {
    this.step = 0
    this.recordStep = 0
    this.result = 0
  }
  //記錄此次遊戲，只記錄有分勝敗的局，最多5筆
  noteGame() {
    if((this.gameStep.length === 0) || (this.result === 0)){
      this.gameStep = []
      return
    }

    this.allRecords[this.gameID] = this.gameStep
    if(Object.keys(this.allRecords).length > 5) delete this.allRecords[Object.keys(this.allRecords)[0]]

    localStorage.setItem('record', JSON.stringify(this.allRecords))

    this.gameStep = []
  }
  // 執行紀錄
  actionRecord(stepVal:number,viewData:viewType[]) {
    switch (stepVal) {
      case 1: {
        if((this.recordStep === this.gameRecords.length)) return

        viewData[this.gameRecords[this.recordStep].wherePlace].data = this.gameRecords[this.recordStep].content
        viewData[this.gameRecords[this.recordStep].wherePlace].size = this.gameRecords[this.recordStep].useSize
        this.recordStep += stepVal
        this.judgeVictory(viewData)
        break
      }
      case -1: {
        if((this.recordStep < 1)) return

        this.recordStep += stepVal
        // 拿取這在此步驟之前(不包括自己)所有修改位置陣列
        const place = this.gameRecords.slice(0,this.recordStep).map((item)=> item.wherePlace)
        // 此步驟之前所有修改位置(不包括自己)有修改此位置的紀錄時才還原成再上一次修改的同一格的OX
        if(place.includes(this.gameRecords[this.recordStep].wherePlace)) {
          // 取同位置上一次的修改紀錄
          const lastRecord = this.gameRecords.filter((item) => (item.wherePlace === this.gameRecords[this.recordStep].wherePlace) && (item.stepID < this.gameRecords[this.recordStep].stepID)).pop()
          viewData[this.gameRecords[this.recordStep].wherePlace].data = lastRecord?.content || 0
          viewData[this.gameRecords[this.recordStep].wherePlace].size = lastRecord?.useSize || ''
        } else {
          viewData[this.gameRecords[this.recordStep].wherePlace].data = 0
          viewData[this.gameRecords[this.recordStep].wherePlace].size = ''
        }
        
        this.judgeVictory(viewData)
        break
      }
    }
    return viewData
  }
  // 設定遊戲ID
  setGameID() {
    // 判斷新增ID時不能和歷史紀錄的ID相同
    do {  
      this.gameID++
    } while(this.getAllID().map((item) => parseInt(item)).includes(this.gameID))
  }
  // 拿取遊戲ID
  getGameID() {
    return this.gameID
  }
  // 拿取所有遊戲ID
  getAllID() {
    this.allID = Object.keys(this.allRecords)
    return this.allID
  }
  // 拿取選擇的紀錄
  getChose(id:string) {
    this.recordID = id
    this.gameRecords = this.allRecords[id]
  }
  // 拿取紀錄ID
  getRecordID() {
    return this.recordID
  }
  // 拿取本地端的紀錄
  setRecord(localData:recordType) {
    this.allRecords = localData
  }
}
