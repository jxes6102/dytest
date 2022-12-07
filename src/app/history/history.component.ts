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

  ngOnInit(): void {
  }
  
  listData = this.gameService.getAllID()

  cancel(): void{
    this.gameService.setMode('')
    this.changeMode.emit('');
  }

  action(val:string): void{
    this.gameService.getChose(val)
    this.router.navigate(['/game'])
  }
}
