import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'CnNx7ZUrNZkRIhH84hGIJmRF6732rW4H'
  private _history: string[] = [];

  //cambiar any por el tipado correspondiete
  public results: Gif[] = [];

  get history(){
    return [...this._history]
  };

  constructor(private http: HttpClient){

    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];

    // if(localStorage.getItem('history')){
    //   this._history = JSON.parse(localStorage.getItem('history')!);
    // };
  };

  searchGifs( query: string ){

    query = query.trim().toLocaleLowerCase();

    if(!this._history.includes( query )){
      this._history.unshift( query );
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));

    };

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=CnNx7ZUrNZkRIhH84hGIJmRF6732rW4H&q=${ query }`)
      .subscribe(response =>{
        console.log(response.data);
        this.results = response.data;
        localStorage.setItem('results', JSON.stringify(this.results));

      })

  };

}
