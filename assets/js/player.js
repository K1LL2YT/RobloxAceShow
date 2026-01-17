(async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const players = await loadPlayers();
  const p = players.find(x => x.UserID === id);

  document.getElementById("profile").innerHTML = `
    <h1>${p.Name}</h1>
    <img src="${p.AvatarURL}" style="width:150px">
    <p><b>Archetype:</b> ${p.Archetype}</p>
    <p><b>Best Game:</b> ${p.BestGame}</p>
    <p><b>Elo:</b> ${p.Elo}</p>

    <h3>Socials</h3>
    <a href="${p.Twitter}" target="_blank">Twitter</a>
    <a href="${p.Discord}" target="_blank">Discord</a>
  `;
})();
