import dynamic from 'next/dynamic';
import Container from '@/components/Container';
import Header from '@/layout/header/Header';
import MainContent from '@/layout/header/mainContent/MainContent';
import { usePreferences } from '@/context/PreferencesContext';
import { useApplePageMotion } from '@/hooks/useAppleMotion';

const ExperienceSection = dynamic(() => import('@/components/ExperienceSection'), { ssr: true });
const ProjectsSection = dynamic(() => import('@/components/ProjectsSection'), { ssr: true });
const ContactSection = dynamic(() => import('@/components/ContactSection'), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });

const Home: React.FC = () => {
  const { locale, content } = usePreferences();
  useApplePageMotion(locale);

  return (
    <Container title={content.seo.title}>
      <Header />
      <MainContent />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </Container>
  );
};

export default Home;
