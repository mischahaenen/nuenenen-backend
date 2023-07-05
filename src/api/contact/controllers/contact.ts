// ./src/api/contact/controllers/contact.js

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::contact.contact",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        const sanitizedQueryParams = await this.sanitizeInput(ctx);
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

        ctx.body = "Contact message submitted successfully";
      } catch (err) {
        ctx.status = 500;
        ctx.body = "Internal server error";
      }
    },
  })
);
