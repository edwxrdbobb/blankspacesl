import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = "Blank Space Website <no-reply@blankspacesl.com>"
const TO = ["info@blankspacesl.com", "edwardbobkamara@gmail.com"]

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { formType, ...fields } = body

    const isArtist = formType === "artist"

    const subject = isArtist
      ? `New Booking Request from ${fields.name}`
      : `New Project Brief from ${fields.contactName} — ${fields.company}`

    const html = isArtist
      ? `
        <h2>New Artist Booking Request</h2>
        <table cellpadding="6">
          <tr><td><strong>Name</strong></td><td>${fields.name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${fields.email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${fields.phone || "—"}</td></tr>
          <tr><td><strong>Session Type</strong></td><td>${fields.sessionType || "—"}</td></tr>
          <tr><td><strong>Preferred Date</strong></td><td>${fields.preferredDate || "—"}</td></tr>
          <tr><td><strong>Preferred Time</strong></td><td>${fields.preferredTime || "—"}</td></tr>
          <tr><td><strong>Additional Details</strong></td><td>${fields.message || "—"}</td></tr>
        </table>
      `
      : `
        <h2>New Corporate Project Brief</h2>
        <table cellpadding="6">
          <tr><td><strong>Contact Name</strong></td><td>${fields.contactName}</td></tr>
          <tr><td><strong>Company</strong></td><td>${fields.company}</td></tr>
          <tr><td><strong>Email</strong></td><td>${fields.email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${fields.phone}</td></tr>
          <tr><td><strong>Project Type</strong></td><td>${fields.projectType || "—"}</td></tr>
          <tr><td><strong>Budget Range</strong></td><td>${fields.budget || "—"}</td></tr>
          <tr><td><strong>Timeline</strong></td><td>${fields.timeline || "—"}</td></tr>
          <tr><td><strong>Decision Maker</strong></td><td>${fields.decisionMaker || "—"}</td></tr>
          <tr><td><strong>Project Scope</strong></td><td>${fields.projectScope}</td></tr>
        </table>
      `

    await resend.emails.send({ from: FROM, to: TO, subject, html })

    // Send confirmation to the submitter
    const replyTo = fields.email
    const confirmSubject = "We've received your message — Blank Space"
    const confirmHtml = `
      <p>Hi ${isArtist ? fields.name : fields.contactName},</p>
      <p>Thanks for reaching out to Blank Space. We've received your ${isArtist ? "booking request" : "project brief"} and will get back to you within 24–48 hours.</p>
      <p>— The Blank Space Team</p>
    `
    await resend.emails.send({ from: FROM, to: replyTo, subject: confirmSubject, html: confirmHtml })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[contact]", err)
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 })
  }
}
