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

  getChange(val:any): void {
    this.mode = ''
  }

  ngOnInit(): void {
    // console.log('init ChoseComponent')
  }

  version = version
  buttonTData = buttonTData
  alertMessage = ''
  mode = ''

  // 選擇模式
  action(name:string): void {
    this.mode = name

    if((!this.gameService.getRecord()) && (this.mode === 'record')){
      this.alertMessage = 'Record is null !!'
      return
    }

    this.alertMessage = ''
    this.gameService.setMode(this.mode)
    
    if(this.mode === 'battle') this.router.navigate(['/game'])

  }

}
