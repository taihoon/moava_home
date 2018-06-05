import { Component, ViewChild, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';

import { VideoService } from '../../services/video/video.service'
import { IVideo } from '../../shared/video';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {

  video: IVideo;
  src: SafeUrl;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private videoService: VideoService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.videoService.getVideo(id).subscribe(video => {
      this.video = <IVideo>(video);
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl(
		  	`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1&controls=2&playsinline=1`
      );
    });
  }

}
