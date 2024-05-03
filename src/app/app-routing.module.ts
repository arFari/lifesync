import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateTimeComponent } from './create-time/create-time.component';

const routes: Routes = [
  { path: "test", component: HomeComponent, title: "Time" },
  { path: '', redirectTo: '/test', pathMatch: 'full' },
  { path: "CreateTime", component: CreateTimeComponent, title: "Create Timetable" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
