import { Component, OnInit } from '@angular/core';
import { IVideo } from '../../interfaces/video';
import { VideoListService } from '../../services/video-list/video-list.service'

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

  private videosSubject: Subject<IVideo[]> = new Subject();

  constructor(private videoListService: VideoListService) { }

  ngOnInit() {
    this.appendVideos();
  }

  private appendVideos(endAt: string = null, limitToLast: number = null) {
		if (!this.loading) {
			this.loading = true;
			//this.videoListService.get(endAt, limitToLast).subscribe(videos => {

				// this.lastVideo = videos.shift();
				// this.videosSubject.next(videos.reverse());
				// this.videosCount += videos.length;
				// this.loading = false;
			//});
		}
	}

}
