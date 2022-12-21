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
  listData:stepType[][] = this.gameService.getAllRecords()

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.setRecord()
    this.listData = this.gameService.getAllRecords()
  }

  action(val:number) {
    this.noteAction.emit(val)
  }
}
