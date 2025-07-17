import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

import { PATHS } from '@/constants/paths';

import { authOptions } from '@/lib/auth/auth';

import * as userService from '@/services/user';

import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DeleteProfileDialog,
  DescriptionForm,
  BlockGoalsAction,
  NameForm,
  PasswordForm,
  ExportForm,
} from '@/components/settings';
import { EncryptionDialog } from '@/components/encryption';
import { DecryptionDialog } from '@/components/decryption';

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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={PATHS.home}>{t('home')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t('settings')}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold">{t('settings')}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t('user')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <NameForm currentUserName={session.user.name} />
          <Separator />
          <PasswordForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('display')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DescriptionForm selected={userDescriptionSetting} options={descriptionSettings} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('encryption')}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 md:flex-row">
          {isEncryptedGoals ? (
            <>
              <BlockGoalsAction />
              <DecryptionDialog />
            </>
          ) : (
            <EncryptionDialog />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('export')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ExportForm />
        </CardContent>
      </Card>

      <DeleteProfileDialog />
    </div>
  );
}
