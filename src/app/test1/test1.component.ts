import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GameService } from '../game.service';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component {

  cat:any[] = []
  imgUrlLeft:string = ''
  imgUrlRight:string = ''
  // test:string = 'a'
  test:string = this.gameService.getTest()

  constructor(private http: HttpClient,private gameService: GameService) {
    // console.log('1 constructor')
  }

  testChange() {
    // console.log('test')
    // this.test = 'b'
    // this.otherChange()

    // why is need get again
    this.gameService.serviceChange()
    this.test = this.gameService.getTest()
  }


  otherChange() {
    this.test = 'c'
  }

  async ngOnInit(): Promise<void> {
    // this.http.get('https://api.thecatapi.com/v1/images/search?limit=10').subscribe((res: any) => {
    //   this.cat = res;
    //   this.imgUrlLeft = this.cat[0].url
    //   this.imgUrlRight = this.cat[7].url
    // })

    // console.log('a')
    const resp = await this.httpGET('https://api.thecatapi.com/v1/images/search?limit=10');
    this.imgUrlLeft = Object.values(resp)[0].url
    this.imgUrlRight = Object.values(resp)[6].url
    // console.log('c')
    // console.log('2 ngOnInit')
  }

  async httpGET(...args: any[]): Promise<object> {
    const apiUrl = args[0] || ''

    try {
        const result$ = this.http.get(apiUrl).pipe(
            tap((resp: object) => {
                // console.log('resp',resp)
                return resp;
            })
        )
        // console.log('b')
        return await lastValueFrom(result$)
    } catch (err) {
        return Promise.reject(err)
    }
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
