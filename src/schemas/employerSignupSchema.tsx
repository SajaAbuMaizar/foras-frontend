import * as yup from "yup";

export const employerSignupSchema = yup.object({
  name: yup.string().required("الاسم الكامل مطلوب"),
  companyName: yup.string().required("اسم الشركة مطلوب"),
  email: yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
  phone: yup.string().required("رقم الهاتف مطلوب"),
  password: yup.string().required("كلمة المرور مطلوبة"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "كلمات المرور غير متطابقة")
    .required("تأكيد كلمة المرور مطلوب"),
  agreeTerms: yup.boolean().oneOf([true], "يجب الموافقة على الشروط والأحكام").required(),
});