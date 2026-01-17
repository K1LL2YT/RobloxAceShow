(async () => {
  const players = await loadPlayers();
  const container = document.getElementById("leaderboard");

  players
    .filter(p => p.Season === "Current")
    .sort((a, b) => b.Elo - a.Elo)
    .forEach((p, i) => {
      const card = document.createElement("div");
      card.className = "player-card";
      card.innerHTML = `
        <img src="${p.AvatarURL}">
        <h3>#${i + 1} ${p.Name}</h3>
        <p>Elo: ${p.Elo}</p>
        <button onclick="location.href='player.html?id=${p.UserID}'">
          View Profile
        </button>
      `;
      container.appendChild(card);
    });
})();
