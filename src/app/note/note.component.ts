import { Component } from '@angular/core';
import { GameService } from '../game.service';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  
  get listData () {
    return this.gameService.getAllRecords
  }

  constructor(private gameService: GameService) {}

  ngOnInit(): void {}
  // 切換到紀錄模式
  action(val:number) {
    this.gameService.setMode(val + 1)
  }
}
