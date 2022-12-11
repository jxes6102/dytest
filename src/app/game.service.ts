import { Injectable } from '@angular/core';
import { viewType,stepType,recordType } from "./gamemodel.model";
@Injectable({
  providedIn: 'root'
})
export class GameService {
  /*
    gameID 該局遊戲ID
    allID 紀錄中所有遊戲ID
    mode  模式名稱
    step 遊戲步數
    result 遊戲狀態 0:勝負未分 1:O獲勝 -1:X獲勝 9:平手
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
  TestplayerCilck(place:number) {
    // 當點擊數大於等於9、已有勝負時不可點擊
    if((this.step >= 9) || this.result) return

    this.step++
    if(this.step % 2 == 1) {
      this.gameStep.push({wherePlace: place,content: 1})
      return 1
    } else {
      this.gameStep.push({wherePlace: place,content: -1})
      return -1
    }
  }
  // 判斷勝負
  judgeVictory(viewData:viewType[]) {
    this.result = 0
    let condition1 = Math.abs(viewData[0].data + viewData[4].data + viewData[8].data)
    let condition2 = Math.abs(viewData[2].data + viewData[4].data + viewData[6].data)
    this.result = ((condition1 === 3) || (condition2 === 3)) ? viewData[4].data : this.result

    for(let i = 0 ;i<3; i++) {
      let condition3 = Math.abs(viewData[3*i].data + viewData[3*i+1].data + viewData[3*i+2].data)
      let condition4 = Math.abs(viewData[i].data + viewData[i+3].data + viewData[i+6].data)
      this.result = (condition3 === 3) ? viewData[3*i].data : (condition4 === 3)
        ? viewData[i].data : this.result
    }
    //當玩家總步數或記錄步數等於9且都未分勝敗時是平手
    if (((this.step === 9) && (this.result === 0)) || ((this.recordStep === 9) && (this.result === 0))) this.result = 9
  }
  // 拿取勝利者
  getWin() {
    return this.result
  }
  //重置遊戲
  resetGame() {
    this.noteGame()
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

    this.gameStep = []
  }
  // 執行紀錄
  actionRecord(stepVal:number,viewData:viewType[]) {
    switch (stepVal) {
      case 1: {
        if((this.recordStep === this.gameRecords.length)) return

        this.recordStep += stepVal
        viewData[this.gameRecords[this.recordStep - 1].wherePlace].data = this.gameRecords[this.recordStep - 1].content
        this.judgeVictory(viewData)
        break
      }
      case -1: {
        if((this.recordStep < 1)) return

        this.recordStep += stepVal
        viewData[this.gameRecords[this.recordStep].wherePlace].data = 0
        this.judgeVictory(viewData)
        break
      }
    }
    return viewData
  }
  // 設定遊戲ID
  setGameID() {
    this.gameID++
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
}
