// components/auth/SignupSideImage.tsx
import Link from "next/link";
import Image from "next/image";

const SignupSideImage = () => (
  <div className="hidden md:flex flex-col justify-between text-center p-10 rounded-r-xl">
    <div>
      <h2 className="text-2xl font-bold mb-4">انضم إلى منصتنا كصاحب عمل</h2>
      <p className="text-sm">قم بإنشاء حساب جديد للوصول إلى قاعدة بيانات الباحثين عن عمل.</p>
    </div>
    <div>
      <Image src="/images/employer/signup-image.jpg" width={300} height={200} alt="تسجيل أصحاب العمل" />
      <p className="mt-4 text-sm">
        هل لديك حساب؟{" "}
        <Link href="/employer/signin" className="text-blue-600 underline">
          تسجيل الدخول
        </Link>
      </p>
    </div>
  </div>
);

export default SignupSideImage;
