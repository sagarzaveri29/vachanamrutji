// Per-book state persistence: bookmark (last page), pins (by PDF page),
// notes (free-form text tied to a page), and the date the user first
// opened the book (for "N days with the book" in Profile).

const k = (bookId, suffix) => `vachanamrut:${bookId}:${suffix}`;

export function getBookmark(bookId) {
  const n = Number(localStorage.getItem(k(bookId, 'bookmark')));
  return Number.isFinite(n) && n > 0 ? n : 1;
}
export function setBookmark(bookId, page) {
  localStorage.setItem(k(bookId, 'bookmark'), String(page));
}

export function getPins(bookId) {
  try {
    return JSON.parse(localStorage.getItem(k(bookId, 'pins')) || '[]');
  } catch {
    return [];
  }
}
export function setPins(bookId, pins) {
  localStorage.setItem(k(bookId, 'pins'), JSON.stringify(pins));
}
export function togglePin(bookId, page) {
  const pins = getPins(bookId);
  const idx = pins.findIndex((p) => p.page === page);
  if (idx >= 0) pins.splice(idx, 1);
  else pins.push({ page, at: Date.now() });
  setPins(bookId, pins);
  return pins;
}
export function isPinned(bookId, page) {
  return getPins(bookId).some((p) => p.page === page);
}

export function getNotes(bookId) {
  try {
    return JSON.parse(localStorage.getItem(k(bookId, 'notes')) || '[]');
  } catch {
    return [];
  }
}
export function setNotes(bookId, notes) {
  localStorage.setItem(k(bookId, 'notes'), JSON.stringify(notes));
}
export function addNote(bookId, page, text) {
  const notes = getNotes(bookId);
  const note = { id: Date.now(), page, text, at: Date.now() };
  notes.push(note);
  setNotes(bookId, notes);
  return notes;
}
export function deleteNote(bookId, noteId) {
  const notes = getNotes(bookId).filter((n) => n.id !== noteId);
  setNotes(bookId, notes);
  return notes;
}

export function touchBook(bookId) {
  const key = k(bookId, 'firstOpened');
  if (!localStorage.getItem(key)) localStorage.setItem(key, String(Date.now()));
}
export function daysWithBook(bookId) {
  const ts = Number(localStorage.getItem(k(bookId, 'firstOpened')));
  if (!Number.isFinite(ts) || !ts) return 0;
  return Math.max(1, Math.floor((Date.now() - ts) / 86400000));
}
