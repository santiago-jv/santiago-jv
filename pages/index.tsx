import Container from '@/components/Container';
import Header from '@/layout/header/Header';
import MainContent from '@/layout/header/mainContent/MainContent';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { usePreferences } from '@/context/PreferencesContext';
import { useApplePageMotion } from '@/hooks/useAppleMotion';

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
