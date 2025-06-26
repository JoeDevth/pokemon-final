export interface Pokemon {
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface Detail {
  id: number;
  name: string;
  type: [];
  image: string;
}

export interface Cart extends Detail {
  qty: number;
}
