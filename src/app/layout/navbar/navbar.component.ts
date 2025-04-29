import {Component, effect, inject} from '@angular/core';
import {Oauth2AuthService} from "../../auth/oauth2-auth.service";
import {ConnectedUser} from "../../shared/model/user.model";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  oauth2Service = inject(Oauth2AuthService);
  connectedUser: ConnectedUser | undefined;
  currentTheme: 'light' | 'dim' = 'light';

  constructor() {
    this.listenToFetchUser();
  }

  private listenToFetchUser() {
    effect(() => {
      const userState = this.oauth2Service.fetchUser();
      if (userState.status === "OK"
        && userState.value?.email
        && userState.value.email !== this.oauth2Service.notConnected) {
        this.connectedUser = userState.value;
      }
    });
  }

  login(): void {
    this.closeDropDownMenu();
    this.oauth2Service.login();
  }

  logout(): void {
    this.closeDropDownMenu();
    this.oauth2Service.logout();
  }

  editProfile(): void {
    this.closeDropDownMenu();
    this.oauth2Service.goToProfilePage();
  }

  closeDropDownMenu() {
    const bodyElement = document.activeElement as HTMLBodyElement;
    if (bodyElement) {
      bodyElement.blur();
    }
  }
  toggleTheme(event: any) {
    this.currentTheme = event.target.checked ? 'dim' : 'light';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

}
