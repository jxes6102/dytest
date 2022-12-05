import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  mode:string
  viewData:any[]
  step:number
  gameData:any[]
  win:number
  constructor() {
    this.win = 0
    this.gameData = []
    this.mode = ''
    this.step = 0
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

  getMode() {
    return this.mode
  }

  setMode(val: string) {
    this.mode = val
  }

  clearMode() {
    this.mode = ''
  }

  getViewData() {
    return this.viewData
  }

  playerCilck(name:string) {
    const index = this.viewData.findIndex((item) => item.className == name)
    if((this.step >= 9) || (Math.abs(this.viewData[index].data) === 1) || this.win) return 
    this.step++
    if(this.step % 2 == 1) {
      this.viewData[index].data = 1
    }else {
      this.viewData[index].data = -1
    }

    this.judgeVictory()
  }

  judgeVictory () {
    // console.log('judgeVictory')
    
    let test1 = Math.abs(this.viewData[0].data + this.viewData[4].data + this.viewData[8].data)
    let test2 = Math.abs(this.viewData[2].data + this.viewData[4].data + this.viewData[6].data)
    if((test1 === 3) || (test2 === 3)) this.win = this.viewData[4].data

    for(let i = 0 ;i<3; i++) {
      let test3 = Math.abs(this.viewData[3*i].data + this.viewData[3*i+1].data + this.viewData[3*i+2].data)
      let test4 = Math.abs(this.viewData[i].data + this.viewData[i+3].data + this.viewData[i+6].data)
      if(test3 === 3) this.win = this.viewData[3*i].data
      if(test4 === 3) this.win = this.viewData[i].data
    }
    console.log(this.win)
  }

  getWin() {
    return this.win
  }
}
