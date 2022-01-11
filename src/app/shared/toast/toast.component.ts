import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  @Output() closeHit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() message: string;
  constructor() { }

  ngOnInit(): void {
  }

}
