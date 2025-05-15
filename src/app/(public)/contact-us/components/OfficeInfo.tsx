import { FaFacebook, FaTwitter, FaLinkedin, FaBehance } from 'react-icons/fa';

const OfficeInfo = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h4 className="text-xl font-semibold mb-4">عن مكتبنا</h4>
    <p className="mb-4 text-sm leading-relaxed">
      نقدم لكم منصة الوظائف الخاصة بنا، حيث نربط بين المواهب والفرص المهنية بشكل فعّال.
      نحن هنا لتسهيل رحلتكم في العثور على الوظيفة المثلى وبناء مستقبل وظيفي ناجح.
    </p>
    <div className="flex gap-4 mt-4 text-blue-600 text-xl">
      <a href="#"><FaFacebook /></a>
      <a href="#"><FaTwitter /></a>
      <a href="#"><FaLinkedin /></a>
      <a href="#"><FaBehance /></a>
    </div>
  </div>
);

export default OfficeInfo;
