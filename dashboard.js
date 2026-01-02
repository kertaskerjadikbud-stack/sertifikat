fetch("PASTE_API_URL?sheet=SD NEGERI")
.then(r=>r.json())
.then(d=>{
  const c={};
  d.forEach(x=>c[x.Kecamatan]=(c[x.Kecamatan]||0)+1);
  new Chart(chart,{
    type:"bar",
    data:{labels:Object.keys(c),datasets:[{data:Object.values(c)}]}
  });
});
