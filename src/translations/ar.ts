import { jobApplications } from "./jobApplications.ar";

const ar = {
  // Common
  common: {
    loading: "جارٍ التحميل...",
    error: "حدث خطأ",
    tryAgain: "حاول مرة أخرى",
    cancel: "إلغاء",
    save: "حفظ",
    delete: "حذف",
    edit: "تعديل",
    back: "رجوع",
    next: "التالي",
    previous: "السابق",
    submit: "إرسال",
    confirm: "تأكيد",
    yes: "نعم",
    no: "لا",
  },

  // Authentication
  auth: {
    signOut: "تسجيل الخروج",
    welcomeBack: "مرحباً بعودتك",
    welcome: "مرحباً",
  },

  // Sign In Page
  signinPage: {
    title: "تسجيل دخول أصحاب العمل",
    subtitle: "مرحباً بعودتك! يرجى تسجيل الدخول إلى حسابك",
    form: {
      phonePlaceholder: "رقم الهاتف",
      passwordPlaceholder: "كلمة المرور",
      rememberMe: "تذكرني",
      forgotPassword: "نسيت كلمة المرور؟",
      submitButton: "تسجيل الدخول",
      submitting: "جارٍ تسجيل الدخول...",
    },
    noAccount: "ليس لديك حساب؟",
    createAccount: "سجل الآن",
    imageSection: {
      title: "ابحث عن أفضل المواهب",
      subtitle:
        "انضم إلى آلاف الشركات التي تستخدم منصتنا للعثور على الموظفين المثاليين",
      features: {
        candidates: "أكثر من 10,000 مرشح مؤهل",
        tools: "أدوات توظيف متقدمة",
        support: "دعم على مدار الساعة",
      },
    },
    errors: {
      invalidCredentials: "رقم الهاتف أو كلمة المرور غير صحيحة",
      serverError: "حدث خطأ في الخادم. يرجى المحاولة لاحقاً",
      networkError: "خطأ في الاتصال. تحقق من اتصالك بالإنترنت",
    },
  },

  // Sign Up Page
  signupPage: {
    title: "تسجيل أصحاب العمل",
    subtitle: "أنشئ حساباً جديداً للوصول إلى أفضل المواهب",
    form: {
      namePlaceholder: "الاسم الكامل",
      companyNamePlaceholder: "اسم الشركة",
      emailPlaceholder: "البريد الإلكتروني",
      phonePlaceholder: "رقم الهاتف",
      passwordPlaceholder: "كلمة المرور",
      confirmPasswordPlaceholder: "تأكيد كلمة المرور",
      agreeTermsText: "أوافق على",
      termsButtonText: "الشروط والأحكام",
      andText: "و",
      privacyPolicyText: "سياسة الخصوصية",
      submitButton: "إنشاء حساب",
      registering: "جارٍ إنشاء الحساب...",
      termsError: "يجب الموافقة على الشروط والأحكام",
    },
    sideImage: {
      heading: "انضم إلى منصتنا كصاحب عمل",
      description: "احصل على إمكانية الوصول إلى آلاف المرشحين المؤهلين",
      features: {
        feature1: "الوصول إلى آلاف المرشحين المؤهلين",
        feature2: "أدوات إدارة التوظيف المتقدمة",
        feature3: "تحليلات ورؤى مفصلة",
      },
      alt: "تسجيل أصحاب العمل",
      loginTextBeforeLink: "هل لديك حساب بالفعل؟",
      loginLinkText: "تسجيل الدخول",
      backToLogin: "العودة إلى تسجيل الدخول",
    },
    errors: {
      nameRequired: "الاسم مطلوب",
      companyNameRequired: "اسم الشركة مطلوب",
      emailInvalid: "البريد الإلكتروني غير صالح",
      phoneRequired: "رقم الهاتف مطلوب",
      phoneInvalid: "رقم الهاتف غير صالح",
      passwordRequired: "كلمة المرور مطلوبة",
      passwordTooShort: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
      passwordMismatch: "كلمات المرور غير متطابقة",
      emailExists: "البريد الإلكتروني مستخدم بالفعل",
      phoneExists: "رقم الهاتف مستخدم بالفعل",
    },
  },

  // Forgot Password Page
  forgotPasswordPage: {
    title: "نسيت كلمة المرور",
    subtitle: "أدخل رقم هاتفك وسنرسل لك رمز إعادة تعيين",
    form: {
      phonePlaceholder: "رقم الهاتف",
      submitButton: "إرسال رمز إعادة التعيين",
      submitting: "جارٍ الإرسال...",
    },
    backToLogin: "العودة إلى تسجيل الدخول",
    success: {
      title: "تم إرسال الرمز",
      message: "تحقق من رسائلك النصية للحصول على رمز إعادة التعيين",
    },
    errors: {
      phoneNotFound: "رقم الهاتف غير مسجل",
      sendFailed: "فشل إرسال الرمز. حاول مرة أخرى",
    },
  },

  // Terms Modal
  termsModal: {
    title: "الشروط والأحكام",
    lastUpdated: "آخر تحديث",
    sections: {
      acceptance: {
        title: "1. قبول الشروط",
        content:
          "باستخدامك لمنصة Foras، فإنك توافق على الالتزام بهذه الشروط والأحكام.",
      },
      services: {
        title: "2. وصف الخدمات",
        content: "توفر Foras منصة للربط بين أصحاب العمل والباحثين عن عمل.",
      },
      accountResponsibilities: {
        title: "3. مسؤوليات الحساب",
        content: "أنت مسؤول عن الحفاظ على سرية حسابك وكلمة المرور.",
      },
      privacy: {
        title: "4. الخصوصية",
        content:
          "نحترم خصوصيتك ونحمي بياناتك وفقاً لسياسة الخصوصية الخاصة بنا.",
      },
      termination: {
        title: "5. إنهاء الخدمة",
        content: "يمكننا إنهاء أو تعليق حسابك في حالة انتهاك هذه الشروط.",
      },
    },
    acceptButton: "أوافق على الشروط",
    declineButton: "رفض",
  },

  // Job Listings Page (Already exists in your ar.ts, keeping as is)
  jobListingsPage: {
    heading: "الوظائف المعلنة",
    searchPlaceholder: "البحث عن وظائف...",
    filterBy: "تصفية حسب",
    sortBy: "ترتيب حسب",
    noJobs: "لا توجد وظائف مدرجة حتى الآن",
    createFirstJob: "أنشئ أول وظيفة لك",
    companyLogoMissing: "لا يوجد شعار للشركة! الرجاء رفع شعار الشركة.",
    uploadLogo: "رفع الشعار",
    uploadModal: {
      title: "رفع شعار الشركة",
      cancel: "إلغاء",
      save: "حفظ",
      loading: "جارٍ التحميل...",
    },
    table: {
      title: "المسمى الوظيفي",
      city: "المكان",
      description: "الوصف",
      salary: "الراتب",
      moreInfo: "معلومات اضافية",
      boost: "تحديث التاريخ",
      status: "حالة الوظيفة",
    },
    boostSuccess: "تم تحديث التاريخ",
    boostFail: "فشل في التحديث",
    fetchError: "خطأ في جلب البيانات",
  },

  // Post Job Page (Already exists in your ar.ts)
  postJobPage: {
    title: "طلب وظيفي",
    languageLabel: "لغة الوظيفة",
    jobTitle: "المسمى الوظيفي",
    jobDescription: "وصف الوظيفة",
    location: "الموقع",
    jobType: "نوع الوظيفة",
    industry: "الصناعة",
    salary: "الراتب",
    qualifications: "المؤهلات المطلوبة",
    jobImage: "صورة الوظيفة",
    jobImageHelper: "الصيغ المقبولة: JPEG, PNG, GIF. الحجم الأقصى: 1MB.",
    transportation: "هل تتوفر وسيلة نقل؟",
    hebrewRequired: "هل يشترط اللغة العبرية؟",
    submitButton: "نشر الوظيفة",
    submitting: "جاري النشر...",
  },

  // Dashboard
  dashboard: {
    title: "لوحة التحكم",
    welcome: "مرحباً",
    overview: "نظرة عامة",
    stats: {
      activeJobs: "الوظائف النشطة",
      totalApplicants: "إجمالي المتقدمين",
      newApplicants: "متقدمون جدد",
      viewsToday: "المشاهدات اليوم",
    },
  },

  // Applicants
  applicants: {
    title: "إدارة المتقدمين",
    searchPlaceholder: "البحث عن متقدمين...",
    noApplicants: "لا يوجد متقدمون حتى الآن",
  },

  // Company Profile
  companyProfile: {
    title: "ملف الشركة",
    editButton: "تعديل الملف",
  },

  // Settings
  settings: {
    title: "الإعدادات",
    sections: {
      account: "إعدادات الحساب",
      notifications: "الإشعارات",
      privacy: "الخصوصية",
      billing: "الفوترة والمدفوعات",
      integrations: "التكاملات",
    },
  },

  // Messages
  messages: {
    title: "الرسائل",
    inbox: "البريد الوارد",
    compose: "إنشاء رسالة",
    noMessages: "لا توجد رسائل",
  },

  jobApplications,
};

export default ar;
