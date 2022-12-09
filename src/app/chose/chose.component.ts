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

  getChange(): void {
    this.mode = ''
  }

  ngOnInit(): void {
  }

  version = version
  buttonTData = buttonTData
  alertMessage = ''
  mode = ''

  // 選擇模式
  action(name:string): void {
    
    if((!this.gameService.getAllID().length) && (name === 'record')){
      this.alertMessage = 'Record is null !!'
      return
    }

    this.mode = name
    this.alertMessage = ''
    this.gameService.setMode(this.mode)
    
    if(this.mode === 'battle') this.router.navigate(['/game'])

  }

}
