import { getPlayers, addPlayer, updatePlayer } from "./store.js";
import { getSeasons, addSeason } from "./seasons.js";

const admin = document.getElementById("admin");
const nameInput = document.getElementById("new-name");
const seasonSelect = document.getElementById("new-season");

const BASE_ELO = 1000;
const WIN_GAIN = 25;
const LOSS_DROP = 15;

const ROLES = ["Owner", "Admin", "Staff"];
const ARCHETYPES = ["Aggressor", "Clutch", "Strategist", "All-Arounder", "N/A"];

// 🔑 Admin UI state (critical for season dropdown)
const adminSeasonView = {};

/* =========================
   SEASONS
========================= */

function refreshSeasons() {
  seasonSelect.innerHTML = "";
  getSeasons().forEach(s => {
    const o = document.createElement("option");
    o.value = s;
    o.textContent = s;
    seasonSelect.appendChild(o);
  });
}
refreshSeasons();

document.getElementById("add-season").onclick = () => {
  const v = document.getElementById("new-season-name").value.trim();
  if (!v) return;
  addSeason(v);
  refreshSeasons();
};

/* =========================
   ADD PLAYER
========================= */

document.getElementById("add-player").onclick = () => {
  if (!nameInput.value.trim()) return;

  const season = seasonSelect.value;

  addPlayer({
    id: crypto.randomUUID(),
    name: nameInput.value.trim(),
    avatar: "",
    archetype: "Strategist",
    tags: [],
    achievements: [],
    seasons: {
      [season]: {
        elo: BASE_ELO,
        history: [BASE_ELO],
        participated: true
      }
    }
  });

  nameInput.value = "";
  render();
};

/* =========================
   RENDER
========================= */

function render() {
  admin.innerHTML = "";

  getPlayers().forEach(p => {
    const seasons = Object.keys(p.seasons);
    const activeSeason =
      adminSeasonView[p.id] || seasons[seasons.length - 1];

    admin.innerHTML += `
      <details class="player-card" open>
        <summary onclick="event.stopPropagation()">${p.name}</summary>

        <!-- AVATAR -->
        <label>Avatar</label>
        <input type="file"
               accept="image/*"
               onclick="event.stopPropagation()"
               onchange="uploadAvatar('${p.id}', this.files[0])">

        <!-- SEASON -->
        <label>Season</label>
        <select onclick="event.stopPropagation()"
                onchange="selectSeason('${p.id}', this.value)">
          ${getSeasons().map(s =>
            `<option ${s === activeSeason ? "selected" : ""}>${s}</option>`
          ).join("")}
        </select>

        <!-- ELO -->
        <label>Elo (${activeSeason})</label>
        <div class="player-nav">
          <button onclick="event.stopPropagation(); win('${p.id}','${activeSeason}')">+ Win</button>
          <button onclick="event.stopPropagation(); loss('${p.id}','${activeSeason}')">- Loss</button>
          <strong>${p.seasons[activeSeason].elo}</strong>
        </div>

        <!-- TOURNAMENT -->
        <label>Tournament</label>
        <button onclick="event.stopPropagation(); winTourney('${p.id}','${activeSeason}')">
          🏆 Win Tournament
        </button>

        <!-- ARCHETYPE -->
        <label>Archetype</label>
        <select onclick="event.stopPropagation()"
                onchange="setArchetype('${p.id}', this.value)">
          ${ARCHETYPES.map(a =>
            `<option ${a === p.archetype ? "selected" : ""}>${a}</option>`
          ).join("")}
        </select>

        <!-- ROLES -->
        <label>Roles</label>
        <div class="player-nav">
          ${ROLES.map(r =>
            `<button onclick="event.stopPropagation(); toggleRole('${p.id}','${r}')">${r}</button>`
          ).join("")}
        </div>

        <!-- TAGS -->
        <label>Tags</label>
        <input onclick="event.stopPropagation()"
               value="${p.tags.join(", ")}"
               onchange="setTags('${p.id}', this.value)">

        <button onclick="event.stopPropagation(); location.href='player.html?id=${p.id}'">
          Open Profile
        </button>
      </details>
    `;
  });
}

/* =========================
   ACTIONS
========================= */

window.selectSeason = (id, season) => {
  const p = getPlayers().find(x => x.id === id);

  if (!p.seasons[season]) {
    p.seasons[season] = {
      elo: BASE_ELO,
      history: [BASE_ELO],
      participated: true
    };
  }

  adminSeasonView[id] = season;
  updatePlayer(id, p);
  render();
};

window.win = (id, season) => {
  const p = getPlayers().find(x => x.id === id);
  p.seasons[season].elo += WIN_GAIN;
  p.seasons[season].history.push(p.seasons[season].elo);
  updatePlayer(id, p);
  render();
};

window.loss = (id, season) => {
  const p = getPlayers().find(x => x.id === id);
  p.seasons[season].elo = Math.max(0, p.seasons[season].elo - LOSS_DROP);
  p.seasons[season].history.push(p.seasons[season].elo);
  updatePlayer(id, p);
  render();
};

window.winTourney = (id, season) => {
  const p = getPlayers().find(x => x.id === id);
  p.achievements ||= [];

  const tags = [
    `${season} Winner`,
    `${season} Top 3`,
    `${season} Top 5`
  ];

  tags.forEach(t => {
    if (!p.achievements.includes(t)) {
      p.achievements.push(t);
    }
  });

  updatePlayer(id, p);
  render();
};

window.uploadAvatar = (id, file) => {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    updatePlayer(id, { avatar: reader.result });
    render();
  };
  reader.readAsDataURL(file);
};

window.setArchetype = (id, val) => {
  updatePlayer(id, { archetype: val });
};

window.toggleRole = (id, role) => {
  const p = getPlayers().find(x => x.id === id);
  p.tags = p.tags.includes(role)
    ? p.tags.filter(t => t !== role)
    : [...p.tags, role];
  updatePlayer(id, p);
  render();
};

window.setTags = (id, val) => {
  updatePlayer(id, {
    tags: val.split(",").map(t => t.trim()).filter(Boolean)
  });
};

render();
