import LoginForm from './components/LoginForm';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-indigo-600 px-4">
      <div className="bg-white rounded-xl flex flex-col md:flex-row overflow-hidden max-w-5xl w-full shadow-lg p-8 md:p-0">
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
          <img
            src="/images/login-admin.png"
            alt="Admin Login"
            className="max-w-full"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
