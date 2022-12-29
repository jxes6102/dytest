import { Component,Input } from '@angular/core';
import { GameService } from '../game.service';
@Component({
  selector: 'app-pick',
  templateUrl: './pick.component.html',
  styleUrls: ['./pick.component.css']
})
export class PickComponent {
  /*
    sign  定義符號
    oxData 選擇視窗資料
    playerNo 玩家編號
  */
  @Input() sign?: string
  @Input() playerNo?:number

  get oxData(){
    // return this.gameService.getMarks[this.playerNo || 0] === this.gameService.getMarks[0] ? this.gameService.getOData() : this.gameService.getXData()
    return this.gameService.testgetOXData[this.playerNo || 0]
  }

  constructor(private gameService: GameService) { }

  ngOnInit(): void {}

  // 更新選擇效果
  select(name:string) {
      this.gameService.updateChose(this.sign || '',name)
  }
}
