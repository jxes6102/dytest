import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  mode:string
  constructor() { 
    this.mode = ''
  }

  getMode() {
    return this.mode
  }

  setMode(val: string) {
    this.mode = val
  }

  clearMode() {
    this.mode = ''
  }
}
