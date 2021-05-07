import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {SwimmingLanesComponent} from './swimming-lanes/swimming-lanes.component';
import {TicketComponent} from './swimming-lanes/ticket/ticket.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ScrollingModule} from "@angular/cdk/scrolling";

@NgModule({
  declarations: [
    AppComponent,
    SwimmingLanesComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    DragDropModule,
    ScrollingModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
