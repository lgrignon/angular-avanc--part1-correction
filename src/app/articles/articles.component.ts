import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Article, ArticlesService } from '../articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {

  addForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
  });

  names: Observable<string[]>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly articlesService: ArticlesService
  ) {
    this.names = this.articlesService.getArticleNames();
  }

  onSubmit() {
    this.articlesService.pushArticle(this.addForm.getRawValue() as Article);
  }
}
