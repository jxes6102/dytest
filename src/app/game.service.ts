import { Injectable } from '@angular/core';
import { viewType,stepType,xoType,viewData,checkData,tsetselectData } from "./gamemodel.model";

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
    xData and oData 選擇視窗資料
    viewData  畫面資料 styleName識別所點區域 data紀錄圈叉 sizeOX大小
    AIStatus 電腦是否遊玩
    AIfirst 電腦是否先手 1先手 0後手
    marks 定義符號
    testOXData 選擇視窗資料 index 0 for O,index 1 for X
  */
  mode:string
  status:string
  step:number
  result:number
  allRecords:stepType[][] = []
  checkRecord:stepType[][] = new checkData().getData
  gameStep:stepType[]
  // xData:xoType[] = new selectData().getData
  // oData:xoType[] = new selectData().getData
  viewData:viewType[] = new viewData().getData
  AIStatus:boolean = false
  AIfirst:number = Math.floor(Math.random() * 2)
  testOXData:xoType[][] = new tsetselectData().getData

  marks:string[] = ["O","X"]
  constructor() {
    this.result = 0
    this.step = 0
    this.gameStep = []
    this.mode = ''
    this.status = 'click'
    this.setRecord()
    // console.log('testOXData',this.testOXData)

  }
  // 拿取符號
  get getMarks () {
    return this.marks
  }
  // 拿取模式
  getMode() {
    return this.mode
  }
  // 設定模式
  setMode(name: string) {
    this.mode = name
  }
  // 拿取勝利者
  getWin() {
    return this.result
  }
  //拿取oxdata
  // getOData () {
  //   return this.oData
  // }
  // getXData () {
  //   return this.xData
  // }
  get testgetOXData() {
    return this.testOXData
  }
  //拿取viewdata
  getViewData () {
    return this.viewData
  }
  // 拿取電腦遊玩狀態
  getAIStatus () {
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
  getStatus () {
    return this.status
  }
  //拿取步驟訊息
  getStepMessage() {
    const target = (this.mode === 'battle') ? this.gameStep[this.gameStep.length - 1] : this.gameStep[this.step - 1]
    if (!target)  return (this.mode === 'record') ? '這是上' + (this.allRecords.length - this.allRecords.indexOf(this.gameStep)) + '場' : '開始'
    
    const where = (target?.wherePlace || 0) + 1
    if(target.status === 'click') {
      const sign = (target?.content === 1) ? this.marks[0] : this.marks[1]
      return sign + '用了' + target?.useSize + '下在第' + where + '格'
    } else {
      if (this.mode === 'battle') return '拿了在第' + where +'格的'+ this.getNowSign()
      else return '拿了在第' + where +'格的' + ((this.gameStep[this.step - 3].content === 1) ? this.marks[0] : this.marks[1])
    }
    
  }
  //清除畫面
  clearView() {
    // 清除遊戲畫面
    for(let key in this.viewData) this.viewData[key].data = 0
    for(let key in this.viewData) this.viewData[key].size = ""
    for(let key in this.viewData) this.viewData[key].weight = 0

    // 重置選擇畫面效果
    // for(let item of this.oData){
    //   item.isChose = false
    //   item.amount = 3
    // }
    // for(let item of this.xData){
    //   item.isChose = false
    //   item.amount = 3
    // }
    for(let index in this.testOXData) {
      for(let item of this.testOXData[index]) {
        item.isChose = false
        item.amount = 3
      }
    }
  }
  // 更新選擇效果
  updateChose (sign:string,choseName:string) {
    // 當不是自己的回合時無法選擇自己的大小
    if(((this.step % 2 == 0) && (sign === this.marks[1])) || ((this.step % 2 == 1) && (sign === this.marks[0]))) return
    switch (sign) {
      case this.marks[0]: {
        // for(let key in this.oData) {
        //   if(this.oData[key].styleName === choseName) this.oData[key].isChose = true
        //   else this.oData[key].isChose = false
        // }
        for(let key in this.testOXData[0]) {
          if(this.testOXData[0][key].styleName === choseName) this.testOXData[0][key].isChose = true
          else this.testOXData[0][key].isChose = false
        }
        break
      }
      case this.marks[1]: {
        // for(let key in this.xData) {
        //   if(this.xData[key].styleName === choseName) this.xData[key].isChose = true
        //   else this.xData[key].isChose = false
        // }
        for(let key in this.testOXData[1]) {
          if(this.testOXData[1][key].styleName === choseName) this.testOXData[1][key].isChose = true
          else this.testOXData[1][key].isChose = false
        }
        break
      }
    }
  }
  // 確認此回合的標誌 
  getNowSign() {
    return this.marks[this.step % 2]
  }
  //  點擊格子
  clickAction(name:string) {
    if(this.status === 'click') this.clickProcess(name)
    else this.grabProcess(name)
  }
  // 點擊動作
  clickProcess(name:string) {
    const index = this.viewData.findIndex((item) => item.styleName == name)
    const nowSign = this.getNowSign()
    // const whichSize = nowSign === this.marks[0] ? this.oData.findIndex((item) => item.isChose) : this.xData.findIndex((item) => item.isChose)
    const whichSize = nowSign === this.marks[0] ? this.testOXData[0].findIndex((item) => item.isChose) : this.testOXData[1].findIndex((item) => item.isChose)
    // 判斷是否可點擊
    const canClick = this.ableClick(whichSize,this.viewData[index])
    // 判斷是否可覆蓋
    const canCover = this.canCover(this.viewData[index].weight)

    if(!canClick || !canCover) return
    // 給予畫面資料
    this.step++
    // const sizeName = this.oData[whichSize].styleName
    const sizeName = this.testOXData[0][whichSize].styleName
    const data = (this.step % 2 == 1) ? 1 : -1
    this.viewData[index].weight = this.getViewWeight()
    this.viewData[index].data = data
    this.viewData[index].size = sizeName

    // if(nowSign === this.marks[0]) this.oData[whichSize].amount--
    // else this.xData[whichSize].amount--
    if(nowSign === this.marks[0]) this.testOXData[0][whichSize].amount--
    else this.testOXData[1][whichSize].amount--
    //紀錄
    this.checkRecord[index].push({wherePlace: index,content: data,useSize:sizeName,stepID:this.gameStep.length + 1,status:'click'})
    this.gameStep.push({wherePlace: index,content: data,useSize:sizeName,stepID:this.gameStep.length + 1,status:'click'})
    // 勝負判斷
    this.judgeVictory()
    // 判斷勝敗狀態、對戰模式 來決定電腦動作
    if((this.result !== 0) || !this.AIStatus) return 
    else this.checkNext()
  }
  // 拿取動作
  grabProcess(name:string) {
    const index = this.viewData.findIndex((item) => item.styleName == name)
    const target = this.viewData[index]
    // 同一回合只能拿一次
    const lastStep = this.gameStep[this.gameStep.length - 1]
    if(lastStep?.status === 'grab') {
      this.setStatus()
      return
    }
    // 判斷只能拿屬於自己的OX之後將拿回的OX加到選擇畫面上
    switch (this.getNowSign()) {
      case this.marks[0]: {
        if(target?.data !== 1) return
        
        // const where = this.oData.findIndex((item)=> item.styleName === target.size)
        // this.oData[where].amount++
        const where = this.testOXData[0].findIndex((item)=> item.styleName === target.size)
        this.testOXData[0][where].amount++
        break
      }
      case this.marks[1]: {
        if(target?.data !== -1) return
        // const where = this.xData.findIndex((item)=> item.styleName === target.size)
        // this.xData[where].amount++
        const where = this.testOXData[1].findIndex((item)=> item.styleName === target.size)
        this.testOXData[1][where].amount++
        break
      }
    }
    //還原上一次修改的資料
    this.checkRecord[index].pop()
    const lastTarget = this.checkRecord[index][this.checkRecord[index].length - 1]
    this.viewData[index].data = lastTarget?.content || 0
    this.viewData[index].size = lastTarget?.useSize || ''
    // this.viewData[index].weight = lastTarget?.useSize ? (this.oData.length - this.oData.findIndex((item)=> item.styleName === lastTarget?.useSize)) : 0
    this.viewData[index].weight = lastTarget?.useSize ? (this.testOXData[1].length - this.testOXData[1].findIndex((item)=> item.styleName === lastTarget?.useSize)) : 0
    this.gameStep.push({wherePlace: index,content: (lastTarget?.content || 0),useSize:(lastTarget?.useSize || ''),stepID:this.gameStep.length + 1,status:'grab'})

    this.setStatus()

  }
  // 判斷是否可放入當前格子
  ableClick(where:number,viewData:viewType) {
    const nowSign = this.getNowSign()
    // 檢查模式、結果、是否選擇尺寸
    if(this.mode === 'record' || this.result !== 0 || (where === -1)) return false
    // 檢查數量、是否點擊敵對格或空白格
    // const canClickO = (this.oData[where].amount > 0) && (nowSign === this.marks[0]) && (viewData.data <= 0)
    // const canClickX = (this.xData[where].amount > 0) && (nowSign === this.marks[1]) && (viewData.data >= 0)
    const canClickO = (this.testOXData[0][where].amount > 0) && (nowSign === this.marks[0]) && (viewData.data <= 0)
    const canClickX = (this.testOXData[1][where].amount > 0) && (nowSign === this.marks[1]) && (viewData.data >= 0)

    return (nowSign === this.marks[0]) ? canClickO : canClickX
  }
  // 是否能覆蓋
  canCover (viewWeight:number) {
    const nowSign = this.getNowSign()
    // const choseWeight = (nowSign === this.marks[0] ? this.oData.find((item) => item.isChose)?.weight : this.xData.find((item) => item.isChose)?.weight) || 0
    const choseWeight = (nowSign === this.marks[0] ? this.testOXData[0].find((item) => item.isChose)?.weight : this.testOXData[1].find((item) => item.isChose)?.weight) || 0
    return choseWeight > viewWeight
  }
  // 拿取畫面權重
  getViewWeight () {
    const nowSign = this.marks[1 - this.step % 2]
    // return (nowSign === this.marks[0] ? this.oData.find((item) => item.isChose)?.weight : this.xData.find((item) => item.isChose)?.weight) || 0
    return (nowSign === this.marks[0] ? this.testOXData[0].find((item) => item.isChose)?.weight : this.testOXData[1].find((item) => item.isChose)?.weight) || 0
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
      // const target = (this.step % 2 === 0) ? this.oData.filter(item => item.amount > 0).map(item => item.weight) : this.xData.filter(item => item.amount > 0).map(item => item.weight)
      const target = (this.step % 2 === 0) ? this.testOXData[0].filter(item => item.amount > 0).map(item => item.weight) : this.testOXData[1].filter(item => item.amount > 0).map(item => item.weight)
      const maxChoseWeight = Math.max(...(target.length ? target : [0]))
      // 畫面敵對和空白最小重
      const minViewWeight = (this.step % 2 === 0) ? Math.min(...this.viewData.filter((item) => item.data !== 1).map(item => item.weight)) :
      Math.min(...this.viewData.filter((item) => item.data !== -1).map(item => item.weight))
      // 選擇欄位剩餘數量
      // const count = this.oData.concat(this.xData).reduce((acc, item) => acc + item.amount,0)
      // const count = this.testOXData[0].concat(this.testOXData[1]).reduce((acc, item) => acc + item.amount,0)
      const count = this.testOXData.flat(1).reduce((acc, item) => acc + item.amount,0)
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

        this.viewData[this.gameStep[this.step].wherePlace].data = this.gameStep[this.step].content
        this.viewData[this.gameStep[this.step].wherePlace].size = this.gameStep[this.step].useSize
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
          this.viewData[this.gameStep[this.step].wherePlace].data = lastRecord?.content || 0
          this.viewData[this.gameStep[this.step].wherePlace].size = lastRecord?.useSize || ''
        } else {
          this.viewData[this.gameStep[this.step].wherePlace].data = 0
          this.viewData[this.gameStep[this.step].wherePlace].size = ''
        }
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
  getChose(data:stepType[]) {
    this.gameStep = data
  }
  // 拿取本地端的紀錄
  setRecord() {
    const local = JSON.parse(localStorage.getItem('record') || '[]')
    if(local) this.allRecords = local
  }
  // 電腦動作
  checkNext() {
    // console.log('=====================')
    const nowSign = this.getNowSign()
    // let selectData = nowSign === this.marks[0] ? this.oData : this.xData
    let selectData = nowSign === this.marks[0] ? this.testOXData[0] : this.testOXData[1]
    let selectTarget = selectData.find((item) => item.amount > 0)
    let canPlace = this.viewData.filter((item) => (item.weight < (selectTarget?.weight || 0)) && (item.data !== (this.getNowSign() === this.marks[0] ? 1 : -1))).map((item) => item.styleName)
    if(!canPlace.length) return

    // const whichSize = nowSign === this.marks[0] ? this.oData.findIndex((item) => item.weight === selectTarget?.weight) : this.xData.findIndex((item) => item.weight === selectTarget?.weight)
    const whichSize = nowSign === this.marks[0] ? this.testOXData[0].findIndex((item) => item.weight === selectTarget?.weight) : this.testOXData[1].findIndex((item) => item.weight === selectTarget?.weight)
    let chose = Math.floor(Math.random() * canPlace.length)
    const index = this.viewData.findIndex((item) => item.styleName == canPlace[chose])

    // 給予畫面資料
    this.step++
    // const sizeName = this.oData[whichSize].styleName
    const sizeName = this.testOXData[0][whichSize].styleName
    const data = (nowSign === this.marks[0]) ? 1 : -1
    this.viewData[index].weight = selectTarget?.weight || 0
    this.viewData[index].data = data
    this.viewData[index].size = sizeName
 
    // if(nowSign === this.marks[0]) this.oData[whichSize].amount--
    // else this.xData[whichSize].amount--
    if(nowSign === this.marks[0]) this.testOXData[0][whichSize].amount--
    else this.testOXData[1][whichSize].amount--
    //紀錄
    this.checkRecord[index].push({wherePlace: index,content: data,useSize:sizeName,stepID:this.gameStep.length + 1,status:'click'})
    this.gameStep.push({wherePlace: index,content: data,useSize:sizeName,stepID:this.gameStep.length + 1,status:'click'})

    this.judgeVictory()
  }
}
