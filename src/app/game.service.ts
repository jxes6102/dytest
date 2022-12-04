import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  mode:string
  viewData:any[]
  constructor() {
    this.mode = ''
    this.viewData = [
      {className:"square0",data:null},
      {className:"square1",data:null},
      {className:"square2",data:null},
      {className:"square3",data:null},
      {className:"square4",data:null},
      {className:"square5",data:null},
      {className:"square6",data:null},
      {className:"square7",data:null},
      {className:"square8",data:null}
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
}
