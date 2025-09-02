/* eslint-disable @typescript-eslint/no-explicit-any */
import { PersonalInfo as Personal } from "@prisma/client";
import { PersonalInfo } from "../perosnal-info.type";

export class ResumeMapper {
  static toResponse(resume: any): PersonalInfo {
    return {
      id: resume.id,
      name: resume.name,
      title: resume.title,
      avatarUrl: resume.avatarUrl,
      location: resume.location,
      contactId: resume.contactId,
      skillsId: resume.skillsId,
      summary: resume.summary,
      contact: {
        id: resume.contact.id,
        phone: resume.contact.phone,
        email: resume.contact.email,
        linkedin: resume.contact.linkedin,
        github: resume.contact.github,
        portfolio: resume.contact.portfolio,
        youtube: resume.contact.youtube,
      },
      education: resume.education.map((edu: any) => ({
        id: edu.id,
        degree: edu.degree,
        institution: edu.institution,
        period: edu.period,
        personalInfoId: edu.personalInfoId,
      })),
      certification: resume.certification.map((cert: any) => ({
        id: cert.id,
        name: cert.name,
        description: cert.description,
        personalInfoId: cert.personalInfoId,
      })),
      skills: {
        id: resume.skills.id,
        skillFrontend: resume.skills.skillFrontend.map((skillF: any) => ({
          id: skillF.id,
          name: skillF.name,
          skillsId: skillF.skillsId,
        })),
        skillDatabase: resume.skills.skillDatabase.map((skillD: any) => ({
          id: skillD.id,
          name: skillD.name,
          skillsId: skillD.skillsId,
        })),
        skillTool: resume.skills.skillTool.map((skillT: any) => ({
          id: skillT.id,
          name: skillT.name,
          skillsId: skillT.skillsId,
        })),
        skillMethodology: resume.skills.skillMethodology.map((skillM: any) => ({
          id: skillM.id,
          name: skillM.name,
          skillsId: skillM.skillsId,
        })),
        skillBackend: resume.skills.skillBackend.map((skillM: any) => ({
          id: skillM.id,
          name: skillM.name,
          skillsId: skillM.skillsId,
        })),
      },
      experience: resume.experience.map((exp: any) => ({
        ...exp, // Assuming exp already has the necessary fields
        descriptions: exp.descriptions, // Assuming descriptions is an array of objects
      })),
      languages: resume.languages.map((lang: any) => ({
        id: lang.id,
        language: lang.language,
        level: lang.level,
        personalInfoId: lang.personalInfoId,
      })),
    };
  }
}
