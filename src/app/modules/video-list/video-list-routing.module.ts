import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VideoListComponent } from './video-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'videos', component: VideoListComponent }
    ])
  ],
  exports: [RouterModule]
})
export class VideoListRoutingModule { }
