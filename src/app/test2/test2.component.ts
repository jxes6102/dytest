import { Component } from '@angular/core';
import { from, Observable,of,lastValueFrom,Observer } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component {
  constructor() {}

  ngOnInit(): void {
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





    function sequenceSubscriber(observer: Observer<number>) {
      // synchronously deliver 1, 2, and 3, then complete
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    
      // unsubscribe function doesn't need to do anything in this
      // because values are delivered synchronously
      return {unsubscribe() {}};
    }
    
    // Create a new Observable that will deliver the above sequence
    const sequence = new Observable(sequenceSubscriber);
    
    // execute the Observable and print the result of each notification
    sequence.subscribe({
      next(num) { console.log(num); },
      complete() { console.log('Finished sequence'); }
    });


    
  }
}
