import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateTimeComponent } from './create-time/create-time.component';
import { CollectiblesComponent } from './collectibles/collectibles.component';

const routes: Routes = [
  { path: "test", component: HomeComponent, title: "Time" },
  { path: "collectibles", component: CollectiblesComponent, title: "Collectibles" },
  { path: "create-time", component: CreateTimeComponent, title: "Create Timetable" },
  { path: '', redirectTo: '/test', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
