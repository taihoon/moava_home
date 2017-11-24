import { Component, OnInit } from '@angular/core';
import { IVideo } from '../../interfaces/video';
import { VideosService } from '../../services/videos/videos.service'

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  private lastVideo: IVideo;
  private videosCount: number = 0;
  private loading: boolean = false;

  private videos$: Observable<IVideo[]>;
	private videosSubject: Subject<IVideo[]> = new Subject();

  constructor(private videosService: VideosService) {
    this.videos$ = this.videosSubject.asObservable().scan((acc, curr) => {
	  	return acc.concat(curr);
	  });
  }

  ngOnInit() {
    this.appendVideos();
  }

  private appendVideos(endAt: string = null, limitToLast: number = null) {
		if (!this.loading) {
			this.loading = true;
      this.videosService
        .getVideoList(endAt, limitToLast)
        .subscribe(videos => {
          this.lastVideo = videos.shift();
          this.videosCount += videos.length;
          this.videosSubject.next(videos.reverse());
          this.loading = false;
        });
		}
  }

  private onMore() {
		if (!this.loading) {
			this.appendVideos(this.lastVideo.created);
		}
  }
}
