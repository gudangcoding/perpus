import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { PostProvider } from '../../providers/post-provider';
import { NavController, NavParams } from 'ionic-angular';
import { Komentar } from '../komentar/komentar';


@Component({
   selector: 'page-beranda',
   templateUrl: 'tampil.html'
})
export class Tampil { 
  anggota: any;
  server: string;

  idpost: number;
  posts: any = [];

  constructor(
    private storage: Storage,
    private postPvdr: PostProvider,
    private navCtrl: NavController,
    private navParams: NavParams
  ) { 
    this.server = this.postPvdr.server;
    this.idpost = this.navParams.get('idpost');
  }

  ionViewDidLoad(){
    this.posts = [];
    this.storage.get('member').then((res)=>{
      this.anggota = res;
      this.load();
    });
  }

  load(){    
    let body = {
      username : this.anggota.username,
      password : this.anggota.password,
      member: this.anggota.id_member,
      aksi : 'single',
      idpost: this.idpost
    };

    this.postPvdr.postData(body, 'post.php').subscribe(data => {
      for(let post of data.result){
        this.posts.push(post);
      }
      console.log(data);
    });
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