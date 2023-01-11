import { Component } from '@angular/core';
import { GameService } from '../game.service';
@Component({
  selector: 'app-step-bar',
  templateUrl: './step-bar.component.html',
  styleUrls: ['./step-bar.component.css']
})
export class StepBarComponent {
  /**
   * value 查詢的值
   * stepLen 查詢上限
   * step 當前步驟
   */
  value:string = ''

  constructor(private gameService: GameService) {}

  get stepLen() {
    return this.gameService.nowRecord.length
  }
  get step () {
    return this.gameService.getStep
  }
  //發送要查的步驟
  send(data:string) {
    const target = Number(data)
    if((target <= 0) || (target > this.stepLen) || isNaN(target)) return

    this.gameService.skipAction(target)
    this.value = ''
  }
  //上一步
  last(): void {
    this.gameService.actionRecord(-1)
  }
  //下一步
  next(): void {
    this.gameService.actionRecord(1)
  }
}
