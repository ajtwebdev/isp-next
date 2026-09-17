/**
 * Per-category SEO titles and intro copy for the archives at /blog/{slug}.
 *
 * Keyed by the WordPress category slug. Any category missing from this map
 * falls back to the generic title/description built in pages/blog/[slug].js,
 * so adding a category in WordPress can never break the archive page.
 */
export const CATEGORY_SEO = {
  blogs: {
    title: "Boudoir Photography Stories & Insights",
    intro:
      "Stories, reflections and behind-the-scenes notes from the Inner Spirit studio in Calgary. Each post follows a real session and the woman at the centre of it.",
  },
  "body-painting": {
    title: "Body Painting Photography",
    intro:
      "Body painting turns skin into canvas, creating a second skin that is both covering and revealing. These sessions are among the most creative work we do.",
  },
  boudoir: {
    title: "Boudoir Photography Sessions",
    intro:
      "Boudoir at Inner Spirit is about how a woman sees herself, not about the camera. These stories follow clients through sessions that changed that view.",
  },
  confidence: {
    title: "Confidence & Self-Image",
    intro:
      "Confidence is the thread running through nearly every session at the studio. These posts explore how women arrive, what shifts, and what they take home.",
  },
  contests: {
    title: "Photography Contests & Giveaways",
    intro:
      "News and announcements about Inner Spirit contests, giveaways and the winners behind them.",
  },
  "nude-blog": {
    title: "Fine Art Nude Photography",
    intro:
      "Fine art nude work is about form, light and trust rather than exposure. These posts explore what the experience is actually like for the women who choose it.",
  },
  polls: {
    title: "Reader Polls",
    intro:
      "Questions we have put to readers and clients, and what their answers revealed.",
  },
  prenatal: {
    title: "Prenatal & Maternity Photography",
    intro:
      "Maternity sessions celebrate a body doing something remarkable. These posts follow expectant mothers through their time in the studio.",
  },
  "reflections-journal": {
    title: "Reflections Journal",
    intro:
      "Reflections Journal is Mark Laurie's personal written journal: short entries pausing over a photograph, a conversation or a moment from the studio.",
  },
  relationships: {
    title: "Relationships & Partners",
    intro:
      "How a boudoir session touches the people around it, from partners to the relationship a woman has with herself.",
  },
  uncategorized: {
    title: "From the Studio",
    intro:
      "Assorted posts from the Inner Spirit studio that sit outside our usual themes.",
  },
  "wet-n-wild-water": {
    title: "Water & Underwater Sessions",
    intro:
      "Water sessions bring movement, weightlessness and a bit of play into the studio. These posts follow what happens when the shoot gets wet.",
  },
};

/**
 * SEO title and intro for a category archive, with safe generic fallbacks.
 */
export function getCategorySeo(slug, categoryName = "") {
  const entry = CATEGORY_SEO[slug];

  return {
    title: entry?.title || categoryName,
    intro: entry?.intro || "",
  };
}
