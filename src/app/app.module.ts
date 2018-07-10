import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { firebase } from '../environments/firebase.config';
import { AppRoutingModule } from './app-routing.module';

import { VideosModule } from './videos.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    VideosModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getLocalStorage() {
  return (typeof window !== "undefined") ? window.localStorage : null;
}
