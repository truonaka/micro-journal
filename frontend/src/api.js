const API = "http://localhost:8801";

export async function getEntries() {
  return fetch(`${API}/entries`).then(r => r.json());
}

export async function getEntry(date) {
  return fetch(`${API}/entries/${date}`).then(r => r.json());
}

export async function saveEntry(data) {
  return fetch(`${API}/entries`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  }).then(r => r.json());
}

export async function getStats() {
  return fetch(`${API}/stats`).then(r => r.json());
}