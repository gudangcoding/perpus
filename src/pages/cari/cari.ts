import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { PostProvider } from '../../providers/post-provider';
import { NavController } from 'ionic-angular';

import { Profil } from '../profil/profil';

@Component({
   templateUrl: 'cari.html'
})
export class Cari { 
  server: string;
  anggota: any;
  members: any = [];
  start: number = 0;
  perpage: number = 10;
  loading: any;
  sch: string = "";

  constructor(
    private storage: Storage,
    private postPvdr: PostProvider,
    private navCtrl: NavController
  ) { 
    this.server = postPvdr.server;
  }

  ionViewDidLoad(){
    this.members = [];
    this.start = 0;
    this.storage.get('member').then((res)=>{
      this.anggota = res;
      this.load();
    });
  }

  load(){    
    return new Promise(resolve => {  
      let body = {
        start: this.start,
        limit: this.perpage,
        kata: this.sch
      };

      this.members = [];
      this.postPvdr.postData(body, 'cari.php').subscribe(data => {
        for(let member of data.result){
          this.members.push(member); 
        }

        resolve(true);
      });
    });
  }

  doInfinite(event:any) {
     this.start += this.perpage;   
     this.load().then(()=>{
      event.complete();
     });
  }

  getItems(ev) {
    var val = ev.target.value;
    if(val!="") this.loading = true;
    if (val) {
      this.sch = val;
      this.start = 0;
      this.load();
    }
  }

  openProfil(id){
    this.navCtrl.push(Profil, {
      'idmember': id
    })
  }
}