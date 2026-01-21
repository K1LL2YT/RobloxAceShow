const KEY = "TRAS_PLAYERS";

export function getPlayers() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function savePlayers(players) {
  localStorage.setItem(KEY, JSON.stringify(players));
}

export function addPlayer(player) {
  const players = getPlayers();
  players.push(player);
  savePlayers(players);
}

export function updatePlayer(id, patch) {
  const players = getPlayers();
  const idx = players.findIndex(p => p.id === id);
  if (idx === -1) return;

  players[idx] = { ...players[idx], ...patch };
  savePlayers(players);
}
