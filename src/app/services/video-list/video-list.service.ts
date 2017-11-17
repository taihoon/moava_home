import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { IVideo } from '../../interfaces/video';

@Injectable()
export class VideoListService {

  private limitToLast: number = 60;
  constructor(private db: AngularFireDatabase) {}

  get(endAt: string = null, limitToLast): Observable<IVideo[]> {
  	if (!limitToLast) {
  		limitToLast = this.limitToLast;
    }

    return this.db.list(
      '/videos',
      ref => endAt ?
        ref.orderByChild('created').endAt(endAt).limitToLast(limitToLast + 1) :
        ref.orderByChild('created').limitToLast(limitToLast + 1)
      ).valueChanges();
  }
}
