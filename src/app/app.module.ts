import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { SubjectsPageModule } from "../pages/subjects/subjects.module";
import { TopicPageModule } from "../pages/topic/topic.module";
import { SubtopicsPageModule } from "../pages/subtopics/subtopics.module";
import { VideosPageModule } from "../pages/videos/videos.module";
import { AdminPageModule } from "../pages/admin/admin.module";
import { ModalPageModule } from "../pages/modal/modal.module";
import { CommentsPageModule } from "../pages/comments/comments.module";
import { LoginPageModule } from "../pages/login/login.module";
import { AddSubjectPageModule } from "../pages/add-subject/add-subject.module";
import { AddSubtopicPageModule } from "../pages/add-subtopic/add-subtopic.module";
import { AddTopicPageModule } from "../pages/add-topic/add-topic.module";

import { PipesModule } from "../pipes/pipes.module";

import { GooglePlus } from '@ionic-native/google-plus';

@NgModule({
  declarations: [
    MyApp,
    HomePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AddSubjectPageModule,
    AddSubtopicPageModule,
    AddTopicPageModule,
    AdminPageModule,
    CommentsPageModule,
    ModalPageModule,
    LoginPageModule,
    VideosPageModule,
    SubtopicsPageModule,
    TopicPageModule,
    SubjectsPageModule,
    PipesModule
    

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
