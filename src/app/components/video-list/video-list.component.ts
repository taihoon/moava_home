import { Component, OnInit } from '@angular/core';
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
export class VideoListComponent implements OnInit {
  private endAt: string;
  private loading: boolean;
  private limit: number;

  private videos$: Observable<any[]>;
  private more$: BehaviorSubject<{endAt: string, limit: number}>;

  constructor(
    private sanitizer: DomSanitizer,
    private videoService: VideoService) {
      this.loading = false;
      this.endAt = '';
      this.limit = 4;
      this.more$ = new BehaviorSubject({
        endAt: this.endAt,
        limit: this.limit
      });
    }

  ngOnInit() {
    this.videos$ = this.more$.pipe(
      tap(_ => this.loading = true),
      tap(_ => console.log(_.endAt, _.limit)),
      switchMap(info => this.videoService.getVideos(info.endAt, info.limit)),
      tap(_ => _.forEach(v => console.log(v.created, v.title))),
      tap(this.assignEndAt.bind(this)),
      scan((acc, videos) => acc.concat(videos) , []),
      tap(_ => this.loading = false)
    );
  }

  private assignEndAt(videos: IVideo[]) {
    if (videos.length === this.limit + 1) {
      this.endAt = videos.pop().created;
      console.log(this.endAt);
    }
  }

  private background(video) {
    return this.sanitizer.
      bypassSecurityTrustStyle(`url(https://img.youtube.com/vi/${video.youtube_id}/0.jpg) center / cover`);
  }

  private onMore() {
		if (!this.loading) {
      this.more$.next({
        endAt: this.endAt,
        limit: this.limit
      });
    }
  }
}
