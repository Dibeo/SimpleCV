import type { CVData } from "../../../core/domain/cv.types";

export const ClassicTheme = ({ data }: { data: CVData }) => (
  <div className="p-16 h-full flex flex-col font-serif">
    <header className="text-center border-b-2 border-slate-900 pb-6 mb-8">
      <h1 className="text-5xl font-bold tracking-tight text-slate-900 uppercase mb-2">
        {data.personalInfo.fullName || "VOTRE NOM"}
      </h1>
      <p className="text-2xl text-slate-700 font-medium uppercase tracking-widest">
        {data.personalInfo.title || "Titre du poste"}
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-600">
        {data.personalInfo.contacts.map((c) => (
          <span key={c.id}>
            <span className="font-bold uppercase">{c.label}:</span> {c.value}
          </span>
        ))}
        {data.personalInfo.socials.map((s) => (
          <span key={s.id} className="underline">
            {s.url || s.platform}
          </span>
        ))}
      </div>
    </header>

    <div className="space-y-8">
      {data.personalInfo.summary && (
        <section>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 mb-3">
            Profil Professionnel
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed text-justify italic">
            {data.personalInfo.summary}
          </p>
        </section>
      )}
      <section>
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 mb-4">
          Expériences Professionnelles
        </h2>
        <div className="space-y-6">
          {data.experiences.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-md font-bold text-slate-900">
                  {exp.company} —{" "}
                  <span className="italic font-medium">{exp.role}</span>
                </h3>
                <span className="text-xs font-bold text-slate-600 uppercase">
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>

              {exp.description && (
                <p className="text-xs text-slate-600 mb-2 leading-snug">
                  {exp.description}
                </p>
              )}

              <ul className="list-disc ml-4 space-y-1">
                {exp.mission.map((m, idx) => (
                  <li key={idx} className="text-xs text-slate-700 pl-1">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {data.skills.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 mb-3">
            Compétences Techniques
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {data.skills.map((skill, i) => (
              <span key={i} className="text-xs text-slate-700 font-medium">
                • {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  </div>
);
