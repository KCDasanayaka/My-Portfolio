import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return Response.json(
        {
          error: "Name, email, and message are required.",
        },
        {
          status: 400,
        }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured.");

      return Response.json(
        {
          error: "Email service is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const resend = new Resend(apiKey);

    // Send email
    const { data, error } = await resend.emails.send({
  from: "Visonext Studios <onboarding@resend.dev>",
  to: ["sakcdasanayaka@gmail.com"],
  replyTo: email,

  subject: `🚀 New Client Inquiry | ${name}`,

  html: `
    <div style="
      margin: 0;
      padding: 40px 20px;
      background-color: #f4f5f7;
      font-family: Arial, Helvetica, sans-serif;
    ">

      <div style="
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid #e5e7eb;
      ">

        <!-- Header -->
        <div style="
          padding: 28px 30px;
          background-color: #111111;
          color: #ffffff;
        ">

          <p style="
            margin: 0 0 8px;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #9ca3af;
          ">
            VISONEXT STUDIOS
          </p>

          <h1 style="
            margin: 0;
            font-size: 24px;
            line-height: 1.3;
            font-weight: 700;
          ">
            New Client Inquiry 🚀
          </h1>

        </div>

        <!-- Intro -->
        <div style="padding: 30px;">

          <p style="
            margin: 0 0 24px;
            font-size: 15px;
            line-height: 1.6;
            color: #555555;
          ">
            Someone has reached out through your portfolio contact form.
          </p>

          <!-- Contact Information -->
          <div style="
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 12px;
            margin-bottom: 24px;
          ">

            <p style="
              margin: 0 0 6px;
              font-size: 11px;
              font-weight: bold;
              letter-spacing: 1px;
              text-transform: uppercase;
              color: #888888;
            ">
              CONTACT
            </p>

            <p style="
              margin: 0 0 14px;
              font-size: 17px;
              font-weight: 600;
              color: #111111;
            ">
              ${name}
            </p>

            <p style="
              margin: 0;
              font-size: 14px;
              color: #555555;
            ">
              <a
                href="mailto:${email}"
                style="
                  color: #3152f5;
                  text-decoration: none;
                "
              >
                ${email}
              </a>
            </p>

          </div>

          <!-- Message -->
          <div style="margin-bottom: 28px;">

            <p style="
              margin: 0 0 10px;
              font-size: 11px;
              font-weight: bold;
              letter-spacing: 1px;
              text-transform: uppercase;
              color: #888888;
            ">
              MESSAGE
            </p>

            <div style="
              padding: 20px;
              background-color: #ffffff;
              border-left: 3px solid #3152f5;
              color: #333333;
              font-size: 15px;
              line-height: 1.7;
            ">
              ${message}
            </div>

          </div>

          <!-- Reply Button -->
          <div style="text-align: center;">

            <a
              href="mailto:${email}"
              style="
                display: inline-block;
                padding: 13px 24px;
                background-color: #111111;
                color: #ffffff;
                text-decoration: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
              "
            >
              Reply to ${name}
            </a>

          </div>

        </div>

        <!-- Footer -->
        <div style="
          padding: 20px 30px;
          border-top: 1px solid #eeeeee;
          background-color: #fafafa;
          text-align: center;
        ">

          <p style="
            margin: 0;
            font-size: 12px;
            color: #999999;
          ">
            Sent from your portfolio contact form
          </p>

          <p style="
            margin: 6px 0 0;
            font-size: 12px;
            color: #bbbbbb;
          ">
            Visonext Studios
          </p>

        </div>

      </div>

    </div>
  `,
});

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        {
          error: "Failed to send email.",
        },
        {
          status: 500,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Email sent successfully.",
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}