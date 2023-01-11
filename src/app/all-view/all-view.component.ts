import { Component } from '@angular/core';
import { GameService } from '../game.service';
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
    marks 兩方的符號
    stepMessage 步驟訊息
    AIStatus 電腦對戰狀態
  */
  get marks () {
    return this.gameService.getMarks
  }
  get nowSign () {
    return this.gameService.getMarks[this.gameService.stepCount]
  }
  get whoWin () {
    return this.gameService.getWin
  }
  get mode () {
    return this.gameService.isBattle ? 'battle' : 'record'
  }
  get stepMessage () {
    return this.gameService.getStepMessage
  }
  get status () {
    return this.gameService.getStatus
  }

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.recoverData()
  }
  // 重置遊戲
  renewGame(): void {
    this.gameService.resetGame()
    this.gameService.clearView()
  }
  // 切換到對戰模式
  toBattle() {
    this.gameService.setMode(0)
    this.gameService.recoverData()
  }
  //切換狀態
  changeStatus() {
    this.gameService.setStatus()
  }
}
