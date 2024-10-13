import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { LayoutPreviewerComponent } from '../../layout-previewer/layout-previewer.component';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-builder.page',
  standalone: true,
  imports: [FormsModule, TabMenuModule, SidebarComponent, LayoutPreviewerComponent, ButtonModule],
  templateUrl: './builder.page.component.html',
  styleUrl: './builder.page.component.scss'
})
export class BuilderPageComponent {
  items: MenuItem[] = [];

  activeItem: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Basic Info', icon: 'pi pi-home' },
      { label: 'Work Experience', icon: 'pi pi-chart-line' },
      { label: 'Education', icon: 'pi pi-list' },
      { label: 'Misc', icon: 'pi pi-list' },
    ];

    this.activeItem = this.items[0];
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
}
