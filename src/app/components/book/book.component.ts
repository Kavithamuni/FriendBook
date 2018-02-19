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
  title: string = "Add";
  BookIdDisabled: boolean=false;
  id: number = 0;
  book = {};
  errorMessage: any;
  constructor(private fb: FormBuilder,
              private fbservice: FbserviceService,
              private router: Router,
              private avRoute: ActivatedRoute, ) 
  {
    if (this.avRoute.snapshot.params["id"]) {
      this.id = parseInt(this.avRoute.snapshot.params["id"]);
      //console.log(this.id);
      this.title = 'Edit';
    }
    if (this.title == 'Edit') {
      this.BookIdDisabled = true;
    }
    else {
      this.BookIdDisabled = false;
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
//To Edit/Add Book Details
  save(form) {
    if (this.title == "Add") {
      this.fbservice.createbook(form.value).subscribe(
        (book: any) => {
          if (book.status == 200) {
            alert("Book Details Added Successfully");
            this.router.navigate(['BookList']);
          }
        }
        , error => this.errorMessage = "Book ID already exists.");
    }
    else if (this.title = "Edit") {
      this.fbservice.EditBookList(form.value).subscribe(
        (book: any) => {
          if (book.status == 200) {
            alert("Book Details Updated Successfully");
            this.router.navigate(['BookList']);
          }
        }
        , error => this.errorMessage = "Error Occured during update.");
    }
  }
  //To cancel th Add/Edit
  cancel() {
    this.router.navigate(["BookList"]);
  }
}
