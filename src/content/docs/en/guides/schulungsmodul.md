---
title: "Training module (LMS)"
description: "Set up self-hosted mandatory video training: video storage, automatic assignment, comprehension quizzes, deadlines and audit-proof certificates."
sidebar:
  order: 3
---

The **training module (LMS – Learning Management System)** provides the logical follow-up to a phishing simulation: anyone who fails is automatically assigned **self-hosted mandatory training with videos** — no third-party CDN, with an audit-proof record.

:::note[Enterprise add-on]
The LMS is part of the **Enterprise add-on** and unlocked via license. Without a valid Enterprise license the area is locked. The open-core and the Business add-on do not include the module — see [Features](/en/reference/funktionen/).
:::

## What the LMS does

- **Video-based mandatory training**, fully **self-hosted** — the videos live in your own storage, no external CDN is contacted.
- **Automatic course assignment** when an **awareness threshold** (human-risk score) is undercut — risky people are enrolled without manual effort.
- **Tamper-proof progress tracking**: only the **actually watched playback time** counts; skipping ahead does not satisfy the requirement.
- **Comprehension quiz** per course as a final check.
- **Deadlines with reminders and overdue escalation**.
- **Audit-proof training records** as a PDF with an integrity hash; they remain accessible **even after the license expires**.
- **Completion reporting** with **CSV export**, plus integration into the enterprise reporting (training progress, certificate status) on the reports page.

## Configure video storage (`.env`)

Where training videos are stored is an operator value and is set in the `.env` — analogous to [GeoIP](/en/guides/konfiguration/#geoip--country-statistics-optional). Two backends are available: the local filesystem (default) or an S3-compatible object store (e.g. a **self-hosted MinIO**).

```ini title=".env — local filesystem"
# Storage backend: filesystem (default) or s3
LMS_STORAGE_BACKEND=filesystem

# Location of the video files (mounted as a volume into the container)
LMS_MEDIA_DIR=/data/lms-media
```

```ini title=".env — S3-compatible (e.g. MinIO)"
LMS_STORAGE_BACKEND=s3

# S3 access; the specific LMS_S3_* keys (endpoint, bucket, access/secret key,
# region) follow the standard S3 scheme — take the names and order from the
# .env.example of the respective release.
LMS_S3_ENDPOINT=https://minio.example.internal
LMS_S3_BUCKET=sentrymail-lms
LMS_S3_ACCESS_KEY=…
LMS_S3_SECRET_KEY=…
```

- With **`filesystem`**, `LMS_MEDIA_DIR` must be mounted as a persistent volume so uploaded videos survive a stack update (see [Installation](/en/guides/installation/)).
- With **`s3`**, storage still stays in your own hands when using a self-hosted MinIO or an internal object store — the self-hosting promise is preserved.
- Credentials live exclusively in the `.env`; they are not stored in the database.

## Provide courses and videos

In the dashboard, an admin manages training in the **training area** (Enterprise). A typical flow:

1. **Create a course** — set title, description and language.
2. **Upload a video** — the file lands in the configured storage backend (filesystem or S3); no external service is involved.
3. **Add a comprehension quiz** — define questions with answer options and a pass mark.
4. **Set pass rules** — required watched share of the video plus quiz result.

Only once the required playback time has been **actually watched** and the quiz passed does the course count as completed.

## Automatic risk-based assignment

The LMS ties into **human risk management** ([Features → Tracking & results](/en/reference/funktionen/#tracking--results)):

- An **awareness threshold** defines the risk score at which a person is enrolled.
- If a person's score drops below that value after a campaign (e.g. a click or data entry), the associated course is **assigned automatically**.
- Alternatively, courses can be assigned **manually** to individuals or groups.

## Deadlines, reminders, escalation

- Each assignment has a **deadline** for completion.
- **Reminders** are sent before the deadline.
- Once exceeded, an **overdue escalation** kicks in (e.g. a notice to responsible parties); overdue training is visible in the reporting.

## Certificates & records

- After passing a course, the LMS generates an **audit-proof training record** as a PDF with an **integrity hash** to prevent forgery.
- Logo and company data from **Settings → PDF reports** are embedded as a header (see [Configuration → PDF reports](/en/guides/konfiguration/#pdf-reports-logo-and-company-data-business)).
- Certificates and training records remain accessible **even after the Enterprise license expires** — auditability is not lost.
- Progress and certificate status appear in the **enterprise reporting** and can be exported as **CSV**; the **evidence center** provides the matching compliance documents ([Features](/en/reference/funktionen/#business-edition-add-on)).

## Relevance for NIS2 / BSI

Documented, mandatory training with evidence directly addresses the requirements of **NIS2 Art. 21** (cyber hygiene and training) and the BSI building block **ORP.3 "Awareness and training"**. The LMS thus closes the loop "simulate → measure → train → prove" — details under [NIS2 and BSI](/en/reference/nis2-und-bsi/).

See also: [Features](/en/reference/funktionen/) · [Configuration](/en/guides/konfiguration/) · [Roadmap](/en/reference/roadmap/)
