import { Injectable } from '@angular/core';
import { RecordService } from './record.service';
import { viewType,xoType,viewData,selectData,clickStatus } from "./gamemodel.model";

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
    marks 定義符號
    nowFlag 當前遊戲狀態 index 0 is 0 for battle 1~5 for record, index 1 is stepNum
    choseLock 是否可切換選擇大小畫面和動作類別
    canMove 每個格子可下的範圍
    allRecords 所有遊戲紀錄
    checkRecord 紀錄每個格子的修改
    nowRecord 該局遊戲紀錄
  */
  status:string = clickStatus.click
  result:number = 0
  OXData:xoType[][] = new selectData().getData
  viewData:viewType[] = new viewData().getData
  marks:string[] = ["O","X"]
  nowFlag:number[] = [0,0]
  choseLock:boolean = false
  canMove:number[][] = [
    [1,3],
    [0,2,4],
    [1,5],
    [0,4,6],
    [1,3,5,7],
    [2,4,8],
    [3,7],
    [4,6,8],
    [5,7]
  ]
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

  constructor(private recordService: RecordService) {}
  // 拿取當前步驟
  get getStep () {
    return this.nowFlag[1]
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
    if(this.status === clickStatus.click) this.status = clickStatus.grab
    else this.status = clickStatus.click
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
    this.status = clickStatus.click
    this.recordService.clearCheckRecord()
    this.recordService.clearGrabData()
    this.nowFlag[1] = 0
    this.choseLock = false
  }
  //拿取步驟訊息
  get getStepMessage() {
    if(this.isBattle && !this.allRecords[0]?.length) return '開始'
    const target = (this.isBattle) ? this.allRecords[0][this.allRecords[0]?.length - 1] : this.nowRecord[this.nowFlag[1] - 1]
    if(!target?.length) return '這是上' + ((this.allRecords.filter((item) => item?.length > 0).length + 1) - this.allRecords.indexOf(this.nowRecord)) + '場'

    const sign = (target[target.length - 1].content === 1) ? this.marks[0] : this.marks[1]
    const adjArr = ['bigSize','mediumSize','smallSize']
    if(target?.length === 1) {
      if(target[0].status === clickStatus.grab) return '拿了' + this.marks[this.stepCount]
      else return (sign + '用了' + adjArr[target[0].useSize] + '下在第' + (target[0].wherePlace + 1) + '格')
    }else return ('拿了在第' + ((target[0].wherePlace + 1)) + '格的' + sign + '下在第' + ((target[1].wherePlace + 1)) + '格')
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
    if(this.choseLock || !this.isBattle) return
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
    if(!this.allRecords[0]?.length) return
    for(let items of this.allRecords[0]) {
      for(let item of items){
          const whichSize = item.useSize
          const index = item.wherePlace
          // 給予畫面資料
          if(item.status === clickStatus.click){
            this.nowFlag[1]++
            this.OXData[1 - this.stepCount][whichSize].amount--
          }else {
            const last = this.checkRecord[index][this.checkRecord[index].length - 1]
            this.OXData[this.stepCount][last.useSize].amount++
            this.updateChose(this.marks[this.stepCount],last.useSize)
          }
          this.updateViewData(index,item.content,whichSize,!item.content ? 0 : this.OXData[this.stepCount].length - whichSize)
          if(item.status === clickStatus.click) this.choseLock = false
          else this.choseLock = true
          //紀錄
          this.recordService.updatedCheckRecord(index,{wherePlace: index,content: item.content,useSize:whichSize,stepID:this.allRecords[0].length ,status:clickStatus.click})
      }
    }
  }
  //點擊格子
  clickAction(index:number) {
    if(!this.isBattle) return
    if(this.status === clickStatus.click) this.clickProcess(index)
    else this.grabProcess(index)
  }
  // 點擊動作
  clickProcess(index:number) {
    const whichSize = this.OXData[this.stepCount].findIndex((item) => item.isChose)
    const canClick = (this.OXData[this.stepCount][whichSize]?.amount > 0) && (this.stepCount === 0 ? this.viewData[index].data <= 0 : this.viewData[index].data >= 0)
    const canCover = (this.OXData[this.stepCount].find((item) => item.isChose)?.weight || 0) > this.viewData[index].weight
    const lastTarget = (this.allRecords[0]?.length ? this.allRecords[0][this.allRecords[0].length-1][this.allRecords[0][this.allRecords[0].length-1].length - 1] : null)
    const grabStatus = (lastTarget?.status === clickStatus.grab) && ((!this.viewData[index].data) || (lastTarget?.wherePlace === index) || !(this.canMove[lastTarget?.wherePlace || 0].includes(index)))
    // 檢查結果、是否選擇尺寸、是否可覆蓋、是否可點擊、上一步是拿取時只能 下在鄰近格子 不可下在空格和原本的格子
    if(!canClick || !canCover || this.result || (whichSize === -1) || grabStatus) return
    // 重製切換狀態
    this.choseLock = false
    // 給予畫面資料
    this.nowFlag[1]++
    const data = (this.stepCount == 1) ? 1 : -1
    this.updateViewData(index,data,whichSize,this.OXData[1 - this.stepCount].find((item) => item.isChose)?.weight || 0)
    this.OXData[1 - this.stepCount][whichSize].amount--
    //紀錄
    const stepNum = this.allRecords[0]?.length || 0
    this.recordService.updatedCheckRecord(index,{wherePlace: index,content: data,useSize:whichSize,stepID:stepNum,status:clickStatus.click})
    this.recordService.updatedAllRecords(0,{wherePlace: index,content: data,useSize:whichSize,stepID:stepNum,status:clickStatus.click})
    // 勝負判斷
    this.judgeVictory()
  }
  // 拿取動作
  grabProcess(index:number) {
    const target = this.viewData[index]
    const where = this.viewData[index].size
    const canPlace = this.canMove[index].filter((item) => (this.marks[this.stepCount] !== (this.viewData[item].data === 1 ? this.marks[0] : this.marks[1])) && (this.viewData[item].weight > 0) && (this.viewData[item].weight < this.OXData[this.stepCount][where].weight))
    // 判斷只能 拿屬於自己的標誌 覆蓋格子周圍的敵方標誌且不可放在空格上
    if(this.result || this.choseLock || ((this.stepCount === 0) && (target?.data !== 1)) || ((this.stepCount === 1) && (target?.data !== -1)) || (!canPlace.length)) {
      this.setStatus()
      return
    }
    //更新選擇畫面和鎖住選擇畫面跟再次選取
    this.OXData[this.stepCount][where].amount++
    this.updateChose((this.checkRecord[index][this.checkRecord[index].length - 1].content === 1) ? this.marks[0] : this.marks[1],this.checkRecord[index][this.checkRecord[index].length - 1].useSize)
    this.choseLock = true
    //還原上一次修改的資料
    const lastTarget = this.checkRecord[index][this.checkRecord[index].length - 2]
    const nowTarget = this.checkRecord[index][this.checkRecord[index].length - 1]
    this.updateViewData(index,lastTarget?.content || 0,lastTarget?.useSize || nowTarget.useSize,lastTarget?.useSize ? (3 - (lastTarget?.useSize)) : 0)
    this.recordService.updatedAllRecords(0,{wherePlace: index,content: (lastTarget?.content || 0),useSize:(lastTarget?.useSize || nowTarget.useSize),stepID:this.allRecords[0].length,status:clickStatus.grab})
    this.recordService.updatedCheckRecord(index)
    this.setStatus()
  }
  // 判斷勝負
  judgeVictory() {
    this.result = 0
    let conditionArr = []
    const condition1 = this.viewData[0].data + this.viewData[4].data + this.viewData[8].data
    const condition2 = this.viewData[2].data + this.viewData[4].data + this.viewData[6].data
    conditionArr.push(condition1,condition2)
    for(let i = 0 ;i<3; i++) {
      const condition3 = this.viewData[3*i].data + this.viewData[3*i+1].data + this.viewData[3*i+2].data
      const condition4 = this.viewData[i].data + this.viewData[i+3].data + this.viewData[i+6].data
      conditionArr.push(condition3,condition4)
    }
    const player1Win = conditionArr.some((item)=> item === 3)
    const player2Win = conditionArr.some((item)=> item === -3)
    if(player1Win && player2Win) this.result = 2
    else if(player1Win) this.result = 1
    else if(player2Win) this.result = -1
    // 計算對戰或紀錄模式時平手條件
    if(this.isBattle && !this.result) {
      // 當前選擇欄位剩餘最大重
      const target = this.OXData[this.stepCount].filter(item => item.amount > 0).map(item => item.weight)
      const maxChoseWeight = Math.max(...(target.length ? target : [0]))
      // 畫面敵對和空白最小重
      const minViewWeight = (this.stepCount === 0) ? Math.min(...this.viewData.filter((item) => item.data !== 1).map(item => item.weight)) :
      Math.min(...this.viewData.filter((item) => item.data !== -1).map(item => item.weight))
      if(maxChoseWeight > minViewWeight) return
      // 當自己的每個格子周圍都不能再拿取覆蓋時平手
      let proceeStatus = false
      let nowSign = this.marks[this.stepCount] === this.marks[0] ? 1 : -1
      for(let i = 0;i<9;i++) {
        if(!(this.viewData[i].data === nowSign)) continue
        for(let place of this.canMove[i]){
          if((this.viewData[i].weight > this.viewData[place].weight) && this.viewData[place].weight) {
            proceeStatus = true
            break
          }
        }
        if(proceeStatus) break
      }
      if(!proceeStatus) this.result = 2

    } else if(!this.nowRecord[this.nowFlag[1]] && !this.result) this.result = 2

    if(this.result && this.isBattle)this.recordService.noteGame()
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
    for(let items of target){
      for(let item of items){
        if(item.status === clickStatus.grab) break

        if(item.content === 1)this.OXData[0][item.useSize].amount--
        else this.OXData[1][item.useSize].amount--
      }
    }
    for(let i = 0;i<this.checkRecord.length;i++) {
      const viewTarget = this.checkRecord[i].length ? this.checkRecord[i][this.checkRecord[i].length - 1] : false
      if(viewTarget)  this.updateViewData(viewTarget.wherePlace,viewTarget.content,viewTarget.useSize,this.OXData[this.stepCount].length - viewTarget.useSize)
    }

    this.judgeVictory()
  }

}
