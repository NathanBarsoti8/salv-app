import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'salv-residente-acomp',
  templateUrl: './residente-acomp.component.html',
  animations: [
    trigger('residente-acompAppeared', [
        state('ready', style({ opacity: 1 })),
        transition('void => ready', [
            style({ opacity: 0, transform: 'translate(-30px, -10px)' }),
            animate('500ms 0s ease-in-out')
        ])
    ])
  ]
})

export class ResidenteAcompComponent implements OnInit {

  residenteacompState = 'ready'

  constructor() { }

  ngOnInit() {
  }

}
