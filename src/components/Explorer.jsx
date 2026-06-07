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
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([getInstitutions(), getAcademicYears()])
      .then(([insts, yrs]) => {
        setInstitutions(insts);
        setYears(yrs);
        if (yrs.length) setYearId(String(yrs[0].id));
      })
      .catch(() => setError("Could not load institutions."))
      .finally(() => setLoadingMeta(false));
  }, []);

  const ccs = institutions.filter((i) => i.isCommunityCollege).sort((a, b) => a.name.localeCompare(b.name));
  const unis = institutions.filter((i) => !i.isCommunityCollege).sort((a, b) => a.name.localeCompare(b.name));

  async function handleSearch() {
    if (!sendingId || !receivingId || !yearId) return;
    setLoadingAgreements(true);
    setAgreements([]);
    setSelectedKey(null);
    setCourseRows([]);
    setError(null);
    setSearch("");
    try {
      const results = await listAgreements(Number(receivingId), Number(sendingId), Number(yearId), "Major");
      setAgreements(results);
      if (!results.length) setError("No agreements found for this combination.");
    } catch {
      setError("Could not fetch agreements. Please try again.");
    } finally {
      setLoadingAgreements(false);
    }
  }

  async function handleSelectAgreement(key) {
    setSelectedKey(key);
    setCourseRows([]);
    setLoadingCourses(true);
    try {
      const detail = await getAgreement(key);
      setCourseRows(parseCourseRows(detail));
    } catch {
      setError("Could not load course details.");
    } finally {
      setLoadingCourses(false);
    }
  }

  const filteredAgreements = agreements.filter((a) =>
    (a.label || a.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const selectedAgreement = agreements.find((a) => a.key === selectedKey);
  const articulatedCount = courseRows.filter((r) => r.sending).length;

  return (
    <>
      <div className="topbar">
        <div>
          <div className="page-title">Agreement Explorer</div>
          <div className="page-sub">Browse official course-by-course articulation agreements</div>
        </div>
        {agreements.length > 0 && (
          <div className="topbar-actions">
            <input
              className="field"
              style={{ padding: "7px 12px", border: "1px solid var(--border2)", borderRadius: "var(--radius-sm)", fontSize: 13, background: "var(--bg)", outline: "none", width: 200 }}
              placeholder="Filter majors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="page-body">
        <div className="selector-card">
          <div className="selector-grid">
            <div className="field">
              <label>Community College</label>
              <select value={sendingId} onChange={(e) => setSendingId(e.target.value)} disabled={loadingMeta}>
                <option value="">Select a CC...</option>
                {ccs.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Transfer Destination</label>
              <select value={receivingId} onChange={(e) => setReceivingId(e.target.value)} disabled={loadingMeta}>
                <option value="">Select UC/CSU...</option>
                <optgroup label="UC Campuses">
                  {unis.filter(u => u.category === "UC").map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </optgroup>
                <optgroup label="CSU Campuses">
                  {unis.filter(u => u.category === "CSU").map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </optgroup>
                <optgroup label="Other">
                  {unis.filter(u => u.category !== "UC" && u.category !== "CSU").map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </optgroup>
              </select>
            </div>
            <div className="field">
              <label>Academic Year</label>
              <select value={yearId} onChange={(e) => setYearId(e.target.value)}>
                {years.map((y) => <option key={y.id} value={y.id}>{y.code}</option>)}
              </select>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleSearch}
              disabled={!sendingId || !receivingId || !yearId || loadingAgreements}
              style={{ alignSelf: "flex-end" }}
            >
              {loadingAgreements ? <span className="spinner" /> : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              )}
              {loadingAgreements ? "Searching..." : "Find Agreements"}
            </button>
          </div>
        </div>

        {error && <div className="error-box">{error}</div>}

        {filteredAgreements.length > 0 && (
          <div className="results-grid">
            <div className="major-list">
              <div className="major-list-header">
                {filteredAgreements.length} major{filteredAgreements.length !== 1 ? "s" : ""}
              </div>
              <div className="major-list-scroll">
                {filteredAgreements.map((a) => (
                  <div
                    key={a.key}
                    className={`major-item ${selectedKey === a.key ? "active" : ""}`}
                    onClick={() => handleSelectAgreement(a.key)}
                  >
                    {a.label || a.name || "Unnamed"}
                  </div>
                ))}
              </div>
            </div>

            {selectedKey ? (
              <div className="course-panel">
                <div className="course-panel-header">
                  <div>
                    <div className="course-panel-title">{selectedAgreement?.label || "Agreement"}</div>
                    <div className="course-panel-sub">Course equivalencies · {years.find(y => String(y.id) === yearId)?.code}</div>
                  </div>
                  {!loadingCourses && courseRows.length > 0 && (
                    <span className={`badge ${articulatedCount > 0 ? "badge-green" : "badge-amber"}`}>
                      {articulatedCount} articulated
                    </span>
                  )}
                </div>

                {loadingCourses && (
                  <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
                    <span className="spinner spinner-dark" />
                  </div>
                )}

                {!loadingCourses && courseRows.length > 0 && (
                  <div style={{ overflowX: "auto" }}>
                    <table className="course-table">
                      <thead>
                        <tr>
                          <th style={{ width: "42%" }}>UC/CSU Course</th>
                          <th style={{ width: "8%" }}>Units</th>
                          <th>CC Equivalent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courseRows.map((row, i) => (
                          <tr key={i}>
                            <td className="td-recv">{row.receiving}</td>
                            <td className="td-units">{row.units}</td>
                            <td>
                              {row.sending
                                ? <span className="td-send">{row.sending}</span>
                                : <span className="td-none">{row.noArticulation}</span>
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {!loadingCourses && courseRows.length === 0 && (
                  <div className="empty-state"><p>No course data available.</p></div>
                )}
              </div>
            ) : (
              <div className="course-panel">
                <div className="empty-state">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <p>Select a major to see course equivalencies</p>
                </div>
              </div>
            )}
          </div>
        )}

        {!loadingAgreements && agreements.length === 0 && !error && (
          <div className="course-panel">
            <div className="empty-state">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <p>Select a community college and destination, then click Find Agreements</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
