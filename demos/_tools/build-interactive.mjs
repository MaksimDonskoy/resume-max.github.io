"use strict";

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();

const shell = (title, accent, body, extraCss = "") => `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>
:root{--accent:${accent};--bg:#0c1018;--panel:#151c28;--text:#eef3ff;--muted:#95a3b8;--line:rgba(255,255,255,.1)}
*{box-sizing:border-box}html,body{margin:0;font-family:"Segoe UI",Inter,Arial,sans-serif;background:var(--bg);color:var(--text)}
.demo-badge{position:fixed;right:16px;bottom:16px;z-index:99;padding:8px 12px;border-radius:999px;background:rgba(255,196,64,.16);border:1px solid rgba(255,196,64,.45);color:#ffd977;font-size:12px;font-weight:800;letter-spacing:.08em;pointer-events:none}
button,input,select,textarea{font:inherit}button{cursor:pointer}
${extraCss}
</style></head><body data-app>
${body}
<div class="demo-badge">DEMO</div>
</body></html>`;

async function write(rel, html) {
  const path = join(root, rel);
  await mkdir(join(path, ".."), { recursive: true });
  await writeFile(path, html, "utf8");
}

// --- WEB DEVELOPMENT ---

await write(
  "demos/web-development/auto-import/index.html",
  shell(
    "Auto Import — калькулятор",
    "#3b82f6",
    `
<main style="max-width:1280px;min-height:800px;margin:0 auto;padding:48px 40px 100px;display:grid;gap:28px">
<header style="display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap">
  <div><p style="margin:0;color:var(--muted);font-weight:700">AUTO IMPORT</p><h1 style="margin:8px 0 0;font-size:40px;letter-spacing:-.03em">Калькулятор ввоза авто</h1></div>
  <p style="margin:0;max-width:420px;color:var(--muted);font-size:14px">Демо-коэффициенты таможни, пошлины и сбора. Реальные ставки не используются.</p>
</header>
<section style="display:grid;grid-template-columns:1.1fr .9fr;gap:22px">
  <form id="calc" style="background:var(--panel);border:1px solid var(--line);border-radius:24px;padding:24px;display:grid;gap:16px">
    <label style="display:grid;gap:8px">Стоимость авто, $ <input data-field="price" type="number" value="18500" min="1000" step="100" style="padding:12px 14px;border-radius:12px;border:1px solid var(--line);background:#0b111b;color:var(--text)"></label>
    <label style="display:grid;gap:8px">Объём двигателя, л <input data-field="engine" type="number" value="2.0" min=".8" step=".1" style="padding:12px 14px;border-radius:12px;border:1px solid var(--line);background:#0b111b;color:var(--text)"></label>
    <label style="display:grid;gap:8px">Возраст авто, лет <input data-field="age" type="number" value="3" min="0" max="20" style="padding:12px 14px;border-radius:12px;border:1px solid var(--line);background:#0b111b;color:var(--text)"></label>
    <label style="display:grid;gap:8px">Курс EUR (демо) <input data-field="rate" type="number" value="1.08" min=".5" step=".01" style="padding:12px 14px;border-radius:12px;border:1px solid var(--line);background:#0b111b;color:var(--text)"></label>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <label style="display:grid;gap:8px">Таможня % <input data-field="customs" type="number" value="15" style="padding:12px;border-radius:12px;border:1px solid var(--line);background:#0b111b;color:var(--text)"></label>
      <label style="display:grid;gap:8px">Пошлина % <input data-field="duty" type="number" value="10" style="padding:12px;border-radius:12px;border:1px solid var(--line);background:#0b111b;color:var(--text)"></label>
    </div>
    <label style="display:grid;gap:8px">Сервисный сбор, € <input data-field="fee" type="number" value="350" style="padding:12px 14px;border-radius:12px;border:1px solid var(--line);background:#0b111b;color:var(--text)"></label>
    <button type="button" data-action="recalc" style="padding:14px;border:0;border-radius:14px;background:var(--accent);color:#fff;font-weight:800">Пересчитать</button>
  </form>
  <aside id="summary" style="background:linear-gradient(160deg,#1a2740,#121a2a);border:1px solid var(--line);border-radius:24px;padding:24px;display:grid;gap:14px;align-content:start">
    <h2 style="margin:0;font-size:22px">Итог демо-расчёта</h2>
    <div data-out="customs" style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--line)"><span>Таможня</span><b>$0</b></div>
    <div data-out="duty" style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--line)"><span>Пошлина</span><b>$0</b></div>
    <div data-out="fee" style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--line)"><span>Сборы</span><b>$0</b></div>
    <div data-out="total" style="display:flex;justify-content:space-between;padding:16px 0;font-size:26px"><span>Итого</span><b style="color:#7dd3fc">$0</b></div>
    <p style="margin:0;color:var(--muted);font-size:13px">Цифры обновляются при вводе без отправки на сервер.</p>
  </aside>
</section>
</main>
<script>
const f=document.getElementById('calc'),s=document.getElementById('summary');
const nf=n=>'$'+Math.round(n).toLocaleString('ru-RU');
function val(k){return Number(f.querySelector('[data-field="'+k+'"]').value)||0}
function recalc(){
 const price=val('price'),rate=val('rate'),customs=price*val('customs')/100,duty=price*val('duty')/100,fee=val('fee')*rate,age=val('age'),engine=val('engine');
 const ageCoef=age>5?1.12:age>3?1.06:1; const engineCoef=engine>2.5?1.08:1;
 const total=(price+customs+duty+fee)*ageCoef*engineCoef;
 s.querySelector('[data-out="customs"]').lastElementChild.textContent=nf(customs);
 s.querySelector('[data-out="duty"]').lastElementChild.textContent=nf(duty);
 s.querySelector('[data-out="fee"]').lastElementChild.textContent=nf(fee);
 s.querySelector('[data-out="total"]').lastElementChild.textContent=nf(total);
}
f.addEventListener('input',recalc);f.querySelector('[data-action="recalc"]').addEventListener('click',recalc);recalc();
</script>`
  )
);

