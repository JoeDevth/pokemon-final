import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { Detail } from '../../interfaces/pokemon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, RouterLink],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  pokemon: any[] = [];
  constructor(private _pokemon: PokemonService) {}

  ngOnInit() {
    this.getPokemonList();
  }

  getPokemonList() {
    this._pokemon.getPokemon().subscribe({
      next: (x: any) => {
        this.pokemon = x.results;
        this.pokemon.forEach((pokemon, index) => {
          this._pokemon.getPokemonByName(pokemon.name).subscribe({
            next: (details: any) => {
              this.pokemon[index] = {
                ...pokemon,
                image: details.sprites.other['official-artwork'].front_default,
                types: details.types,
              };
            },
          });
        });
        console.log('log data list', this.pokemon);
      },
      error(err) {
        console.log('error data list', err);
      },
    });
  }
}
