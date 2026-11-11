'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AlertCircle, CheckCircle2, ChevronDown, Loader2, Send } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { SERVICE_IDS, whatsappHref } from '@/lib/site';
import { EASE } from '@/lib/motion';
import { Button } from '@/components/ui/Button';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppFloat';
import { cn, phoneDigits } from '@/lib/utils';

interface FormState {
  name: string;
  phone: string;
  email: string;
  treatment: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = { name: '', phone: '', email: '', treatment: '', message: '' };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

/** Máscara leve de telefone: mantém dígitos e formata em grupos legíveis. */
function formatPhone(value: string) {
  const digits = phoneDigits(value).slice(0, 13);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
}

export function ContactForm() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const serviceOptions = useMemo(
    () => SERVICE_IDS.map((id) => ({ id, label: t.services.items[id].title })),
    [t],
  );

  const validate = (state: FormState): FieldErrors => {
    const next: FieldErrors = {};
    if (state.name.trim().length < 3) next.name = t.contact.form.errors.name;
    const digits = phoneDigits(state.phone);
    if (digits.length < 9) next.phone = t.contact.form.errors.phone;
    if (!EMAIL_RE.test(state.email.trim())) next.email = t.contact.form.errors.email;
    if (!state.treatment) next.treatment = t.contact.form.errors.treatment;
    if (state.message.trim().length < 10) next.message = t.contact.form.errors.message;
    return next;
  };

  const update = (field: keyof FormState, raw: string) => {
    const value = field === 'phone' ? formatPhone(raw) : raw;
    setValues((prev) => ({ ...prev, [field]: value }));
    // Limpa o erro do campo assim que o utilizador corrige.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus('error');
      const first = document.querySelector<HTMLElement>('[data-field-error="true"]');
      first?.focus();
      return;
    }

