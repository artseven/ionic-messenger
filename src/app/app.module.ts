import { HttpModule } from '@angular/http';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { Transfer } from '@ionic-native/transfer';
import { GalleryPage } from '../pages/gallery/gallery';
import { AuthService } from '../providers/auth-service';
import { ChatsPage } from '../pages/chats/chats';
import { SearchPage } from '../pages/search/search';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { SocketIoConfig, SocketIoModule } from 'ng-socket-io';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatProvider } from '../providers/chat/chat';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TouchID } from '@ionic-native/touch-id';


// const config: SocketIoConfig = { url: 'http://v3.art.dev.swinglifestyle.com:10843', options: {withCredentials: true} };

const config: SocketIoConfig = { url: 'http://v3.art.dev.swinglifestyle.com:10843', options:  { } };
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    ProfilePage,
    TabsPage,
    SearchPage,
    ChatsPage,
    GalleryPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    ProfilePage,
    TabsPage,
    SearchPage,
    ChatsPage,
    GalleryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ChatProvider,
    AuthService,
    TouchID,
    File,
    Transfer,
    FilePath,
    Camera,

  ]
})
export class AppModule {}
