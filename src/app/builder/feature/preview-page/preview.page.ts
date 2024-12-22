import { Component } from "@angular/core";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  standalone: true,
  selector: "app-preview-page",
  templateUrl: "./preview.page.html",
})
export class PreviewPageComponent {
  constructor() {
    pdfMake.vfs = pdfFonts.vfs;
  }

  generatePdf() {
    const data = [    ['Name', 'Email', 'Country'],
      ['John Doe', 'johndoe@example.com', 'USA'],
      ['Jane Smith', 'janesmith@example.com', 'Canada'],
      ['Bob Johnson', 'bobjohnson@example.com', 'UK']
    ];

    pdfMake.createPdf({
      content: [
        { text: 'User Data', style: 'header' },
        { table: { body: data } }
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] }
      }
    }).download();
  }
}
