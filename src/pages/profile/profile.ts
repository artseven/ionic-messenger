import { MyApp } from '../../app/app.component';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../providers/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public user;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authSrv: AuthService,
    private app: MyApp
  ) {
    this.user = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('MY USER', this.user);
  }
  
  logout() {
    this.authSrv.logout();
    this.navCtrl.setRoot(WelcomePage);
  }

}
