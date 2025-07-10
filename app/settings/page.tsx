import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';

import { authOptions } from '@/lib/auth';

import { userService } from '@/services/user/user.service';

import { Separator } from '@/components/ui/separator';
import {
  DeleteProfileDialog,
  DescriptionForm,
  NameForm,
  PasswordForm,
  EncryptionForm,
  DecryptionForm,
} from '@/components/settings';

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

  const isEncryptedGoals = await userService.getIsUserGoalsEncrypted();

  return (
    <div className="space-y-4 py-4">
      <h1 className="text-2xl font-bold">{t('settings')}</h1>

      <Separator />

      <div>
        <NameForm currentUserName={session.user.name} />
      </div>

      <Separator />

      <DescriptionForm selected={userDescriptionSetting} options={descriptionSettings} />

      <Separator />

      <PasswordForm />

      <Separator />

      {isEncryptedGoals && (
        <>
          <EncryptionForm />
          <Separator />
        </>
      )}

      {!isEncryptedGoals && (
        <>
          <DecryptionForm />
          <Separator />
        </>
      )}

      <DeleteProfileDialog />
    </div>
  );
}
