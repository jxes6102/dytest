import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { viewType } from "../gamemodel.model";
@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit{
  constructor(private gameService: GameService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.mode === '') this.router.navigate(['/'])
    else if(this.mode === 'battle') {
      this.gameService.setGameID()
      this.gameID = this.gameService.getGameID()
    }
  }
  /*
    gameID 該局遊戲ID
    recordID 紀錄模式時的遊戲ID
    mode  模式名稱
    viewData  畫面資料 className識別所點區域 data紀錄圈叉
    whoWin 遊戲狀態 0:勝負未分 1:O獲勝 -1:X獲勝 9:平手
  */
  viewData:viewType[] = [
    {className:"square0",data:0},
    {className:"square1",data:0},
    {className:"square2",data:0},
    {className:"square3",data:0},
    {className:"square4",data:0},
    {className:"square5",data:0},
    {className:"square6",data:0},
    {className:"square7",data:0},
    {className:"square8",data:0}
  ]
  whoWin:number = this.gameService.getWin()
  mode:string = this.gameService.getMode()
  gameID:number = this.gameService.getGameID()
  recordID:string = this.gameService.getRecordID()

  // 回上頁
  back(): void {
    this.router.navigate(['/'])
    this.gameService.clearMode()
    for(let key in this.viewData) this.viewData[key].data = 0
    this.gameService.resetGame()
    this.whoWin = this.gameService.getWin()
  }
  // 點擊格子
  action(name:string): void{
    if(this.mode === 'record') return

    const index = this.viewData.findIndex((item) => item.className == name)
    if((Math.abs(this.viewData[index].data) !== 1)) this.viewData[index].data = this.gameService.TestplayerCilck(index) || 0
    this.gameService.judgeVictory(this.viewData)
    this.whoWin = this.gameService.getWin()
  }
  // 重置遊戲
  renewGame(): void {
    this.gameService.resetGame()
    for(let key in this.viewData) this.viewData[key].data = 0
    this.gameService.setGameID()
    this.gameID = this.gameService.getGameID()

    this.whoWin = this.gameService.getWin()
  }
  //上一步
  last(): void {
    this.viewData = this.gameService.actionRecord(-1,this.viewData) || this.viewData
    this.whoWin = this.gameService.getWin()
  }
  //下一步
  next(): void {
    this.viewData = this.gameService.actionRecord(1,this.viewData) || this.viewData
    this.whoWin = this.gameService.getWin()
  }

}
