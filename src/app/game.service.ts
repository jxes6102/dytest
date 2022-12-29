import { Injectable } from '@angular/core';
import { viewType,stepType,xoType,viewData,checkData,selectData } from "./gamemodel.model";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  /*
    mode  模式名稱
    status 點擊動作類別 
    step 遊戲步數
    result 遊戲狀態 0:勝負未分 1:O獲勝 -1:X獲勝 2:平手
    allRecords 所有遊戲紀錄
    checkRecord 紀錄每個格子的修改紀錄
    gameStep 該局遊戲紀錄
    viewData  畫面資料 styleName識別所點區域 data紀錄圈叉 sizeOX大小
    AIStatus 電腦是否遊玩
    AIfirst 電腦是否先手 1先手 0後手
    marks 定義符號
    OXData 選擇視窗資料 index 0 for player1,index 1 for player2
  */
  mode:string
  status:string
  step:number
  result:number
  allRecords:stepType[][] = []
  checkRecord:stepType[][] = new checkData().getData
  gameStep:stepType[]
  viewData:viewType[] = new viewData().getData
  AIStatus:boolean = false
  AIfirst:number = Math.floor(Math.random() * 2)
  OXData:xoType[][] = new selectData().getData
  marks:string[] = ["O","X"]

  constructor() {
    this.result = 0
    this.step = 0
    this.gameStep = []
    this.mode = ''
    this.status = 'click'
    this.setRecord()

  }
  // 拿取符號
  get getMarks () {
    return this.marks
  }
  // 計算步驟
  get stepCount () {
    return this.step % 2
  }
  // 拿取模式
  get getMode() {
    return this.mode
  }
  // 設定模式
  setMode(name: string) {
    this.mode = name
  }
  // 拿取勝利者
  get getWin() {
    return this.result
  }
  get getOXData() {
    return this.OXData
  }
  //拿取viewdata
  get getViewData () {
    return this.viewData
  }
  // 拿取電腦遊玩狀態
  get getAIStatus () {
    return this.AIStatus
  }
  // 改變電腦遊玩狀態
  setAIStatus () {
    this.AIStatus = !this.AIStatus
    this.AIfirst = Math.floor(Math.random() * 2)
    if(this.AIStatus && this.AIfirst) this.checkNext()
  }
  // 設定遊戲遊玩狀態
  setStatus () {
    if(this.status === 'click') this.status = 'grab'
    else this.status = 'click'
  }
  // 拿取遊戲遊玩狀態
  get getStatus () {
    return this.status
  }
  //拿取步驟訊息
  getStepMessage() {
    const target = (this.mode === 'battle') ? this.gameStep[this.gameStep.length - 1] : this.gameStep[this.step - 1]
    if (!target)  return (this.mode === 'record') ? '這是上' + (this.allRecords.length - this.allRecords.indexOf(this.gameStep)) + '場' : '開始'
    
    const where = (target?.wherePlace || 0) + 1
    const adjArr = ['bigSize','mediumSize','smallSize']
    if(target.status === 'click') return this.marks[1 - this.stepCount] + '用了' + adjArr[target?.useSize] + '下在第' + where + '格'
    else {
      if (this.mode === 'battle') return '拿了在第' + where + '格的' + this.marks[this.stepCount]
      else {
        // console.log('dodo')
        return '拿了在第' + where + '格的' + ((this.gameStep[this.step - 3].content === 1) ? this.marks[1] : this.marks[0])
      }
    }
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
  //點擊格子
  clickAction(index:number) {
    if(this.status === 'click') this.clickProcess(index)
    else this.grabProcess(index)
  }
  // 點擊動作
  clickProcess(index:number) {
    const whichSize = this.OXData[this.stepCount].findIndex((item) => item.isChose)
    // 檢查模式、結果、是否選擇尺寸
    if(this.mode === 'record' || this.result !== 0 || (whichSize === -1)) return
    // 判斷是否可點擊
    const canClick = (this.OXData[this.stepCount][whichSize].amount > 0) && (this.stepCount === 0 ? this.viewData[index].data <= 0 : this.viewData[index].data >= 0)
    // 判斷是否可覆蓋
    const canCover = (this.OXData[this.stepCount].find((item) => item.isChose)?.weight || 0) > this.viewData[index].weight
    if(!canClick || !canCover) return
    // 給予畫面資料
    this.step++
    const data = (this.stepCount == 1) ? 1 : -1
    this.updateViewData(index,data,whichSize,this.OXData[1 - this.stepCount].find((item) => item.isChose)?.weight || 0)
    this.OXData[1 - this.stepCount][whichSize].amount--
    //紀錄
    this.checkRecord[index].push({wherePlace: index,content: data,useSize:whichSize,stepID:this.gameStep.length + 1,status:'click'})
    this.gameStep.push({wherePlace: index,content: data,useSize:whichSize,stepID:this.gameStep.length + 1,status:'click'})
    // 勝負判斷
    this.judgeVictory()
    // 判斷勝敗狀態、對戰模式 來決定電腦動作
    if((this.result !== 0) || !this.AIStatus) return 
    else this.checkNext()
  }
  // 拿取動作
  grabProcess(index:number) {
    const target = this.viewData[index]
    // 同一回合只能拿一次
    const lastStep = this.gameStep[this.gameStep.length - 1]
    if(lastStep?.status === 'grab' || this.result !== 0) {
      this.setStatus()
      return
    }
    // 判斷只能拿屬於自己的OX之後將拿回的OX加到選擇畫面上
    if(((this.stepCount === 0) && (target?.data !== 1)) || ((this.stepCount === 1) && (target?.data !== -1))) return
    const where = this.OXData[this.stepCount].findIndex((item)=> item.isChose)
    this.OXData[this.stepCount][where].amount++

    //還原上一次修改的資料
    this.checkRecord[index].pop()
    const lastTarget = this.checkRecord[index][this.checkRecord[index].length - 1]
    this.updateViewData(index,lastTarget?.content || 0,lastTarget?.useSize || 0,lastTarget?.useSize ? (this.OXData[this.stepCount].length - this.OXData[this.stepCount].findIndex((item)=> item.isChose)) : 0)
    this.gameStep.push({wherePlace: index,content: (lastTarget?.content || 0),useSize:(lastTarget?.useSize || 0),stepID:this.gameStep.length + 1,status:'grab'})

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
    if(this.mode === 'battle') {
      // 當前選擇欄位剩餘最大重
      const target = this.OXData[this.stepCount].filter(item => item.amount > 0).map(item => item.weight)
      const maxChoseWeight = Math.max(...(target.length ? target : [0]))
      // 畫面敵對和空白最小重
      const minViewWeight = (this.stepCount === 0) ? Math.min(...this.viewData.filter((item) => item.data !== 1).map(item => item.weight)) :
      Math.min(...this.viewData.filter((item) => item.data !== -1).map(item => item.weight))
      // 選擇欄位剩餘數量
      const count = this.OXData.flat(1).reduce((acc, item) => acc + item.amount,0)
      // 選擇欄位剩餘數量等於零和勝負未分 當前選擇欄位剩餘的最大重大於等於畫面上敵對和空白格最小重和勝負未分 是平手
      if(((count === 0) && (this.result === 0)) || ((minViewWeight >= maxChoseWeight) && (this.result === 0))) this.result = 2

    } else if(!this.gameStep[this.step] && this.result === 0) this.result = 2

    if((this.result !== 0) && (this.mode === 'battle')) this.noteGame()

  }
  //重置遊戲
  resetGame() {
    this.gameStep = []
    this.step = 0
    this.result = 0
    this.status = 'click'
    this.checkRecord = new checkData().getData
  }
  //記錄此次遊戲，只記錄有分勝敗的局，最多5筆
  noteGame() {
    if((this.gameStep.length === 0) || (this.result === 0)){
      this.gameStep = []
      return
    }

    this.allRecords.push(this.gameStep)
    // 超過記錄上限時刪除
    if(this.allRecords.length > 5) this.allRecords.shift()

    localStorage.setItem('record', JSON.stringify(this.allRecords))

    this.gameStep = []
  }
  // 執行紀錄
  actionRecord (stepVal:number) {
    switch (stepVal) {
      case 1: {
        if((this.step === this.gameStep.length)) return

        this.updateViewData(this.gameStep[this.step].wherePlace,this.gameStep[this.step].content,this.gameStep[this.step].useSize)
        this.step += stepVal
        break
      }
      case -1: {
        if((this.step < 1)) return

        this.step += stepVal
        // 拿取這在此步驟之前(不包括自己)所有修改位置陣列
        const place = this.gameStep.slice(0,this.step).map((item)=> item.wherePlace)
        // 有修改此位置的紀錄時才還原成在上一次修改的同一格的OX
        if(place.includes(this.gameStep[this.step].wherePlace)) {
          // 取同位置上一次的修改紀錄
          const lastRecord = this.gameStep.filter((item) => (item.wherePlace === this.gameStep[this.step].wherePlace) && (item.stepID < this.gameStep[this.step].stepID)).pop()
          this.updateViewData(this.gameStep[this.step].wherePlace,lastRecord?.content || 0,lastRecord?.useSize || 0)
        } else this.updateViewData(this.gameStep[this.step].wherePlace,0,0)
        break
      }
    }

    if (this.gameStep[this.step - 1]?.status === 'click')  this.judgeVictory()
  }
  // 拿取遊戲紀錄
  getAllRecords() {
    return this.allRecords
  }
  // 拿取選擇的紀錄
  setChose(data:stepType[]) {
    this.gameStep = data
  }
  // 拿取本地端的紀錄
  setRecord() {
    const local = JSON.parse(localStorage.getItem('record') || '[]')
    if(local) this.allRecords = local
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
    this.step++
    const data = (this.stepCount === 1) ? 1 : -1
    this.updateViewData(index,data,whichSize,selectTarget?.weight || 0,)

    this.OXData[1 - this.stepCount][whichSize].amount--
    //紀錄
    this.checkRecord[index].push({wherePlace: index,content: data,useSize:whichSize,stepID:this.gameStep.length + 1,status:'click'})
    this.gameStep.push({wherePlace: index,content: data,useSize:whichSize,stepID:this.gameStep.length + 1,status:'click'})

    this.judgeVictory()
  }
  //更新遊戲畫面
  updateViewData (index:number,data:number,sizeIndex:number,weight?:number) {
    if(weight || weight === 0) this.viewData[index].weight = weight
    this.viewData[index].data = data
    this.viewData[index].size = sizeIndex
  }
}
