import Spinner from '@/components/ui/spinner';

import GithubClient from './_Client';

export default async function GithubPage({
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

      <GithubClient code={code} state={state} />
    </>
  );
}
