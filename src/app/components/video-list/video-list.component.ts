import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable, BehaviorSubject } from 'rxjs';
import { scan, switchMap, tap } from 'rxjs/operators';

import { IVideo } from '../../shared/video';
import { VideoService } from '../../services/video/video.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent {
  loading: boolean;
  videos$: Observable<IVideo[]>;
  playing: boolean;

  private more$: BehaviorSubject<boolean>;
  private limit: number;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService) {
      this.loading = false;
      this.playing = false;
      this.limit = 60;
      this.more$ = new BehaviorSubject(true);

      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          const urlTree = this.router.parseUrl(event.url);
          if (!urlTree.root.children.player) {
            this.playing = false;
          }
        }
      });

      this.videos$ = this.more$.pipe(
        tap(_ => this.loading = true),
        switchMap(isFirst => this.videoService.getVideos(
          this.videoService.getEndAt(), this.limit, isFirst)),
        scan((acc, videos) => acc.concat(videos) , []),
        tap(_ => this.loading = false)
      );
    }

  private background(video) {
    return this.sanitizer.
      bypassSecurityTrustStyle(`url(https://img.youtube.com/vi/${video.youtube_id}/0.jpg) center / cover`);
  }

  onMore() {
		if (!this.loading) {
      this.more$.next(false);
    }
  }

  onClickVideo(video) {
    this.playing = true;
  }
}
