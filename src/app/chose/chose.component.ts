import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { buttonTData,version } from '../common.const';
import { GameService } from '../game.service';
import { buttonType } from "../gamemodel.model";
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
    this.gameService.setRecord()
  }

  version:string = version
  buttonTData:buttonType[] = buttonTData
  alertMessage:string = ''
  mode:string = ''

  // 選擇模式
  action(name:string): void {
    this.gameService.choseMode(name)
    this.mode = this.gameService.getMode()
    this.alertMessage = this.gameService.getAlertMessage()
  }

}
