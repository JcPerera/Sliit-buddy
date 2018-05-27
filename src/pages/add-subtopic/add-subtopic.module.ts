import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSubtopicPage } from './add-subtopic';

@NgModule({
  declarations: [
    AddSubtopicPage,
  ],
  imports: [
    IonicPageModule.forChild(AddSubtopicPage),
  ],
})
export class AddSubtopicPageModule {}
