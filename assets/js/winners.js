import { getPlayers } from "./store.js";
import { getSeasons } from "./seasons.js";

const podium = document.getElementById("podium");
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
    ? `<img class="podium-avatar" src="${p.avatar}" alt="${p.name}">`
    : `<div class="avatar-fallback">${p.name[0]}</div>`;
}

/* =========================
   RENDER
========================= */

function render(season) {
  podium.innerHTML = "";

  const top = getPlayers()
    .filter(p => p.seasons?.[season]?.participated)
    .sort((a,b)=>b.seasons[season].elo - a.seasons[season].elo)
    .slice(0,3);

  if (!top.length) {
    podium.innerHTML = `
      <p style="opacity:0.7;text-align:center">
        No winners recorded for this season.
      </p>
    `;
    return;
  }

  top.forEach((p, i) => {
    podium.innerHTML += `
      <div class="podium-slot place-${i+1}"
           onclick="location.href='player.html?id=${p.id}'">

        ${avatar(p)}

        <h3>${["🥇","🥈","🥉"][i]} ${p.name}</h3>

        <span class="role winner"
              data-tip="${season} Winner">
          ${season} Winner
        </span>

        <p><b>Elo:</b> ${p.seasons[season].elo}</p>
      </div>
    `;
  });
}

/* =========================
   INIT
========================= */

const seasons = getSeasons();
const current = seasons[seasons.length - 1];

seasonSelect.value = current;
render(current);

seasonSelect.onchange = () => render(seasonSelect.value);
