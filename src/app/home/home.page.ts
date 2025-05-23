import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonList,
  IonListHeader
} from '@ionic/angular/standalone';
import { TestObjectService } from '../services/test-object.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonListHeader, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton,
    CommonModule, FormsModule,
    IonList
  ],
})
export class HomePage implements OnInit {

  contentList: { id: string, content: string | null }[] = []

  content: string = ''

  email: string = 'Guest'

  constructor(
    private testObjectSrv: TestObjectService,
    private usrSrv: UsuarioService
  ) {

  }

  ngOnInit(): void {
    this.updateList()
    this.email = this.usrSrv.email
  }

  updateList() {
    this.testObjectSrv.listTestObjects().then((res) => {
      this.contentList = res
    }).catch((err) => {
      console.log('HomePage::constructor::err: ', err);
    })
  }

  async addDataObject() {
    console.log('HomePage::addDataObject::this.content: ', this.content);
    this.testObjectSrv.createTestObject({ content: this.content }).then((res) => {
      console.log('HomePage::addDataObject::res: ', res);
      this.updateList()

    }).catch((err) => {
      console.log('HomePage::addDataObject::err: ', err);
    })
  }

  deleteContent(id: string) {
    this.testObjectSrv.deleteTestObject(id).then((res) => {
      console.log('HomePage::deleteContent::res: ', res);
      this.updateList()
    }).catch((err) => {
      console.log('HomePage::deleteContent::err: ', err);
    })

  }

}
