import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secret-key',
  templateUrl: './secret-key.component.html',
  styleUrls: ['./secret-key.component.scss']
})
export class SecretKeyComponent implements OnInit {
  key: string;
  errorMessage: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onNext() {
    if (this.key) {
      sessionStorage.setItem('openaisecretkey', this.key);
      this.router.navigateByUrl('/uploadimage')
    } else {
      this.errorMessage = 'Please enter valid key.'
    }
  }
}
