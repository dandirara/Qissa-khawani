"use client";

import { useEffect, useState } from "react";

type Lang = "en" | "ur";
type Dish = { name: string; desc: string; price: string; tag?: string; image: string };
const WA = "https://wa.me/923001413618";
const phone = "tel:+923001413618"; // Main contact supplied for the demo; confirm WhatsApp before launch.
const branchPhones = ["tel:+923001413618", "tel:+923001413616", "tel:+923281413617"];
const branchPhoneLabels = ["0300-1413618", "0300-1413616", "0328-1413617"];
const branchAltPhones = ["tel:+924235301600", "tel:+923041413616", ""];
const branchAltPhoneLabels = ["042-35301600", "0304-1413616", ""];
const branchTimings = ["Call to confirm", "5:00 PM – 1:00 AM (reported)", "Call to confirm"];
const foodpandaLinks = [
  "https://www.foodpanda.pk/restaurant/f310/qissa-khawani-f310",
  "https://www.foodpanda.pk/restaurant/tmun/qissa-khawani-restaurant",
  "https://www.foodpanda.pk/restaurant/r6i7/qissa-khawani-and-zen-garden"
];
const directions = [
  "https://www.google.com/maps/search/?api=1&query=448+G3+Johar+Town+Qissa+Khawani+Lahore",
  "https://www.google.com/maps/search/?api=1&query=LGSM+Complex+Bedian+Road+RA+Bazar+Lahore",
  "https://www.google.com/maps/search/?api=1&query=155+Parkview+CHS+Barki+Road+opposite+Paragon+Gate+2+Lahore"
];
const googleReviews = [
  "https://www.google.com/maps/search/Qissa+Khawani+Johar+Town+Lahore",
  "https://www.google.com/maps/search/Qissa+Khawani+Bedian+Road+Lahore",
  "https://www.google.com/maps/search/Qissa+Khawani+Barki+Road+Lahore"
];
const socials = {
  facebookJohar: "https://www.facebook.com/qissakhawanijt/",
  facebookMain: "https://www.facebook.com/QissaKhawaniRestaurant/",
  instagram: "https://www.instagram.com/qissakhawanirestaurant/"
};

const img = {
  hero: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2200&q=88",
  bbq: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=85",
  karahi: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85",
  biryani: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=85",
  naan: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
  dining: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1100&q=85",
  feast: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85",
  chai: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=85",
  rice: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85",
  grill: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=85"
};

