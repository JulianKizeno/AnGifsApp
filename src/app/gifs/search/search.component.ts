import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>

  constructor(private gifsService: GifsService){};
  
  search(){
    const theValue = this.txtSearch.nativeElement.value;

    if(theValue.trim().length === 0){
      return;
    }

    this.gifsService.searchGifs(theValue);

    this.txtSearch.nativeElement.value = '';
  }

}
