const KEY = "TRAS_SEASONS";

export function getSeasons() {
  return JSON.parse(localStorage.getItem(KEY)) || ["Season 1 – 2026"];
}

export function saveSeasons(seasons) {
  localStorage.setItem(KEY, JSON.stringify(seasons));
}

export function addSeason(name) {
  const seasons = getSeasons();
  if (!seasons.includes(name)) {
    seasons.push(name);
    saveSeasons(seasons);
  }
}
