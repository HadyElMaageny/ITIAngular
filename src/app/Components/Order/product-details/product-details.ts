import {Component, OnInit} from '@angular/core';
import {IProduct} from '../../../Models/IProduct';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ProductsService} from '../../../Services/products.service';

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

  constructor(private activatedRoute: ActivatedRoute, private ProductService: ProductsService, private location: Location, private router: Router) {
  }

  ngOnInit() {
    // this.receivedPrdId = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.paramMap.subscribe(params => {
      this.receivedPrdId = Number(params.get('id'));
      this.ProductService.getProductById(this.receivedPrdId).subscribe((product: IProduct) => {
        this.prd = product;
      });
    })
    // this.prdIDsList = this.ProductService.getAllProducts().map((product) => product.id);
  }

  getPreviousProduct(pId?: number) {
    let currentIndex = this.prdIDsList.findIndex(prdId => prdId === pId);
    if (currentIndex > 0) {
      this.ProductService.getProductById(this.prdIDsList[currentIndex - 1]).subscribe((product: IProduct) => {
        this.prd = product;
      });
      this.router.navigate(['/products', this.prd?.id]);
    }
  }

  goBack(): void {
    this.location.back();
  }

  getNextProduct(pId?: number) {
    let currentIndex = this.prdIDsList.findIndex(prdId => prdId === pId);
    if (currentIndex < this.prdIDsList.length - 1) {
      this.ProductService.getProductById(this.prdIDsList[currentIndex + 1]).subscribe((product: IProduct) => {
        this.prd = product;
      });
      this.router.navigate(['/products', this.prd?.id]);
    }
  }

}
