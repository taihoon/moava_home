import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { firebase } from '../environments/firebase.config';
import { AppRoutingModule } from './app-routing.module';
import { VideoListModule } from './modules/video-list.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    VideoListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
