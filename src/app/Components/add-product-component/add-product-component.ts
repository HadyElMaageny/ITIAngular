import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {ProductsService} from '../../Services/products.service';
import {IProduct} from '../../Models/IProduct';
import {MatButton} from '@angular/material/button';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-add-product-component',
  templateUrl: './add-product-component.html',
  imports: [
    MatProgressSpinner,
    MatButton,
    CommonModule,
  ],
  styleUrls: ['./add-product-component.scss']
})
export class AddProductComponent {
  isLoading = false;

  constructor(
    private productService: ProductsService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  addProduct() {
    this.isLoading = true;

    const prd: IProduct = {
      id: 100,
      name: "New Tablet",
      categoryID: 1,
      imageUrl: "https://picsum.photos/200/300",
      price: 100,
      quantity: 130
    };

    this.productService.addProduct(prd).subscribe({
      next: () => {
        this.showSnackbar('Product added successfully!', 'success');
        this.router.navigate(['/products']);
      },
      error: (err: any) => {
        this.showSnackbar(
          err.message || 'Failed to add product',
          'error'
        );
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
