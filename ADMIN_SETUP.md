# Portfolio admin setup

The `/admin` dashboard stores portfolio content, contact messages, and
privacy-conscious visit counts in MongoDB. Until a content document is saved,
the public portfolio uses its built-in defaults.

## 1. Configure MongoDB and the admin account

1. Create a MongoDB Atlas cluster (or use an existing MongoDB deployment).
   Create a database user and allow your app's hosting provider to connect in
   Network Access.
2. Create or update `.env.local` and set:

   ```text
   MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
   MONGODB_DB=portfolio
   ADMIN_EMAIL=you@example.com
   ADMIN_PASSWORD=use-a-long-unique-password
   ADMIN_SESSION_SECRET=<at-least-32-random-characters>
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=your-sending-address@gmail.com
   SMTP_PASSWORD=<your-email-provider-app-password>
   SMTP_FROM=your-sending-address@gmail.com
   ```

   URL-encode special characters in the MongoDB username or password. Keep
   these values server-side; do not prefix them with `NEXT_PUBLIC_`.
   Generate a session secret with
   `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"`.
   SMTP settings are required for email notifications. For Gmail, use an
   app password (not your regular account password); use the SMTP host and
   port provided by your email provider. `SMTP_FROM` is optional and defaults
   to `SMTP_USER`. Contact messages are still saved in the admin inbox if
   SMTP is not configured or email delivery fails.
3. Add the same server-side variables to your hosting provider and deploy the
   app. Restart the development server after changing `.env.local`.

## 2. Use the dashboard

Open `/admin` and sign in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`. The admin
session is held in a signed, HTTP-only cookie and expires after 12 hours.
Portfolio sections can be edited and saved from the dashboard. The Messages
tab lists contact form submissions; messages can be marked read or deleted.
The Portfolio visits tab shows unique browsers recorded per day, total visits,
and visit email notification status. A random, HTTP-only browser cookie is used
to count each browser once per day; IP addresses and personal visitor details
are not stored. New contact messages and new daily visits send notifications
to `waleedcoderz@gmail.com` when SMTP is configured.

MongoDB stores the portfolio document in the `portfolio_content` collection,
contact submissions in `contact_messages`, and visit counts in
`portfolio_visits`. The public contact form saves submissions to MongoDB when
configured; if MongoDB is not configured, it opens the visitor's email app as
a fallback.
