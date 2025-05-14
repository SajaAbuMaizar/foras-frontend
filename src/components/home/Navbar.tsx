'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import SignUpModal from './SignUpModal';
import SignInModal from './SignInModal';

interface NavbarProps {
    isAuthenticated: boolean;
    userType: 'user' | 'employer' | 'admin' | null;
    userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, userType, userName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            dir="rtl"
            className={`fixed top-0 z-[99999] w-full h-20 transition-all duration-300 ${
                scrolled ? 'lg:bg-white lg:shadow-md' : 'bg-transparent'
            }`}
        >
            <nav className="px-4 lg:px-10 py-4 flex items-center justify-between">
                <h1 className={`text-3xl lg:text-4xl font-extrabold ml-16 transition-colors ${scrolled ? 'text-black' : 'text-white'}`}>
                    فُـرَص
                </h1>
                <button
                    onClick={toggleMenu}
                    className="top-5 h-9 border min-h-[fit-content] border-blue text-cadetblue rounded-md p-2 lg:hidden"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div
                    className={`flex-col items-center w-1/3 lg:w-full absolute top-20 left-2 lg:static ${
                        scrolled ? 'bg-white' : 'bg-white lg:bg-transparent'
                    } shadow-lg lg:shadow-none overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen ? 'max-h-[1000px]' : 'max-h-0'
                    } lg:max-h-none lg:flex lg:flex-row`}
                >
                    <ul className="flex flex-col lg:flex-row w-full text-center lg:text-right">
                        {isAuthenticated ? (
                            <>
                                <li className="relative group">
                                    <button className={`nav-link px-4 py-2 font-medium ${scrolled ? 'text-black' : 'text-white'} lg:text-white`}>
                                        مرحباً، {userName || 'المستخدم'}
                                    </button>
                                    <div className="absolute hidden group-hover:block right-0 mt-2 w-48 bg-white border rounded shadow-md">
                                        <Link
                                            href={
                                                userType === 'user'
                                                    ? '/user/profile'
                                                    : userType === 'employer'
                                                    ? '/employer/dashboard'
                                                    : '/admin/dashboard'
                                            }
                                            className="block px-4 py-2 hover:bg-gray-100 text-black"
                                        >
                                            لوحة التحكم
                                        </Link>
                                        {userType === 'user' && (
                                            <>
                                                <Link href="/user/applied-jobs" className="block px-4 py-2 hover:bg-gray-100 text-black">
                                                    الوظائف المتقدم لها
                                                </Link>
                                                <Link href="/user/saved-jobs" className="block px-4 py-2 hover:bg-gray-100 text-black">
                                                    الوظائف المحفوظة
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </li>
                                <li className="bg-[#BC2009] m-1 rounded">
                                    <Link href="/signoff" className="block px-4 py-2 text-white font-medium">
                                        تسجيل الخروج
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <button
                                        className="bg-blue-600 text-white rounded px-4 py-2 m-1"
                                        onClick={() => {
                                            setIsOpen(false);
                                            setShowSignUpModal(true);
                                        }}
                                    >
                                        اشتراك
                                    </button>
                                </li>

                                <li>
                                    <button
                                        className="bg-gray-600 text-white rounded px-4 py-2 m-1"
                                        onClick={() => setIsSignInOpen(true)}
                                    >
                                        تسجيل دخول
                                    </button>
                                </li>
                            </>
                        )}
                        <li className="mx-[15px]">
                            <Link href="/" className={`nav-link px-4 py-4 font-medium block lg:flex ${scrolled ? 'text-black' : 'text-white'}`}>
                                الصفحة الرئيسية
                            </Link>
                        </li>
                        <li>
                            <Link href="/about-us" className={`nav-link px-4 py-4 font-medium block lg:flex ${scrolled ? 'text-black' : 'text-white'}`}>
                                حولنا
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className={`nav-link px-4 py-4 font-medium block lg:flex ${scrolled ? 'text-black' : 'text-white'}`}>
                                تواصل معنا
                            </Link>
                        </li>
                        {!isAuthenticated && (
                            <li>
                                <Link
                                    href="/employer/signin"
                                    className="static lg:absolute left-10 bg-[#41ae9d] text-white py-4 px-8 rounded-full font-medium"
                                >
                                    نشر وظيفة
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
            <SignUpModal isOpen={showSignUpModal} onClose={() => setShowSignUpModal(false)} />
            <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
        </header>
    );
};

export default Navbar;
