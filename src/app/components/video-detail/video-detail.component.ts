import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { VideosService } from '../../services/videos/videos.service'
import { IVideo } from '../../interfaces/video';

import * as plyr from "plyr";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  @ViewChild('plyrEl') plyrEl;
  video: IVideo;

  constructor(
    private route: ActivatedRoute,
    private videosService: VideosService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.videosService.getVideo(id).subscribe(video => {
      this.video = video;
      this.plyrEl.nativeElement.dataset.type = 'youtube';
      this.plyrEl.nativeElement.dataset.videoId = this.video.youtube_id;

      let player = plyr.setup(this.plyrEl.nativeElement, {
        debug: true
      });

      console.log(this.plyrEl);




      // console.log(this.plyrEl.nativeElement);
      // console.log(plyr);
      // let p1 = plyr.setup(".jsplayer");
      // console.log("p1", p1);
      // let player = plyr.setup(this.plyrEl.nativeElement, {
      //   debug: true
      // });
      // console.log(player[0]);
    });
  }

}
