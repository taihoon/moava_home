import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, of } from 'rxjs';
import { first, flatMap, map, tap, toArray} from 'rxjs/operators';

import { IVideo } from '../../shared/video';

@Injectable()
export class VideoService {
  private videos$: Observable<IVideo[]>;
  private limit: number;

  constructor(private db: AngularFireDatabase) {
    this.limit = 60;
  }

  getVideo(id: string): Observable<IVideo> {
    return this.db.object(`/videos/${id}`)
      .snapshotChanges()
      .pipe(
        first(),
        map(c => (<IVideo>{ key: c.key, ...c.payload.val() }))
      );
  }

  getVideos(endAt, limit = this.limit): Observable<IVideo[]> {
    // if (count === 0 && this.videos.length > 0) {
    //   return this.getCachedVideos();
    // } else {
       return this.getFetchVideos(endAt, limit);
    // }
  }

  protected getCachedVideos(): Observable<IVideo[]> {
    return of(this.videos);
  }

  protected getFetchVideos(endAt, limit = this.limit): Observable<IVideo[]> {
    return this.db.list('/videos', ref => {
      if (endAt) {
        return ref.orderByChild('created').endAt(endAt).limitToLast(limit + 1);
      } else {
        return ref.orderByChild('created').limitToLast(limit + 1);
      }
    })
    .snapshotChanges()
    .pipe(
      first(),
      flatMap(c => c),
      map(c => (<IVideo>{ key: c.payload.key, ...c.payload.val() })),
      toArray(),
      map(videos => videos.reverse())
    );
  }
}
