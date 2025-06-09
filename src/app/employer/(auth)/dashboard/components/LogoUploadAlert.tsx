'use client';

import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

type LogoUploadAlertProps = {
    lang: 'ar' | 'he';
};

const LogoUploadAlert: React.FC<LogoUploadAlertProps> = ({ lang }) => {
    const [showModal, setShowModal] = useState(false);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setLogoFile(file);
    };

    const handleUpload = async () => {
        if (!logoFile) {
            toast.error(lang === 'ar' ? 'الرجاء اختيار ملف.' : 'אנא בחר קובץ.');
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('logo', logoFile);

            const response = await axios.post('/api/employer/upload-logo', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            if (response.status === 200) {
                toast.success(lang === 'ar' ? 'تم رفع الشعار بنجاح!' : 'הלוגו הועלה בהצלחה!');
                setShowModal(false);
                setLogoFile(null);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error(lang === 'ar' ? 'فشل في رفع الشعار.' : 'העלאת הלוגו נכשלה.');
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
                <div className="flex items-center justify-between">
                    <p className="text-blue-700 font-medium">
                        {lang === 'ar'
                            ? 'لا يوجد شعار للشركة! الرجاء رفع شعار الشركة.'
                            : 'אין לוגו לחברה! אנא העלה לוגו לחברה.'}
                    </p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-1 px-3 rounded text-sm shadow-md transition-colors"
                    >
                        {lang === 'ar' ? 'رفع الشعار' : 'העלאת הלוגו'}
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
                        <h2 className="text-xl font-bold mb-4">
                            {lang === 'ar' ? 'رفع شعار الشركة' : 'העלאת לוגו החברה'}
                        </h2>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full mb-4"
                        />

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                {lang === 'ar' ? 'إلغاء' : 'ביטול'}
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={loading}
                                className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded disabled:opacity-60"
                            >
                                {loading
                                    ? lang === 'ar' ? 'جارٍ التحميل...' : 'טוען...'
                                    : lang === 'ar' ? 'حفظ' : 'שמור'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LogoUploadAlert;
