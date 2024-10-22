import { BasicInfo } from "./basic";
import { Education } from "./education";
import { WorkExperience } from "./work-experience";

export interface ResumeData {
  basicInfo?: BasicInfo;
  workExperience?: WorkExperience[];
  education?: Education[];
}