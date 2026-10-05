import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, FastForward, Instagram, MapPin, Pause, Play, Power, Rewind, RotateCcw, Sparkles, Volume, Volume2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import AOS from "aos";
import { useInvitationSong } from "@/hooks/use-invitation-song";
import "aos/dist/aos.css";
import tvRoom from "@/assets/dholki-tv-room.jpg";
import celebration from "@/assets/dholki-celebration.jpg";
import instruments from "@/assets/dhol-dafli.jpg";
import batashe from "@/assets/batashe-tray.jpg";
import sisterA from "@/assets/sumbul.jpg";
import sisterB from "@/assets/uroosa.jpeg";
import sisterC from "@/assets/mehak.jpeg";
import crew from "@/assets/dholkicrew.jpg";

export const Route = createFileRoute("/")({
  ssr: false,
    head: () => ({ meta: [
    { title: "Dholki Ki Raat, Yaadon Ke Saath | 90s Dholki Invitation" },
    { name: "description", content: "A colourful 90s Pakistani Dholki night filled with music, family, and joyful memories." },
    { property: "og:title", content: "Dholki Ki Raat, Yaadon Ke Saath" },
    { property: "og:description", content: "You’re invited to a colourful 90s Pakistani Dholki celebration." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://fizza-dholki.netlify.app/og-image.png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:type", content: "image/png" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: "https://fizza-dholki.netlify.app/og-image.png" },
  ]}),
  component: Invitation,
});

const DETAILS = {
  bride: "Fizza",
  groom: "Abdul Qadir",
  date: "19 October 2026",
  time: "8:00 PM",
  venue: "The gold front apartments",
  location: "10th Floor, Flat: 1001, Gulshan e Iqbal, Block 10, karachi",
  mapUrl: "https://www.google.com/maps/place/Gold+Front+appartment/@24.9168179,67.0951638,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb339102b630f2d:0x84808c7b3729b78d!8m2!3d24.9168131!4d67.0977387!16s%2Fg%2F11fm9s_wy5?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D",
  instagramUrl: "https://www.instagram.com/digital_invites_bymili/",
  whatsappUrl: "https://api.whatsapp.com/message/N24AWOP5IQURG1?autoload=1&app_absent=0",
};

const EVENT_DAY = 19;
const EVENT_MONTH_INDEX = 9; // October (0-indexed)
const EVENT_YEAR = 2026;
const CALENDAR_FIRST_WEEKDAY = new Date(EVENT_YEAR, EVENT_MONTH_INDEX, 1).getDay();
const CALENDAR_DAYS_IN_MONTH = new Date(EVENT_YEAR, EVENT_MONTH_INDEX + 1, 0).getDate();
const stations = ["NEXT UP: DHOLKI BEATS", "COMING UP: FAMILY FUN", "SPECIAL GUESTS: YOU!"];
const sisters = [
  { name: "Sumbul", image: sisterA, caption: "Decor, colours & all the little details" },
  { name: "Uroosa", image: sisterB, caption: "Songs, beats & the loudest taaliyan" },
  { name: "Mehak", image: sisterC, caption: "Photos, memories & festive magic" },
];

function Invitation() {
   const root = useRef<HTMLDivElement>(null);
  const [powered, setPowered] = useState(false);
  const [entered, setEntered] = useState(false);
  const [station, setStation] = useState(0);
  const [sister, setSister] = useState<number | null>(null);
  const [beat, setBeat] = useState(0);
  const [dafli, setDafli] = useState(false);
  const [photo, setPhoto] = useState(false);
  const song = useInvitationSong("90s-dholki");
  const playing = song.playing;
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!entered) return;
    gsap.registerPlugin(ScrollTrigger);
    AOS.init({ once: false, duration: 650, easing: "ease-out-cubic", offset: 60, disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches });
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-scene]").forEach((scene) => {
        gsap.fromTo(scene.querySelectorAll("[data-gsap]"), { y: 55, opacity: 0, rotate: -1 }, {
          y: 0, opacity: 1, rotate: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: scene, start: "top 72%", toggleActions: "play none none reverse" },
        });
      });
      gsap.to(".calendar-sheet", { rotateX: -8, y: -18, scrollTrigger: { trigger: ".calendar-scene", start: "top 70%", end: "center 42%", scrub: 1 } });
      gsap.to(".venue-track", { xPercent: -18, scrollTrigger: { trigger: ".venue-scene", start: "top bottom", end: "bottom top", scrub: 1.2 } });
      gsap.to(".clock-minute", { rotate: 145, transformOrigin: "bottom center", scrollTrigger: { trigger: ".clock-scene", start: "top 75%", end: "center 45%", scrub: 1 } });
      gsap.to(".clock-hour", { rotate: 52, transformOrigin: "bottom center", scrollTrigger: { trigger: ".clock-scene", start: "top 75%", end: "center 45%", scrub: 1 } });
      gsap.to(".finale-bg", { scale: 1.09, scrollTrigger: { trigger: ".finale", start: "top bottom", end: "bottom bottom", scrub: 1.5 } });
    }, root);
    return () => { context.revert(); lenis.destroy(); gsap.ticker.remove(tick); AOS.refreshHard(); };
  }, [entered]);
 
  useEffect(() => {
    if (!powered) return;
    const timeline = gsap.timeline();
    timeline.set(".tv-glass", { background: "var(--cream)" })
      .fromTo(".crt-beam", { scaleX: 0, scaleY: 0.04, opacity: 1 }, { scaleX: 1, duration: 0.24, ease: "power4.out" })
      .to(".crt-beam", { scaleY: 1, opacity: 0, duration: 0.35 })
      .fromTo(".broadcast", { opacity: 0 }, { opacity: 1, duration: 0.25 })
      .fromTo(".broadcast > *", { y: 14, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.14, duration: 0.45 });
  }, [powered]);
 
  const enterInvitation = () => {
    if (!powered) return;
    song.play();
    gsap.timeline({ onComplete: () => { setEntered(true); window.scrollTo(0, 0); } })
      .to(".tv-shell", { scale: 1.18, duration: 0.45, ease: "power2.in" })
      .to(".opening", { clipPath: "inset(50% 0 50% 0)", duration: 0.32, ease: "power4.in" });
  };
 
  const placeholderLink = (kind: string, url: string) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
    else { setNotice(`Add the ${kind} link in DETAILS to activate this.`); window.setTimeout(() => setNotice(""), 3500); }
  };
 
  return <div ref={root} className="invitation-shell">
    {!entered && <section className="opening" aria-label="Switch on the 90s television">
      <img src={tvRoom} width={1536} height={1024} alt="A colourful 1990s Pakistani family room with a vintage television" className="opening-room" />
      <div className="opening-shade" />
      <div className={`tv-shell ${powered ? "is-on" : ""}`}>
        <button className="tv-glass" onClick={enterInvitation} disabled={!powered} data-cursor="ENTER THE PARTY" aria-label={powered ? "Enter the Dholki invitation" : "Television is off"}>
          {!powered ? <div className="off-message"><span>TV BAND KAR HAI...</span><strong>CHALO DHOLKI LAGATE HAIN!</strong></div> : <div className="broadcast">
            <span>SPECIAL TRANSMISSION</span><strong>DHOLKI NIGHT</strong><em>COMING SOON...</em><div className="channel-line" /><h1>{DETAILS.bride} KI DHOLKI</h1><p>ORGANISED WITH LOVE BY HER THREE SISTERS</p><small>CLICK THE SCREEN TO ENTER</small>
          </div>}
          <span className="crt-beam" /><span className="scanlines" />
        </button>
        <div className="tv-controls"><span className={`power-light ${powered ? "on" : ""}`} /><span>PAK VISION 90</span><div className="tv-dials"><i /><i /></div></div>
      </div>
      <button className="remote" onClick={() => { setPowered(true); song.play(); }} disabled={powered} data-cursor="POWER ON" aria-label="Turn on television"><Power /><span>{powered ? "ON AIR" : "POWER"}</span></button>
    </section>}
 
    {entered && <main>
      <section className="hero-scene" data-scene>
        <img src={celebration} width={1536} height={1024} alt="A vibrant Pakistani courtyard decorated for a Dholki night" className="hero-bg" />
        <div className="hero-wash" />
        <div className="hero-copy">
          <p className="urdu hero-urdu" dir="rtl" data-gsap>سنیے سنیے!</p>
          <h1 data-gsap><span>DHOLKI KI RAAT,</span><br />YAADON KE SAATH</h1>
          <p className="urdu hero-urdu small" dir="rtl" data-gsap>ڈھولکی کی رات آ رہی ہے!</p>
          <div className="invite-strip" data-gsap>YOU'RE INVITED TO {DETAILS.bride.toUpperCase()}'S DHOLKI</div>
          <h2 data-gsap>{DETAILS.bride} <b>&</b> {DETAILS.groom}</h2>
          <p className="hero-note" data-gsap>With hearts full of happiness, we invite you to join us for a fun-filled Dholki night, with music, laughter and memories to cherish.</p>
          <p className="hosted" data-gsap>Hosted with love by her three sisters.</p>
        </div>
        <a className="scroll-tab" href="#radio"><span>TURN UP THE NOSTALGIA</span><ChevronRight /></a>
      </section>
 
      <section id="radio" className="radio-scene scene" data-scene>
        <div className="pattern-wall" />
        <div className="scene-intro" data-gsap><span className="kicker">ON AIR • 98.{station + 1} FM</span><h2>DHOLKI NIGHT FM</h2><p className="urdu" dir="rtl">آج کی شام، ڈھولکی کے نام!</p></div>
        <div className="radio-wrap" data-gsap>
          <div className="radio-body">
            <div className="speaker-grill">{Array.from({length: 56}).map((_, i) => <i key={i} />)}</div>
            <div className="radio-panel"><div className="radio-display"><b>{stations[station]}</b><span>98.{station + 1} MHZ</span></div><div className="equalizer">{Array.from({length: 12}).map((_, i) => <i key={i} style={{height: `${22 + ((i * 17 + station * 13) % 54)}%`}} />)}</div></div>
            <label className="tuner" data-cursor="TUNE IN"><span>TUNE</span><input aria-label="Tune Dholki radio" type="range" min="0" max="2" step="1" value={station} onChange={(e) => setStation(Number(e.target.value))} /></label>
          </div>
          <div className="fabric-shadow" />
        </div>
      </section>
 
      <section className="sisters-scene scene" data-scene>
        <header data-gsap><span className="kicker">HOSTED WITH LOVE</span><h2>THREE SISTERS.<br />ONE BIG DHOLKI NIGHT!</h2><p className="urdu" dir="rtl">تین بہنیں، ڈھیر ساری خوشیاں!</p></header>
        <div className="photo-row">{sisters.map((item, index) => <button key={item.name} className={`sister-photo photo-${index + 1} ${sister === index ? "revealed" : ""}`} onClick={() => setSister(sister === index ? null : index)} data-cursor="FLASH!">
          <span className="photo-placeholder"><img src={item.image} width={816} height={816} loading="lazy" alt={`${item.name} at a colourful Dholki celebration`} /></span><strong>{item.name}</strong><em>{sister === index ? item.caption : "CLICK TO REVEAL"}</em><span className="flash-pop" />
        </button>)}</div>
        <p className="sister-note" data-aos="fade-in">Three sisters, the bride and groom — making one joy-filled evening together.</p>
      </section>
 
      <section className="beat-scene scene" data-scene>
        <img src={instruments} width={1280} height={960} loading="lazy" alt="A decorated Pakistani dhol and dafli on bright textiles" className="beat-photo" />
        <div className="beat-copy" data-gsap><span className="kicker">LET THE BEATS BEGIN</span><p className="urdu" dir="rtl">ڈھول بجے گا، سب ناچیں گے!</p><h2>GET READY FOR<br />SOME DHOLKI FUN!</h2>
          <div className="instrument-buttons"><button className="beat-button" data-cursor="BEAT IT" onClick={() => setBeat((v) => v + 1)}><Volume2 /> TAP THE DHOL</button><button className={`dafli-button ${dafli ? "shaking" : ""}`} data-cursor="SHAKE IT" onClick={() => {setDafli(true); window.setTimeout(() => setDafli(false), 700)}}><Sparkles /> SHAKE THE DAFLI</button></div>
          <div key={beat} className={beat ? "beat-ripple active" : "beat-ripple"}><i /><i /><i /></div>
        </div>
      </section>
 
      <section className="sweets-scene scene" data-scene>
        <div className="sweet-photo-wrap" data-gsap><img src={batashe} width={1280} height={960} loading="lazy" alt="A festive tray filled with traditional batashe sweets" /><span className="film-stamp">FAMILY ALBUM • '96</span></div>
        <div className="sweet-copy" data-gsap><p className="urdu" dir="rtl">مٹھاس بھی، خوشیاں بھی!</p><h2>A LITTLE<br />SWEETNESS</h2><p>FOR A NIGHT FULL OF MEMORIES.</p></div>
      </section>
 
      <section className="calendar-scene scene" data-scene>
        <div className="calendar-sheet" data-gsap><div className="calendar-rings"><i /><i /><i /><i /></div><span>SAVE THE DATE</span><strong>{DETAILS.date}</strong><div className="calendar-grid">{"SMTWTFS".split("").map((d, index) => <b key={`${d}-${index}`}>{d}</b>)}{Array.from({length: CALENDAR_FIRST_WEEKDAY}).map((_, i) => <i key={`blank-${i}`} className="empty" />)}{Array.from({length: CALENDAR_DAYS_IN_MONTH}).map((_, i) => <i key={i} className={i + 1 === EVENT_DAY ? "circled" : ""}>{i + 1}</i>)}</div><p className="urdu" dir="rtl">یہ شام یادگار ہونے والی ہے!</p></div>
        <div className="calendar-side" data-gsap><span>MARK IT</span><h2>ONE NIGHT.<br />MANY MEMORIES.</h2><p>No countdown. Just count on music, laughter, and very loud clapping.</p></div>
      </section>
 
      <section className="clock-scene scene" data-scene>
        <div className="clock-room"><div className="wall-clock" data-gsap><div className="clock-face"><span className="n n12">12</span><span className="n n3">3</span><span className="n n6">6</span><span className="n n9">9</span><i className="clock-hour"/><i className="clock-minute"/><b /></div></div><div className="clock-copy" data-gsap><span className="kicker">TICK TOCK</span><h2>TIME TO<br />GET READY!</h2><strong>{DETAILS.time}</strong><p className="urdu" dir="rtl">دیر مت کیجیے گا!</p></div></div>
      </section>
 
      <section className="venue-scene scene" data-scene>
        <div className="venue-track"><div className="house h1"><i/><i/><b/></div><div className="house h2"><i/><i/><b/></div><div className="house h3"><i/><i/><b/></div><div className="wire w1"/><div className="wire w2"/><span className="arrow a1">➜</span><span className="arrow a2">➜</span><span className="bulbs">● · ● · ● · ● · ● · ●</span></div>
        <div className="venue-sign" data-gsap><span>DHOLKI THIS WAY!</span><h2>{DETAILS.venue}</h2><p>{DETAILS.location}</p><button onClick={() => placeholderLink("map", DETAILS.mapUrl)} data-cursor="LET'S GO"><MapPin /> SHOW ME THE WAY</button></div>
      </section>
 
      <section className="camera-scene scene" data-scene>
        <div className="camera-copy" data-gsap><span className="kicker">FAMILY WALE MOMENTS</span><h2>PRESS. FLASH.<br />YAADGAAR.</h2><p>One click, one flash, and a Dholki memory for the family album.</p></div>
        <div className="camera-stage" data-gsap><button className="camera-body" onClick={() => {setPhoto(false); window.setTimeout(() => setPhoto(true), 90)}} data-cursor="SNAP" aria-label="Take a nostalgic photo"><span className="camera-lens"><i /></span><span className="camera-flash"/><b>CLICK 90</b></button><div className={`developing-photo ${photo ? "developed" : ""}`}><span><img src={crew} width={816} height={816} loading="lazy" alt="A nostalgic Dholki crew memory" /></span><strong>DHOLKI CREW • '26</strong></div></div>
        <div className={`screen-flash ${photo ? "pop" : ""}`} />
      </section>
 
      <section className="cassette-scene scene" data-scene>
        <div className="threads-fallback" aria-hidden="true"><i/><i/><i/><i/><i/></div>
        <div className="cassette-copy" data-gsap><span className="kicker">SIDE A • SHAADI HITS</span><h2>{DETAILS.bride}'S<br />DHOLKI MIX</h2><p className="urdu" dir="rtl">گانے بھی ہوں گے، تالیاں بھی!</p></div>
        <div className={`cassette-player ${playing ? "playing" : ""}`} data-gsap><div className="cassette"><div className="cassette-label"><b>DHOLKI MIX</b><span>90 MIN</span></div><div className="cassette-window"><i/><i/><span/></div></div><div className="deck-eq">{Array.from({length: 14}).map((_, i) => <i key={i} />)}</div><div className="deck-controls"><button onClick={song.stop} aria-label="Rewind"><Rewind /></button><button onClick={song.toggle} data-cursor="PLAY" aria-label={playing ? "Pause cassette" : "Play cassette"}>{playing ? <Pause/> : <Play/>}</button><button onClick={song.stop} aria-label="Stop"><RotateCcw /></button><button onClick={song.play} aria-label="Fast forward"><FastForward /></button></div></div>
        {playing && <div className="mix-message">LET THE DHOLKI VIBES BEGIN!</div>}
      </section>
 
      <section className="note-scene scene" data-scene>
        <div className="paper-note" data-gsap><div className="tape tape-one"/><div className="tape tape-two"/><span className="sticker">DHOLKI!</span><p className="urdu" dir="rtl">محبت سے بلایا ہے، ضرور آئیے گا!</p><h2>We would love to celebrate this special evening with you.</h2><div className="doodle">♫ ◌ ✿ ◌ ♫</div></div>
      </section>
 
      <section className="finale scene" data-scene>
        <img src={celebration} width={1536} height={1024} loading="lazy" alt="A joyful Pakistani Dholki celebration ready for guests" className="finale-bg"/><div className="finale-wash"/><div className="finale-copy"><p className="urdu" dir="rtl" data-gsap>ڈھولکی کی رات، خوشیوں کے ساتھ!</p><h2 data-gsap>{DETAILS.bride}<b>&</b>{DETAILS.groom}</h2><div className="date-tape" data-gsap>{DETAILS.date} · {DETAILS.time}</div><h3 data-gsap>WE CAN'T WAIT TO CELEBRATE WITH YOU!</h3><p data-gsap>WITH LOVE, THE BRIDE, THE GROOM & HER THREE SISTERS</p><p data-gsap>Invite Credits</p><div className="social-links" data-gsap><button onClick={() => placeholderLink("Instagram", DETAILS.instagramUrl)}><Instagram/> FOLLOW ON INSTAGRAM</button><button onClick={() => placeholderLink("WhatsApp", DETAILS.whatsappUrl)}><span className="wa">W</span> CHAT ON WHATSAPP</button></div></div>
      </section>
    </main>}
    {notice && <div className="edit-notice" role="status">{notice}</div>}
    {entered && song.ready && <button className={`song-fab ${playing ? "playing" : ""}`} onClick={song.toggle} data-cursor={playing ? "PAUSE" : "PLAY"} aria-label={playing ? "Pause music" : "Play music"}>{playing ? <Volume2 /> : <Volume />}</button>}
    <CustomCursor />
  </div>;
}
 
function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (event: MouseEvent) => gsap.to(cursor.current, { x: event.clientX, y: event.clientY, duration: 0.18, ease: "power3.out" });
    const over = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor], button, a");
      if (!cursor.current) return;
      cursor.current.dataset["label"] = target?.dataset["cursor"] ?? (target ? "CLICK" : "");
      cursor.current.classList.toggle("active", Boolean(target));
    };
    window.addEventListener("mousemove", move); document.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); };
  }, []);
  return <div ref={cursor} className="custom-cursor"><span>✦</span></div>;
}
 