import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'jw-modal',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
      // console.log("In constructor=");
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
      const modal = this;

      // ensure id attribute exists
      if (!this.id) {
          console.error('modal must have an id');
          return;
      }

      // move element to bottom of page (just before </body>) so it can be displayed above everything else
      document.body.appendChild(this.element);

      // add self (this modal instance) to the modal service so it's accessible from controllers
      this.modalService.add(this);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.modalService.remove(this.id);
      this.element.remove();
  }

  // open modal
  open(): void {
      this.element.style.display = 'block';
      document.body.classList.add('jw-modal-open');
  }

  // close modal
  close(): void {
      this.element.style.display = 'none';
      document.body.classList.remove('jw-modal-open');
  }

}
