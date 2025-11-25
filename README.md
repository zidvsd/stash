<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
</head>
<body>
  <header>
    <div class="badge">version 0.1.0</div>
    <h1>Stash</h1>
    <p>A small personal finance tracker built with <strong>Next.js</strong>, <strong>Supabase</strong> and <strong>Tailwind CSS</strong>. Stash lets you record expenses, view recent transactions, and analyze spending with charts.</p>
    <p class="muted"><strong>Tech stack</strong>: Next.js 16 · React 19 · Tailwind CSS 4 · Supabase · Recharts · Zustand</p>
    <hr />
  </header>
  <section>
  <h2>Demo</h2>
  <p>https://stash-lemon.vercel.app/</p>
</section>
  <main>
    <section>
      <h2>What this project does</h2>
      <p>Stash is a simple expense tracker web application that helps you:</p>
      <ul>
        <li>Add and manage expenses (category, amount, note, date)</li>
        <li>View recent expenses in a responsive table</li>
        <li>Analyze spending with charts (pie chart by category, other visualizations)</li>
        <li>Persist data using Supabase (Postgres + auth)</li>
      </ul>
      <p><strong>Project layout (key folders):</strong></p>
      <ul>
        <li><code>app/</code> – Next.js App Router pages and layouts</li>
        <li><code>components/</code> – UI components (cards, forms, charts, nav, theme toggle)</li>
        <li><code>components/charts</code> – Recharts-based chart components (Pie, Line)</li>
        <li><code>lib/</code> – utilities, categories, currencies and supabase helpers</li>
        <li><code>store/</code> – lightweight client state (Zustand)</li>
      </ul>
    </section>
    <section>
      <h2>Why it’s useful</h2>
      <ul>
        <li>Lightweight, opinionated starter for building personal finance or expense tracking apps</li>
        <li>Ready-made UI components and charts so you can focus on features</li>
        <li>Uses Supabase for quick backend (no server code required for many features)</li>
        <li>Easy to extend: add budgets, recurring payments, reports</li>
      </ul>
    </section>
    <section>
      <h2>Quick Start</h2>
      <p><strong>Prerequisites</strong></p>
      <ul>
        <li>Node.js 18+ (tested on Node 18/20)</li>
        <li>npm or pnpm</li>
        <li>A Supabase project (for database and optional authentication)</li>
      </ul>
      <ol>
        <li><strong>Clone the repo</strong>
          <pre><code>git clone &lt;your-repo-url&gt; stash
cd stash</code></pre>
        </li>
        <li><strong>Install dependencies</strong>
          <pre><code>npm install
# or
# pnpm install</code></pre>
        </li>
        <li><strong>Configure environment variables</strong>
          <p>Create a <code>.env.local</code> file in the project root with the following (replace with your Supabase values):</p>
          <pre><code># Supabase (client)
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=public-anon-key</code></pre>
          <div class="note">Notes:
            <ul>
              <li><code>lib/supabase/client.ts</code> uses <code>createBrowserClient</code> and reads these <code>NEXT_PUBLIC_*</code> values.</li>
              <li>For server-side Supabase usage (if added), you may also need <code>SUPABASE_SERVICE_ROLE_KEY</code> or similar server keys, but this starter only requires the public client keys for the browser.</li>
            </ul>
          </div>
        </li>
        <li><strong>Run the development server</strong>
          <pre><code>npm run dev
# Open http://localhost:3000</code></pre>
        </li>
        <li><strong>Build for production</strong>
          <pre><code>npm run build
