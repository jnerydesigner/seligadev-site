export interface PersonalInfo {
  id: string;
  name: string;
  avatarUrl: string;
  title: string;
  location: string;
  contactId: string;
  skillsId: string;
  contact: Contact;
  summary: string;
  education: Education[];
  certification: Certification[];
  skills: Skills;
  experience: Experience[];
  languages: Language[];
}

export interface Contact {
  id: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  youtube: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  personalInfoId: string;
}

export interface Certification {
  id: string;
  name: string;
  description: string;
  personalInfoId: string;
}

export interface Skills {
  id: string;
  skillFrontend: SkillFrontend[];
  skillDatabase: SkillDatabase[];
  skillTool: SkillTool[];
  skillMethodology: SkillMethodology[];
  skillBackend: SkillBackend[];
}

export interface SkillBackend {
  id: string;
  name: string;
  skillsId: string;
}

export interface SkillFrontend {
  id: string;
  name: string;
  skillsId: string;
}

export interface SkillDatabase {
  id: string;
  name: string;
  skillsId: string;
}

export interface SkillTool {
  id: string;
  name: string;
  skillsId: string;
}

export interface SkillMethodology {
  id: string;
  name: string;
  skillsId: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  technologies: string;
  period: string;
  personalInfoId: string;
  descriptions: Description[];
}

export interface Description {
  id: string;
  description: string;
  experienceId: string;
}

export interface Language {
  id: string;
  language: string;
  level: string;
  personalInfoId: string;
}
