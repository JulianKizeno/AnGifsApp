import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'CnNx7ZUrNZkRIhH84hGIJmRF6732rW4H';
  private urlService: string = 'https://api.giphy.com/v1/gifs';
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

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query)

    this.http.get<SearchGifsResponse>(`${this.urlService}/search`, {params})
      .subscribe(response =>{
        this.results = response.data;
        localStorage.setItem('results', JSON.stringify(this.results));

      })

  };

}
