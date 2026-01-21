const ADMINS = [
  { user: "JuztKillz", pass: "ImSpinning" },
  { user: "Foufouv", pass: "Slayyyyy" },
  { user: "Smarsian", pass: "WatchthisSpeedbridge" },
  { user: "GamingGuy", pass: "Youknowwhatsgay" }
];

export function requireAdmin() {
  if (sessionStorage.getItem("TRAS_AUTH") === "true") return;

  const u = prompt("Username:");
  const p = prompt("Password:");

  if (!ADMINS.some(a => a.user === u && a.pass === p)) {
    document.body.innerHTML = "<div class='glass'><h1>Access Denied</h1></div>";
    throw new Error("Unauthorized");
  }

  sessionStorage.setItem("TRAS_AUTH", "true");
}