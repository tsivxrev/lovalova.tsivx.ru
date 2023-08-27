'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { editUser } from '@/actions/user';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  name: z.string()
    .nonempty('Имя обязательно')
    .min(2, { message: 'Имя должно быть не меньше 2 символов' })
    .max(32, { message: 'Имя должно быть не больше 32 символов' }),

  username: z.string()
    .nonempty('Никнейм обязателен')
    .min(3, { message: 'Никнейм должен быть не меньше 3 символов' })
    .max(32, { message: 'Никнейм должен быть не больше 32 символов' }),

  avatar: z.string()
    .nonempty('Фотография профиля обязательна')
    .url({ message: 'Фотография пользователя должна быть ссылкой' }),
});

export function UserEditDialog({ user }: { user: User }) {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      avatar: user.avatar,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPending(true);

    const result = await editUser(values);

    if (result.success) {
      setPending(false);
      toast({ title: result.message });
      router.refresh();
    } else {
      setPending(false);
      toast({
        title: 'Не удалось сохранить данные',
        description: result.message,
        action: <ToastAction onClick={() => { onSubmit(values); }} altText="Повторить">Повторить</ToastAction>,
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Изменить профиль</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Изменение профиля</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя пользователя</FormLabel>
                  <FormControl>
                    <Input placeholder="сеня" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Никнейм</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    {`lovalova.tsivx.ru/user/${field.value}`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фотография пользователя</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/tsivxrev.png" {...field} />
                  </FormControl>
                  <FormDescription>
                    Прямая ссылка на изображение. Поддерживаемые форматы: png, jpg, webp, gif
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={pending}>{pending ? 'Сохранение...' : 'Сохранить'}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
