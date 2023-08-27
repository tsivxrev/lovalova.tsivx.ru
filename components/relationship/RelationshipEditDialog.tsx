'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { editRelationship } from '@/actions/relationship';
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
import { useToast } from '@/components/ui/use-toast';
import { Relationship } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Textarea } from '../ui/textarea';
import { ToastAction } from '../ui/toast';

const formSchema = z.object({
  name: z.string()
    .nonempty('Имя обязательно')
    .min(2, { message: 'Имя должно быть не меньше 2 символов' })
    .max(32, { message: 'Имя должно быть не больше 32 символов' }),

    description: z.string()
    .min(1, { message: 'Описание должно быть не меньше 3 символов' })
    .max(1024, { message: 'Описание должно быть не больше 1024 символов' }),

    id: z.string()
    .nonempty('Никнейм обязателен')
    .min(3, { message: 'Никнейм должен быть не меньше 3 символов' })
    .max(32, { message: 'Никнейм должен быть не больше 32 символов' }),

    cover: z.string()
    .nonempty('Обложка отношений обязательна')
    .url({ message: 'Обложка отношений должна быть ссылкой' }),
});

export function RelationshipEditDialog({ relationship }: { relationship: Relationship }) {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: relationship.name,
      description: relationship.description || '',
      id: relationship.id,
      cover: relationship.cover || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPending(true);

    const result = await editRelationship(values);

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
        <Button variant="outline" size='sm'>Изменить информацию</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Изменение отношений</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название отношений</FormLabel>
                  <FormControl>
                    <Input placeholder="Лягушата" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Никнейм</FormLabel>
                  <FormControl>
                    <Input placeholder="hot_bebra_1337" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    {`lovalova.tsivx.ru/${field.value}`}
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Самые крутые отношения в мире..." {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Обложка отношений</FormLabel>
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
