import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Container from '@/components/Container';
import Header from '@/layout/header/Header';
import Footer from '@/components/Footer';
import PortfolioIcon from '@/components/PortfolioIcon';
import { usePreferences } from '@/context/PreferencesContext';
import { useApplePageMotion, handleAppleCardSpotlight } from '@/hooks/useAppleMotion';
import {
  MCP_CONTENT,
  MCP_ENDPOINT_URL,
  MCP_HEALTH_URL,
  McpClientSetupTab,
  runBrowserVacancyPreview,
} from '@/data/mcp-content';
import styles from '@/styles/mcp-docs.module.css';

const McpDocsPage: React.FC = () => {
  const { locale } = usePreferences();
  useApplePageMotion(`mcp-docs-${locale}`);

  const docs = MCP_CONTENT[locale].docs;
  const presets = docs.recruiterSection.simulator.presets;

  const [edgeStatus, setEdgeStatus] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<McpClientSetupTab['id']>('cursor');

  const [simRole, setSimRole] = useState<string>(presets[0].role);
  const [simJd, setSimJd] = useState<string>(presets[0].jd);

  useEffect(() => {
    setSimRole(presets[0].role);
    setSimJd(presets[0].jd);
  }, [locale, presets]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 3200);

    fetch(MCP_HEALTH_URL, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { status?: string; edgeColo?: string; version?: string } | null) => {
        if (data?.status === 'operational') {
          const colo = data.edgeColo ? ` (${data.edgeColo})` : '';
          setEdgeStatus(`${docs.statusOperational}${colo} · v${data.version || '1.0.0'}`);
        }
      })
      .catch(() => {
        // Fallback smoothly if DNS is not pointed yet or offline
      })
      .finally(() => window.clearTimeout(timer));

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [docs.statusOperational]);

  const copyText = async (key: string, value: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current));
      }, 1900);
    } catch {
      // Ignore clipboard restrictions
    }
  };

  const activeClientTab =
    docs.setupSection.clients.find((c) => c.id === selectedClient) ||
    docs.setupSection.clients[0];

  const simResult = runBrowserVacancyPreview(simRole, simJd, locale);

  return (
    <Container title={docs.seoTitle}>
      <Header />

      <main className={styles.pageMain}>
        {/* 1. Hero & Endpoint Dock */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.topBar}>
              <Link href="/" className={styles.backLink}>
                <span aria-hidden="true">‹</span>
                <span>{docs.backToPortfolio}</span>
              </Link>

              <span className={styles.statusPill}>
                <span className={styles.statusDot} aria-hidden="true" />
                <span>{edgeStatus || docs.statusChecking}</span>
              </span>
            </div>

            <h1 className={styles.heroTitle}>{docs.heroTitle}</h1>
            <p className={styles.heroSubtitle}>{docs.heroSubtitle}</p>

            <div className={styles.endpointDock} onMouseMove={handleAppleCardSpotlight}>
              <div className={styles.dockHeader}>
                <span className={styles.dockCaption}>{docs.endpointCaption}</span>
              </div>

              <div className={styles.dockUrlRow}>
                <code className={styles.dockUrl}>{MCP_ENDPOINT_URL}</code>
                <button
                  type="button"
                  onClick={() => copyText('endpoint', MCP_ENDPOINT_URL)}
                  className={styles.dockCopyBtn}
                >
                  <PortfolioIcon name={copiedKey === 'endpoint' ? 'fa-check' : 'fa-copy'} />
                  <span>{copiedKey === 'endpoint' ? docs.copied : docs.copyEndpoint}</span>
                </button>
              </div>

              <ul className={styles.specBadgesList}>
                {docs.specBadges.map((badge) => (
                  <li key={badge} className={styles.specBadge}>
                    {badge}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 2. Recruiter Playbook + Interactive Vacancy Match Simulator */}
        <section className={styles.sectionStone}>
          <div className={styles.container}>
            <div className={styles.sectionHeader} data-apple-reveal>
              <p className={styles.eyebrow}>{docs.recruiterSection.eyebrow}</p>
              <h2 className={styles.headline}>{docs.recruiterSection.headline}.</h2>
              <p className={styles.description}>{docs.recruiterSection.description}</p>
            </div>

            <div className={styles.stepsGrid}>
              {docs.recruiterSection.steps.map((s) => (
                <article
                  key={s.step}
                  className={styles.stepCard}
                  data-apple-reveal
                  onMouseMove={handleAppleCardSpotlight}
                >
                  <span className={styles.stepNum}>{s.step}</span>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepDetail}>{s.detail}</p>
                </article>
              ))}
            </div>

            <div className={styles.recruiterSplit}>
              {/* Left: Ready-to-copy Recruiter Prompt */}
              <article className={styles.promptCard} data-apple-reveal>
                <div className={styles.cardHeaderRow}>
                  <div>
                    <h3 className={styles.cardTitle}>{docs.recruiterSection.promptCardTitle}</h3>
                    <p className={styles.cardSubtext}>
                      {docs.recruiterSection.promptCardSubtitle}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyText('recruiter-prompt', docs.recruiterSection.promptTemplate)
                    }
                    className={styles.darkPillBtn}
                  >
                    <PortfolioIcon
                      name={copiedKey === 'recruiter-prompt' ? 'fa-check' : 'fa-copy'}
                    />
                    <span>
                      {copiedKey === 'recruiter-prompt'
                        ? docs.copied
                        : docs.recruiterSection.copyPromptBtn}
                    </span>
                  </button>
                </div>

                <pre className={styles.promptPre}>
                  <code>{docs.recruiterSection.promptTemplate}</code>
                </pre>
              </article>

              {/* Right: Live Browser Vacancy Match Simulator */}
              <article className={styles.simulatorCard} data-apple-reveal>
                <div className={styles.simTop}>
                  <h3 className={styles.cardTitle}>
                    {docs.recruiterSection.simulator.title}
                  </h3>
                  <p className={styles.cardSubtext}>
                    {docs.recruiterSection.simulator.subtitle}
                  </p>
                </div>

                <div className={styles.presetRow}>
                  <span className={styles.presetLabel}>
                    {docs.recruiterSection.simulator.presetsLabel}
                  </span>
                  <div className={styles.presetButtons}>
                    {presets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setSimRole(preset.role);
                          setSimJd(preset.jd);
                        }}
                        className={`${styles.presetChip} ${
                          simRole === preset.role ? styles.presetChipActive : ''
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.simInputs}>
                  <input
                    type="text"
                    value={simRole}
                    onChange={(e) => setSimRole(e.target.value)}
                    placeholder={docs.recruiterSection.simulator.rolePlaceholder}
                    className={styles.simInput}
                    aria-label={docs.recruiterSection.simulator.rolePlaceholder}
                  />
                  <textarea
                    rows={4}
                    value={simJd}
                    onChange={(e) => setSimJd(e.target.value)}
                    placeholder={docs.recruiterSection.simulator.jdPlaceholder}
                    className={styles.simTextarea}
                    aria-label={docs.recruiterSection.simulator.jdPlaceholder}
                  />
                </div>

                <div className={styles.simResultBox}>
                  <div className={styles.simScoreRow}>
                    <div>
                      <span className={styles.simScoreCaption}>
                        {docs.recruiterSection.simulator.scoreLabel}
                      </span>
                      <p className={styles.simVerdict}>{simResult.verdict}</p>
                    </div>
                    <span
                      className={`${styles.simScoreBadge} ${
                        simResult.score >= 80
                          ? styles.simScoreHigh
                          : simResult.score >= 65
                            ? styles.simScoreMid
                            : styles.simScoreLow
                      }`}
                    >
                      {simResult.score}/100
                    </span>
                  </div>

                  <p className={styles.simSummary}>{simResult.summary}</p>

                  {simResult.matchedSkills.length > 0 && (
                    <div className={styles.simGroup}>
                      <span className={styles.simGroupTitle}>
                        {docs.recruiterSection.simulator.matchedLabel} (
                        {simResult.matchedSkills.length})
                      </span>
                      <ul className={styles.simSkillList}>
                        {simResult.matchedSkills.map((sk) => (
                          <li key={sk} className={styles.simSkillPill}>
                            {sk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className={styles.simGroup}>
                    <span className={styles.simGroupTitle}>
                      {docs.recruiterSection.simulator.gapsLabel}
                    </span>
                    {simResult.gaps.length > 0 ? (
                      <ul className={styles.simGapsList}>
                        {simResult.gaps.map((gap) => (
                          <li key={gap}>{gap}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className={styles.simNoGaps}>
                        {docs.recruiterSection.simulator.noGapsText}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 3. Quick Start Client Configurations */}
        <section className={styles.sectionWhite}>
          <div className={styles.container}>
            <div className={styles.sectionHeader} data-apple-reveal>
              <p className={styles.eyebrow}>{docs.setupSection.eyebrow}</p>
              <h2 className={styles.headline}>{docs.setupSection.headline}.</h2>
              <p className={styles.description}>{docs.setupSection.description}</p>
            </div>

            <div className={styles.clientSetupCard} data-apple-reveal>
              <div className={styles.clientTabs} role="tablist">
                {docs.setupSection.clients.map((client) => (
                  <button
                    key={client.id}
                    type="button"
                    role="tab"
                    aria-selected={activeClientTab.id === client.id}
                    onClick={() => setSelectedClient(client.id)}
                    className={`${styles.clientTabBtn} ${
                      activeClientTab.id === client.id ? styles.clientTabBtnActive : ''
                    }`}
                  >
                    <span>{client.label}</span>
                  </button>
                ))}
              </div>

              <div className={styles.clientPanel}>
                <div className={styles.clientMetaBar}>
                  <div className={styles.clientMetaLeft}>
                    <code className={styles.clientFilename}>{activeClientTab.filename}</code>
                    <span className={styles.clientBadge}>{activeClientTab.badge}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      copyText(`client-${activeClientTab.id}`, activeClientTab.snippet)
                    }
                    className={styles.darkPillBtn}
                  >
                    <PortfolioIcon
                      name={
                        copiedKey === `client-${activeClientTab.id}` ? 'fa-check' : 'fa-copy'
                      }
                    />
                    <span>
                      {copiedKey === `client-${activeClientTab.id}`
                        ? docs.copied
                        : docs.setupSection.copySnippet}
                    </span>
                  </button>
                </div>

                <ol className={styles.clientSteps}>
                  {activeClientTab.steps.map((step, i) => (
                    <li key={step}>
                      <span className={styles.clientStepIndex}>{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>

                <pre className={styles.codeBlock}>
                  <code>{activeClientTab.snippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Tools, Prompts & Resources Reference */}
        <section className={styles.sectionStone}>
          <div className={styles.container}>
            <div className={styles.sectionHeader} data-apple-reveal>
              <p className={styles.eyebrow}>{docs.referenceSection.eyebrow}</p>
              <h2 className={styles.headline}>{docs.referenceSection.headline}.</h2>
              <p className={styles.description}>{docs.referenceSection.description}</p>
            </div>

            <h3 className={styles.subSectionTitle}>{docs.referenceSection.toolsTitle}</h3>
            <div className={styles.toolsGrid}>
              {docs.referenceSection.tools.map((tool) => (
                <article
                  key={tool.name}
                  className={styles.toolDocCard}
                  data-apple-reveal
                  onMouseMove={handleAppleCardSpotlight}
                >
                  <div className={styles.toolDocHeader}>
                    <code className={styles.toolDocName}>{tool.name}</code>
                    <span className={styles.toolDocBadge}>{tool.badge}</span>
                  </div>

                  <p className={styles.toolDocSummary}>{tool.summary}</p>

                  <ul className={styles.paramList}>
                    {tool.params.map((p) => (
                      <li key={`${tool.name}-${p.name}`} className={styles.paramItem}>
                        <div className={styles.paramTop}>
                          <code className={styles.paramName}>{p.name}</code>
                          <span className={styles.paramType}>{p.type}</span>
                          <span
                            className={
                              p.required ? styles.paramRequired : styles.paramOptional
                            }
                          >
                            {p.required
                              ? docs.referenceSection.requiredBadge
                              : docs.referenceSection.optionalBadge}
                          </span>
                        </div>
                        <p className={styles.paramDesc}>{p.description}</p>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className={styles.dualRefGrid}>
              <div className={styles.refColumn} data-apple-reveal>
                <h3 className={styles.subSectionTitle}>{docs.referenceSection.promptsTitle}</h3>
                <div className={styles.compactStack}>
                  {docs.referenceSection.prompts.map((pr) => (
                    <article key={pr.name} className={styles.compactRefCard}>
                      <div className={styles.compactRefTop}>
                        <code className={styles.toolDocName}>{pr.name}</code>
                        <span className={styles.paramType}>({pr.args})</span>
                      </div>
                      <p className={styles.paramDesc}>{pr.description}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className={styles.refColumn} data-apple-reveal>
                <h3 className={styles.subSectionTitle}>
                  {docs.referenceSection.resourcesTitle}
                </h3>
                <div className={styles.compactStack}>
                  {docs.referenceSection.resources.map((res) => (
                    <article key={res.uri} className={styles.compactRefCard}>
                      <div className={styles.compactRefTop}>
                        <code className={styles.resourceUri}>{res.uri}</code>
                        <span className={styles.paramType}>{res.mimeType}</span>
                      </div>
                      <p className={styles.paramDesc}>{res.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Edge Architecture & Security Model */}
        <section className={styles.sectionWhite}>
          <div className={styles.container}>
            <div className={styles.sectionHeader} data-apple-reveal>
              <p className={styles.eyebrow}>{docs.architectureSection.eyebrow}</p>
              <h2 className={styles.headline}>{docs.architectureSection.headline}.</h2>
              <p className={styles.description}>{docs.architectureSection.description}</p>
            </div>

            <div className={styles.archGrid}>
              {docs.architectureSection.cards.map((card) => (
                <article
                  key={card.title}
                  className={styles.archCard}
                  data-apple-reveal
                  onMouseMove={handleAppleCardSpotlight}
                >
                  <span className={styles.archTag}>{card.tag}</span>
                  <h3 className={styles.archTitle}>{card.title}</h3>
                  <p className={styles.archBody}>{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Container>
  );
};

export default McpDocsPage;
