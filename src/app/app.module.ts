import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateTimeComponent } from './create-time/create-time.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateTimeComponent,
    CollectiblesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, { useHash: true }), 
    HttpClientModule,
    CommonModule,
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
