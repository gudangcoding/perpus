import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { PostProvider } from '../../providers/post-provider';
import { NavParams } from 'ionic-angular';

@Component({
   selector: 'page-komentar',
   templateUrl: 'komentar.html'
})
export class Komentar { 
  server: string;
  anggota: any;
  comments: any = [];
  idpost: number;
  target: number;
  komentar: string = "";

  constructor(
    private storage: Storage,
    private postPvdr: PostProvider,
    private navParams: NavParams
  ) { 
    this.server = this.postPvdr.server;
    this.idpost = this.navParams.get('idpost');
    this.target = this.navParams.get('target');
  }

  ionViewDidLoad(){
    this.comments = [];
    this.storage.get('member').then((res)=>{
      this.anggota = res;
      this.load();
    });
  }

  load(){    
    let body = {
      username : this.anggota.username,
      password : this.anggota.password,
      aksi : 'tampil',
      idpost: this.idpost
    };

      this.postPvdr.postData(body, 'comment.php').subscribe(data => {
        for(let comment of data.result){
          this.comments.push(comment);
        }
      });
  }

  sendComment(){
    let body = {
      username : this.anggota.username,
      password : this.anggota.password,
      aksi : 'tambah',
      idpost: this.idpost,
      target : this.target,
      komentar: this.komentar
    };

      this.postPvdr.postData(body, 'comment.php').subscribe(data => {
        this.comments.push(data.result);
        this.komentar = "";
      });
  }
}