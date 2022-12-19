import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component {

  cat:any[] = [] 
  imgUrl:string = ''
  test:any

  constructor(private http: HttpClient) {
    // console.log('1 constructor')
  }

  ngOnInit(): void {
    this.http.get('https://api.thecatapi.com/v1/images/search').subscribe((res: any) => {
      this.cat = res;
      this.imgUrl = this.cat[0].url
    })
    // console.log('2 ngOnInit')
  }

  ngOnChanges(): void {
    // console.log('3 ngOnChanges')
  }

  ngDoCheck(): void {
    // console.log('4 ngDoCheck')
  }

  ngAfterContentInit(): void {
    // console.log('5 ngAfterContentInit')
  }

  ngAfterContentChecked(): void {
    // console.log('6 ngAfterContentChecked')
  }

  ngAfterViewInit(): void {
    // console.log('7 ngAfterViewInit')
  }

  ngAfterViewChecked(): void {
    // console.log('8 ngAfterViewChecked')
  }

  ngOnDestroy(): void {
    // console.log('9 ngOnDestroy')
  }

}
