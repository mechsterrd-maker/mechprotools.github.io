// MechProTools — Shared JS
// Mobile menu toggle
document.addEventListener('DOMContentLoaded',()=>{
  const burger=document.getElementById('navBurger');
  const menu=document.getElementById('mobileMenu');
  if(burger&&menu){
    burger.addEventListener('click',()=>menu.classList.toggle('open'));
    document.addEventListener('click',e=>{if(!burger.contains(e.target)&&!menu.contains(e.target))menu.classList.remove('open');});
  }
  // Active nav link
  const path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a=>{
    const href=a.getAttribute('href');
    if(href===path||(path===''&&href==='index.html')||(path==='index.html'&&href==='index.html'))a.classList.add('active');
  });

  // Scroll reveal — animate elements as they enter viewport
  const revealEls=document.querySelectorAll('.reveal,.feature-card,.tool-card,.blog-card,.calc-main,.gdt-card');
  if(revealEls.length){
    const obs=new IntersectionObserver((entries)=>{
      entries.forEach((entry,i)=>{
        if(entry.isIntersecting){
          setTimeout(()=>{
            entry.target.style.opacity='1';
            entry.target.style.transform='translateY(0)';
          },i*60);
          obs.unobserve(entry.target);
        }
      });
    },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
    revealEls.forEach(el=>{
      el.style.opacity='0';
      el.style.transform='translateY(20px)';
      el.style.transition='all .5s cubic-bezier(.22,1,.36,1)';
      obs.observe(el);
    });
  }

  // Smooth counter animation for stats
  document.querySelectorAll('.stat .num').forEach(el=>{
    const val=el.textContent;if(isNaN(val))return;
    const target=parseInt(val);let cur=0;
    const step=()=>{cur+=Math.ceil(target/30);if(cur>=target){el.textContent=val;return;}
    el.textContent=cur;requestAnimationFrame(step);};step();
  });
});

/*
  Google AdSense Integration
  ============================================================
  To enable real ads, replace 'ca-pub-XXXXXXXXXXXXXXXX' with your actual
  AdSense publisher ID. Then uncomment the script tag in the HTML <head>.

  Steps to get AdSense:
  1. Go to https://www.google.com/adsense
  2. Sign up with your Google account
  3. Add your site URL (engiview-3d-viewer.netlify.app)
  4. You need some content + traffic first (Google reviews your site)
  5. Once approved, you get a publisher ID (ca-pub-XXXXX)
  6. Replace all instances below and in HTML files
  7. Ad slots will auto-fill with real ads

  For now, placeholder divs show where ads will appear.
*/

// AdSense config (replace with your real ID when approved)
window.ADSENSE_PUB_ID = 'ca-pub-XXXXXXXXXXXXXXXX';

// Initialize ad slots (will work once real AdSense is connected)
function initAds() {
  try {
    if (window.adsbygoogle) {
      document.querySelectorAll('.adsbygoogle').forEach(() => {
        (adsbygoogle = window.adsbygoogle || []).push({});
      });
    }
  } catch(e) {}
}

// Call after page load
if (document.readyState === 'complete') initAds();
else window.addEventListener('load', initAds);
