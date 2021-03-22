import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MapComponent } from './components/map/map.component';

import { AgmCoreModule } from '@agm/core';
// import { DataTableComponent } from './components/data-table/data-table.component';

import { MaterialModule } from './material/material.module';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    UsersListComponent,
    UpdateUserComponent,
    MapComponent,
    // DataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAF2ZEj42wsx9GCLbeYn9VPhK5R8zuHeCU',
      libraries: ['places']
    }),

    MaterialModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
