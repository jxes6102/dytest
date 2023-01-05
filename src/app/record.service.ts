import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor() { }

  test() {
    console.log('new service test')
  }
}
