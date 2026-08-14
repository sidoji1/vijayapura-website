import React, { useEffect,useState } from "react";

type Landmark = {
  name: string;
  kannada: string;
  description: string;
  image: string;
  number: string;
  tag: string;
};

const landmarks: Landmark[] = [
  {
    number: "01",
    tag: "THE ONE EVERYONE KNOWS",
    name: "Gol Gumbaz",
    kannada: "ಗೋಲ್ ಗುಂಬಜ್",
    description:
      "The shape that lives in every Vijayapura memory. You don't need directions to know you're home.",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Gol_Gumbaz_Vijayapur_Karnataka.webp",
  },
  {
    number: "02",
    tag: "QUIET BEAUTY",
    name: "Ibrahim Rauza",
    kannada: "ಇಬ್ರಾಹಿಂ ರೌಝಾ",
    description:
      "Quiet courtyards, carved stone and a kind of beauty that makes you slow down.",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ibrahim_Rauza%2C_Bijapur%2C_Karnataka.jpg",
  },
  {
    number: "03",
    tag: "THE UNFINISHED ONE",
    name: "Bara Kaman",
    kannada: "ಬಾರಾ ಕಮಾನ್",
    description:
      "Half finished, completely unforgettable. One of those places Vijayapura people simply know.",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Bara_Kaman_Vijaypura.jpg",
  },
];

const foods = [
  {
    number: "01",
    tag: "THE NORTH KARNATAKA TABLE",
    name: "Jolada Rotti",
    kannada: "ಜೋಳದ ರೊಟ್ಟಿ",
    description:
      "Hot jolada rotti, ennegayi, shenga chutney and whatever else is waiting on the plate. This is where the meal begins.",
    image:
      "https://smithakalluraya.com/wp-content/uploads/2014/06/image.1024x1024-62.jpg",
  },
  {
    number: "02",
    tag: "THE ONE THAT GOES WITH EVERYTHING",
    name: "Ennegayi",
    kannada: "ಎಣ್ಣೆಗಾಯಿ",
    description:
      "Tender brinjal filled with peanut masala. Spicy, smoky and impossible to leave behind.",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Stuffed_Brinjal.jpg",
  },
  {
    number: "03",
    tag: "EVERY TABLE HAS IT",
    name: "Shenga Chutney",
    kannada: "ಶೇಂಗಾ ಚಟ್ನಿ",
    description:
      "Roasted groundnuts, spice and that unmistakable North Karnataka taste. A little on the side is never enough.",
    image:
      "https://i0.wp.com/chitrasfoodbook.com/wp-content/uploads/2018/02/Shenga-pudi-2.jpg?ssl=1",
  },
  {
    number: "04",
    tag: "EVENING IN NORTH KARNATAKA",
    name: "Girmit",
    kannada: "ಗಿರ್ಮಿಟ್",
    description:
      "Puffed rice, onion, masala and crunch. The kind of snack that somehow disappears before you notice.",
    image:
      "https://i0.wp.com/blendofspicesbysara.com/wp-content/uploads/2019/11/screenshot_20191106-113050.png?fit=760%2C419&ssl=1",
  },
  {
    number: "05",
    tag: "EVENING TEA TIME",
    name: "Mirchi Bajji",
    kannada: "ಮೆಣಸಿನಕಾಯಿ ಬಜ್ಜಿ",
    description:
      "Crispy outside, hot inside and best eaten while the evening slowly takes over the city.",
    image:
      "https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2018/02/stuffed-mirchi-bajji-recipe.jpg",
  },
];
const busStops = [
  {
    city: "Bengaluru",
    kannada: "ಬೆಂಗಳೂರು",
    line: "A long road. A little homesick.",
  },
  {
    city: "Hubballi",
    kannada: "ಹುಬ್ಬಳ್ಳಿ",
    line: "Close enough to feel familiar.",
  },
  {
    city: "Bagalkot",
    kannada: "ಬಾಗಲಕೋಟೆ",
    line: "North Karnataka, always.",
  },
];

