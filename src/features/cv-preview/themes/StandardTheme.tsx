import type { CVData } from "../../../core/domain/cv.types";
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Youtube,
  Instagram,
} from "lucide-react";

const SOCIAL_ICONS: Record<string, any> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  portfolio: Globe,
  youtube: Youtube,
  instagram: Instagram,
};

const CONTACT_ICONS: Record<string, any> = {
  email: Mail,
  mail: Mail,
  téléphone: Phone,
  phone: Phone,
  tel: Phone,
  adresse: MapPin,
  address: MapPin,
  localisation: MapPin,
};

export const StandardTheme = ({ data }: { data: CVData }) => (
  <div className="flex h-full min-h-[297mm] font-sans bg-white">
    <aside className="w-[35%] bg-slate-100 p-10 flex flex-col gap-8 border-r border-slate-200">
      {data.personalInfo.photoUrl && (
        <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden border-4 border-white shadow-lg shrink-0">
          <img
            src={data.personalInfo.photoUrl}
            className="w-full h-full object-cover"
            alt="Profil"
          />
        </div>
      )}

      <section className="space-y-4">
        <h2 className="text-blue-600 font-bold text-xs uppercase tracking-widest border-b border-blue-200 pb-1">
          Contact
        </h2>
        <div className="space-y-3">
          {data.personalInfo.contacts.map((c) => {
            const Icon = CONTACT_ICONS[c.label.toLowerCase()] || Globe;
            return (
              <div key={c.id} className="flex items-start gap-3 text-[11px]">
                <Icon size={14} className="text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-slate-500 uppercase text-[9px] leading-none mb-1">
                    {c.label}
                  </p>
                  <p className="text-slate-800 break-all">{c.value || "—"}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {data.skills.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-blue-600 font-bold text-xs uppercase tracking-widest border-b border-blue-200 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-white text-slate-700 text-[10px] font-medium rounded border border-slate-200 shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.personalInfo.socials.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-blue-600 font-bold text-xs uppercase tracking-widest border-b border-blue-200 pb-1">
            Réseaux Sociaux
          </h2>
          <div className="space-y-3">
            {data.personalInfo.socials.map((social) => {
              const Icon =
                SOCIAL_ICONS[social.platform.toLowerCase()] || ExternalLink;
              return (
                <div
                  key={social.id}
                  className="flex items-center gap-3 text-[11px]"
                >
                  <div className="p-1.5 bg-white rounded-md border border-slate-200 text-slate-600 shadow-sm">
                    <Icon size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-500 uppercase text-[9px] leading-none mb-1">
                      {social.platform}
                    </p>
                    <a
                      className="text-blue-600 truncate block hover:underline"
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {social.url.replace(/^https?:\/\//, "") || "—"}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </aside>

    <main className="flex-1 p-12 bg-white">
      <header className="mb-10">
        <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
          {data.personalInfo.fullName || "Votre Nom"}
        </h1>
        <p className="text-2xl text-blue-600 mt-2 font-light tracking-wide">
          {data.personalInfo.title || "Titre du poste"}
        </p>
      </header>

      <div className="space-y-10">
        {data.personalInfo.summary && (
          <section>
            <h2 className="text-blue-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 italic">
              Profil
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-wrap">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        <section>
          <h2 className="text-blue-600 font-bold text-xs uppercase tracking-[0.3em] mb-6">
            Expériences
          </h2>
          <div className="space-y-8">
            {data.experiences.map((exp) => (
              <div
                key={exp.id}
                className="relative pl-6 border-l-2 border-slate-100"
              >
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold text-slate-800 leading-none">
                    {exp.role}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-blue-600 font-medium text-sm mb-2">
                  {exp.company}
                </p>
                {exp.description && (
                  <p className="text-slate-500 text-xs mb-3 italic leading-snug">
                    {exp.description}
                  </p>
                )}
                <ul className="space-y-1.5">
                  {exp.mission.map((m, idx) => (
                    <li
                      key={idx}
                      className="text-slate-700 text-xs flex gap-2 leading-relaxed"
                    >
                      <span className="text-blue-500 font-bold">•</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  </div>
);
