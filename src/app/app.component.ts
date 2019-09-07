import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/Storage';

import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Setelan } from '../pages/setelan/setelan';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController;
  rootPage:any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private storage: Storage,
    private appCtrl: App) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.storage.get('member').then((res)=>{
      console.log(res);
      if(res == null){
        this.rootPage = Login;
      }else{
        this.rootPage = HomePage;
      }
    });
  }

  openSetelan(){
    this.nav.push(Setelan);
  }

  logout(){
    this.storage.clear();
    this.appCtrl.getRootNav().setRoot(Login);
  }
}

