import { Injectable } from '@angular/core';
import { viewType,stepType } from "./gamemodel.model";
@Injectable({
  providedIn: 'root'
})
export class GameService {
  mode:string
  viewData:viewType[]
  step:number
  win:number
  gameRecords:any
  // gameRecords:any[]
  gameStep:stepType[]
  recordStep:number

  constructor() {
    this.win = 0
    this.recordStep = 0
    // this.gameRecords = []
    this.gameRecords = null
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
  // 點擊紀錄
  playerCilck(name:string) {
    const index = this.viewData.findIndex((item) => item.className == name)
    if((this.step >= 9) || (Math.abs(this.viewData[index].data) === 1) || this.win) return

    this.step++
    if (this.step === 9) this.win = 9
    if(this.step % 2 == 1) {
      this.viewData[index].data = 1
      this.gameStep.push({wherePlace: index,content: 1})
    } else {
      this.viewData[index].data = -1
      this.gameStep.push({wherePlace: index,content: -1})
    }

    this.judgeVictory()
  }
  // 判斷勝負
  judgeVictory () {
    let condition1 = Math.abs(this.viewData[0].data + this.viewData[4].data + this.viewData[8].data)
    let condition2 = Math.abs(this.viewData[2].data + this.viewData[4].data + this.viewData[6].data)
    this.win = ((condition1 === 3) || (condition2 === 3)) ? this.viewData[4].data : this.win

    for(let i = 0 ;i<3; i++) {
      let condition3 = Math.abs(this.viewData[3*i].data + this.viewData[3*i+1].data + this.viewData[3*i+2].data)
      let condition4 = Math.abs(this.viewData[i].data + this.viewData[i+3].data + this.viewData[i+6].data)
      this.win = (condition3 === 3) ? this.viewData[3*i].data : (condition4 === 3) 
        ? this.viewData[i].data : this.win
    }
    console.log('judgeVictory',this.viewData,this.win)

  }
  // 拿取勝利者
  getWin() {
    return this.win
  }
  //重置遊戲
  resetGame() {
    this.noteGame()
    this.step = 0
    this.recordStep = 0
    this.win = 0
    for(let key in this.viewData) this.viewData[key].data = 0
  }
  //記錄此次遊戲
  noteGame() {
    if((this.gameStep.length === 0) || (this.win === 0)){
      this.gameStep = []
      return
    }
    this.gameRecords = this.gameStep 
    // this.gameRecords.push(this.gameStep)
    this.gameStep = []
  }
  // 拿取紀錄
  getRecord() {
    return this.gameRecords
  }
  // 執行紀錄
  actionRecord(stepVal:number) {
    // console.log(val)
    switch (stepVal) {
      case 1: {
        if((this.recordStep === this.gameRecords.length)) {
          console.log('no Next')
          return
        }
        this.recordStep += stepVal

        this.viewData[this.gameRecords[this.recordStep - 1].wherePlace].data = this.gameRecords[this.recordStep - 1].content
        this.judgeVictory()
        // console.log(this.gameRecords[this.recordStep - 1].wherePlace,this.gameRecords[this.recordStep - 1].content)
        break;
      }
      case -1: {
        if((this.recordStep <= 1)) {
          console.log('no Last')
          return
        }
        this.recordStep += stepVal

        this.viewData[this.gameRecords[this.recordStep].wherePlace].data = 0
        this.viewData[this.gameRecords[this.recordStep - 1].wherePlace].data = this.gameRecords[this.recordStep - 1].content
        this.judgeVictory()
        // console.log(this.gameRecords[this.recordStep - 1].wherePlace,this.gameRecords[this.recordStep - 1].content)
        break;
      }
    }
  }
}
