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
    return this.gameService.getRecordData.length
  }

  send(data:string) {
    const target = Number(data)
    if((target <= 0) || (target > this.stepLen )) return
    // console.log('dodo')
    this.gameService.skipAction(target - 1)
  }
}
