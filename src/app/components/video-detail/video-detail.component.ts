import { Component, OnInit, AfterViewInit } from '@angular/core';
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

  video: FirebaseObjectObservable<IVideo>;

  constructor(
    private route: ActivatedRoute,
    private videosService: VideosService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.video = this.videosService.getVideo(id);
    console.log(this.video);
  }

  ngAfterViewInit() {
    //plyr.setup();
  }

}
