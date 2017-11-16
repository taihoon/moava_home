import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListRoutingModule } from './video-list-routing.module';
import { VideoListComponent } from './video-list.component';
import { VideoListService } from '../../services/video-list/video-list.service'

@NgModule({
  imports: [
    CommonModule,
    VideoListRoutingModule
  ],
  declarations: [VideoListComponent],
  providers: [VideoListService]
})
export class VideoListModule { }
