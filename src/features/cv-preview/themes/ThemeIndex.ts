// CV_THEMES.ts (ou ton fichier d'index des thèmes)
import { ModernTheme } from "./ModernTheme";
import { ClassicTheme } from "./ClassicTheme";
import { StandardTheme } from "./StandardTheme";

export const CV_THEMES = {
  classic: { component: ClassicTheme, label: "Classique" },
  modern: { component: ModernTheme, label: "Moderne (Dark Side)" },
  standard: { component: StandardTheme, label: "Standard" },
};

export type ThemeId = keyof typeof CV_THEMES;
