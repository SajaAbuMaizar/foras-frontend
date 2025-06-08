// components/LogoUploadAlert.tsx
import React from 'react';

type LogoUploadAlertProps = {
  lang: 'ar' | 'he';
};

const LogoUploadAlert: React.FC<LogoUploadAlertProps> = ({ lang }) => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
        <div className="flex items-center justify-between">
          <p className="text-blue-700 font-medium">
            {lang === 'ar' ? 'لا يوجد شعار للشركة! الرجاء رفع شعار الشركة.' : 'אין לוגו לחברה! אנא העלה לוגו לחברה.'}
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-1 px-3 rounded text-sm shadow-md transition-colors"
          >
            {lang === 'ar' ? 'رفع الشعار' : 'העלאת הלוגו'}
          </button>
        </div>
      </div>

      {/* Modal would be implemented here */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {lang === 'ar' ? 'رفع شعار الشركة' : 'העלאת לוגו החברה'}
            </h2>
            {/* Upload form would go here */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                {lang === 'ar' ? 'إلغاء' : 'ביטול'}
              </button>
              <button
                className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded"
              >
                {lang === 'ar' ? 'حفظ' : 'שמור'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoUploadAlert;