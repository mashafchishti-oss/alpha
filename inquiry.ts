export const interestOptions = [
  { value: 'membership', label: 'Gym Membership' },
  { value: 'personal-training', label: 'Personal Training' },
  { value: 'general', label: 'General Inquiry' },
] as const

export type Interest = (typeof interestOptions)[number]['value']

export type Inquiry = {
  name: string
  phone: string
  interest: Interest | ''
  message: string
}

export type InquiryErrors = Partial<Record<keyof Inquiry, string>>

export function validateInquiry(data: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {}
  if (data.name.trim().length < 2) errors.name = 'Please enter your name.'
  const digits = data.phone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 15)
    errors.phone = 'Please enter a valid phone or WhatsApp number.'
  if (!data.interest) errors.interest = 'Please choose what you are interested in.'
  if (data.message.length > 1000) errors.message = 'Please keep your message under 1000 characters.'
  return errors
}

export type InquiryResult = { ok: true } | { ok: false; error: string }

/**
 * Delivery adapter for inquiries.
 *
 * No backend is connected yet, so this resolves locally without sending data
 * anywhere. To go live, replace the body with a call to your chosen channel:
 *   - Email:        POST to a route handler that uses Resend / SMTP
 *   - Form backend: POST to Formspree, Basin, etc.
 *   - CRM:          POST to the CRM's lead-capture API from a server route
 *   - WhatsApp:     the form already offers a prefilled WhatsApp hand-off
 *                   once `siteConfig.whatsapp` is set
 */
export async function submitInquiry(data: Inquiry): Promise<InquiryResult> {
  const errors = validateInquiry(data)
  if (Object.keys(errors).length > 0) {
    return { ok: false, error: 'Please fix the highlighted fields.' }
  }
  await new Promise((resolve) => setTimeout(resolve, 700))
  return { ok: true }
}
