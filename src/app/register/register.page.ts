import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public userRegister: User = {};
  private loading: any;

  // aqui eu passo os parametros de auth
  // da tela de carregamento
  // e da mensagem de erro
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() 
  { }

// esse methodo faz o registro do usuario  e
//faz um tratamento dos erros
async register()
{

  await this.presentLoading();

  try{
    await this.authService.register(this.userRegister);
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
