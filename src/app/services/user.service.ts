import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private isLoggedIn = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.isLoggedIn.asObservable();

    constructor() {
        this.isLoggedIn.next(this.getLogin() ? true : false);
    }

    getLogin(): string | null {
        return sessionStorage.getItem('login');
    }

    login(username: string): void {
        sessionStorage.setItem('login',username);
        this.isLoggedIn.next(true);
    }

    logout(): void{
        sessionStorage.removeItem('login');
        this.isLoggedIn.next(false);
    }

}