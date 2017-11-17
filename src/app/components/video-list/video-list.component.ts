import { Component, OnInit } from '@angular/core';
import { IVideo } from '../../interfaces/video';
import { VideoListService } from '../../services/video-list/video-list.service'

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

  constructor(private videoListService: VideoListService) {
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
      this.videoListService
        .get(endAt, limitToLast)
        .take(1)
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
