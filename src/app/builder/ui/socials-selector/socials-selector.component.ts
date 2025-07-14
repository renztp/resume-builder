import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import socials from '@assets/socials.json';
import { StepWizardService } from '@shared/data-access/step-wizard.service';
import { Socials } from '@shared/models/socials';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TreeModule } from 'primeng/tree';

export interface DialogClosePayload {
  dialogVisibility: boolean;
  selectedNodes?: TreeNode[];
}

@Component({
  selector: 'app-socials-selector',
  imports: [TreeModule, CommonModule, ButtonModule, DialogModule],
  templateUrl: './socials-selector.component.html',
  styleUrl: './socials-selector.component.scss',
  standalone: true,
})
export class SocialsSelectorComponent implements OnInit {
  availSocials = socials;
  treeData: TreeNode[] = [];
  @Input() existingSelectedContacts: Socials[] = [];
  @Input() isDialogOpen: boolean = false;
  selectedContacts: TreeNode[] = [];
  @Output() onSelectedSocialsSaved = new EventEmitter<TreeNode[]>();
  @Output() onCloseDialog = new EventEmitter<DialogClosePayload>();

  constructor(private stepWizardService: StepWizardService) {}

  ngOnInit() {
    this.buildSocialsTree();
  }

  saveClicked() {
    this.onCloseDialog.emit({
      dialogVisibility: false,
      selectedNodes: this.selectedContacts,
    });
  }

  test(event: any) {
    console.log(event);
    this.onCloseDialog.emit({ dialogVisibility: false });
  }

  closeDialog() {
    console.log(this.selectedContacts);
    this.onCloseDialog.emit({ dialogVisibility: false, selectedNodes: this.selectedContacts });
  }

  buildSocialsTree(existingSelectedSocials?: string[]) {
    this.treeData = this.availSocials.socials.map((social, indx) => {
      return {
        key: social.toLowerCase(),
        selectable: true,
        label: social,
        data: social.toLowerCase(),
      };
    });

    if (existingSelectedSocials) {
      this.selectedContacts = this.existingSelectedContacts.map((social) => {
        return {
          key: social.name.toLowerCase(),
          selectable: true,
          label: social.name,
          data: social.name.toLowerCase(),
        };
      });
    }
  }
}
