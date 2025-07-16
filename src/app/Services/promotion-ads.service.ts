import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionAdsService {
  private adsList: string[];

  constructor() {
    this.adsList = [
      "Black Friday",
      "White Friday",
      "Discount",
      "",
      "Sale UP"
    ];
  }

  getScheduledAds(intervalInSeconds: number): Observable<string> {
    return new Observable<string>((observer) => {
      let counter = 0;
      let addTimer = setInterval(() => {
        console.log("In Interval: ");
        if (counter == this.adsList.length) {
          observer.complete();
        }
        if (this.adsList[counter] == "") {
          observer.error("Err: No ads found");
        }
        observer.next(this.adsList[counter]);
        counter++;
      }, intervalInSeconds * 1000);
      return {
        unsubscribe() {
          // Will be Called in 3 Cases:
          // 1. Error
          // 2. Complete
          // 3. unsubscribe
          clearInterval(addTimer);
          console.log("In Interval unsubscribe");
        }
      }
    })
  }
}