export default function App() {
  const [selectedLandmark, setSelectedLandmark] = useState(landmarks[0]);
  const [selectedFood, setSelectedFood] = useState(foods[0]);
  const [selectedStreet, setSelectedStreet] = useState(0);
  const [selectedStory, setSelectedStory] = useState(0);
  const [selectedStop, setSelectedStop] = useState(busStops[0]);
  const [selectedMemory, setSelectedMemory] = useState(0);
  const [comparisonPosition, setComparisonPosition] = useState(50);
  const [nightMode, setNightMode] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const closeMenu = () => setMobileMenu(false);
  const memories = [
  {
    number: "01",
    title: "Autos at the corner",
    kannada: "ಮೂಲೆಲಿ ಆಟೋ ನಿಂತಿರುತ್ತೆ",
    text: "One is always waiting. Someone is always bargaining. Somehow, you always find your way home.",
  },
  {
    number: "02",
    title: "The old market",
    kannada: "ಹಳೆಯ ಬಜಾರ್",
    text: "Faded boards. Familiar shops. The same streets you have walked a hundred times without ever needing a map.",
  },
  {
    number: "03",
    title: "Bus ride home",
    kannada: "ಮನೆಗೆ ಹೋಗೋ ಬಸ್",
    text: "The window seat. Hot afternoon air. And that small feeling that home is getting closer with every stop.",
  },
  {
    number: "04",
    title: "Tea somewhere",
    kannada: "ಎಲ್ಲಾದ್ರೂ ಒಂದು ಚಹಾ",
    text: "No plan. Just tea, conversation and another half hour that wasn't supposed to happen.",
  },
];

const activeMemory = memories[selectedMemory];

useEffect(() => {
  const elements = document.querySelectorAll(".reveal-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  elements.forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}, []);

  return (
    <div
      className={`min-h-screen overflow-x-hidden font-sans transition-colors duration-1000 ${
        nightMode ? "bg-[#151b24] text-[#e7e2d8]" : "bg-[#d8d2c6] text-[#202a36]"
      }`}
    >
      {/* TOP BAR */}
      <div className="bg-[#151b24] px-3 py-2 text-center text-[8px] font-bold tracking-[0.18em] text-[#b59a62] sm:text-[10px] sm:tracking-[0.25em] md:text-xs">
        VIJAYAPURA • BIJAPUR • NAMMA OORU • NORTH KARNATAKA
      </div>

      {/* NAVBAR */}
      <nav
        className={`sticky top-0 z-50 border-b border-[#202a36]/10 backdrop-blur-md ${
          nightMode
            ? "bg-[#151b24]/95 text-[#e7e2d8]"
            : "bg-[#d8d2c6]/95 text-[#202a36]"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#home" className="group" onClick={closeMenu}>
            <div
              className={`font-serif text-xl font-black tracking-tight md:text-2xl ${
                nightMode ? "text-[#e7e2d8]" : "text-[#4a4650]"
              }`}
            >
              ವಿಜಯಪುರ
            </div>

            <div
              className={`text-[7px] font-black tracking-[0.28em] sm:text-[8px] ${
                nightMode ? "text-[#9d9d98]" : "text-[#6b6b68]"
              }`}
            >
              VIJAYAPURA / BIJAPUR
            </div>
          </a>

          <div className="hidden items-center gap-7 text-xs font-bold uppercase tracking-widest md:flex">
            <a href="#landmarks" className="transition hover:text-[#596b78]">
              Landmarks
            </a>

            <a href="#food" className="transition hover:text-[#596b78]">
              Food
            </a>

            <a href="#streets" className="transition hover:text-[#596b78]">
              Streets
            </a>

            <a href="#stories" className="transition hover:text-[#596b78]">
              Stories
            </a>
          </div>

          <button
            onClick={() => setNightMode(!nightMode)}
            className="hidden rounded-full border border-[#202a36]/20 px-4 py-2 text-xs font-bold transition hover:bg-[#202a36] hover:text-[#e7e2d8] md:block"
          >
            {nightMode ? "☀ DAY" : "☾ EVENING"}
          </button>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setNightMode(!nightMode)}
              className="rounded-full border border-[#202a36]/20 px-3 py-2 text-[10px] font-bold"
            >
              {nightMode ? "☀" : "☾"}
            </button>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Toggle menu"
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#202a36]/20 transition ${
                mobileMenu ? "bg-[#202a36] text-[#e7e2d8]" : ""
              }`}
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block h-px w-4 transition ${
                    mobileMenu ? "translate-y-[3px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-4 transition ${
                    mobileMenu ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-px w-4 transition ${
                    mobileMenu ? "-translate-y-[3px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`overflow-hidden border-t border-[#202a36]/10 transition-all duration-500 md:hidden ${
            mobileMenu ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`px-5 pb-6 pt-3 ${
              nightMode ? "bg-[#151b24]" : "bg-[#d8d2c6]"
            }`}
          >
            <a
              href="#landmarks"
              onClick={closeMenu}
              className="block border-b border-[#202a36]/10 py-4 text-sm font-bold uppercase tracking-[0.2em]"
            >
              Landmarks
            </a>

            <a
              href="#food"
              onClick={closeMenu}
              className="block border-b border-[#202a36]/10 py-4 text-sm font-bold uppercase tracking-[0.2em]"
            >
              Food
            </a>

            <a
              href="#streets"
              onClick={closeMenu}
              className="block border-b border-[#202a36]/10 py-4 text-sm font-bold uppercase tracking-[0.2em]"
            >
              Streets
            </a>

            <a
              href="#stories"
              onClick={closeMenu}
              className="block py-4 text-sm font-bold uppercase tracking-[0.2em]"
            >
              Stories
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-[calc(100svh-70px)] overflow-hidden bg-[#151b24]"
      >
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Morning_view_of_Gol_Gumbaz%2C_Bijapur%2C_Karnataka%2C_India_%282018%29.jpg"
          alt="Gol Gumbaz Vijayapura"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#111720] via-[#1b2530]/80 to-[#202a36]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111720] via-transparent to-[#151b24]/30" />

        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.7) .7px, transparent .7px)",
            backgroundSize: "5px 5px",
          }}
        />

        <div className="relative mx-auto flex min-h-[calc(100svh-210px)] max-w-7xl items-end px-6 pb-14 pt-4 sm:pb-16 sm:pt-12 md:pb-24 md:pt-24">
          <div className="max-w-4xl text-[#e7e2d8]">
            <div className="mb-5 flex items-center gap-3 text-[9px] font-bold tracking-[0.22em] text-[#b59a62] sm:text-xs md:mb-7 md:text-sm">
              <span className="h-px w-8 bg-[#b59a62] sm:w-12" />
              EST. 1514 • NORTH KARNATAKA
            </div>

            <div className="font-serif text-[4rem] font-black leading-[0.88] tracking-[-0.05em] sm:text-7xl md:text-9xl">
              <span className="block">ವಿಜಯಪುರ</span>

              <span className="mt-3 block text-[#b59a62]">
                BIJAPUR.
              </span>
            </div>

            <p className="mt-6 max-w-xl font-serif text-lg italic leading-relaxed text-[#d4cec2] sm:text-xl md:mt-7 md:text-2xl">
              ಒಂದು ಊರು.
              <br />
              ಸಾವಿರ ಕಥೆಗಳು.
            </p>

            <p className="mt-4 max-w-xl text-[13px] leading-6 text-[#b8b5ae] sm:text-sm sm:leading-7 md:mt-5 md:text-base">
              A city of stone, heat, food, old streets and memories.
              <br />
              Not the Vijayapura from a brochure.
              <br />
              <strong className="text-[#c8b27d]">
                The Vijayapura that feels like home.
              </strong>
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 md:mt-9">
              <a
                href="#landmarks"
                className="rounded-full bg-[#b59a62] px-6 py-3.5 text-center text-xs font-black text-[#151b24] transition hover:-translate-y-1 hover:bg-[#c2ab78] sm:px-7 sm:py-4 sm:text-sm"
              >
                ENTER OLD VIJAYAPURA →
              </a>

              <a
                href="#food"
                className="rounded-full border border-[#d8d2c6]/40 px-6 py-3.5 text-center text-xs font-bold text-[#e7e2d8] transition hover:bg-[#e7e2d8] hover:text-[#202a36] sm:px-7 sm:py-4 sm:text-sm"
              >
                Show me the food
              </a>
            </div>
          </div>

          <div className="absolute right-7 top-16 hidden rotate-6 md:block">
            <div className="rounded-full border-2 border-[#b59a62]/50 p-3">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border border-[#b59a62]/30 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#c8b27d]">
                City
                <br />
                of
                <br />
                Stories
              </div>
            </div>
          </div>

          <div className="absolute bottom-7 right-7 hidden text-right text-[9px] uppercase tracking-[0.3em] text-[#d8d2c6]/50 md:block">
            SCROLL TO REMEMBER
            <br />
            ↓
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="border-b border-[#202a36]/10 bg-[#c7c0b2]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {[
            ["1514", "A CITY WITH HISTORY"],
            ["NORTH", "KARNATAKA"],
            ["HOT", "VERY HOT"],
            ["HOME", "NO EXPLANATION NEEDED"],
          ].map(([big, small]) => (
            <div
              key={small}
              className="border-r border-[#202a36]/10 px-4 py-6 last:border-r-0 sm:px-5 sm:py-8"
            >
              <div className="font-serif text-xl font-black text-[#3b4148] sm:text-2xl md:text-3xl">
                {big}
              </div>

              <div className="mt-2 text-[7px] font-black tracking-[0.13em] text-[#686b6a] sm:text-[9px] sm:tracking-[0.18em]">
                {small}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          LANDMARKS — UPGRADED
      ===================================================== */}
      <section
        id="landmarks"
        className="bg-[#e7e2d8] px-5 py-20 sm:py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:mb-16 md:grid-cols-[1.1fr_.9fr] md:items-end">
            <div>
              <div className="font-serif text-lg italic text-[#596b78]">
                ನಮ್ಮ ಜಾಗಗಳು
              </div>

              <h2 className="mt-2 font-serif text-5xl font-black leading-[0.9] text-[#202a36] sm:text-6xl md:text-8xl">
                NOT EVERY
                <br />
                MONUMENT
                <br />
                NEEDS A GUIDE.
              </h2>
            </div>

            <div className="md:pb-2 md:pl-8">
              <p className="max-w-md text-sm leading-7 text-[#687078]">
                Some places become tourist attractions.
                <br />
                Some places become part of how you explain where you're from.
              </p>

              <p className="mt-5 font-serif text-xl italic text-[#596b78]">
                Vijayapura has both.
              </p>
            </div>
          </div>

          {/* FEATURED LANDMARK */}
          <div className="grid gap-5 lg:grid-cols-[1.55fr_.45fr]">
            <div className="relative min-h-[480px] overflow-hidden bg-[#202a36] sm:min-h-[580px]">
              <img
                src={selectedLandmark.image}
                alt={selectedLandmark.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-1000"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#111720] via-[#111720]/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111720]/25 to-transparent" />

              <div className="absolute left-5 top-5 border border-[#e7e2d8]/30 px-3 py-2 text-[9px] font-bold tracking-[0.25em] text-[#e7e2d8]">
                {selectedLandmark.number}
              </div>

              <div className="absolute right-5 top-5 hidden border border-[#c8b27d]/40 px-3 py-2 text-[8px] font-bold tracking-[0.2em] text-[#c8b27d] sm:block">
                {selectedLandmark.tag}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
                <div className="text-[8px] font-black tracking-[0.25em] text-[#c8b27d] sm:text-[9px]">
                  {selectedLandmark.tag}
                </div>

                <h3 className="mt-3 font-serif text-4xl font-black text-[#e7e2d8] sm:text-5xl md:text-7xl">
                  {selectedLandmark.name}
                </h3>

                <div className="mt-1 font-serif text-xl italic text-[#c8b27d] sm:text-2xl">
                  {selectedLandmark.kannada}
                </div>

                <p className="mt-5 max-w-xl text-sm leading-7 text-[#d1cec7]">
                  {selectedLandmark.description}
                </p>
              </div>
            </div>

            {/* LANDMARK SELECTOR */}
            <div className="flex flex-col border border-[#202a36]/10 bg-[#ddd8ce]">
              <div className="border-b border-[#202a36]/10 px-5 py-4">
                <div className="text-[8px] font-black tracking-[0.25em] text-[#7a7d7c]">
                  CHOOSE A MEMORY
                </div>
              </div>

              <div className="flex flex-1 flex-col">
                {landmarks.map((place, index) => {
                  const active = selectedLandmark.name === place.name;

                  return (
                    <button
                      key={place.name}
                      onClick={() => setSelectedLandmark(place)}
                      className={`group flex flex-1 items-center gap-4 border-b border-[#202a36]/10 px-5 py-6 text-left transition last:border-b-0 ${
                        active
                          ? "bg-[#202a36] text-[#e7e2d8]"
                          : "bg-transparent text-[#303b45] hover:bg-[#d2ccc1]"
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] ${
                          active ? "text-[#c8b27d]" : "text-[#8a8984]"
                        }`}
                      >
                        {place.number}
                      </span>

                      <span className="flex-1">
                        <span className="block font-serif text-xl font-black sm:text-2xl">
                          {place.name}
                        </span>

                        <span
                          className={`mt-1 block font-serif text-sm italic ${
                            active ? "text-[#c8b27d]" : "text-[#777b7c]"
                          }`}
                        >
                          {place.kannada}
                        </span>
                      </span>

                      <span
                        className={`text-lg transition-transform duration-300 ${
                          active
                            ? "translate-x-0 text-[#c8b27d]"
                            : "-translate-x-1 opacity-40 group-hover:translate-x-0"
                        }`}
                      >
                        →
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MEMORY LINE */}
          <div className="mt-6 flex flex-col gap-4 border-y border-[#202a36]/10 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[8px] font-black tracking-[0.22em] text-[#7a7d7c]">
                CURRENTLY REMEMBERING
              </div>

              <div className="mt-1 font-serif text-xl font-bold text-[#303b45] sm:text-2xl">
                {selectedLandmark.name}
              </div>
            </div>

            <div className="flex items-center gap-3 text-[#9b978d]">
              <span className="h-px w-10 bg-[#b59a62]" />
              <span className="font-serif text-lg italic">
                ನಮ್ಮ ಊರು.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOD */}
<section
  id="food"
  className="bg-[#e7e2d8] px-5 py-20 sm:py-24 md:py-32"
>
  <div className="mx-auto max-w-7xl">

    {/* FOOD INTRO */}
    <div className="mb-12 grid gap-8 md:mb-16 md:grid-cols-[1.1fr_.9fr] md:items-end">
      <div>
        <div className="font-serif text-lg italic text-[#596b78]">
          ನಮ್ಮ ಊಟ
        </div>

        <h2 className="mt-2 font-serif text-5xl font-black leading-[0.9] text-[#202a36] sm:text-6xl md:text-8xl">
          NOT JUST
          <br />
          FOOD.
        </h2>
      </div>

      <div className="md:pb-2 md:pl-8">
        <p className="max-w-md text-sm leading-7 text-[#687078]">
          North Karnataka food doesn't need an introduction.
          <br />
          You know the smell before you see the plate.
        </p>

        <p className="mt-5 font-serif text-xl italic text-[#596b78]">
          ಊಟ ಆಯ್ತಾ?
        </p>
      </div>
    </div>

    {/* FEATURED FOOD */}
    <div className="grid gap-5 lg:grid-cols-[1.55fr_.45fr]">

      {/* LARGE IMAGE */}
      <div className="relative min-h-[480px] overflow-hidden bg-[#202a36] sm:min-h-[580px]">

        <img
          key={selectedFood.image}
          src={selectedFood.image}
          alt={selectedFood.name}
          className="absolute inset-0 h-full w-full object-cover transition duration-1000"
        />

        {/* DARK CINEMATIC OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111720] via-[#111720]/20 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#111720]/25 to-transparent" />

        {/* NUMBER */}
        <div className="absolute left-5 top-5 border border-[#e7e2d8]/30 px-3 py-2 text-[9px] font-bold tracking-[0.25em] text-[#e7e2d8]">
          {selectedFood.number}
        </div>

        {/* TAG */}
        <div className="absolute right-5 top-5 hidden border border-[#c8b27d]/40 px-3 py-2 text-[8px] font-bold tracking-[0.2em] text-[#c8b27d] sm:block">
          {selectedFood.tag}
        </div>

        {/* FOOD CONTENT */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">

          <div className="text-[8px] font-black tracking-[0.25em] text-[#c8b27d] sm:text-[9px]">
            {selectedFood.tag}
          </div>

          <h3 className="mt-3 font-serif text-4xl font-black text-[#e7e2d8] sm:text-5xl md:text-7xl">
            {selectedFood.name}
          </h3>

          <div className="mt-1 font-serif text-xl italic text-[#c8b27d] sm:text-2xl">
            {selectedFood.kannada}
          </div>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#d1cec7]">
            {selectedFood.description}
          </p>

        </div>
      </div>

      {/* FOOD SELECTOR */}
      <div className="flex flex-col border border-[#202a36]/10 bg-[#ddd8ce]">

        <div className="border-b border-[#202a36]/10 px-5 py-4">
          <div className="text-[8px] font-black tracking-[0.25em] text-[#7a7d7c]">
            CHOOSE A MEMORY
          </div>
        </div>

        <div className="flex flex-1 flex-col">

          {foods.map((food) => {
            const active = selectedFood.name === food.name;

            return (
              <button
                key={food.name}
                onClick={() => setSelectedFood(food)}
                className={`group flex flex-1 items-center gap-4 border-b border-[#202a36]/10 px-5 py-6 text-left transition last:border-b-0 ${
                  active
                    ? "bg-[#202a36] text-[#e7e2d8]"
                    : "bg-transparent text-[#303b45] hover:bg-[#d2ccc1]"
                }`}
              >
                <span
                  className={`font-mono text-[10px] ${
                    active ? "text-[#c8b27d]" : "text-[#8a8984]"
                  }`}
                >
                  {food.number}
                </span>

                <span className="flex-1">
                  <span className="block font-serif text-xl font-black sm:text-2xl">
                    {food.name}
                  </span>

                  <span
                    className={`mt-1 block font-serif text-sm italic ${
                      active ? "text-[#c8b27d]" : "text-[#777b7c]"
                    }`}
                  >
                    {food.kannada}
                  </span>
                </span>

                <span
                  className={`text-lg transition-transform duration-300 ${
                    active
                      ? "translate-x-0 text-[#c8b27d]"
                      : "-translate-x-1 opacity-40 group-hover:translate-x-0"
                  }`}
                >
                  →
                </span>
              </button>
            );
          })}

        </div>
      </div>
    </div>

    {/* MEMORY LINE */}
    <div className="mt-6 flex flex-col gap-4 border-y border-[#202a36]/10 py-6 sm:flex-row sm:items-center sm:justify-between">

      <div>
        <div className="text-[8px] font-black tracking-[0.22em] text-[#7a7d7c]">
          CURRENTLY REMEMBERING
        </div>

        <div className="mt-1 font-serif text-xl font-bold text-[#303b45] sm:text-2xl">
          {selectedFood.name}
        </div>
      </div>

      <div className="flex items-center gap-3 text-[#9b978d]">
        <span className="h-px w-10 bg-[#b59a62]" />

        <span className="font-serif text-lg italic">
          ಇನ್ನೂ ಸ್ವಲ್ಪ ಬೇಕಾ?
        </span>
      </div>

    </div>

  </div>
</section>
      {/* THE HEAT */}
      <section
        id="streets"
        className="relative overflow-hidden bg-[#596b78] px-5 py-24 sm:py-28"
      >
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#d8d2c6]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-[9px] font-black tracking-[0.3em] text-[#d8d2c6]/70 sm:text-[10px]">
            02:17 PM • VIJAYAPURA
          </div>

          <h2 className="mt-5 max-w-4xl font-serif text-6xl font-black leading-[.88] tracking-tight text-[#e7e2d8] sm:text-7xl md:text-9xl">
            THE CITY
            <br />
            IS HOT.
          </h2>

          <div className="mt-8 max-w-xl font-serif text-xl italic leading-relaxed text-[#d4d5d1] sm:text-2xl md:text-3xl">
            Very hot.
            <br />
            But you still go out.
          </div>

          <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
            {[
              ["🛺", "AUTO STANDS", "ಒಂದು ಆಟೋ ಕೊಡ್ರಿ"],
              ["🏪", "OLD SHOPS", "ಬಾಗಿಲು ಇನ್ನೂ ಅದೇ"],
              ["☕", "TEA BREAKS", "ಒಂದು ಚಹಾ ಸಾಕು"],
            ].map(([icon, title, line]) => (
              <div
                key={title}
                className="border border-[#e7e2d8]/15 bg-[#202a36]/30 p-5 backdrop-blur-sm transition hover:-translate-y-1 sm:p-6"
              >
                <div className="text-3xl">{icon}</div>

                <div className="mt-5 text-[10px] font-black tracking-[0.2em] text-[#e7e2d8]">
                  {title}
                </div>

                <div className="mt-2 font-serif text-lg italic text-[#d1cec7]">
                  {line}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* STREETS */}
<section
  id="streets"
  className="relative overflow-hidden bg-[#202a36] px-5 py-24 text-[#e7e2d8] sm:py-28 md:py-36"
>
  <div className="mx-auto max-w-7xl">

    {/* HEADER */}
    <div className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
      <div>
        <div className="font-serif text-lg italic text-[#c8b27d]">
          ನಮ್ಮ ಬೀದಿಗಳು
        </div>

        <h2 className="mt-2 font-serif text-5xl font-black leading-[0.88] sm:text-6xl md:text-8xl">
          OUR
          <br />
          STREETS.
        </h2>
      </div>

      <div className="md:pb-2 md:pl-10">
        <p className="max-w-md text-sm leading-7 text-[#aeb2b1]">
          The places between the monuments.
          <br />
          Where Vijayapura actually happens.
        </p>

        <div className="mt-5 flex items-center gap-3">
          <span className="h-px w-10 bg-[#b59a62]" />
          <span className="text-[8px] font-black tracking-[0.25em] text-[#858d91]">
            JUST WALK AROUND
          </span>
        </div>
      </div>
    </div>

    {/* STREET MEMORY */}
    <div className="mt-14 grid gap-5 lg:grid-cols-[1.45fr_.55fr]">

      {/* MAIN PANEL */}
      <div className="relative min-h-[500px] overflow-hidden border border-[#e7e2d8]/10 bg-[#151b24] sm:min-h-[620px]">

        {/* ATMOSPHERE */}
        <div className="absolute inset-0">
          <div className="absolute left-[12%] top-[20%] h-32 w-32 rounded-full bg-[#b59a62]/10 blur-[90px]" />
          <div className="absolute right-[8%] top-[45%] h-40 w-40 rounded-full bg-[#596b78]/20 blur-[100px]" />

          {/* overhead wires */}
          <div className="absolute left-[-10%] top-[24%] h-px w-[120%] rotate-[7deg] bg-[#e7e2d8]/15" />
          <div className="absolute left-[-10%] top-[31%] h-px w-[120%] rotate-[4deg] bg-[#e7e2d8]/10" />

          {/* vertical pole */}
          <div className="absolute right-[19%] top-0 h-[68%] w-px bg-[#e7e2d8]/10" />

          {/* old signboards */}
          <div className="absolute left-[9%] top-[17%] rotate-[-3deg] border border-[#c8b27d]/30 px-5 py-3">
            <div className="font-serif text-sm text-[#c8b27d]">
              ವಿಜಯಪುರ
            </div>
            <div className="mt-1 text-[7px] tracking-[0.2em] text-[#969c9e]">
              OLD CITY
            </div>
          </div>

          <div className="absolute right-[8%] top-[28%] rotate-[2deg] border border-[#e7e2d8]/15 px-4 py-2">
            <div className="text-[8px] font-black tracking-[0.2em] text-[#aeb2b1]">
              SHOP • TEA • TALK
            </div>
          </div>

          {/* road */}
          <div className="absolute bottom-[20%] left-[5%] h-px w-[90%] bg-[#e7e2d8]/10" />
          <div className="absolute bottom-[15%] left-[20%] h-px w-[60%] bg-[#e7e2d8]/5" />

          {/* auto */}
          <div className="absolute bottom-[16%] left-[11%] h-14 w-28 rounded-t-[30px] border border-[#c8b27d]/25 bg-[#151b24]/70 sm:h-16 sm:w-36">
            <div className="absolute left-3 top-[-10px] h-4 w-16 rounded-t-xl border border-[#c8b27d]/20 bg-[#151b24]" />
            <div className="absolute bottom-[-7px] left-3 h-3 w-3 rounded-full bg-[#10151c]" />
            <div className="absolute bottom-[-7px] right-3 h-3 w-3 rounded-full bg-[#10151c]" />
          </div>

          {/* bus */}
          <div className="absolute bottom-[18%] right-[13%] h-24 w-16 rounded-t-lg border border-[#e7e2d8]/10 bg-[#596b78]/15 sm:h-28 sm:w-20">
            <div className="absolute left-2 right-2 top-3 h-9 border border-[#e7e2d8]/10" />
            <div className="absolute bottom-3 left-2 right-2 h-px bg-[#c8b27d]/20" />
          </div>
        </div>

        {/* ACTIVE MEMORY CONTENT */}
        <div
          key={selectedStreet}
          className="soft-reveal absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10"
        >
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-black tracking-[0.25em] text-[#c8b27d]">
              0{selectedStreet + 1}
            </span>

            <span className="h-px w-8 bg-[#b59a62]" />

            <span className="text-[8px] font-black tracking-[0.2em] text-[#858d91]">
              {[
                "OLD VIJAYAPURA",
                "THE OLD CITY",
                "EVENING VIJAYAPURA",
                "EVERYDAY VIJAYAPURA",
              ][selectedStreet]}
            </span>
          </div>

          <h3 className="mt-4 max-w-3xl font-serif text-4xl font-black leading-[0.95] sm:text-5xl md:text-7xl">
            {[
              <>
                Autos at
                <br />
                the corner.
              </>,
              <>
                Old signs.
                <br />
                Old stories.
              </>,
              <>
                When the
                <br />
                city wakes up.
              </>,
              <>
                Tea.
                <br />
                Somewhere nearby.
              </>,
            ][selectedStreet]}
          </h3>

          <p className="mt-5 max-w-lg text-sm leading-7 text-[#aeb2b1]">
            {[
              "One is always waiting. Someone is always bargaining. You know exactly which corner they mean.",
              "Faded letters. Kannada names. Shops you've known forever. Some signs have been there longer than you have.",
              "Buses. Bikes. Horns. People crossing everywhere. And somehow everyone knows where they're going.",
              "There is always a tea shop nearby. Sit for five minutes. Somehow it becomes half an hour.",
            ][selectedStreet]}
          </p>
        </div>
      </div>

      {/* MEMORY SELECTOR */}
      <div className="flex flex-col border border-[#e7e2d8]/10 bg-[#151b24]/35">

        <div className="border-b border-[#e7e2d8]/10 px-5 py-5">
          <div className="text-[8px] font-black tracking-[0.25em] text-[#858d91]">
            THINGS YOU REMEMBER
          </div>
        </div>

        <div className="flex flex-1 flex-col">

          {[
            {
              title: "Autos at the corner",
              text: "One is always waiting. Someone is always bargaining.",
            },
            {
              title: "Old signboards",
              text: "Faded letters. Kannada names. Shops you've known forever.",
            },
            {
              title: "The evening rush",
              text: "Buses. Bikes. Horns. And everyone trying to get home.",
            },
            {
              title: "Tea somewhere",
              text: "There is always a tea shop nearby. You just have to look.",
            },
          ].map((memory, index) => {
            const active = selectedStreet === index;

            return (
              <button
                key={memory.title}
                type="button"
                onClick={() => setSelectedStreet(index)}
                className={`group flex flex-1 flex-col justify-center border-b border-[#e7e2d8]/10 px-5 py-7 text-left transition last:border-b-0 ${
                  active
                    ? "bg-[#151b24] text-[#e7e2d8]"
                    : "bg-transparent text-[#e7e2d8] hover:bg-[#e7e2d8]/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[9px] ${
                      active ? "text-[#c8b27d]" : "text-[#737d82]"
                    }`}
                  >
                    0{index + 1}
                  </span>

                  <span
                    className={`transition-transform duration-300 ${
                      active
                        ? "translate-x-0 text-[#c8b27d]"
                        : "-translate-x-1 text-[#596b78] group-hover:translate-x-0"
                    }`}
                  >
                    →
                  </span>
                </div>

                <div className="mt-5 font-serif text-2xl font-bold">
                  {memory.title}
                </div>

                <div
                  className={`mt-2 text-xs leading-6 ${
                    active ? "text-[#aeb2b1]" : "text-[#737d82]"
                  }`}
                >
                  {memory.text}
                </div>
              </button>
            );
          })}

        </div>
      </div>
    </div>

    {/* BOTTOM STREET STRIP */}
    <div className="mt-6 grid gap-px overflow-hidden border border-[#e7e2d8]/10 bg-[#e7e2d8]/10 sm:grid-cols-3">

      <div className="bg-[#151b24] px-5 py-6">
        <div className="text-[8px] font-black tracking-[0.2em] text-[#596b78]">
          SOUND
        </div>

        <div className="mt-2 font-serif text-xl">
          Horns & conversations
        </div>
      </div>

      <div className="bg-[#151b24] px-5 py-6">
        <div className="text-[8px] font-black tracking-[0.2em] text-[#596b78]">
          SMELL
        </div>

        <div className="mt-2 font-serif text-xl">
          Tea & hot bajji
        </div>
      </div>

      <div className="bg-[#151b24] px-5 py-6">
        <div className="text-[8px] font-black tracking-[0.2em] text-[#596b78]">
          FEEL
        </div>

        <div className="mt-2 font-serif text-xl">
          Dust & evening air
        </div>
      </div>

    </div>

  </div>
</section>

{/* GOLDEN HOUR */}
<section
  id="golden-hour"
  className="relative min-h-[760px] overflow-hidden bg-[#3d4d5d] text-[#e7e2d8]"
>
  {/* ATMOSPHERIC BACKGROUND */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#536676] via-[#596b78] to-[#202a36]" />

  {/* SUN GLOW */}
  <div className="absolute left-1/2 top-[38%] h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#c8b27d]/20 blur-[70px] sm:h-[360px] sm:w-[360px]" />

  <div className="absolute left-1/2 top-[38%] h-[115px] w-[115px] -translate-x-1/2 rounded-full border border-[#d8c28a]/20 bg-[#c8b27d]/10 shadow-[0_0_100px_rgba(200,178,125,0.15)] sm:h-[160px] sm:w-[160px]" />

  {/* FINE HORIZON */}
  <div className="absolute left-0 right-0 top-[57%] h-px bg-[#e7e2d8]/15" />

  <div className="absolute left-0 right-0 top-[59%] h-px bg-[#b59a62]/10" />

  {/* DISTANT CITY SILHOUETTE */}
  <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-[#202a36] via-[#263440]/80 to-transparent" />

  <div className="absolute bottom-[17%] left-0 right-0 flex items-end justify-center gap-2 opacity-30 sm:gap-4">

    {/* distant buildings */}
    <div className="h-12 w-12 bg-[#202a36] sm:h-16 sm:w-16" />
    <div className="h-20 w-20 bg-[#202a36] sm:h-28 sm:w-24" />
    <div className="h-10 w-16 bg-[#202a36] sm:h-14 sm:w-24" />
    <div className="h-24 w-16 bg-[#202a36] sm:h-32 sm:w-20" />
    <div className="h-14 w-24 bg-[#202a36] sm:h-20 sm:w-32" />
    <div className="h-20 w-14 bg-[#202a36] sm:h-28 sm:w-20" />

  </div>

  {/* GOL GUMBAZ-LIKE DOME SILHOUETTE */}
  <div className="absolute bottom-[17%] left-1/2 -translate-x-1/2 opacity-30">

    <div className="relative h-[95px] w-[190px] rounded-t-[100px] bg-[#202a36] sm:h-[125px] sm:w-[250px]">

      <div className="absolute left-1/2 top-[-35px] h-[70px] w-[70px] -translate-x-1/2 rounded-t-full bg-[#202a36] sm:top-[-45px] sm:h-[90px] sm:w-[90px]" />

      <div className="absolute -left-8 bottom-0 h-[125px] w-7 rounded-t-full bg-[#202a36] sm:-left-10 sm:h-[160px] sm:w-9" />

      <div className="absolute -right-8 bottom-0 h-[125px] w-7 rounded-t-full bg-[#202a36] sm:-right-10 sm:h-[160px] sm:w-9" />

    </div>

  </div>

  {/* TOP LABEL */}
  <div className="absolute left-5 right-5 top-7 sm:left-8 sm:right-8 md:left-12 md:right-12">

    <div className="flex items-center justify-between border-b border-[#e7e2d8]/15 pb-4">

      <span className="text-[8px] font-black tracking-[0.3em] text-[#d6c38d] sm:text-[9px]">
        06:14 PM
      </span>

      <span className="text-[8px] font-black tracking-[0.25em] text-[#b9b9b0] sm:text-[9px]">
        VIJAYAPURA • KARNATAKA
      </span>

    </div>

  </div>

  {/* MAIN CONTENT */}
  <div className="relative mx-auto flex min-h-[760px] max-w-7xl flex-col justify-between px-5 pb-12 pt-32 sm:px-8 sm:pb-16 md:px-12">

    <div className="grid gap-8 md:grid-cols-[1fr_0.65fr]">

      <div>
        <div className="font-serif text-lg italic text-[#d2bd82]">
          ಒಂದು ಸಂಜೆ
        </div>

        <h2 className="mt-3 max-w-4xl font-serif text-6xl font-black leading-[0.8] tracking-[-0.04em] sm:text-7xl md:text-9xl">
          GOLDEN
          <br />
          HOUR.
        </h2>
      </div>

      <div className="md:pt-10 md:pl-8">

        <p className="max-w-md font-serif text-xl italic leading-relaxed text-[#e1ded5] sm:text-2xl md:text-3xl">
          The heat softens.
          <br />
          The stone turns gold.
          <br />
          And the whole city slows down.
        </p>

      </div>

    </div>

    {/* BOTTOM MEMORY */}
    <div className="grid gap-8 border-t border-[#e7e2d8]/15 pt-6 md:grid-cols-[0.7fr_1fr_0.7fr] md:items-end">

      <div>
        <div className="text-[8px] font-black tracking-[0.25em] text-[#aeb2b1]">
          THE LIGHT
        </div>

        <div className="mt-2 font-serif text-xl">
          Dusty. Warm. Familiar.
        </div>
      </div>

      <div className="font-serif text-2xl italic text-[#d5c99f] md:text-center">
        “ಇದು ನಮ್ಮ ಊರು.”
      </div>

      <div className="md:text-right">
        <div className="text-[8px] font-black tracking-[0.25em] text-[#aeb2b1]">
          THE MOMENT
        </div>

        <div className="mt-2 font-serif text-xl">
          Just before evening.
        </div>
      </div>

    </div>

  </div>
</section>

{/* STORIES */}
<section
  id="stories"
  className="relative overflow-hidden bg-[#ddd8ce] px-5 py-24 text-[#18212a] sm:py-28 md:py-36"
>
  <div className="mx-auto max-w-7xl">

    {/* HEADER */}
    <div className="grid gap-10 md:grid-cols-[1fr_0.7fr] md:items-end">

      <div>
        <div className="font-serif text-lg italic text-[#806b45]">
          ನಮ್ಮ ನೆನಪುಗಳು
        </div>

        <h2 className="mt-2 font-serif text-5xl font-black leading-[0.88] sm:text-6xl md:text-8xl">
          LITTLE
          <br />
          STORIES.
        </h2>
      </div>

      <div className="md:pb-2 md:pl-8">
        <p className="max-w-md text-sm leading-7 text-[#596169]">
          Not the stories you find in history books.
          <br />
          The ones people carry home.
        </p>
      </div>

    </div>

    {/* MEMORY EDITORIAL */}
    <div className="mt-14 grid gap-5 lg:grid-cols-[0.55fr_1.45fr]">

      {/* MEMORY INDEX */}
      <div className="border border-[#18212a]/10 bg-[#e7e2d8]">

        <div className="border-b border-[#18212a]/10 px-5 py-5">
          <div className="text-[8px] font-black tracking-[0.25em] text-[#7a7f7e]">
            PICK A MEMORY
          </div>
        </div>

        <div className="flex flex-col">

          {[
            {
              number: "01",
              title: "The summer afternoons",
            },
            {
              number: "02",
              title: "That one tea shop",
            },
            {
              number: "03",
              title: "Going home late",
            },
            {
              number: "04",
              title: "Amma's kitchen",
            },
          ].map((story, index) => {

            const active = selectedStory === index;

            return (
              <button
                key={story.number}
                type="button"
                onClick={() => setSelectedStory(index)}
                className={`group border-b border-[#18212a]/10 px-5 py-7 text-left transition last:border-b-0 ${
                  active
                    ? "bg-[#18212a] text-[#e7e2d8]"
                    : "bg-transparent hover:bg-[#18212a]/5"
                }`}
              >

                <div className="flex items-center justify-between">

                  <span
                    className={`font-mono text-[9px] ${
                      active
                        ? "text-[#c8b27d]"
                        : "text-[#8a8c88]"
                    }`}
                  >
                    {story.number}
                  </span>

                  <span
                    className={`transition-transform duration-300 ${
                      active
                        ? "text-[#c8b27d]"
                        : "text-[#8a8c88] group-hover:translate-x-1"
                    }`}
                  >
                    →
                  </span>

                </div>

                <div className="mt-5 font-serif text-xl font-bold sm:text-2xl">
                  {story.title}
                </div>

              </button>
            );
          })}

        </div>

      </div>

      {/* ACTIVE STORY */}
      <div
        key={selectedStory}
        className="soft-reveal relative min-h-[520px] overflow-hidden bg-[#18212a] p-7 text-[#e7e2d8] sm:p-10 md:min-h-[620px] md:p-14"
      >

        {/* PAPER GLOW */}
        <div className="absolute right-[-120px] top-[-100px] h-[320px] w-[320px] rounded-full bg-[#b59a62]/10 blur-[90px]" />

        <div className="relative flex h-full flex-col justify-between">

          {/* TOP */}
          <div className="flex items-start justify-between">

            <div>
              <div className="font-serif text-lg italic text-[#c8b27d]">
                {[
                  "ಬೇಸಿಗೆ",
                  "ಒಂದು ಕಪ್ ಚಹಾ",
                  "ಮನೆಗೆ ಹೋಗುವ ದಾರಿ",
                  "ಅಮ್ಮನ ಅಡುಗೆ",
                ][selectedStory]}
              </div>

              <div className="mt-3 text-[8px] font-black tracking-[0.25em] text-[#7e878a]">
                MEMORY / 0{selectedStory + 1}
              </div>
            </div>

            <div className="font-mono text-[9px] text-[#6f797d]">
              VIJAYAPURA
            </div>

          </div>

          {/* STORY */}
          <div className="max-w-3xl">

            <h3 className="font-serif text-4xl font-black leading-[0.95] sm:text-5xl md:text-7xl">
              {[
                <>
                  The summer
                  <br />
                  afternoons.
                </>,
                <>
                  That one
                  <br />
                  tea shop.
                </>,
                <>
                  Going home
                  <br />
                  late.
                </>,
                <>
                  Amma's
                  <br />
                  kitchen.
                </>,
              ][selectedStory]}
            </h3>

            <p className="mt-7 max-w-xl text-sm leading-7 text-[#b7bbb9] sm:text-base">
              {[
                "The kind where the afternoon feels endless. The fan is turning slowly. The road outside is almost empty. You don't have anywhere to be.",
                "You know the place by the glass tumblers, the sound of the kettle and the person who already knows what you're going to order.",
                "The streets look different after dark. Shops are closing, the air has finally cooled down and the ride home somehow feels shorter.",
                "The smell reaches you before you enter. Something is frying. Something is simmering. And somehow you already know what's for dinner.",
              ][selectedStory]}
            </p>

          </div>

          {/* BOTTOM */}
          <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-[#e7e2d8]/10 pt-6">

            <div>
              <div className="text-[8px] font-black tracking-[0.25em] text-[#7e878a]">
                SOME THINGS NEVER CHANGE
              </div>

              <div className="mt-2 font-serif text-lg italic text-[#c8b27d]">
                {[
                  "Slow afternoons.",
                  "One more cup.",
                  "Just five more minutes.",
                  "Eat first. Talk later.",
                ][selectedStory]}
              </div>
            </div>

            <div className="font-mono text-[9px] text-[#6f797d]">
              16° 49′ N / 75° 43′ E
            </div>

          </div>

        </div>

      </div>

    </div>

    {/* QUOTE STRIP */}
    <div className="mt-6 border-y border-[#18212a]/10 py-8 text-center">

      <p className="font-serif text-2xl italic text-[#3b4245] sm:text-3xl md:text-4xl">
        “ಕೆಲವು ಊರುಗಳು ನೆನಪಾಗುವುದಿಲ್ಲ.
        <br className="hidden sm:block" />
        ಅವು ನಮ್ಮೊಳಗೆ ಇರುತ್ತವೆ.”
      </p>

      <div className="mt-4 text-[8px] font-black tracking-[0.3em] text-[#8a8c88]">
        SOME PLACES DON'T BECOME MEMORIES. THEY BECOME PART OF YOU.
      </div>

    </div>

  </div>
</section>
{/* OLD VIJAYAPURA / TODAY */}
<section
  id="then-now"
  className="relative overflow-hidden bg-[#202a34] px-5 py-24 text-[#e7e2d8] sm:py-28 md:py-36"
>
  <div className="mx-auto max-w-7xl">

    {/* HEADER */}
    <div className="grid gap-8 md:grid-cols-[1fr_0.7fr] md:items-end">

      <div>
        <div className="font-kannada text-lg italic text-[#c8b27d]">
          ಕಾಲದ ನಡುವೆ
        </div>

        <h2 className="mt-2 font-display text-5xl font-black leading-[0.85] tracking-[-0.03em] sm:text-6xl md:text-8xl">
          THEN.
          <br />
          NOW.
        </h2>
      </div>

      <div className="md:pb-2 md:pl-8">
        <p className="max-w-md text-sm leading-7 text-[#aeb5b7]">
          A city changes.
          <br />
          Some things stay.
        </p>
      </div>

    </div>

    {/* COMPARISON */}
    <div className="mt-14">

      <div className="relative aspect-[4/3] overflow-hidden bg-[#151b24] sm:aspect-[16/9]">

        {/* TODAY IMAGE */}
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Gol%20Gumbaz%20Vijayapur%20Karnataka.webp"
          alt="Vijayapura today"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* TODAY ATMOSPHERE */}
        <div className="absolute inset-0 bg-[#151b24]/20" />

        {/* OLD IMAGE */}
        <img
          src="https://i.pinimg.com/736x/c3/a8/4c/c3a84cfefe61e4198c6eb0f76db00bc9.jpg"
          alt="Historic Vijayapura"
          className="absolute inset-0 h-full w-full object-cover grayscale"
          style={{
            clipPath: `inset(0 ${100 - comparisonPosition}% 0 0)`,
          }}
        />

        {/* OLD IMAGE TONE */}
        <div
          className="pointer-events-none absolute inset-0 bg-[#8d8069]/20 mix-blend-multiply"
          style={{
            clipPath: `inset(0 ${100 - comparisonPosition}% 0 0)`,
          }}
        />

        {/* THEN LABEL */}
        <div className="absolute left-5 top-5 z-20 sm:left-8 sm:top-8">
          <div className="text-[8px] font-black tracking-[0.28em] text-[#e7e2d8]/70">
            THEN
          </div>

          <div className="mt-1 font-kannada text-xl italic text-[#e7e2d8] sm:text-2xl">
            ಆಗ
          </div>
        </div>

        {/* NOW LABEL */}
        <div className="absolute right-5 top-5 z-20 text-right sm:right-8 sm:top-8">
          <div className="text-[8px] font-black tracking-[0.28em] text-[#e7e2d8]/70">
            NOW
          </div>

          <div className="mt-1 font-kannada text-xl italic text-[#e7e2d8] sm:text-2xl">
            ಈಗ
          </div>
        </div>

        {/* SINGLE DIVIDER */}
        <div
          className="pointer-events-none absolute inset-y-0 z-30 w-px bg-[#e7e2d8]/80"
          style={{
            left: `${comparisonPosition}%`,
          }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#e7e2d8]/50 bg-[#18212a]/90 text-[#c8b27d] shadow-xl">
            ↔
          </div>
        </div>

        {/* SLIDER */}
        <input
          type="range"
          min="0"
          max="100"
          value={comparisonPosition}
          onChange={(event) =>
            setComparisonPosition(Number(event.target.value))
          }
          aria-label="Compare old and new Vijayapura"
          className="absolute inset-0 z-40 h-full w-full cursor-ew-resize opacity-0"
        />

      </div>

      {/* DESCRIPTION */}
      <div className="mt-8 flex flex-col gap-6 border-t border-[#e7e2d8]/10 pt-6 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <div className="text-[8px] font-black tracking-[0.3em] text-[#7f898e]">
            THE CITY CHANGES
          </div>

          <div className="mt-2 font-display text-2xl italic text-[#d8d2c6]">
            The feeling doesn't.
          </div>
        </div>

        <p className="max-w-md text-sm leading-7 text-[#969fa2]">
          Stone walls remember centuries.
          Streets remember yesterday.
          And somehow, the city still feels like itself.
        </p>

      </div>

    </div>

  </div>
</section>

{/* MEMORY ARCHIVE */}
<section
  id="memories"
  className="reveal-on-scroll relative overflow-hidden bg-[#151b24] px-5 py-24 text-[#e7e2d8] sm:py-28 md:py-36"
>
  <div className="mx-auto max-w-6xl">

    {/* HEADER */}
    <div className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">

      <div>
        <div className="font-kannada text-lg text-[#c8b27d]">
          ನೆನಪಿನ ಪೆಟ್ಟಿಗೆ
        </div>

        <h2 className="mt-3 font-display text-5xl font-black uppercase leading-[0.85] tracking-[-0.04em] sm:text-6xl md:text-8xl">
          THINGS
          <br />
          I REMEMBER.
        </h2>
      </div>

      <p className="max-w-sm text-sm leading-7 text-[#929ba0] md:pb-2">
        Not everything that belongs to a city
        can be found on a map.
        <br />
        Some things just stay with you.
      </p>

    </div>

    {/* SUITCASE */}
    <div className="relative mt-16 overflow-hidden border border-[#e7e2d8]/10 bg-[#202a34]">

      {/* TOP LABEL */}
      <div className="flex items-center justify-between border-b border-[#e7e2d8]/10 px-5 py-4 sm:px-7">
        <span className="text-[8px] font-black tracking-[0.3em] text-[#7f898e]">
          PERSONAL ARCHIVE
        </span>

        <span className="font-kannada text-xs text-[#b89a5a]">
          ವಿಜಯಪುರ
        </span>
      </div>

      <div className="grid md:grid-cols-[0.38fr_0.62fr]">

        {/* LEFT: SUITCASE */}
        <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden border-b border-[#e7e2d8]/10 bg-[#252f38] p-8 md:min-h-[520px] md:border-b-0 md:border-r">

          {/* decorative circles */}
          <div className="absolute h-[300px] w-[300px] rounded-full border border-[#b89a5a]/10" />
          <div className="absolute h-[230px] w-[230px] rounded-full border border-[#b89a5a]/10" />

          {/* suitcase */}
          <div className="relative w-full max-w-[270px] rotate-[-3deg]">

            {/* HANDLE */}
            <div className="mx-auto h-10 w-24 rounded-t-xl border-4 border-b-0 border-[#8f7950] bg-transparent" />

            {/* BODY */}
            <div className="relative h-[210px] rounded-xl border border-[#a98b58]/50 bg-[#756247] shadow-2xl sm:h-[230px]">

              {/* leather texture */}
              <div className="absolute inset-2 rounded-lg border border-[#d0b985]/20" />

              {/* center strap */}
              <div className="absolute inset-y-0 left-1/2 w-7 -translate-x-1/2 bg-[#5e4c38]/60" />

              {/* buckle */}
              <div className="absolute left-1/2 top-1/2 h-12 w-9 -translate-x-1/2 -translate-y-1/2 border-2 border-[#c8b27d]/70">
                <div className="absolute left-1/2 top-1/2 h-4 w-3 -translate-x-1/2 -translate-y-1/2 border border-[#c8b27d]/50" />
              </div>

              {/* corner details */}
              <div className="absolute left-3 top-3 h-4 w-4 border-l border-t border-[#d8c49a]/40" />
              <div className="absolute right-3 top-3 h-4 w-4 border-r border-t border-[#d8c49a]/40" />
              <div className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[#d8c49a]/40" />
              <div className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-[#d8c49a]/40" />

              {/* stamp */}
              <div className="absolute bottom-6 left-6 rotate-[-8deg] border border-[#d8c49a]/30 px-3 py-2 text-center">
                <div className="text-[7px] font-black tracking-[0.25em] text-[#d8c49a]/60">
                  BIJAPUR
                </div>
                <div className="mt-1 text-[6px] tracking-[0.2em] text-[#d8c49a]/40">
                  MEMORIES
                </div>
              </div>

            </div>

          </div>

          {/* ACTIVE MEMORY */}
<div className="absolute bottom-6 left-6 right-6">
  <div className="text-[8px] font-black tracking-[0.25em] text-[#b89a5a]">
    MEMORY {activeMemory.number}
  </div>

  <div className="mt-2 font-display text-xl italic text-[#e7e2d8]">
    {activeMemory.title}
  </div>
</div>

        </div>

        {/* RIGHT: MEMORIES */}
        <div className="p-6 sm:p-8 md:p-12">

          <div className="mb-8 flex items-center justify-between">
            <span className="text-[8px] font-black tracking-[0.3em] text-[#7f898e]">
              FOUR LITTLE THINGS
            </span>

            <span className="font-display text-sm italic text-[#b89a5a]">
              01 — 04
            </span>
          </div>

          <div className="space-y-0">

            {/* MEMORY 01 */}
            <button
  type="button"
  onClick={() => setSelectedMemory(0)}
  className={`group flex w-full items-center justify-between border-t border-[#e7e2d8]/10 py-6 text-left ${
    selectedMemory === 0 ? "bg-[#18212a]" : ""
  }`}
>
              <div className="flex items-center gap-5">
                <span className="font-display text-xs italic text-[#b89a5a]">
                  01
                </span>

                <div>
                  <div className="font-display text-2xl text-[#e7e2d8] transition-colors group-hover:text-[#c8b27d]">
                    Autos at the corner
                  </div>

                  <div className="mt-1 font-kannada text-sm text-[#7f898e]">
                    ಮೂಲೆಲಿ ಆಟೋ ನಿಂತಿರುತ್ತೆ
                  </div>
                </div>
              </div>

              <span className="text-xl text-[#596b78] transition-transform group-hover:translate-x-1 group-hover:text-[#c8b27d]">
                →
              </span>
            </button>

            {/* MEMORY 02 */}
            <button
  type="button"
  onClick={() => setSelectedMemory(1)}
  className={`group flex w-full items-center justify-between border-t border-[#e7e2d8]/10 py-6 text-left ${
    selectedMemory === 1 ? "bg-[#18212a]" : ""
  }`}
>
              <div className="flex items-center gap-5">
                <span className="font-display text-xs italic text-[#b89a5a]">
                  02
                </span>

                <div>
                  <div className="font-display text-2xl text-[#e7e2d8] transition-colors group-hover:text-[#c8b27d]">
                    The old market
                  </div>

                  <div className="mt-1 font-kannada text-sm text-[#7f898e]">
                    ಹಳೆಯ ಬಜಾರ್
                  </div>
                </div>
              </div>

              <span className="text-xl text-[#596b78] transition-transform group-hover:translate-x-1 group-hover:text-[#c8b27d]">
                →
              </span>
            </button>

            {/* MEMORY 03 */}
            <button
  type="button"
  onClick={() => setSelectedMemory(2)}
  className={`group flex w-full items-center justify-between border-t border-[#e7e2d8]/10 py-6 text-left ${
    selectedMemory === 2 ? "bg-[#18212a]" : ""
  }`}
>
              <div className="flex items-center gap-5">
                <span className="font-display text-xs italic text-[#b89a5a]">
                  03
                </span>

                <div>
                  <div className="font-display text-2xl text-[#e7e2d8] transition-colors group-hover:text-[#c8b27d]">
                    Bus ride home
                  </div>

                  <div className="mt-1 font-kannada text-sm text-[#7f898e]">
                    ಮನೆಗೆ ಹೋಗೋ ಬಸ್
                  </div>
                </div>
              </div>

              <span className="text-xl text-[#596b78] transition-transform group-hover:translate-x-1 group-hover:text-[#c8b27d]">
                →
              </span>
            </button>

            {/* MEMORY 04 */}
            <button
  type="button"
  onClick={() => setSelectedMemory(3)}
  className={`group flex w-full items-center justify-between border-y border-[#e7e2d8]/10 py-6 text-left ${
    selectedMemory === 3 ? "bg-[#18212a]" : ""
  }`}
>
              <div className="flex items-center gap-5">
                <span className="font-display text-xs italic text-[#b89a5a]">
                  04
                </span>

                <div>
                  <div className="font-display text-2xl text-[#e7e2d8] transition-colors group-hover:text-[#c8b27d]">
                    Tea somewhere
                  </div>

                  <div className="mt-1 font-kannada text-sm text-[#7f898e]">
                    ಎಲ್ಲಾದ್ರೂ ಒಂದು ಚಹಾ
                  </div>
                </div>
              </div>

              <span className="text-xl text-[#596b78] transition-transform group-hover:translate-x-1 group-hover:text-[#c8b27d]">
                →
              </span>
            </button>

          </div>

          {/* BOTTOM NOTE */}
          <div className="mt-10 flex items-start gap-4">
            <div className="mt-2 h-px w-8 bg-[#b89a5a]" />

            <p className="max-w-sm font-kalam text-base leading-7 text-[#9b978d]">
              Some memories don't need photographs.
              You just know they're there.
            </p>
          </div>

        </div>

      </div>
    </div>

  </div>
</section>

{/* BUS TICKET */}
<section
  id="journey"
  className="relative overflow-hidden bg-[#b8b1a4] px-5 py-24 text-[#18212a] sm:py-28 md:py-36"
>
  <div className="mx-auto max-w-7xl">

    {/* HEADER */}
    <div className="grid gap-8 md:grid-cols-[1fr_0.7fr] md:items-end">

      <div>
        <div className="font-serif text-lg italic text-[#5f513d]">
          ಒಂದು ಪ್ರಯಾಣ
        </div>

        <h2 className="mt-2 font-serif text-5xl font-black leading-[0.85] sm:text-6xl md:text-8xl">
          ONE
          <br />
          JOURNEY.
        </h2>
      </div>

      <div className="md:pb-2 md:pl-8">
        <p className="max-w-md text-sm leading-7 text-[#514f4a]">
          Every North Karnataka story has a bus ride somewhere in it.
          <br />
          Pick a destination.
        </p>
      </div>

    </div>

    {/* MAIN AREA */}
    <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-center">

      {/* BUS TICKET */}
      <div className="relative rotate-[-1deg] overflow-hidden bg-[#e7e2d8] shadow-[0_25px_60px_rgba(24,33,42,0.18)]">

        {/* TOP */}
        <div className="border-b border-dashed border-[#18212a]/20 px-6 py-6 sm:px-9">

          <div className="flex items-start justify-between gap-5">

            <div>
              <div className="text-[8px] font-black tracking-[0.3em] text-[#6d6b65]">
                NORTH KARNATAKA ROAD TRANSPORT
              </div>

              <div className="mt-2 font-serif text-2xl font-black">
                VIJAYAPURA
              </div>

              <div className="mt-1 font-serif text-sm italic text-[#77756f]">
                ವಿಜಯಪುರ
              </div>
            </div>

            <div className="font-mono text-right text-[8px] leading-5 text-[#77756f]">
              OLD CITY
              <br />
              JOURNEY / 01
            </div>

          </div>

        </div>

        {/* TICKET BODY */}
        <div className="px-6 py-8 sm:px-9 sm:py-10">

          <div className="text-[8px] font-black tracking-[0.25em] text-[#77756f]">
            FROM
          </div>

          <div className="mt-1 font-serif text-3xl font-black sm:text-4xl">
            VIJAYAPURA
          </div>

          <div className="my-6 flex items-center gap-4">

            <div className="h-px flex-1 bg-[#18212a]/15" />

            <div className="font-mono text-xs text-[#8c7650]">
              →
            </div>

            <div className="h-px flex-1 bg-[#18212a]/15" />

          </div>

          <div className="text-[8px] font-black tracking-[0.25em] text-[#77756f]">
            TO
          </div>

          <div className="mt-1 font-serif text-4xl font-black sm:text-5xl">
            {selectedStop.city.toUpperCase()}
          </div>

          <div className="mt-1 font-serif text-lg italic text-[#77756f]">
            {selectedStop.kannada}
          </div>

          {/* DETAILS */}
          <div className="mt-8 grid grid-cols-3 border-t border-[#18212a]/10 pt-5">

            <div>
              <div className="text-[7px] font-black tracking-[0.2em] text-[#77756f]">
                REGION
              </div>

              <div className="mt-1 font-mono text-[9px]">
                NORTH KA
              </div>
            </div>

            <div>
              <div className="text-[7px] font-black tracking-[0.2em] text-[#77756f]">
                ROUTE
              </div>

              <div className="mt-1 font-mono text-[9px]">
                ONE WAY
              </div>
            </div>

            <div>
              <div className="text-[7px] font-black tracking-[0.2em] text-[#77756f]">
                TYPE
              </div>

              <div className="mt-1 font-mono text-[9px]">
                MEMORY
              </div>
            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between border-t border-dashed border-[#18212a]/20 px-6 py-5 sm:px-9">

          <div className="font-mono text-[8px] tracking-[0.15em] text-[#77756f]">
            KEEP THIS TICKET
          </div>

          <div className="font-mono text-[9px] text-[#8c7650]">
            VIJAYAPURA → {selectedStop.city.toUpperCase()}
          </div>

        </div>

        {/* TICKET CUTOUTS */}
        <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#b8b1a4]" />
        <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#b8b1a4]" />

      </div>

      {/* DESTINATIONS */}
      <div>

        <div className="text-[8px] font-black tracking-[0.3em] text-[#625e57]">
          WHERE ARE YOU GOING?
        </div>

        <div className="mt-5 space-y-2">

          {busStops.map((stop, index) => {

            const active = selectedStop.city === stop.city;

            return (
              <button
                key={stop.city}
                type="button"
                onClick={() => setSelectedStop(stop)}
                className={`group flex w-full items-center justify-between border px-5 py-5 text-left transition ${
                  active
                    ? "border-[#18212a] bg-[#18212a] text-[#e7e2d8]"
                    : "border-[#18212a]/15 bg-transparent text-[#18212a] hover:bg-[#18212a]/5"
                }`}
              >

                <div className="flex items-center gap-4">

                  <span
                    className={`font-mono text-[9px] ${
                      active
                        ? "text-[#c8b27d]"
                        : "text-[#77756f]"
                    }`}
                  >
                    0{index + 1}
                  </span>

                  <div>

                    <div className="font-serif text-xl font-bold">
                      {stop.city}
                    </div>

                    <div
                      className={`mt-1 font-serif text-sm italic ${
                        active
                          ? "text-[#c8b27d]"
                          : "text-[#77756f]"
                      }`}
                    >
                      {stop.kannada}
                    </div>

                  </div>

                </div>

                <span
                  className={`text-lg transition-transform duration-300 ${
                    active
                      ? "translate-x-0 text-[#c8b27d]"
                      : "-translate-x-1 text-[#77756f] group-hover:translate-x-0"
                  }`}
                >
                  →
                </span>

              </button>
            );

          })}

        </div>

        {/* MEMORY */}
        <div className="mt-8 border-t border-[#18212a]/15 pt-6">

          <div className="text-[8px] font-black tracking-[0.25em] text-[#77756f]">
            THE MEMORY
          </div>

          <p className="mt-3 max-w-md font-serif text-xl italic leading-relaxed text-[#3f4140]">
            {selectedStop.line}
          </p>

        </div>

      </div>

    </div>

  </div>
</section>
{/* FINAL */}
<section
  id="home"
  className="relative min-h-[85vh] overflow-hidden bg-[#151b24] px-6 py-28 text-[#e7e2d8] sm:py-36 md:min-h-screen md:px-10"
>
  {/* ATMOSPHERE */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-[15%] top-[20%] h-[300px] w-[300px] rounded-full bg-[#b59a62]/[0.04] blur-[100px]" />
    <div className="absolute bottom-[10%] right-[10%] h-[400px] w-[400px] rounded-full bg-[#596b78]/[0.08] blur-[120px]" />
  </div>

  <div className="relative mx-auto flex min-h-[65vh] max-w-7xl flex-col justify-between">

    {/* TOP */}
    <div className="flex items-start justify-between">

      <div>
        <div className="font-serif text-lg italic text-[#c8b27d]">
          ಕೊನೆಯ ಮಾತು
        </div>

        <div className="mt-3 text-[8px] font-black tracking-[0.3em] text-[#737d82]">
          VIJAYAPURA / HOME
        </div>
      </div>

      <div className="hidden text-right font-mono text-[8px] leading-5 text-[#626c72] sm:block">
        16° 49′ N
        <br />
        75° 43′ E
      </div>

    </div>

    {/* MAIN MESSAGE */}
    <div className="py-20">

      <div className="max-w-5xl">

        <h2 className="font-serif text-[clamp(3.8rem,10vw,9rem)] font-black leading-[0.8] tracking-[-0.04em]">
          NOT JUST
          <br />
          A CITY.
        </h2>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end">

          <div className="font-serif text-3xl italic text-[#c8b27d] sm:text-4xl md:text-5xl">
            ಮನೆ.
          </div>

          <p className="max-w-xl text-sm leading-7 text-[#9da4a5] sm:text-base">
            The streets you know without thinking.
            <br />
            The food you don't need a menu for.
            <br />
            The places that somehow always bring you back.
          </p>

        </div>

      </div>

    </div>

    {/* BOTTOM */}
    <div className="border-t border-[#e7e2d8]/10 pt-7">

      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <div className="font-serif text-xl italic text-[#d8d2c6]">
            ವಿಜಯಪುರದ ನೆನಪುಗಳು
          </div>

          <div className="mt-2 text-[8px] font-black tracking-[0.28em] text-[#626c72]">
            MEMORIES OF VIJAYAPURA
          </div>

        </div>

        <div className="max-w-sm text-sm leading-6 text-[#7f898e] sm:text-right">
          Some cities are visited.
          <br />
          Some are remembered.
          <br />
          <span className="text-[#c8b27d]">
            Some are simply home.
          </span>
        </div>

      </div>

    </div>

  </div>
</section>

      {/* FOOTER */}
      <footer className="bg-[#10151c] px-5 py-9 text-center text-[#737b82] sm:py-10">
        <div className="font-serif text-2xl font-black text-[#b59a62]">
          ವಿಜಯಪುರ
        </div>

        <div className="mt-2 text-[8px] font-bold tracking-[0.25em] sm:text-[9px] sm:tracking-[0.3em]">
          VIJAYAPURA / BIJAPUR
        </div>

        <div className="mt-5 text-[8px] tracking-[0.18em] sm:mt-6 sm:text-[9px] sm:tracking-[0.2em]">
          NORTH KARNATAKA • INDIA
        </div>
      </footer>
    </div>
  );
}