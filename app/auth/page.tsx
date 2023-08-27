'use client';

import { useUser } from '@/components/user/UserProvider';
import { ScanFace } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TLoginButton, TLoginButtonSize } from 'react-telegram-auth';

export default function AuthView() {
    const router = useRouter();
    const user = useUser();

    if (user) {
        router.push('/user/me');
    }

 return (
    <div className="auth w-full rounded-md p-4 border flex flex-col gap-4 items-center">

        <ScanFace className="flex h-12 w-12" />
        <div className="info flex flex-col items-center text-center">
            <div className="title text-2xl font-medium">Авторизация</div>
            <div className="subtitle">Для управления профилем необходимо войти в аккаунт Telegram</div>
        </div>

        <TLoginButton
            botName="lovalova_app_bot"
            buttonSize={TLoginButtonSize.Medium}
            lang="ru"
            usePic={true}
            cornerRadius={20}
            redirectUrl={'/api/auth'}
            requestAccess={'write'}
        />
    </div>
);
}
