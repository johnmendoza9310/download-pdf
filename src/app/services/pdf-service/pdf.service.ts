import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2,
  ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { PdfGeneratorComponent } from '../../components/pdf-generator/pdf-generator.component';

export interface IDownloadResponse {
  downloaded?: boolean;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private renderer: Renderer2;
  public vcr!: ViewContainerRef;

  public _downloaded$ = new BehaviorSubject<boolean>(false);
  public divContainer!: HTMLDivElement;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setVcr(vcr: ViewContainerRef) {
    this.vcr = vcr;
  }

  createCont(): void {
    this.divContainer = this.renderer.createElement('div');
    this.vcr.createComponent(PdfGeneratorComponent);

  }

  downloadPDF(element: ElementRef): void {
    const DATA = element.nativeElement;
    const doc = new jsPDF('p', 'mm', 'a4');
    const options = {
      background: 'white',
      scale: 3,
    };

    return html2canvas(DATA, options)
      .then((canvas: any) => {
        console.log('canvas', canvas);

        const img = canvas.toDataURL();

        // Add image Canvas to PDF
        const bufferX = 0;
        const bufferY = 0;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult: any) => {
        docResult.save(`popular.pdf`);
        this._downloaded$.next(true);
      })
      .catch(() => {
        this._downloaded$.error(Error('Error en descarga'));
      });
  }
}