await write(
  "demos/web-development/build-house/index.html",
  shell(
    "Build House",
    "#f59e0b",
  `<main style="max-width:1280px;min-height:800px;margin:0 auto;padding:0 0 90px">
  <header style="padding:36px 40px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line)">
    <strong style="font-size:22px;letter-spacing:.04em">BUILD HOUSE</strong>
    <nav style="display:flex;gap:18px;color:var(--muted);font-size:14px"><a href="#services" style="color:inherit;text-decoration:none">Услуги</a><a href="#contact" style="color:inherit;text-decoration:none">Контакты</a></nav>
  </header>
  <section style="padding:56px 40px;display:grid;grid-template-columns:1.2fr .8fr;gap:28px;align-items:center">
    <div><p style="color:var(--muted);margin:0">Строительная компания</p><h1 style="margin:12px 0;font-size:46px;letter-spacing:-.03em">Дома и коттеджи под ключ</h1><p style="color:var(--muted);max-width:46ch">Демо-лендинг: каталог работ и форма заявки только с локальной валидацией.</p></div>
    <a id="services" href="#services" style="justify-self:end;padding:18px 24px;border-radius:18px;background:var(--accent);color:#111;font-weight:800;text-decoration:none">Смотреть услуги</a>
  </section>
  <section style="padding:0 40px 40px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
    ${[
      ["Проектирование", "Индивидуальные планы 120–280 м²"],
      ["Фундамент", "Монолит, сваи, геодезия"],
      ["Отделка", "Фасад, инженерия, сдача"],
    ]
      .map(
        (x) => `<article style="padding:22px;border-radius:20px;background:var(--panel);border:1px solid var(--line)"><h3 style="margin:0 0 8px">${x[0]}</h3><p style="margin:0;color:var(--muted);font-size:14px">${x[1]}</p><button data-service="${x[0]}" style="margin-top:14px;padding:10px 14px;border-radius:12px;border:1px solid var(--line);background:#101827;color:var(--text)">Выбрать</button></article>`
      )
      .join("")}
  </section>
  <section id="contact" style="margin:0 40px;padding:24px;border-radius:22px;background:var(--panel);border:1px solid var(--line);display:grid;grid-template-columns:1fr 1fr;gap:18px">
    <label style="display:grid;gap:8px">Имя <input data-f="name" placeholder="Анна" style="padding:12px;border-radius:12px;border:1px solid var(--line);background:#0b111b;color:var(--text)"></label>
    <label style="display:grid;gap:8px">Телефон <input data-f="phone" placeholder="+7 900 000-00-00" style="padding:12px;border-radius:12px;border:1px solid var(--line);background:#0b111b;color:var(--text)"></label>
    <label style="grid-column:1/-1;display:grid;gap:8px">Комментарий <textarea data-f="msg" rows="3" style="padding:12px;border-radius:12px;border:1px solid var(--line);background:#0b111b;color:var(--text)"></textarea></label>
    <button id="send" type="button" style="grid-column:1/-1;padding:14px;border:0;border-radius:14px;background:var(--accent);color:#111;font-weight:800">Отправить заявку (локально)</button>
  </section>
  <motion id="toast" hidden style="position:fixed;left:50%;top:24px;transform:translateX(-50%);padding:14px 18px;border-radius:14px;background:#17301f;border:1px solid #2f6f46;color:#9ee6b8;font-weight:700">Заявка сохранена в демо-режиме</motion>
</main>
<script>
document.getElementById('send').addEventListener('click',()=>{
 const name=document.querySelector('[data-f="name"]').value.trim();
 const phone=document.querySelector('[data-f="phone"]').value.trim();
 if(name.length<2||phone.length<6){alert('Заполните имя и телефон (локальная проверка)');return;}
 const t=document.getElementById('toast');t.hidden=false;clearTimeout(window._t);window._t=setTimeout(()=>t.hidden=true,2600);
});
</script>`
  )
);

