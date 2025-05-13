import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faWhatsapp, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import '@fortawesome/fontawesome-free/css/all.css';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-600 shadow-md text-left py-12 px-8 text-white text-sm">
      <div className="flex flex-col sm:flex-row justify-between flex-wrap">

        {/* Footer Left */}
        <div className="sm:w-2/5 mb-8 sm:mb-0">
          <h3 className="text-3xl font-normal text-white mb-4">
            Foras
          </h3>
            <p className="mb-4">
            <Link href="/" className="hover:text-teal-400">الصفحة الرئيسية | </Link>
            <Link href="/about-us" className="hover:text-teal-400">حولنا | </Link>
            <Link href="/contact" className="hover:text-teal-400">تواصل معنا</Link>
          </p>
          <p className="text-gray-300">Foras © 2025</p>
        </div>

        {/* Footer Center */}
        <div className="sm:w-2/5 mb-8 sm:mb-0">
          <div className="flex items-center mb-4">
            <div className="bg-gray-800 text-white rounded-full w-10 h-10 flex justify-center items-center mr-3">
            <i className="fa fa-map-marker"></i>
            </div>
            <p><span className="block font-bold">בן יהודה 34</span>Jerusalem</p>
          </div>

          <div className="flex items-center mb-4">
            <div className="bg-gray-800 text-white rounded-full w-10 h-10 flex justify-center items-center mr-3">
              <i className="fa fa-phone"></i>
            </div>
            <p>+972 546 735 926</p>
          </div>

          <div className="flex items-center mb-4">
            <div className="bg-gray-800 text-white rounded-full w-10 h-10 flex justify-center items-center mr-3">
              <i className="fa fa-envelope"></i>
            </div>
            <p><a href="mailto:support@company.com" className="hover:text-teal-400">support@company.com</a></p>
          </div>
        </div>

        {/* Footer Right */}
        <div className="sm:w-1/5">
          <p className="text-gray-300 mb-4 leading-6">
            <span className="text-white text-right font-bold block mb-2">عن الشركة</span>
            نقدم منصتنا كجسر متقدم يجمع بين الباحثين عن وظائف وأرباب العمل. في قلب مهمتنا، نسعى لتوفير فرص مهنية متميزة ولبناء جسور قوية تؤدي إلى مستقبل واعد. انضموا إلينا في رحلة اكتشاف الفرص وبناء مسارات وظيفية ناجحة.
          </p>
          <div className="flex space-x-2">
          <a href="#" className="bg-gray-800 w-9 h-9 rounded-full flex justify-center items-center hover:bg-teal-400" aria-label="GitHub">
            <FontAwesomeIcon icon={faWhatsapp} /> 
            </a>
            <a href="#" className="bg-gray-800 w-9 h-9 rounded-full flex justify-center items-center hover:bg-teal-400" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebook} /> 
            </a>
            <a href="#" className="bg-gray-800 w-9 h-9 rounded-full flex justify-center items-center hover:bg-teal-400" aria-label="Twitter">
            <FontAwesomeIcon icon={faInstagram} /> 
            </a>
            <a href="#" className="bg-gray-800 w-9 h-9 rounded-full flex justify-center items-center hover:bg-teal-400" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faTiktok} /> 
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
