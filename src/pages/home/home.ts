import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  imgUrl:any='';
  imageArray:any = [];
  constructor(public navCtrl: NavController,public camera:Camera,public imagePicker: ImagePicker) {

  }

  getImage = () => {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log('data:image/jpeg;base64,' + imageData);
      this.imgUrl = 'data:image/jpeg;base64,' + imageData;
      

     }, (err) => {
        console.log('err==>' + err);
      // Handle error
     });

  }

  multiImageSelect = () => {

    const options = {
                      maximumImagesCount: 10,
                      width: 500,
                      height:500,
                      quality: 50,
		                	outputType: 1
                  }

    this.imagePicker.getPictures(options).then((results) => {
      console.table(results);
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          this.imgUrl = 'data:image/jpeg;base64,' + results[i];
          this.imageArray.push(this.imgUrl);
      }
      console.log(this.imageArray);
    }, (err) => {
         
        console.log(err);

     });
  }

}
