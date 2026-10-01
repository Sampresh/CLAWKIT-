'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Field, Honeypot, Input, Select, Textarea } from '@/components/ui/Field';
import { errorMessage } from '@/services/api';
import { contentService } from '@/services';

const TOPICS = [
  { value: 'support', label: 'App support' },
  { value: 'feedback', label: 'Feedback or feature idea' },
  { value: 'vet', label: 'I’m a vet or clinic' },
  { value: 'press', label: 'Press' },
  { value: 'other', label: 'Something else' },
];

// Mirrors server/src/validators/content.validators.js
const schema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Enter a valid email').max(254),
  topic: z.enum(TOPICS.map((t) => t.value)),
  dogName: z.string().trim().max(60).optional(),
  message: z.string().trim().min(10, 'Tell us a little more (10+ characters)').max(5000),
  website: z.string().optional(),
});

export function ContactForm() {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { topic: 'support' },
  });
  const { errors } = formState;
  const mutation = useMutation({ mutationFn: contentService.sendContact, onSuccess: () => reset() });

  return (
    <form onSubmit={handleSubmit((v) => mutation.mutate(v))} className="relative space-y-5" noValidate>
      <Honeypot {...register('website')} />
      {mutation.isSuccess && <Alert tone="success">{mutation.data}</Alert>}
      {mutation.isError && <Alert tone="error">{errorMessage(mutation.error)}</Alert>}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" error={errors.name?.message}>
          <Input id="name" autoComplete="name" aria-invalid={!!errors.name} {...register('name')} />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register('email')} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Topic" htmlFor="topic" error={errors.topic?.message}>
          <Select id="topic" {...register('topic')}>
            {TOPICS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Dog’s name (optional)" htmlFor="dogName" error={errors.dogName?.message}>
          <Input id="dogName" {...register('dogName')} />
        </Field>
      </div>
      <Field label="Message" htmlFor="message" error={errors.message?.message}>
        <Textarea id="message" aria-invalid={!!errors.message} {...register('message')} />
      </Field>
      <Button type="submit" size="lg" loading={mutation.isPending}>
        Send message
      </Button>
    </form>
  );
}
