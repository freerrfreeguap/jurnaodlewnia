import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const RESEND_API_URL = 'https://api.resend.com';
const MAX_ATTACHMENT_B64 = 28_000_000; // ~21MB decoded

const AttachmentSchema = z.object({
  filename: z.string().min(1).max(255),
  content: z.string().min(1).max(MAX_ATTACHMENT_B64),
});

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().max(100).optional().default(''),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().default(''),
  message: z.string().trim().min(1).max(5000),
  attachments: z.array(AttachmentSchema).max(5).optional().default([]),
  captchaToken: z.string().min(1).max(10000),
}).refine(
  (d) => d.attachments.reduce((s, a) => s + a.content.length, 0) <= MAX_ATTACHMENT_B64,
  { message: 'Total attachment size exceeds limit' }
);

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
   .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

// Best-effort per-IP rate limit: survives while this isolate stays warm,
// resets on cold start. Good enough to blunt casual abuse of a low-traffic
// B2B contact form without adding a database dependency.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const requestLog = new Map<string, number[]>();

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  if (requestLog.size > 5000) requestLog.clear(); // safety cap on memory
  const recent = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Retry-After': '600' } }
      );
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    const HCAPTCHA_SECRET = Deno.env.get('HCAPTCHA_SECRET');
    if (!RESEND_API_KEY || !HCAPTCHA_SECRET) {
      console.error('Missing required secret(s) for send-contact-email');
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable.' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid request.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    const { name, company, email, phone, message, attachments, captchaToken } = parsed.data;

    // Verify hCaptcha server-side before sending
    const captchaParams = new URLSearchParams();
    captchaParams.append('secret', HCAPTCHA_SECRET);
    captchaParams.append('response', captchaToken);
    const captchaRes = await fetch('https://api.hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: captchaParams.toString(),
    });
    const captchaData = await captchaRes.json().catch(() => ({}));
    if (!captchaData?.success) {
      return new Response(
        JSON.stringify({ error: 'Captcha verification failed.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const html = `
      <h2>Nowe zapytanie z formularza odlewnialeniar.pl</h2>
      <p><strong>Imię i nazwisko:</strong> ${escapeHtml(name)}</p>
      ${company ? `<p><strong>Firma:</strong> ${escapeHtml(company)}</p>` : ''}
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ''}
      <p><strong>Wiadomość:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      ${attachments.length ? `<p><strong>Załączniki:</strong> ${attachments.length}</p>` : ''}
    `;

    const response = await fetch(`${RESEND_API_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Formularz Odlewnia <kontakt@odlewnialeniar.pl>',
        to: ['romanjuryk@gmail.com'],
        reply_to: email,
        subject: `Nowe zapytanie: ${name}${company ? ' (' + company + ')' : ''}`,
        html,
        attachments: attachments.map(a => ({ filename: a.filename, content: a.content })),
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('Resend error', response.status, data);
      return new Response(
        JSON.stringify({ error: 'Email sending failed. Please try again.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('send-contact-email error:', err);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
