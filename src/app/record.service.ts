import { Injectable } from '@angular/core';
import { stepType } from "./gamemodel.model";
@Injectable({
  providedIn: 'root'
})
export class RecordService {
  /*
    allRecords 所有遊戲紀錄
  */
  allRecords:stepType[][][] = []

  constructor() {
    this.setLocal()
  }
  //拿取紀錄
  get getAllRecords() {
    return this.allRecords
  }
  //修改紀錄
  addAllRecords(data:stepType[]) {
    if(!this.allRecords[0]) this.allRecords[0] = []
    this.allRecords[0].push(data)
  }
  //清除紀錄
  clearAllRecords() {
    this.allRecords[0] = []
  }
  //拿取本地紀錄
  setLocal() {
    if(localStorage.getItem('record')) this.allRecords = JSON.parse(localStorage.getItem('record') || '[]')
    else this.allRecords = []
  }
  //記錄此次遊戲
  noteGame() {
    // 處理歷史紀錄
    let historyTarget:stepType[][][] = this.allRecords.slice(1, this.allRecords.length)
    if(historyTarget.every((item) => item?.length > 0)) {
      historyTarget.shift()
      historyTarget.push(this.allRecords[0])
    }else {
      for(let i = 0;i<historyTarget.length;i++) {
        if(!historyTarget[i]?.length) {
          historyTarget[i] = this.allRecords[0]
          break
        }
      }
    }
    // 生成歷史紀錄
    for(let i = 1;i<=5;i++) this.allRecords[i] = historyTarget[i-1]
    this.allRecords[0] = []
    localStorage.setItem('record', JSON.stringify(this.allRecords))
  }

}
