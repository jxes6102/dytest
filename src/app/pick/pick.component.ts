import { Component,Input,Output,EventEmitter } from '@angular/core';
import { xoType } from "../gamemodel.model";

@Component({
  selector: 'app-pick',
  templateUrl: './pick.component.html',
  styleUrls: ['./pick.component.css']
})
export class PickComponent {
  @Input() pickData?: xoType[]
  @Input() sign?: string
  @Output() choseItem = new EventEmitter()

  constructor() { }
  
  ngOnInit(): void {
    
  }

  select(name:string): void {
    this.choseItem.emit([name,this.sign])
  }
}
