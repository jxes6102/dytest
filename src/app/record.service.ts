import { Injectable } from '@angular/core';
import { stepType,checkData,clickStatus } from "./gamemodel.model";
@Injectable({
  providedIn: 'root'
})
export class RecordService {
  /*
    allRecords 所有遊戲紀錄
    checkRecord 紀錄每個格子的修改
    grabData 拿取步驟的暫存資料
  */
  allRecords:stepType[][][] = []
  checkRecord:stepType[][] = new checkData().getData
  grabData:stepType[] = []

  constructor() {
    this.setLocal()
  }
  //拿取紀錄
  get getAllRecords() {
    return this.allRecords
  }
  //修改紀錄
  // addAllRecords(index:number,data:stepType) {
  //   if(!this.allRecords[index]?.length) this.allRecords[index] = []
  //   // 當上一步是拿取時，將點擊和拿取組合成同一步驟
  //   if(this.grabData.length) {
  //     this.allRecords[index].pop()
  //     this.grabData.push(data)
  //     this.allRecords[index].push(this.grabData)
  //     this.grabData = []
  //   // 當這一步是拿取時，存到grabData
  //   }else if(data.status === clickStatus.grab){
  //     this.grabData = [data]
  //     this.allRecords[index].push([data])
  //   }else this.allRecords[index].push([data])
  // }
  testaddAllRecords(data:stepType[]) {
    if(!this.allRecords[0]) this.allRecords[0] = []
    this.allRecords[0].push(data)
  }
  //清除紀錄
  clearAllRecords() {
    this.allRecords[0] = []
  }
  //拿取格子紀錄
  get getCheckRecord() {
    return this.checkRecord
  }
  //修改格子紀錄
  setCheckRecord(data:stepType[][]) {
    this.clearCheckRecord()
    for(let items of data){
      for(let item of items) {
        this.updatedCheckRecord(item.wherePlace,{wherePlace: item.wherePlace,content: item.content,useSize:item.useSize,stepID:this.checkRecord[item.wherePlace].length,status:item.status})
      }
    }
  }
  clearCheckRecord() {
    this.checkRecord = new checkData().getData
  }
  updatedCheckRecord(index:number,data?:stepType) {
    if(data)this.checkRecord[index].push(data)
    else this.checkRecord[index].pop()
  }
  //清除grab紀錄
  clearGrabData() {
    this.grabData = []
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
