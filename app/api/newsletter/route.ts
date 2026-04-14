import { Resend } from "resend"
import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = "Blank Space <no-reply@tar1k.com>"
const NOTIFY_TO = (process.env.ADMIN_EMAILS ?? "info@blankspacesl.com").split(",")

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
    }

    // Store in Supabase
    const { error: dbError } = await supabaseAdmin
      .from('newsletter_subscriptions')
      .upsert({ email }, { onConflict: 'email' })

    if (dbError) {
      console.error("[newsletter-db]", dbError)
      // We continue even if DB fails, as email notification is also important
      // or we could return error if preferred. Let's return error to ensure data integrity.
      return NextResponse.json({ error: "Failed to store subscription." }, { status: 500 })
    }

    try {
      // Notify the team
      const { data: adminData, error: adminError } = await resend.emails.send({
        from: FROM,
        to: NOTIFY_TO,
        subject: "New Newsletter Subscriber",
        html: `<p>New subscriber: <strong>${email}</strong></p>`,
      })
      if (adminError) console.error("[newsletter-admin-email-error]", adminError)

      // Send welcome email to subscriber
      const { data: userData, error: userError } = await resend.emails.send({
        from: FROM,
        to: email,
        subject: "You're on the list — Blank Space",
        html: `
          <p>Hey there,</p>
          <p>You're now subscribed to updates from <strong>Blank Space</strong> — Freetown's home for professional recording, content development, and creative productions.</p>
          <p>Expect new releases, artist spotlights, and creative tips straight to your inbox.</p>
          <p>— The Blank Space Team</p>
        `,
      })
      if (userError) console.error("[newsletter-user-email-error]", userError)
    } catch (emailErr) {
      console.error("[newsletter-email-exception]", emailErr)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[newsletter]", err)
    return NextResponse.json({ error: "Failed to subscribe." }, { status: 500 })
  }
}
