import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = "Blank Space <no-reply@blankspacesl.com>"
const NOTIFY_TO = (process.env.ADMIN_EMAILS ?? "info@blankspacesl.com").split(",")

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
    }

    // Notify the team
    await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      subject: "New Newsletter Subscriber",
      html: `<p>New subscriber: <strong>${email}</strong></p>`,
    })

    // Send welcome email to subscriber
    await resend.emails.send({
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

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[newsletter]", err)
    return NextResponse.json({ error: "Failed to subscribe." }, { status: 500 })
  }
}