    setStatus('sending');
    try {
      /*
       * Integração: defina NEXT_PUBLIC_FORM_ENDPOINT (ex.: Formspree, Resend, API própria)
       * para receber os pedidos por HTTP. Sem endpoint configurado, o pedido é
       * encaminhado para o WhatsApp da empresa — nenhum lead é perdido.
       */
      const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...values, source: 'site-falcao', locale: document.documentElement.lang }),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 700));
      }

      setStatus('success');

      if (!endpoint) {
        const text = [
          'Novo pedido de orçamento — site Falcão',
          `Nome: ${values.name}`,
          `Telefone: ${values.phone}`,
          `E-mail: ${values.email}`,
          `Serviço: ${values.treatment}`,
          `Mensagem: ${values.message}`,
        ].join('\n');
        window.open(whatsappHref(text), '_blank', 'noopener,noreferrer');
      }
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setStatus('idle');
  };

  const fieldClasses = (field: keyof FormState) =>
    cn(
      'w-full rounded-2xl border bg-white px-4 py-3.5 text-sm text-graphite-900 shadow-soft outline-none transition-all duration-300 placeholder:text-graphite-400',
      errors[field]
        ? 'border-ember-300 focus:border-ember-500 focus:ring-4 focus:ring-ember-500/10'
        : 'border-graphite-200 hover:border-graphite-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/12',
    );

  if (status === 'success') {
    return (
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="flex h-full flex-col items-center justify-center rounded-4xl border border-aqua-200/70 bg-gradient-to-b from-aqua-50/60 to-white p-9 text-center shadow-soft"
        role="status"
        aria-live="polite"
      >
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-aqua-100 text-aqua-600 ring-1 ring-aqua-200">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-xl font-semibold text-graphite-950">
          {t.contact.form.successTitle}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-graphite-600">
          {t.contact.form.successText}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button variant="ghost" onClick={reset}>
            {t.contact.form.successAgain}
          </Button>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1fbe5a]"
          >
            <WhatsAppGlyph className="h-4.5 w-4.5" />
            {t.hero.ctaSecondary}
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-4xl border border-graphite-200/70 bg-white p-7 shadow-soft sm:p-8"
      aria-label={t.contact.title}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Nome */}
        <div className="sm:col-span-2">
          <label htmlFor="cf-name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-graphite-600">
            {t.contact.form.name} <span className="text-ember-500">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder={t.contact.form.namePlaceholder}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'cf-name-error' : undefined}
            data-field-error={errors.name ? 'true' : undefined}
            className={fieldClasses('name')}
          />
          <FieldError id="cf-name-error" message={errors.name} />
        </div>

        {/* Telefone */}
        <div>
          <label htmlFor="cf-phone" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-graphite-600">
            {t.contact.form.phone} <span className="text-ember-500">*</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder={t.contact.form.phonePlaceholder}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'cf-phone-error' : undefined}
            data-field-error={errors.phone ? 'true' : undefined}
            className={fieldClasses('phone')}
          />
          <FieldError id="cf-phone-error" message={errors.phone} />
        </div>

        {/* E-mail */}
        <div>
          <label htmlFor="cf-email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-graphite-600">
            {t.contact.form.email} <span className="text-ember-500">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder={t.contact.form.emailPlaceholder}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
            data-field-error={errors.email ? 'true' : undefined}
            className={fieldClasses('email')}
          />
          <FieldError id="cf-email-error" message={errors.email} />
        </div>

        {/* Tipo de serviço */}
        <div className="sm:col-span-2">
          <label htmlFor="cf-treatment" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-graphite-600">
            {t.contact.form.treatment} <span className="text-ember-500">*</span>
          </label>
          <div className="relative">
            <select
              id="cf-treatment"
              name="treatment"
              required
              value={values.treatment}
              onChange={(e) => update('treatment', e.target.value)}
              aria-invalid={Boolean(errors.treatment)}
              aria-describedby={errors.treatment ? 'cf-treatment-error' : undefined}
              data-field-error={errors.treatment ? 'true' : undefined}
              className={cn(fieldClasses('treatment'), 'appearance-none pr-11', !values.treatment && 'text-graphite-400')}
            >
              <option value="">{t.contact.form.treatmentPlaceholder}</option>
              {serviceOptions.map((option) => (
                <option key={option.id} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-400"
              aria-hidden="true"
            />
          </div>
          <FieldError id="cf-treatment-error" message={errors.treatment} />
        </div>

        {/* Mensagem */}
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-graphite-600">
            {t.contact.form.message} <span className="text-ember-500">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={4}
            required
            value={values.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder={t.contact.form.messagePlaceholder}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'cf-message-error' : undefined}
            data-field-error={errors.message ? 'true' : undefined}
            className={cn(fieldClasses('message'), 'resize-y')}
          />
          <FieldError id="cf-message-error" message={errors.message} />
        </div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-graphite-500">{t.contact.form.consent}</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          disabled={status === 'sending'}
          ariaBusy={status === 'sending'}
          className="sm:flex-1"
          iconLeft={
            status === 'sending' ? (
              <Loader2 className="h-4.5 w-4.5 animate-spin" />
            ) : (
              <Send className="h-4.5 w-4.5" />
            )
          }
        >
          {status === 'sending' ? t.contact.form.sending : t.contact.form.submit}
        </Button>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-4 text-[0.95rem] font-semibold text-white shadow-card transition-colors duration-300 hover:bg-[#1fbe5a]"
        >
          <WhatsAppGlyph className="h-5 w-5" />
          {t.hero.ctaSecondary}
        </a>
      </div>

      <AnimatePresence>
        {status === 'error' && Object.keys(errors).length === 0 ? (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 flex items-start gap-2.5 rounded-2xl border border-ember-200 bg-ember-50 px-4 py-3.5 text-sm text-ember-700"
            role="alert"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              <strong className="font-semibold">{t.contact.form.errorTitle}. </strong>
              {t.contact.form.errorText}
            </span>
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium text-ember-600"
          role="alert"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}
