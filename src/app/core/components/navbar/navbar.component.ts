import { Component, OnInit, ViewChild } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { BadgeModule } from 'primeng/badge'
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
        MenubarModule,
        BadgeModule,
        AvatarModule,
        CommonModule,
        ButtonModule,
        OverlayPanelModule,
        ImageModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit{

  @ViewChild('userActions') userActions!: OverlayPanel;


  searchTemplate: boolean = false ;

  nameUse: string = "Thiago";
  halfName : string = "";
  profile :string = "Administrador";
  sectorName: string = "P&D";

  overlayVisible = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.halfName = this.nameUse
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  handleLogout(): void {
    console.log('Logout simulado');
    this.router.navigate(['']);
  }

      items: MenuItem[] = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Novo Funcionario',
        icon: 'pi pi-user',
        routerLink: '/novo-funcionario'
      },
      {
        label: 'Status',
        icon: 'pi pi-envelope',
        routerLink: '/contato',
        items: [
        {
          label: 'Ativo',
          icon: 'pi pi-check',
          routerLink: '/funcionarios-ativos'
        },
        {
          label: 'Inativo',
          icon: 'pi pi-times',
          routerLink: '/funcionarios-inativos'
        },
        {
          label: 'Suspenso',
          icon: 'pi pi-ban',
          routerLink: '/funcionarios-suspensos'
        }
      ]
      }
    ];

  
  toggleOverlay(event: Event): void {
    this.userActions.toggle(event);
  }

}
