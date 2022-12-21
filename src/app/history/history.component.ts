import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { stepType } from "../gamemodel.model";
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  @Input() nowMode?: string
  @Output() changeMode = new EventEmitter()
  listData:stepType[][] = this.gameService.getAllRecords()

  constructor(private gameService: GameService,private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {

  }
  
  // 取消選擇紀錄頁面
  cancel(): void{
    this.gameService.setMode('')
    this.changeMode.emit('')
  }
  // 進入紀錄模式
  action(val:number): void{
    this.gameService.getChose(this.listData[val])
    this.router.navigate(['/game'])
  }
}
