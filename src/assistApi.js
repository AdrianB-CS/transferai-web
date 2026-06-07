const INSTITUTIONS = [
  {id:110,name:"Allan Hancock College",isCommunityCollege:true,category:"CCC"},
  {id:121,name:"Antelope Valley College",isCommunityCollege:true,category:"CCC"},
  {id:84,name:"Bakersfield College",isCommunityCollege:true,category:"CCC"},
  {id:20,name:"Barstow Community College",isCommunityCollege:true,category:"CCC"},
  {id:58,name:"Berkeley City College",isCommunityCollege:true,category:"CCC"},
  {id:41,name:"Cabrillo College",isCommunityCollege:true,category:"CCC"},
  {id:68,name:"Canada College",isCommunityCollege:true,category:"CCC"},
  {id:104,name:"Cerritos College",isCommunityCollege:true,category:"CCC"},
  {id:9,name:"Cerro Coso Community College",isCommunityCollege:true,category:"CCC"},
  {id:96,name:"Chabot College",isCommunityCollege:true,category:"CCC"},
  {id:69,name:"Chaffey College",isCommunityCollege:true,category:"CCC"},
  {id:97,name:"Citrus College",isCommunityCollege:true,category:"CCC"},
  {id:33,name:"City College of San Francisco",isCommunityCollege:true,category:"CCC"},
  {id:150,name:"Clovis Community College",isCommunityCollege:true,category:"CCC"},
  {id:105,name:"Coastline Community College",isCommunityCollege:true,category:"CCC"},
  {id:111,name:"College of Alameda",isCommunityCollege:true,category:"CCC"},
  {id:4,name:"College of Marin",isCommunityCollege:true,category:"CCC"},
  {id:5,name:"College of San Mateo",isCommunityCollege:true,category:"CCC"},
  {id:140,name:"College of the Canyons",isCommunityCollege:true,category:"CCC"},
  {id:30,name:"College of the Desert",isCommunityCollege:true,category:"CCC"},
  {id:83,name:"College of the Redwoods",isCommunityCollege:true,category:"CCC"},
  {id:6,name:"College of the Sequoias",isCommunityCollege:true,category:"CCC"},
  {id:102,name:"College of the Siskiyous",isCommunityCollege:true,category:"CCC"},
  {id:10,name:"Columbia College",isCommunityCollege:true,category:"CCC"},
  {id:153,name:"Compton College",isCommunityCollege:true,category:"CCC"},
  {id:28,name:"Contra Costa College",isCommunityCollege:true,category:"CCC"},
  {id:112,name:"Copper Mountain College",isCommunityCollege:true,category:"CCC"},
  {id:142,name:"Cosumnes River College",isCommunityCollege:true,category:"CCC"},
  {id:70,name:"Crafton Hills College",isCommunityCollege:true,category:"CCC"},
  {id:16,name:"Cuesta College",isCommunityCollege:true,category:"CCC"},
  {id:99,name:"Cuyamaca College",isCommunityCollege:true,category:"CCC"},
  {id:71,name:"Cypress College",isCommunityCollege:true,category:"CCC"},
  {id:113,name:"De Anza College",isCommunityCollege:true,category:"CCC"},
  {id:114,name:"Diablo Valley College",isCommunityCollege:true,category:"CCC"},
  {id:118,name:"East Los Angeles College",isCommunityCollege:true,category:"CCC"},
  {id:103,name:"El Camino College",isCommunityCollege:true,category:"CCC"},
  {id:2,name:"Evergreen Valley College",isCommunityCollege:true,category:"CCC"},
  {id:122,name:"Feather River College",isCommunityCollege:true,category:"CCC"},
  {id:145,name:"Folsom Lake College",isCommunityCollege:true,category:"CCC"},
  {id:51,name:"Foothill College",isCommunityCollege:true,category:"CCC"},
  {id:35,name:"Fresno City College",isCommunityCollege:true,category:"CCC"},
  {id:134,name:"Fullerton College",isCommunityCollege:true,category:"CCC"},
  {id:72,name:"Gavilan College",isCommunityCollege:true,category:"CCC"},
  {id:43,name:"Glendale Community College",isCommunityCollege:true,category:"CCC"},
  {id:55,name:"Golden West College",isCommunityCollege:true,category:"CCC"},
  {id:106,name:"Grossmont College",isCommunityCollege:true,category:"CCC"},
  {id:123,name:"Hartnell College",isCommunityCollege:true,category:"CCC"},
  {id:107,name:"Imperial Valley College",isCommunityCollege:true,category:"CCC"},
  {id:124,name:"Irvine Valley College",isCommunityCollege:true,category:"CCC"},
  {id:40,name:"Lake Tahoe Community College",isCommunityCollege:true,category:"CCC"},
  {id:77,name:"Laney College",isCommunityCollege:true,category:"CCC"},
  {id:18,name:"Las Positas College",isCommunityCollege:true,category:"CCC"},
  {id:82,name:"Lassen Community College",isCommunityCollege:true,category:"CCC"},
  {id:135,name:"Long Beach City College",isCommunityCollege:true,category:"CCC"},
  {id:3,name:"Los Angeles City College",isCommunityCollege:true,category:"CCC"},
  {id:31,name:"Los Angeles Harbor College",isCommunityCollege:true,category:"CCC"},
  {id:47,name:"Los Angeles Mission College",isCommunityCollege:true,category:"CCC"},
  {id:86,name:"Los Angeles Pierce College",isCommunityCollege:true,category:"CCC"},
  {id:130,name:"Los Angeles Southwest College",isCommunityCollege:true,category:"CCC"},
  {id:25,name:"Los Angeles Trade Technical College",isCommunityCollege:true,category:"CCC"},
  {id:44,name:"Los Angeles Valley College",isCommunityCollege:true,category:"CCC"},
  {id:61,name:"Los Medanos College",isCommunityCollege:true,category:"CCC"},
  {id:200,name:"Madera Community College",isCommunityCollege:true,category:"CCC"},
  {id:100,name:"Mendocino College",isCommunityCollege:true,category:"CCC"},
  {id:17,name:"Merced College",isCommunityCollege:true,category:"CCC"},
  {id:13,name:"Merritt College",isCommunityCollege:true,category:"CCC"},
  {id:108,name:"MiraCosta College",isCommunityCollege:true,category:"CCC"},
  {id:32,name:"Mission College",isCommunityCollege:true,category:"CCC"},
  {id:52,name:"Modesto Junior College",isCommunityCollege:true,category:"CCC"},
  {id:133,name:"Monterey Peninsula College",isCommunityCollege:true,category:"CCC"},
  {id:139,name:"Moorpark College",isCommunityCollege:true,category:"CCC"},
  {id:149,name:"Moreno Valley College",isCommunityCollege:true,category:"CCC"},
  {id:62,name:"Mount San Antonio College",isCommunityCollege:true,category:"CCC"},
  {id:53,name:"Mt. San Jacinto College",isCommunityCollege:true,category:"CCC"},
  {id:73,name:"Napa Valley College",isCommunityCollege:true,category:"CCC"},
  {id:148,name:"Norco College",isCommunityCollege:true,category:"CCC"},
  {id:48,name:"Ohlone College",isCommunityCollege:true,category:"CCC"},
  {id:74,name:"Orange Coast College",isCommunityCollege:true,category:"CCC"},
  {id:87,name:"Oxnard College",isCommunityCollege:true,category:"CCC"},
  {id:56,name:"Palomar College",isCommunityCollege:true,category:"CCC"},
  {id:63,name:"Palo Verde College",isCommunityCollege:true,category:"CCC"},
  {id:49,name:"Pasadena City College",isCommunityCollege:true,category:"CCC"},
  {id:125,name:"Porterville College",isCommunityCollege:true,category:"CCC"},
  {id:36,name:"Reedley College",isCommunityCollege:true,category:"CCC"},
  {id:64,name:"Rio Hondo College",isCommunityCollege:true,category:"CCC"},
  {id:78,name:"Riverside City College",isCommunityCollege:true,category:"CCC"},
  {id:126,name:"Sacramento City College",isCommunityCollege:true,category:"CCC"},
  {id:65,name:"Saddleback College",isCommunityCollege:true,category:"CCC"},
  {id:131,name:"San Bernardino Valley College",isCommunityCollege:true,category:"CCC"},
  {id:54,name:"San Diego City College",isCommunityCollege:true,category:"CCC"},
  {id:101,name:"San Diego Mesa College",isCommunityCollege:true,category:"CCC"},
  {id:45,name:"San Diego Miramar College",isCommunityCollege:true,category:"CCC"},
  {id:109,name:"San Joaquin Delta College",isCommunityCollege:true,category:"CCC"},
  {id:136,name:"San Jose City College",isCommunityCollege:true,category:"CCC"},
  {id:14,name:"Santa Ana College",isCommunityCollege:true,category:"CCC"},
  {id:92,name:"Santa Barbara City College",isCommunityCollege:true,category:"CCC"},
  {id:137,name:"Santa Monica College",isCommunityCollege:true,category:"CCC"},
  {id:57,name:"Santa Rosa Junior College",isCommunityCollege:true,category:"CCC"},
  {id:66,name:"Santiago Canyon College",isCommunityCollege:true,category:"CCC"},
  {id:38,name:"Shasta College",isCommunityCollege:true,category:"CCC"},
  {id:93,name:"Sierra College",isCommunityCollege:true,category:"CCC"},
  {id:127,name:"Skyline College",isCommunityCollege:true,category:"CCC"},
  {id:94,name:"Solano Community College",isCommunityCollege:true,category:"CCC"},
  {id:138,name:"Southwestern College",isCommunityCollege:true,category:"CCC"},
  {id:119,name:"Taft College",isCommunityCollege:true,category:"CCC"},
  {id:95,name:"Ventura College",isCommunityCollege:true,category:"CCC"},
  {id:19,name:"Victor Valley College",isCommunityCollege:true,category:"CCC"},
  {id:67,name:"West Hills College Coalinga",isCommunityCollege:true,category:"CCC"},
  {id:146,name:"West Hills College Lemoore",isCommunityCollege:true,category:"CCC"},
  {id:91,name:"West Los Angeles College",isCommunityCollege:true,category:"CCC"},
  {id:80,name:"West Valley College",isCommunityCollege:true,category:"CCC"},
  {id:147,name:"Woodland Community College",isCommunityCollege:true,category:"CCC"},
  {id:90,name:"Yuba College",isCommunityCollege:true,category:"CCC"},
  {id:79,name:"UC Berkeley",isCommunityCollege:false,category:"UC"},
  {id:89,name:"UC Davis",isCommunityCollege:false,category:"UC"},
  {id:120,name:"UC Irvine",isCommunityCollege:false,category:"UC"},
  {id:117,name:"UC Los Angeles",isCommunityCollege:false,category:"UC"},
  {id:144,name:"UC Merced",isCommunityCollege:false,category:"UC"},
  {id:46,name:"UC Riverside",isCommunityCollege:false,category:"UC"},
  {id:7,name:"UC San Diego",isCommunityCollege:false,category:"UC"},
  {id:128,name:"UC Santa Barbara",isCommunityCollege:false,category:"UC"},
  {id:132,name:"UC Santa Cruz",isCommunityCollege:false,category:"UC"},
  {id:11,name:"Cal Poly San Luis Obispo",isCommunityCollege:false,category:"CSU"},
  {id:75,name:"Cal Poly Pomona",isCommunityCollege:false,category:"CSU"},
  {id:98,name:"CSU Bakersfield",isCommunityCollege:false,category:"CSU"},
  {id:143,name:"CSU Channel Islands",isCommunityCollege:false,category:"CSU"},
  {id:141,name:"CSU Chico",isCommunityCollege:false,category:"CSU"},
  {id:50,name:"CSU Dominguez Hills",isCommunityCollege:false,category:"CSU"},
  {id:21,name:"CSU East Bay",isCommunityCollege:false,category:"CSU"},
  {id:29,name:"CSU Fresno",isCommunityCollege:false,category:"CSU"},
  {id:129,name:"CSU Fullerton",isCommunityCollege:false,category:"CSU"},
  {id:81,name:"CSU Long Beach",isCommunityCollege:false,category:"CSU"},
  {id:76,name:"CSU Los Angeles",isCommunityCollege:false,category:"CSU"},
  {id:1,name:"CSU Maritime Academy",isCommunityCollege:false,category:"CSU"},
  {id:12,name:"CSU Monterey Bay",isCommunityCollege:false,category:"CSU"},
  {id:42,name:"CSU Northridge",isCommunityCollege:false,category:"CSU"},
  {id:60,name:"CSU Sacramento",isCommunityCollege:false,category:"CSU"},
  {id:85,name:"CSU San Bernardino",isCommunityCollege:false,category:"CSU"},
  {id:23,name:"CSU San Marcos",isCommunityCollege:false,category:"CSU"},
  {id:24,name:"CSU Stanislaus",isCommunityCollege:false,category:"CSU"},
  {id:26,name:"San Diego State University",isCommunityCollege:false,category:"CSU"},
  {id:116,name:"San Francisco State University",isCommunityCollege:false,category:"CSU"},
  {id:39,name:"San Jose State University",isCommunityCollege:false,category:"CSU"},
  {id:88,name:"Sonoma State University",isCommunityCollege:false,category:"CSU"},
  {id:115,name:"Cal Poly Humboldt",isCommunityCollege:false,category:"CSU"}
];

