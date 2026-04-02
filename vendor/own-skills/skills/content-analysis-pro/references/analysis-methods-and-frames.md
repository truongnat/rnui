# Analysis methods and frames

How to **approach** user-provided **documents**, **images**, and **video** so outputs are **structured**, **traceable**, and **useful** — not a dump of raw model text.

## By modality

| Modality | Typical signals | Analysis angles |
|----------|-----------------|-----------------|
| **Text / office / PDF** | Headings, lists, tables | Outline, entities, claims, **action items**, inconsistencies |
| **Images** | Objects, text (OCR), layout, charts | Describe **what is visible**; read **axis labels** on charts; note **uncertainty** |
| **Video** | Frames, audio track, on-screen text | **Timeline** segments; key moments; transcript summary; **scene** changes |

## Framing questions (before deep read)

1. **Goal** — Summarize, extract facts, compare, assess quality, find risks?
2. **Audience** — Technical vs executive; **language** and **depth**.
3. **Grounding** — What must be **quoted** or **timestamped** vs paraphrased?

## Structured extraction

- **Entities** — People, orgs, dates, amounts, locations (as stated in source).
- **Claims vs evidence** — Separate opinion from cited fact when possible.
- **Structure** — Mirror document hierarchy in the report (sections map to source sections).

## Video-specific

- **Timestamps** — Use `mm:ss` or `hh:mm:ss` for findings (player-dependent).
- **Audio** — If transcript available, align quotes to time; flag **inaudible** regions.
- **Pre-processing (optional)** — Long or heavy files: **sample** frames or **extract** audio for speech-to-text in a separate step; document **sampling** in the report (e.g. “1 frame per minute reviewed”).

### Video without FFmpeg (still valid)

FFmpeg is **one** way to prepare files; it is **not** required if another path gives the model enough signal:

| Path | How it works | Report should say |
|------|----------------|-------------------|
| **Direct video in a multimodal UI** | User uploads **mp4/mov/webm** where the assistant or model **accepts video** and ingests it natively | Tool/model **limits** (max length, file size) if relevant |
| **Transcript or captions** | User provides **SRT/VTT**, meeting export, or **paste** of dialogue with timestamps | Analysis is **speech-centric**; visuals not verified unless user also sends frames/video |
| **Platform transcript** | Link to **YouTube**, etc., plus **auto captions** or description text you can read | You may rely on **text** only; state if **on-screen graphics** were not reviewed |
| **Cloud video APIs** | Upload to a vendor service that returns **labels, shots, transcript** | Cite **API output**; note **no** local decode |
| **Screenshots / clips from user** | User exports **still images** or short clips via **phone, VLC, OS tools** — not FFmpeg on *your* side | Coverage is **partial**; list **which** moments were seen |
| **Audio-only** | User sends **extracted .m4a/.wav** (from any app) for **ASR** | Video picture track was **not** analyzed unless stated otherwise |

**Honesty:** If neither **video-capable analysis** nor **visual samples** exist, do not pretend you saw the pixels — summarize what you **did** receive (e.g. transcript only) and what is **unknown** (scene layout, on-screen text).

## Image-specific

- **OCR** — Transcribe visible text; flag **low confidence** or **illegible** areas.
- **Charts** — Describe type, axes, trends **visible**; do not invent exact numbers not readable.

## Document-specific

- **Multi-page** — Page references for quotes (`p. 3`, `§2.1`).
- **Tables** — Summarize or reproduce compactly; note **merged cells** ambiguity.

## Tooling note

Implementation (APIs, libraries) is **out of scope** for this skill; the skill defines **what** to extract and **how** to report. Use your stack’s vision/OCR/PDF tools and cite their **limitations** in the report.

### FFmpeg / FFprobe (optional CLI pipeline)

Many teams use **[FFmpeg](https://ffmpeg.org/)** and **ffprobe** locally or in CI to **prepare** video before vision or text analysis — this skill does **not** require FFmpeg, but it pairs well with the methodology above:

| Step | Tool | Typical use |
|------|------|-------------|
| Inspect | `ffprobe` | Duration, resolution, codecs, stream list — sanity-check input. |
| Frames | `ffmpeg` | Export still frames at an interval (e.g. one frame every N seconds) for **image** review or cheaper model calls. |
| Audio | `ffmpeg` | Demux audio to **WAV/MP3** for **ASR** (speech-to-text) when the model needs an audio file. |
| Short clip | `ffmpeg` | Cut a **segment** (`-ss`, `-t`) to analyze only part of a long file. |

**Caveats:** Install FFmpeg per your OS; respect **copyright** and **license** of binaries; verify **flags** against current FFmpeg docs (syntax varies by version). Errors in extraction (wrong `-ss` placement, re-encode artifacts) can bias analysis — note **pre-processing** steps in the report when findings depend on them.
