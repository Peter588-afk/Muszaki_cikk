import { Component, OnInit, OnChanges, SimpleChanges, Input  } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';


const ROWS_HEIGHT: {[id:number]: number} = {1: 400, 3: 335, 4:350};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  @Input() category!: string;
  products: Product[] = [];
  categories: Observable<string[]> | undefined;
  filteredProducts: Observable<any[]> | undefined;
  @Input() selectedCategory: string |undefined;

  constructor(private cartService: CartService, private productService: ProductService){ }

  ngOnInit(): void{
    this.loadProducts();
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes['selectedCategory'] && !changes['selectedCategory'].firstChange){
      console.log(changes['selectedCategory'].currentValue + 'afg')
    }
  }

  loadProducts(): void{
    if(this.selectedCategory === undefined){
      console.log(this.selectedCategory + ' itt meg undefined')
      this.productService
      .getProducts()
      .pipe(
        map((products) =>
          products.map((p) => {
            const imagePath = p.image;
            this.productService.loadImage(imagePath).subscribe(
              (url) => {
                p.image_url = url;
              },
              (error) => {
                console.error(error);
              }
            );
            return p;
          })
        )
      )
      .subscribe(
        (products) => {
          this.products = products;
        },
        (error) => {
          console.error(error);
        }
      );
    }else {
      console.log(this.selectedCategory+'afg')
      this.productService.getProductsByCategory(this.selectedCategory);
    }
  }

  OnColumsCountChange(colsNum: number): void{
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.filteredProducts = this.selectedCategory 
    ? this.productService.getProductsByCategory(this.selectedCategory)
    : this.productService.getProducts();
    this.selectedCategory = this.category;
    console.log(this.selectedCategory + 'asd')
    
  }
  onAddToCart(product: Product):void{
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
  }
}
