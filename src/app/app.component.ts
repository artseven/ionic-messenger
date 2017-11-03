import { AuthService } from '../providers/auth-service';
import { NavController, Platform, MenuController,Keyboard } from 'ionic-angular';

import { ViewChild, Component } from '@angular/core';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = WelcomePage;
  welcomePage: any = WelcomePage;
  tabsPage = TabsPage;
  profilePage = ProfilePage;
  @ViewChild('nav') nav: NavController

  constructor(
    platform: Platform,
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private authSrv: AuthService
  ) {
    platform.ready().then(() => {
      if (this.authSrv.isAuthenticated === true) {
        this.nav.setRoot(this.tabsPage);
      } else {
        this.nav.setRoot(this.welcomePage);
      }
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
}