await write(
  "demos/web-development/tech-store/index.html",
  shell(
    "Tech Store",
    "#22d3ee",
    `
<main style="max-width:1280px;min-height:800px;margin:0 auto;padding:32px 40px 100px;display:grid;gap:20px">
<header style="display:flex;justify-content:space-between;align-items:center"><strong style="font-size:24px">TECH STORE</strong><button id="openCart" style="padding:10px 14px;border-radius:12px;border:1px solid var(--line);background:var(--panel);color:var(--text)">Корзина: <span id="cartCount">0</span></button></header>
<div style="display:flex;gap:12px;flex-wrap:wrap"><button class="flt is-on" data-filter="all">Все</button><button class="flt" data-filter="audio">Аудио</button><button class="flt" data-filter="laptop">Ноутбуки</button><button class="flt" data-filter="mobile">Смартфоны</button></div>
<div id="grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px"></div>
<aside id="cartPanel" hidden style="position:fixed;right:24px;top:24px;bottom:24px;width:340px;padding:20px;border-radius:20px;background:#111827;border:1px solid var(--line);grid-template-rows:auto 1fr auto;gap:12px;box-shadow:0 24px 80px rgba(0,0,0,.45)">
  <div style="display:flex;justify-content:space-between;align-items:center"><h3 style="margin:0">Корзина</h3><button id="closeCart" style="border:0;background:transparent;color:var(--muted)">Закрыть</button></div>
  <ul id="cartList" style="margin:0;padding:0;list-style:none;overflow:auto;display:grid;gap:8px"></ul>
  <div><div style="display:flex;justify-content:space-between;margin-bottom:10px"><span>Итого</span><b id="cartTotal">$0</b></div><button id="checkout" style="width:100%;padding:12px;border:0;border-radius:12px;background:var(--accent);color:#05232a;font-weight:800">Оформить демо</button></div>
</aside>
</main>
<style>.flt{padding:8px 12px;border-radius:999px;border:1px solid var(--line);background:#121a29;color:var(--text)}.flt.is-on{background:var(--accent);color:#06242a;border-color:transparent}.card{padding:16px;border-radius:18px;background:var(--panel);border:1px solid var(--line)}.card[hidden]{display:none}#cartPanel{display:none;grid-template-rows:auto 1fr auto}#cartPanel:not([hidden]){display:grid}</style>
<script>
const items=[
 {id:1,name:'Pulse Buds',cat:'audio',price:129},
 {id:2,name:'NovaBook 14',cat:'laptop',price:899},
 {id:3,name:'Pixel Air',cat:'mobile',price:699},
 {id:4,name:'Wave Speaker',cat:'audio',price:199},
 {id:5,name:'Core 16 Pro',cat:'laptop',price:1199},
 {id:6,name:'Orbit Mini',cat:'mobile',price:499},
];
const grid=document.getElementById('grid'),cart=new Map();
function render(){
 grid.innerHTML='';
 const f=document.querySelector('.flt.is-on').dataset.filter;
 items.filter(i=>f==='all'||i.cat===f).forEach(i=>{
  const el=document.createElement('article');el.className='card';el.dataset.cat=i.cat;
  el.innerHTML='<h4 style="margin:0 0 6px">'+i.name+'</h4><p style="margin:0 0 12px;color:var(--muted)">$'+i.price+'</p><button data-add="'+i.id+'" style="padding:8px 12px;border-radius:10px;border:0;background:var(--accent);color:#05232a;font-weight:700">В корзину</button>';
  grid.appendChild(el);
 });
}
function updateCart(){
 document.getElementById('cartCount').textContent=[...cart.values()].reduce((s,q)=>s+q,0);
 const list=document.getElementById('cartList');list.innerHTML='';
 let total=0;
 cart.forEach((q,id)=>{const it=items.find(x=>x.id===id);if(!it)return;total+=it.price*q;const li=document.createElement('li');li.style.display='flex';li.style.justifyContent='space-between';li.textContent=it.name+' × '+q+' — $'+(it.price*q);list.appendChild(li);});
 document.getElementById('cartTotal').textContent='$'+total;
}
grid.addEventListener('click',e=>{const id=Number(e.target.dataset.add);if(!id)return;cart.set(id,(cart.get(id)||0)+1);updateCart();});
document.querySelectorAll('.flt').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.flt').forEach(x=>x.classList.remove('is-on'));b.classList.add('is-on');render();}));
document.getElementById('openCart').addEventListener('click',()=>document.getElementById('cartPanel').hidden=false);
document.getElementById('closeCart').addEventListener('click',()=>document.getElementById('cartPanel').hidden=true);
document.getElementById('checkout').addEventListener('click',()=>alert('Демо-оформление без оплаты'));
render();updateCart();
</script>`
  )
);

