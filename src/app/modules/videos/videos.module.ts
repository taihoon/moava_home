import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosRoutingModule } from './videos-routing.module';
import { VideoListService } from '../../services/video-list/video-list.service'
import { VideoListComponent } from '../../components/video-list/video-list.component';
import { VideoListItemComponent } from '../../components/video-list-item/video-list-item.component';
import { VideoDetailComponent } from '../../components/video-detail/video-detail.component';

@NgModule({
  imports: [
    CommonModule,
    VideosRoutingModule
  ],
  declarations: [
    VideoListComponent,
    VideoListItemComponent,
    VideoDetailComponent
  ],
  providers: [VideoListService]
})
export class VideosModule { }
