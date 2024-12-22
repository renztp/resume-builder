import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

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
  private selectedLayout = new BehaviorSubject<string | null>(null);
  layout$ = this.selectedLayout.asObservable();

  constructor() {
  }

  setSelectedLayout(layout: string) {
    this.selectedLayout.next(layout);
  }
}
