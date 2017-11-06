import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
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
  loginPage: any = LoginPage;
  signupPage: any = SignupPage;
  tabsPage = TabsPage;
  profilePage = ProfilePage;
  isAuthenticated = false;
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
        this.isAuthenticated = true
        console.log('User authorized, sending to TabsPage');
        this.nav.setRoot(this.tabsPage);
      } else {
        this.isAuthenticated = false;
        console.log('User is not authorized, sending to WelcomePage');
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

  onLogout() {
    this.authSrv.logout();
    this.menuCtrl.close();
    this.nav.setRoot(WelcomePage);
  }
}

