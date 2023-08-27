import { clsx, type ClassValue } from 'clsx';
import { createHash, createHmac } from 'crypto';
import { twMerge } from 'tailwind-merge';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkTelegramHash({ hash, ...data }: { hash: string } & Record<string, string>): boolean {
  const secret = createHash('sha256')
  .update(process.env.BOT_TOKEN as 'arraybuffer' | 'blob')
  .digest();

  const checkString = Object.keys(data)
  .sort()
    .map((k) => `${k}=${data[k]}`)
    .join('\n');

  const hmac = createHmac('sha256', secret)
    .update(checkString)
    .digest('hex');

  return hmac === hash;
}

// eslint-disable-next-line no-nested-ternary
export const declOfNum = (n: number, titles: Array<string>) => titles[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];

export function calculateDaysDifftoNow(from: number | string): number {
  const now = dayjs();
  return now.diff(dayjs(+from * 1000), 'd');
}
