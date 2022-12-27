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
  @Input() signO: string = ''
  @Input() signX: string = ''
  @Output() pictureAction = new EventEmitter()

  viewData:viewType[] = this.gameService.getViewData()

  constructor(private gameService: GameService) {}

  // 點擊格子
  action(name:string): void{
    this.gameService.clickAction(name)
    this.pictureAction.emit()
  }
}
