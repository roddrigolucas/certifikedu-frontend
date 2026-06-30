import { EAdminStatus } from '@/services/entities/app/admin/enum';

export function determineBadgeVariant(status: string | undefined) {
  switch (status) {
    case EAdminStatus.ENABLED:
      return 'success';
    case EAdminStatus.DISABLED:
      return 'destructive';
    case EAdminStatus.REVIEW:
      return 'default';
    default:
      return 'outline';
  }
}
