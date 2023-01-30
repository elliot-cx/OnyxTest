import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged!: boolean;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLogged = isLoggedIn;
    });
  }

  ngOnDestroy(): void {

  }

  handleConnection(){
    if (this.isLogged) {
      this.userService.logout();
    }else{
      this.router.navigateByUrl('/login');
    }
  }

}
