import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interfaces";

/**
 * La idea de este mapper es que recibamos el objeto que viene
 * de Gifi o gify.com la API de GIfi y regresemos un objeto basado
 * en nuestra interface
 */
export class GifMapper {

  static mapGiphyItemToGif(item: GiphyItem): Gif {
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url,
    }
  }
  //esta función nos permite mapear un arreglo de GiphyItem
  //   a un arreglo de Gif
  static mapGiphyItemsToGifArray(items: GiphyItem[]): Gif[] {
    return items.map(this.mapGiphyItemToGif);
  }

}
