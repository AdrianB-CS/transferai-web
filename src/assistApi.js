const BASE = "/assist-api";

async function get(path, params = {}) {
  const url = new URL(`${BASE}/${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`ASSIST API error: ${res.status}`);
  const data = await res.json();
  return data.result;
}

async function post(path, body = {}) {
  const res = await fetch(`${BASE}/${path}`, {
    method: "POST",
    headers: { accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`ASSIST API error: ${res.status}`);
  const data = await res.json();
  return data.result;
}

export async function getInstitutions() {
  return get("Institutions");
}

export async function getAcademicYears() {
  const years = await get("AcademicYears");
  return [...years].sort((a, b) => b.id - a.id);
}

export async function listAgreements(receivingId, sendingId, yearId, types = "Major") {
  const result = await get(
    `Agreements/Published/for/${receivingId}/to/${sendingId}/in/${yearId}`,
    { types }
  );
  return result?.reports ?? [];
}

export async function getAgreement(key) {
  const encoded = encodeURIComponent(key);
  return get(`Agreements?Key=${encoded}`);
}

export async function searchMajors(receivingId, yearId, sendingId, nameFilter = "") {
  const body = { sendingInstitutionId: sendingId };
  if (nameFilter) body.nameFilter = nameFilter;
  return post(`Published/in/${yearId}/for/${receivingId}`, body);
}

export function parseCourseRows(agreement) {
  let articulations = agreement?.articulations ?? [];
  if (typeof articulations === "string") {
    try { articulations = JSON.parse(articulations); } catch { return []; }
  }

  const rows = [];
  for (const entry of articulations) {
    const artic = entry.articulation ?? entry;
    const recv = artic.course ?? {};
    const sendingArt = artic.sendingArticulation ?? {};

    if (!recv.courseNumber) continue;

    const recvLabel = `${recv.prefix} ${recv.courseNumber} — ${recv.courseTitle}`;
    const units = recv.minUnits ? `${recv.minUnits} units` : "";

    const items = sendingArt.items ?? [];
    if (!items.length) {
      rows.push({
        receiving: recvLabel,
        units,
        sending: null,
        noArticulation: sendingArt.noArticulationReason || "No current articulation",
      });
    } else {
      for (const group of items) {
        const courses = group.items ?? [group];
        const conj = group.courseConjunction === "And" ? " AND " : " OR ";
        const sending = courses
          .filter((c) => c.courseNumber)
          .map((c) => `${c.prefix} ${c.courseNumber} — ${c.courseTitle}`)
          .join(conj);
        if (sending) rows.push({ receiving: recvLabel, units, sending, noArticulation: null });
      }
    }
  }
  return rows;
}
