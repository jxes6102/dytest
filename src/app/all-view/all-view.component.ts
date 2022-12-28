import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { viewType,stepType } from "../gamemodel.model";
@Component({
  selector: 'app-all-view',
  templateUrl: './all-view.component.html',
  styleUrls: ['./all-view.component.css']
})
export class AllViewComponent {
  /*
    mode  模式名稱
    status 點擊動作類別 
    whoWin 遊戲狀態 0:勝負未分 1:O獲勝 -1:X獲勝 2:平手
    nowSign 判斷是屬於O或X的回合
    markO and markX 兩方的符號
    stepMessage 步驟訊息
  */
  markO:string = this.gameService.getMarkO()
  markX:string = this.gameService.getMarkX()
  whoWin:number = this.gameService.getWin()
  mode:string = this.gameService.getMode()
  nowSign:string = this.gameService.getNowSign()
  stepMessage:string = this.gameService.getStepMessage()
  status:string = this.gameService.getStatus()
  AIStatus:boolean = this.gameService.getAIStatus()

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.setMode('battle')
    this.mode = this.gameService.getMode()
  }
  // 點擊格子
  action(): void{
    // console.log('c')
    this.whoWin = this.gameService.getWin()
    this.nowSign = this.gameService.getNowSign()
    this.stepMessage = this.gameService.getStepMessage()
    this.status = this.gameService.getStatus()
  }
  // 重置遊戲
  renewGame(): void {
    this.gameService.resetGame()
    this.gameService.clearView()
    this.nowSign = this.gameService.getNowSign()
    this.whoWin = this.gameService.getWin()
    this.stepMessage = this.gameService.getStepMessage()
    this.status = this.gameService.getStatus()
  }
  //上一步
  last(): void {
    this.gameService.actionRecord(-1)
    this.whoWin = this.gameService.getWin()
    this.stepMessage = this.gameService.getStepMessage()
  }
  //下一步
  next(): void {
    this.gameService.actionRecord(1)
    this.whoWin = this.gameService.getWin()
    this.stepMessage = this.gameService.getStepMessage()
  }
  //  切換到紀錄模式
  toRecord (data:stepType[]) {
    this.renewGame()
    this.gameService.getChose(data)
    this.mode = this.gameService.getMode()
    this.stepMessage = this.gameService.getStepMessage()
  }
  //  切換到對戰模式
  toBattle() {
    this.gameService.setMode('battle')
    this.mode = this.gameService.getMode()
    this.renewGame()
    this.stepMessage = this.gameService.getStepMessage()
  }
  // 和電腦對戰
  toRobot () {
    this.renewGame()
    this.gameService.setAIStatus()
    this.AIStatus = this.gameService.getAIStatus()
    this.nowSign = this.gameService.getNowSign()
  }
  //切換狀態
  changeStatus() {
    this.gameService.setStatus()
    this.status = this.gameService.getStatus()
  }
}
