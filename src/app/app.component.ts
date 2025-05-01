import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {fontAwesomeIcons} from "./shared/font-awesome-icons";
import {Oauth2AuthService} from "./auth/oauth2-auth.service";
import {NavbarComponent} from "./layout/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  private readonly faIconLibrary = inject(FaIconLibrary);
  private readonly oauth2Service = inject(Oauth2AuthService);

  ngOnInit(): void {
    this.initFontAwesome();
    this.initAuthentication();
  }

  private initAuthentication() {
    this.oauth2Service.initAuthentication();
  }

  private initFontAwesome() {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }

}
