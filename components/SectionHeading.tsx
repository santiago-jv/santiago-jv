import { SectionHeadingContent } from '@/types/portfolio';
import styles from './section-heading.module.css';

interface SectionHeadingProps {
  content: SectionHeadingContent;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ content }) => {
  return (
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionNumber}>{content.number}</span>
        {content.title}
      </h2>
      {content.subtitle && <h3 className={styles.sectionSubtitle}>{content.subtitle}</h3>}
      {content.description && <p className={styles.sectionDescription}>{content.description}</p>}
    </div>
  );
};

export default SectionHeading;
