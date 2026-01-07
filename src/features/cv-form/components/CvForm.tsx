import { FormIdentity } from "./FormIdentity";
import { FormContacts } from "./FormContacts";
import { FormSocials } from "./FormSocials";
import { FormExperiences } from "./FormExperiences";
import { FormSkills } from "./FormSkills";

export const CvForm = () => {
  return (
    <div className="max-w-xl mx-auto space-y-12 pb-20">
      <FormIdentity />
      <FormContacts />
      <FormSocials />
      <FormSkills />
      <FormExperiences />
    </div>
  );
};
