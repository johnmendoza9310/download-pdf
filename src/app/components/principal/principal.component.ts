import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { PdfService } from 'src/app/services/pdf-service/pdf.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  private _loadingSubs: Subscription = new Subscription();

  constructor(private pdfService: PdfService, private vcr: ViewContainerRef) {}

  ngOnInit(): void {
    this._loadingSubs = this.pdfService._downloaded$.subscribe((val) => {
      val === true && (this.loading = false);
    });
  }

  ngOnDestroy(): void {
    this._loadingSubs.unsubscribe();
  }

  downloadPdf() {
    this.loading = true;
    this.pdfService.setVcr(this.vcr);
    this.pdfService.createCont();
  }
}
