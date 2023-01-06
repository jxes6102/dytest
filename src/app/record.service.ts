import { Injectable } from '@angular/core';
import { stepType,checkData } from "./gamemodel.model";
@Injectable({
  providedIn: 'root'
})
export class RecordService {

  nowRecord:stepType[] = []
  allRecords:stepType[][] = []
  checkRecord:stepType[][] = new checkData().getData

  constructor() {}
  //拿取現在紀錄
  get getNowRecord() {
    return this.nowRecord
  }
  //修改現在紀錄
  setNowRecord(data:stepType[]) {
    this.nowRecord = data
  }
  //拿取紀錄
  get getAllRecords() {
    return this.allRecords
  }
  //修改紀錄
  setAllRecords(data:stepType[][]) {
    this.allRecords = data
  }
  updatedAllRecords(index:number,data:stepType) {
    this.allRecords[index].push(data) 
  }
  //拿取格子紀錄
  get getCheckRecord() {
    return this.checkRecord
  }
  //修改格子紀錄
  clearCheckRecord() {
    this.checkRecord = new checkData().getData
  }
  updatedCheckRecord(index:number,data:stepType) {
    this.checkRecord[index].push(data) 
  }
  deleteCheckRecord(index:number) {
    this.checkRecord[index].pop()
  }
  //拿取本地紀錄
  setLocal() {
    if(localStorage.getItem('record')) this.allRecords = JSON.parse(localStorage.getItem('record') || '[]')
    else this.allRecords = new Array(6)
  }
  //紀錄對戰資料
  saveBattle() {
    localStorage.setItem('record', JSON.stringify(this.allRecords))
  }
  //記錄此次遊戲，只記錄有分勝敗的局
  noteGame() {
    this.nowRecord = []
    // 處理歷史紀錄
    let historyTarget:stepType[][] = this.allRecords.slice(1, this.allRecords.length)
    if(historyTarget.every((item) => item.length > 0)) {
      historyTarget.shift()
      historyTarget.push(this.allRecords[0])
    }else {
      for(let i = 0;i<historyTarget.length;i++) {
        if(!historyTarget[i].length) {
          historyTarget[i] = this.allRecords[0]
          break
        }
      }
    }
    // 生成歷史紀錄
    for(let i = 1;i<=5;i++) this.allRecords[i] = historyTarget[i-1]
    this.allRecords[0] = []
    this.saveBattle()
  }

}
