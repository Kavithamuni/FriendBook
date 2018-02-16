import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FbserviceService } from '../../service/fbservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: []
})
export class BookComponent implements OnInit {
  bookForm: FormGroup;
  title: string = "Add";
  id: number = 0;
  book = {};
  isSuccess = false;
  errorMessage: any;
  constructor(private fb: FormBuilder, private fbservice: FbserviceService, private router: Router, private avRoute: ActivatedRoute, ) {
    if (this.avRoute.snapshot.params["id"]) {
      this.id = parseInt(this.avRoute.snapshot.params["id"]);
      console.log(this.id);
      this.title = 'Edit';
    }
  }
  ngOnInit() {
    //To get Book details by id
    if (this.id > 0) {
      this.fbservice.getBookListbyId(this.id)
        .subscribe(resp => this.book = resp
        , error => this.errorMessage = error);
    }
  }

  save(form)
  {
    if(this.title=="Add")
    {  this.fbservice.createbook(form.value).subscribe(
      (book: any) => {
        //console.log(book);
        if (book.status == 200) {
          this.isSuccess = true;
          alert("Book Details Added Successfully");
          this.router.navigate(['BookList']);
        }
      });}
      else if(this.title="Edit")
      {this.fbservice.EditBookList(form.value).subscribe(
        (book: any) => {
          //console.log(book);
          alert("Book Details Updated Successfully");
          if (book.status == 200) {
            this.isSuccess = true;
            this.router.navigate(['BookList']);
          }
        });}

  }
  //To Add book Details
  onFormSubmit(form) {
    this.fbservice.createbook(form.value).subscribe(
      (book: any) => {
        //console.log(book);
        if (book.status == 200) {
          this.isSuccess = true;
          this.router.navigate(['BookList']);
        }
      });
  }
//To cancel th Add/Edit
  cancel() {
    this.router.navigate(["BookList"]);
  }
}