await write(
  "demos/web-development/digital-space/index.html",
  shell(
    "Digital Space",
    "#a78bfa",
    `
<main style="max-width:1280px;min-height:800px;margin:0 auto;padding:36px 40px 100px;display:grid;gap:24px">
<header><h1 style="margin:0;font-size:42px">DIGITAL SPACE</h1><p style="color:var(--muted)">IT-агентство — демо-лендинг с табами и фильтром кейсов</p></header>
<div style="display:flex;gap:10px"><button class="tab is-on" data-tab="about">О нас</button><button class="tab" data-tab="stack">Стек</button><button class="tab" data-tab="process">Процесс</button></div>
<section id="tabBody" style="padding:22px;border-radius:20px;background:var(--panel);border:1px solid var(--line);min-height:140px"></section>
<details style="padding:16px 20px;border-radius:16px;background:var(--panel);border:1px solid var(--line)"><summary style="font-weight:700;cursor:pointer">FAQ по сотрудничеству (демо)</summary><p style="margin:12px 0 0;color:var(--muted)">Сроки и бюджет считаются локально, без CRM.</p></details>
<div style="display:flex;gap:10px"><button class="case-f is-on" data-case="all">Все кейсы</button><button class="case-f" data-case="web">Web</button><button class="case-f" data-case="bot">Bots</button><button class="case-f" data-case="auto">Automation</button></div>
<div id="cases" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px"></div>
</main>
<style>.tab,.case-f{padding:9px 14px;border-radius:999px;border:1px solid var(--line);background:#131b2a;color:var(--text)}.tab.is-on,.case-f.is-on{background:var(--accent);color:#1a1033;border-color:transparent}.case{padding:16px;border-radius:16px;background:#121a2a;border:1px solid var(--line)}.case[hidden]{display:none}</style>
<script>
const tabs={about:'Проектируем MVP и продукты для B2B/B2C. Это учебный блок.',stack:'React, Node, PostgreSQL, n8n, Telegram API — демо-перечень.',process:'Бриф → прототип → разработка → релиз. Без реальных контрактов.'};
const cases=[{t:'Fin portal',k:'web'},{t:'Shop bot',k:'bot'},{t:'Price sync',k:'auto'},{t:'Booking UI',k:'web'},{t:'Support AI',k:'bot'},{t:'CRM bridge',k:'auto'}];
const body=document.getElementById('tabBody'),box=document.getElementById('cases');
function tab(k){body.textContent=tabs[k];}
function casesRender(f){box.innerHTML='';cases.filter(c=>f==='all'||c.k===f).forEach(c=>{const el=document.createElement('article');el.className='case';el.textContent=c.t+' · '+c.k;box.appendChild(el);});}
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('is-on'));b.classList.add('is-on');tab(b.dataset.tab);}));
document.querySelectorAll('.case-f').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.case-f').forEach(x=>x.classList.remove('is-on'));b.classList.add('is-on');casesRender(b.dataset.case);}));
tab('about');casesRender('all');
</script>`
  )
);

await write(
  "demos/web-development/booking-pro/index.html",
  shell(
    "Booking Pro",
    "#34d399",
    `
<main style="max-width:1280px;min-height:800px;margin:0 auto;padding:40px;display:grid;grid-template-columns:.9fr 1.1fr;gap:24px">
<section style="padding:24px;border-radius:22px;background:var(--panel);border:1px solid var(--line);display:grid;gap:14px;align-content:start">
<h2 style="margin:0">Запись на услугу</h2>
<label>Услуга<select id="service"><option value="Стрижка">Стрижка</option><option value="Маникюр">Маникюр</option><option value="Массаж">Массаж</option></select></label>
<label>Дата<input id="date" type="date"></label>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px" id="slots"></div>
<button id="confirm" style="padding:12px;border:0;border-radius:12px;background:var(--accent);color:#062818;font-weight:800">Подтвердить демо-запись</button>
</section>
<section id="result" style="padding:24px;border-radius:22px;background:#10241d;border:1px solid #1f4d3d;display:grid;gap:10px;align-content:start">
<h3 style="margin:0">Статус</h3>
<p id="status" style="margin:0;color:var(--muted)">Выберите слот времени.</p>
</section>
</main>
<style>select,input{width:100%;padding:11px;border-radius:12px;border:1px solid var(--line);background:#0b111b;color:var(--text)}.slot{padding:10px;border-radius:10px;border:1px solid var(--line);background:#101827;color:var(--text)}.slot.is-on{background:var(--accent);color:#062818;border-color:transparent}</style>
<script>
const slotsEl=document.getElementById('slots'),times=['10:00','12:30','15:00','17:30','19:00'];let pick='';
const d=document.getElementById('date');d.valueAsDate=new Date(Date.now()+86400000);
times.forEach(t=>{const b=document.createElement('button');b.type='button';b.className='slot';b.textContent=t;b.addEventListener('click',()=>{document.querySelectorAll('.slot').forEach(x=>x.classList.remove('is-on'));b.classList.add('is-on');pick=t;document.getElementById('status').textContent='Слот '+t+' выбран (демо).';});slotsEl.appendChild(b);});
document.getElementById('confirm').addEventListener('click',()=>{
 if(!pick){alert('Выберите время');return;}
 document.getElementById('status').innerHTML='<b>Демо-бронь подтверждена</b><br>'+document.getElementById('service').value+' · '+d.value+' · '+pick;
});
</script>`
  )
);

