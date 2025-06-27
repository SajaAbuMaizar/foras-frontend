import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/language/LanguageContext";
import ar from "@/translations/ar";
import he from "@/translations/he";

const SignupSideImage = () => {
  const { lang } = useLanguage();
  const t = lang === "ar" ? ar.signupPage.sideImage : he.signupPage.sideImage;

  return (
    <div className="hidden md:flex flex-col justify-between text-center p-10 rounded-r-xl">
      <div>
        <h2 className="text-2xl font-bold mb-4">{t.heading}</h2>
        <p className="text-sm">{t.description}</p>
      </div>
      <div>
        <Image
          src="/images/employer/signup-image.jpg"
          width={300}
          height={200}
          alt={t.alt}
        />
        <p className="mt-4 text-sm">
          {t.loginTextBeforeLink}{" "}
          <Link href="/employer/signin" className="text-blue-600 underline">
            {t.loginLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupSideImage;
