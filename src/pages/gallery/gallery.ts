import { Loading, LoadingController, Platform, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any
@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {

  lastImage: string = null;
  loading: Loading

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    
  ) { }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  public takePicture(sourceType) {
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }
// workaround for native Android picture storage
    this.camera.getPicture(options)
    .then((imagePath) => {
      if (this.platform.is('android')&&sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image');
    });
  }

  //creating name for our image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName = n + ".jpg";
    return newFileName;
  }

  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
    .then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }


  public uploadImage() {
    var url = 'my-url';

    var targetPath = this.pathForImage(this.lastImage);

    var filename = this.lastImage;

    var options = {
      fileKey: 'file',
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {'filename': filename}
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();


    fileTransfer.upload(targetPath, url, options)
    .then(data=> {
      this.loading.dismissAll()
      this.presentToast('Image successfully uploaded.');

    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }
}
