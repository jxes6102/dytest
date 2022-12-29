import { Component,Input } from '@angular/core';
import { GameService } from '../game.service';
@Component({
  selector: 'app-pick',
  templateUrl: './pick.component.html',
  styleUrls: ['./pick.component.css']
})
export class PickComponent {
  /*
    playerNo 玩家編號
    sign  定義符號
    oxData 選擇視窗資料
  */
  @Input() playerNo?:number

  get oxData() {
    return this.gameService.getOXData[this.playerNo || 0]
  }

  get sign() {
    return this.gameService.getMarks[this.playerNo || 0]
  }

  cssStyle:string[] = ['bigSize','mediumSize','smallSize']

  constructor(private gameService: GameService) { }

  ngOnInit(): void {}

  // 更新選擇效果
  select(val:number) {
    this.gameService.updateChose(this.sign || '',val)
  }
}
