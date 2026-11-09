//trending-page.component.ts sirve para mostrar los gifs
// que están en tendencia en la página principal de la aplicación.

import { AfterViewInit, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
// import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';


@Component({
  selector: 'app-trending-page',
  // imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {
  gifService = inject(GifService);
  scrollStateService = inject( ScrollStateService)

  scrollDivRev = viewChild<ElementRef<HTMLDivElement>>('groupDiv')

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRev()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();

  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRev()?.nativeElement;
    if (!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);


    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }

  }

}
