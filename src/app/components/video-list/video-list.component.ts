import { PLATFORM_ID, Component, Injectable, Inject, OnInit } from '@angular/core';
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
export class VideoListComponent implements OnInit {

  private lastVideo: IVideo;
  private loading: boolean = false;

  private videos$: Observable<IVideo[]>;
  private more$: BehaviorSubject<string|null>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject('LOCALSTORAGE') private localStorage: any,
    private videosService: VideosService) {
      this.more$ = new BehaviorSubject(null);
      this.videos$ = this.more$
        .switchMap(created => this.videosService.getVideoList(created))
        .do(videos => this.lastVideo = videos.shift())
        .scan((acc, curr) => acc.concat(curr.reverse(), []))
        .do(v => this.localStorage.setItem('moava:videos', JSON.stringify(v)));
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

  private onMore() {
		if (!this.loading) {
      this.more$.next(this.lastVideo.created);
    }
  }

  private onPlay() {

  }

}
