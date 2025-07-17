import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreData} from '../../ViewModels/store-data';
import {combineLatestAll, Subscription} from 'rxjs';
import {PromotionAdsService} from '../../Services/promotion-ads.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {
  subscriptions!: Subscription [];
  storeInfo: StoreData;
  isShowingImage = true;

  constructor(private promAds: PromotionAdsService) {
    this.storeInfo = new StoreData(
      'ITIAngular',
      'https://picsum.photos/400/200',
      ['Branch 1', 'Branch 2', 'Branch 3']
    );
  }

  ngOnInit(): void {
    this.subscriptions.push(this.promAds.getScheduledAds(3).subscribe({
      next: (data: string) => {
        console.log(data);
      },
      error: (err: string) => {
        console.log(err);
      },
      complete: () => {
        console.log("completed");
      }
    }));
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
