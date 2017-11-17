import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListRoutingModule } from './video-list-routing.module';
import { VideoListService } from '../services/video-list/video-list.service'
import { VideoListComponent } from '../components/video-list/video-list.component';
import { VideoItemComponent } from '../components/video-item/video-item.component';


@NgModule({
  imports: [
    CommonModule,
    VideoListRoutingModule
  ],
  declarations: [VideoListComponent, VideoItemComponent],
  providers: [VideoListService]
})
export class VideoListModule { }
