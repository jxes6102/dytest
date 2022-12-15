import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { viewType,xoType } from "../gamemodel.model";
@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit{
  constructor(private gameService: GameService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.mode === '') this.router.navigate(['/'])
    else if(this.mode === 'battle') {
      this.gameService.setGameID()
      this.gameID = this.gameService.getGameID()
    }
  }
  /*
    gameID 該局遊戲ID
    recordID 紀錄模式時的遊戲ID
    mode  模式名稱
    viewData  畫面資料 className識別所點區域 data紀錄圈叉 sizeOX大小
    whoWin 遊戲狀態 0:勝負未分 1:O獲勝 -1:X獲勝 9:平手
    round 判斷是屬於O或X的回合
    whichSize O或X選到的大小
  */
  whichSize:number = 0
  round:number = 0
  xData:xoType[] = [
    {styleName:"bigSize",amount:3,isChose:false,weight:3},
    {styleName:"mediumSize",amount:3,isChose:false,weight:2},
    {styleName:"smallSize",amount:3,isChose:false,weight:1},
  ]
  oData:xoType[] = [
    {styleName:"bigSize",amount:3,isChose:false,weight:3},
    {styleName:"mediumSize",amount:3,isChose:false,weight:2},
    {styleName:"smallSize",amount:3,isChose:false,weight:1},
  ]
  viewData:viewType[] = [
    {className:"square0",data:0,size:'',weight:0},
    {className:"square1",data:0,size:'',weight:0},
    {className:"square2",data:0,size:'',weight:0},
    {className:"square3",data:0,size:'',weight:0},
    {className:"square4",data:0,size:'',weight:0},
    {className:"square5",data:0,size:'',weight:0},
    {className:"square6",data:0,size:'',weight:0},
    {className:"square7",data:0,size:'',weight:0},
    {className:"square8",data:0,size:'',weight:0}
  ]
  whoWin:number = this.gameService.getWin()
  mode:string = this.gameService.getMode()
  gameID:number = this.gameService.getGameID()
  recordID:string = this.gameService.getRecordID()

  // 回上頁
  back(): void {
    this.router.navigate(['/'])
    this.gameService.clearMode()
    for(let key in this.viewData) this.viewData[key].data = 0
    this.gameService.resetGame()
    this.whoWin = this.gameService.getWin()
  }
  // 點擊格子
  action(name:string): void{
    /*
      index 選擇的畫面位置
      nowSign 屬於O或X的回合
    */
    const index = this.viewData.findIndex((item) => item.className == name)
    const nowSign = this.round %2 === 0 ? "O" : "X"
    this.whichSize = nowSign === 'O' ? this.oData.findIndex((item) => item.isChose) : this.xData.findIndex((item) => item.isChose)
    // 判斷是否可點擊
    const canClick = this.gameService.ableClick(this.oData,this.xData,nowSign,this.whichSize,this.viewData[index])
    // 判斷是否可覆蓋
    const canCover = this.gameService.canCover(nowSign,this.oData,this.xData,this.viewData[index].weight)
    if(!canClick || !canCover) return

    const sizeName = this.oData[this.whichSize].styleName
    this.viewData[index].data = this.gameService.playerCilck(index,sizeName) || 0
    this.viewData[index].size = sizeName
    this.viewData[index].weight = this.gameService.getViewWeight(nowSign,this.oData,this.xData)
    
    if(nowSign === 'O') this.oData[this.whichSize].amount--
    else this.xData[this.whichSize].amount--
    
    this.gameService.judgeVictory(this.viewData,this.oData,this.xData)
    this.whoWin = this.gameService.getWin()
    this.round++
 
  }
  // 重置遊戲
  renewGame(): void {
    this.gameService.resetGame()
    // 清除遊戲畫面
    for(let key in this.viewData) this.viewData[key].data = 0
    for(let key in this.viewData) this.viewData[key].size = ''
    for(let key in this.viewData) this.viewData[key].weight = 0
    
    // 重置選擇效果
    this.round = 0
    for(let item of this.oData){
      item.isChose = false
      item.amount = 3
    }
    for(let item of this.xData){
      item.isChose = false
      item.amount = 3
    } 

    this.gameService.setGameID()
    this.gameID = this.gameService.getGameID()

    this.whoWin = this.gameService.getWin()
  }
  //上一步
  last(): void {
    this.viewData = this.gameService.actionRecord(-1,this.viewData) || this.viewData
    this.whoWin = this.gameService.getWin()
  }
  //下一步
  next(): void {
    this.viewData = this.gameService.actionRecord(1,this.viewData) || this.viewData
    this.whoWin = this.gameService.getWin()
  }
  // 更新選擇效果
  getChose(data:string[]): void {
    // 當不是自己的回合時無法選擇自己的大小
    /*
      sign 選擇的O OR X
      choseName 樣式名稱
    */
    const sign = data[1]
    const choseName = data[0]
    if(((this.round %2 == 0) && (sign === 'X')) || ((this.round %2 == 1) && (sign === 'O'))) return

    switch (sign) {
      case 'O': {
        for(let key in this.oData) {
          if(this.oData[key].styleName === choseName) this.oData[key].isChose = true
          else this.oData[key].isChose = false
        }
        break
      }
      case 'X': {
        for(let key in this.xData) {
          if(this.xData[key].styleName === choseName) this.xData[key].isChose = true
          else this.xData[key].isChose = false
        }
        break
      }
    }

  }

}
