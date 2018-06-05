import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { first, flatMap, map, take, tap, toArray } from 'rxjs/operators';

import { IVideo } from '../../shared/video';

@Injectable()
export class VideosService {
  private videos: IVideo[];
  private limitToLast = 60;
  constructor(private db: AngularFireDatabase) {}

  getVideo(id: string) {
    return this.db.object(`/videos/${id}`)
      .snapshotChanges()
      .pipe(
        first(),
        map(c => ({ key: c.key, ...c.payload.val() }))
      );
  }

  getVideoList(endAt: string = null, limitToLast = this.limitToLast) {
    return this.db.list('/videos', ref => {
      if (endAt) {
        return ref.orderByChild('created').endAt(endAt).limitToLast(limitToLast + 1);
      } else {
        return ref.orderByChild('created').limitToLast(limitToLast + 1);
      }
    })
    .snapshotChanges()
    .pipe(
      first(),
      flatMap(c => c),
      map(c => ({ key: c.payload.key, ...c.payload.val() })),
      toArray()
    );
  }
}
