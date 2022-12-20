import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { viewType,xoType,viewData,selectData } from "../gamemodel.model";
@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit{
  constructor(private gameService: GameService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.gameService.initGameView()
    this.gameID = this.gameService.getGameID()
  }
  /*
    gameID 該局遊戲ID
    recordID 紀錄模式時的遊戲ID
    mode  模式名稱
    viewData  畫面資料 styleName識別所點區域 data紀錄圈叉 sizeOX大小
    whoWin 遊戲狀態 0:勝負未分 1:O獲勝 -1:X獲勝 2:平手
    round 判斷是屬於O或X的回合
    xData and oData 選擇視窗資料
  */
  markO:string = this.gameService.getMarkO()
  markX:string = this.gameService.getMarkX()
  round:number = this.gameService.getStep()
  xData:xoType[] = new selectData().getData
  oData:xoType[] = new selectData().getData
  viewData:viewType[] = new viewData().getData
  whoWin:number = this.gameService.getWin()
  mode:string = this.gameService.getMode()
  gameID:number = this.gameService.getGameID()
  recordID:string = this.gameService.getRecordID()
  testxData:xoType[] = this.gameService.testgetXData()
  testoData:xoType[] = this.gameService.testgetOData()
  testviewData:viewType[] = this.gameService.testgetViewData()

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
    this.testxData= this.gameService.testgetXData()
    this.testoData = this.gameService.testgetOData()
    this.testviewData = this.gameService.testgetViewData()
    this.whoWin = this.gameService.getWin()
    this.round = this.gameService.getStep()
  }
  // 重置遊戲
  renewGame(): void {
    this.gameService.resetGame()
    this.clearView()
    this.round = this.gameService.getStep()
    this.gameService.setGameID()
    this.gameID = this.gameService.getGameID()
    this.whoWin = this.gameService.getWin()
  }
  //上一步
  last(): void {
    this.testviewData = this.gameService.actionRecord(-1,this.testviewData) || this.testviewData
    this.whoWin = this.gameService.getWin()
  }
  //下一步
  next(): void {
    this.testviewData = this.gameService.actionRecord(1,this.testviewData) || this.testviewData
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
    this.testxData= this.gameService.testgetXData()
    this.testoData = this.gameService.testgetOData()
  }
  // 清除畫面
  clearView() {
    this.gameService.clearView()
    this.testxData= this.gameService.testgetXData()
    this.testoData = this.gameService.testgetOData()
    this.testviewData = this.gameService.testgetViewData()
  }
}
