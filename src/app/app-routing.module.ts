import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';

export const appRouteList: Routes = [
    {
        path: 'articles',
        component: ArticlesComponent
    },
    {
        path: 'admin',
        loadChildren: () =>  import('./admin/admin.module').then(m  => m.AdminModule)
    },
    {
        path: '**',
        redirectTo: 'articles'
    }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forRoot(appRouteList)
    ]
})
export class AppRoutingModule {
}