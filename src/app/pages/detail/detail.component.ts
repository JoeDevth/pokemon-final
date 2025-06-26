import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Detail } from '../../interfaces/pokemon';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-detail',
  imports: [RouterLink],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  name!: string;
  pokemonDetail!: Detail;
  count: number = 0;
  isOpen: boolean = false;

  constructor(
    private _pokemon: PokemonService,
    private _route: ActivatedRoute,
    private _cart: CartService
  ) {}

  ngOnInit() {
    this.name = this._route.snapshot.paramMap.get('name')!;
    this.getPokemonByName();
  }

  getPokemonByName() {
    this._pokemon.getPokemonByName(this.name).subscribe({
      next: (x: any) => {
        (this.pokemonDetail = {
          id: x.id,
          name: x.name,
          image: x.sprites.other['official-artwork'].front_default,
          type: x.types.map((t: any) => t.type.name),
        }),
          console.log('this data', this.pokemonDetail);
      },
    });
  }

  addToCart() {
    if (this.name !== '') {
      console.log('add cart');
      this._pokemon.getPokemonByName(this.name).subscribe({
        next: (x: any) => {
          console.log('data cart', x);
          this._cart.add({
            ...x,
            image: x.sprites.other['official-artwork'].front_default,
          });
          this.openToast();
        },
      });
    }
  }

  openToast() {
    this.isOpen = true;
    console.log('opentost');
    setTimeout(() => {
      this.isOpen = false;
    }, 3000);
  }
}
