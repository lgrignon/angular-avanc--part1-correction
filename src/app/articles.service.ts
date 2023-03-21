import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, concatAll, forkJoin, interval, map, merge, mergeAll, mergeScan, Observable, of, scan, Subject, take, tap, timer } from 'rxjs';

export interface Article {
  title: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private articlesSubject: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([
    { title: "article 1" },
    { title: "article 2", description: "détail de cet article" },
    { title: "article 3" },
  ]);
  constructor() {
    interval(2000)
      .pipe(
        take(15)
      )
      .subscribe(() => this.pushArticle({
        title: "article " + Math.round(Math.random() * 300),
        description: Math.random() > 0.5 ? undefined : "cet article est très bien décrit"
      }));
  }

  getArticleNames(): Observable<string[]> {
    return this.articlesSubject.pipe(
      map(x => x.map(article => article.title + (article.description ? ' (has desc)' : '')))
    );
  }

  pushArticle(article: Article) {
    this.articlesSubject.next([...this.articlesSubject.getValue(), article]);
  }
}
