import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  //inyectamos el servicio
  gifService= inject(GifService);
  //Deberiamos tener los gifs que vamos a mostrar, es conveniente q fuera una señal
  gifs= signal<Gif[]>([]);


  onSearch(query: string) {
    this.gifService.searchGifs(query)
    .subscribe( resp => {
      console.log(resp);
      this.gifs.set(resp);
    });

  }


}
