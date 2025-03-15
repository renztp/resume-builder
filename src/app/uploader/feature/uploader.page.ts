import { Component } from '@angular/core';

@Component({
  selector: 'uploader-page',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPageComponent {
  constructor() {}

  parseInputFile(event: any) {
    console.log('event', event);
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const jsonObject = JSON.parse(fileReader.result as string);
      console.log('jsonObject', jsonObject);
    };

    fileReader.readAsText(file);
  }
}
