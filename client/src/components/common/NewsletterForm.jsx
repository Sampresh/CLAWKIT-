'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ArrowRight, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Honeypot } from '@/components/ui/Field';
import { errorMessage } from '@/services/api';
import { contentService } from '@/services';

const schema = z.object({
  email: z.string().trim().email('Enter a valid email'),
  website: z.string().optional(),
});

export function NewsletterForm({ dark = false }) {
  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });
  const mutation = useMutation({ mutationFn: contentService.subscribe });

  if (mutation.isSuccess) {
    return (
      <p className={`flex items-center gap-2 text-sm font-medium ${dark ? 'text-white' : 'text-ink'}`}>
        <Check className="h-4 w-4 text-success" aria-hidden /> {mutation.data}
      </p>
    );
  }

  const error = formState.errors.email?.message || (mutation.isError && errorMessage(mutation.error));

  return (
    <form onSubmit={handleSubmit((v) => mutation.mutate(v))} className="relative w-full max-w-md" noValidate>
      <Honeypot {...register('website')} />
      <div
        className={`flex items-center gap-2 rounded-full border p-1.5 pl-5 ${
          dark ? 'border-white/15 bg-white/10' : 'border-line bg-surface'
        }`}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={!!formState.errors.email}
          className={`min-w-0 flex-1 bg-transparent text-[15px] focus:outline-none ${
            dark ? 'text-white placeholder:text-white/50' : 'text-ink placeholder:text-muted/60'
          }`}
          {...register('email')}
        />
        <Button type="submit" variant="brand" size="sm" loading={mutation.isPending} className="h-10 px-4">
          Subscribe <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
      {error && <p className="mt-2 pl-5 text-sm text-danger">{error}</p>}
    </form>
  );
}
