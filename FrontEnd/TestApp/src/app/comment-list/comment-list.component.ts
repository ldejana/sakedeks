import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommentListService } from './comment-list.service';
import { Comment } from './comment.model';
import { RoomReservation } from '../room-reservations/room-reservation.model';
import { AuthService } from "app/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
  providers: [CommentListService, AuthService ]
})
export class CommentListComponent implements OnInit, OnChanges {

  @Input() AccommodationId: number;
  Comments: Comment[];
  CommentsCount: number = 0;

  CanUserLeaveComment: boolean = false;
  Reservations: RoomReservation[];
  CurrentDate: Date;
  UserId: number;

  constructor(private commentListService: CommentListService, private authService: AuthService, 
              private router: Router, private activatedRoute: ActivatedRoute) {
        this.CurrentDate = new Date();
   }

  ngOnInit() {
    if(this.AccommodationId != undefined) {
      this.getComments();
      if(this.isLoggedIn() && !this.isAdmin() && !this.isManager()) {
         this.checkIfUserCanLeaveComment();
      } 
      else {
        this.CanUserLeaveComment = false;
      }
      this.UserId = this.authService.getUserId();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.AccommodationId != undefined) {
      this.getComments();
      if(this.isLoggedIn() && !this.isAdmin() && !this.isManager()) {
         this.checkIfUserCanLeaveComment();
      } 
      else {
        this.CanUserLeaveComment = false;
      }

      this.UserId = this.authService.getUserId();
    }
  }

   getComments() {
      this.commentListService.getAll(this.AccommodationId).subscribe(     
        x => { this.Comments = x.json(); this.CommentsCount = this.Comments.length; } );
    }

  isLoggedIn(): boolean {
      return this.authService.isLoggedIn();
    }

  isManager() : boolean{
    return this.authService.getRole() == "Manager";
  }

  isAdmin(): boolean {
    return this.authService.getRole() == "Admin";
  }

  checkIfUserCanLeaveComment() {
    this.commentListService.getReservations(this.AccommodationId).subscribe(
      x => { this.Reservations = x.json(); this.checkIfUserUsedAccommodation(); }
    );
  }

  checkIfUserLeftComment() {
    let userId = this.authService.getUserId();
    if(this.CommentsCount > 0) {
       for(let comment of this.Comments) {
          if(comment.AppUserId == userId) {
            this.CanUserLeaveComment = false;
            return;
        }
      }
    }
   
  }

  checkIfUserUsedAccommodation() {
    if(this.Reservations.length == 0){
      this.CanUserLeaveComment = false;
      return;
    }

    for(let reservation of this.Reservations) {
      let start: Date = new Date(reservation.StartDate);
      let current: Date = new Date(this.CurrentDate.toISOString());

      if(start < current) {
        this.CanUserLeaveComment = true;
        break;
      } 
    }

     this.checkIfUserLeftComment();
  }

  commentAdded() {
    this.getComments();

     if(this.isLoggedIn()) {
         this.checkIfUserCanLeaveComment();
      } 
      else {
        this.CanUserLeaveComment = false;
      }
  }

  deleteComment(userId: number, accommodationId: number) {
    if(userId != undefined && accommodationId != undefined) {
      this.commentListService.deleteComment(userId, accommodationId).subscribe( 
        x => {this.router.navigate(['/home', 'comments', this.AccommodationId])});
    }
  }

}
