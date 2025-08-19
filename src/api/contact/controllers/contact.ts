// ./src/api/contact/controllers/contact.js

import { factories } from "@strapi/strapi";
import { log } from 'console';
interface Contact {
  data: {
    formData: {
      Firstname: string;
      Lastname: string;
      Email: string;
      Message: string;
      contactOption: string;
      Score: number;
    };
    token: string;
  };
}
export default factories.createCoreController(
  "api::contact.contact",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        const request: Contact = ctx.request.body as Contact;
        // Sanitize the input data
        const sanitizedInput = (await this.sanitizeInput(
          request.data.formData,
          ctx,
        )) as Record<string, any>;
        log(`Sanitized input: ${JSON.stringify(sanitizedInput)}`);
        const verification = await strapi.services[
          "api::contact.recaptcha"
        ].validate(request.data.token);
        // If the captcha is invalid or the score is below 0.5, return an error response
        log(`Captcha verification result: ${JSON.stringify(verification)}`);

        if (!verification.valid || verification.score < 0.5) {
          ctx.status = 400;
          ctx.body = "Captcha verification failed";
          return;
        }
        // Store the contact message in the database
        await strapi.documents("api::contact.contact").create({
          data: {
            ...sanitizedInput,
            Score: verification.score,
          },
        });

        const formData = request.data.formData;
        const contact = await strapi
          .service("api::contact-distribution-list.contact-distribution-list")
          .findOne(formData.contactOption, {});

        await strapi.plugins["email"].services.email.send({
          from: "hallo@pfadi-nuenenen.ch",
          to: contact.Email,
          replyTo: formData.Email,
          subject: `Nachricht / ${formData.Firstname} ${formData.Lastname}`,
          html: `
          <!DOCTYPE html>
          <html lang="de">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Neue Nachricht</title>
              <style>
                  body {
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                      margin: 0;
                      padding: 20px;
                      background: #f5f5f5;
                      color: #0d1624;
                  }

                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      background: white;
                      border-radius: 8px;
                      overflow: hidden;
                      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                  }

                  .header {
                      background: #b1138b;
                      color: white;
                      padding: 32px;
                      text-align: center;
                  }

                  .header h1 {
                      margin: 0;
                      font-size: 24px;
                      font-weight: 500;
                  }

                  .main {
                      padding: 40px;
                  }

                  .message {
                      margin-bottom: 32px;
                  }

                  .label {
                      font-size: 12px;
                      color: #b1138b;
                      font-weight: 600;
                      text-transform: uppercase;
                      letter-spacing: 1px;
                      margin-bottom: 12px;
                  }

                  .message-text {
                      background: #f9f9f9;
                      padding: 24px;
                      border-radius: 6px;
                      border-left: 3px solid #b1138b;
                      line-height: 1.6;
                      font-size: 16px;
                  }

                  .sender {
                      background: #f9f9f9;
                      padding: 20px 24px;
                      border-radius: 6px;
                  }

                  .sender-email {
                      color: #0d1624;
                      font-weight: 500;
                      font-size: 15px;
                  }

                  .footer {
                      padding: 24px 40px;
                      text-align: center;
                      background: #f9f9f9;
                      font-size: 13px;
                      color: #666;
                      border-top: 1px solid #eee;
                  }

                  .footer a {
                      color: #b1138b;
                      text-decoration: none;
                  }

                  @media (max-width: 600px) {
                      .container {
                          margin: 10px;
                          border-radius: 6px;
                      }

                      .header {
                          padding: 24px 20px;
                      }

                      .main {
                          padding: 24px 20px;
                      }

                      .footer {
                          padding: 20px;
                      }
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <h1>Neue Nachricht</h1>
                  </div>

                  <div class="main">
                      <div class="message">
                          <div class="label">Nachricht</div>
                          <div class="message-text">
                              ${formData.Message}
                          </div>
                      </div>

                      <div class="sender">
                          <div class="label">Von</div>
                          <div class="sender-email">${formData.Email}</div>
                      </div>
                  </div>

                  <div class="footer">
                      <a href="https://www.pfadi-nuenenen.ch">pfadi-nuenenen.ch</a>
                  </div>
              </div>
          </body>
          </html>
          `,
        });
        ctx.body = "Contact message submitted successfully";
      } catch (error) {
         console.error('Detailed email error:', error);
        ctx.status = 500;
        ctx.body = `Internal server error: ${JSON.stringify(error)}`;
        console.error(`Internal server error: ${JSON.stringify(error)}`);
      }
    },
  }),
);
