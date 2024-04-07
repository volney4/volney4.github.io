import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isHomeRoute = false;
  isMenuToggled=false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Subscribe to router events to check for navigation to home route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Check if the current route is the home route
      console.log(event.url)
      this.isHomeRoute = (event.url === '/home' || event.url === '/');
    });
  }
  toggleMenu(){
    this.isMenuToggled = !this.isMenuToggled;
  }
}
