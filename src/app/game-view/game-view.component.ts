import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent {
  constructor(private gameService: GameService,private router: Router,private route: ActivatedRoute) { }

  test(): void {
    console.log('getMode:',this.gameService.getMode())
  }

  back(): void {
    this.router.navigate(['/'])
    this.gameService.clearMode()
  }
}
