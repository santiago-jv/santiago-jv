import React, { CSSProperties, useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import PortfolioIcon from '@/components/PortfolioIcon';
import { usePreferences } from '@/context/PreferencesContext';
import {
  MCP_CONTENT,
  MCP_DOCS_URL,
  MCP_ENDPOINT_URL,
  MCP_GATEWAY_URL,
} from '@/data/mcp-content';
import { handleAppleCardSpotlight } from '@/hooks/useAppleMotion';
import styles from './mcp-showcase-section.module.css';

const McpShowcaseSection: React.FC = () => {
  const { locale } = usePreferences();
  const copy = MCP_CONTENT[locale].showcase;

  const [activeTab, setActiveTab] = useState<'recruiter' | 'engineering'>('recruiter');
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const preview =
    activeTab === 'recruiter' ? copy.recruiterPreview : copy.engineeringPreview;

  const handleCopyEndpoint = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(MCP_ENDPOINT_URL);
      setCopiedEndpoint(true);
      window.setTimeout(() => setCopiedEndpoint(false), 1800);
    } catch {
      // Ignore clipboard failures in restricted contexts
    }
  };

  const handleCopyPrompt = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(preview.copyPrompt);
      setCopiedPrompt(true);
      window.setTimeout(() => setCopiedPrompt(false), 2000);
    } catch {
      // Ignore clipboard failures in restricted contexts
    }
  };

  return (
    <section id="mcp" className={styles.mcpSection}>
      <div className={styles.container}>
        <SectionHeading
          content={{
            number: '03.',
            title: copy.eyebrow,
            subtitle: copy.subtitle,
            description: copy.description,
          }}
        />

        <div className={styles.showcaseGrid}>
          {/* Left: Signature Anodized Space Black Pro MCP Console */}
          <div
            className={styles.consoleCard}
            data-apple-reveal
            onMouseMove={handleAppleCardSpotlight}
          >
            <div className={styles.consoleInner}>
              <div className={styles.consoleHeader}>
                <div className={styles.windowLights} aria-hidden="true">
                  <span className={styles.lightDot} />
                  <span className={styles.lightDot} />
                  <span className={styles.lightDot} />
                </div>

                <a href={MCP_GATEWAY_URL} className={styles.hostBadge}>
                  mcp.santiago-jv.tech
                </a>

                <span className={styles.livePill}>
                  <span className={styles.livePulse} aria-hidden="true" />
                  <span>{copy.liveStatusLabel}</span>
                </span>
              </div>

              <div className={styles.endpointBox}>
                <div className={styles.endpointMeta}>
                  <span className={styles.endpointEyebrow}>{copy.endpointLabel}</span>
                  <code className={styles.endpointCode}>{MCP_ENDPOINT_URL}</code>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEndpoint}
                  className={styles.copyEndpointBtn}
                >
                  <PortfolioIcon name={copiedEndpoint ? 'fa-check' : 'fa-copy'} />
                  <span>{copiedEndpoint ? copy.copiedLabel : copy.copyUrlLabel}</span>
                </button>
              </div>

              <div className={styles.segmentedBar} role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'recruiter'}
                  className={`${styles.segmentBtn} ${activeTab === 'recruiter' ? styles.segmentBtnActive : ''}`}
                  onClick={() => setActiveTab('recruiter')}
                >
                  {copy.tabs.recruiter}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'engineering'}
                  className={`${styles.segmentBtn} ${activeTab === 'engineering' ? styles.segmentBtnActive : ''}`}
                  onClick={() => setActiveTab('engineering')}
                >
                  {copy.tabs.engineering}
                </button>
              </div>

              <div className={styles.terminalViewport}>
                <div className={styles.commandLine}>
                  <span className={styles.promptArrow} aria-hidden="true">
                    ❯
                  </span>
                  <code className={styles.commandCode}>{preview.command}</code>
                </div>

                <div className={styles.responseCard}>
                  <div className={styles.responseTop}>
                    <span className={styles.scoreBadge}>{preview.scoreBadge}</span>
                    <span className={styles.verdictText}>{preview.verdict}</span>
                  </div>

                  <p className={styles.responseSummary}>{preview.summary}</p>

                  <ul className={styles.matchedPillsList}>
                    {preview.matchedPills.map((pill) => (
                      <li key={pill} className={styles.matchedPill}>
                        {pill}
                      </li>
                    ))}
                  </ul>

                  <p className={styles.footnoteText}>{preview.footnote}</p>
                </div>
              </div>

              <div className={styles.consoleActions}>
                <a href={MCP_DOCS_URL} className={styles.primaryDocsBtn}>
                  <span>{copy.primaryCta}</span>
                  <span aria-hidden="true">›</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className={styles.secondaryPromptBtn}
                >
                  <PortfolioIcon name={copiedPrompt ? 'fa-check' : 'fa-copy'} />
                  <span>{copiedPrompt ? copy.secondaryCopiedLabel : preview.copyCtaLabel}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: 3 Daylight Value Proposition Cards */}
          <div className={styles.valueStack}>
            {copy.valueCards.map((card, index) => (
              <article
                key={card.title}
                className={styles.valueCard}
                data-apple-reveal
                style={{ '--reveal-delay': `${(index + 1) * 90}ms` } as CSSProperties}
                onMouseMove={handleAppleCardSpotlight}
              >
                <div className={styles.valueCardTop}>
                  <div className={styles.valueIconSquircle} aria-hidden="true">
                    <PortfolioIcon name={card.icon} />
                  </div>
                  <span className={styles.valueEyebrow}>{card.eyebrow}</span>
                </div>

                <h3 className={styles.valueTitle}>{card.title}</h3>
                <p className={styles.valueDescription}>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default McpShowcaseSection;
