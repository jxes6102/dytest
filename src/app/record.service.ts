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

}
