# React + TypeScript + Vite

## Razorpay consultation payments

Consultation bookings are reserved as `pending_payment` and become confirmed
only after the server verifies a captured Razorpay payment. The Razorpay secret
key is used only by Supabase Edge Functions; never add it to a `VITE_` variable
or browser code.

1. Link the Supabase CLI to the project and apply the migrations:

   ```sh
   supabase link --project-ref <project-ref>
   supabase db push
   ```

2. In Razorpay test mode, set these Supabase Edge Function secrets:
   `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `RAZORPAY_WEBHOOK_SECRET`.
   Supabase provides its standard URL and API keys to Edge Functions. Never
   commit the Razorpay values or put the Razorpay secret in a frontend env var.

3. Deploy the functions:

   ```sh
   supabase functions deploy create-razorpay-order
   supabase functions deploy verify-razorpay-payment
   supabase functions deploy razorpay-webhook
   ```

4. In the Razorpay dashboard, add a webhook at
   `https://<project-ref>.supabase.co/functions/v1/razorpay-webhook`, use the
   same webhook secret, and enable `payment.captured` and `payment.failed`.
   The webhook function is intentionally deployed without Supabase JWT
   verification; it authenticates events using Razorpay's webhook signature.

5. Configure the app's existing `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_PUBLISHABLE_KEY`, then test a full booking using Razorpay test
   credentials before switching to live credentials.

Each retry creates a fresh Razorpay order for the same pending reservation.
Expired unpaid reservations are released on the next booking attempt. A
captured payment for an expired reservation is refunded by the webhook handler.

Run the payment-security unit tests with Deno:

```sh
deno test supabase/functions/_shared/security.test.ts
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
