import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { IVideo } from '../../interfaces/video';

@Injectable()
export class VideosService {

  private limitToLast: number = 60;
  constructor(private db: AngularFireDatabase) {}

  getVideo(id: string) {
    return this.db.object(`/videos/${id}`).snapshotChanges();
      //.take(1)
      //.map(change => ({ key: change.key, ...change.payload.val() }));
  }

  getVideoList(endAt: string = null, limitToLast) {
  	if (!limitToLast) {
  		limitToLast = this.limitToLast;
    }

    return this.db.list(
      '/videos',
      ref => endAt ?
        ref.orderByChild('created').endAt(endAt).limitToLast(limitToLast + 1) :
        ref.orderByChild('created').limitToLast(limitToLast + 1)
      ).snapshotChanges().take(1).map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
  }

}
