import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {MyCvComponent} from "./pages/my-cv/my-cv.component";
import {AboutComponent} from "./pages/about/about.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'my-cv', component: MyCvComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' } // fallback
];
