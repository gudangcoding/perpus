import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { PostProvider } from '../../providers/post-provider';
import { NavParams, App } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
   templateUrl: 'post.html'
})
export class Post { 
  anggota: any;
  image: string;
  imagebase64: string;
  keterangan: string;

  constructor(
    private storage: Storage,
    private postPvdr: PostProvider,
    private navParams: NavParams,
    public appCtrl: App
  ) { 
    this.imagebase64 = this.navParams.get('image');
    this.image = 'data:image/jpeg;base64,' + this.imagebase64;
  }

  ionViewDidLoad(){
    this.storage.get('member').then((res)=>{
      this.anggota = res;
    });
  }

  sendPost(){    
    return new Promise(resolve => {  
      let body = {
        username : this.anggota.username,
        password : this.anggota.password,
        member : this.anggota.id_member,
        aksi : 'tambah',
        keterangan : this.keterangan,
        gambar : this.imagebase64
      };

      this.postPvdr.postData(body, 'post.php').subscribe(data => {
        this.appCtrl.getRootNav().setRoot(HomePage);
      });
    });
  }
}