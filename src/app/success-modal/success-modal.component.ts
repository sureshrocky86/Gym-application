import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent implements OnInit {
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>(); // Emit an event when closing
  @Input() type: 'success' | 'error' = 'error'; 

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit();
    this.message = ''; // Reset the message when closing
  }

}
