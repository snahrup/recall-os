export async function getMemories() {
  const res = await fetch('/memories');
  return res.json();
}

export async function queryMemories(text: string) {
  const res = await fetch('/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return res.json();
}

export async function getGraphNodes() {
  const res = await fetch('/graph-nodes');
  return res.json();
}

export async function importFiles(files: FileList) {
  const form = new FormData();
  Array.from(files).forEach((f) => form.append('files', f));
  const res = await fetch('/import', { method: 'POST', body: form });
  return res.json();
}
