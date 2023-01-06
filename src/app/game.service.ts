import { Injectable } from '@angular/core';
import { RecordService } from './record.service';
import { viewType,xoType,viewData,selectData } from "./gamemodel.model";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  /*
    clickStatus 點擊動作類別 click點擊 grab拿取
    status 當前點擊動作
    result 遊戲狀態 0:勝負未分 1:O獲勝 -1:X獲勝 2:平手
    OXData 選擇視窗資料 index 0 for player1,index 1 for player2
    viewData  畫面資料
    AIStatus 電腦是否遊玩
    AIfirst 電腦是否先手 1先手 0後手
    marks 定義符號
    nowFlag 當前遊戲狀態 index 0 is 0 for battle 1~5 for record, index 1 is stepNum
    allRecords 所有遊戲紀錄
    checkRecord 紀錄每個格子的修改
    nowRecord 該局遊戲紀錄
  */
  clickStatus:string[] = ['click','grab']
  status:string = this.clickStatus[0]
  result:number = 0
  OXData:xoType[][] = new selectData().getData
  viewData:viewType[] = new viewData().getData
  AIStatus:boolean = false
  AIfirst:number = Math.floor(Math.random() * 2)
  marks:string[] = ["O","X"]
  nowFlag:number[] = [0,0]
  // 拿取該局紀錄資料
  get nowRecord() {
    return this.recordService.getNowRecord
  }
  // 拿取全部對戰資料
  get allRecords() {
    return this.recordService.getAllRecords
  }
  // 拿取格子紀錄
  get checkRecord() {
    return this.recordService.getCheckRecord
  }
  
  constructor(private recordService: RecordService) {
    this.recordService.setLocal()
  }
  // 拿取符號
  get getMarks () {
    return this.marks
  }
  // 計算步驟
  get stepCount () {
    return this.nowFlag[1] % 2
  }
  // 判斷模式
  get isBattle() {
    return !this.nowFlag[0] ? true : false
  }
  // 設定模式
  setMode(val:number) {
    this.clearView()
    this.resetData()

    this.nowFlag[0] = val
    if(!this.isBattle) this.recordService.setNowRecord(val)
  }
  // 拿取勝利者
  get getWin() {
    return this.result
  }
  //拿取選擇畫面資料
  get getOXData() {
    return this.OXData
  }
  //拿取viewdata
  get getViewData () {
    return this.viewData
  }
  // 設定遊戲遊玩狀態
  setStatus () {
    if(this.status === this.clickStatus[0]) this.status = this.clickStatus[1]
    else this.status = this.clickStatus[0]
  }
  // 拿取遊戲遊玩狀態
  get getStatus () {
    return this.status
  }
  //重置遊戲
  resetGame() {
    this.resetData()
    this.recordService.clearAllRecords()
  }
  // 重置資料 
  resetData () {
    this.recordService.setNowRecord(0)
    this.result = 0
    this.status = this.clickStatus[0]
    this.recordService.clearCheckRecord()
    this.nowFlag[1] = 0
  }
  //拿取步驟訊息
  getStepMessage() {
    if(this.isBattle && !this.allRecords[0]?.length) return '開始'
    const target = (this.isBattle) ? this.allRecords[0][this.allRecords[0]?.length - 1] : this.nowRecord[this.nowFlag[1] - 1]
    if (!target)  return '這是上' + ((this.allRecords.filter((item) => item?.length > 0).length + 1) - this.allRecords.indexOf(this.nowRecord)) + '場'
    // QQQQ
    const where = (target?.wherePlace || 0) + 1
    const adjArr = ['bigSize','mediumSize','smallSize']
    const battleSign = (target.status === this.clickStatus[0]) ? this.marks[1 - this.stepCount] : this.marks[this.stepCount]
    const recordSign = (target.status === this.clickStatus[0]) ? ((target.content === 1) ? this.marks[0] : this.marks[1]) : ((target.content === 1) ? this.marks[1] : this.marks[0])
    console.log('====================================================')
    // console.log('target',target)
    // console.log('recordSign',recordSign)
    console.log('checkRecord',this.checkRecord)
    console.log('wherePlace',this.checkRecord[(target.wherePlace)])


    const sign = (this.isBattle) ? battleSign : recordSign

    return (target.status === this.clickStatus[0]) ? (sign + '用了' + adjArr[target?.useSize] + '下在第' + where + '格') : ('拿了在第' + where + '格的' + sign)
  }
  //清除畫面
  clearView() {
    // 清除遊戲畫面
    for(let key in this.viewData) this.updateViewData(parseInt(key),0,0,0)
    // 重置選擇畫面效果
    for(let index in this.OXData) {
      for(let item of this.OXData[index]) {
        item.isChose = false
        item.amount = 3
      }
    }
  }
  // 更新選擇效果
  updateChose (sign:string,val:number) {
    // 當不是自己的回合時無法選擇自己的大小
    if(((this.stepCount == 0) && (sign === this.marks[1])) || ((this.stepCount == 1) && (sign === this.marks[0]))) return
    for(let key in this.OXData[this.stepCount]) {
      if(parseInt(key) === val) this.OXData[this.stepCount][key].isChose = true
      else this.OXData[this.stepCount][key].isChose = false
    }
  }
  //更新遊戲畫面
  updateViewData (index:number,data:number,sizeIndex:number,weight?:number) {
    if(weight || (weight === 0)) this.viewData[index].weight = weight
    this.viewData[index].data = data
    this.viewData[index].size = sizeIndex
  }
  // 回復畫面資料
  recoverData() {
    const target = this.allRecords[0]
    if(!target?.length) return

    for(let item of target) {
      const whichSize = item.useSize
      const index = item.wherePlace
      // 給予畫面資料
      if(item.status === this.clickStatus[0]) this.nowFlag[1]++
      const data = (this.stepCount === 1) ? 1 : -1
      this.updateViewData(index,data,whichSize,this.OXData[this.stepCount].length - whichSize)
      this.OXData[1 - this.stepCount][whichSize].amount--
      //紀錄
      this.recordService.updatedCheckRecord(index,{wherePlace: index,content: data,useSize:whichSize,stepID:this.allRecords[0].length ,status:this.clickStatus[0]})
    }
  }
  //點擊格子
  clickAction(index:number) {
    if(this.status === this.clickStatus[0]) this.clickProcess(index)
    else this.grabProcess(index)
  }
  // 點擊動作
  clickProcess(index:number) {
    const whichSize = this.OXData[this.stepCount].findIndex((item) => item.isChose)
    // 檢查模式、結果、是否選擇尺寸
    if(!this.isBattle || this.result || (whichSize === -1)) return
    // 判斷是否可點擊
    const canClick = (this.OXData[this.stepCount][whichSize].amount > 0) && (this.stepCount === 0 ? this.viewData[index].data <= 0 : this.viewData[index].data >= 0)
    // 判斷是否可覆蓋
    const canCover = (this.OXData[this.stepCount].find((item) => item.isChose)?.weight || 0) > this.viewData[index].weight
    if(!canClick || !canCover) return
    // 給予畫面資料
    this.nowFlag[1]++
    const data = (this.stepCount == 1) ? 1 : -1
    this.updateViewData(index,data,whichSize,this.OXData[1 - this.stepCount].find((item) => item.isChose)?.weight || 0)
    this.OXData[1 - this.stepCount][whichSize].amount--
    //紀錄
    const stepNum = this.allRecords[0]?.length || 0
    this.recordService.updatedCheckRecord(index,{wherePlace: index,content: data,useSize:whichSize,stepID:stepNum,status:this.clickStatus[0]})
    this.recordService.updatedAllRecords(0,{wherePlace: index,content: data,useSize:whichSize,stepID:stepNum,status:this.clickStatus[0]})
    // 勝負判斷
    this.judgeVictory()
    // 判斷勝敗狀態、對戰模式 來決定電腦動作
    if(this.result || !this.AIStatus) return
    else this.checkNext()
  }
  // 拿取動作
  grabProcess(index:number) {
    const target = this.viewData[index]
    // 同一回合只能拿一次
    const lastStep = this.allRecords[0][this.allRecords[0].length - 1]
    if((lastStep?.status === this.clickStatus[1]) || this.result) {
      this.setStatus()
      return
    }
    // 判斷只能拿屬於自己的OX之後將拿回的OX加到選擇畫面上
    if(((this.stepCount === 0) && (target?.data !== 1)) || ((this.stepCount === 1) && (target?.data !== -1))) return
    const where = this.viewData[index].size
    this.OXData[this.stepCount][where].amount++
    //還原上一次修改的資料
    this.recordService.updatedCheckRecord(index)
    const lastTarget = this.checkRecord[index][this.checkRecord[index].length - 1]
    this.updateViewData(index,lastTarget?.content || 0,lastTarget?.useSize || 0,((3 -  lastTarget?.useSize) || 0))
    this.recordService.updatedAllRecords(0,{wherePlace: index,content: (lastTarget?.content || 0),useSize:(lastTarget?.useSize || 0),stepID:this.allRecords[0].length,status:this.clickStatus[1]})
    this.setStatus()
  }
  // 判斷勝負
  judgeVictory() {
    this.result = 0
    const condition1 = Math.abs(this.viewData[0].data + this.viewData[4].data + this.viewData[8].data)
    const condition2 = Math.abs(this.viewData[2].data + this.viewData[4].data + this.viewData[6].data)
    this.result = ((condition1 === 3) || (condition2 === 3)) ? this.viewData[4].data : this.result

    for(let i = 0 ;i<3; i++) {
      const condition3 = Math.abs(this.viewData[3*i].data + this.viewData[3*i+1].data + this.viewData[3*i+2].data)
      const condition4 = Math.abs(this.viewData[i].data + this.viewData[i+3].data + this.viewData[i+6].data)
      this.result = (condition3 === 3) ? this.viewData[3*i].data : (condition4 === 3)
        ? this.viewData[i].data : this.result
    }
    // 計算對戰或紀錄模式時平手條件
    if(this.isBattle) {
      // 當前選擇欄位剩餘最大重
      const target = this.OXData[this.stepCount].filter(item => item.amount > 0).map(item => item.weight)
      const maxChoseWeight = Math.max(...(target.length ? target : [0]))
      // 畫面敵對和空白最小重
      const minViewWeight = (this.stepCount === 0) ? Math.min(...this.viewData.filter((item) => item.data !== 1).map(item => item.weight)) :
      Math.min(...this.viewData.filter((item) => item.data !== -1).map(item => item.weight))
      // 選擇欄位剩餘數量
      const count = this.OXData.flat(1).reduce((acc, item) => acc + item.amount,0)
      // 選擇欄位剩餘數量等於零和勝負未分 畫面上敵對和空白格最小重 大於等於 當前選擇欄位剩餘的最大重 和勝負未分 是平手
      if((!count && !this.result) || ((minViewWeight >= maxChoseWeight) && !this.result)) this.result = 2

    } else if(!this.nowRecord[this.nowFlag[1]] && !this.result) this.result = 2

    if(this.result && (this.isBattle)) this.recordService.noteGame()
  }
  // 存入對戰資料
  setBattle() {
    this.recordService.saveBattle()
  }
  // 執行紀錄(上下步按鈕)
  actionRecord (stepVal:number) {
    // 當按上一步時紀錄已到第0筆 按下一步時紀錄已到最後一筆 不動作
    if(((this.nowFlag[1] === this.nowRecord.length) && (stepVal === 1)) || ((this.nowFlag[1] < 1) && (stepVal === -1))) return
    this.skipAction(this.nowFlag[1] + stepVal)
  }
  // 拿取遊戲紀錄
  get getAllRecords() {
    return this.allRecords.filter((item,index) => ((item?.length > 0) && (index !== 0)))
  }
  // 紀錄模式切換步驟
  skipAction(val:number) {
    this.clearView()
    this.result = 0
    const target = this.nowRecord.slice(0,val)
    this.recordService.setCheckRecord(target)
    this.nowFlag[1] = val
    //修改畫面
    for(let i = 0;i<this.checkRecord.length;i++) {
      const viewTarget = this.checkRecord[i].length ? this.checkRecord[i][this.checkRecord[i].length - 1] : false
      if(viewTarget)  this.updateViewData(viewTarget.wherePlace,viewTarget.content,viewTarget.useSize,this.OXData[this.stepCount].length - viewTarget.useSize)
    }

    if(target[target.length - 1]?.status === this.clickStatus[0]) this.judgeVictory()
  }
  // 拿取電腦遊玩狀態
  get getAIStatus () {
    return this.AIStatus
  }
  // 改變電腦遊玩狀態
  changeAIStatus (val:boolean) {
    this.AIStatus = val
    if(!val) return
    this.AIfirst = Math.floor(Math.random() * 2)
    if(this.AIfirst) this.checkNext()
  }
  // 電腦動作
  checkNext() {
    // selectTarget 選取要下的大小
    // canPlace 尋找可以下的地方
    const selectTarget = this.OXData[this.stepCount].find((item) => item.amount > 0)
    let canPlace = []
    for(let key in this.viewData ) if(this.viewData[key].weight < (selectTarget?.weight || 0) && (this.viewData[key].data !== ((this.stepCount === 0) ? 1 : -1))) canPlace.push(parseInt(key))
    if(!canPlace.length) return

    const whichSize = this.OXData[this.stepCount].findIndex((item) => item.weight === selectTarget?.weight)
    const index = canPlace[Math.floor(Math.random() * canPlace.length)]
    // 給予畫面資料
    this.nowFlag[1]++
    const data = (this.stepCount === 1) ? 1 : -1
    this.updateViewData(index,data,whichSize,selectTarget?.weight || 0,)
    this.OXData[1 - this.stepCount][whichSize].amount--
    //紀錄
    const stepNum = this.allRecords[0].length
    this.recordService.updatedCheckRecord(index,{wherePlace: index,content: data,useSize:whichSize,stepID:stepNum,status:this.clickStatus[0]})
    this.recordService.updatedAllRecords(0,{wherePlace: index,content: data,useSize:whichSize,stepID:stepNum,status:this.clickStatus[0]})

    this.judgeVictory()
  }
}
