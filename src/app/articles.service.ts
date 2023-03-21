import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, concatAll, delay, forkJoin, interval, map, merge, mergeAll, mergeScan, Observable, of, scan, Subject, take, tap, timer } from 'rxjs';

export interface Article {
  title: string;
  description?: string;
}

interface PokeApiResponse {
  cards: { id: string, name: string }[]
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
        delay(3800),
        map((root: PokeApiResponse) => root.cards
          .map(card => ({ title: card.name }))
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

  pushArticles(...articles: Article[]) {
    this.articlesSubject.next([...this.articlesSubject.getValue(), ...articles]);
  }
}
