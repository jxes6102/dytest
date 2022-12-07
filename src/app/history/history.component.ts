import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  constructor(private gameService: GameService,private router: Router,private route: ActivatedRoute) {}

  @Input() nowMode?: string;
  @Output() changeMode = new EventEmitter();

  changeModeName() {
    this.changeMode.emit('');
  }

  ngOnInit(): void {
    console.log('test', this.listData)
  }
  
  listData = this.gameService.getAllID()

  cancel(): void{
    this.gameService.setMode('')
    this.changeModeName()
  }
}
