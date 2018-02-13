import { PLATFORM_ID, Component, Injectable, Inject, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { IVideo } from '../../interfaces/video';
import { VideosService } from '../../services/videos/videos.service'

import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit, OnDestroy {

  private lastVideo: IVideo;
  private loading: boolean = false;

  private videos$: Observable<IVideo[]>;
  private more$: BehaviorSubject<string|null>;
  private destroy$: Subject<null>;
  private loading$: BehaviorSubject<Boolean>

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject('LOCALSTORAGE') private localStorage: any,
    private videosService: VideosService) {
      this.loading$ = new BehaviorSubject(false)
      this.destroy$ = new Subject();
      this.more$ = new BehaviorSubject(null);

      this.videos$ = this.more$
        .switchMap(created => this.videosService.getVideoList(created))
        .scan((acc, curr) => {
          this.lastVideo = curr.shift();
          return acc.concat(curr.reverse());
        }, [])

        this.videos$.buffer(this.destroy$)
          .subscribe(v => {
            console.log("destroy", v[v.length - 1]);
          })

      // this.destroy$
      //   .switchMap(() => this.more$)
      //   .subscribe(v => {
      //     console.log("destroy", v);
      //   });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // console.log(this.localStorage);
      // localStorage will be available: we can use it.
    }
    if (isPlatformServer(this.platformId)) {
        // localStorage will be null.
    }
  }

  ngOnDestroy() {
    this.destroy$.next();

    //this.destroy$.complete()
    //this.videos$.complete();
  }

  private onMore() {
		if (!this.loading) {
      this.more$.next(this.lastVideo.created);
    }
  }

}
