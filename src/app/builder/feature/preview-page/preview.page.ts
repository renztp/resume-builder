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
    pdfMake.createPdf({
      content: [
        {text: 'John Doe', style: 'name'},
        {text: 'Software Developer\n', style: 'profession', margin: [0, 0, 0, 18]},
        {
          columns: [
            {
              text: [
                {text: 'Phone\t', bold: true },
                '+639514464329',
              ],
              margin: [0, 0, 0, 3]
            },
            {
              text: [
                {text: 'LinkedIn\t', bold: true },
                'linkedin.com/renz-pulvira'
              ]
            },
          ],
        },
        {
          columns: [
            {
              text: [
                {text: 'Email\t', bold: true },
                'tullaorenz@gmail.com',
              ]
            },
            {
              text: [
                {text: 'Github\t', bold: true },
                {text: 'github.com/renztp', link: 'https://www.github.com/renztp'}
              ]
            },
          ]
        },
        {
          text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
          margin: [0, 10, 0, 25]
        },
        {
          text: 'Work Experience',
          fontSize: 18,
          bold: true
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0, // Start position (x-axis)
              y1: 0, // Start position (y-axis)
              x2: 515, // End position (x-axis, full width for A4 page)
              y2: 0, // End position (y-axis)
              lineWidth: 1, // Thickness of the line
            },
          ],
          margin: [0, 8, 0, 8], // Spacing around the line
        },
        {
          columns: [
            {
              text: '2020 - 2024',
              bold: true,
              width: 130
            },
            {
              text: [
                {text: 'Suitespot Technology\n', bold: true, fontSize: 16},
                {text: 'Software Developer', italics: true}
              ],
            },
          ]
        }
      ],
      styles: {
        name: { fontSize: 24, bold: true },
        profession: { fontSize: 16, italics: true }
      }
    }).download();
  }

  // openPdf() {
  //   pdfMake.createPdf(docDefinition).open();
  // }
}
