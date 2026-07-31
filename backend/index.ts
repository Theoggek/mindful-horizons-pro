import { Hono } from "hono"
import { cors } from "hono/cors"
import { createClient } from "@blinkdotnew/sdk"

const app = new Hono()

app.use("*", cors())

const getBlink = (env: Record<string, string>) =>
  createClient({
    projectId: env.BLINK_PROJECT_ID,
    secretKey: env.BLINK_SECRET_KEY,
  })

app.get("/health", (c) => c.json({ ok: true }))

app.post("/api/contact", async (c) => {
  const blink = getBlink(c.env as Record<string, string>)

  let body: {
    fullName: string
    email: string
    company?: string
    phone?: string
    message: string
  }

  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: "Invalid request body" }, 400)
  }

  const { fullName, email, company, phone, message } = body

  if (!fullName || !email || !message) {
    return c.json({ error: "Full name, email, and message are required." }, 400)
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return c.json({ error: "Invalid email address." }, 400)
  }

  try {
    await blink.notifications.email({
      to: "contact@mindful-horizons.com",
      replyTo: email,
      subject: `New Contact Form Message from ${fullName}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #1C1917;">
          <div style="background: #1B4332; padding: 28px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #FFFFFF; margin: 0; font-size: 22px; font-weight: 700;">New Contact Form Submission</h1>
            <p style="color: #D4A96A; margin: 6px 0 0; font-size: 14px;">Mindful Horizons Pro</p>
          </div>
          <div style="background: #FFFFFF; padding: 32px; border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; font-size: 13px; color: #6B7280; width: 130px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; font-size: 15px; color: #1C1917; font-weight: 600;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; font-size: 13px; color: #6B7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; font-size: 15px; color: #1C1917;"><a href="mailto:${email}" style="color: #1B4332;">${email}</a></td>
              </tr>
              ${company ? `<tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; font-size: 13px; color: #6B7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Company</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; font-size: 15px; color: #1C1917;">${company}</td>
              </tr>` : ''}
              ${phone ? `<tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; font-size: 13px; color: #6B7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; font-size: 15px; color: #1C1917;"><a href="tel:${phone}" style="color: #1B4332;">${phone}</a></td>
              </tr>` : ''}
            </table>
            <div style="margin-top: 24px;">
              <p style="font-size: 13px; color: #6B7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px;">Message</p>
              <div style="background: #F9FAFB; border-radius: 8px; padding: 16px; font-size: 15px; color: #1C1917; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>
            <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background: #1B4332; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 14px;">Reply to ${fullName}</a>
            </div>
          </div>
          <p style="text-align: center; font-size: 12px; color: #9CA3AF; margin-top: 16px;">Mindful Horizons Pro · mindful-horizons.com</p>
        </div>
      `,
      text: `New Contact Form Submission\n\nFull Name: ${fullName}\nEmail: ${email}${company ? `\nCompany: ${company}` : ''}${phone ? `\nPhone: ${phone}` : ''}\n\nMessage:\n${message}\n\n---\nReply directly to: ${email}`,
    })

    return c.json({ success: true })
  } catch (err) {
    console.error("Failed to send contact email:", err)
    return c.json({ error: "Failed to send message. Please try again." }, 500)
  }
})

export default app
