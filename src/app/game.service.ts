import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  mode:string
  viewData:any[]
  step:number
  constructor() {
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
    this.step++
    if(this.step % 2 == 1) {
      this.viewData[index].data = 1
    }else {
      this.viewData[index].data = -1
    }
  }
}
