import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/Storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PostProvider } from '../providers/post-provider';

import { Login } from '../pages/login/login';
import { Daftar } from '../pages/daftar/daftar';

import { Beranda } from '../pages/beranda/beranda';
import { Cari } from '../pages/cari/cari';
import { Post } from '../pages/post/post';
import { Notifikasi } from '../pages/notifikasi/notifikasi';
import { Profil } from '../pages/profil/profil';

import { Komentar } from '../pages/komentar/komentar';
import { Tampil } from '../pages/tampil/tampil';
import { Setelan } from '../pages/setelan/setelan';

@NgModule({
  declarations: [
    MyApp,
    HomePage,

    Login, Daftar,
    Beranda, Cari, Post, Notifikasi, Profil,
    Komentar, Tampil, Setelan
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {tabsPlacement: 'bottom', tabsHideOnSubPages: true}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,

    Login, Daftar,
    Beranda, Cari, Post, Notifikasi, Profil,
    Komentar, Tampil, Setelan
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PostProvider,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
