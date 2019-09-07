import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { PostProvider } from '../../providers/post-provider';
import { NavController } from 'ionic-angular';

import { Tampil } from '../tampil/tampil';
import { Profil } from '../profil/profil';

@Component({
   templateUrl: 'notifikasi.html'
})
export class Notifikasi { 
  anggota: any;
  notifications: any;

  constructor(
    private storage: Storage,
    private postPvdr: PostProvider,
    private navCtrl: NavController,
  ) { }

  ionViewWillEnter(){
    this.notifications = [];
    this.storage.get('member').then((res)=>{
      this.anggota = res;
      this.load();
    });
  }

  load(){    
    let body = {
      username : this.anggota.username,
      password : this.anggota.password,
      member : this.anggota.id_member,
      aksi : 'tampil'
    };

      this.postPvdr.postData(body, 'notification.php').subscribe(data => {
        for(let notification of data.result){
          this.notifications.push(notification);
        }

        console.log(data.result);
      });
  }

  openPost(id){
    this.navCtrl.push(Tampil, {
      idpost: id
    });
  }

  openProfil(id){
    this.navCtrl.push(Profil, {
      'idmember': id
    })
  }
}