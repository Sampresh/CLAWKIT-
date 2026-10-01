'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Field';
import { errorMessage } from '@/services/api';
import { authService } from '@/services';

const schema = z.object({ email: z.string().trim().email('Enter a valid email') });

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });
  const mutation = useMutation({ mutationFn: authService.forgotPassword });

  return (
    <>
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink">Reset your password</h1>
      <p className="mt-2 text-sm text-muted">We’ll email you a link to choose a new one.</p>
      {mutation.isSuccess ? (
        <div className="mt-6">
          <Alert tone="success">{mutation.data}</Alert>
        </div>
      ) : (
        <form onSubmit={handleSubmit((v) => mutation.mutate(v))} className="mt-6 space-y-5" noValidate>
          {mutation.isError && <Alert tone="error">{errorMessage(mutation.error)}</Alert>}
          <Field label="Email" htmlFor="email" error={formState.errors.email?.message}>
            <Input id="email" type="email" autoComplete="email" {...register('email')} />
          </Field>
          <Button type="submit" className="w-full" loading={mutation.isPending}>
            Send reset link
          </Button>
        </form>
      )}
      <Link href="/login" className="mt-6 block text-center text-sm text-muted hover:text-ink">
        Back to login
      </Link>
    </>
  );
}
