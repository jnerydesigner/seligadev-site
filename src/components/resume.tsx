import React from "react";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { LinkedinIcon } from "./icons/linkedin.icon";
import { GithubIcon } from "./icons/github.icon";
import { GlobeIcon } from "./icons/globe.icon";
import { YoutubeIcon } from "./icons/youtube.icon";
import { CalendarIcon } from "./icons/calendar.icon";
import Image from "next/image";
import { PersonalInfo } from "@/types/perosnal-info.type";
import Link from "next/link";
import { DownloadCurriculoIcon } from "./icons/icon-download-curriculo";
import { DownloadCurriculo } from "./download-curriculo";

interface ResumeProps {
  resumeDataInfo: PersonalInfo;
}

export const Resume = ({ resumeDataInfo }: ResumeProps) => {
  return (
    <div className="mx-auto w-full shadow-2xl md:max-w-[100%]">
      <div className="halftone-black-dark border-oliver-dark flex flex-col items-center justify-center gap-4 border-t-2 border-r-2 border-l-2 p-0 text-white md:flex-row md:p-8">
        <div className="mt-2 flex h-30 w-30 items-center justify-center overflow-hidden rounded-full border-4 border-white shadow-sm md:mt-0 md:h-40 md:w-50 md:flex-col">
          <Image
            src={resumeDataInfo.avatarUrl}
            alt="Foto de Jander Nery"
            width={500}
            height={500}
            className="h-full w-full"
            title={`Foto de ${resumeDataInfo.name}`}
          />
        </div>
        <div className="flex w-full flex-col items-start justify-center gap-4 p-2 md:gap-8">
          <div className="mb-4 flex flex-col items-center justify-center md:mb-0">
            <h1 className="mb-2 text-center text-xl font-bold md:text-left md:text-4xl">
              {resumeDataInfo.name}
            </h1>
            <h2 className="mb-2 text-center text-xl text-blue-100 md:text-left">
              {resumeDataInfo.title}
            </h2>
            <div className="flex items-center px-2 text-blue-100">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{resumeDataInfo.location}</span>
            </div>
          </div>

          <div className="ga grid w-100 grid-cols-1 rounded-sm p-2 text-sm">
            <div className="flex items-center px-2">
              <Phone className="mr-2 h-4 w-4" />
              <span>{resumeDataInfo.contact.phone}</span>
            </div>
            <div className="flex items-center px-2">
              <Mail className="mr-2 h-4 w-4" />
              <span>{resumeDataInfo.contact.email}</span>
            </div>
            <div className="flex items-center px-2">
              <LinkedinIcon className="mr-2 h-4 w-4" />

              <Link
                href={`https://${resumeDataInfo.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{resumeDataInfo.contact.linkedin}</span>
              </Link>
            </div>
            <div className="flex items-center px-2">
              <GithubIcon className="mr-2 h-4 w-4" />
              <Link
                href={`https://${resumeDataInfo.contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{resumeDataInfo.contact.github}</span>
              </Link>
            </div>
            <div className="flex items-center px-2">
              <GlobeIcon className="mr-2 h-4 w-4" />
              <Link
                href={`https://${resumeDataInfo.contact.portfolio}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{resumeDataInfo.contact.portfolio}</span>
              </Link>
            </div>
            <div className="flex items-center px-2">
              <YoutubeIcon className="mr-2 h-4 w-4" />
              <Link
                href={`https://${resumeDataInfo.contact.youtube}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{resumeDataInfo.contact.youtube}</span>
              </Link>
            </div>
            <DownloadCurriculo />
          </div>
        </div>
      </div>

      <div className="halftone-white-dark border-oliver-dark border-r-2 border-b-2 border-l-2 p-0 md:p-8">
        <section className="mb-8 rounded-sm p-2">
          <h3 className="bg-gray-light mb-4 rounded-sm border-b-2 border-blue-600 p-2 pb-2 text-2xl font-bold text-gray-800">
            🧑‍💻 Resumo Profissional
          </h3>
          <p className="bg-gray-light rounded-sm p-2 leading-relaxed text-gray-700">
            {resumeDataInfo.summary}
          </p>
        </section>

        <section className="mb-8 p-2">
          <h3 className="bg-gray-light mb-4 rounded-sm border-b-2 border-blue-600 p-2 pb-2 text-xl font-bold text-gray-800 md:text-2xl">
            💼 Experiência Profissional
          </h3>
          <div className="space-y-6">
            {resumeDataInfo.experience.map((job) => (
              <div key={job.id} className="rounded-lg border-l-4 border-blue-600 bg-gray-50 p-6">
                <div className="mb-3 flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">{job.company}</h4>
                    <h5 className="text-lg font-semibold text-blue-600">{job.position}</h5>
                    <p className="text-sm font-medium text-gray-600">{job.technologies}</p>
                  </div>
                  <div className="mt-2 flex items-center px-2 text-sm text-gray-500 md:mt-0">
                    <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                    <span className="font-medium">{job.period}</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {job.descriptions.map((desc) => (
                    <li key={desc.id} className="text-sm leading-relaxed text-gray-700">
                      • {desc.description}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="mb-8 grid gap-8 rounded-sm p-2 md:grid-cols-1">
          <section>
            <h3 className="bg-gray-light mb-4 rounded-sm border-b-2 border-blue-600 p-2 pb-2 text-2xl font-bold text-gray-800">
              🎓 Formação Acadêmica
            </h3>
            <div className="space-y-4">
              {resumeDataInfo.education.map((edu, index) => (
                <div key={index} className="rounded-lg bg-blue-50 p-4">
                  <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                  <p className="font-medium text-blue-600">{edu.institution}</p>
                  <p className="text-sm text-gray-600">{edu.period}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="bg-gray-light mb-4 rounded-sm border-b-2 border-blue-600 p-2 pb-2 text-2xl font-bold text-gray-800">
              🧪 Habilidades Técnicas
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="bg-gray-light mb-2 text-center font-bold text-gray-800">Backend:</h4>
                <div className="ga flex flex-wrap gap-2 rounded-sm p-2">
                  {resumeDataInfo.skills.skillBackend.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800 shadow-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="bg-gray-light mb-2 text-center font-bold text-gray-800">
                  Frontend:
                </h4>
                <div className="ga flex flex-wrap gap-2 rounded-sm p-2">
                  {resumeDataInfo.skills.skillFrontend.map((skill) => (
                    <span
                      key={skill.id}
                      className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 shadow-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="bg-gray-light mb-2 text-center font-bold text-gray-800">
                  Bancos de Dados:
                </h4>
                <div className="ga flex flex-wrap gap-2 rounded-sm p-2">
                  {resumeDataInfo.skills.skillDatabase.map((skill) => (
                    <span
                      key={skill.id}
                      className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 shadow-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="bg-gray-light mb-2 text-center font-bold text-gray-800">
                  Ferramentas:
                </h4>
                <div className="ga flex flex-wrap gap-2 rounded-sm p-2">
                  {resumeDataInfo.skills.skillTool.map((skill) => (
                    <span
                      key={skill.id}
                      className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800 shadow-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="bg-gray-light mb-2 text-center font-bold text-gray-800">
                  Metodologias:
                </h4>
                <div className="ga flex flex-wrap gap-2 rounded-sm p-2">
                  {resumeDataInfo.skills.skillMethodology.map((skill) => (
                    <span
                      key={skill.id}
                      className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800 shadow-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="grid gap-8 rounded-sm p-2 md:grid-cols-2">
          <section>
            <h3 className="bg-gray-light mb-4 rounded-sm border-b-2 border-blue-600 p-2 pb-2 text-2xl font-bold text-gray-800">
              📚 Certificações e Cursos
            </h3>
            <ul className="space-y-2">
              {resumeDataInfo.certification.map((cert, index) => (
                <li key={cert.id} className="bg-gray-light flex items-start p-2">
                  <span className="mr-2 text-blue-600">•</span>
                  <span className="text-sm text-gray-700">{`${cert.name}: ${cert.description}`}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="bg-gray-light mb-4 rounded-sm border-b-2 border-blue-600 p-2 pb-2 text-2xl font-bold text-gray-800">
              🌎 Idiomas
            </h3>
            <div className="space-y-3">
              {resumeDataInfo.languages.map((lang) => (
                <div
                  key={lang.id}
                  className="flex flex-col items-center justify-between rounded-lg bg-gray-50 p-3 px-2"
                >
                  <span className="font-medium text-gray-800">{lang.language}:</span>
                  <span className="font-medium text-blue-600">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
