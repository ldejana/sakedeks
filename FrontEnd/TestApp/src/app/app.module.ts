import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CustomMaterialModule } from './ngmodules/custom-material.module';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryComponent } from './country/country.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './services/auth.service';

import { LoggedInGuard } from './guards/logged-in.guard';
import { IsAdminGuard} from './guards/is-admin.guard';
import { IsManagerGuard} from './guards/is-manager.guard';

import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { RegionListComponent } from './region-list/region-list.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { AccommodationTypeListComponent } from './accommodation-type-list/accommodation-type-list.component';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { AccommodationTypeComponent } from './accommodation-type/accommodation-type.component';
import { PlaceComponent } from './place/place.component';
import { RegionComponent } from './region/region.component';
import { RoomComponent } from './room/room.component';
import { AddAccTypeComponent } from './add-acc-type/add-acc-type.component';
import { EditAccTypeComponent } from './edit-acc-type/edit-acc-type.component';
import { AddCountryComponent } from './add-country/add-country.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
import { AddRegionComponent } from './add-region/add-region.component';
import { RoomListComponent } from './room-list/room-list.component';
import { EditRegionComponent } from './edit-region/edit-region.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { EditPlaceComponent } from './edit-place/edit-place.component';
import { AddAccommodationComponent } from './add-accommodation/add-accommodation.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { EditAccommodationComponent } from './edit-accommodation/edit-accommodation.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { FilteredAccommodationsComponent } from './filtered-accommodations/filtered-accommodations.component';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { RoomReservationsComponent } from './room-reservations/room-reservations.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { CommentListComponent } from './comment-list/comment-list.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationManagerComponent } from './notification-manager/notification-manager.component';
import { UsersComponent } from './users/users.component';



const ChildRoutes = [
   
  ]

const Routes = [
  {path: "home/:Id", component: HomeComponent},
  {path: "countryList", component: CountryListComponent},
  {path: "accommodation/:Id", component: AccommodationComponent},
  {path: "accommodationList/:Id/:Name/:Origin/:PlaceName", component: AccommodationListComponent},
  {path: "accommodationTypeList", component: AccommodationTypeListComponent},
  {path: "accommodationType/:Id/:Name", component: AccommodationTypeComponent},
  {path: "country/:Id", component: CountryComponent},
  {path: "place/:regionId",  component: PlaceComponent},
  {path: "placeList",  component: PlaceListComponent},
  {path: "region/:Id/:CountryName",  component: RegionComponent},
  {path: "regionList/:countryId",  component: RegionListComponent},
  {path: "addAccType",  component: AddAccTypeComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path: "editAccommodationType/:Id/:Name",  component: EditAccTypeComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path: "roomList/:AccommodationId/:AccommodationName/:OwnerId", component: RoomListComponent},
  {path: "room/:Id/:AccommodationName", component: RoomComponent},
  {path: "addCountry",  component: AddCountryComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path: "editCountry/:Id/:Name/:Code",  component: EditCountryComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path: "addRegion/:CountryId/:CountryName",  component: AddRegionComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path: "login",  component: LoginComponent},
  {path: "register",  component: RegisterComponent},
  {path: "register/:Manager",  component: RegisterComponent},
  {path: "editRegion/:Id/:Name/:CountryId/:CountryName",  component: EditRegionComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path: "editPlace/:Id/:PlaceName/:RegionId/:Path",  component: EditPlaceComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path: "addAccommodation",  component: AddAccommodationComponent, canActivate: [LoggedInGuard, IsManagerGuard]},
  {path: "editAcc/:Id/:Name/:Description/:Address/:Latitude/:Longitude/:AverageGrade/:Approved/:AccommodationTypeId/:PlaceId/:OwnerId/:ImageUrl",  
    component: EditAccommodationComponent, canActivate: [LoggedInGuard, IsManagerGuard]},
  {path: "editRoom/:Id", component: EditRoomComponent, canActivate: [LoggedInGuard, IsManagerGuard]},
  {path: "filterForm", component: FilterFormComponent},
  {path: "filteredAccommodations/:Name/:PlaceName", component: FilteredAccommodationsComponent},
  {path: "roomReservations/:UserId", component: RoomReservationsComponent},
  {path: "addReservation/:RoomId/:AccommodationName", component: AddReservationComponent},
  {path: "filteredAccommodations/:Name/:PlaceName/:RegionName/:CountryName/:AverageGrade/:BedCount/:MinPrice/:MaxPrice", component: FilteredAccommodationsComponent},
  {path: "users/:Role",  component: UsersComponent, canActivate: [LoggedInGuard, IsAdminGuard]}

]


@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    RegionListComponent,
    PlaceListComponent,
    AccommodationTypeListComponent,
    AccommodationListComponent,
    AccommodationComponent,
    AccommodationTypeComponent,
    PlaceComponent,
    RegionComponent,
    RoomComponent,
    AddAccTypeComponent,
    EditAccTypeComponent,
    AddCountryComponent,
    EditCountryComponent,
    AddRegionComponent,
    RoomListComponent,
    EditRegionComponent,
    AddPlaceComponent,
    EditPlaceComponent,
    AddAccommodationComponent,
    AddRoomComponent,
    EditAccommodationComponent,
    EditRoomComponent,
    FilteredAccommodationsComponent,
    FilterFormComponent,
    RoomReservationsComponent,
    AddReservationComponent,
    MapComponent,
    CommentListComponent,
    AddCommentComponent,
    NotificationsComponent,
    NotificationManagerComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes),
    CustomMaterialModule,
    MaterialModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAU6QHvTs4XnC-JIroKFeQwDS46FPCE_ho'})
  ],
  providers: [AuthService, LoggedInGuard, IsAdminGuard, IsManagerGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
