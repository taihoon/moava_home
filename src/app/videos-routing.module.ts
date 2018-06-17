import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VideoListComponent } from './components/video-list/video-list.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'videos', component: VideoListComponent },
      { path: ':id', component: VideoDetailComponent, outlet: 'player'}
    ])
  ],
  exports: [RouterModule]
})
export class VideosRoutingModule { }
