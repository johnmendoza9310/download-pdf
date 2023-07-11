import { Component, ViewChild } from '@angular/core';
import { PdfGeneratorComponent } from './components/pdf-generator/pdf-generator.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(PdfGeneratorComponent, { static: true })
  pdfGeneratorComponent!: PdfGeneratorComponent;
  title = 'spike-BFDM-2861';
  hide: boolean = true;
}