const copy = {
  en: {
    navStory: "Our story", navMenu: "The menu", navGallery: "Gallery", navBranches: "Find us", order: "Order now",
    heroLabel: "A LAHORE FOOD STORY", heroLine1: "Har luqma", heroAccent: "ek qissa",
    heroText: "A table set for stories, slow-cooked traditions, and the flavours that bring us together.",
    explore: "Explore the menu", ourStory: "Our story", rating: "A Lahore favourite · Come hungry, leave with a story",
    storyEyebrow: "THE HEART OF OUR TABLE", storyTitle: "Har dish ek qissa",
    storyBody: "Qissa Khawani ka matlab hai woh jagah jahan log baith kar kahaniyan sunte hain. Hum ne wahi soch rakhi — dastarkhwan par sirf khana nahi rakhte, ek kahani rakhte hain.",
    storyBody2: "The name evokes Peshawar’s historic Qissa Khwani Bazaar — a place remembered for stories, travellers and shared gatherings. Our visual story celebrates that spirit through generous Pakistani BBQ, karahi and a dastarkhwan made for good company.",
    quote: "“Some stories are told in words. Ours are served warm.”",
    signatureEyebrow: "FROM OUR FIRE & HANDI", signatureTitle: "Qissa-e-khaas", signatureSub: "A few favourites with a story of their own.",
    menuEyebrow: "MADE TO BE SHARED", menuTitle: "The dastarkhwan",
    galleryEyebrow: "A PLACE AT OUR TABLE", galleryTitle: "The Qissa, in moments",
    branchesEyebrow: "THREE PLACES, ONE STORY", branchesTitle: "Come find your Qissa",
    call: "Call", directions: "Directions", reviewsEyebrow: "CHECK THE ORIGINAL FEEDBACK", reviewsTitle: "Reviews by branch",
    orderEyebrow: "YOUR TABLE IS WAITING", orderTitle: "Aaj kya qissa ho?", orderText: "Gather your people. We’ll take care of the food.",
    whatsapp: "WhatsApp us", callUs: "Call the restaurant", foodpanda: "Find us on Foodpanda",
    timings: "OPEN DAILY", timingText: "Please call your preferred branch to confirm today’s timings.",
    addressLabel: "LAHORE, PAKISTAN", footerLine: "A tale of taste.", footerNote: "Made for good food and longer conversations.",
    tabs: ["Har Dil Aziz", "Tawa Ki Aanch", "Tandoor Ki Tapash Sy Tapti O Tazi", "Bar BQ Platter", "Kabab", "Lawazmaat"],
    viewMenu: "View full menu", halal: "HALAL", hot: "HOUSE FAVOURITE",
    dishes: [
      { name: "Namkeen Dumba Karahi", desc: "A Peshawari-style favourite to ask the branch about.", price: "Ask branch for price", tag: "SIGNATURE CANDIDATE", image: img.karahi },
      { name: "Achari Chicken Karahi", desc: "A tangy karahi favourite listed for the signature shortlist.", price: "Ask branch for price", tag: "SIGNATURE CANDIDATE", image: img.karahi },
      { name: "Malai Boti", desc: "A creamy BBQ favourite from the popular-dish shortlist.", price: "Ask branch for price", tag: "POPULAR", image: img.bbq },
      { name: "Haryali Boti", desc: "A herb-forward BBQ favourite from the shortlist.", price: "Ask branch for price", tag: "SIGNATURE CANDIDATE", image: img.grill },
      { name: "Chicken Sajji", desc: "A popular item to explore on the current branch menu.", price: "Ask branch for price", tag: "POPULAR", image: img.feast },
      { name: "BBQ Platter", desc: "Made for sharing; confirm platter options with the branch.", price: "Ask branch for price", tag: "POPULAR", image: img.bbq }
    ],
    branchNames: ["Johar Town", "Bedian Road · Cantt", "Barki Road · Paragon"],
    branchAddresses: ["448-G3, Johar Town, Lahore", "LGSM Complex, Bedian Road, near RA Bazar, Lahore Cantt", "155 Parkview CHS, Barki Road, opposite Paragon Gate 2, Lahore"],
    menuItems: {
      popular: [["Chicken Tikka", "Confirm current price"], ["Chicken Sajji", "Confirm current price"], ["Grilled Fish", "Confirm current price"]],
      tawa: [["Brain Masala", "Confirm current price"], ["Taka Tak", "Confirm current price"]],
      tandoor: [["Chicken Tikka", "Confirm current price"], ["Malai Tikka / Malai Boti", "Confirm current price"]],
      platter: [["BBQ Platter", "Confirm current price"], ["Mixed BBQ Platter", "Confirm current price"]],
      kabab: [["Beef Kabab Masala", "Confirm current price"], ["Seekh Kabab", "Confirm current price"]],
      sides: [["Lawazmaat / Sides", "Ask branch for current options"], ["Raita", "Confirm current price"], ["Roghni Naan", "Confirm current price"]]
    } as Record<string, string[][]>
  },
  ur: {
    navStory: "ہماری کہانی", navMenu: "مینو", navGallery: "تصاویر", navBranches: "ہم تک آئیں", order: "آرڈر کریں",
    heroLabel: "لاہور کے ذائقے کی کہانی", heroLine1: "ہر لقمہ", heroAccent: "ایک قصہ",
    heroText: "ایسا دسترخوان جہاں روایت، ذائقہ اور اپنوں کی محفل ایک ساتھ ملیں۔",
    explore: "مینو دیکھیے", ourStory: "ہماری کہانی", rating: "لاہور کا ذائقہ · آئیے، مل بیٹھتے ہیں",
    storyEyebrow: "ہمارے دسترخوان کا دل", storyTitle: "ہر ڈش ایک قصہ",
    storyBody: "قصہ خوانی کا مطلب ہے وہ جگہ جہاں لوگ بیٹھ کر کہانیاں سنتے ہیں۔ ہم نے وہی سوچ رکھی — دسترخوان پر صرف کھانا نہیں رکھتے، ایک کہانی رکھتے ہیں۔",
    storyBody2: "قصہ خوانی کا نام پشاور کے تاریخی قصہ خوانی بازار کی یاد دلاتا ہے، جہاں کہانیاں، مسافر اور محفلیں اس روایت کا حصہ رہے ہیں۔ ہماری بصری کہانی اسی جذبے کو پاکستانی باربی کیو، کڑاہی اور مل بیٹھ کر کھانے کے دسترخوان کے ذریعے پیش کرتی ہے۔",
    quote: "“کچھ کہانیاں لفظوں میں نہیں، گرم کھانوں میں پیش کی جاتی ہیں۔”",
    signatureEyebrow: "ہمارے توے اور آنچ سے", signatureTitle: "قصۂ خاص", signatureSub: "چند پسندیدہ ذائقے، اپنی الگ کہانی کے ساتھ۔",
    menuEyebrow: "سب کے ساتھ بانٹنے کے لیے", menuTitle: "دسترخوان",
    galleryEyebrow: "آپ کے لیے ہماری محفل", galleryTitle: "یادوں میں ایک قصہ",
    branchesEyebrow: "تین پتے، ایک کہانی", branchesTitle: "اپنا قصہ تلاش کریں",
    call: "کال کریں", directions: "راستہ", reviewsEyebrow: "اصل رائے دیکھیے", reviewsTitle: "برانچ کے حساب سے ریویوز",
    orderEyebrow: "آپ کا دسترخوان منتظر ہے", orderTitle: "آج کیا قصہ ہو؟", orderText: "اپنے لوگوں کو جمع کریں، کھانے کی فکر ہم پر چھوڑ دیں۔",
    whatsapp: "واٹس ایپ کریں", callUs: "ریسٹورنٹ کو کال کریں", foodpanda: "فوڈ پانڈا پر تلاش کریں",
    timings: "روزانہ کھلا", timingText: "آج کے اوقات کی تصدیق کے لیے اپنی پسندیدہ برانچ پر کال کریں۔",
    addressLabel: "لاہور، پاکستان", footerLine: "ذائقے کی ایک کہانی۔", footerNote: "اچھے کھانے اور لمبی محفلوں کے لیے۔",
    tabs: ["ہر دل عزیز", "توے کی آنچ", "تندور کی تپش سے تپتی و تازہ", "بار بی کیو پلیٹر", "کباب", "لوازمات"],
    viewMenu: "مکمل مینو", halal: "حلال", hot: "خاص پسند",
    dishes: [
      { name: "نمکین دنبہ کڑاہی", desc: "پشاوری انداز کی پسندیدہ ڈش؛ قیمت برانچ سے معلوم کریں۔", price: "برانچ سے قیمت معلوم کریں", tag: "خاص ڈش", image: img.karahi },
      { name: "اچاری چکن کڑاہی", desc: "کھٹی چٹ پٹی کڑاہی؛ موجودہ مینو کی تصدیق کریں۔", price: "برانچ سے قیمت معلوم کریں", tag: "خاص ڈش", image: img.karahi },
      { name: "ملائی بوٹی", desc: "مشہور باربی کیو پسند۔", price: "برانچ سے قیمت معلوم کریں", tag: "مقبول", image: img.bbq },
      { name: "ہریالی بوٹی", desc: "ہری جڑی بوٹیوں کے ذائقے والی باربی کیو ڈش۔", price: "برانچ سے قیمت معلوم کریں", tag: "خاص ڈش", image: img.grill },
      { name: "چکن سجّی", desc: "برانچ کے موجودہ مینو میں دستیابی معلوم کریں۔", price: "برانچ سے قیمت معلوم کریں", tag: "مقبول", image: img.feast },
      { name: "باربی کیو پلیٹر", desc: "مل بانٹ کر کھانے کے لیے؛ پلیٹر کی اقسام معلوم کریں۔", price: "برانچ سے قیمت معلوم کریں", tag: "مقبول", image: img.bbq }
    ],
    branchNames: ["جوہر ٹاؤن", "بیدیاں روڈ · کینٹ", "برکی روڈ · پیراگون"],
    branchAddresses: ["448-G3، جوہر ٹاؤن، لاہور", "ایل جی ایس ایم کمپلیکس، بیدیاں روڈ، آر اے بازار کے قریب، لاہور کینٹ", "155 پارک ویو سی ایچ ایس، برکی روڈ، پیراگون گیٹ 2 کے سامنے، لاہور"],
    menuItems: {
      popular: [["چکن تکہ", "موجودہ قیمت معلوم کریں"], ["چکن سجّی", "موجودہ قیمت معلوم کریں"], ["گرلڈ فش", "موجودہ قیمت معلوم کریں"]],
      tawa: [["مغز مصالحہ", "موجودہ قیمت معلوم کریں"], ["ٹکا ٹک", "موجودہ قیمت معلوم کریں"]],
      tandoor: [["چکن تکہ", "موجودہ قیمت معلوم کریں"], ["ملائی تکہ / ملائی بوٹی", "موجودہ قیمت معلوم کریں"]],
      platter: [["باربی کیو پلیٹر", "موجودہ قیمت معلوم کریں"], ["مکس باربی کیو پلیٹر", "موجودہ قیمت معلوم کریں"]],
      kabab: [["بیف کباب مصالحہ", "موجودہ قیمت معلوم کریں"], ["سیخ کباب", "موجودہ قیمت معلوم کریں"]],
      sides: [["لوازمات", "برانچ سے موجودہ اشیا پوچھیں"], ["رائتہ", "موجودہ قیمت معلوم کریں"], ["روغنی نان", "موجودہ قیمت معلوم کریں"]]
    } as Record<string, string[][]>
  }
};

