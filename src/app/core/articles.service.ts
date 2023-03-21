import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, concatAll, delay, distinct, forkJoin, interval, map, merge, mergeAll, mergeScan, Observable, of, reduce, scan, Subject, take, tap, timer } from 'rxjs';

export interface Article {
  title: string;
  description?: string;
  types?: string[];
}

interface PokeApiResponse {
  cards: { id: string, name: string, types: string[] }[]
}

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private articlesSubject: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
  constructor(
    private readonly http: HttpClient
  ) {

    this.http.get<PokeApiResponse>('https://api.pokemontcg.io/v1/cards')
      .pipe(
        delay(1800),
        map((root: PokeApiResponse) => root.cards
          .map(card => ({ title: card.name, types: card.types }))
          .slice(0, 6)
        )
      )
      .subscribe(articles => this.pushArticles(...articles))

    interval(2000)
      .pipe(
        take(15)
      )
      .subscribe(() => this.pushArticles({
        title: "article " + Math.round(Math.random() * 300),
        description: Math.random() > 0.5 ? undefined : "cet article est très bien décrit"
      }));
  }

  getArticleNames(): Observable<string[]> {
    return this.articlesSubject.pipe(
      map(x => x.map(article => article.title + (article.description ? ' (has desc)' : '')))
    );
  }
  getKnownTypes(): Observable<string[]> {
    return this.articlesSubject.pipe(
      map(x => x.map(pokemon => pokemon.types ?? [])
        .reduce((acc: string[], values: string[]) => {
          values && values.forEach(value => {
            if (!acc.includes(value)) {
              acc.push(value);
            } 
          });
          return acc;
        }, [])),
      map(result => result.sort()),
      tap(x => console.log("lou3", x))
    );
  }

  pushArticles(...articles: Article[]) {
    this.articlesSubject.next([...this.articlesSubject.getValue(), ...articles]);
  }
}
