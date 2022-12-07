import { Injectable } from '@angular/core';
import { viewType,stepType } from "./gamemodel.model";
@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameID:number
  allID:string[]
  mode:string
  viewData:viewType[]
  step:number
  result:number
  gameRecords:any
  allRecords:any
  gameStep:stepType[]
  recordStep:number

  constructor() {
    this.gameID = 0
    this.allID = []
    this.result = 0
    this.recordStep = 0
    this.gameRecords = null
    this.allRecords = {}
    this.mode = ''
    this.step = 0
    this.gameStep = []
    this.viewData = [
      {className:"square0",data:0},
      {className:"square1",data:0},
      {className:"square2",data:0},
      {className:"square3",data:0},
      {className:"square4",data:0},
      {className:"square5",data:0},
      {className:"square6",data:0},
      {className:"square7",data:0},
      {className:"square8",data:0}
    ]
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
  // 拿取頁面資料
  getViewData() {
    return this.viewData
  }
  // 玩家點擊時紀錄
  playerCilck(name:string) {
    const index = this.viewData.findIndex((item) => item.className == name)
    // 當點擊數大於等於9、格子已被點擊、已有勝負時不可點擊
    if((this.step >= 9) || (Math.abs(this.viewData[index].data) === 1) || this.result) return

    this.step++
    if(this.step % 2 == 1) {
      this.viewData[index].data = 1
      this.gameStep.push({wherePlace: index,content: 1,id:this.gameID})
    } else {
      this.viewData[index].data = -1
      this.gameStep.push({wherePlace: index,content: -1,id:this.gameID})
    }

    this.judgeVictory()
  }
  // 判斷勝負
  judgeVictory () {
    this.result = 0
    let condition1 = Math.abs(this.viewData[0].data + this.viewData[4].data + this.viewData[8].data)
    let condition2 = Math.abs(this.viewData[2].data + this.viewData[4].data + this.viewData[6].data)
    this.result = ((condition1 === 3) || (condition2 === 3)) ? this.viewData[4].data : this.result

    for(let i = 0 ;i<3; i++) {
      let condition3 = Math.abs(this.viewData[3*i].data + this.viewData[3*i+1].data + this.viewData[3*i+2].data)
      let condition4 = Math.abs(this.viewData[i].data + this.viewData[i+3].data + this.viewData[i+6].data)
      this.result = (condition3 === 3) ? this.viewData[3*i].data : (condition4 === 3) 
        ? this.viewData[i].data : this.result
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
    for(let key in this.viewData) this.viewData[key].data = 0
  }
  //記錄此次遊戲，只記錄有分勝敗的局
  noteGame() {
    if((this.gameStep.length === 0) || (this.result === 0)){
      this.gameStep = []
      return
    }

    this.allRecords[this.gameID] = this.gameStep
    this.gameStep = []
  }
  // 執行紀錄
  actionRecord(stepVal:number) {
    switch (stepVal) {
      case 1: {
        if((this.recordStep === this.gameRecords.length)) return

        this.recordStep += stepVal
        this.viewData[this.gameRecords[this.recordStep - 1].wherePlace].data = this.gameRecords[this.recordStep - 1].content
        this.judgeVictory()
        break
      }
      case -1: {
        if((this.recordStep < 1)) return

        this.recordStep += stepVal
        this.viewData[this.gameRecords[this.recordStep].wherePlace].data = 0
        if(this.recordStep !== 0) this.viewData[this.gameRecords[this.recordStep - 1].wherePlace].data = this.gameRecords[this.recordStep - 1].content
        this.judgeVictory()
        break
      }
    }
  }
  // 設定遊戲ID
  setGameID() {
    this.gameID++
  }
  // 拿取所有遊戲ID
  getAllID() {
    this.allID = Object.keys(this.allRecords)
    return this.allID
  }
  // 拿取選擇的紀錄
  getChose(id:string){
    this.gameRecords = this.allRecords[id]
  }
}
