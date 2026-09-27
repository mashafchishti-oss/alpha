'use client'

import { CheckCircle2, Loader2, MessageCircle } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import {
  interestOptions,
  submitInquiry,
  validateInquiry,
  type Inquiry,
  type InquiryErrors,
} from '@/lib/inquiry'
import { getWhatsAppHref, siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { buttonLinkVariants } from './button-link'

const empty: Inquiry = { name: '', phone: '', interest: '', message: '' }

const fieldClass =
  'w-full rounded-md border border-input bg-background/60 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[invalid=true]:border-destructive'

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string
  label: string
  error?: string
  optional?: boolean
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && <span className="ml-1 text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm() {
  const [values, setValues] = useState<Inquiry>(empty)
  const [errors, setErrors] = useState<InquiryErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [submitted, setSubmitted] = useState<Inquiry | null>(null)

  const update = (key: keyof Inquiry) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateInquiry(values)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      document.getElementById(`inquiry-${firstInvalid}`)?.focus()
      return
    }
    setStatus('submitting')
    const result = await submitInquiry(values)
    if (result.ok) {
      setSubmitted(values)
      setValues(empty)
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  if (status === 'success' && submitted) {
    const interestLabel = interestOptions.find((o) => o.value === submitted.interest)?.label
    const whatsapp = getWhatsAppHref(
      `Hi ${siteConfig.businessName}, I'm ${submitted.name}. I'm interested in ${interestLabel?.toLowerCase()}.${submitted.message ? ` ${submitted.message}` : ''}`,
    )
    return (
      <div role="status" className="flex flex-col items-start gap-5 rounded-xl border border-primary/30 bg-primary/[0.06] p-8">
        <CheckCircle2 aria-hidden="true" className="size-10 text-primary" strokeWidth={1.5} />
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-3xl font-bold uppercase tracking-tight">
            Thanks, {submitted.name.split(' ')[0]}
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Your inquiry about {interestLabel?.toLowerCase()} has been received. Our team will reach
            out on {submitted.phone}.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {whatsapp && (
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={buttonLinkVariants()}>
              <MessageCircle aria-hidden="true" className="size-4" />
              Continue on WhatsApp
            </a>
          )}
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className={buttonLinkVariants({ variant: 'outline' })}
          >
            Send another
          </button>
        </div>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby="contact-form-title" className="flex flex-col gap-5 rounded-xl border border-white/10 bg-card p-6 sm:p-8">
      <h3 id="contact-form-title" className="font-display text-2xl font-bold uppercase tracking-tight">
        Send an inquiry
      </h3>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="inquiry-name" label="Name" error={errors.name}>
          <input
            id="inquiry-name"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={update('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
            className={fieldClass}
            placeholder="Your full name"
          />
        </Field>
        <Field id="inquiry-phone" label="Phone / WhatsApp" error={errors.phone}>
          <input
            id="inquiry-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={update('phone')}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'inquiry-phone-error' : undefined}
            className={fieldClass}
            placeholder="03XX XXXXXXX"
          />
        </Field>
      </div>
      <Field id="inquiry-interest" label="Interested in" error={errors.interest}>
        <select
          id="inquiry-interest"
          name="interest"
          required
          value={values.interest}
          onChange={update('interest')}
          aria-invalid={!!errors.interest}
          aria-describedby={errors.interest ? 'inquiry-interest-error' : undefined}
          className={cn(fieldClass, 'appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat', !values.interest && 'text-muted-foreground/70')}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="" disabled>
            Choose an option
          </option>
          {interestOptions.map((o) => (
            <option key={o.value} value={o.value} className="text-foreground">
              {o.label}
            </option>
          ))}
        </select>
      </Field>
      <Field id="inquiry-message" label="Message" optional error={errors.message}>
        <textarea
          id="inquiry-message"
          name="message"
          rows={4}
          maxLength={1000}
          value={values.message}
          onChange={update('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
          className={cn(fieldClass, 'resize-y')}
          placeholder="Tell us about your goals or any questions"
        />
      </Field>
      {status === 'error' && (
        <p role="alert" className="text-sm text-destructive">
          Something went wrong sending your inquiry. Please try again.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className={cn(buttonLinkVariants(), 'w-full sm:w-fit')}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Sending
          </>
        ) : (
          'Send inquiry'
        )}
      </button>
    </form>
  )
}
