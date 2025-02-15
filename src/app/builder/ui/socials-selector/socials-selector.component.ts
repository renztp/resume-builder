import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import socials from "@assets/socials.json"
import { StepWizardService } from "@shared/data-access/step-wizard.service";
import { Socials } from "@shared/models/socials";
import { TreeNode } from "primeng/api";
import { ButtonModule } from "primeng/button";
import {TreeModule} from 'primeng/tree'

@Component({
  selector: 'app-socials-selector',
  standalone: true,
  imports: [TreeModule, CommonModule, ButtonModule],
  templateUrl: './socials-selector.component.html',
  styleUrl: './socials-selector.component.scss'
})
export class SocialsSelectorComponent implements OnInit {
  availSocials = socials;
  treeData: TreeNode[] = [];
  @Input() existingSelectedSocials: Socials[] = [];
  selectedSocials: TreeNode[] = [];
  @Output() onNodeSelected = new EventEmitter<Socials>();
  @Output() onNodeUnselected = new EventEmitter<string>();

  constructor(private stepWizardService: StepWizardService) {
  }

  ngOnInit() {
    this.buildSocialsTree();
  }

  onNodeSelect(event: any) {
    // const selectedSocialsLabels = this.selectedSocials.map((node) => {
    //   return {
    //     name: node.label != undefined ? node.label : '',
    //     value: '',
    //     disabled: false
    //   }
    // });
    this.onNodeSelected.emit({
      name: event.node.label,
      value: '',
      disabled: false
    });
    this.stepWizardService.updateContactInfoForm(this.selectedSocials);
  }

  onNodeUnselect(event: any) {
    this.onNodeUnselected.emit(event.node.label)

    this.stepWizardService.updateContactInfoForm(this.selectedSocials)
  }

  buildSocialsTree(existingSelectedSocials?: string[]) {
    this.treeData = this.availSocials.socials.map((social, indx) => {
      return {
        key: social.toLowerCase(),
        selectable: true,
        label: social,
        data: social.toLowerCase()
      }
    })

    if(existingSelectedSocials) {
      this.selectedSocials = this.existingSelectedSocials.map((social) => {
        return {
          key: social.name.toLowerCase(),
          selectable: true,
          label: social.name,
          data: social.name.toLowerCase()
        }
      });
    }
  }
}
