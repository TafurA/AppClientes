import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ToastController, AlertController, NavController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
// Custom imports
import { PollService } from '../services/poll.service';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-poll',
  templateUrl: './poll.page.html',
  styleUrls: ['./poll.page.scss'],
  providers: [HTTP, LoginService, PollService,]
})
export class PollPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  public listQuestion: any;
  public message = '¡Gracias por su opinión!';
  public question1: string;
  public question3: string;
  public question2: string;
  public nitCliente: string;
  public ResponseQuestion = [];

  constructor(private PollService: PollService, public loginService: LoginService, private toastController: ToastController, private alertController: AlertController, private nvCtrl: NavController) { }
  ngOnInit() {

    this.Questions();
    this.setUserData();
  }

  setUserData() {
    this.nitCliente = `${this.loginService.validateSession()['nitcli_b']}`
  }

  logOut() {
    this.loginService.logOutIntoSystem();
  }

  public async Questions() {
    await this.PollService.Questions().then(() => {
      if (this.PollService.dataQuestions()[0]) {
        this.listQuestion = this.PollService.dataQuestions();
        // console.log(this.listQuestion[0].idencuesta);
      } else {
        console.log("error");
      }
    });
  }

  confirm() {
    this.modal.dismiss(this.question1 + this.question2 + this.question3, 'confirm');

    this.PollService.ResponseQuestions(
      this.nitCliente,
      this.question1,
      this.question2,
      this.question3,
      this.listQuestion[0].idencuesta,
      this.listQuestion[1].idencuesta,
      this.listQuestion[2].idencuesta
    ).finally(() => {
      this.presentAlert("Excelente, se ha envíado la encuesta").then(() => {
        this.nvCtrl.navigateForward("/tabs/car-detail");
      });
    })

  }


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `${ev.detail.data}`;
      // console.log(this.message);
      // this.nvCtrl.navigateForward("/home");
    }
  }


  async presentAlert(description: string,) {
    const alert = await this.alertController.create({
      header: "Encuesta satisfacción",
      subHeader: description,
      cssClass: `c-alert is-success`
      // buttons: ['OK'],
    });

    await alert.present();

    setTimeout(() => {
      alert.dismiss()
    }, 2000)
  }

}
