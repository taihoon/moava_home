import { Component, Input, OnInit } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { IVideo } from '../../interfaces/video';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.css']
})
export class VideoItemComponent implements OnInit {

  @Input() private video: IVideo;
  private backgroundStyle: SafeStyle;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.sanitizer.bypassSecurityTrustStyle
    this.backgroundStyle = this.sanitizer.
      bypassSecurityTrustStyle(`url(https://img.youtube.com/vi/${this.video.youtube_id}/0.jpg) center / cover`);
  }
}
