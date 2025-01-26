import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnChanges, OnInit, Output } from "@angular/core";
import socials from "@assets/socials.json"
import { TreeNode } from "primeng/api";
import {TreeModule} from 'primeng/tree'

@Component({
  selector: 'app-socials-selector',
  standalone: true,
  imports: [TreeModule, CommonModule],
  templateUrl: './socials-selector.component.html',
  styleUrl: './socials-selector.component.scss'
})
export class SocialsSelectorComponent implements OnInit, OnChanges {
  availSocials = socials;
  treeData: TreeNode[] = [];
  selectedSocials: TreeNode[] = [];
  @Output() toggled = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    console.log(this.availSocials.socials);
    this.buildSocialsTree();
  }

  ngOnChanges() {
    console.log('changed');
  }

  onNodeSelect(event: any) {
      const selectedSocialsLabels = this.selectedSocials.map((node) => node.label);
      this.toggled.emit(selectedSocialsLabels || []);
  }

  onNodeUnselect(event: any) {
      const selectedSocialsLabels = this.selectedSocials.map((node) => node.label);
      this.toggled.emit(selectedSocialsLabels || []);
  }

  buildSocialsTree() {
    this.treeData = this.availSocials.socials.map((social, indx) => {
      return {
        key: social.toLowerCase(),
        selectable: true,
        label: social,
        data: social.toLowerCase()
      }
    })
  }
}
