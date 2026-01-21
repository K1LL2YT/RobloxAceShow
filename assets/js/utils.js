/* =========================
   MINI ELO GRAPH
========================= */

export function renderEloGraph(history = []) {
  if (!history.length) return "";

  const max = Math.max(...history);
  const min = Math.min(...history);
  const range = max - min || 1;

  const points = history.map((v, i) => {
    const x = (i / (history.length - 1)) * 100;
    const y = 40 - ((v - min) / range) * 40;
    return `${x},${y}`;
  }).join(" ");

  return `
    <svg class="elo-graph" viewBox="0 0 100 40" preserveAspectRatio="none">
      <polyline points="${points}" />
    </svg>
  `;
}

/* =========================
   AUTO ACHIEVEMENTS
========================= */

export function applySeasonAchievements(players, season) {
  const ranked = players
    .filter(p => p.seasons?.[season]?.participated)
    .sort((a,b)=>b.seasons[season].elo - a.seasons[season].elo);

  ranked.forEach((p, i) => {
    p.achievements = p.achievements || [];

    if (i === 0)
      tag(p, `${season} Winner`);
    if (i < 3)
      tag(p, `${season} Top 3`);
    if (i < 5)
      tag(p, `${season} Top 5`);
  });

  return players;
}

function tag(player, label) {
  if (!player.achievements.includes(label)) {
    player.achievements.push(label);
  }
}
