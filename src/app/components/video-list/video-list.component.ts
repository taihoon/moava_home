import { PLATFORM_ID, Component, Injectable, Inject, OnInit } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { flatMap, map, tap, toArray, scan, switchMap} from 'rxjs/operators';
import { AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';

import { IVideo } from '../../shared/video';
import { VideoService } from '../../services/video/video.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  private lastVideo: IVideo;
  private loading = false;

  private videos$: Observable<any[]>;
  private more$: BehaviorSubject<string|null> = new BehaviorSubject(null);

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject('LOCALSTORAGE') private localStorage: any,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private videoService: VideoService) {}

  ngOnInit() {
      this.videos$ = this.more$.pipe(
        tap(_ => this.loading = true),
        switchMap(created => this.videoService.getVideos(created)),
        tap(videos => this.lastVideo = <IVideo>videos.shift()),
        scan((acc, curr) => acc.concat(curr.reverse()), []),
        tap(_ => this.loading = false)
      );
  }

  private background(video) {
    return this.sanitizer.
      bypassSecurityTrustStyle(`url(https://img.youtube.com/vi/${video.youtube_id}/0.jpg) center / cover`);
  }

  private onMore() {
		if (!this.loading) {
      this.more$.next(this.lastVideo.created);
    }
  }
}
