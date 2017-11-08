import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { NgStringPipesModule } from 'angular-pipes'
@NgModule({
  declarations: [
    ChatPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatPage),
    NgStringPipesModule
  ],
})
export class ChatPageModule {}
