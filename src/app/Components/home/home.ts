import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreData } from '../../ViewModels/store-data';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  storeInfo: StoreData;
  isShowingImage = true;

  constructor() {
    this.storeInfo = new StoreData(
      'ITIAngular',
      'https://picsum.photos/400/200',
      ['Branch 1', 'Branch 2', 'Branch 3']
    );
  }

  toggleImage() {
    this.isShowingImage = !this.isShowingImage;
  }

}
