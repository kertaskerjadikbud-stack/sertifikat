const API = "https://script.google.com/macros/s/AKfycbyC955zuE7-zS7q_5QIg0SCAb4vGt5rtdMEEOk3pCM_HR2f9OmGBV3W-k9Z7N7v792C/exec";

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
