import { BasicInfo } from '@shared/models/basic';
import { Education } from '@shared/models/education';
import { ResumeData } from '@shared/models/resume-data';
import { Socials } from '@shared/models/socials';
import { WorkExperience } from '@shared/models/work-experience';
import { Content, ContentStack, TDocumentDefinitions } from 'pdfmake/interfaces';
import { formatDateToYear } from '@shared/utils/date/date.util';

const processWorkExperience = (workExperiences: WorkExperience[]): any => {
  const workExperiencesContent = [];
  for (const workExperienceItem of workExperiences) {
    const formattedStartYear = workExperienceItem.startYear
      ? formatDateToYear(workExperienceItem.startYear)
      : '';
    const formattedEndYear = workExperienceItem.endYear
      ? formatDateToYear(workExperienceItem.endYear)
      : 'Present';
    const item = [
      {
        ...(formattedStartYear
          ? {
              text: `${formattedStartYear} - ${formattedStartYear ? formattedEndYear : 'Present'}`,
              italics: true,
            }
          : {}),
      },
      {
        text: workExperienceItem.companyName,
        style: 'workExperienceCompanyName',
        margin: [0, 0, 0, 3],
      },
      {
        text: workExperienceItem.occupation,
        margin: [0, 0, 0, 5],
      },
      {
        ul: [
          'Used Full-stack technologies(Angular, Express/Nodejs, MongoDB, Ionic etc) to manage existing features and/or add new features for the product',
          'Actively work with senior developers to plan and execute tickets for the product',
          'Created/Managed features for the product that touches frontend and backend with e2e/unit tests',
        ],
        lineHeight: 1.2,
        margin: [0, 0, 0, 15],
      },
    ];
    workExperiencesContent.push(item);
  }
  return workExperiencesContent;
};

const processEducation = (education: Education[]): any => {
  const educationContent = [];
  for (const educationItem of education) {
    const item = [
      {
        ...(educationItem.startYear
          ? {
              text: `${educationItem.startYear} - ${new Date(educationItem.endYear).getFullYear().toString() ? new Date(educationItem.endYear).getFullYear().toString() : 'Present'}`,
              italics: true,
            }
          : {}),
      },
      {
        text: educationItem.schoolName,
        style: 'workExperienceCompanyName',
        margin: [0, 0, 0, 3],
      },
      {
        text: educationItem.degree,
        margin: [0, 0, 0, 5],
      },
      {
        ul: [
          'Used Full-stack technologies(Angular, Express/Nodejs, MongoDB, Ionic etc) to manage existing features and/or add new features for the product',
          'Actively work with senior developers to plan and execute tickets for the product',
          'Created/Managed features for the product that touches frontend and backend with e2e/unit tests',
        ],
        lineHeight: 1.2,
        margin: [0, 0, 0, 15],
      },
    ];
    educationContent.push(item);
  }
  return educationContent;
};

const processBasicInfo = (basicInfo: BasicInfo | undefined): Content[] => {
  if (basicInfo == undefined) {
    return [];
  }
  return [
    {
      text: basicInfo.name,
      style: 'name',
      margin: [0, 0, 0, 8],
    },
    {
      text: basicInfo.occupation,
      style: 'occupationStyles',
      margin: [0, 0, 0, 8],
    },
  ];
};

/*
 * Resume Order
 * Name
 * Contact Info + Location
 * Bio
 * Work Experience
 */

export function minimalLayout(resumeData: ResumeData): TDocumentDefinitions {
  const { basicInfo, contactInfo, workExperience, education } = resumeData;
  const userLocation = basicInfo?.location;
  const userBio = basicInfo?.bio;
  const userContacts: Socials[] = [];
  if (contactInfo != undefined && contactInfo?.length > 0) {
    userContacts.push(...contactInfo);
    userContacts.push({
      name: 'location',
      value: userLocation,
      disabled: false,
    });
  }

  const basicInfoContent = processBasicInfo(basicInfo);
  const workExperiencesContent = processWorkExperience(workExperience);
  const educationContent = processEducation(education);
  const userContactsContent = userContacts.map((contact) => {
    if (contact.name === userContacts[userContacts.length - 1].name) {
      return {
        text: `${contact.value}`,
        bold: contact.disabled,
      };
    }
    return {
      text: `${contact.value}\t|\t`,
      bold: contact.disabled,
    };
  });

  return {
    content: [
      ...basicInfoContent,
      // { text: basicInfo?.name || '', style: 'name', margin: [0, 0, 0, 8] },
      // { text: basicInfo?.occupation || '', style: 'occupationStyles', margin: [0, 0, 0, 8] },
      {
        text: [...userContactsContent],
        margin: [0, 0, 0, 15],
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 2,
          },
        ],
        margin: [0, 0, 0, 15],
      },
      {
        columns: [
          {
            text: 'Summary',
            style: 'sectionHeader',
            width: 160,
          },
          {
            text: userBio,
          },
        ],
        margin: [0, 0, 0, 20],
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 1,
          },
        ],
        margin: [0, 0, 0, 15],
      },
      {
        columns: [
          {
            text: 'Work Experience',
            style: 'sectionHeader',
            width: 160,
          },
          {
            stack: workExperiencesContent,
          },
        ],
        margin: [0, 0, 0, 15],
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 1,
          },
        ],
        margin: [0, 0, 0, 15],
      },
      {
        columns: [
          {
            text: 'Education',
            style: 'sectionHeader',
            width: 160,
          },
          {
            stack: educationContent,
          },
        ],
      },
    ],
    styles: {
      name: {
        fontSize: 24,
        bold: true,
      },
      occupationStyles: {
        fontSize: 14,
        bold: true,
      },
      sectionHeader: {
        fontSize: 16,
        bold: true,
      },
      workExperienceCompanyName: {
        fontSize: 14,
        bold: true,
      },
    },
  };
}
