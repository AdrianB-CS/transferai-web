import { useState, useEffect } from "react";
import { getInstitutions, getAcademicYears, listAgreements, getAgreement, parseCourseRows } from "../assistApi";

export default function Explorer() {
  const [institutions, setInstitutions] = useState([]);
  const [years, setYears] = useState([]);
  const [sendingId, setSendingId] = useState("");
  const [receivingId, setReceivingId] = useState("");
  const [yearId, setYearId] = useState("");
  const [agreements, setAgreements] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [courseRows, setCourseRows] = useState([]);
  const [loadingMeta, setLoadingMeta] = useState(true);
  const [loadingAgreements, setLoadingAgreements] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getInstitutions(), getAcademicYears()])
      .then(([insts, yrs]) => {
        setInstitutions(insts);
        setYears(yrs);
        if (yrs.length) setYearId(String(yrs[0].id));
      })
      .catch(() => setError("Could not load institutions. ASSIST.org may be temporarily unavailable."))
      .finally(() => setLoadingMeta(false));
  }, []);

  const ccs = institutions.filter((i) => i.isCommunityCollege).sort((a, b) => a.name.localeCompare(b.name));
  const ucs = institutions.filter((i) => !i.isCommunityCollege).sort((a, b) => a.name.localeCompare(b.name));

  async function handleSearch() {
    if (!sendingId || !receivingId || !yearId) return;
    setLoadingAgreements(true);
    setAgreements([]);
    setSelectedKey(null);
    setCourseRows([]);
    setError(null);
    try {
      const results = await listAgreements(Number(receivingId), Number(sendingId), Number(yearId), "Major");
      setAgreements(results);
    } catch (e) {
      setError("Could not fetch agreements. The ASSIST.org API may be rate-limiting or unavailable.");
    } finally {
      setLoadingAgreements(false);
    }
  }

  async function handleSelectAgreement(key, name) {
    setSelectedKey(key);
    setCourseRows([]);
    setLoadingCourses(true);
    try {
      const detail = await getAgreement(key);
      setCourseRows(parseCourseRows(detail));
    } catch {
      setError("Could not load course details for this agreement.");
    } finally {
      setLoadingCourses(false);
    }
  }

  const selectedAgreement = agreements.find((a) => a.key === selectedKey);

  return (
    <div>
      <h1 className="section-title">Agreement Explorer</h1>
      <p className="section-sub">Browse official course-by-course articulation agreements between California community colleges and UC/CSU campuses.</p>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="row" style={{ marginBottom: 16 }}>
          <div className="field">
            <label>Community College</label>
            {loadingMeta ? (
              <select disabled><option>Loading...</option></select>
            ) : (
              <select value={sendingId} onChange={(e) => setSendingId(e.target.value)}>
                <option value="">Select a CC...</option>
                {ccs.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            )}
          </div>
          <div className="field">
            <label>Transfer Destination</label>
            {loadingMeta ? (
              <select disabled><option>Loading...</option></select>
            ) : (
              <select value={receivingId} onChange={(e) => setReceivingId(e.target.value)}>
                <option value="">Select UC/CSU...</option>
                {ucs.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            )}
          </div>
          <div className="field" style={{ maxWidth: 160 }}>
            <label>Academic Year</label>
            <select value={yearId} onChange={(e) => setYearId(e.target.value)}>
              {years.map((y) => <option key={y.id} value={y.id}>{y.code}</option>)}
            </select>
          </div>
          <button
            className="btn btn-primary"
            onClick={handleSearch}
            disabled={!sendingId || !receivingId || !yearId || loadingAgreements}
            style={{ alignSelf: "flex-end", whiteSpace: "nowrap" }}
          >
            {loadingAgreements ? <span className="spinner" /> : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            )}
            {loadingAgreements ? "Searching..." : "Find Agreements"}
          </button>
        </div>
      </div>

      {error && <div className="error-box">{error}</div>}

      {!loadingAgreements && agreements.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: selectedKey ? "280px 1fr" : "1fr", gap: 16, alignItems: "start" }}>
          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", fontSize: 13, fontWeight: 500, color: "var(--text2)" }}>
              {agreements.length} major agreement{agreements.length !== 1 ? "s" : ""}
            </div>
            <ul style={{ listStyle: "none", maxHeight: 520, overflowY: "auto" }}>
              {agreements.map((a) => (
                <li key={a.key}>
                  <button
                    onClick={() => handleSelectAgreement(a.key, a.label)}
                    style={{
                      width: "100%", textAlign: "left", padding: "11px 16px",
                      background: selectedKey === a.key ? "var(--accent-bg)" : "transparent",
                      border: "none", borderBottom: "1px solid var(--border)",
                      cursor: "pointer", fontSize: 13,
                      color: selectedKey === a.key ? "var(--accent-text)" : "var(--text)",
                      fontFamily: "var(--font)", fontWeight: selectedKey === a.key ? 500 : 400,
                      transition: "background 0.12s",
                    }}
                  >
                    {a.label || a.name || "Unnamed"}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {selectedKey && (
            <div className="card" style={{ padding: 0 }}>
              <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{selectedAgreement?.label || "Agreement"}</div>
                  <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>Course equivalencies</div>
                </div>
                {!loadingCourses && courseRows.length > 0 && (
                  <span className="tag tag-green">{courseRows.filter(r => r.sending).length} articulated</span>
                )}
              </div>

              {loadingCourses && (
                <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
                  <span className="spinner spinner-dark" />
                </div>
              )}

              {!loadingCourses && courseRows.length > 0 && (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: "var(--surface2)" }}>
                        <th style={{ padding: "10px 20px", textAlign: "left", fontWeight: 500, color: "var(--text2)", borderBottom: "1px solid var(--border)", width: "40%" }}>UC/CSU Course</th>
                        <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 500, color: "var(--text2)", borderBottom: "1px solid var(--border)", width: "8%" }}>Units</th>
                        <th style={{ padding: "10px 20px", textAlign: "left", fontWeight: 500, color: "var(--text2)", borderBottom: "1px solid var(--border)" }}>CC Equivalent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courseRows.map((row, i) => (
                        <tr key={i} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "var(--surface2)" }}>
                          <td style={{ padding: "10px 20px", color: "var(--text)" }}>{row.receiving}</td>
                          <td style={{ padding: "10px 12px", color: "var(--text3)", fontSize: 12 }}>{row.units}</td>
                          <td style={{ padding: "10px 20px" }}>
                            {row.sending ? (
                              <span style={{ color: "var(--accent-text)" }}>{row.sending}</span>
                            ) : (
                              <span style={{ color: "var(--text3)", fontStyle: "italic" }}>{row.noArticulation}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {!loadingCourses && courseRows.length === 0 && (
                <div className="empty-state">
                  <p>No course data available for this agreement.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {!loadingAgreements && agreements.length === 0 && sendingId && receivingId && !error && (
        <div className="card">
          <div className="empty-state">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            <p>Hit "Find Agreements" to load articulation data.</p>
          </div>
        </div>
      )}
    </div>
  );
}
