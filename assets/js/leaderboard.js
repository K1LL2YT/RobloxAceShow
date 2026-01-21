import { getPlayers } from "./store.js";
import { getSeasons } from "./seasons.js";
import { renderEloGraph } from "./utils.js";
import { savePlayers } from "./store.js";
import { applySeasonAchievements } from "./utils.js";

const board = document.getElementById("board");
const seasonSelect = document.getElementById("season-select");

/* =========================
   SEASON DROPDOWN
========================= */

function populateSeasons() {
  seasonSelect.innerHTML = "";
  getSeasons().forEach(s => {
    const o = document.createElement("option");
    o.value = s;
    o.textContent = s;
    seasonSelect.appendChild(o);
  });
}
populateSeasons();

/* =========================
   AVATAR
========================= */

function avatar(p) {
  return p.avatar
    ? `<img src="${p.avatar}" alt="${p.name}">`
    : `<div class="avatar-fallback">${p.name[0]}</div>`;
}

/* =========================
   RENDER
========================= */

function render(season) {
  board.innerHTML = "";

  let players = getPlayers();
  players = applySeasonAchievements(players, season);
  savePlayers(players);

  const ranked = players
    .filter(p => p.seasons?.[season]?.participated)
    .sort((a,b)=>b.seasons[season].elo - a.seasons[season].elo);

  if (!ranked.length) {
    board.innerHTML = `<p style="opacity:.7;text-align:center">
      No players registered for this season.
    </p>`;
    return;
  }

  ranked.forEach((p, i) => {
    const isWinner = i === 0;
    // (rest of your existing render code stays EXACTLY the same)


    board.innerHTML += `
      <div class="player-card ${isWinner ? "winner" : ""}">
        ${avatar(p)}

        <div class="player-info"
             onclick="location.href='player.html?id=${p.id}'">

          <h3>#${i + 1} ${p.name}</h3>

          <div class="archetype ${p.archetype.toLowerCase()}">
            ${p.archetype}
          </div>

          ${renderEloGraph(p.seasons[season].history)}

          <p><b>Elo:</b> ${p.seasons[season].elo}</p>

          <div class="tags">
            ${p.tags.map(t =>
              `<span class="role"
                     data-tip="${t}"
                     onclick="event.stopPropagation()">
                ${t}
              </span>`
            ).join("")}

            ${isWinner
              ? `<span class="role winner"
                       data-tip="${season} Winner">
                   ${season} Winner
                 </span>`
              : ""}
          </div>

        </div>
      </div>
    `;
  });

  if (!players.length) {
    board.innerHTML = `
      <p style="opacity:0.7;text-align:center">
        No players registered for this season.
      </p>
    `;
  }
}

/* =========================
   INIT
========================= */

const seasons = getSeasons();
const current = seasons[seasons.length - 1];

seasonSelect.value = current;
render(current);

seasonSelect.onchange = () => render(seasonSelect.value);
