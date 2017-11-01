import { Observable } from 'rxjs/Rx';
import { observable } from 'rxjs/symbol/observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';


@Injectable()
export class ChatProvider {

  private socket;

  sendMessage(message) {
    this.socket.emit('im', message);
  }



  getChats() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('get_chats', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  // getChatByRoom(room) {
  //   return new Promise((resolve, reject) => {
  //     this.http.get('/chat/' + room)
  //       .map(res => res.json())
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }

  // saveChat(data) {
  //   return new Promise((resolve, reject) => {
  //       this.http.post('/chat', data)
  //         .map(res => res.json())
  //         .subscribe(res => {
  //           resolve(res);
  //         }, (err) => {
  //           reject(err);
  //         });
  //   });
  // }
}
