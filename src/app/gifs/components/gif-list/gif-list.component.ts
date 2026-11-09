import { Component, input } from '@angular/core';
import { GifListItem } from "./gif-list-item/gif-list-item.component";
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [GifListItem],
  templateUrl: './gif-list.component.html',
})
export class GifListComponent {

  //En este GifList necesitamos recibir los Gifs
   gifs= input.required<Gif[]>();

}