const YEARS = [{id:75,code:"2025-2026"}];

async function apiGet(path, params = {}) {
  const url = new URL('/api/assist', window.location.origin);
  url.searchParams.set('path', path);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return data.result;
}

async function apiPost(path, body = {}) {
  const url = new URL('/api/assist', window.location.origin);
  url.searchParams.set('path', path);
  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return data.result;
}

export async function getInstitutions() {
  return INSTITUTIONS;
}

export async function getAcademicYears() {
  return YEARS;
}

export async function listAgreements(receivingId, sendingId, yearId, types = 'Major') {
  const result = await apiGet(
    `Agreements/Published/for/${receivingId}/to/${sendingId}/in/${yearId}`,
    { types }
  );
  return result?.reports ?? [];
}

export async function getAgreement(key) {
  const encoded = encodeURIComponent(key);
  return apiGet(`Agreements?Key=${encoded}`);
}

export async function searchMajors(receivingId, yearId, sendingId, nameFilter = '') {
  const body = { sendingInstitutionId: sendingId };
  if (nameFilter) body.nameFilter = nameFilter;
  return apiPost(`Published/in/${yearId}/for/${receivingId}`, body);
}

export function parseCourseRows(agreement) {
  let articulations = agreement?.articulations ?? [];
  if (typeof articulations === 'string') {
    try { articulations = JSON.parse(articulations); } catch { return []; }
  }
  const rows = [];
  for (const entry of articulations) {
    const artic = entry.articulation ?? entry;
    const recv = artic.course ?? {};
    const sendingArt = artic.sendingArticulation ?? {};
    if (!recv.courseNumber) continue;
    const recvLabel = `${recv.prefix} ${recv.courseNumber} — ${recv.courseTitle}`;
    const units = recv.minUnits ? `${recv.minUnits} units` : '';
    const items = sendingArt.items ?? [];
    if (!items.length) {
      rows.push({ receiving: recvLabel, units, sending: null, noArticulation: sendingArt.noArticulationReason || 'No current articulation' });
    } else {
      for (const group of items) {
        const courses = group.items ?? [group];
        const conj = group.courseConjunction === 'And' ? ' AND ' : ' OR ';
        const sending = courses.filter((c) => c.courseNumber).map((c) => `${c.prefix} ${c.courseNumber} — ${c.courseTitle}`).join(conj);
        if (sending) rows.push({ receiving: recvLabel, units, sending, noArticulation: null });
      }
    }
  }
  return rows;
}
