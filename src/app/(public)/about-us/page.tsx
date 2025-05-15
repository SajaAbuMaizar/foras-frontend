import PageHeader from './components/PageHeader';
import AboutSection from './components/AboutSection';
import ExtraTextSection from './components/ExtraTextSection';

export const generateMetadata = () => ({
  title: 'حولنا - فرصة',
  description: 'تعرف على رؤية ورسالة منصة فرصة للتوظيف.',
});

const AboutUsPage = () => {
  return (
    <main dir="rtl" className="text-black">
      <PageHeader
        title="فرص"
        subtitle="حولنا"
        backgroundImage="/images/public-heading.jpg"
      />
      <AboutSection />
      <ExtraTextSection />
    </main>
  );
};

export default AboutUsPage;
