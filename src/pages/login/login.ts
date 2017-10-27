import { TouchID} from '@ionic-native/touch-id';
import { usercreds } from '../../models/interfaces/user-credentials';
import { AuthService } from '../../providers/auth-service';
import { AlertController } from 'ionic-angular';
import { Loading } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { Socket } from 'ng-socket-io';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {} as usercreds
  loading: Loading
  user: {id: number, name: string};
  responseData: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private socket: Socket,
    private authSrv: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private touchId: TouchID
  ) {
    // Constructor for TouchID
    this.touchId.isAvailable()
    .then(
       res => console.log('TouchID is available'),
       err => console.error('TouchID is not available', err)
     );
 
   this.touchId.verifyFingerprint('Scan your fingerprint please')
   .then(
     res => console.log('Ok', res),
     err => console.error('Error', err)
   )
  }

  login(credentials) {
    this.showLoading(); 

    this.authSrv.login(this.credentials).then((myUser)=> {
      if (myUser === undefined) {
        this.showError("User cannot be found. Please check your credentials");
      } else {
        console.log('MY USER IN LOGIN.TS', myUser)
        this.socket.connect();
        this.socket.emit('identify', myUser);
        this.socket.emit('get_chats', myUser);
        this.navCtrl.push(TabsPage, {user: myUser });
      }
    });
  }

  getChats() {
    this.socket.connect();
    this.socket.emit('identify', this.credentials);
    this.socket.emit('get_chats', this.credentials);
    this.navCtrl.push(TabsPage, {user: this.credentials });

  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait..',
    });
    this.loading.present();

    setTimeout(()=> {
      this.loading.dismiss();
    }, 1000);
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Failed to connect',
      subTitle: text,
      buttons: ['Ok']
    });
    alert.present();
  }  

}
