import { Component } from '@angular/core';
import { GameService } from '../game.service';
@Component({
  selector: 'app-step-bar',
  templateUrl: './step-bar.component.html',
  styleUrls: ['./step-bar.component.css']
})
export class StepBarComponent {
  value:string = ''

  constructor(private gameService: GameService) {}

  get stepLen() {
    return this.gameService.nowRecord.length
  }

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
