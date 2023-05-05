/*import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent  implements OnInit{
@Input() fullWidthMode = false;
loggedInUser?: firebase.default.User |null;

products: Product[] = [];
chosenImage?: string;
//@Input() product: Product | undefined;
@Input() product: Product | undefined;

constructor(private authService: AuthService, private productService: ProductService) { }
  ngOnInit(): void{
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
    }, error => {
      console.error(error);
    });

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

    
  }

  /*product: Product | undefined = {
    productid: 1,
    title: 'laptop',
    price: 15000,
    category: 'Laptops',
    description: 'this is a laptop',
    image: 'images/bagus-hernawan-A6JxK37IlPo-unsplash.jpg',
    image_url: 'https://unsplash.com/photos/1SAnrIxw5OY'
};*/

/*@Output() addToCart = new EventEmitter();

onAddToCart(): void{
  this.addToCart.emit(this.product);
}
@Output() addToCart = new EventEmitter<Product>();

  onAddToCart(product: Product): void {
    this.addToCart.emit(product);
  }
}*/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { PricePipe } from 'src/app/price.pipe';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  loggedInUser?: firebase.default.User | null;

  @Input() product?: Product ;

  constructor(private authService: AuthService, private productService: ProductService) {}

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(
      (user) => {
        this.loggedInUser = user;
      },
      (error) => {
        console.error(error);
      }
    );

    if (this.product) {
      const imagePath = this.product.image;
      this.productService.loadImage(imagePath).subscribe(
        (url) => {
          this.product!.image_url = url;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  @Output() addToCart = new EventEmitter<Product>();
  pipe = new PricePipe();
  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
