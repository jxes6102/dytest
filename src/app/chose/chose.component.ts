import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { buttonTData } from '../common.const';
import { GameService } from '../game.service';
@Component({
  selector: 'app-chose',
  templateUrl: './chose.component.html',
  styleUrls: ['./chose.component.css']
})
export class ChoseComponent {
  constructor(private gameService: GameService,private router: Router,private route: ActivatedRoute) { }
  title = 'dytest'
  buttonTData = buttonTData

  action(mode:string): void {
    this.gameService.setMode(mode)
    this.router.navigate(['/game']);
  }

  test(): void {
    console.log('getMode:',this.gameService.getMode())
  }
}
