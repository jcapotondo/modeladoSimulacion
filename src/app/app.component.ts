import { Component, OnInit } from '@angular/core';
import { UIContext } from './ui.context';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public uiContext: UIContext,
              router:Router) {
    router.navigate(['/euler']);
  }

  ngOnInit() {
  }
}
