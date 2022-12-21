import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { viewType,xoType } from "../gamemodel.model";
@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit{
  /*
    mode  模式名稱
    viewData  畫面資料 styleName識別所點區域 data紀錄圈叉 sizeOX大小
    whoWin 遊戲狀態 0:勝負未分 1:O獲勝 -1:X獲勝 2:平手
    xData and oData 選擇視窗資料
    nowSign 判斷是屬於O或X的回合
    markO and markX 兩方的符號
  */
  markO:string = this.gameService.getMarkO()
  markX:string = this.gameService.getMarkX()
  whoWin:number = this.gameService.getWin()
  mode:string = this.gameService.getMode()
  xData:xoType[] = this.gameService.getXData()
  oData:xoType[] = this.gameService.getOData()
  viewData:viewType[] = this.gameService.getViewData()
  nowSign:string = this.gameService.getNowSign()

  constructor(private gameService: GameService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.gameService.initGameView()
  }

  // 回上頁
  back(): void {
    this.router.navigate(['/'])
    this.gameService.clearMode()
    this.gameService.resetGame()
    this.whoWin = this.gameService.getWin()
    this.clearView()
  }
  // 點擊格子
  action(name:string): void{
    this.gameService.clickAction(name)
    this.xData= this.gameService.getXData()
    this.oData = this.gameService.getOData()
    this.viewData = this.gameService.getViewData()
    this.whoWin = this.gameService.getWin()
    this.nowSign = this.gameService.getNowSign()
  }
  // 重置遊戲
  renewGame(): void {
    this.gameService.resetGame()
    this.clearView()
    this.nowSign = this.gameService.getNowSign()
    this.whoWin = this.gameService.getWin()
  }
  //上一步
  last(): void {
    this.gameService.actionRecord(-1)
    this.viewData = this.gameService.getViewData()
    this.whoWin = this.gameService.getWin()
  }
  //下一步
  next(): void {
    this.gameService.actionRecord(1)
    this.viewData = this.gameService.getViewData()
    this.whoWin = this.gameService.getWin()
  }
  // 更新選擇效果
  getChose(data:string[]): void {
    /*
      sign 選擇的O OR X
      choseName 樣式名稱
    */
    const sign = data[1], choseName = data[0]
    this.gameService.updateChose(sign,choseName)
    this.xData= this.gameService.getXData()
    this.oData = this.gameService.getOData()
  }
  // 清除畫面
  clearView() {
    this.gameService.clearView()
    this.xData= this.gameService.getXData()
    this.oData = this.gameService.getOData()
    this.viewData = this.gameService.getViewData()
  }
}
