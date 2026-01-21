const games = [
  { name: "Tower Battles", difficulty: "Easy" },
  { name: "Parkour Rush", difficulty: "Medium" },
  { name: "Arena Elimination", difficulty: "Hard" }
];

const container = document.getElementById("games");

games.forEach(g => {
  container.innerHTML += `
    <div class="player-card">
      <h3>${g.name}</h3>
      <span class="role">${g.difficulty}</span>
    </div>
  `;
});
