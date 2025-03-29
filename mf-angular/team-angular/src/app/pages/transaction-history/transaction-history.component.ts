import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { mountRootParcel } from 'single-spa';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit, OnDestroy {

  @ViewChild('mfReactContainer', { static: true }) containerRef!: ElementRef;
  public reactParcel: any;

  async ngOnInit() {
    await this.setMfeComponent();
  }

  private async setMfeComponent(): Promise<void> {
    const reactApp = await (window as any).System.import('@financialapp/mf-react');

    if (this.containerRef?.nativeElement) {
      this.reactParcel = mountRootParcel(reactApp, {
        domElement: this.containerRef.nativeElement,
      });
    }
  }

  ngOnDestroy() {
    if (this.reactParcel) {
      this.reactParcel.unmount();
    }
  }
}
