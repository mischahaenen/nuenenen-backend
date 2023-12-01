// ./src/api/contact/controllers/contact.js

import { factories } from "@strapi/strapi";
import { sanitize, validate } from "@strapi/utils";
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
        await this.validateQuery(ctx);
        await this.validateInput(ctx.request, ctx);
        const request: Contact = ctx.request.body as Contact;
        //TODO Sanitize the input parameters returns {}
        //const input: any = await this.sanitizeInput(ctx.request, ctx);
        const verification = await strapi.services[
          "api::contact.recaptcha"
        ].validate(request.data.token);
        // If the captcha is invalid or the score is below 0.5, return an error response
        if (!verification.valid || verification.score < 0.5) {
          ctx.status = 400;
          ctx.body = "Captcha verification failed";
          return;
        }
        // Store the contact message in the database
        await strapi.entityService.create("api::contact.contact", {
          data: {
            ...(request.data.formData as any),
            Score: verification.score,
          },
        });

        const formData = request.data.formData;

        const contact = await strapi
          .service("api::contact-distribution-list.contact-distribution-list")
          .findOne(formData.contactOption);

        await strapi.plugins["email"].services.email.send({
          to: contact.Email,
          from: "hallo@pfadi-nuenenen.ch",
          replyTo: {
            email: formData.Email,
            name: `${formData.Firstname} ${formData.Lastname}`,
          },
          subject: `Nachricht / ${formData.Firstname} ${formData.Lastname}`,
          html: `
          <html>
          <head>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                  }
                  .container {
                      max-width: 600px;
                      margin: 20px auto;
                      padding: 20px;
                      border: 1px solid #eaeaea;
                  }
                  .content {
                      margin-top: 20px;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h2>Neue Nachricht 📩</h2>
                  <div class="content">
                      <p>${formData.Message}</p>
                      <strong>Von:</strong>
                      <p>${formData.Email} 📧</p>
                  </div>
              </div>
          </body>
          </html>
          `,
        });

        ctx.body = "Contact message submitted successfully";
      } catch (err) {
        ctx.status = 500;
        ctx.body = `Internal server error: ${JSON.stringify(err)}`;
        console.error(`Internal server error: ${JSON.stringify(err)}`);
      }
    },
  })
);
/* export default factories.createCoreController(
  "api::contact.contact",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        const sanitizedQueryParams = await this.sanitizeQuery(ctx);
        console.log(sanitizedQueryParams);
        const verification = await strapi.services[
          "api::contact.recaptcha"
        ].validate(sanitizedQueryParams.request.body.data.token);
        // If the captcha is invalid or the score is below 0.5, return an error response
        if (!verification.valid || verification.score < 0.5) {
          ctx.status = 400;
          ctx.body = "Captcha verification failed";
          return;
        }
        // Store the contact message in the database
        const formData = sanitizedQueryParams.request.body.data.formData;
        await strapi.entityService.create("api::contact.contact", {
          data: {
            Firstname: formData.firstname,
            Lastname: formData.lastname,
            Email: formData.email,
            Message: formData.message,
            contactOption: formData.contactOption,
            Score: verification.score,
          },
        });

        const contact = await strapi
          .service("api::contact-distribution-list.contact-distribution-list")
          .findOne(formData.contactOption);

        await strapi.plugins["email"].services.email.send({
          to: contact.Email,
          from: "hallo@pfadi-nuenenen.ch",
          replyTo: {
            email: formData.email,
            name: `${formData.firstname} ${formData.firstname}`,
          },
          subject: `Nachricht / ${formData.firstname} ${formData.firstname}`,
          html: `
          <html>
          <head>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                  }
                  .container {
                      max-width: 600px;
                      margin: 20px auto;
                      padding: 20px;
                      border: 1px solid #eaeaea;
                  }
                  .content {
                      margin-top: 20px;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h2>Neue Nachricht 📩</h2>
                  <div class="content">
                      <p>${formData.message}</p>
                      <strong>Von:</strong>
                      <p>${formData.email} 📧</p>
                  </div>
              </div>
          </body>
          </html>
          `,
        });

        ctx.body = "Contact message submitted successfully";
      } catch (err) {
        ctx.status = 500;
        ctx.body = `Internal server error: ${JSON.stringify(err)}`;
        console.error(`Internal server error: ${JSON.stringify(err)}`);
      }
    },
  })
);
 */
