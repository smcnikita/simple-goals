import Spinner from '@/components/ui/spinner';

import YandexClient from './_Client';

export default async function YandexPage({
  searchParams,
}: {
  searchParams: Promise<{
    code: string;
    state: string;
  }>;
}) {
  const searchParamsData = await searchParams;

  const code = searchParamsData.code;
  const state = searchParamsData.state;

  return (
    <>
      <YandexClient code={code} state={state} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--body-color)',
          background: 'var(--body-background)',
          zIndex: 9999,
          opacity: 1,
        }}
      >
        <Spinner></Spinner>
      </div>
    </>
  );
}
