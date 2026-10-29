const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('#mobile-menu');
function closeMenu(){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Apri menu');menu.hidden=true;}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Chiudi menu':'Apri menu');menu.hidden=!open;});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){closeMenu();toggle.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.header'))closeMenu();});
window.matchMedia('(min-width:761px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
const filters=[...document.querySelectorAll('[data-filter]')];
function filter(line,update=false){if(!filters.some(b=>b.dataset.filter===line))line='Tutti';let count=0;document.querySelectorAll('.catalog [data-line]').forEach(card=>{card.hidden=line!=='Tutti'&&card.dataset.line!==line;if(!card.hidden)count++;});filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===line)));const status=document.querySelector('#filter-status');if(status)status.textContent=`${count} ${count===1?'prodotto':'prodotti'}`;if(update){const url=new URL(location.href);if(line==='Tutti')url.searchParams.delete('linea');else url.searchParams.set('linea',line);history.replaceState(null,'',url);}}
filters.forEach(button=>button.addEventListener('click',()=>filter(button.dataset.filter,true)));
if(filters.length)filter(new URLSearchParams(location.search).get('linea')||'Tutti');
window.addEventListener('popstate',()=>{if(filters.length)filter(new URLSearchParams(location.search).get('linea')||'Tutti');});
const product=new URLSearchParams(location.search).get('prodotto');
if(product&&document.querySelector('#message')){document.querySelector('#topic').value='Vorrei ordinare';document.querySelector('#message').value=`Vorrei informazioni su ${product}.`;}
document.querySelectorAll('form[data-demo="contact"]').forEach(form=>form.addEventListener('submit',event=>{event.preventDefault();form.querySelector('.form-status').textContent='Anteprima completata. Nessun messaggio è stato inviato e nessun dato è stato salvato. I recapiti ufficiali saranno disponibili prossimamente.';}));
