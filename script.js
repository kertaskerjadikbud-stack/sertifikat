const API = "https://script.google.com/macros/s/AKfycbyC955zuE7-zS7q_5QIg0SCAb4vGt5rtdMEEOk3pCM_HR2f9OmGBV3W-k9Z7N7v792C/exec";
let allData = [];

// CEK LOGIN
if (!localStorage.getItem("role")) {
  location.href = "login.html";
}

function logout() {
  localStorage.clear();
  location.href = "login.html";
}

function load() {
  fetch(API + "?sheet=" + sheet.value)
    .then(r => r.json())
    .then(d => {
      allData = d;
      populateKecamatan(d);
      renderTable(d);
    });
}

function populateKecamatan(d) {
  kecamatan.innerHTML = '<option value="">Semua Kecamatan</option>';
  [...new Set(d.map(x => x.Kecamatan))].forEach(k => {
    if (k) kecamatan.innerHTML += `<option>${k}</option>`;
  });
}

function renderTable(data) {
  tb.innerHTML = "";
  data.forEach((x, i) => {
    tb.innerHTML += `
      <tr class="hover:bg-gray-50">
        <td class="td">${x.No}</td>
        <td class="td">${x.NPSN}</td>
        <td class="td font-medium">${x["Nama Satuan Pendidikan"]}</td>
        <td class="td">${x.Kecamatan}</td>
        <td class="td">
          <input type="file" class="text-xs" onchange="uploadFile(this, ${i})">
        </td>
        <td class="td text-center">
          ${x.Sertifikat
            ? `<button onclick="openPDF('${x.Sertifikat}')" class="btn-view">👁 Lihat</button>`
            : `<span class="text-gray-400 italic">Belum ada</span>`
          }
        </td>
      </tr>`;
  });
}

/* =====================
   FILTER KECAMATAN
===================== */
kecamatan.onchange = () => applyFilter();
sheet.onchange = load;

/* =====================
   SEARCH
===================== */
search.onkeyup = () => applyFilter();

function applyFilter() {
  const key = search.value.toLowerCase();
  const kec = kecamatan.value;

  let filtered = allData.filter(d => {
    const text =
      `${d.NPSN} ${d["Nama Satuan Pendidikan"]} ${d.Kecamatan}`.toLowerCase();

    const matchSearch = text.includes(key);
    const matchKec = kec ? d.Kecamatan === kec : true;

    return matchSearch && matchKec;
  });

  renderTable(filtered);
}

/* =====================
   MODAL
===================== */
function openPDF(url) {
  modal.style.display = "flex";
  viewer.src = url;
  dl.href = url;
}

function closeModal() {
  modal.style.display = "none";
  viewer.src = "";
}

load();
