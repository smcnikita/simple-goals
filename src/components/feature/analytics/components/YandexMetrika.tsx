'use client';

import { useEffect, useMemo, type FC } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

const YANDEX_METRIKA_SCRIPT = `
  (function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
  })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
`;

const YandexMetrika: FC = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const ymId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

  const ymIdInt = useMemo(() => (ymId ? parseInt(ymId) : null), [ymId]);

  useEffect(() => {
    if (ymId) {
      ym(parseInt(ymId), 'hit', window.location.href);
    }
  }, [pathName, searchParams, ymId]);

  if (!ymId) {
    return null;
  }

  return (
    <Script id="yandex-metrika" type="text/javascript" strategy="afterInteractive">
      {`
        ${YANDEX_METRIKA_SCRIPT}
        ym(${ymIdInt}, "init", {
          defer: true,
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true
        });
      `}
    </Script>
  );
};

export default YandexMetrika;
