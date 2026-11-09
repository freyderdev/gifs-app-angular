import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {

  //** inyectamos el servicio de gifs para poder acceder a los gifs del historial
  private gifService = inject(GifService);

  //**
  //query que viene por el URL
  // query= inject(ActivatedRoute).params.subscribe(
  //   params =>{
  //     console.log(params['query']);
  //   });
  //
  //**
  // como se esta trabajando en signals de Angular se puede utilizar
  // .toSignal() y cualqueier Observable se puede transformar en signal */
  query = toSignal( inject(ActivatedRoute).params.pipe(map(params => params['query'])));
  // se puede encadenar el signal con el servicio de gifs para obtener los gifs del historial
  //retornamos lo que sea que tengamos en nuestro servicio de gifs.
  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));

}
