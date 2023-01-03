import { Component,Output,EventEmitter } from '@angular/core';
import { GameService } from '../game.service';
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

  get testlistData () {
    return this.gameService.gettestAllRecords()
  }

  constructor(private gameService: GameService) {}

  ngOnInit(): void {}
  // 切換到紀錄模式
  action(val:number) {
    // this.gameService.setMode('record')
    // this.noteAction.emit(this.listData[val])

    // QQQ
    this.gameService.setMode('record')
    this.noteAction.emit(this.testlistData[val + 1])
  }
}
