import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { viewType } from "../gamemodel.model";
@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit{
  constructor(private gameService: GameService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.mode === '') this.router.navigate(['/'])
    else if(this.mode === 'battle') {
      this.gameService.setGameID()
      this.gameID = this.gameService.getGameID()
    }
  }

  viewData:viewType[] = this.gameService.getViewData()
  whoWin:number = this.gameService.getWin()
  mode:string = this.gameService.getMode()
  gameID:number = this.gameService.getGameID()
  recordID:string = this.gameService.getRecordID()

  // 回上頁
  back(): void {
    this.router.navigate(['/'])
    this.gameService.clearMode()
    this.gameService.resetGame()
    this.whoWin = this.gameService.getWin()
  }
  // 點擊格子
  action(name:string): void{
    if(this.mode === 'record') return

    this.gameService.playerCilck(name)
    this.whoWin = this.gameService.getWin()
  }
  // 重置遊戲
  renewGame(): void {
    this.gameService.resetGame()

    this.gameService.setGameID()
    this.gameID = this.gameService.getGameID()
    
    this.whoWin = this.gameService.getWin()
  }
  //上一步
  last(): void {
    this.gameService.actionRecord(-1)
    this.whoWin = this.gameService.getWin()
  }
  //下一步
  next(): void {
    this.gameService.actionRecord(1)
    this.whoWin = this.gameService.getWin()
  }

}
