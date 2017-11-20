import { Component, Input, OnInit } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { IVideo } from '../../interfaces/video';

@Component({
  selector: 'app-video-list-item',
  templateUrl: './video-list-item.component.html',
  styleUrls: ['./video-list-item.component.css']
})
export class VideoListItemComponent implements OnInit {

  @Input() private video: IVideo;
  private backgroundStyle: SafeStyle;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.backgroundStyle = this.sanitizer.
      bypassSecurityTrustStyle(`url(https://img.youtube.com/vi/${this.video.youtube_id}/0.jpg) center / cover`);
  }

}
