import { Component,Input,Output,EventEmitter } from '@angular/core';
import { viewType } from "../gamemodel.model";
import { GameService } from '../game.service';
@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent {
   /*
    signO signX  符號樣式
    viewData  畫面資料 styleName識別所點區域 data紀錄圈叉 sizeOX大小
  */
  @Output() pictureAction = new EventEmitter()

  viewData:viewType[] = this.gameService.getViewData()
  signX:string = this.gameService.getMarkX()
  signO:string = this.gameService.getMarkO()

  constructor(private gameService: GameService) {}

  // 點擊格子
  action(name:string) {
    // console.log('a',this.viewData[0])
    this.gameService.clickAction(name)
    this.pictureAction.emit()
    // why viewdata isnt need get again
    // console.log('b',this.viewData[0])
    // this.viewData = this.gameService.getViewData()
    // console.log('i',this.viewData[0])
  }
}
