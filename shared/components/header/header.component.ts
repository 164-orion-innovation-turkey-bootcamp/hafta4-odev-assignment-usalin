import { Component, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  searchBy = new FormControl();
  scrWidth: any;

  constructor(private router: Router, private toastr: ToastrService) {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.scrWidth = window.innerWidth;

    const x = document.getElementById("main-nav");
    if (x) {
      if (this.scrWidth > 800) {
        x.style.display = "grid";
      }
      else if (this.scrWidth <= 800) {
        x.style.display = "none";
      }
    }
  }

  toggleNavbar() {
    const x = document.getElementById("main-nav")
    if (x?.style.display === "grid") {
      x.style.display = "none";
    } else {
      x!.style.display = "grid";
    }
  }

  search() {
    if (this.searchBy.value.length < 3)  { 
      this.toastr.error('Search term should be at least 3 characters long');
      return;
     }
    console.log('logging from search', this.searchBy.value);
    this.router.navigate(['/shop/products/search', { search: this.searchBy.value }]);
  }

  cart() {
    console.log('logging from cart');
  }
}
