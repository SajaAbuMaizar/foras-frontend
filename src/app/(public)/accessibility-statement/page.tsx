// src/app/(public)/accessibility-statement/page.tsx
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const AccessibilityStatementPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 mt-16" dir="rtl">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">הצהרת נגישות</h1>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">מחויבותנו לנגישות</h2>
            <p className="text-gray-700 leading-relaxed">
              אתר Foras מחויב להבטיח נגישות דיגיטלית לאנשים עם מוגבלויות. אנו
              משפרים באופן מתמיד את חוויית המשתמש עבור כולם, ומיישמים את תקני
              הנגישות הרלוונטיים.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">תקני נגישות</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              אתר זה נבנה בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות
              נגישות לשירות), התשע"ג-2013. האתר עומד בדרישות תקן WCAG 2.1 ברמת
              AA.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>ניווט באמצעות מקלדת בלבד</li>
              <li>תאימות לקוראי מסך</li>
              <li>טקסטים חלופיים לתמונות</li>
              <li>ניגודיות צבעים מתאימה</li>
              <li>אפשרות להגדלת גופן</li>
              <li>מבנה כותרות היררכי</li>
              <li>טפסים נגישים עם תוויות ברורות</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">תכונות נגישות באתר</h2>
            <div className="space-y-4">
              <div className="border-r-4 border-blue-500 pr-4">
                <h3 className="font-semibold mb-2">ווידג'ט נגישות</h3>
                <p className="text-gray-700">
                  בצד שמאל של המסך תמצאו כפתור נגישות המאפשר התאמות אישיות כגון:
                  שינוי גודל טקסט, ניגודיות גבוהה, הדגשת קישורים, סמן גדול ועוד.
                </p>
              </div>

              <div className="border-r-4 border-blue-500 pr-4">
                <h3 className="font-semibold mb-2">ניווט מקלדת</h3>
                <p className="text-gray-700">
                  ניתן לנווט באתר באמצעות מקלדת בלבד. השתמשו במקש Tab לניווט בין
                  אלמנטים, Enter לבחירה, ו-Escape לסגירת חלונות.
                </p>
              </div>

              <div className="border-r-4 border-blue-500 pr-4">
                <h3 className="font-semibold mb-2">קוראי מסך</h3>
                <p className="text-gray-700">
                  האתר מותאם לשימוש עם קוראי מסך כגון NVDA ו-JAWS. כל התמונות
                  כוללות טקסט חלופי, וכל הטפסים כוללים תוויות מתאימות.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">קיצורי מקלדת</h2>
            <div className="bg-gray-100 rounded-lg p-4">
              <ul className="space-y-2 font-mono text-sm">
                <li>
                  <kbd>Alt</kbd> + <kbd>1</kbd> - דילוג לתוכן הראשי
                </li>
                <li>
                  <kbd>Alt</kbd> + <kbd>2</kbd> - דילוג לתפריט ניווט
                </li>
                <li>
                  <kbd>Alt</kbd> + <kbd>3</kbd> - פתיחת תפריט נגישות
                </li>
                <li>
                  <kbd>Esc</kbd> - סגירת חלונות קופצים
                </li>
                <li>
                  <kbd>Tab</kbd> - ניווט בין אלמנטים
                </li>
                <li>
                  <kbd>Shift</kbd> + <kbd>Tab</kbd> - ניווט אחורה
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">מגבלות ידועות</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              למרות מאמצינו הרבים להבטיח נגישות מלאה, ייתכן שתיתקלו בחלקים
              מסוימים באתר שעדיין אינם נגישים במלואם:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>תוכן וידאו ישן ללא כתוביות</li>
              <li>מסמכי PDF שהועלו לפני 2020</li>
              <li>מפות אינטראקטיביות של צד שלישי</li>
            </ul>
            <p className="text-gray-700 mt-4">
              אנו עובדים באופן מתמיד לשיפור הנגישות בכל חלקי האתר.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">משוב ויצירת קשר</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              אנו מעריכים את המשוב שלכם. אם נתקלתם בבעיות נגישות באתר או זקוקים
              לסיוע, אנא צרו איתנו קשר:
            </p>

            <div className="bg-blue-50 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-blue-600 w-5 h-5" />
                <div>
                  <p className="font-semibold">דוא"ל:</p>
                  <a
                    href="mailto:accessibility@foras.co.il"
                    className="text-blue-600 hover:underline"
                  >
                    accessibility@foras.co.il
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-blue-600 w-5 h-5" />
                <div>
                  <p className="font-semibold">טלפון:</p>
                  <a
                    href="tel:+972546735926"
                    className="text-blue-600 hover:underline"
                    dir="ltr"
                  >
                    054-673-5926
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-blue-600 w-5 h-5" />
                <div>
                  <p className="font-semibold">כתובת:</p>
                  <p>בן יהודה 34, ירושלים</p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mt-4">
              נשתדל להשיב לפניות בנושא נגישות תוך 5 ימי עסקים.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">אישור נגישות</h2>
            <p className="text-gray-700 leading-relaxed">
              האתר עבר בדיקת נגישות על ידי מומחה נגישות מוסמך ונמצא תואם לתקנות
              הנגישות הישראליות.
            </p>
            <p className="text-gray-700 mt-2">
              <strong>תאריך אישור אחרון:</strong> דצמבר 2024
            </p>
            <p className="text-gray-700">
              <strong>תאריך עדכון הצהרה זו:</strong> ינואר 2025
            </p>
          </section>

          <section className="border-t pt-6">
            <h2 className="text-2xl font-semibold mb-4">הליך אכיפה</h2>
            <p className="text-gray-700 leading-relaxed">
              במידה ולא קיבלתם מענה מספק לפנייתכם בנושא נגישות, באפשרותכם לפנות
              לנציבות שוויון זכויות לאנשים עם מוגבלות:
            </p>
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="font-semibold">
                נציבות שוויון זכויות לאנשים עם מוגבלות
              </p>
              <p>
                דוא"ל:{" "}
                <a
                  href="mailto:pniotnez@justice.gov.il"
                  className="text-blue-600 hover:underline"
                >
                  pniotnez@justice.gov.il
                </a>
              </p>
              <p>
                טלפון: <span dir="ltr">*6763</span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AccessibilityStatementPage;
