import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;
  loggedInUser?: firebase.default.User |null;
  userEmail: string | null = null;

  @Input()
  get cart(): Cart{
    return this._cart;
  }

  set cart(cart: Cart){
    this._cart = cart;

    this.itemsQuantity = cart.items.map((item) => item.quantity).reduce((prev, current) => prev+current, 0);
  }

  constructor( private cartService: CartService, private authService: AuthService) { }
  ngOnInit(): void{
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      if (user) {
        this.userEmail = user.email;
      } else {
        this.userEmail = null;
      }
      console.log(user?.email);
    }, error => {
      console.error(error);
    });
  }

  public isLoggedInAsAdmin(): boolean {
    if(this.loggedInUser){
      return this.userEmail === 'admin@admin.com';
    }else{
      return false;
    }
    
  }

  getTotal(items: Array<CartItem>): number{
    return this.cartService.getTotal(items);
  }

  onClearCart(): void{
    this.cartService.clearCart();
  }

  logout(_?: boolean) {
    this.authService.logout().then(() => {
      console.log('Logged out successfully.');
    }).catch((error: any) => {
      console.error(error);
    });
  }
}
