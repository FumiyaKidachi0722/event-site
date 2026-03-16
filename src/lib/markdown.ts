const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

function inline(value: string) {
  return value
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}

export function markdownToHtml(markdown: string) {
  const lines = escapeHtml(markdown).split("\n");
  const chunks: string[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length) {
      chunks.push(`<ul>${listBuffer.join("")}</ul>`);
      listBuffer = [];
    }
  };

  for (const line of lines) {
    if (!line.trim()) {
      flushList();
      continue;
    }

    if (line.startsWith("### ")) {
      flushList();
      chunks.push(`<h3>${inline(line.slice(4))}</h3>`);
      continue;
    }

    if (line.startsWith("## ")) {
      flushList();
      chunks.push(`<h2>${inline(line.slice(3))}</h2>`);
      continue;
    }

    if (line.startsWith("# ")) {
      flushList();
      chunks.push(`<h1>${inline(line.slice(2))}</h1>`);
      continue;
    }

    if (line.startsWith("- ")) {
      listBuffer.push(`<li>${inline(line.slice(2))}</li>`);
      continue;
    }

    flushList();
    chunks.push(`<p>${inline(line)}</p>`);
  }

  flushList();
  return chunks.join("");
}
