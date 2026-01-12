import {
  Github,
  Linkedin,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  type LucideIcon,
  Twitter,
  Youtube,
  Instagram,
  MapPin,
} from "lucide-react";

export type SocialType = "github" | "linkedin" | "portfolio" | "twitter" | "x" | "youtube" | "instagram";
export type ContactType = "email" | "mail" | "téléphone" | "phone" | "tel" | "adresse" | "address" | "localisation";

export const SOCIAL_ICONS: Record<SocialType, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  portfolio: Globe,
  youtube: Youtube,
  instagram: Instagram,
};

export const CONTACT_ICONS: Record<ContactType, LucideIcon> = {
  email: Mail,
  mail: Mail,
  téléphone: Phone,
  phone: Phone,
  tel: Phone,
  adresse: MapPin,
  address: MapPin,
  localisation: MapPin,
};

export const DEFAULT_LINK_ICON = ExternalLink;

export const getContactIcon = (type: string): LucideIcon => {
  const normalizedType = type.toLowerCase().trim() as ContactType;
  return CONTACT_ICONS[normalizedType] || Mail;
};