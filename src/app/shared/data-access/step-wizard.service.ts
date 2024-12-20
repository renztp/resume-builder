import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

enum Steps {
  BasicInfo = 0,
  WorkExperience = 1,
  Education = 2,
  Review = 3
}

@Injectable({
  providedIn: 'root'
})
export class StepWizardService {
  // selectedLayout: string | null = null;
  selectedLayout = new Subject<string>();
  constructor() {}

  get selectedLayout$() {
    return this.selectedLayout.asObservable();
  }

  setSelectedLayout(layout: string) {
    this.selectedLayout.next(layout);
  }

  // public getSelectedLayout() {
  //   return this.selectedLayout;
  // }
  //
  // public setSelectedLayout(layout: string) {
  //   this.selectedLayout = layout;
  // }
}
