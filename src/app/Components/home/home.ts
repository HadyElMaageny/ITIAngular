import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreData} from '../../ViewModels/store-data';
import {filter, map, Subscription} from 'rxjs';
import {PromotionAdsService} from '../../Services/promotion-ads.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {
  subscriptions: Subscription[] = []; // ✅ Fix: initialize the array
  storeInfo: StoreData;
  isShowingImage = true;

  constructor(private promAds: PromotionAdsService) {
    this.storeInfo = new StoreData(
      'FE',
      'https://picsum.photos/400/200',
      ['Branch 1', 'Branch 2', 'Branch 3']
    );
  }

  ngOnInit(): void {
    let observer = {
      next: (data: string) => {
        console.log(data);
      },
      error: (err: string) => {
        console.log(err);
      },
      complete: () => {
        console.log("completed");
      }
    };
    let filteredObservable = this.promAds.getScheduledAds(3).pipe(
      filter(ad => ad.includes("White Friday")),
      map(ad => "Ad: " + ad),
    )
    let adsSubscriptions = filteredObservable.subscribe(observer);
    this.subscriptions.push(adsSubscriptions);

    // Optional second subscription
    // this.subscriptions.push(
    //   this.promAds.getSerialAds().subscribe(ad => {
    //     console.log(ad);
    //   })
    // );
  }

  toggleImage() {
    this.isShowingImage = !this.isShowingImage;
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
