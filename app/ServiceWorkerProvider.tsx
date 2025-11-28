'use client';

import { useServiceWorker } from '@/lib/register-sw';

export function ServiceWorkerProvider() {
  useServiceWorker();
  return null;
}
