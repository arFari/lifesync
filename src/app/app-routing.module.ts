import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent, title: "Time" },
];

@NgModule({
  
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