// --- BOT SHELL ---
function botPage(id, title, accent, script) {
  return shell(
    title,
    accent,
    `
<div data-phone style="width:390px;min-height:760px;margin:24px auto;border-radius:36px;border:10px solid #1f2937;background:#0e1624;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto">
  <header style="padding:14px 16px;background:#111827;display:flex;gap:10px;align-items:center;border-bottom:1px solid #243044">
    <span style="width:38px;height:38px;border-radius:50%;background:var(--accent);display:grid;place-items:center;font-weight:800;color:#071018">${title.slice(0, 1)}</span>
    <div><strong style="display:block;font-size:14px">${title}</strong><span style="font-size:12px;color:var(--muted)">online · demo bot</span></div>
  </header>
  <motion id="chat" style="padding:14px;display:grid;gap:10px;align-content:start;overflow:auto"></motion>
  <div id="kb" style="padding:10px 12px;border-top:1px solid #243044;display:grid;gap:8px"></div>
</div>
<script>${script}</script>`,
    `[data-phone]{box-shadow:0 30px 80px rgba(0,0,0,.45)}.msg{max-width:88%;padding:10px 12px;border-radius:14px;font-size:14px;line-height:1.35}.bot{background:#1b2738;justify-self:start}.user{background:var(--accent);color:#061018;justify-self:end}.btn{padding:9px 10px;border-radius:12px;border:1px solid #2a3a52;background:#152033;color:var(--text);text-align:left}`
  );
}

const botScripts = {
  "shop-bot": `
const chat=document.getElementById('chat'),kb=document.getElementById('kb');
function add(text,who='bot'){const m=document.createElement('div');m.className='msg '+who;m.textContent=text;chat.appendChild(m);chat.scrollTop=chat.scrollHeight;}
function menu(btns){kb.innerHTML='';btns.forEach(([l,a])=>{const b=document.createElement('button');b.className='btn';b.textContent=l;b.onclick=()=>{add(l,'user');a();};kb.appendChild(b);});}
add('Добро пожаловать в Shop Bot (демо).');
menu([['Каталог',()=>{add('Выберите категорию:');menu([['Электроника',()=>{add('Товар: Demo Phone — $499');menu([['В корзину',()=>{add('Добавлено в демо-корзину.');menu([['Оформить',()=>add('Заказ #D-104 принят локально.')]]);}]]);}],['Одежда',()=>add('Куртка Demo — $89')]]);}],['Мои заказы',()=>add('Активных демо-заказов: 0')]]);
`,
  "booking-bot": `
const chat=document.getElementById('chat'),kb=document.getElementById('kb');
function add(t,w='bot'){const m=document.createElement('div');m.className='msg '+w;m.textContent=t;chat.appendChild(m);}
function menu(btns){kb.innerHTML='';btns.forEach(([l,a])=>{const b=document.createElement('button');b.className='btn';b.textContent=l;b.onclick=()=>{add(l,'user');a();};kb.appendChild(b);});}
add('Booking Bot — демо-запись.');
menu([['Записаться',()=>{add('Выберите услугу:');menu([['Стрижка',()=>{add('Доступно: завтра 15:00');menu([['Подтвердить',()=>add('Бронь B-220 создана (локально).')]]);}]]);}],['Мои визиты',()=>add('Ближайший демо-визит: нет')]]);
`,
  "support-ai": `
const chat=document.getElementById('chat'),kb=document.getElementById('kb');
function add(t,w='bot'){const m=document.createElement('div');m.className='msg '+w;m.textContent=t;chat.appendChild(m);}
function menu(btns){kb.innerHTML='';btns.forEach(([l,a])=>{const b=document.createElement('button');b.className='btn';b.textContent=l;b.onclick=()=>{add(l,'user');a();};kb.appendChild(b);});}
add('Support AI (демо): чем помочь?');
menu([['Не работает вход',()=>{add('Проверьте caps lock и демо-пароль reset123.');menu([['Сбросить пароль',()=>add('Ссылка отправлена в демо-чат.')]]);}],['Связаться с оператором',()=>add('Оператор подключится через 2 мин (симуляция).')]]);
`,
  "subscribe-bot": `
const chat=document.getElementById('chat'),kb=document.getElementById('kb');
function add(t,w='bot'){const m=document.createElement('div');m.className='msg '+w;m.textContent=t;chat.appendChild(m);}
function menu(btns){kb.innerHTML='';btns.forEach(([l,a])=>{const b=document.createElement('button');b.className='btn';b.textContent=l;b.onclick=()=>{add(l,'user');a();};kb.appendChild(b);});}
add('Subscribe Bot — демо-подписки.');
menu([['Тарифы',()=>{add('Basic $9 · Pro $19 · Team $39');menu([['Оформить Pro',()=>{add('Подписка активирована до 25.12 (демо).');menu([['Отменить',()=>add('Автопродление отключено локально.')]]);}]]);}],['Статус',()=>add('Текущий план: Demo Free')]]);
`,
  "order-track": `
const chat=document.getElementById('chat'),kb=document.getElementById('kb');
function add(t,w='bot'){const m=document.createElement('div');m.className='msg '+w;m.textContent=t;chat.appendChild(m);}
function menu(btns){kb.innerHTML='';btns.forEach(([l,a])=>{const b=document.createElement('button');b.className='btn';b.textContent=l;b.onclick=()=>{add(l,'user');a();};kb.appendChild(b);});}
add('Order Track — отслеживание демо-заказов.');
menu([['Заказ #TR-501',()=>{add('Статус: В пути · ETA завтра');menu([['Детали',()=>add('Склад Москва → ПВЗ №12')],['Подписаться на обновления',()=>add('Уведомления включены (демо).')]]);}],['Новый трек',()=>add('Введите номер в меню (демо): TR-777')]]);
`,
};

