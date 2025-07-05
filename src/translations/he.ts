import { jobApplications } from "./jobApplications.he";

const he = {
  // Common
  common: {
    loading: "טוען...",
    error: "אירעה שגיאה",
    tryAgain: "נסה שוב",
    cancel: "ביטול",
    save: "שמור",
    delete: "מחק",
    edit: "ערוך",
    back: "חזור",
    next: "הבא",
    previous: "הקודם",
    submit: "שלח",
    confirm: "אשר",
    yes: "כן",
    no: "לא",
  },

  // Authentication
  auth: {
    signOut: "התנתק",
    welcomeBack: "ברוך שובך",
    welcome: "ברוך הבא",
  },

  // Sign In Page
  signinPage: {
    title: "כניסת מעסיקים",
    subtitle: "ברוך שובך! אנא התחבר לחשבונך",
    form: {
      phonePlaceholder: "מספר טלפון",
      passwordPlaceholder: "סיסמה",
      rememberMe: "זכור אותי",
      forgotPassword: "שכחת סיסמה?",
      submitButton: "התחברות",
      submitting: "מתחבר...",
    },
    noAccount: "אין לך חשבון?",
    createAccount: "הרשם עכשיו",
    imageSection: {
      title: "מצא את הכישרונות הטובים ביותר",
      subtitle:
        "הצטרף לאלפי חברות שמשתמשות בפלטפורמה שלנו כדי למצוא את העובדים המושלמים",
      features: {
        candidates: "יותר מ-10,000 מועמדים מוכשרים",
        tools: "כלי גיוס מתקדמים",
        support: "תמיכה 24/7",
      },
    },
    errors: {
      invalidCredentials: "מספר טלפון או סיסמה שגויים",
      serverError: "אירעה שגיאת שרת. אנא נסה שוב מאוחר יותר",
      networkError: "שגיאת חיבור. בדוק את החיבור לאינטרנט",
    },
  },

  // Sign Up Page
  signupPage: {
    title: "רישום מעסיקים",
    subtitle: "צור חשבון חדש כדי לגשת לכישרונות הטובים ביותר",
    form: {
      namePlaceholder: "שם מלא",
      companyNamePlaceholder: "שם החברה",
      emailPlaceholder: 'דוא"ל',
      phonePlaceholder: "מספר טלפון",
      passwordPlaceholder: "סיסמה",
      confirmPasswordPlaceholder: "אישור סיסמה",
      agreeTermsText: "אני מסכים ל",
      termsButtonText: "תנאים והגבלות",
      andText: "ו",
      privacyPolicyText: "מדיניות פרטיות",
      submitButton: "צור חשבון",
      registering: "יוצר חשבון...",
      termsError: "יש להסכים לתנאים והגבלות",
    },
    sideImage: {
      heading: "הצטרף לפלטפורמה שלנו כמעסיק",
      description: "קבל גישה לאלפי מועמדים מוכשרים",
      features: {
        feature1: "גישה לאלפי מועמדים מוכשרים",
        feature2: "כלי ניהול גיוס מתקדמים",
        feature3: "אנליטיקה ותובנות מפורטות",
      },
      alt: "רישום מעסיקים",
      loginTextBeforeLink: "כבר יש לך חשבון?",
      loginLinkText: "התחבר",
      backToLogin: "חזור להתחברות",
    },
    errors: {
      nameRequired: "שם חובה",
      companyNameRequired: "שם החברה חובה",
      emailInvalid: 'דוא"ל לא תקין',
      phoneRequired: "מספר טלפון חובה",
      phoneInvalid: "מספר טלפון לא תקין",
      passwordRequired: "סיסמה חובה",
      passwordTooShort: "הסיסמה חייבת להכיל לפחות 6 תווים",
      passwordMismatch: "הסיסמאות אינן תואמות",
      emailExists: 'כתובת דוא"ל כבר קיימת',
      phoneExists: "מספר טלפון כבר קיים",
    },
  },

  // Forgot Password Page
  forgotPasswordPage: {
    title: "שכחת סיסמה",
    subtitle: "הזן את מספר הטלפון שלך ונשלח לך קוד איפוס",
    form: {
      phonePlaceholder: "מספר טלפון",
      submitButton: "שלח קוד איפוס",
      submitting: "שולח...",
    },
    backToLogin: "חזור להתחברות",
    success: {
      title: "הקוד נשלח",
      message: "בדוק את ההודעות שלך לקבלת קוד האיפוס",
    },
    errors: {
      phoneNotFound: "מספר הטלפון אינו רשום",
      sendFailed: "שליחת הקוד נכשלה. נסה שוב",
    },
  },

  // Terms Modal
  termsModal: {
    title: "תנאים והגבלות",
    lastUpdated: "עודכן לאחרונה",
    sections: {
      acceptance: {
        title: "1. קבלת התנאים",
        content:
          "על ידי שימוש בפלטפורמת Foras, אתה מסכים להיות מחויב לתנאים והגבלות אלה.",
      },
      services: {
        title: "2. תיאור השירותים",
        content: "Foras מספקת פלטפורמה לחיבור בין מעסיקים למחפשי עבודה.",
      },
      accountResponsibilities: {
        title: "3. אחריות החשבון",
        content: "אתה אחראי לשמירה על סודיות החשבון והסיסמה שלך.",
      },
      privacy: {
        title: "4. פרטיות",
        content:
          "אנו מכבדים את פרטיותך ומגנים על הנתונים שלך בהתאם למדיניות הפרטיות שלנו.",
      },
      termination: {
        title: "5. סיום השירות",
        content: "אנו רשאים לסיים או להשעות את חשבונך במקרה של הפרת תנאים אלה.",
      },
    },
    acceptButton: "אני מסכים לתנאים",
    declineButton: "דחה",
  },

  // Job Listings Page (Already exists in your he.ts)
  jobListingsPage: {
    heading: "המשרות המודעות",
    searchPlaceholder: "חיפוש משרות...",
    filterBy: "סנן לפי",
    sortBy: "מיין לפי",
    noJobs: "אין משרות מופיעות כרגע",
    createFirstJob: "צור את המשרה הראשונה שלך",
    companyLogoMissing: "אין לוגו לחברה! אנא העלה לוגו לחברה.",
    uploadLogo: "העלאת הלוגו",
    uploadModal: {
      title: "העלאת לוגו החברה",
      cancel: "ביטול",
      save: "שמור",
      loading: "טוען...",
    },
    table: {
      title: "כותרת המשרה",
      city: "המקום",
      description: "התיאור",
      salary: "השכר",
      moreInfo: "מידע נוסף",
      boost: "הקפצת המשרה",
      status: "סטטוס המשרה",
    },
    boostSuccess: "תאריך עודכן בהצלחה",
    boostFail: "עדכון נכשל",
    fetchError: "שגיאה בטעינת המשרות",
  },

  // Post Job Page (Already exists in your he.ts)
  postJobPage: {
    title: "בקשת משרה",
    languageLabel: "שפת המשרה",
    jobTitle: "שם המשרה",
    jobDescription: "תיאור המשרה",
    location: "מיקום",
    jobType: "סוג המשרה",
    industry: "תחום",
    salary: "שכר",
    qualifications: "כישורים נדרשים",
    jobImage: "תמונת המשרה",
    jobImageHelper: "פורמטים נתמכים: JPEG, PNG, GIF. גודל מירבי: 1MB.",
    transportation: "האם קיימת תחבורה?",
    hebrewRequired: "נדרשת עברית?",
    submitButton: "פרסם משרה",
    submitting: "שולח...",
  },

  // Dashboard
  dashboard: {
    title: "לוח בקרה",
    welcome: "שלום",
    overview: "סקירה כללית",
    stats: {
      activeJobs: "משרות פעילות",
      totalApplicants: "סה״כ מועמדים",
      newApplicants: "מועמדים חדשים",
      viewsToday: "צפיות היום",
    },
  },

  // Applicants
  applicants: {
    title: "ניהול מועמדים",
    searchPlaceholder: "חיפוש מועמדים...",
    noApplicants: "אין מועמדים עדיין",
  },

  // Company Profile
  companyProfile: {
    title: "פרופיל החברה",
    editButton: "ערוך פרופיל",
  },

  // Settings
  settings: {
    title: "הגדרות",
    sections: {
      account: "הגדרות חשבון",
      notifications: "התראות",
      privacy: "פרטיות",
      billing: "חיוב ותשלומים",
      integrations: "אינטגרציות",
    },
  },

  // Messages
  messages: {
    title: "הודעות",
    inbox: "תיבת דואר נכנס",
    compose: "כתוב הודעה",
    noMessages: "אין הודעות",
  },

  jobApplications,
};

export default he;
