import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'gifs';

const loadFromLocalStorage = () => {
  //1.verifico si tengo algunos gifs
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}'; //Record<string, gifs[]>
  //parseamos y reconstruimos:
  const gifs = JSON.parse(gifsFromLocalStorage);
  console.log(gifs);
  return gifs;
}


@Injectable({ providedIn: 'root' })
export class GifService {

  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([])
  trendingGifsLoading = signal(false);
  private trendingPage = signal(0);


  // se debe crear lo siguiente para barrer la estructura Masonry
  // [ [gif,gif,gif,], [gif,gif,gif,], [gif,gif,gif,] ]

  //se crea una nueva propiedad computada
  // esta propiedad computada va a barrer el arreglo de gifs y va a crear un arreglo de arreglos de gifs
  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    //este for va a barrer el arreglo de gifs y va a crear un arreglo de arreglos de gifs,
    // cada arreglo de gifs va a tener 3 gifs
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    console.log(groups);
    return groups; //[ [g1,g2,g3,g4] ]
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage())
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }
  //Grabamos en nuestro LocalStorage
  safeGifsLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  });

  loadTrendingGifs() {
    if(this.trendingGifsLoading()) return;
    this.trendingGifsLoading.set(true);

    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApikey,
          limit: 20,
          offset: this.trendingPage() * 20,
        },
      }).subscribe((resp) => {
        // console.log({ resp })
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        /* la siguiente linea es para actualizar el signal con
           los gifs que vienen de la API */
        this.trendingGifs.update(currentGifs =>[...currentGifs, ...gifs  ]);
        this.trendingPage.update(page => page + 1 )
        this.trendingGifsLoading.set(false);
        console.log(gifs)
      })
  }


  searchGifs(query: string): Observable<Gif[]> {
    return this.http

      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApikey,
          limit: 20,
          q: query,
        },
      })

      .pipe(
        //tap= sirve para disparar efectos secundarios
        // map(resp => console.log({tap1: resp})),
        //map=permite barrer cada uno de los elementos de mi respuesta y transformar
        // map((resp) => 'Hola Mundo'));
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
        // TODO: Historial
        tap(items => {
          this.searchHistory.update(history => ({
            ...history,
            [query.toLowerCase()]: items,
          }))
        })
      )
  }
  // este metodo que recibe la llave del historial y devuelve el arreglo de gifs que se encuentra en el historial
  getHistoryGifs(query: string): Gif[] {
    //esto retorna el arreglo de gifs que se encuentra en el historial, si no existe la llave retorna un arreglo vacio
    return this.searchHistory()[query] ?? [];
  }

}
