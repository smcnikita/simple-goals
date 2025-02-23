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
      <div>
        <Spinner />
      </div>

      <YandexClient code={code} state={state} />
    </>
  );
}