npm run start</code></pre>
        </li>
      </ol>
    </section>
    <section>
      <h2>Pages &amp; Usage</h2>
      <ul>
        <li><code>/</code> – landing / dashboard</li>
        <li><code>/add-expense</code> – add an expense</li>
        <li><code>/analytics</code> – charts and spending breakdown</li>
        <li><code>/profile</code> – user profile (backed by Supabase profile helpers)</li>
        <li><code>app/(auth)/login</code> and <code>app/(auth)/signin</code> – auth flows</li>
      </ul>
      <p><strong>Components you’ll likely edit or reuse:</strong></p>
      <ul>
        <li><code>components/AddExpenseForm.tsx</code> – the expense entry form</li>
        <li><code>components/charts/*</code> – Recharts chart components (PieChart, LineChart)</li>
        <li><code>components/theme-provider.tsx</code> and <code>components/DarkModeToggle.tsx</code> – theme handling</li>
      </ul>
      <p><strong>Examples</strong></p>
      <ul>
        <li>Adding an expense stores it in Supabase via helpers in <code>lib/supabase/expenses.ts</code> and updates the local Zustand store in <code>store/expenseStore.ts</code>.</li>
        <li>Charts are built with <code>recharts</code> inside <code>components/ui/chart.tsx</code> wrapper; to tweak animation or responsiveness, edit the chart components in <code>components/charts/</code>.</li>
      </ul>
    </section>
    <section>
      <h2>Environment &amp; Deployment Notes</h2>
      <ul>
        <li>This app is built for static+serverless environments (Vercel, Netlify). When deploying, set the same environment variables (<code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>) in your host.</li>
        <li>For true server-side Supabase usage add server-only service role keys as secure environment variables.</li>
      </ul>
    </section>
    <section>
      <h2>Troubleshooting / Common Gotchas</h2>
      <ul>
        <li>If charts or animations stutter, try setting an explicit height on the chart container (see <code>components/charts/PieChart.tsx</code>) or adjust Recharts <code>animationDuration</code>.</li>
        <li>If theme or color variables change instantly (no transition), ensure Tailwind CSS and global styles (<code>app/globals.css</code>) include transitions for <code>background-color</code>, <code>color</code>, and <code>border-color</code>.</li>
        <li>If Supabase calls fail in the browser, confirm <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> are correct and not empty.</li>
      </ul>
    </section>
    <section>
      <h2>Where to get help</h2>
      <ul>
        <li>Open an issue in this repository</li>
        <li>Submit a PR for bug fixes or features</li>
        <li>If this project is used as a starter in your organization, keep an internal README with deployment steps and secrets management</li>
      </ul>
    </section>
    <section>
      <h2>Maintenance &amp; Contributing</h2>
      <p><strong>Maintainer:</strong> <code>zidvsd</code> (repository owner)</p>
      <p>If you want to contribute:</p>
      <ol>
        <li>Fork the repo</li>
        <li>Create a descriptive branch (<code>feat/</code>, <code>fix/</code>, <code>docs/</code>)</li>
        <li>Add tests where applicable and keep changes focused</li>
        <li>Open a pull request with a clear description</li>
      </ol>
      <p>If you plan to contribute regularly, consider adding a <code>CONTRIBUTING.md</code> file with repository-specific guidelines. This README intentionally keeps contribution steps brief — see <code>CONTRIBUTING.md</code> if present.</p>
    </section>
    <section>
      <h2>License</h2>
      <p>See <code>LICENSE</code> in the repository root for license details (if present).</p>
    </section>
    <section>
      <h2>Acknowledgements</h2>
      <ul>
        <li>Built with Next.js, Supabase and Tailwind CSS</li>
        <li>UI patterns inspired by community components and shadcn/ui</li>
      </ul>
      <p>If you'd like, I can also:</p>
      <ul>
        <li>Add a short <code>CONTRIBUTING.md</code> template and <code>ISSUE_TEMPLATE.md</code>/<code>PULL_REQUEST_TEMPLATE.md</code> to the repo</li>
        <li>Add a <code>docs/</code> folder with architecture notes and a small diagram</li>
      </ul>
    </section>
  </main>
  <footer>
    <p>Happy hacking — open an issue or PR if you want any of the follow-ups above!</p>
  </footer>
</body>
</html>
