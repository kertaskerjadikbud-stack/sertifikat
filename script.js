const API = "https://script.google.com/macros/s/AKfycbw7-vWFlZODc1bsZSHrmZmF-0XIRQRuFi-C7jFNNiYJQpJG6cjpuv6Q1g9j_G_XV2QU/exec";
let dataAll=[];

const role = localStorage.getItem("role");
if(!role) location.href="login.html";
if(role==="viewer") uploadBtn.style.display="none";

function load(){
  fetch(API+"?sheet="+sheet.value)
    .then(r=>r.json())
    .then(d=>{
      dataAll=d;
      kecamatan.innerHTML='<option value="">Semua</option>';
      [...new Set(d.map(x=>x.Kecamatan))].forEach(k=>{
        if(k) kecamatan.innerHTML+=`<option>${k}</option>`;
      });
      render(d);
    });
}

function render(d){
  tb.innerHTML="";
  d.forEach(x=>{
    tb.innerHTML+=`
    <tr>
      <td>${x.No}</td>
      <td>${x.NPSN}</td>
      <td>${x["Nama Satuan Pendidikan"]}</td>
      <td>${x.Kecamatan}</td>
      <td>${x.Sertifikat?`<button onclick="openPDF('${x.Sertifikat}')">👁</button>`:""}</td>
    </tr>`;
  });
}

kecamatan.onchange=()=>{
  render(kecamatan.value?dataAll.filter(x=>x.Kecamatan===kecamatan.value):dataAll);
};

function openPDF(url){
  modal.style.display="block";
  viewer.src=url;
  dl.href=url;
}
function closeModal(){ modal.style.display="none"; }

function upload(){
  const f=file.files[0];
  const r=new FileReader();
  r.onload=()=>{
    fetch(API,{
      method:"POST",
      body:JSON.stringify({
        action:"upload",
        base64:r.result.split(",")[1],
        name:f.name,
        mimeType:f.type
      })
    }).then(res=>res.json()).then(d=>alert("Uploaded"));
  };
  r.readAsDataURL(f);
}

sheet.onchange=load;
load();
