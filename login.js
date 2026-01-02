const API = "https://script.google.com/macros/s/AKfycbw7-vWFlZODc1bsZSHrmZmF-0XIRQRuFi-C7jFNNiYJQpJG6cjpuv6Q1g9j_G_XV2QU/exec";

function login(){
  fetch(API,{
    method:"POST",
    body:JSON.stringify({
      action:"login",
      username:u.value,
      password:p.value
    })
  })
  .then(r=>r.json())
  .then(d=>{
    if(d.status==="ok"){
      localStorage.setItem("role",d.role);
      location.href="index.html";
    } else alert("Login gagal");
  });
}
