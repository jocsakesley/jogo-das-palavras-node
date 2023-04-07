import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



interface Word {
  palavra: string
  dica: string
}

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  textWords: any;


  constructor(private http: HttpClient) { 
  }

  getData(): Word[] {
    this.http.get('assets/words.txt', {responseType: "text"}).subscribe(data => this.textWords = data)
    let result: Word[] = []
    for (let word of this.textWords.split("\n")) {
      let double: Array<string> = word.split(":")
      console.log(double)
      result.push({"palavra": double[0], "dica": double[1]})
    }
    console.log(result)
    return result
  }
}
