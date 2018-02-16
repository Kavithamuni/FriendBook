import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch'; //exception handling 
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';


@Injectable()
export class FbserviceService {
baseurl="http://localhost:63557/api/FriendBook/";
  post :any ={};
  constructor(private http:Http) { }

  //create
  createbook(bookFormData){
   return this.http.post(this.baseurl +'AddBookList', bookFormData)
    .map((response) => {
      return response;
    });
  }

  //get all contacts
  getBooklist(){
    return this.http.get(this.baseurl +'GetBookList')
      .map((response) => {
        return response.json();
      });  
  }

  //Get contact by id
  getBookListbyId(id ){
    return this.http.get(this.baseurl +'GetBookById?BookId='+id)
    .map((response) => {
      return response.json();
    }); 
  }
  //update
  EditBookList(bookFormData){
    return this.http.put(this.baseurl +'EditBookList', bookFormData)
      .map((response) => {
        return response;
      });
    }

    //delete
  DeleteBooks(id)
  {
    return this.http.delete(this.baseurl +'DeleteBooks?BookId='+id)
    .map((response) => {
      return response;
    });
  }
}
