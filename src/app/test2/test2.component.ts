import { Component } from '@angular/core';
import { from, Observable,of,lastValueFrom,Observer } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component {
  cat:any[] = []
  str:string = '臺灣南投地方法院民事裁定 111年度司促字第7675號 聲 請 人 即債權人 固德資產管理顧問股份有限公司 法定代理人 王鈺喬 上列債權人聲請對債務人林祐霆發支付命令事件，本院裁定如下 ： 主 文 聲請駁回。 程序費用由債權人負擔。 理 由 一、按督促程序支付命令之送達，應依公示送達為之者，不得行 之，民事訴訟法第509條定有明文。又支付命令之聲請不合 於同法第508條至第511條之規定者，法院應以裁定駁回之， 同法第513條亦有明定。 二、本件債權人聲請對債務人林祐霆發支付命令，惟查債務'
  strKey:string = '林祐霆'
  constructor() {}

  ngOnInit(): void {
    // let test1 = false
    // let test2 = false
    // let test3 = true
    // let test4 = true

    // try {
    //   if (test1) throw 'test1'
    //   try {
    //     if (test2) throw 'test2'
    //     try {
    //       if (test3) throw 'test3'
    //     } catch (error) {
    //       console.log(error)
    //       try {
    //         if (test4) throw 'test4'
    //       } catch (error) {
    //         console.log(error)
    //       }
    //       finally {
    //         console.log('finallyin')
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    // finally {
    //   console.log('finallyout')
    // }


    // console.log('qqq test2')
    // const locations = new Observable((observer) => {
    //   let watchId: number;

    //   // Simple geolocation API check provides values to publish
    //   if ('geolocation' in navigator) {
    //     watchId = navigator.geolocation.watchPosition((position: GeolocationPosition) => {
    //       observer.next(position);
    //     }, (error: GeolocationPositionError) => {
    //       observer.error(error);
    //     });
    //   } else {
    //     observer.error('Geolocation not available');
    //   }

    //   // When the consumer unsubscribes, clean up data ready for next subscription.
    //   return {
    //     unsubscribe() {
    //       navigator.geolocation.clearWatch(watchId);
    //     }
    //   };
    // });

    // // Call subscribe() to start listening for updates.
    // const locationsSubscription = locations.subscribe({
    //   next(position) {
    //     console.log('Current Position: ', position);
    //   },
    //   error(msg) {
    //     console.log('Error Getting Location: ', msg);
    //   }
    // });

    // // Stop listening for location after 10 seconds
    // setTimeout(() => {
    //   locationsSubscription.unsubscribe();
    // }, 10000);






    // const myObservable = of(1, 2, 3);

    // // Create observer object
    // const myObserver = {
    //   next: (x: number) => console.log('Observer got a next value: ' + x),
    //   error: (err: Error) => console.error('Observer got an error: ' + err),
    //   complete: () => console.log('Observer got a complete notification'),
    // };

    // // Execute with the observer object
    // myObservable.subscribe(myObserver);





    // function sequenceSubscriber(observer: Observer<number>) {
    //   // synchronously deliver 1, 2, and 3, then complete
    //   observer.next(1);
    //   observer.next(2);
    //   observer.next(3);
    //   observer.complete();

    //   // unsubscribe function doesn't need to do anything in this
    //   // because values are delivered synchronously
    //   return {unsubscribe() {}};
    // }

    // // Create a new Observable that will deliver the above sequence
    // const sequence = new Observable(sequenceSubscriber);

    // // execute the Observable and print the result of each notification
    // sequence.subscribe({
    //   next(num) { console.log(num); },
    //   complete() { console.log('Finished sequence'); }
    // });


  }
}
