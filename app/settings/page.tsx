import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';

import { authOptions } from '@/lib/auth';

import { userService } from '@/services/user/user.service';

import { Separator } from '@/components/ui/separator';
import UpdateDescription from '@/components/settings/update-descriptions/update-description';
import UpdateName from '@/components/settings/update-name/update-name';
import UpdatePassword from '@/components/settings/update-password/update-password';

export default async function Page() {
  const t = await getTranslations('user_settings');

  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Session is not defined. Please ensure that the session is initialized before proceeding.');
  }

  const userDescriptionSetting = await userService.getUserDescriptionSettings(Number(session.user.id));
  const descriptionSettings = await userService.getDescriptionSettings();

  if (!userDescriptionSetting) {
    throw new Error('User description settings could not be found');
  }

  return (
    <div className="space-y-4 py-4">
      <h1 className="text-2xl font-bold">{t('settings')}</h1>

      <Separator />

      <div>
        <UpdateName currentUserName={session.user.name} />
      </div>

      <Separator />

      <UpdateDescription selected={userDescriptionSetting} options={descriptionSettings} />

      <Separator />

      <UpdatePassword />
    </div>
  );
}
