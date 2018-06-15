import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import { Observable, Subject, empty, of } from 'rxjs';
import { first, flatMap, map, tap, toArray} from 'rxjs/operators';

import { IVideo } from '../../shared/video';

@Injectable()
export class VideoService {
  private videos: IVideo[];
  private endAt: string;
  private _cache: object;

  constructor(private db: AngularFireDatabase) {
    this.videos = [];
    this._cache = {};
  }

  isCached(): boolean {
    return  !!(this.videos && this.videos.length > 0);
  }

  cache(key: string, value?: any): (void|any) {
    if (key && (value !== undefined || value !== null )) {
      console.log(key, value);
      this._cache[key] = value;
    } else if (key && !value) {
      return this._cache[key];
    }
  }

  clearVideos(): void {
    this.videos = [];
  }

  getEndAt(): string {
    return this.endAt;
  }

  getVideo(id: string): Observable<IVideo> {
    return this.db.object(`/videos/${id}`)
      .snapshotChanges()
      .pipe(
        first(),
        map(c => (<IVideo>{ key: c.key, ...c.payload.val() }))
      );
  }

  getVideos(endAt, limit, isFirst): Observable<IVideo[]> {
    let videos$: Observable<IVideo[]>;

    if (isFirst && this.isCached()) {
      videos$ = of(this.videos);
    } else {
      videos$ = this.db.list('/videos', ref => {
        if (endAt) {
          return ref.orderByChild('created').endAt(endAt).limitToLast(limit + 1);
        } else {
          return ref.orderByChild('created').limitToLast(limit + 1);
        }
      })
      .snapshotChanges()
      .pipe(
        first(),
        map(c => c.reverse()),
        map(c => c.map(v => (<IVideo>{ key: v.payload.key, ...v.payload.val() }))),
        tap(c => this.endAt = c.pop().created),
        tap(c => this.videos = this.videos.concat(c))
      );
    }

    return videos$;
  }
}
