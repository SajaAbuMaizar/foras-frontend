const skillTranslations: Record<string, { ar: string; he: string }> = {
  cook: { ar: "طباخ", he: "טבח" },
  hotel: { ar: "فندقة", he: "מלונאות" },
  technology: { ar: "تكنولوجيا", he: "טכנולוגיה" },
  management: { ar: "إدارة", he: "ניהול" },
  construction: { ar: "بناء", he: "בנייה" },
  customers: { ar: "خدمة زبائن", he: "שירות לקוחות" },
  sales: { ar: "مبيعات", he: "מכירות" },
  order: { ar: "ترتيب", he: "סדר" },
  saver: { ar: "حارس", he: "שומר" },
  barman: { ar: "نادل", he: "ברמן" },
  barista: { ar: "باريستا", he: "בריסטה" },
  electricity: { ar: "كهرباء", he: "חשמל" },
  condition: { ar: "تكييف", he: "מיזוג" },
  cars: { ar: "سيارات", he: "רכב" },
};

export function getSkillTranslation(skill: string, lang: "ar" | "he"): string {
  return skillTranslations[skill]?.[lang] || skill;
}
