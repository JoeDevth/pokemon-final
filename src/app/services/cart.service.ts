import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, Detail } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItems: Cart[] = [];
  cartUpdate = new BehaviorSubject<number>(0);
  cartCount$: Observable<number> = this.cartUpdate.asObservable();
  public get count(): number {
    return this.cartItems.reduce((c, t1) => t1.qty + c, 0);
  }

  constructor() {}

  add(pokemon: Detail) {
    const item = this.cartItems.find((item) => item.id === pokemon.id);

    if (item) {
      item.qty++;
    } else {
      (pokemon as Cart).qty = 1;
      this.cartItems.push(pokemon as Cart);
    }
    // this.cartUpdate.next(0);
  }

  getCart() {
    return this.cartItems;
  }
}
