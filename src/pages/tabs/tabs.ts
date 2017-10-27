import { GalleryPage } from '../gallery/gallery';
import { SearchPage } from '../search/search';
import { WelcomePage } from '../welcome/welcome';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { ChatsPage } from '../chats/chats';
import { ChatPage } from '../chat/chat';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {  }

  rootPage: any = WelcomePage;
  userParams = this.navParams.get('user');
  
  tab1Root = ChatsPage;
  tab2Root = SearchPage;
  tab3Root = GalleryPage
  tab4Root = ProfilePage;

  profilePage = ProfilePage;
  chatsPage = ChatsPage;


}
