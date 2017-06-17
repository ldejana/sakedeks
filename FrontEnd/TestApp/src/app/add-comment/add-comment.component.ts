import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { AddCommentService } from './add-comment.service';
import { Comment } from '../comment-list/comment.model';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from "@angular/router";
import { ErrorHandlerService } from '../services/error-handler.service';


@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
  providers: [ AddCommentService, AuthService, ErrorHandlerService ]
})
export class AddCommentComponent implements OnInit {
  
  @Input() AccommodationId: number;
  Comment: Comment;
  Text: string;
  Grade: number;
  Message: string;
  @Output() OnCommentAdded: EventEmitter<Comment>;

  constructor(private addCommentService: AddCommentService, private authService: AuthService,
              private router: Router, private activatedRoute: ActivatedRoute, 
              private errorHandlerService: ErrorHandlerService) {

        this.Message = "";
        this.Grade = 1;
        this.OnCommentAdded = new EventEmitter();
        
  }

  ngOnInit() {
  }

  onSubmit() {

    let userId = this.authService.getUserId();
    this.Comment = new Comment();
    this.Comment.AppUserId = userId;
    this.Comment.AccommodationId = this.AccommodationId;
    this.Comment.Grade = this.Grade;
    this.Comment.Text = this.Text;

    this.addCommentService.create(this.Comment).subscribe(
        x => { 
          this.OnCommentAdded.emit(); 
          this.router.navigate(['/home', this.Comment.AccommodationId]);
        },
        x => { this.Message = this.errorHandlerService.parseError(x); }
    );

  }

}
