const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT2_wr_BqYz609qT5ajqqg7Dc9GIg0Y1fC9u26LnDWFuZbs_ItQfiRigpXkywopq5K4LuSRR25FaBAw/pub?output=csv";

async function loadPlayers() {
  const res = await fetch(SHEET_URL);
  const text = await res.text();
  const lines = text.split("\n");
  const headers = lines.shift().split(",");

  return lines.map(line => {
    const values = line.split(",");
    let obj = {};
    headers.forEach((h, i) => obj[h.trim()] = values[i]?.trim());
    return obj;
  });
}
