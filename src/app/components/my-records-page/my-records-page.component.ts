import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-records-page',
  templateUrl: './my-records-page.component.html',
  styleUrls: ['./my-records-page.component.css']
})
export class MyRecordsPageComponent implements OnInit {

  player!: string;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    const login = this.userService.getLogin();
    if (login) {
      this.player = login;
    }else {
      this.router.navigateByUrl('/login');
    }
  }

}
