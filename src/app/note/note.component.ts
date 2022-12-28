import { Component,Output,EventEmitter } from '@angular/core';
import { GameService } from '../game.service';
import { stepType } from "../gamemodel.model";
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Output() noteAction = new EventEmitter()
  
  get listData () {
    return this.gameService.getAllRecords()
  }

  constructor(private gameService: GameService) {}

  ngOnInit(): void {}
  // 切換到紀錄模式
  action(val:number) {
    this.gameService.setMode('record')
    this.noteAction.emit(this.listData[val])
  }
}
