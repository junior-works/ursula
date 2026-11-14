/* Contador anónimo de visitas y toques en enlaces. Sin cookies ni datos personales.
   Para que tu propio móvil no cuente: abrir una vez cualquier página con ?nomedir=1 (se revierte con ?nomedir=0). */
(function(){
  try{
    var q=location.search.match(/[?&]nomedir=([01])/);
    if(q){ if(q[1]==='1') localStorage.setItem('nomedir','1'); else localStorage.removeItem('nomedir'); }
    if(localStorage.getItem('nomedir')==='1') return;
  }catch(e){}
  if(navigator.webdriver) return;
  var U='';  /* destino de los eventos: pendiente (el Supabase anterior de Úrsula ya no existe) */
  var K='';
  if(!U) return;
  var pag=(location.pathname.replace(/index\.html$/,'')||'/').slice(0,60);
  var org='';
  try{ org=document.referrer?new URL(document.referrer).hostname.slice(0,80):''; }catch(e){}
  function ev(tipo,destino){
    try{
      fetch(U,{method:'POST',keepalive:true,
        headers:{apikey:K,Authorization:'Bearer '+K,'Content-Type':'application/json',Prefer:'return=minimal'},
        body:JSON.stringify({pagina:pag,tipo:tipo,destino:destino?String(destino).slice(0,120):null,origen:org||null})
      }).catch(function(){});
    }catch(e){}
  }
  ev('visita');
  document.addEventListener('click',function(e){
    var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;
    if(!a) return;
    var m=a.href.match(/amazon\.[a-z.]+\/dp\/([A-Z0-9]{10})/);
    if(m) ev('clic','amazon:'+m[1]);
    else if(/ko-fi\.com/.test(a.href)) ev('clic','kofi');
    else if(a.hostname&&a.hostname!==location.hostname) ev('clic',a.hostname);
  },true);
})();
