import { Injectable } from '@angular/core';
import { stepType,checkData } from "./gamemodel.model";
@Injectable({
  providedIn: 'root'
})
export class RecordService {
  /*
    nowRecord 該局遊戲紀錄
    allRecords 所有遊戲紀錄
    checkRecord 紀錄每個格子的修改
  */
  nowRecord:stepType[] = []
  allRecords:stepType[][] = []
  checkRecord:stepType[][] = new checkData().getData



  testallRecords:stepType[][][] = []
  grabData:stepType[] = []
  testnowRecord:stepType[][] = []




  constructor() {}
  //拿取現在紀錄
  get getNowRecord() {
    // return this.nowRecord
    return this.testnowRecord
  }
  //修改現在紀錄
  setNowRecord(val:number) {
    if(val) this.nowRecord = this.allRecords[val]
    else this.nowRecord = []



    if(val) this.testnowRecord = this.testallRecords[val]
    else this.testnowRecord = []
  }
  //拿取紀錄
  get getAllRecords() {
    // return this.allRecords
    return this.testallRecords
  }
  //修改紀錄
  updatedAllRecords(index:number,data:stepType,status:string[]) {
    if(!this.allRecords[index]?.length) this.allRecords[index] = []
    this.allRecords[index].push(data)



    if(!this.testallRecords[index]?.length) this.testallRecords[index] = []
    // 當上一步是拿取時，將點擊和拿取組合成同一步驟
    if(this.grabData.length) {
      this.grabData.push(data)
      this.testallRecords[index].push(this.grabData)
      this.grabData = []
    // 當這一步是拿取時，存到grabData且不新增到testallRecords
    }else if(data.status === status[1]){
      this.grabData = [data]
    }else {
      this.testallRecords[index].push([data])
    }


    // console.log('testallRecords',this.testallRecords[index])
  }
  clearAllRecords() {
    this.allRecords[0] = []



    this.testallRecords[0] = []
  }
  //拿取格子紀錄
  get getCheckRecord() {
    return this.checkRecord
  }
  //修改格子紀錄
  // QQQQ
  // setCheckRecord(data:stepType[]) {
  //   this.clearCheckRecord()
  //   for(let item of data)this.updatedCheckRecord(item.wherePlace,{wherePlace: item.wherePlace,content: item.content,useSize:item.useSize,stepID:this.checkRecord[item.wherePlace].length,status:item.status})
  // }
  setCheckRecord(data:stepType[][]) {
    this.clearCheckRecord()
  
    for(let items of data) {
      for(let item of items) this.updatedCheckRecord(item.wherePlace,{wherePlace: item.wherePlace,content: item.content,useSize:item.useSize,stepID:this.checkRecord[item.wherePlace].length,status:item.status})
    }
  }
  clearCheckRecord() {
    this.checkRecord = new checkData().getData
  }
  updatedCheckRecord(index:number,data?:stepType) {
    if(data)this.checkRecord[index].push(data)
    else this.checkRecord[index].pop()
  }
  //拿取本地紀錄
  setLocal() {
    // if(localStorage.getItem('record')) this.allRecords = JSON.parse(localStorage.getItem('record') || '[]')
    // else this.allRecords = []



    if(localStorage.getItem('record')) this.testallRecords = JSON.parse(localStorage.getItem('record') || '[]')
    else this.testallRecords = []
  }
  //紀錄對戰資料
  saveBattle() {
    // localStorage.setItem('record', JSON.stringify(this.allRecords))



    localStorage.setItem('record', JSON.stringify(this.testallRecords))
  }
  //記錄此次遊戲
  noteGame() {
    this.nowRecord = []
    // 處理歷史紀錄
    let historyTarget:stepType[][] = this.allRecords.slice(1, this.allRecords.length)
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
    this.saveBattle()



    this.testnowRecord = []
    // 處理歷史紀錄
    let testhistoryTarget:stepType[][][] = this.testallRecords.slice(1, this.testallRecords.length)
    if(testhistoryTarget.every((item) => item?.length > 0)) {
      testhistoryTarget.shift()
      testhistoryTarget.push(this.testallRecords[0])
    }else {
      for(let i = 0;i<testhistoryTarget.length;i++) {
        if(!testhistoryTarget[i]?.length) {
          testhistoryTarget[i] = this.testallRecords[0]
          break
        }
      }
    }
    // 生成歷史紀錄
    for(let i = 1;i<=5;i++) this.testallRecords[i] = testhistoryTarget[i-1]
    this.testallRecords[0] = []
    this.saveBattle()
  }

}
