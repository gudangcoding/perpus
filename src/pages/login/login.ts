import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { PostProvider } from '../../providers/post-provider';

import { Daftar } from '../daftar/daftar';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
  member_id: string;
  mpasswd: string;

  constructor(
    public navCtrl: NavController, 
    private storage: Storage,
    private alertCtrl: AlertController,
    private postPvdr: PostProvider) {

  }
  
  cekLogin(){
    if(/^[a-zA-Z0-9]+$/.test(this.member_id)){
      if(this.member_id != "" && this.mpasswd != ""){
        let body = {
          member_id: this.member_id,
          mpasswd: this.mpasswd
        };

        this.postPvdr.postData(body, 'login.php').subscribe((data) => {
          if(data.success){
             this.storage.set('member', data.result);
             this.navCtrl.setRoot(HomePage);
          }
          else this.alert('Error', data.msg);
          console.log(data);
        });
      }else{
        this.alert('Error', 'member_id atau mpasswd kosong!');
      }
    }else{
      this.alert('Error', 'member_id tidak valid!');
    }
  }

  daftarMember(){
    this.navCtrl.push(Daftar);
  }

  alert(title: string, message: string){
    let alertBox = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['OK']
    });
    alertBox.present();    
  }

}