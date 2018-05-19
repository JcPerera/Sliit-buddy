import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubtopicsPage } from './subtopics';

@NgModule({
  declarations: [
    SubtopicsPage,
  ],
  imports: [
    IonicPageModule.forChild(SubtopicsPage),
  ],
})
export class SubtopicsPageModule {}
