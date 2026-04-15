import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = "Blank Space Events <no-reply@tar1k.com>"
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "info@blankspacesl.com").split(",")

export async function POST(req: Request) {
  try {
    const { eventId, eventName, name, email, phone, community, affiliation, ticketType, guests, acceptedTerms, marketingConsent } = await req.json()

    if (!eventId || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 1. Store in Supabase
    const { error: dbError } = await supabaseAdmin
      .from('event_rsvps')
      .insert([
        { 
          event_id: eventId, 
          event_name: eventName,
          name, 
          email, 
          phone,
          community,
          affiliation,
           ticket_type: ticketType,
          guests: guests || [],
          accepted_terms: acceptedTerms,
          marketing_consent: marketingConsent
        }
      ])

    if (dbError) {
      console.error('[rsvp-db]', dbError)
      return NextResponse.json({ error: "Failed to process RSVP." }, { status: 500 })
    }

    // 2. Notify admins
    const adminSubject = `RSVP: ${name} [${ticketType || "General"}] — ${eventName || eventId}`
    const adminHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #1a1a1a; max-width: 600px; background: #fff; border: 1px solid #eee;">
        <div style="margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 20px;">
          <p style="margin: 0; font-size: 12px; color: #f37335; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">Blank Space Admin</p>
          <h2 style="margin: 5px 0 0; font-size: 24px;">New Event RSVP</h2>
        </div>
        
        <p style="font-size: 16px; margin-bottom: 25px;">A new registration has been received for <strong>${eventName || eventId}</strong>.</p>
        
        <div style="background: #fdfaf3; border-radius: 12px; padding: 25px; margin-bottom: 30px; border: 1px solid #f37335/20;">
          <table cellpadding="0" cellspacing="0" style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr>
              <td style="padding-bottom: 12px; color: #666; width: 120px;">Attendee</td>
              <td style="padding-bottom: 12px; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding-bottom: 12px; color: #666;">Email</td>
              <td style="padding-bottom: 12px;"><a href="mailto:${email}" style="color: #f37335; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding-bottom: 12px; color: #666;">Phone</td>
              <td style="padding-bottom: 12px;">${phone || "—"}</td>
            </tr>
            <tr>
              <td style="padding-bottom: 12px; color: #666;">Ticket Type</td>
              <td style="padding-bottom: 12px;">
                <span style="background: #f37335; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; text-transform: uppercase; font-weight: bold;">
                  ${ticketType || "General Admission"}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom: 12px; color: #666;">Community</td>
              <td style="padding-bottom: 12px;">${community || "—"}</td>
            </tr>
             <tr>
              <td style="padding-bottom: 12px; color: #666;">Affiliation</td>
              <td style="padding-bottom: 12px;">${affiliation || "—"}</td>
            </tr>
            <tr>
              <td style="padding-bottom: 12px; color: #666;">Good Time Consent</td>
              <td style="padding-bottom: 12px;">${acceptedTerms ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td style="margin: 0; color: #666;">Marketing Opt-in</td>
              <td style="margin: 0;">${marketingConsent ? "Yes" : "No"}</td>
            </tr>
          </table>
        </div>

        ${guests && guests.length > 0 ? `
          <div style="margin-bottom: 30px;">
            <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #666; margin-bottom: 15px;">Guest List (${guests.length})</h3>
            <div style="background: #fff; border: 1px solid #eee; border-radius: 8px; padding: 15px;">
              <ul style="margin: 0; padding: 0; list-style: none;">
                ${guests.map((g: { name?: string; phone?: string }, index: number) => `
                  <li style="padding: 10px 0; border-bottom: ${index === guests.length - 1 ? 'none' : '1px solid #f9f9f9'};">
                    <div style="font-weight: bold; font-size: 14px;">${g.name || 'Anonymous Guest'}</div>
                    ${g.phone ? `<div style="font-size: 12px; color: #999;">${g.phone}</div>` : ''}
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        ` : ''}
        
        <div style="font-size: 11px; color: #999; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
          This is an automated notification from the Blank Space Website. System Time: ${new Date().toLocaleString()}
        </div>
      </div>
    `
    
    try {
      const { data, error } = await resend.emails.send({ from: FROM, to: ADMIN_EMAILS, subject: adminSubject, html: adminHtml })
      if (error) console.error('[rsvp-admin-email-error]', error)
    } catch (adminEmailError) {
      console.error('[rsvp-admin-email-exception]', adminEmailError)
      // We don't fail the whole request if only admin email fails
    }

    // 3. Send confirmation to the attendee
    const confirmSubject = `Confirmation: You're on the list — ${eventName || "Blank Space Event"}`
    const confirmHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 0; background-color: #fdfaf3; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e0ddd6;">
        <div style="background-color: #1a1a1a; padding: 40px; text-align: center;">
          <p style="margin: 0; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 4px; color: #f37335; margin-bottom: 15px;">Blank Space Events</p>
          <h1 style="margin: 0; font-size: 32px; color: #fff; font-weight: 300; letter-spacing: -0.5px;">You&rsquo;re on the list.</h1>
        </div>

        <div style="padding: 40px; background-color: #fdfaf3;">
          <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px;">Hi ${name},</p>
          
          <p style="font-size: 16px; line-height: 1.7; color: #4a4a4a; margin-bottom: 30px;">
            We&rsquo;ve received your RSVP for <strong style="color: #1a1a1a;">${eventName || "our upcoming event"}</strong>. 
            We&rsquo;re excited to have you join us at the space.
          </p>
          
          <div style="background-color: #fff; border: 2px solid #1a1a1a; padding: 30px; margin-bottom: 35px; position: relative; overflow: hidden;">
            <div style="position: absolute; top: -20px; right: -20px; width: 60px; height: 60px; background-color: #f37335; transform: rotate(45deg);"></div>
            
            <p style="margin: 0; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: #f37335; margin-bottom: 10px;">Ticket Confirmed</p>
            <h2 style="margin: 0; font-size: 24px; color: #1a1a1a; font-weight: bold;">${ticketType || 'General Admission'}</h2>
            
            ${guests && guests.length > 0 ? `
              <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 15px;">
                <p style="margin: 0; font-size: 12px; color: #666; margin-bottom: 8px;">Plus Guest(s):</p>
                <div style="font-size: 14px; font-weight: 500;">
                  ${guests.map((g: { name?: string }) => g.name).join(', ')}
                </div>
              </div>
            ` : ''}
          </div>
          
          <div style="border-left: 3px solid #f37335; padding-left: 20px; margin-bottom: 40px;">
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #4a4a4a; font-style: italic;">
              &ldquo;Space to create, space to connect, space to just be.&rdquo;
            </p>
          </div>

          <p style="font-size: 16px; line-height: 1.7; color: #4a4a4a; margin-bottom: 10px;">
            Need to change something? Simply reply to this email or contact us at <a href="mailto:info@blankspacesl.com" style="color: #f37335; text-decoration: none; font-weight: bold;">info@blankspacesl.com</a>.
          </p>
          
          <div style="margin-top: 50px; padding-top: 30px; border-top: 1px solid #e0ddd6;">
            <p style="margin: 0; font-size: 16px; color: #1a1a1a; font-weight: bold;">See you soon,</p>
            <p style="margin: 5px 0 0; font-size: 14px; color: #666;">The Blank Space Team</p>
          </div>
        </div>
        
        <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
          <p style="margin: 0; font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 2px;">
            2nd Floor, Dove&apos;s Nest, Freetown, Sierra Leone
          </p>
        </div>
      </div>
    `
    
    try {
      const { data, error } = await resend.emails.send({ from: FROM, to: email, subject: confirmSubject, html: confirmHtml })
      if (error) console.error('[rsvp-user-email-error]', error)
    } catch (userEmailError) {
      console.error('[rsvp-user-email-exception]', userEmailError)
      // Similarly, we log but don't fail if the confirm email has an issue
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[rsvp]', err)
    return NextResponse.json({ error: 'Failed to process RSVP.' }, { status: 500 })
  }
}
