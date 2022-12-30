import { Component } from '@angular/core';
import { GameService } from '../game.service';
@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent {
   /*
    signs  符號
    viewData  畫面資料 styleName識別所點區域 data紀錄圈叉 sizeOX大小
  */

  get viewData(){
    return this.gameService.getViewData
  }
  get signs() {
    return this.gameService.getMarks
  }
  blockStr:string = 'square'
  cssStyle:string[] = ['bigSize','mediumSize','smallSize']

  constructor(private gameService: GameService) {}

  // 點擊格子 
  // boxIndex = 格子編號
  // 0  1  2
  // 3  4  5
  // 6  7  8
  action(boxIndex:number) {
    this.gameService.clickAction(boxIndex)
  }
}
