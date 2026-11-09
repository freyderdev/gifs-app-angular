import { Component } from '@angular/core';
import { SideMenuHeader } from "./side-menu-header/side-menu-header";
import { SideMenuOptionsComponent } from "./side-menu-options/side-menu-options.component";

@Component({
  selector: 'gifs-side-menu',
  imports: [SideMenuHeader, SideMenuOptionsComponent],
  templateUrl: './side-menu.component.html',
})
export class SideMenu {}
