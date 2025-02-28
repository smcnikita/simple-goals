import { useTranslations } from 'next-intl';

import classes from './page.module.css';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className={classes.section}>
      <h1>{t('title')}</h1>

      <section className={classes.section}>
        <p>{t('sections.section_1')}</p>
        <p>{t('sections.section_2')}</p>
        <p>{t('sections.section_3')}</p>
        <p>
          {t('sections.section_4')}{' '}
          <a href="https://github.com/smcnikita/simple-goals" target="_blank" className="base-link">
            Github
          </a>
          . {t('sections.section_5')}
        </p>
      </section>
    </div>
  );
}
