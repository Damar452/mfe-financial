import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRouting } from './home.routing';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRouting)
  ]
})
export class HomeModule { }
