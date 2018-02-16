import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FbserviceService } from '../../service/fbservice.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  books: Array<any> = [];
  errorMessage: any;
  currentId: number = 0;

  constructor(private fbservice: FbserviceService,
    private router: Router) { }

  ngOnInit() {
    this.getBooksList();
  }

  //To get all bokks list
  getBooksList() {
    this.fbservice.getBooklist().subscribe(
      data => this.books = data,
      error => {
        debugger;
        this.errorMessage = error
      }
    )
  }

  //To redirect to Add Page
  add() {
    this.router.navigate(['Books']);
  }
  //To redirect to Edit Page
  edit(id) {
    this.router.navigate(['Books/' + id])
  }
  //To delete a Book from list
  delete(BookId,BookName) {
    var ans = confirm("Do you want to delete book " + BookId +"-" + BookName);
    if (ans) {
      this.fbservice.DeleteBooks(BookId)
        .subscribe(data => {
          var index = this.books.findIndex(x => x.id == BookId);
          this.books.splice(index, 1);
          this.getBooksList();
        },
        error => this.errorMessage = error)
    }
  }
}
