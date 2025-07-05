"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import SignUpModal from "@/components/modals/CandidateSignUpModal";
import SignInModal from "@/components/modals/CandidateSignInModal";
import { useAuth } from "@/context/auth/AuthHooks";

type NavbarProps = {
  variant?: "default" | "transparent";
};

const Navbar: React.FC<NavbarProps> = ({ variant = "default" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses =
    variant === "transparent"
      ? `fixed top-0 z-[99999] w-full transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
        }`
      : "fixed top-0 z-[99999] w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-sm shadow-2xl";

  const textColorClass =
    variant !== "transparent"
      ? "text-white" // always white if not transparent
      : !scrolled
      ? "text-white" // transparent and not scrolled = white
      : "text-slate-800"; // transparent and scrolled = slate (dark)

  return (
    <header dir="rtl" className={navbarClasses}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <h1
                className={`text-4xl font-black ${textColorClass} transition-all duration-300 group-hover:scale-110`}
              >
                فُـرَص
              </h1>
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className={`lg:hidden p-2 left-4 absolute rounded-lg ${textColorClass} border-double border-r-2 hover:bg-white/10 transition-colors`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex items-center space-x-1 mr-8">
              <li>
                <Link
                  href="/"
                  className={`px-4 py-2 rounded-lg ${textColorClass} hover:bg-white/10 transition-all duration-300 hover:scale-105`}
                >
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className={`px-4 py-2 rounded-lg ${textColorClass} hover:bg-white/10 transition-all duration-300 hover:scale-105`}
                >
                  حولنا
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className={`px-4 py-2 rounded-lg ${textColorClass} hover:bg-white/10 transition-all duration-300 hover:scale-105`}
                >
                  تواصل معنا
                </Link>
              </li>
            </ul>

            {/* Auth Section */}
            <div className="flex items-center space-x-4 mr-8">
              {!user ? (
                <>
                  <button
                    onClick={() => setIsSignInOpen(true)}
                    className={`px-4 py-2.5 bg-gradient-to-r from-violet-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 ml-2`}
                  >
                    تسجيل الدخول
                  </button>
                  <button
                    onClick={() => setShowSignUpModal(true)}
                    className={`px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300`}
                  >
                    إنشاء حساب
                  </button>
                  <Link
                    href="/employer/signin"
                    className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 left-4 absolute"
                  >
                    نشر وظيفة
                  </Link>
                </>
              ) : (
                <div className="relative group">
                  <button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${textColorClass} hover:bg-white/10 transition-all duration-300`}
                  >
                    <User size={20} />
                    <span>{user.name || "المستخدم"}</span>
                    <ChevronDown
                      size={16}
                      className="group-hover:rotate-180 transition-transform duration-300"
                    />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <Link
                      href={
                        user.type === "candidate"
                          ? "/candidate/profile"
                          : user.type === "employer"
                          ? "/employer/dashboard"
                          : "/admin/dashboard"
                      }
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      حسابي
                    </Link>
                    {user.type === "candidate" && (
                      <>
                        <Link
                          href="/candidate/applied-jobs"
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          الوظائف المتقدم لها
                        </Link>
                        <Link
                          href="/candidate/saved-jobs"
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          الوظائف المحفوظة
                        </Link>
                      </>
                    )}
                    <button
                      onClick={signout}
                      className="w-full text-right px-4 py-3 text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu - Always white */}
        <div
          className={`lg:hidden fixed inset-0 top-20 bg-white backdrop-blur-lg transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col p-6 space-y-4 bg-white">
            <li>
              <Link
                href="/"
                className="block py-3 text-gray-800 hover:text-cyan-600 transition-colors"
              >
                الصفحة الرئيسية
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className="block py-3 text-gray-800 hover:text-cyan-600 transition-colors"
              >
                حولنا
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="block py-3 text-gray-800 hover:text-cyan-600 transition-colors"
              >
                تواصل معنا
              </Link>
            </li>
            {!user ? (
              <>
                <li>
                  <button
                    onClick={() => {
                      setIsSignInOpen(true);
                      setIsOpen(false);
                    }}
                    className="w-full py-3 text-gray-800 hover:text-cyan-600 transition-colors text-right"
                  >
                    تسجيل الدخول
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setShowSignUpModal(true);
                      setIsOpen(false);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg"
                  >
                    إنشاء حساب
                  </button>
                </li>
                <li>
                  <Link
                    href="/employer/signin"
                    className="block py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg text-center"
                  >
                    نشر وظيفة
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href={
                      user.type === "candidate"
                        ? "/candidate/profile"
                        : user.type === "employer"
                        ? "/employer/profile"
                        : "/admin/dashboard"
                    }
                    className="block py-3 text-gray-800 hover:text-cyan-600 transition-colors"
                  >
                    حسابي
                  </Link>
                </li>
                {user.type === "candidate" && (
                  <>
                    <Link
                      href="/candidate/applied-jobs"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      الوظائف المتقدم لها
                    </Link>
                    <Link
                      href="/candidate/saved-jobs"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      الوظائف المحفوظة
                    </Link>
                  </>
                )}
                <li>
                  <button
                    onClick={signout}
                    className="w-full py-3 text-red-600 hover:text-red-700 transition-colors text-right"
                  >
                    تسجيل الخروج
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <SignUpModal
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
      />
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
    </header>
  );
};

export default Navbar;
