import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  // username!: string;

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    if (this.userService.getLogin()) {
      this.router.navigateByUrl('/');
    }
  }

  onSubmitForm(form: NgForm): void{
    if (form.valid) {
      this.userService.login(form.value.username);
      this.router.navigateByUrl('/');
    }
  }

}
