import { BasicInfo } from './basic';
import { Education } from './education';
import { Socials } from './socials';
import { WorkExperience } from './work-experience';

export interface ResumeData {
  id?: string;
  resumeName: string;
  basicInfo?: BasicInfo;
  contactInfo?: Socials[];
  workExperience?: WorkExperience[];
  education?: Education[];
}
