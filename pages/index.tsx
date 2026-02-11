import Container from "@/components/Container";
import Header from "@/layout/header/Header";
import MainContent from "@/layout/header/mainContent/MainContent";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { SEO } from "@/data/portfolio-content";
import "animate.css"

const Home: React.FC = () => {
	return (
		<Container title={SEO.title}>
			<Header />
			<MainContent />
			<ProjectsSection />
			<ContactSection />
			<Footer />
		</Container>
	)
}

export default Home;
