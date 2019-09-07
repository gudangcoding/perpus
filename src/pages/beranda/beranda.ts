import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { PostProvider } from '../../providers/post-provider';
import { NavController } from 'ionic-angular';

import { Komentar } from '../komentar/komentar';
import { Profil } from '../profil/profil';

@Component({
   selector: 'page-beranda',
   templateUrl: 'beranda.html'
})
export class Beranda { 
  anggota: any;
  server: string;

  posts: any = [];
  start: number = 0;
  perpage: number = 5;
  newpost: any;

  constructor(
    private storage: Storage,
    private postPvdr: PostProvider,
    private navCtrl: NavController
  ) { 
    this.server = postPvdr.server;
  }

  ionViewDidLoad(){
    this.posts = [];
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
        limit: this.perpage
      };

      this.postPvdr.postData(body, 'bukuterbaru.php').subscribe(data => {

        for(let post of data.result){
          this.posts.push(post);
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

  openProfil(id){
    this.navCtrl.push(Profil, {
      'idmember': id
    })
  }

  openComment(index){
    this.navCtrl.push(Komentar, {
      'idpost': this.posts[index].id,
      'target': this.posts[index].id_member
    })
  }

  changeLike(index){
    let body = {
        username : this.anggota.username,
        password : this.anggota.password,
        member : this.anggota.id_member,
        target : this.posts[index].id_member,
        aksi : 'suka',
        idpost : this.posts[index].id
      };

      this.postPvdr.postData(body, 'post_like.php').subscribe(data => {
        this.posts[index].suka = data.result;
      });
  }
}