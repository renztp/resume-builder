import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
  selector: 'app-setup.page',
  standalone: true,
  imports: [CardModule, ButtonModule, DialogModule, RouterLink, FileUploadModule],
  templateUrl: './setup.page.component.html',
  styleUrl: './setup.page.component.scss'
})
export class SetupPageComponent {
  jsonModalVisibility: boolean = false;

  showDialog() {
    this.jsonModalVisibility = true;
  }

  onUpload(event: any) {
    console.log('event', event);
    const file = event.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const jsonObject = JSON.parse(fileReader.result as string);
      console.log('jsonObject', jsonObject);
    }

    fileReader.readAsText(file);
  }
}
