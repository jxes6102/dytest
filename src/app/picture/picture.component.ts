import { Component,Input,Output,EventEmitter } from '@angular/core';
import { viewType } from "../gamemodel.model";
@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent {
  @Input() viewData?: viewType[]
  @Input() signO: string = ''
  @Input() signX: string = ''
  @Output() pictureAction = new EventEmitter()

  constructor() {}

  // 點擊格子
  action(name:string): void{
    this.pictureAction.emit(name)
  }
}