for (const [id, script] of Object.entries(botScripts)) {
  const titles = { "shop-bot": "Shop Bot", "booking-bot": "Booking Bot", "support-ai": "Support AI", "subscribe-bot": "Subscribe Bot", "order-track": "Order Track" };
  const accents = { "shop-bot": "#38bdf8", "booking-bot": "#4ade80", "support-ai": "#c084fc", "subscribe-bot": "#fb7185", "order-track": "#fbbf24" };
  await write(`demos/bots/${id}/index.html`, botPage(id, titles[id], accents[id], script));
}

// --- AUTOMATION DASHBOARDS ---
function dash(id, title, accent, rows) {
  const chart = `<svg viewBox="0 0 320 120" width="100%" height="120" aria-hidden="true"><polyline points="0,90 40,70 80,78 120,40 160,55 200,30 240,48 280,20 320,35" fill="none" stroke="${accent}" stroke-width="4"/></svg>`;
  return shell(
    title,
    accent,
    `<div data-dashboard style="min-height:900px;padding:28px 32px;display:grid;gap:18px">
<header style="display:flex;justify-content:space-between;align-items:center;gap:12px"><div><h1 style="margin:0;font-size:28px">${title}</h1><p style="margin:6px 0 0;color:var(--muted)">Automation demo dashboard</p></div><button data-run style="padding:10px 14px;border:0;border-radius:12px;background:var(--accent);color:#061018;font-weight:800">Запустить демо-run</button></header>
<div style="display:flex;gap:10px;flex-wrap:wrap"><input data-search placeholder="Поиск..." style="padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:#101827;color:var(--text);min-width:220px"><select data-status style="padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:#101827;color:var(--text)"><option value="all">Все статусы</option><option value="ok">OK</option><option value="warn">WARN</option><option value="fail">FAIL</option></select></div>
<div style="display:grid;grid-template-columns:1.4fr .8fr;gap:16px">
<table style="width:100%;border-collapse:collapse;background:var(--panel);border:1px solid var(--line);border-radius:16px;overflow:hidden"><thead><tr style="background:#111827;text-align:left"><th style="padding:12px">Job</th><th style="padding:12px">Status</th><th style="padding:12px">Latency</th></tr></thead><tbody id="rows">${rows}</tbody></table>
<div style="padding:16px;border-radius:16px;background:var(--panel);border:1px solid var(--line)"><h3 style="margin:0 0 10px">Throughput</h3>${chart}<p data-runlog style="margin:10px 0 0;color:var(--muted);font-size:13px">Ожидание запуска...</p></div>
</div>
</div>
<script>
const body=document.getElementById('rows');
document.querySelector('[data-run]').addEventListener('click',()=>{document.querySelector('[data-runlog]').textContent='Run #'+(Math.floor(Math.random()*900)+100)+' завершён за '+(1+Math.random()*2).toFixed(1)+'s (демо)';});
document.querySelector('[data-search]').addEventListener('input',e=>{const q=e.target.value.toLowerCase();[...body.querySelectorAll('tr')].forEach(tr=>tr.hidden=!tr.textContent.toLowerCase().includes(q));});
document.querySelector('[data-status]').addEventListener('change',e=>{const v=e.target.value;[...body.querySelectorAll('tr')].forEach(tr=>{const st=tr.dataset.status||'ok';tr.hidden=v!=='all'&&st!==v;});});
</script>`
  );
}

const dashRows = (prefix) =>
  ["Sync catalog", "Push prices", "Webhook retry", "Lead import", "Report export"]
    .map((n, i) => {
      const st = ["ok", "warn", "ok", "fail", "ok"][i];
      const color = st === "ok" ? "#4ade80" : st === "warn" ? "#fbbf24" : "#f87171";
      return `<tr data-status="${st}"><td style="padding:12px;border-top:1px solid var(--line)">${prefix} · ${n}</td><td style="padding:12px;border-top:1px solid var(--line);color:${color}">${st.toUpperCase()}</td><td style="padding:12px;border-top:1px solid var(--line)">${120 + i * 37}ms</td></tr>`;
    })
    .join("");

