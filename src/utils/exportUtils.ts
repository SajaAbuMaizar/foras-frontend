import { JobApplicationWithCandidate } from "@/types/JobApplicationWithCandidate";
import { getSkillTranslation } from "./skillTranslations";
import { getLanguageTranslation } from "./languageTranslations";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export interface ExportData {
  name: string;
  phone: string;
  area: string;
  gender: string;
  knowsHebrew: string;
  needsHelp: string;
  skills: string;
  languages: string;
  licenses: string;
  status: string;
  appliedAt: string;
}

declare module 'jspdf' {
    interface jsPDF {
      setR2L(isRTL: boolean): void;
    }
  }

export function prepareExportData(
  applications: JobApplicationWithCandidate[],
  lang: "ar" | "he"
): ExportData[] {
  return applications.map((app) => ({
    name: app.candidate.name,
    phone: app.candidate.phone,
    area: app.candidate.area,
    gender:
      app.candidate.gender === "MALE"
        ? lang === "ar"
          ? "ذكر"
          : "זכר"
        : lang === "ar"
        ? "أنثى"
        : "נקבה",
    knowsHebrew: app.candidate.knowsHebrew
      ? lang === "ar"
        ? "نعم"
        : "כן"
      : lang === "ar"
      ? "لا"
      : "לא",
    needsHelp: app.candidate.needsHelp
      ? lang === "ar"
        ? "نعم"
        : "כן"
      : lang === "ar"
      ? "لا"
      : "לא",
    skills: app.candidate.skills
      .map((skill) => getSkillTranslation(skill, lang))
      .join(", "),
    languages: app.candidate.languages
      .map((language) => getLanguageTranslation(language, lang))
      .join(", "),
    licenses: app.candidate.driverLicenses.join(", "),
    status:
      lang === "ar"
        ? app.status === "ACCEPTED"
          ? "مقبول"
          : app.status === "REJECTED"
          ? "مرفوض"
          : "قيد الانتظار"
        : app.status === "ACCEPTED"
        ? "התקבל"
        : app.status === "REJECTED"
        ? "נדחה"
        : "ממתין",
    appliedAt: new Date(app.appliedAt).toLocaleDateString(
      lang === "ar" ? "ar-SA" : "he-IL"
    ),
  }));
}

export function exportToExcel(
  applications: JobApplicationWithCandidate[],
  jobTitle: string,
  lang: "ar" | "he"
): void {
  const data = prepareExportData(applications, lang);

  const headers =
    lang === "ar"
      ? {
          name: "الاسم",
          phone: "الهاتف",
          area: "المنطقة",
          gender: "الجنس",
          knowsHebrew: "يعرف العبرية",
          needsHelp: "يحتاج مساعدة",
          skills: "المهارات",
          languages: "اللغات",
          licenses: "رخص القيادة",
          status: "الحالة",
          appliedAt: "تاريخ التقديم",
        }
      : {
          name: "שם",
          phone: "טלפון",
          area: "אזור",
          gender: "מגדר",
          knowsHebrew: "יודע עברית",
          needsHelp: "צריך עזרה",
          skills: "כישורים",
          languages: "שפות",
          licenses: "רישיונות נהיגה",
          status: "סטטוס",
          appliedAt: "תאריך הגשה",
        };

  const worksheet = XLSX.utils.json_to_sheet(data, {
    header: Object.keys(headers),
  });

  // Set column headers
  const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const address = XLSX.utils.encode_col(C) + "1";
    if (!worksheet[address]) continue;
    worksheet[address].v =
      headers[worksheet[address].v as keyof typeof headers];
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    lang === "ar" ? "المتقدمون" : "מועמדים"
  );

  const fileName = `${jobTitle}_candidates_${
    new Date().toISOString().split("T")[0]
  }.xlsx`;
  XLSX.writeFile(workbook, fileName);
}

export function exportToPDF(
  applications: JobApplicationWithCandidate[],
  jobTitle: string,
  lang: "ar" | "he"
): void {
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  // Add custom font for RTL support
  if (lang === "ar" || lang === "he") {
    pdf.setR2L(true);
  }

  const data = prepareExportData(applications, lang);

  // Title
  pdf.setFontSize(16);
  const title =
    lang === "ar"
      ? `قائمة المتقدمين - ${jobTitle}`
      : `רשימת מועמדים - ${jobTitle}`;
  pdf.text(title, 148, 15, { align: "center" });

  // Date
  pdf.setFontSize(10);
  const dateStr = new Date().toLocaleDateString(
    lang === "ar" ? "ar-SA" : "he-IL"
  );
  pdf.text(dateStr, 148, 22, { align: "center" });

  // Table headers
  const headers =
    lang === "ar"
      ? ["الاسم", "الهاتف", "المنطقة", "المهارات", "اللغات", "الحالة"]
      : ["שם", "טלפון", "אזור", "כישורים", "שפות", "סטטוס"];

  // Table data
  const tableData = data.map((candidate) => [
    candidate.name,
    candidate.phone,
    candidate.area,
    candidate.skills || "-",
    candidate.languages || "-",
    candidate.status,
  ]);

  // Generate table
  (pdf as any).autoTable({
    head: [headers],
    body: tableData,
    startY: 30,
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 9,
      cellPadding: 3,
      halign: lang === "ar" || lang === "he" ? "right" : "left",
    },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
  });

  const fileName = `${jobTitle}_candidates_${
    new Date().toISOString().split("T")[0]
  }.pdf`;
  pdf.save(fileName);
}
