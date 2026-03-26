import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = "Blank Space Events <no-reply@blankspacesl.com>"
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "info@blankspacesl.com").split(",")

export async function POST(req: Request) {
  try {
    const { eventId, eventName, name, email, phone } = await req.json()

    if (!eventId || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 1. Store in Supabase
    const { error: dbError } = await supabaseAdmin
      .from('event_rsvps')
      .insert([
        { 
          event_id: eventId, 
          name, 
          email, 
          phone 
        }
      ])

    if (dbError) {
      console.error('Supabase error:', dbError)
      return NextResponse.json({ error: "Failed to process RSVP." }, { status: 500 })
    }

    // 2. Send notification to Admins
    const adminSubject = `New RSVP: ${eventName || eventId} — ${name}`
    const adminHtml = `
      <div style="font-family: sans-serif; padding: 20px; color: #1a1a1a;">
        <h2 style="color: #f37335; border-bottom: 2px solid #f37335; padding-bottom: 10px;">New Event RSVP</h2>
        <p>A new person has RSVP'd for <strong>${eventName || eventId}</strong>.</p>
        <table cellpadding="8" style="width: 100%; border-collapse: collapse;">
          <tr style="background: #fdfaf3;"><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr style="background: #fdfaf3;"><td><strong>Phone</strong></td><td>${phone || "—"}</td></tr>
        </table>
        <p style="font-size: 12px; color: #666; margin-top: 30px;">Sent from Blank Space Website</p>
      </div>
    `
    
    try {
      await resend.emails.send({ from: FROM, to: ADMIN_EMAILS, subject: adminSubject, html: adminHtml })
    } catch (err) {
      console.error("Admin Email Error:", err)
      // Don't fail the whole request if admin email fails
    }

    // 3. Send confirmation to the Attendee
    const confirmSubject = `Confirmed: You're on the list for ${eventName || "the event"}`
    const confirmHtml = `
      <div style="font-family: serif; padding: 40px; background: #fdfaf3; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a1a;">
        <h1 style="color: #1a1a1a; font-size: 32px; margin-bottom: 20px;">You're on the list!</h1>
        <p style="font-size: 18px; line-height: 1.6;">Hi ${name},</p>
        <p style="font-size: 18px; line-height: 1.6;">Thanks for RSVPing for <strong>${eventName || "Reggie's Jazz Exchange"}</strong>. We've got you down and we're looking forward to seeing you there.</p>
        
        <div style="margin: 30px 0; padding: 20px; border: 2px dashed #f37335;">
          <p style="margin: 0; font-weight: bold; color: #f37335; text-transform: uppercase; letter-spacing: 2px;">Event Reminder</p>
          <p style="margin: 10px 0 0; font-size: 20px;">April 30th @ Dove's Nest</p>
          <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.7;">Doors open at 7:00 PM</p>
        </div>

        <p style="font-size: 18px; line-height: 1.6;">If you have any questions, feel free to contact us at info@blankspacesl.com.</p>
        <p style="font-size: 18px; margin-top: 40px;">— The Blank Space Team</p>
      </div>
    `
    
    try {
      await resend.emails.send({ from: FROM, to: email, subject: confirmSubject, html: confirmHtml })
    } catch (err) {
      console.error("Attendee Email Error:", err)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('RSVP API Error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
