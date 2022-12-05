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

  ngOnInit(): void {
    // console.log(this.gameService.getMode())
  }

  buttonTData = buttonTData
  // 選擇模式
  action(mode:string): void {
    if((!this.gameService.getRecord()) && (mode === 'record')){
      console.log('Record is null !!!!!')
      return
    }
    this.gameService.setMode(mode)
    this.router.navigate(['/game']);
  }

}
