import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateTimeComponent } from './create-time/create-time.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseService } from './service/database.service';
import { CollectiblesComponent } from './collectibles/collectibles.component';
import { TestingComponent } from './testing/testing.component';
import { AddItemsComponent } from './add-items/add-items.component';
import { ScheduleConfirmationComponent } from './schedule-confirmation/schedule-confirmation.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'create-time',
    component: CreateTimeComponent,
    title: 'Create Timetable',
  },
  {
    path: 'collectibles',
    component: CollectiblesComponent,
    title: 'Collectibles',
  },
  { path: 'add', component: AddItemsComponent, title: 'Add Event' },
  { path: 'test', component: HomeComponent, title: 'Time' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  {
    path: 'schedule-confirmation',
    component: ScheduleConfirmationComponent,
    title: 'Schedule Confrimation',
  },
  { path: '', redirectTo: '/test', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateTimeComponent,
    TestingComponent,
    CollectiblesComponent,
    AddItemsComponent,
    ScheduleConfirmationComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, { useHash: false }),
    HttpClientModule,
    CommonModule,
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
