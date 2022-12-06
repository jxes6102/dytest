import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { buttonTData,version } from '../common.const';
import { GameService } from '../game.service';
@Component({
  selector: 'app-chose',
  templateUrl: './chose.component.html',
  styleUrls: ['./chose.component.css']
})
export class ChoseComponent {
  constructor(private gameService: GameService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  version = version
  buttonTData = buttonTData
  alertMessage = ''

  // 選擇模式
  action(mode:string): void {
    if((!this.gameService.getRecord()) && (mode === 'record')){
      this.alertMessage = 'Record is null !!'
      return
    }

    this.alertMessage = ''
    this.gameService.setMode(mode)
    
    // if(mode === 'battle') this.router.navigate(['/game'])

    this.router.navigate(['/game'])
  }

}
