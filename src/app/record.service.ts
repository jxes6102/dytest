import { Injectable } from '@angular/core';
import { viewType,stepType,xoType,viewData,checkData,selectData } from "./gamemodel.model";
@Injectable({
  providedIn: 'root'
})
export class RecordService {

  nowRecord:stepType[] = []
  allRecords:stepType[][] = []

  constructor() {}

  get getNowRecord() {
    return this.nowRecord
  }

  setNowRecord(data:stepType[]) {
    this.nowRecord = data
  }

  get getAllRecords() {
    return this.allRecords
  }

  setAllRecords(data:stepType[][]) {
    this.allRecords = data
  }

  updatedAllRecords(index:number,data:stepType) {
    this.allRecords[index].push(data) 
  }

  setLocal() {
    if(localStorage.getItem('record')) this.allRecords = JSON.parse(localStorage.getItem('record') || '[]')
    else this.allRecords = new Array(6)
  }

}
