import { Socket } from 'ng-socket-io';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  newArray;
  messages: Array<any> = []
  chats;
  name: string = ''
  message: string  = '';
  user: {id: number, name: string};
  chat;
  items: string[];

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private socket: Socket,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    this.user = this.navParams.data
    // Subscribing to all the changes that happen to getChats observable
    this.getChats().subscribe(chatsArr => {
      console.log("CHATSARR", chatsArr);
      this.newArray = chatsArr;
      // this.newArray.forEach(element => {
      //   let parsed = JSON.parse(element.members);
      //   element.members = parsed;
      // });
      this.chats = this.newArray;
      console.log(this.chats);
    });
  }


  //Setting up chats observable
  getChats() {
    let observable = new Observable(observer => {
      this.socket.on('get_chats', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  // Sending to start chat page
  onChatStarted(chat) {
    this.socket.emit('get_history', {user: this.user.id, chatid: chat.chatid} )
    this.navCtrl.push('ChatPage', { user: this.user, chat: chat});
  }
  
  returnParsed(obj: string) {
    return JSON.parse(obj);
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}


