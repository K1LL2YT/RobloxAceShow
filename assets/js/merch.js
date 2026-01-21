const merch = [
  {
    name: "TRAS Hoodie",
    img: "assets/merch/hoodie.png",
    link: "#"
  },
  {
    name: "Champion Crown",
    img: "assets/merch/crown.png",
    link: "#"
  }
];

const container = document.getElementById("merch");

merch.forEach(m => {
  container.innerHTML += `
    <div class="player-card"
         onclick="window.open('${m.link}', '_blank')">
      <img src="${m.img}">
      <h3>${m.name}</h3>
    </div>
  `;
});