const tabKeys = ["popular", "tawa", "tandoor", "platter", "kabab", "sides"];
const marquee = ["DUM BIRYANI", "LAHORI KARAHI", "SEEKH KEBAB", "FRESH TANDOOR", "KASHMIRI CHAI", "A TALE OF TASTE"];

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeTab, setActiveTab] = useState("popular");
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = copy[lang];
  const isUrdu = lang === "ur";

  useEffect(() => {
    document.documentElement.lang = isUrdu ? "ur" : "en";
    document.documentElement.dir = isUrdu ? "rtl" : "ltr";
  }, [isUrdu]);

  const tabName = (_key: string, i: number) => t.tabs[i];

  return <main className={isUrdu ? "site urdu" : "site"}>
    <nav className="nav">
      <a className="brand" href="#top" aria-label="Qissa Khawani home">
        <span className="brand-name">Qissa Khawani</span><span className="brand-sub">A tale of taste</span>
      </a>
      <div className={`nav-links ${mobileOpen ? "open" : ""}`}>
        <a href="#story" onClick={() => setMobileOpen(false)}>{t.navStory}</a>
        <a href="#menu" onClick={() => setMobileOpen(false)}>{t.navMenu}</a>
        <a href="#gallery" onClick={() => setMobileOpen(false)}>{t.navGallery}</a>
        <a href="#branches" onClick={() => setMobileOpen(false)}>{t.navBranches}</a>
      </div>
      <div className="nav-actions">
        <button className="lang-toggle" onClick={() => setLang(isUrdu ? "en" : "ur")}>{isUrdu ? "EN" : "اردو"}</button>
        <a className="btn btn-gold nav-order" href={WA} target="_blank" rel="noreferrer">{t.order} <span>↗</span></a>
        <button className="mobile-menu" aria-label="Toggle navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? "×" : "☰"}</button>
      </div>
    </nav>

    <section className="hero" id="top">
      <div className="hero-bg" style={{ backgroundImage: `url("${img.hero}")` }} />
      <div className="hero-overlay" />
      <div className="hero-content reveal">
        <p className="eyebrow gold-text">{t.heroLabel}</p>
        <h1>{t.heroLine1}<br /><em>{t.heroAccent}</em></h1>
        <div className="diamond">◆</div>
        <p className="hero-copy">{t.heroText}</p>
        <div className="hero-buttons">
          <a className="btn btn-gold" href="#menu">{t.explore} <span>↗</span></a>
          <a className="btn btn-outline-light" href="#story">{t.ourStory}</a>
        </div>
        <p className="hero-rating"><span>✦</span> {t.rating}</p>
      </div>
      <div className="hero-bottom-line"><span>LAHORE · PAKISTAN</span><span>EST. IN THE SPIRIT OF STORYTELLING</span></div>
    </section>

    <section className="image-trio" aria-label="A glimpse of Qissa Khawani food">
      <div className="trio-card trio-left arch"><img src={img.bbq} alt="Temporary BBQ photography placeholder; replace with Qissa Khawani original photo" /></div>
      <div className="trio-card trio-center arch"><img src={img.feast} alt="Temporary food photography placeholder; replace with Qissa Khawani original photo" /></div>
      <div className="trio-card trio-right arch"><img src={img.karahi} alt="Temporary karahi photography placeholder; replace with Qissa Khawani original photo" /></div>
    </section>

    <div className="marquee-band" aria-label="Signature flavours"><div className="marquee-track">{[...marquee, ...marquee].map((item, i) => <span key={i}>{item} <b>◆</b></span>)}</div></div>

    <section className="story section-wrap" id="story">
      <div className="story-image arch reveal"><img src={img.dining} alt="Temporary restaurant interior photography placeholder; replace with Qissa Khawani original photo" /><div className="image-stamp">QK <span>A TALE OF TASTE</span></div></div>
      <div className="story-copy reveal">
        <p className="eyebrow">{t.storyEyebrow}</p>
        <h2>{t.storyTitle}</h2>
        <p className="lead">{t.storyBody}</p>
        <p>{t.storyBody2}</p>
        <blockquote>{t.quote}</blockquote>
        <a className="text-link" href="#branches">{t.navBranches} <span>↗</span></a>
      </div>
    </section>

    <section className="signature section-wrap" id="signature">
      <div className="section-heading light-heading reveal">
        <p className="eyebrow gold-text">{t.signatureEyebrow}</p><h2>{t.signatureTitle}</h2><p>{t.signatureSub}</p>
      </div>
      <div className="dish-grid">
        {t.dishes.map((dish: Dish, i: number) => <article className="dish-card reveal" key={dish.name}>
          <div className="dish-image"><img src={dish.image} alt={`${dish.name} — temporary photography placeholder, replace with Qissa Khawani original photo`} />
            {dish.tag && <span className="dish-tag">{dish.tag}</span>}
            
          </div>
          <div className="dish-info"><h3>{dish.name}</h3><p>{dish.desc}</p><div className="dish-price"><span>{dish.price}</span><a href={`${WA}?text=${encodeURIComponent("Assalam o alaikum, I'd like to ask about " + dish.name)}`} aria-label={`Ask about ${dish.name}`}>↗</a></div></div>
        </article>)}
      </div>
    </section>

    <section className="menu-section section-wrap" id="menu">
      <div className="section-heading reveal"><p className="eyebrow">{t.menuEyebrow}</p><h2>{t.menuTitle}</h2><p>Prepared with patience. Shared with love.</p></div>
      <div className="menu-tabs" role="tablist" aria-label="Menu categories">
        {tabKeys.map((key, i) => <button key={key} role="tab" aria-selected={activeTab === key} className={activeTab === key ? "menu-tab active" : "menu-tab"} onClick={() => setActiveTab(key)}>{tabName(key, i)}</button>)}
      </div>
      <div className="menu-list" role="tabpanel">
        {(t.menuItems[activeTab] ?? t.menuItems[tabKeys[0]] ?? []).map(([name, price]) => <div className="menu-row" key={name}><span className="menu-item-name">{name}</span><span className="menu-dots" /><span className="menu-price">{price}</span></div>)}
      </div>
      <p className="menu-note">Menu preview only. Final item list and prices must be confirmed with each branch; online delivery prices can differ from dine-in prices.</p>
      <a className="btn btn-maroon" href={WA} target="_blank" rel="noreferrer">{t.viewMenu} <span>↗</span></a>
    </section>

    <section className="gallery section-wrap" id="gallery">
      <div className="section-heading reveal"><p className="eyebrow">{t.galleryEyebrow}</p><h2>{t.galleryTitle}</h2><p>Temporary visual placeholders — replace these with the restaurant’s own photos before publishing.</p></div>
      <div className="gallery-grid">
        <div className="gallery-item g1 arch reveal"><img src={img.bbq} alt="Temporary BBQ photography placeholder; replace with Qissa Khawani original photo" /><span>01 / FROM THE FIRE</span></div>
        <div className="gallery-item g2 arch reveal"><img src={img.rice} alt="Temporary rice dish photography placeholder; replace with Qissa Khawani original photo" /><span>02 / SLOW & FRAGRANT</span></div>
        <div className="gallery-item g3 arch reveal"><img src={img.karahi} alt="Temporary karahi photography placeholder; replace with Qissa Khawani original photo" /><span>03 / THE HANDI</span></div>
        <div className="gallery-item g4 arch reveal"><img src={img.chai} alt="Temporary chai photography placeholder; replace with Qissa Khawani original photo" /><span>04 / ONE LAST CUP</span></div>
        <div className="gallery-item g5 arch reveal"><img src={img.naan} alt="Temporary tandoor photography placeholder; replace with Qissa Khawani original photo" /><span>05 / FRESH FROM TANDOOR</span></div>
      </div>
    </section>

    <section className="branches section-wrap" id="branches">
      <div className="section-heading reveal"><p className="eyebrow">{t.branchesEyebrow}</p><h2>{t.branchesTitle}</h2></div>
      <div className="branch-grid">
        {t.branchNames.map((name, i) => <article className="branch-card reveal" key={name}>
          <div className="branch-number">0{i + 1} <span>◆</span></div><h3>{name}</h3><p>{t.branchAddresses[i]}</p>
          <p className="branch-phone"><a href={branchPhones[i]}>{branchPhoneLabels[i]}</a>{branchAltPhones[i] && <> <span aria-hidden="true">·</span> <a href={branchAltPhones[i]}>{branchAltPhoneLabels[i]}</a></>}</p>
          <p className="branch-hours"><strong>Hours:</strong> {branchTimings[i]}</p>
          <div className="branch-actions"><a className="btn btn-maroon small" href={branchPhones[i]}>{t.call}</a><a className="btn btn-outline-dark small" href={directions[i]} target="_blank" rel="noreferrer">{t.directions} ↗</a><a className="btn btn-outline-dark small" href={foodpandaLinks[i]} target="_blank" rel="noreferrer">Foodpanda ↗</a></div>
        </article>)}
      </div>
    </section>

    <section className="reviews section-wrap">
      <div className="section-heading reveal"><p className="eyebrow">{t.reviewsEyebrow}</p><h2>{t.reviewsTitle}</h2><p>Read guest feedback on Google. Ratings and review counts should be checked live before launch.</p></div>
      <div className="review-grid">
        {t.branchNames.map((name, i) => <article className="review-card reveal" key={name}>
          <h3 className="review-branch-name">{name}</h3><div className="review-rule">◆</div>
          <p><a className="review-link" href={googleReviews[i]} target="_blank" rel="noreferrer">READ GOOGLE REVIEWS ↗</a></p>
        </article>)}
      </div>
      <p className="review-disclaimer">No customer quotes or exact Google ratings are shown here until they are verified against the original listings.</p>
    </section>

    <section className="buffet-band">
      <p className="eyebrow gold-text">FOR GROUPS & GATHERINGS</p>
      <h2>Make room for a bigger qissa.</h2>
      <p>Buffet is reported to be available by special booking. Contact the restaurant to confirm availability, group size, menu and rates.</p>
      <a className="btn btn-gold" href={`${WA}?text=${encodeURIComponent("Assalam o alaikum, I would like to ask about buffet / group booking.")}`} target="_blank" rel="noreferrer">Ask about buffet booking ↗</a>
    </section>

    <section className="order-band">
      <div className="order-glow" />
      <div className="order-content reveal"><p className="eyebrow gold-text">{t.orderEyebrow}</p><h2>{t.orderTitle}</h2><p>{t.orderText}</p>
        <div className="order-actions"><a className="btn btn-gold" href={WA} target="_blank" rel="noreferrer">{t.whatsapp} ↗</a><a className="btn btn-outline-light" href={phone}>{t.callUs}</a><a className="foodpanda-link" href="https://www.foodpanda.pk/" target="_blank" rel="noreferrer">{t.foodpanda} ↗</a></div>
      </div>
    </section>

    <footer className="footer">
      <div className="footer-top"><a className="brand footer-brand" href="#top"><span className="brand-name">Qissa Khawani</span><span className="brand-sub">A tale of taste</span></a><p>{t.footerNote}</p><a className="back-top" href="#top">BACK TO TOP ↑</a></div>
      <div className="footer-grid">
        <div><p className="footer-label">{t.addressLabel}</p>{t.branchNames.map((name, i) => <p className="footer-address" key={name}><strong>{name}</strong><br />{t.branchAddresses[i]}</p>)}</div>
        <div><p className="footer-label">{t.timings}</p><p>Bedian Road: 5:00 PM – 1:00 AM (reported)</p><p>Johar Town & Barki Road: please confirm directly.</p><a href={phone}>0300-1413618</a><p><a href="mailto:qissakhawanir@gmail.com">qissakhawanir@gmail.com</a></p><p><a href={WA} target="_blank" rel="noreferrer">WhatsApp ↗ (number to confirm)</a></p></div>
        <div><p className="footer-label">FOLLOW THE QISSA</p><p><a href={socials.instagram} target="_blank" rel="noreferrer">Instagram ↗</a></p><p><a href={socials.facebookMain} target="_blank" rel="noreferrer">Facebook main page ↗</a></p><p><a href={socials.facebookJohar} target="_blank" rel="noreferrer">Johar Town Facebook ↗</a></p><p><a href="#menu">Explore menu</a></p></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Qissa Khawani. All rights reserved.</span><span>{t.footerLine}</span><span>LAHORE, PAKISTAN</span></div>
    </footer>
    <a className="whatsapp-fab" href={WA} target="_blank" rel="noreferrer" aria-label="Chat with Qissa Khawani on WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.1 3.1A12.7 12.7 0 0 0 5.2 22.4L3.5 28.7l6.5-1.7A12.8 12.8 0 1 0 16.1 3.1Zm0 22.9a10.2 10.2 0 0 1-5.2-1.4l-.4-.2-3.8 1 1-3.7-.3-.4a10.1 10.1 0 1 1 8.7 4.7Zm5.6-7.6c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.3 8.3 0 0 1-2.5-1.5 9.3 9.3 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.4.3-.6s0-.4 0-.6-.7-1.7-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.8 1.2 3.2 1.4 3.4 2.4 3.7 5.9 5.1c.8.3 1.4.5 1.9.6.8.2 1.5.2 2 .1.6-.1 1.9-.8 2.2-1.6s.3-1.5.2-1.6-.3-.2-.6-.4Z" fill="currentColor"/></svg></a>
  </main>;
}
