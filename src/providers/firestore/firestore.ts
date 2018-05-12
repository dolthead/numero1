import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Song} from "../../models/song.interface";
import * as firebase from "firebase";

@Injectable()
export class FirestoreProvider {

    constructor(public firestore: AngularFirestore) {
        const firestoreObj = firebase.firestore();
        const settings = {/* your settings... */ timestampsInSnapshots: true};
        firestoreObj.settings(settings);
    }

    createSong(
        albumName: string,
        artistName: string,
        songDescription: string,
        songName: string
    ): Promise<void> {
        const id = this.firestore.createId();
        return this.firestore.doc(`songList/${id}`).set({
            id,
            albumName,
            artistName,
            songDescription,
            songName,
        });
    }

    getSongList(): AngularFirestoreCollection<Song> {
        return this.firestore.collection(`songList`);
    }

    deleteSong(songId: string): Promise<void> {
        return this.firestore.doc(`songList/${songId}`).delete();
    }
}