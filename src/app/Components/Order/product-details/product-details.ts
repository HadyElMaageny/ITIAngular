import {Component, OnInit} from '@angular/core';
import {IProduct} from '../../../Models/IProduct';
import {StaticProductService} from '../../../Services/static-product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {disableDebugTools} from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit {
  receivedPrdId: number = 0;
  prd: IProduct | undefined = {} as IProduct;
  prdIDsList: number[] = [];

  constructor(private activatedRoute: ActivatedRoute, private staticProductService: StaticProductService, private location: Location, private router: Router) {
  }

  ngOnInit() {
    // this.receivedPrdId = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.paramMap.subscribe(params => {
      this.receivedPrdId = Number(params.get('id'));
      this.prd = this.staticProductService.getProdById(this.receivedPrdId);
    })
    this.prdIDsList = this.staticProductService.getAllProducts().map((product) => product.id);
  }

  getPreviousProduct(pId?: number) {
    let currentIndex = this.prdIDsList.findIndex(prdId => prdId === pId);
    if (currentIndex > 0) {
      this.prd = this.staticProductService.getProdById(this.prdIDsList[currentIndex - 1]);
      this.router.navigate(['/products', this.prd?.id]);
    }
  }

  goBack(): void {
    this.location.back();
  }

  getNextProduct(pId?: number) {
    let currentIndex = this.prdIDsList.findIndex(prdId => prdId === pId);
    if (currentIndex < this.prdIDsList.length - 1) {
      this.prd = this.staticProductService.getProdById(this.prdIDsList[currentIndex + 1]);
      this.router.navigate(['/products', this.prd?.id]);
    }
  }

}
