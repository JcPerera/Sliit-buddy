import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { SubjectsPage } from "../pages/subjects/subjects";
import { TopicPage } from "../pages/topic/topic";
import { SubtopicsPage } from "../pages/subtopics/subtopics";
import { VideosPage } from "../pages/videos/videos";

import { YoutubePipe } from "../pipes/youtube/youtube";
import { GooglePlus } from '@ionic-native/google-plus';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SubjectsPage,
    TopicPage,
    SubtopicsPage,
    VideosPage,
    YoutubePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SubjectsPage,
    TopicPage,
    SubtopicsPage,
    VideosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
