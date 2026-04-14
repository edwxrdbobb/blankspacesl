import { Resend } from "resend"
import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = "Blank Space Website <no-reply@tar1k.com>"
const TO = (process.env.ADMIN_EMAILS ?? "info@blankspacesl.com").split(",")

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

    // Store in Supabase
    const submissionData = isArtist
      ? {
          form_type: "artist",
          artist_name: fields.name,
          artist_email: fields.email,
          artist_phone: fields.phone,
          session_type: fields.sessionType,
          preferred_date: fields.preferredDate || null,
          preferred_time: fields.preferredTime,
          artist_message: fields.message,
        }
      : {
          form_type: "corporate",
          corp_contact_name: fields.contactName,
          corp_company: fields.company,
          corp_email: fields.email,
          corp_phone: fields.phone,
          corp_project_type: fields.projectType,
          corp_budget: fields.budget,
          corp_timeline: fields.timeline,
          corp_decision_maker: fields.decisionMaker,
          corp_project_scope: fields.projectScope,
        }

    const { error: dbError } = await supabaseAdmin
      .from('contact_submissions')
      .insert(submissionData)

    if (dbError) {
      console.error("[contact-db]", dbError)
      return NextResponse.json({ error: "Failed to store submission." }, { status: 500 })
    }

    try {
      const { data: adminData, error: adminError } = await resend.emails.send({ from: FROM, to: TO, subject, html })
      if (adminError) console.error("[contact-admin-email-error]", adminError)

      // Send confirmation to the submitter
      const replyTo = fields.email
      const confirmSubject = "We've received your message — Blank Space"
      const confirmHtml = `
        <p>Hi ${isArtist ? fields.name : fields.contactName},</p>
        <p>Thanks for reaching out to Blank Space. We've received your ${isArtist ? "booking request" : "project brief"} and will get back to you within 24–48 hours.</p>
        <p>— The Blank Space Team</p>
      `
      const { data: userData, error: userError } = await resend.emails.send({ from: FROM, to: replyTo, subject: confirmSubject, html: confirmHtml })
      if (userError) console.error("[contact-user-email-error]", userError)

    } catch (emailErr) {
      console.error("[contact-email-exception]", emailErr)
      // We log but don't strictly fail the response if DB insertion was successful
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[contact-fatal]", err)
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 })
  }
}
