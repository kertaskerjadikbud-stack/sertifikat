const API = "https://script.google.com/macros/s/AKfycbw7-vWFlZODc1bsZSHrmZmF-0XIRQRuFi-C7jFNNiYJQpJG6cjpuv6Q1g9j_G_XV2QU/exec";
let allData = [];
let selectedRow = null;

function load() {
  fetch(API + "?sheet=" + sheet.value)
    .then(r => r.json())
    .then(d => {
      allData = d;
      renderTable(d);
      populateKecamatan(d);
    });
}

function populateKecamatan(d) {
  kecamatan.innerHTML = '<option value="">Semua Kecamatan</option>';
  [...new Set(d.map(x => x.Kecamatan))].forEach(k => {
    if (k) kecamatan.innerHTML += `<option>${k}</option>`;
  });
}

function renderTable(d) {
  tb.innerHTML = "";
  d.forEach((x, i) => {
    tb.innerHTML += `
      <tr class="hover:bg-gray-50">
        <td class="td">${x.No}</td>
        <td class="td">${x.NPSN}</td>
        <td class="td font-medium">${x["Nama Satuan Pendidikan"]}</td>
        <td class="td">${x.Kecamatan}</td>

        <td class="td">
          <input type="file"
                 class="text-xs"
                 onchange="uploadFile(this, ${i})">
        </td>

        <td class="td text-center">
          ${x.Sertifikat
            ? `<button onclick="openPDF('${x.Sertifikat}')"
                class="btn-view">👁 Lihat</button>`
            : `<span class="text-gray-400 italic">Belum ada</span>`
          }
        </td>
      </tr>
    `;
  });
}

kecamatan.onchange = () => {
  renderTable(
    kecamatan.value
      ? allData.filter(x => x.Kecamatan === kecamatan.value)
      : allData
  );
};

sheet.onchange = load;

function uploadFile(input, index) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    fetch(API, {
      method: "POST",
      body: JSON.stringify({
        action: "upload",
        base64: reader.result.split(",")[1],
        name: file.name,
        mimeType: file.type,
        rowIndex: index,
        sheet: sheet.value
      })
    })
    .then(r => r.json())
    .then(res => {
      alert("Upload berhasil");
      load();
    });
  };
  reader.readAsDataURL(file);
}

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
