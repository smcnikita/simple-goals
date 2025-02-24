import { logout } from '@/services/auth-service';

export async function POST() {
  return await logout();
}
