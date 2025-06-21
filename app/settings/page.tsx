import UpdateName from '@/components/settings/update-name/update-name';
import { Separator } from '@/components/ui/separator';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('user_settings');

  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Session is not defined. Please ensure that the session is initialized before proceeding.');
  }

  return (
    <div className="space-y-4 py-4">
      <h1 className="text-2xl font-bold">{t('settings')}</h1>

      <Separator />

      <div>
        <UpdateName currentUserName={session.user.name} />
      </div>
    </div>
  );
}
