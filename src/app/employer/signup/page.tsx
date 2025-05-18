// app/employer/signup/page.tsx
import EmployerSignupForm from "./components/EmployerSignupForm";
import SignupSideImage from "./components/SignupSideImage";

const EmployerSignupPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4">
    <div className="bg-white rounded-xl shadow-md w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">تسجيل أصحاب العمل</h1>
        <EmployerSignupForm />
      </div>
      <SignupSideImage />
    </div>
  </div>
);

export default EmployerSignupPage;
