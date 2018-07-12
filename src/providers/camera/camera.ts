import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, IWriteOptions  } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform, normalizeURL } from 'ionic-angular';
/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {
  private db: any = null;
  private pictureSource: any;    // Picture source
  private destinationType: any;  // Sets the format of returned value 
  private images: Array<{ src: String }> = [];
  private storedImages = new Array();
  private fileTransfer: FileTransferObject = this.transfer.create();
  constructor(private transfer: FileTransfer, private file: File, 
  private camera: Camera,  private sqlite: SQLite, private plt: Platform) {
    console.log('Hello CameraProvider Provider');
    this.images = [];
    localStorage.setItem('storageTest', 'I am stored in local storage :)');
    this.plt.ready()
    .then(() => { 
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default',
      }).then((res: SQLiteObject) => { 
        this.db = res;
        this.db.executeSql('CREATE TABLE IF NOT EXISTS storedImages (path TEXT)', {}).then(() => { 
          console.log('table created'); 
          this.createSqlite();
        }).catch((e) => { console.log('error on table creation: ' + e); });
      })
      .catch(e => console.log('error on db creation: ' + e));   
    });
  }
  /*
    TAKING PHOTO FROM NATIVE CAMERA
    -------------------------------
    Allows users to use the camera in order to take pictures
    
    Imports: import { Camera, CameraOptions } from '@ionic-native/camera';
  */
  takePhoto() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.images[0] = { src: base64Image };
    }, (err) => { });
  }
  /* 
    SAVING PHOTO TO SQLite
    ----------------------
    SaveImage() the functionality to save photos taken 
    and store them in a SQLite DB. The DB is persistent for as long as the
    app remains installed on the phone and so long as it isn't manually flushed
    The rest of the functions provide support for that saveImage() function and 
    also provide more CRUD functions for the DB and files

    Imports: 
      import { File, IWriteOptions  } from '@ionic-native/file', 
      import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer',
      import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
  */
  private createSqlite() { 
    this.db.executeSql('SELECT * FROM storedImages', [])
    .then((data) => {
      if (data.rows.length > 0) { 
        for (let i = 0; i < data.rows.length; i++) { 
          if (data.rows.item(i) && this.storedImages !== null) 
          this.storedImages.push(data.rows.item(i));
        }
      } else { console.log('no data'); }
    })
    .catch((e) => { console.log('error on data selection: ' + JSON.stringify(e)); })
  }
  private saveImage(image) { 
    let name = new Date().getTime() + '.jpeg';
    let path = this.file.dataDirectory;
    let options: IWriteOptions = { replace: true };
    var data = image.split(',')[1];
    let blob = this.b64toBlob(data, 'image/jpeg');
    this.file.writeFile(path, name, blob, options).then(res => {
      let saveObj = { path: name };
      this.db.executeSql('INSERT into storedImages (path) values (?)', [name])
      .then((d) => {
        this.storedImages.unshift(saveObj);
      })
      .catch((e) => { console.log('error inserting images: ' + JSON.stringify(e)); });
    }, err => { console.log('erroron file writing: ' + err); });
  }
  private removeImageAtIndex(index, name) {
    let removed = this.storedImages.splice(index, 1);
    this.file.removeFile(this.file.dataDirectory, removed[0].path).then(res => {
      console.log('inside removal2');
      console.log("DELETE FROM storedImages WHERE path='"+name+"'");
      this.db.executeSql("DELETE FROM storedImages WHERE path=?", [name])
      .then((d) => {
        console.log('removed from sqlite!');
      })
      .catch((e) => { console.log('deer: ' + JSON.stringify(e)); });
    }, err => {
      console.log('remove err; ' ,err);
    });
  }
  private getImagePath(imageName) {
    let path = this.file.dataDirectory + imageName;
    path = normalizeURL(path);
    return path;
  }
  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) 
        byteNumbers[i] = slice.charCodeAt(i);
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
