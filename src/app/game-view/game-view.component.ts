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

  test(): void {
    console.log('getMode:',this.gameService.getMode())
  }

  back(): void {
    this.router.navigate(['/'])
    this.gameService.clearMode()
  }

}
