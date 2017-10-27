import { Socket } from 'ng-socket-io';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {


  chat = {user: {}};
  constructor(
    public navCtrl: NavController,
    private socket: Socket,
  ) { }

  ngOnInit() {
    // Initializing socket
    this.socket.connect();
    // Setting up our user -> to be modified
    // this.chat.user = {id: 2, name: 'Anonymous'};
    this.socket.emit('identify', this.chat.user )

  }

  login() {
  // Creating page for our user 
  this.navCtrl.push('TabsPage', { user: this.chat.user});
  this.socket.emit('get_chats', this.chat.user);    

  }


}
