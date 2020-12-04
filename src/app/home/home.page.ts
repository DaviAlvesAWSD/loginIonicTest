import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public userLogin: User = {};
  private loading: any;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ){}

  ngOnInit(){}

  async login() {

    await this.presentLoading();

    
    try{
      await this.authService.login(this.userLogin);
    }catch(error ){
      console.error(error);
      
      this.presentToast(error.message);
      
    }finally{
        this.loading.dismiss();
    }
  

  }


// esse metodo é a caixinha de carregamento
// enquanto o sistema confere os dados
async presentLoading() {
  this.loading = await this.loadingCtrl.create({ message: 'por favor, aguarde...'});
  return this.loading.present();

}

// essa é a memsagem de erro.
async presentToast(message: string) {
  const toast = await this.toastCtrl.create({ message, duration: 2000 });
  toast.present();
}

}
