import { Component } from '@angular/core';
import {Alert, AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Song} from "../../models/song.interface";
import {FirestoreProvider} from "../../providers/firestore/firestore";

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

    public song: Song;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public firestoreProvider: FirestoreProvider) {
      this.song = this.navParams.get('song');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

    deleteSong(songId: string, songName: string): void {
        const alert: Alert = this.alertCtrl.create({
            message: `Are you sure you want to delete ${songName} from your list?`,
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Clicked Cancel');
                    },
                },
                {
                    text: 'OK',
                    handler: () => {
                        this.firestoreProvider.deleteSong(songId).then(() => {
                            this.navCtrl.pop();
                        });
                    },
                },
            ],
        });
        alert.present();
    }

}
