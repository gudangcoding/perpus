import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { PostProvider } from '../../providers/post-provider';
import { NavController, ActionSheetController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-setelan',
  templateUrl: 'setelan.html',
})
export class Setelan {
  anggota: any;
  name: string;
  cameraData: string;
  image: string;

  constructor(
    private camera: Camera, 
    private postPvdr: PostProvider,
    private navCtrl: NavController,
    private asCtrl: ActionSheetController, 
    private storage: Storage) {
  	
  }

  ionViewDidLoad(){
    this.storage.get('member').then((res)=>{
      this.anggota = res;
      this.name = this.anggota.nama;
      this.image = 'data:image/jpeg;base64,' + this.anggota.foto;
    });
  }

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

  openGalery(){
  	var options: CameraOptions = {
      quality: 100,
      targetWidth: 150,
      targetHeight: 150,
      allowEdit: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      this.cameraData = imageData;
      this.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  openCamera(){
     var options: CameraOptions = {
      quality: 100,
      targetWidth: 150,
      targetHeight: 150,
      allowEdit: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {      
      this.cameraData = imageData;
      this.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  selectText(event): void{
    event.target.select();
  }

  saveChange(){    
    return new Promise(resolve => {  
      let body = {
        username : this.anggota.username,
        password : this.anggota.password,
        member : this.anggota.id_member,
        aksi : 'edit',
        foto : this.cameraData,
        nama : this.name
      };

      this.postPvdr.postData(body, 'member.php').subscribe(data => {
        console.log(data);
        this.anggota.nama = this.name;
        this.anggota.foto = this.cameraData;
        this.storage.set('member', this.anggota);
        this.navCtrl.pop();
      });
    });
  }
}
