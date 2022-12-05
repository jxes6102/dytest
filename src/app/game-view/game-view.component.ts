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
    // console.log(this.gameService.getViewData())
  }
  viewData = this.gameService.getViewData()
  whoWin = this.gameService.getWin()

  test(): void {
    // console.log('getMode:',this.gameService.getMode())
  }

  back(): void {
    this.router.navigate(['/'])
    this.gameService.clearMode()
    this.gameService.resetGame()
    this.whoWin = this.gameService.getWin()
  }

  action(name:string): void{
    this.gameService.playerCilck(name)
    this.whoWin = this.gameService.getWin()
  }

  renewGame(): void {
    this.gameService.resetGame()
    this.whoWin = this.gameService.getWin()
  }

}
