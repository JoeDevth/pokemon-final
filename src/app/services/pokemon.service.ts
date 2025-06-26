import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Detail, Pokemon } from '../interfaces/pokemon';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private _apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getPokemon() {
    return this._http.get<Pokemon>(`${this._apiUrl}/pokemon/`);
  }

  getPokemonByName(name: string) {
    return this._http.get<Detail>(`${this._apiUrl}/pokemon/${name}`);
  }
}
