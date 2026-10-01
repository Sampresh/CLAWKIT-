'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Field';
import { errorMessage } from '@/services/api';
import { authService } from '@/services';

const schema = z
  .object({
    password: z.string().min(12, 'Use at least 12 characters'),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, { message: 'Passwords don’t match', path: ['confirm'] });

function ResetForm() {
  const token = useSearchParams().get('token') || '';
  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });
  const mutation = useMutation({ mutationFn: authService.resetPassword });
  const { errors } = formState;

  if (!token) return <Alert tone="error">This reset link is missing its token. Request a new one.</Alert>;

  if (mutation.isSuccess) {
    return (
      <div className="space-y-6">
        <Alert tone="success">{mutation.data}</Alert>
        <Button href="/login" className="w-full">
          Go to login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(({ password }) => mutation.mutate({ token, password }))} className="space-y-5" noValidate>
      {mutation.isError && <Alert tone="error">{errorMessage(mutation.error)}</Alert>}
      <Field label="New password" htmlFor="password" error={errors.password?.message}>
        <Input id="password" type="password" autoComplete="new-password" {...register('password')} />
      </Field>
      <Field label="Confirm password" htmlFor="confirm" error={errors.confirm?.message}>
        <Input id="confirm" type="password" autoComplete="new-password" {...register('confirm')} />
      </Field>
      <Button type="submit" className="w-full" loading={mutation.isPending}>
        Update password
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <>
      <h1 className="mb-6 font-display text-2xl font-bold tracking-tight text-ink">Choose a new password</h1>
      <Suspense>
        <ResetForm />
      </Suspense>
      <Link href="/forgot-password" className="mt-6 block text-center text-sm text-muted hover:text-ink">
        Request a new link
      </Link>
    </>
  );
}
