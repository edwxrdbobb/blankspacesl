import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/admin-auth'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { to, subject, message } = await request.json()

    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const recipients = Array.isArray(to) ? to : [to]
    if (recipients.length === 0) {
      return NextResponse.json({ error: 'No recipients provided' }, { status: 400 })
    }

    // Send individual emails to prevent recipients from seeing each other
    const emailPromises = recipients.map((recipient: string) => {
      return resend.emails.send({
        from: 'BLANKSPACE <info@blankspacesl.com>',
        to: [recipient],
        subject: subject,
        text: message,
        html: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h2 style="color: #000;">BLANKSPACE</h2>
          <div style="padding: 20px; background: #f9f9f9; border-radius: 10px; line-height: 1.6;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
          <p style="font-size: 12px; color: #666; margin-top: 20px;">
            This message was sent from the BLANKSPACE Administration Panel.
          </p>
        </div>`
      })
    })

    const results = await Promise.allSettled(emailPromises)
    const failures = results.filter((result) => result.status === 'rejected' || (result.status === 'fulfilled' && result.value.error))
    
    if (failures.length > 0) {
      console.error('Some emails failed to send:', failures)
    }

    // Even if some failed, return success if at least one tried. 
    // In a prod system, more robust error reporting should be done.
    if (failures.length === recipients.length) {
      return NextResponse.json({ error: 'All emails failed to send.' }, { status: 400 })
    }

    return NextResponse.json({ success: true, count: recipients.length - failures.length })
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
