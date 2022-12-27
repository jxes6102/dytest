import { Component,Input } from '@angular/core';
import { xoType } from "../gamemodel.model";
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
  */
  @Input() sign?: string

  oxData:xoType[] = this.sign === this.gameService.getMarkO() ? this.gameService.getOData() : this.gameService.getXData()

  constructor(private gameService: GameService) { }
  
  ngOnInit(): void {}

  // 更新選擇效果
  select(name:string) {
      this.gameService.updateChose(this.sign || '',name)
      this.oxData = this.sign === this.gameService.getMarkO() ? this.gameService.getOData() : this.gameService.getXData()
  }
}
