import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypesComponent } from './types/types.component';

export const appRouteList: Routes = [

  {
    path: 'types',
    component: TypesComponent
  },
  {
    path: '**',
    redirectTo: 'types'
  }
];

@NgModule({
  declarations: [
    TypesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRouteList)
  ],
  bootstrap: [
  ]
})
export class AdminModule { }
