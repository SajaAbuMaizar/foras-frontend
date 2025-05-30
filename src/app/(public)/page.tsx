import Banner from '../../components/home/Banner';
import EmployerCarousel from '@/app/(public)/components/CompanyLogoCarousel';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Banner / >
      < EmployerCarousel logos={[]} />
    </main>
  );
}