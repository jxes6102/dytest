import { Injectable } from '@angular/core';
import { viewType,stepType,recordType,xoType,viewData,selectData } from "./gamemodel.model";
import { Router,ActivatedRoute, TitleStrategy } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  /*
    gameID 該局遊戲ID
    recordID 紀錄模式時的遊戲ID
    allID 紀錄中所有遊戲ID
    mode  模式名稱
    step 遊戲步數
    result 遊戲狀態 0:勝負未分 1:O獲勝 -1:X獲勝 2:平手
    allRecords 所有遊戲紀錄
    gameRecords 該局遊戲紀錄
    gameStep 紀錄該局遊戲紀錄
    recordStep 紀錄狀態時的遊戲步數
    markO markX 定義符號
    alertMessage 提示訊息
    xData and oData 選擇視窗資料
    viewData  畫面資料 styleName識別所點區域 data紀錄圈叉 sizeOX大小

    同樣意義的資料 不要存放在多個地方
  */
  // Records : Map<String,stepType[]> = new Map();
  gameID:number
  recordID:string
  mode:string
  step:number
  result:number
  allID:string[]
  testallRecords:object[]
  allRecords:recordType
  gameRecords:stepType[]
  gameStep:stepType[]
  recordStep:number
  markO:string
  markX:string
  alertMessage:string
  xData:xoType[] = new selectData().getData
  oData:xoType[] = new selectData().getData
  viewData:viewType[] = new viewData().getData

  constructor(private router: Router,private route: ActivatedRoute) {
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
    this.markO = "O"
    this.markX = "X"
    this.alertMessage = ''
    this.testallRecords = []

  }
  // 拿取符號
  getMarkO () {
    return this.markO
  }
  getMarkX () {
    return this.markX
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
  // 確認此回合的標誌 
  getNowSign() {
    return (this.step % 2 === 0) ? this.markO : this.markX
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
  ableClick(where:number,viewData:viewType) {
    const nowSign = this.getNowSign()
    // 檢查模式、結果、是否選擇尺寸
    if(this.mode === 'record' || this.result !== 0 || (where === -1)) return false
    // 檢查數量、是否點擊敵對格或空白格
    const canClickO = (this.oData[where].amount > 0) && (nowSign === this.markO) && (viewData.data <= 0)
    const canClickX = (this.xData[where].amount > 0) && (nowSign === this.markX) && (viewData.data >= 0)

    return (nowSign === this.markO) ? canClickO : canClickX
  }
  // 是否能覆蓋
  canCover (viewWeight:number) {
    const nowSign = this.getNowSign()
    const choseWeight = (nowSign === this.markO ? this.oData.find((item) => item.isChose)?.weight : this.xData.find((item) => item.isChose)?.weight) || 0
    return choseWeight > viewWeight
  }
  // 拿取畫面權重
  getViewWeight () {
    const nowSign = this.getNowSign()
    return (nowSign === this.markO ? this.oData.find((item) => item.isChose)?.weight : this.xData.find((item) => item.isChose)?.weight) || 0
  }
  // 判斷勝負
  judgeVictory() {
    this.result = 0
    const condition1 = Math.abs(this.viewData[0].data + this.viewData[4].data + this.viewData[8].data)
    const condition2 = Math.abs(this.viewData[2].data + this.viewData[4].data + this.viewData[6].data)
    this.result = ((condition1 === 3) || (condition2 === 3)) ? this.viewData[4].data : this.result

    for(let i = 0 ;i<3; i++) {
      const condition3 = Math.abs(this.viewData[3*i].data + this.viewData[3*i+1].data + this.viewData[3*i+2].data)
      const condition4 = Math.abs(this.viewData[i].data + this.viewData[i+3].data + this.viewData[i+6].data)
      this.result = (condition3 === 3) ? this.viewData[3*i].data : (condition4 === 3)
        ? this.viewData[i].data : this.result
    }

    // 計算對戰或紀錄模式時平手條件
    if(this.mode === 'battle') {
      // 當前選擇欄位剩餘最大重
      const target = (this.step % 2 === 0) ? this.oData.filter(item => item.amount > 0).map(item => item.weight) : this.xData.filter(item => item.amount > 0).map(item => item.weight)
      const maxChoseWeight = Math.max(...(target.length ? target : [0]))
      // 畫面敵對和空白最小重
      const minViewWeight = (this.step % 2 === 0) ? Math.min(...this.viewData.filter((item) => item.data !== 1).map(item => item.weight)) :
      Math.min(...this.viewData.filter((item) => item.data !== -1).map(item => item.weight))
      // 選擇欄位剩餘數量
      const count = this.oData.concat(this.xData).reduce((acc, item) => acc + item.amount,0)
      // 選擇欄位剩餘數量等於零和勝負未分 當前選擇欄位剩餘的最大重大於等於畫面上敵對和空白格最小重和勝負未分 是平手
      if(((count === 0) && (this.result === 0)) || ((minViewWeight >= maxChoseWeight) && (this.result === 0))) this.result = 2

    } else if(!this.gameRecords[this.recordStep] && this.result === 0) this.result = 2

    if((this.result !== 0) && (this.mode === 'battle')) this.noteGame()

  }
  // 拿取勝利者
  getWin() {
    return this.result
  }
  //重置遊戲
  resetGame() {
    this.gameStep = []
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
    this.testallRecords.push(this.gameStep)
    this.allRecords[this.gameID] = this.gameStep
    // 超過記錄上限時刪除
    const idArr = this.getAllID()
    if(idArr.length > 5 || this.testallRecords.length > 5) {
      this.testallRecords.shift()
      delete this.allRecords[idArr[0]]
    }
    console.log('this.testallRecords', this.testallRecords)
    console.log('JSON',JSON.stringify(this.testallRecords))
    localStorage.setItem('test', JSON.stringify(this.testallRecords))
    localStorage.setItem('record', JSON.stringify(this.allRecords))

    this.gameStep = []
  }
  // 執行紀錄
  actionRecord (stepVal:number) {
    switch (stepVal) {
      case 1: {
        if((this.recordStep === this.gameRecords.length)) return

        this.viewData[this.gameRecords[this.recordStep].wherePlace].data = this.gameRecords[this.recordStep].content
        this.viewData[this.gameRecords[this.recordStep].wherePlace].size = this.gameRecords[this.recordStep].useSize
        this.recordStep += stepVal
        this.judgeVictory()
        break
      }
      case -1: {
        if((this.recordStep < 1)) return

        this.recordStep += stepVal
        // 拿取這在此步驟之前(不包括自己)所有修改位置陣列
        const place = this.gameRecords.slice(0,this.recordStep).map((item)=> item.wherePlace)
        // 有修改此位置的紀錄時才還原成在上一次修改的同一格的OX
        if(place.includes(this.gameRecords[this.recordStep].wherePlace)) {
          // 取同位置上一次的修改紀錄
          const lastRecord = this.gameRecords.filter((item) => (item.wherePlace === this.gameRecords[this.recordStep].wherePlace) && (item.stepID < this.gameRecords[this.recordStep].stepID)).pop()
          this.viewData[this.gameRecords[this.recordStep].wherePlace].data = lastRecord?.content || 0
          this.viewData[this.gameRecords[this.recordStep].wherePlace].size = lastRecord?.useSize || ''
        } else {
          this.viewData[this.gameRecords[this.recordStep].wherePlace].data = 0
          this.viewData[this.gameRecords[this.recordStep].wherePlace].size = ''
        }

        this.judgeVictory()
        break
      }
    }
  }
  // 設定遊戲ID
  setGameID() {
    this.gameID = Date.now()
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
  setRecord() {
    const local = JSON.parse(localStorage.getItem('record') || '{}')
    if(local) this.allRecords = local
    // console.log('this.allRecords ',this.allRecords)
    const test = JSON.parse(localStorage.getItem('test') || '{}')
    if(test) this.testallRecords = test
    console.log('testallRecords',this.testallRecords)
    
  }
  // 拿取遊戲步數
  getStep () {
    return this.step
  }
  //選擇模式畫面動作
  choseMode (modeName:string) {
    if((!this.getAllID().length) && (modeName === 'record')){
      this.alertMessage = 'Record is null !!'
      return
    }

    this.mode = modeName
    this.alertMessage = ''
    if(this.mode === 'battle') this.router.navigate(['/game'])
  }
  // 拿取提示訊息
  getAlertMessage () {
    return  this.alertMessage
  }
  // 初始化gameView
  initGameView () {
    if(this.mode === '') this.router.navigate(['/'])
    else if(this.mode === 'battle') this.setGameID()
  }
  //拿取oxdata
  getOData () {
    return this.oData
  }
  getXData () {
    return this.xData
  }
  //拿取viewdata
  getViewData () {
    return this.viewData
  }
  //清除畫面
  clearView() {
    // 清除遊戲畫面
    for(let key in this.viewData) this.viewData[key].data = 0
    for(let key in this.viewData) this.viewData[key].size = ""
    for(let key in this.viewData) this.viewData[key].weight = 0

    // 重置選擇畫面效果
    for(let item of this.oData){
      item.isChose = false
      item.amount = 3
    }
    for(let item of this.xData){
      item.isChose = false
      item.amount = 3
    }
  }
  // 更新選擇效果
  updateChose (sign:string,choseName:string) {
    // 當不是自己的回合時無法選擇自己的大小
    if(((this.step % 2 == 0) && (sign === this.markX)) || ((this.step % 2 == 1) && (sign === this.markO))) return
    switch (sign) {
      case this.markO: {
        for(let key in this.oData) {
          if(this.oData[key].styleName === choseName) this.oData[key].isChose = true
          else this.oData[key].isChose = false
        }
        break
      }
      case this.markX: {
        for(let key in this.xData) {
          if(this.xData[key].styleName === choseName) this.xData[key].isChose = true
          else this.xData[key].isChose = false
        }
        break
      }
    }
  }
  //  點擊格子
  clickAction(name:string) {
    const index = this.viewData.findIndex((item) => item.styleName == name)
    const nowSign = this.getNowSign()
    const whichSize = nowSign === this.markO ? this.oData.findIndex((item) => item.isChose) : this.xData.findIndex((item) => item.isChose)
    // 判斷是否可點擊
    const canClick = this.ableClick(whichSize,this.viewData[index])
    // 判斷是否可覆蓋
    const canCover = this.canCover(this.viewData[index].weight)
    if(!canClick || !canCover) return
    // 給予畫面資料
    const sizeName = this.oData[whichSize].styleName
    this.viewData[index].weight = this.getViewWeight()
    this.viewData[index].data = this.playerCilck(index,sizeName) || 0
    this.viewData[index].size = sizeName

    if(nowSign === this.markO) this.oData[whichSize].amount--
    else this.xData[whichSize].amount--
    // 勝負判斷
    this.judgeVictory()
  }
}
