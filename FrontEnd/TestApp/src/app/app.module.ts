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
import { AddCountryComponent } from './add-country/add-country.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
import { AddRegionComponent } from './add-region/add-region.component';
import { RoomListComponent } from './room-list/room-list.component';

const ChildRoutes = [
   
  ]

const Routes = [
  {path: "home/:Id/:Name/:Origin", component: HomeComponent},
  {path: "countryList", component: CountryListComponent},
  {path: "accommodation/:Id", component: AccommodationComponent},
  {path: "accommodationList/:Id/:Name/:Origin", component: AccommodationListComponent},
  {path: "accommodationTypeList", component: AccommodationTypeListComponent},
  {path: "country/:Id", component: CountryComponent},
  {path: "place/:regionId",  component: PlaceComponent},
  {path: "placeList",  component: PlaceListComponent},
  {path: "region/:Id/:CountryName",  component: RegionComponent},
  {path: "regionList/:countryId",  component: RegionListComponent},
  {path: "addAccType",  component: AddAccTypeComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path: "editAccType/:Id/:Name",  component: EditAccTypeComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path: "rooms/:Id/:AccName", component: RoomComponent},
  {path: "addCountry",  component: AddCountryComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path: "editCountry/:Id/:Name/:Code",  component: EditCountryComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path: "addRegion/:CountryId/:CountryName",  component: AddRegionComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path: "login",  component: LoginComponent},
  {path: "register",  component: RegisterComponent}
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
    RoomListComponent
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
