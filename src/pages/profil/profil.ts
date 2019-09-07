import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { PostProvider } from '../../providers/post-provider';
import { NavController, NavParams } from 'ionic-angular';

import { Tampil } from '../tampil/tampil';
import { Setelan } from '../setelan/setelan';

@Component({
  selector: 'page-profil',
   templateUrl: 'profil.html'
})
export class Profil { 
  anggota: any;
  server: string;

  posts: any;
  members: any;
  idmember: number;
  isFollow: number;

  constructor(
    private storage: Storage,
    private postPvdr: PostProvider,
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
    this.server = this.postPvdr.server;
    this.idmember = this.navParams.get('idmember');
  }

  ionViewWillEnter(){
    this.posts = [];
    this.storage.get('member').then((res)=>{
      this.anggota = res;
      if(this.idmember==undefined) this.idmember = this.anggota.id_member;

      this.load();
    });
  }

  load(){    
    let body;
    if(this.idmember == this.anggota.id_member){
      body = {
        username : this.anggota.username,
        password : this.anggota.password,
        member : this.anggota.id_member,
        target: this.anggota.id_member,
        aksi : 'profil'
      }
    }else{
      body = {
        username : this.anggota.username,
        password : this.anggota.password,
        member : this.anggota.id_member,
        target: this.idmember,
        aksi : 'profil'
      }
    }

    this.postPvdr.postData(body, 'post.php').subscribe(data => {
      this.posts = data.result;
      this.members = data.profil;
    });

    this.postPvdr.postData(body, 'follow.php').subscribe(data => {
      this.isFollow = data.result;
    });
  }

  follow(){
    let body = {
      username : this.anggota.username,
      password : this.anggota.password,
      member : this.anggota.id_member,
      target: this.idmember,
      aksi : 'edit'
    }

    this.postPvdr.postData(body, 'follow.php').subscribe(data => {
      this.isFollow = data.result;
      this.members[0].jmlfollower = data.follower;
    });
  }

  openPost(id){
    this.navCtrl.push(Tampil, {
      idpost: id
    });
  }

  openSetelan(){
    this.navCtrl.push(Setelan);
  }
}