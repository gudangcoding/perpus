import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';

@Component({
  selector: 'page-daftar',
  templateUrl: 'daftar.html'
})
export class Daftar {
  nama: string = "";
  email: string = "";
  username: string = "";
  password: string = "";
  ulangpassword: string = "";

  constructor(
    public navCtrl: NavController, 
    private alertCtrl: AlertController,
    private postPvdr: PostProvider) {

  }
  
  daftar(){
    if(this.nama==""){
      this.alert('Error', 'Nama tidak boleh kosong!');
    }else if(this.email==""){
      this.alert('Error', 'Nama tidak boleh kosong!');
    }else if(this.username==""){
      this.alert('Error', 'Username tidak boleh kosong!');
    }else if(this.password==""){
      this.alert('Error', 'Password tidak boleh kosong!');
    }else if(this.ulangpassword==""){
      this.alert('Error', 'Ulang Password tidak boleh kosong!');
    }else if(this.password!=this.ulangpassword){
      this.alert('Error', 'Password dan Ulang Password harus sama!');
    }else{
      let body = {
        nama: this.nama,
        email: this.email,
        username: this.username,
        password: this.password,
        aksi: 'daftar'
      };

      this.postPvdr.postData(body, 'member.php').subscribe((data) => {
        if(data.success) this.navCtrl.pop();
        else this.alert('Error', data.msg);
        console.log(data);
      });
    }
  }

  login(){
    this.navCtrl.pop();
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