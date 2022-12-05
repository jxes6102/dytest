import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit{
  constructor(private gameService: GameService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.mode)
  }
  viewData = this.gameService.getViewData()
  whoWin = this.gameService.getWin()
  mode = this.gameService.getMode()

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
    this.whoWin = this.gameService.getWin()
  }

}
