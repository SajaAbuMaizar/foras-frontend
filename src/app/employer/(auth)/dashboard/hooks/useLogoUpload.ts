'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export function useLogoUploader(lang: 'ar' | 'he', onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);

  const uploadLogo = async (file: File | null) => {
    if (!file) {
      toast.error(lang === 'ar' ? 'الرجاء اختيار ملف.' : 'אנא בחר קובץ.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('logo', file);

      const res = await axios.post('/api/employer/upload-logo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success(lang === 'ar' ? 'تم رفع الشعار بنجاح!' : 'הלוגו הועלה בהצלחה!');
        onSuccess?.();
      }
    } catch (err) {
      console.error('Upload failed:', err);
      toast.error(lang === 'ar' ? 'فشل في رفع الشعار.' : 'העלאת הלוגו נכשלה.');
    } finally {
      setLoading(false);
    }
  };

  return { uploadLogo, loading };
}
