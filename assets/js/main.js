(function(){
  const $ = (q, el=document) => el.querySelector(q);
  const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));

  // Heat levels selection
  const levelRows = $$('.level-row[data-level]');
  const productTitle = $('#productTitle');
  const productDesc  = $('#productDesc');
  const productTags  = $('#productTags');
  const heatLabel    = $('#heatLabel');

  const levelData = {
    mild: {
      title: "Mild (Everyday)",
      desc: "Bright, smoky, and super dippable — the one you can put on everything without thinking twice.",
      tags: ["chips & salsa", "breakfast tacos", "crowd-pleaser"],
      heat: "heat: 25%",
      width: "25%"
    },
    medium: {
      title: "Wood-Fired (Medium)",
      desc: "Smoky depth with a clean kick. Balanced heat that shows up fast, then hangs out politely.",
      tags: ["grilled chicken", "burgers", "nachos"],
      heat: "heat: 55%",
      width: "55%"
    },
    hot: {
      title: "Mango Habanero (Hot)",
      desc: "Sweet up front, then the habanero comes in hot. For brave spoons and bold tacos.",
      tags: ["wings", "eggs", "dare-you-to"],
      heat: "heat: 85%",
      width: "85%"
    }
  };

  function setLevel(key){
    const d = levelData[key];
    if(!d) return;

    levelRows.forEach(r => r.classList.toggle('active', r.dataset.level === key));
    productTitle.textContent = d.title;
    productDesc.textContent = d.desc;
    heatLabel.textContent = d.heat;

    // update tags
    productTags.innerHTML = "";
    d.tags.forEach(t=>{
      const el = document.createElement('span');
      el.className = 'tag';
      el.textContent = t;
      productTags.appendChild(el);
    });

    // update bars
    levelRows.forEach(r=>{
      const i = r.querySelector('.bar > i');
      if(!i) return;
      i.style.width = (levelData[r.dataset.level]?.width) || '45%';
    });
  }

  levelRows.forEach(r=>{
    const btn = r.querySelector('button');
    if(btn){
      btn.addEventListener('click', ()=> setLevel(r.dataset.level));
    } else {
      r.addEventListener('click', ()=> setLevel(r.dataset.level));
    }
  });

  setLevel('medium');

  // FAQ accordion
  $$('.faq-q').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const item = btn.closest('.faq-item');
      const open = item.classList.contains('open');
      // close others
      $$('.faq-item.open').forEach(x=> x.classList.remove('open'));
      if(!open) item.classList.add('open');
    });
  });

  // Smooth scroll for nav links
  $$('.nav a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if(!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
})();
