import { Component, OnInit } from '@angular/core';
import { SupportService } from '../../services/support.service';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
  providers: [SupportService, HTTP]
})
export class QuestionPage implements OnInit {
  public frequentQuestions: any;
  constructor( private supportService:SupportService) { }
  ngOnInit() {
    this.Frequentquestions()
  }
   // data preguntas frecuentes  
   public async Frequentquestions(){
    await this.supportService.Frequentquestions().then(() => {
      if (this.supportService.questions()[0]) {
        this.frequentQuestions =this.supportService.questions();
      }else{
        console.log("error");
      }
    });
  }
  public download(url){
    window.open(url, "_blank");
  }


}
