import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { Beranda } from '../beranda/beranda';
import { Cari } from '../cari/cari';
import { Post } from '../post/post';
import { Notifikasi } from '../notifikasi/notifikasi';
import { Profil } from '../profil/profil';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  tabBeranda = Beranda;
  tabCari = Cari;
  tabNotif = Notifikasi;
  tabProfil = Profil;

  constructor(
    public navCtrl: NavController, 
    private asCtrl: ActionSheetController,
    private camera: Camera) { }

  openMedia() {
    let actionSheet = this.asCtrl.create({
      title: 'Pilih Media',
      buttons: [
        {
          text: 'Galeri',
          icon: 'image',
          handler: () => {
            this.openGalery();
          }
        },{
          text: 'Kamera',
          icon: 'camera',
          handler: () => {
            this.openCamera();
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCamera(){
      const options: CameraOptions = {
        quality: 100,
       targetWidth: 300,
        targetHeight: 200,
        allowEdit: true,
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        cameraDirection: this.camera.Direction.BACK
      }

      this.camera.getPicture(options).then((imageData) => {
        this.navCtrl.push(Post, {
          'image': imageData
        });
      }, (err) => {
        // Handle error
      });
   }

   openGalery(){
      const options: CameraOptions = {
        quality: 100,
       targetWidth: 300,
        targetHeight: 200,
        allowEdit: true,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
        this.navCtrl.push(Post, {
          'image': imageData
        });
      }, (err) => {
        // Handle error
      });
   }
}
