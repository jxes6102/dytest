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
    let target:any = this.gameService.getViewData
    const cssStyle = ['bigSize','mediumSize','smallSize']
    const blockStr = 'square'
    for(let index in target) target[index].styleName = blockStr + index + ' ' + cssStyle[target[index].size]
    return target
  }
  get signs() {
    return this.gameService.getMarks
  }

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
