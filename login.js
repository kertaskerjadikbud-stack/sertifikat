const API = "https://script.google.com/macros/s/AKfycbxHyp9rOZMTjIDIwu919iGWjQz8ujaZOfvugq8gtGXzWXKa0oOs3MJ8pRM3rI1-JAmm/exec";

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
