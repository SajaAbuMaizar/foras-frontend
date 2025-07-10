import { JobApplicationWithCandidate } from "@/types/JobApplicationWithCandidate";
import { getSkillTranslation } from "./skillTranslations";
import { getLanguageTranslation } from "./languageTranslations";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";

export interface ExportData {
  name: string;
  phone: string;
  area: string;
  gender: string;
  skills: string;
  languages: string;
  licenses: string;
  status: string;
  appliedAt: string;
}

declare module "jspdf" {
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

export async function exportToExcel(
  applications: JobApplicationWithCandidate[],
  jobTitle: string,
  lang: "ar" | "he"
): Promise<void> {
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

  // Set column widths
  const colWidths = [
    { wch: 20 }, // name
    { wch: 15 }, // phone
    { wch: 15 }, // area
    { wch: 10 }, // gender
    { wch: 12 }, // knowsHebrew
    { wch: 12 }, // needsHelp
    { wch: 30 }, // skills
    { wch: 20 }, // languages
    { wch: 15 }, // licenses
    { wch: 12 }, // status
    { wch: 15 }, // appliedAt
  ];
  worksheet["!cols"] = colWidths;

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

export async function exportToPDF(
  applications: JobApplicationWithCandidate[],
  jobTitle: string,
  lang: "ar" | "he"
): Promise<void> {
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
      ? [
          "تاريخ التقديم",
          "الحالة",
          "رخص القيادة",
          "اللغات",
          "المهارات",
          "يحتاج مساعدة",
          "يعرف العبرية",
          "الجنس",
          "المنطقة",
          "الهاتف",
          "الاسم",
        ]
      : [
          "תאריך הגשה",
          "סטטוס",
          "רישיונות",
          "שפות",
          "כישורים",
          "צריך עזרה",
          "יודע עברית",
          "מגדר",
          "אזור",
          "טלפון",
          "שם",
        ];

  // Table data
  const tableData = data.map((row) => [
    row.appliedAt,
    row.status,
    row.licenses || "-",
    row.languages || "-",
    row.skills || "-",
    row.gender,
    row.area,
    row.phone,
    row.name,
  ]);

  // Create table
  (pdf as any).autoTable({
    head: [headers],
    body: tableData,
    startY: 30,
    styles: {
      font: "helvetica",
      fontSize: 8,
      cellPadding: 2,
      halign: "right",
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { top: 30, right: 10, bottom: 10, left: 10 },
  });

  const fileName = `${jobTitle}_candidates_${
    new Date().toISOString().split("T")[0]
  }.pdf`;
  pdf.save(fileName);
}

export function generatePrintHTML(
  applications: JobApplicationWithCandidate[],
  jobTitle: string,
  lang: "ar" | "he"
): string {
  const isRTL = lang === "ar" || lang === "he";
  const data = prepareExportData(applications, lang);

  const headers =
    lang === "ar"
      ? {
          name: "الاسم",
          phone: "الهاتف",
          area: "المنطقة",
          gender: "الجنس",
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
          skills: "כישורים",
          languages: "שפות",
          licenses: "רישיונות נהיגה",
          status: "סטטוס",
          appliedAt: "תאריך הגשה",
        };

  const title =
    lang === "ar"
      ? `قائمة المتقدمين - ${jobTitle}`
      : `רשימת מועמדים - ${jobTitle}`;

  return `
    <!DOCTYPE html>
    <html dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <style>
        @media print {
          body { margin: 0; }
          @page { margin: 1cm; size: landscape; }
        }
        body {
          font-family: Arial, sans-serif;
          rtl}
          margin: 20px;
        }
        h1 {
          text-align: center;
          color: #333;
          margin-bottom: 10px;
        }
        .date {
          text-align: center;
          color: #666;
          margin-bottom: 20px;
          font-size: 14px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: rtl;
          font-size: 12px;
        }
        th {
          background-color: #2980b9;
          color: white;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        .status-accepted {
          color: #27ae60;
          font-weight: bold;
        }
        .status-rejected {
          color: #e74c3c;
          font-weight: bold;
        }
        .status-pending {
          color: #f39c12;
          font-weight: bold;
        }
        .no-data {
          text-align: center;
          color: #999;
        }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <div class="date">${new Date().toLocaleDateString(
        lang === "ar" ? "ar-SA" : "he-IL"
      )}</div>
      <table>
        <thead>
          <tr>
            <th>${headers.name}</th>
            <th>${headers.phone}</th>
            <th>${headers.area}</th>
            <th>${headers.gender}</th>
            <th>${headers.skills}</th>
            <th>${headers.languages}</th>
            <th>${headers.licenses}</th>
            <th>${headers.status}</th>
            <th>${headers.appliedAt}</th>
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (row) => `
            <tr>
              <td><strong>${row.name}</strong></td>
              <td>${row.phone}</td>
              <td>${row.area}</td>
              <td>${row.gender}</td>
              <td>${row.skills || '<span class="no-data">-</span>'}</td>
              <td>${row.languages || '<span class="no-data">-</span>'}</td>
              <td>${row.licenses || '<span class="no-data">-</span>'}</td>
              <td class="status-${
                row.status === (lang === "ar" ? "مقبول" : "התקבל")
                  ? "accepted"
                  : row.status === (lang === "ar" ? "مرفوض" : "נדחה")
                  ? "rejected"
                  : "pending"
              }">${row.status}</td>
              <td>${row.appliedAt}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </body>
    </html>
  `;
}
