import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProductsService} from '../../Services/products.service';
import {CategoryService} from '../../Services/category-service';
import {IProduct} from '../../Models/IProduct';
import {ICategory} from '../../Models/ICategory';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-product-component',
  templateUrl: './add-product-component.html',
  styleUrls: ['./add-product-component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinner,
  ]
})
export class AddProductComponent implements OnInit {
  isLoading = false;
  receivedPrdId: number | null = null;
  newProduct: IProduct = {} as IProduct;
  catList: ICategory[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private categoryService: CategoryService,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.loadCategories();

    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.receivedPrdId = Number(idParam);
        this.loadProduct(this.receivedPrdId);
      } else {
        this.newProduct.categoryID = 0;
      }
    });
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.catList = categories.map(cat => ({
        ...cat,
        id: Number(cat.id)
      }));
    });
  }

  private loadProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe(product => {
      this.newProduct = {...product, categoryID: Number(product.categoryID)};
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    const request = this.receivedPrdId
      ? this.productService.updateProduct(this.receivedPrdId, this.newProduct)
      : this.productService.addProduct(this.newProduct);

    request.subscribe({
      next: () => {
        this.showSnackbar(`Product ${this.receivedPrdId ? 'updated' : 'added'} successfully!`, 'success');
        this.router.navigate(['/products']);
      },
      error: (err: any) => {
        this.showSnackbar(err.message || 'Operation failed', 'error');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private showSnackbar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: [`${type}-snackbar`],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
