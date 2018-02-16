import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import {RouterModule} from '@angular/router';
import { FormsModule ,ReactiveFormsModule}   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FriendlistComponent } from './components/friendlist/friendlist.component';
import { BooklistComponent } from './components/booklist/booklist.component';
import { NavComponent } from './components/nav/nav.component';

import {FbserviceService} from './service/fbservice.service';
import { BookComponent } from './components/book/book.component';
import { SearchPipe } from './pipes/search.pipe';


const APP_ROUTES: Routes=[
  {path:'' ,component:BookComponent, data: { title: 'Books' }},
  {path: 'Books',component:BookComponent, data: { title: 'Books' }},
  {path: 'BookList',component:BooklistComponent, data: { title: 'BooksList' }},
  {path: "Books/:id", component: BookComponent, data: { title: 'Edit Books List' } }
 ]


@NgModule({
  declarations: [
    AppComponent,
    FriendlistComponent,
    BooklistComponent,
    NavComponent,
    BookComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    FbserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
