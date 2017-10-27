import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
