import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VideoListService {

  private limitToLast: number = 60;
  constructor(private db: AngularFireDatabase) {}

  get(endAt: string = null, limitToLast) {
  	if (!limitToLast) {
  		limitToLast = this.limitToLast;
    }

    return this.db.list('/videos', ref => ref.
      orderByChild('created').endAt(endAt).limitToLast(limitToLast + 1)).valueChanges();
  }
}