const automations = [
  ["data-flow", "Data Flow", "#60a5fa"],
  ["price-watch", "Price Watch", "#f472b6"],
  ["stock-sync", "Stock Sync", "#34d399"],
  ["crm-connect", "CRM Connect", "#fbbf24"],
  ["ai-content", "AI Content", "#c084fc"],
];
for (const [id, title, accent] of automations) {
  await write(`demos/automation/${id}/index.html`, dash(id, title, accent, dashRows(title)));
}

// --- MOBILE ---
function mobileApp(id, title, accent, screens) {
  const nav = screens.map((s, i) => `<button class="nav" data-go="${i}">${s.tab}</button>`).join("");
  const pages = screens
    .map(
      (s, i) => `<section class="screen" data-screen="${i}" ${i ? "hidden" : ""} style="padding:18px;display:grid;gap:12px;align-content:start">
<h2 style="margin:0;font-size:22px">${s.title}</h2>${s.body}</section>`
    )
    .join("");
  return shell(
    title,
    accent,
    `<div data-device style="width:390px;min-height:844px;margin:0 auto;background:#0a0f17;border-radius:28px;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto;border:1px solid #243044">
<header style="padding:16px 18px;background:#111827"><strong>${title}</strong><p style="margin:4px 0 0;font-size:12px;color:var(--muted)">mobile demo</p></header>
<main id="app">${pages}</main>
<nav style="display:grid;grid-template-columns:repeat(${screens.length},1fr);gap:6px;padding:10px;border-top:1px solid #243044;background:#0f1624">${nav}</nav>
</div>
<style>.nav{padding:10px 6px;border:0;border-radius:12px;background:#172033;color:var(--text);font-size:11px}.nav.is-on{background:var(--accent);color:#061018;font-weight:700}</style>
<script>
function show(i){document.querySelectorAll('.screen').forEach(s=>s.hidden=Number(s.dataset.screen)!==i);document.querySelectorAll('.nav').forEach((n,idx)=>n.classList.toggle('is-on',idx===i));}
document.querySelectorAll('.nav').forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.go))));show(0);
</script>`
  );
}

const mobileProjects = {
  "fit-track": {
    title: "Fit Track",
    accent: "#f97316",
    screens: [
      { tab: "День", title: "Активность", body: `<div style="padding:14px;border-radius:14px;background:var(--panel)">Шаги: <b>6 240</b></div><div style="padding:14px;border-radius:14px;background:var(--panel)">Калории: <b>420</b></div>` },
      { tab: "Трен.", title: "Тренировка", body: `<button style="padding:12px;border:0;border-radius:12px;background:var(--accent);color:#1b1005;font-weight:800">Старт демо HIIT</button><p style="color:var(--muted);font-size:13px">Таймер работает локально.</p>` },
      { tab: "Проф.", title: "Профиль", body: `<p>Цель: 10k шагов<br>Уровень: Demo</p>` },
    ],
  },
  "money-flow": {
    title: "Money Flow",
    accent: "#22c55e",
    screens: [
      { tab: "Сводка", title: "Баланс", body: `<h3 style="margin:0;font-size:34px">$3 420</h3><p style="color:var(--muted)">Демо-данные</p>` },
      { tab: "Операции", title: "История", body: `<ul style="margin:0;padding:0;list-style:none;display:grid;gap:8px"><li style="padding:10px;background:var(--panel);border-radius:12px">Кафе −$12</li><li style="padding:10px;background:var(--panel);border-radius:12px">Зарплата +$2 100</li></ul>` },
      { tab: "Цели", title: "Накопления", body: `<div style="height:12px;border-radius:999px;background:#1f2937"><div style="width:62%;height:100%;border-radius:999px;background:var(--accent)"></div></div><p style="margin:8px 0 0">62% до отпуска</p>` },
    ],
  },
  "food-go": {
    title: "Food Go",
    accent: "#ef4444",
    screens: [
      { tab: "Меню", title: "Рядом", body: `<article style="padding:12px;border-radius:14px;background:var(--panel)">Burger demo · 24 мин</article><article style="padding:12px;border-radius:14px;background:var(--panel)">Pasta demo · 31 мин</article>` },
      { tab: "Корзина", title: "Корзина", body: `<p>2 позиции · $24</p><button style="padding:12px;border:0;border-radius:12px;background:var(--accent);color:#fff;font-weight:800">Демо-заказ</button>` },
      { tab: "Профиль", title: "Адреса", body: `<p>Дом · Офис (демо)</p>` },
    ],
  },
  "task-space": {
    title: "Task Space",
    accent: "#6366f1",
    screens: [
      { tab: "Inbox", title: "Входящие", body: `<label style="display:flex;gap:8px"><input type="checkbox"> Сверстать демо</label><label style="display:flex;gap:8px"><input type="checkbox" checked> Проверить бот</label>` },
      { tab: "Сегодня", title: "Фокус", body: `<p>3 задачи на сегодня (локально).</p>` },
      { tab: "Команда", title: "Участники", body: `<p>Аня · Макс · Demo Bot</p>` },
    ],
  },
  "city-guide": {
    title: "City Guide",
    accent: "#06b6d4",
    screens: [
      { tab: "Лента", title: "События", body: `<p>Джаз в парке · 19:00</p><p>Food market · 12:00</p>` },
      { tab: "Карта", title: "Маршрут", body: `<div style="height:180px;border-radius:16px;background:linear-gradient(140deg,#0f2f3f,#102030);display:grid;place-items:center">SVG-map demo</div>` },
      { tab: "Избр.", title: "Сохранено", body: `<p>5 мест в избранном</p>` },
    ],
  },
};

