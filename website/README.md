# UNI-CHAT — Promotional Website

Static promotional site for the **UNI-CHAT** senior project (graph-based RAG assistant for Hacettepe academic regulations).

Built with **Astro 5** + **Tailwind CSS**. Single-page scrolling layout, vibrant color palette, animated canvas knowledge-graph hero. Ships ~92 KB total.

---

## 🇹🇷 Hızlı Başlangıç (Takım için)

Repo'yu çektikten sonra siteyi yerel makinede çalıştırmak için:

```bash
cd website
npm install          # bağımlılıkları kur (~50 sn, tek seferlik)
npm run dev          # → http://localhost:4321 adresinde açılır
```

Tarayıcıda `http://localhost:4321` adresine gir, siteyi göreceksin. Kod değişikliklerinde sayfa otomatik yenilenir.

**Gereksinim:** Node.js 20+ ([nodejs.org](https://nodejs.org) → LTS sürümü).

**Production build almak için:**

```bash
npm run build        # → ./dist klasöründe statik dosyalar oluşur
npm run preview      # build'i yerelde test et
```

`dist/` klasörünü herhangi bir static hosting'e (S3, Netlify, Vercel, GitHub Pages) yükleyebilirsin. AWS deploy adımları aşağıda ↓

**Canlı önizleme paylaşmak için (en kolay):** Bir kişi AWS Amplify'a bağlasın (aşağıdaki Option A) — her `git push` sonrası otomatik build alıp `*.amplifyapp.com` URL'i üretir, herkes link üzerinden görür.

---

## Local development

```bash
cd website
npm install
npm run dev          # → http://localhost:4321
```

## Production build

```bash
npm run build        # outputs to ./dist
npm run preview      # serve dist locally for QA
```

The `dist/` folder is fully static — no server runtime required.

---

## Project structure

```
website/
├── public/
│   ├── favicon.svg
│   └── team/                       # drop team avatars here later
├── src/
│   ├── layouts/Layout.astro        # <html> shell, fonts, scroll-reveal observer
│   ├── pages/index.astro           # single-page composition
│   ├── components/
│   │   ├── Hero.astro              # title + nav + stats + CTAs
│   │   ├── ParticleNetwork.astro   # animated canvas graph background
│   │   ├── Problem.astro           # the regulation-chaos pitch
│   │   ├── Solution.astro          # 3 pillars + L1/L2/L3 hierarchy diagram
│   │   ├── Pipeline.astro          # 9-step ingestion + query architecture
│   │   ├── Features.astro          # 4 retrieval modes + 4 engineering features
│   │   ├── Benchmark.astro         # LightRAG-vs-baselines bar charts
│   │   ├── Demo.astro              # video placeholder + fake terminal preview
│   │   ├── TechStack.astro         # backend / AI / frontend / infra grid
│   │   ├── Team.astro              # advisor + 4 members
│   │   └── Footer.astro
│   └── styles/global.css           # Tailwind + custom utilities (.btn-*, .glass-card, etc.)
├── astro.config.mjs
├── tailwind.config.mjs             # color palette + animations
└── package.json
```

---

## Customization quick reference

| What | Where |
|------|-------|
| Color palette (Hacettepe red + accents) | `tailwind.config.mjs` → `theme.extend.colors` |
| Team members & advisor | `src/components/Team.astro` |
| Replace demo placeholder with a video | `src/components/Demo.astro` (drop an `<iframe>` or `<video>` into the placeholder block) |
| Update stats (162 docs, 2.4K chunks, etc.) | `src/components/Hero.astro` (stats array) and `src/components/Problem.astro` |
| Update benchmark numbers | `src/components/Benchmark.astro` (`baselines` array) |
| GitHub repo URL | `src/components/Hero.astro` and `src/components/Footer.astro` |

### Adding team photos

1. Drop square images (recommended 400×400, JPG/WebP) into `public/team/` — e.g. `ilhan.jpg`, `berkay.jpg`.
2. In `src/components/Team.astro`, replace the initials block (`{m.initials}`) with `<img src={`/team/${m.image}`} class="..." />` and add an `image` field on each member.

---

## Deploying to AWS

Two recommended options. **Amplify** is the simplest; **S3 + CloudFront** is the most flexible.

### Option A — AWS Amplify (recommended)

1. Push the `final_project` repo to GitHub (already done).
2. In the AWS Console: **Amplify → New app → Host web app → GitHub** → pick the repo and branch.
3. When asked for build settings, paste:

   ```yaml
   version: 1
   applications:
     - appRoot: website
       frontend:
         phases:
           preBuild:
             commands:
               - npm ci
           build:
             commands:
               - npm run build
         artifacts:
           baseDirectory: dist
           files:
             - '**/*'
         cache:
           paths:
             - node_modules/**/*
   ```

4. Deploy. Amplify gives you a free `*.amplifyapp.com` URL with HTTPS, and rebuilds on every push.

### Option B — S3 + CloudFront (fully manual, ~$0.50/month for low traffic)

```bash
# 1. Build locally
npm run build

# 2. Create the S3 bucket (one-time, replace BUCKET with a unique name)
aws s3api create-bucket \
  --bucket uni-chat-site \
  --region eu-central-1 \
  --create-bucket-configuration LocationConstraint=eu-central-1

# 3. Upload (long cache for hashed assets, short cache for HTML)
aws s3 sync dist/ s3://uni-chat-site/ \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html" --exclude "favicon.svg"

aws s3 sync dist/ s3://uni-chat-site/ \
  --cache-control "public, max-age=300" \
  --exclude "*" --include "*.html" --include "favicon.svg"

# 4. Front the bucket with CloudFront for HTTPS + CDN
#    - Origin: the S3 bucket (use OAC, not public bucket policy)
#    - Default root object: index.html
#    - Compress objects automatically: on
#    - Viewer protocol policy: Redirect HTTP to HTTPS

# 5. After every redeploy, invalidate the HTML cache:
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/index.html" "/"
```

For a custom domain (e.g. `uni-chat.dev`), point a Route 53 alias record at the CloudFront distribution and attach an ACM certificate (must be in `us-east-1` for CloudFront).

---

## Notes

- The hero's particle network is a `<canvas>` animation. It pauses when off-screen and respects `prefers-reduced-motion`.
- All sections use a scroll-reveal observer (`.reveal` → `.is-visible`) — set in `Layout.astro`.
- Fonts are loaded from Google Fonts (Inter, Space Grotesk, JetBrains Mono). For air-gapped deployments, self-host the WOFF2s in `public/fonts/` and update the `<link>` in `Layout.astro`.
- No analytics, no tracking, no third-party scripts beyond fonts. Add Plausible or similar in `Layout.astro`'s `<head>` if needed.
