import { getPlayers } from "./store.js";
import { getSeasons } from "./seasons.js";
import { renderEloGraph } from "./utils.js";

const id = new URLSearchParams(location.search).get("id");
const el = document.getElementById("profile");

const p = getPlayers().find(x => x.id === id);

if (!p) {
  el.innerHTML = "<p>Player not found.</p>";
  throw new Error("Invalid player ID");
}

/* =========================
   HELPERS
========================= */

function avatar(p) {
  return p.avatar
    ? `<img src="${p.avatar}" alt="${p.name}">`
    : `<div class="avatar-fallback">${p.name[0]}</div>`;
}

function archetypeDesc(type) {
  switch (type) {
    case "Aggressor":
      return "High-risk, high-pressure player who dominates early.";
    case "Clutch":
      return "Performs best in elimination and late-game scenarios.";
    case "Strategist":
    default:
      return "Calculated, consistent, and adaptive across brackets.";
  }
}

/* =========================
   RENDER
========================= */

function render(season) {
  const s = p.seasons[season];
  if (!s) return;

  el.innerHTML = `
    <h1>${p.name}</h1>

    ${avatar(p)}

    <div class="archetype ${p.archetype.toLowerCase()}"
         data-tip="${archetypeDesc(p.archetype)}">
      ${p.archetype}
    </div>

    <!-- SEASON SELECT -->
    <div class="controls" style="margin:20px 0">
      <label><b>Season</b></label>
      <select id="season-select">
        ${Object.keys(p.seasons).map(s =>
          `<option ${s === season ? "selected" : ""}>${s}</option>`
        ).join("")}
      </select>
    </div>

    <!-- ELO -->
    <div class="glass">
      <h3>${season} Performance</h3>
      <p><b>Elo:</b> ${s.elo}</p>
      ${renderEloGraph(s.history)}
    </div>

    <!-- ACHIEVEMENTS -->
    <div class="glass">
      <h3>Achievements</h3>
      ${
        (p.achievements && p.achievements.length)
          ? p.achievements.map(a =>
              `<span class="achievement" data-tip="${a}">${a}</span>`
            ).join("")
          : `<p style="opacity:0.6">No achievements yet.</p>`
      }
    </div>

    <!-- TAGS -->
    <div class="glass">
      <h3>Tags</h3>
      ${
        p.tags.length
          ? p.tags.map(t =>
              `<span class="role" data-tip="${t}">${t}</span>`
            ).join("")
          : `<p style="opacity:0.6">No tags assigned.</p>`
      }
    </div>
  `;

  document
    .getElementById("season-select")
    .addEventListener("change", e => render(e.target.value));
}

/* =========================
   INIT
========================= */

const defaultSeason = Object.keys(p.seasons).slice(-1)[0];
render(defaultSeason);
