import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Heart,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              فُرَص
            </h3>
            <p className="text-gray-400 leading-relaxed">
              منصة متقدمة تجمع بين الباحثين عن وظائف وأرباب العمل، نسعى لتوفير
              فرص مهنية متميزة وبناء مستقبل واعد.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-cyan-500 transition-all duration-300 group"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-all duration-300 group"
              >
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-pink-500 transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-cyan-400 rounded-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-cyan-400 rounded-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-cyan-400 rounded-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  تواصل معنا
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-cyan-400 rounded-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  سياسة الخصوصية
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              معلومات التواصل
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-medium">العنوان</p>
                  <p className="text-gray-400">بن يهودا 34، القدس</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">الهاتف</p>
                  <p className="text-gray-400 ltr">+972 546 735 926</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium">البريد الإلكتروني</p>
                  <a
                    href="mailto:info@foras.co.il"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    info@foras.co.il
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              النشرة البريدية
            </h4>
            <p className="text-gray-400">
              اشترك للحصول على آخر الوظائف والأخبار
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all duration-300 placeholder-gray-500"
                dir="rtl"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300"
              >
                اشترك الآن
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 فُرَص. جميع الحقوق محفوظة
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              صُنع بـ{" "}
              <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse" /> في
              القدس
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
