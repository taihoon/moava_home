import { Component, OnInit } from '@angular/core';
import {  } from '@angular/router';
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
  loading: boolean;
  videos$: Observable<IVideo[]>;
  playing: boolean;

  private more$: BehaviorSubject<boolean>;
  private limit: number;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private videoService: VideoService) {
      console.log("videolist constructor");
      this.loading = false;
      this.playing = false;
      this.limit = 4;
      this.more$ = new BehaviorSubject(true);

      this.route.paramMap.subscribe(params => {
        console.log(params.get('id'));
      });

      this.videos$ = this.more$.pipe(
        tap(_ => this.loading = true),
        switchMap(isFirst => this.videoService.getVideos(
          this.videoService.getEndAt(), this.limit, isFirst)),
        scan((acc, videos) => acc.concat(videos) , []),
        tap(_ => this.loading = false)
      );
    }

  ngOnInit() {
    console.log("video list oninit");
    // let endAt;
    // this.videos$ = this.more$.pipe(
    //   tap(_ => this.loading = true),
    //   tap(_ => endAt = this.videoService.getEndAt()),
    //   switchMap(isFirst => this.videoService.getVideos(endAt, this.limit, isFirst)),
    //   scan((acc, videos) => acc.concat(videos) , []),
    //   tap(_ => this.loading = false)
    // );
  }

  private background(video) {
    return this.sanitizer.
      bypassSecurityTrustStyle(`url(https://img.youtube.com/vi/${video.youtube_id}/0.jpg) center / cover`);
  }

  private onMore() {
		if (!this.loading) {
      this.more$.next(false);
    }
  }

  protected onClickVideo() {
    this.playing = true;
    // const scrollTop = this.getScrollTop();
    // this.videoService.cache("scrollTop", scrollTop);
    // this.videoService.cache("key", key);
  }

  // private getScrollTop() {
  //   let el = this.el.nativeElement;
  //   const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

  //   while (el) {
  //     if (matchesSelector.call(el, 'main')) {
  //       break;
  //     } else {
  //       el = el.parentElement;
  //     }
  //   }
  //   return el.scrollTop;
  // }
}
