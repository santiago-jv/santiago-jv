import { SectionHeadingContent } from '@/types/portfolio';
import styles from './section-heading.module.css';

interface SectionHeadingProps {
  content: SectionHeadingContent;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ content }) => {
  return (
    <div className={styles.sectionHeader} data-apple-reveal>
      <p className={styles.eyebrow}>{content.title}</p>
      {content.subtitle && <h2 className={styles.headline}>{content.subtitle}.</h2>}
      {content.description && <p className={styles.description}>{content.description}</p>}
    </div>
  );
};

export default SectionHeading;
