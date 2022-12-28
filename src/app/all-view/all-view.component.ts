import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { stepType } from "../gamemodel.model";
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
  get markO () {
    return this.gameService.getMarkO()
  }
  get markX () {
    return this.gameService.getMarkX()
  }
  get whoWin () {
    return this.gameService.getWin()
  }
  get mode () {
    return this.gameService.getMode()
  }
  get nowSign () {
    return this.gameService.getNowSign()
  }
  get stepMessage () {
    return this.gameService.getStepMessage()
  }
  get status () {
    return this.gameService.getStatus()
  }
  get AIStatus () {
    return this.gameService.getAIStatus()
  }

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.setMode('battle')
  }
  // 重置遊戲
  renewGame(): void {
    this.gameService.resetGame()
    this.gameService.clearView()
  }
  //上一步
  last(): void {
    this.gameService.actionRecord(-1)
  }
  //下一步
  next(): void {
    this.gameService.actionRecord(1)
  }
  //  切換到紀錄模式
  toRecord (data:stepType[]) {
    this.renewGame()
    this.gameService.getChose(data)
  }
  //  切換到對戰模式
  toBattle() {
    this.gameService.setMode('battle')
    this.renewGame()
  }
  // 和電腦對戰
  toRobot () {
    this.renewGame()
    this.gameService.setAIStatus()
  }
  //切換狀態
  changeStatus() {
    this.gameService.setStatus()
  }
}
