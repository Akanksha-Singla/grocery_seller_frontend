import { CommonModule } from '@angular/common';
import { Component,HostListener} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule,Router } from '@angular/router';
import { SnackbarService } from '../../../auth/services/sanckbar.service';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule,MatIconModule,RouterModule,MatSidenavModule,CommonModule,MatListModule,MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
userImage: string = '';
image!:string;
collapsed: boolean = false;
isScreenSmall = false;
sidenavOpened = true;

menus :any=[
  {
    label: `Dashboard`,
    redirectURL: '/dashboard',
    icon: 'dashboard',
  },
  {
    label: 'All Products',
    redirectURL: '/all-products',
    icon: 'check_circle',
  },
  {
    label: 'Add Product',
    redirectURL: '/add-product',
    icon: 'add',
  },
  {
    label: 'Logout',
    redirectURL: '/logout',
    icon: 'exit_to_app',
  },
];
constructor(private snackBar:SnackbarService,public router:Router){

}
checkScreenSize() {
  this.isScreenSmall = window.innerWidth < 768;
  if (this.isScreenSmall) {
    this.sidenavOpened = false; // Close sidenav on small screens
  }
}

ngOnInit(): void {
  this.checkScreenSize();
}
@HostListener('window:resize', [])
onResize() {
  this.checkScreenSize();
}
collapsedState() {
  this.collapsed = !this.collapsed;
  console.log(this.collapsed);
}
sidenavWidth() {
  return this.collapsed ? '65px' : '250px';
}

logout() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('role');
  this.snackBar.showError('Logged out successfully...');
  this.router.navigate(['/']);
}


}
