// INSERISCI QUI L'URL DEL TUO SCRIPT GOOGLE
const VOTE_ENDPOINT = "https://script.google.com/macros/s/AKfycbyNi5oBwnchfa9AsNqAVOo5hbrqA7UdvgbYy6sFggxNZXczu1gpPrIVkvG1avjRKgw/exec";

// Elenco dei match (sostituisci con i tuoi link video .mp4 diretti)
const matches = [
  { id: 1, videoA: "https://res.cloudinary.com/di8xgmagx/video/upload/v1762869539/video_22_croppato_e_resized_2_alfqf0.mp4" },
  { id: 2, videoA: "https://res.cloudinary.com/di8xgmagx/video/upload/v1762869532/21_qgoo7n.mp4" },
  { id: 3, videoB: "https://res.cloudinary.com/di8xgmagx/video/upload/v1762868674/video_1-2-3-4_jwsh0a.mp4" },
  { ID: 4, videoB: "https://res.cloudinary.com/di8xgmagx/video/upload/v1762868649/definitvo_20_fjlxte.mp4" },
];

// Identificativo unico per ogni giocatore (salvato localmente)
const userId = localStorage.getItem("userId") || crypto.randomUUID();
localStorage.setItem("userId", userId);

let currentMatch = 0;

function renderMatch() {
  const container = document.getElementById("match-container");
  const match = matches[currentMatch];

  if (!match) {
    container.innerHTML = "<h2>Hai completato il torneo! 🎉</h2>";
    return;
  }

  container.innerHTML = `
    <div class="match">
      <div>
        <video controls src="${match.videoA}"></video><br>
        <button onclick="vote('${match.id}', 'A')">Vota Video A</button>
      </div>
      <div>
        <video controls src="${match.videoB}"></video><br>
        <button onclick="vote('${match.id}', 'B')">Vota Video B</button>
      </div>
    </div>
  `;
}

async function vote(matchId, choice) {
  const payload = {
    userId: userId,
    matchId: matchId,
    vincitore: choice
  };

  try {
    await fetch(VOTE_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
      mode: "no-cors"
    });

    currentMatch++;
    renderMatch();
  } catch (err) {
    alert("Errore durante l'invio del voto 😞");
    console.error(err);
  }
}

renderMatch();
