import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Cart } from '../../interfaces/pokemon';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  count: number = 0;
  name: string = '';

  constructor(public _cart: CartService, private _route: ActivatedRoute) {}
  ngOnInit() {
    this.name = this._route.snapshot.paramMap.get('name')!;
    this.getCartItem();
  }

  getCartItem() {
    this.cart = this._cart.cartItems;
    console.log('cart data', this.cart);
  }

  increment(item: any) {
    const cartItem = this._cart.cartItems.find((i) => i.name === item.name);
    if (cartItem) {
      cartItem.qty += 1;
      this.chngQuantity();
    }
  }

  decrement(item: any) {
    const cartItem = this._cart.cartItems.find((i) => i.name === item.name);
    if (cartItem) {
      cartItem.qty -= 1;
      this.chngQuantity();
    }
  }

  removeProduct(item: Cart) {
    console.log('remove', item);
    this._cart.cartItems.splice(
      this._cart.cartItems.findIndex((element) => item.name === element.name),
      1
    );
    this.count = this._cart.count;
    this.chngQuantity();
  }

  totalPrice() {
    return this._cart.cartItems.reduce((total, item) => {
      return total + this.itemTotalPrice(item);
    }, 0);
  }

  itemTotalPrice(item: any) {
    const pricePer = item.id * 10;
    return pricePer * item.qty;
  }

  chngQuantity() {}

  clearCart() {
    console.log('clear cart');
    this._cart.cartItems = [];
    this.getCartItem();
  }
}
