import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryComponent } from './country/country.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './services/auth.service';

import { LoggedInGuard } from './guards/logged-in.guard';
import { IsAdminGuard} from './guards/is-admin.guard';

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

const ChildRoutes = [
   
  ]

const Routes = [
  {path: "home/:Id/:AccName", component: HomeComponent},
  {path: "countryList", component: CountryListComponent},
  {path: "accommodation", component: AccommodationComponent},
  {path: "accommodationList", component: AccommodationListComponent},
  {path: "accommodationType/:Id/:AccName", component: AccommodationTypeComponent, children:ChildRoutes},
  {path: "accommodationTypeList", component: AccommodationTypeListComponent},
  {path: "country/:Id", component: CountryComponent},
  {path: "place",  component: PlaceComponent},
  {path: "placeList",  component: PlaceListComponent},
  {path: "region",  component: RegionComponent},
  {path: "regionList/:countryId",  component: RegionListComponent},
  {path: "rooms/:Id/:AccName/:AccType/:AccTypeId", component: RoomComponent},
  {path: "addAccType",  component: AddAccTypeComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path: "editAccType/:Id/:Name",  component: EditAccTypeComponent, canActivate: [LoggedInGuard, IsAdminGuard]}
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
    EditAccTypeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [AuthService, LoggedInGuard, IsAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
