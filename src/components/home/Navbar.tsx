'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
    isAuthenticated: boolean;
    userType: 'user' | 'employer' | 'admin' | null;
    userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, userType, userName }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header dir="rtl" className="absolute z-[99999] w-full h-20 bg-transparent transition-all">
            <nav className="px-4 lg:px-10 py-4 flex items-center justify-between">
                <h1 className="text-3xl lg:text-4xl font-extrabold text-white ml-16">فُـرَص</h1>
                <button onClick={toggleMenu} className="top-5 h-9 border min-h-[fit-content] border-blue text-cadetblue rounded-md p-2 lg:hidden">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={` lg:flex flex-col lg:flex-row items-center w-1/3 lg:w-full lg:static absolute top-20 left-2 bg-white shadow-lg lg:shadow-none lg:bg-transparent overflow-hidden transition-all duration-1000 ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
                    <ul className="flex flex-col lg:flex-row w-full text-center lg:text-right">
                        {isAuthenticated ? (
                            <>
                                <li className="relative group">
                                    <button className="nav-link px-4 py-2 font-medium text-white lg:text-white">
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
                                            className="block px-4 py-2 hover:bg-gray-100 text-black lg:text-white"
                                        >
                                            لوحة التحكم
                                        </Link>
                                        {userType === 'user' && (
                                            <>
                                                <Link href="/user/applied-jobs" className="block px-4 py-2 hover:bg-gray-100 text-black lg:text-white">
                                                    الوظائف المتقدم لها
                                                </Link>
                                                <Link href="/user/saved-jobs" className="block px-4 py-2 hover:bg-gray-100 text-black lg:text-white">
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
                                        onClick={() => console.log('Open signup modal')}
                                    >
                                        اشتراك
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="bg-gray-600 text-white rounded px-4 py-2 m-1"
                                        onClick={() => console.log('Open signin modal')}
                                    >
                                        تسجيل دخول
                                    </button>
                                </li>
                            </>
                        )}
                        <li className="mx-[15px]">
                            <Link
                                href="/" className="nav-link px-4 py-4 font-medium block lg:flex text-black lg:text-white">
                                الصفحة الرئيسية
                            </Link>
                        </li>

                        <li>
                            <Link href="/about-us" className="nav-link px-4 py-4 font-medium block lg:flex text-black lg:text-white">
                                حولنا
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="nav-link px-4 py-4 font-medium block lg:flex text-black lg:text-white">
                                تواصل معنا
                            </Link>
                        </li>
                        {!isAuthenticated && (
                            <li>
                                <Link href="/employer/signin" className="absolute left-10 bg-[#41ae9d] text-white py-4 px-8 rounded-full font-medium">
                                    نشر وظيفة
                                </Link>
                            </li>
                        )}

                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
