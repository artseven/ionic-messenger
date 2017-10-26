import { Observable } from 'rxjs/Rx';
import { Component, ViewChild } from '@angular/core';
import { ToastController, Content, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',

})
export class ChatPage {
  @ViewChild(Content) content: Content
  // initializing values
  public user;
  public chatid;
  public messages;
  public message;
  private messageObj;
  public jsonMessage;
  public errorMessage;
  public simulatedObj;
  public scrollVar;
  public chatObject: {user:any, chatid: number};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public socket: Socket,
    public toastCtrl: ToastController
  ) {
      // Binding page to the passed arguments from Chats page
      this.user = this.navParams.get('user');
      this.chatid = this.navParams.get('chatid');
      //listening to changes in messageHistory object  
      this.getHistory().subscribe(messageHistory => {
        this.messages = messageHistory;
      });

      this.onIm().subscribe(newMessage=> {
        console.log('Im receiving IM');
        this.messages.push(newMessage);
      })

      // this.onEcho().subscribe(messageEcho => {
      //   this.errorMessage = messageEcho;
      //   this.showToast(messageEcho);
      // });
  }


  // Setting up get_history observable
  getHistory() {
    let observable = new Observable(observer => {
      this.socket.on('get_history', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }


  //Setting up onIm observable
  onIm() {
    let observable = new Observable(observer=> {
      this.socket.on('im', (data)=> {
        observer.next(data);
        console.log(data);
      });
    });
    return observable;
  }


  
  sendMessage() {
    this.messageObj = {
      chatid: this.chatid,
      userid: this.user.id,
      typeId: 3,
      text: this.message
    }

    //simulated object to display our message instantly
    this.simulatedObj = {
      chatid: this.chatid,
      // userid: this.user.id,
      sentby: JSON.stringify(this.user),
      createdOn: Date.now(),
        typeId: 3,
      message: this.message
    }
    //emitting event with wrapped message object
    this.socket.emit('im', this.messageObj);
    //pushing our simulated object to display sent message
    this.messages.push(this.simulatedObj);
    //setting input field to empty string
    this.message = '';
  }
  //function to parse our sentby section of message
  returnParsed(obj: string) {
    return JSON.parse(obj);
  }
      

  ionViewDidLoad() {
    // do scroll to bottom on loading and repeat every 300ms
    this.scrollVar = setTimeout(()=> {
      this.content.scrollToBottom(300);
    }, 500);
  }

  ionViewWillLeave() {
    //clearing scrolltoBottom once we leave the page to prevent scope leaks
    clearTimeout(this.scrollVar);
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