for (const [id, cfg] of Object.entries(mobileProjects)) {
  await write(`demos/mobile/${id}/index.html`, mobileApp(id, cfg.title, cfg.accent, cfg.screens));
}

// --- capture-interactive.json ---
const jobs = [];
const job = (url, out, w, h, selector, actions) => jobs.push({ url, out, width: w, height: h, scale: 1, selector: selector || "body", quality: 84, ...(actions ? { actions } : {}) });

const web = [
  ["auto-import", []],
  ["build-house", [{ click: "[data-service='Проектирование']" }, { fill: ["[data-f='name']", "Demo"] }, { fill: ["[data-f='phone']", "+7 900 111-22-33"] }, { click: "#send" }, { wait: 350 }]],
  ["tech-store", [{ click: "[data-filter='laptop']" }, { click: "[data-add='2']" }, { click: "#openCart" }]],
  ["digital-space", [{ click: "[data-tab='stack']" }, { click: "[data-case='bot']" }]],
  ["booking-pro", [{ click: ".slot" }, { click: "#confirm" }]],
];
for (const [slug, actions] of web) {
  job(`demos/web-development/${slug}/index.html`, `image/portfolio/web-development/${slug}/cover.webp`, 1280, 800, "body");
  job(`demos/web-development/${slug}/index.html`, `image/portfolio/web-development/${slug}/01.webp`, 1280, 800, "body", actions.slice(0, 1).length ? actions.slice(0, 1) : [{ click: "[data-action='recalc']" }]);
  job(`demos/web-development/${slug}/index.html`, `image/portfolio/web-development/${slug}/02.webp`, 1280, 800, "body", actions.length ? actions : [{ fill: ["[data-field='price']", "24000"] }, { click: "[data-action='recalc']" }]);
}

const botClick = "#kb button.btn:nth-child(1)";
for (const slug of Object.keys(botScripts)) {
  job(`demos/bots/${slug}/index.html`, `image/portfolio/bots/${slug}/cover.webp`, 420, 860, "[data-phone]");
  job(`demos/bots/${slug}/index.html`, `image/portfolio/bots/${slug}/01.webp`, 420, 860, "[data-phone]", [{ click: botClick }]);
  job(`demos/bots/${slug}/index.html`, `image/portfolio/bots/${slug}/02.webp`, 420, 860, "[data-phone]", [{ click: botClick }, { wait: 200 }, { click: botClick }]);
}

for (const [id] of automations) {
  job(`demos/automation/${id}/index.html`, `image/portfolio/automation/${id}/cover.webp`, 1440, 900, "[data-dashboard]");
  job(`demos/automation/${id}/index.html`, `image/portfolio/automation/${id}/01.webp`, 1440, 900, "[data-dashboard]", [{ fill: ["[data-search]", "Push"] }]);
  job(`demos/automation/${id}/index.html`, `image/portfolio/automation/${id}/02.webp`, 1440, 900, "[data-dashboard]", [{ click: "[data-run]" }, { wait: 250 }]);
}

const mobileNav = { "fit-track": 1, "money-flow": 1, "food-go": 1, "task-space": 1, "city-guide": 2 };
for (const [slug, idx] of Object.entries(mobileNav)) {
  job(`demos/mobile/${slug}/index.html`, `image/portfolio/mobile/${slug}/cover.webp`, 390, 844, "[data-device]");
  job(`demos/mobile/${slug}/index.html`, `image/portfolio/mobile/${slug}/01.webp`, 390, 844, "[data-device]", [{ click: `.nav:nth-child(${idx + 1})` }]);
  job(`demos/mobile/${slug}/index.html`, `image/portfolio/mobile/${slug}/02.webp`, 390, 844, "[data-device]", [{ click: `.nav:nth-child(3)` }]);
}

await write("demos/_tools/capture-interactive.json", JSON.stringify(jobs, null, 2) + "\n");

console.log(JSON.stringify({ demos: 20, captureJobs: jobs.length }, null, 2));