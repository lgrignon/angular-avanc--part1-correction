import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlesService } from 'src/app/core/articles.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent {
  types: Observable<string[]>;
  constructor(private articlesService: ArticlesService) {
    this.types = this.articlesService.getKnownTypes();
  }

}
