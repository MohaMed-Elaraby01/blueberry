const messageText = ` بما ان النهارده يوم ميلادي فحابة اقول لشوية العسل دول اني بحبهم اوي اوي اوي 😭😭❤️❤️ بجد مش عارفة انتوا عملتوا فيا ايه ولا ازاي بقيتوا قريبين مني بالشكل ده مع اني عمري ما شوفتكم ولا اتقابلنا بس والله انتوا بالنسبالي مش مجرد صحاب نت انتوا اخواتي بجد ويمكن اكتر كمان 😭❤️❤️

انا مبسوطة انكم في حياتي اوي ومش متخيلة ان يومي يعدي من غير رغاويكم وخناقكم وهبلكم اللي بيجيبلي الضغط 😂😂😭 بجد انتوا من اجمل الحاجات اللي حصلتلي ومهما اتكلمت مش هعرف اوصف انتوا غاليين عندي قد ايه 😭💗💗

يعني تخيلوا اني بكلم شوية عيال معرفش شكلهم ايه في الحقيقة ومع ذلك واخدين حتة من قلبي ومش عارفة استردها منهم لحد دلوقتي 😭😭😂😂❤️❤️ ربنا يسامحكم على احتلال القلب ده والله 😂💋

بس بجد بعيدا عن الهزار انا بحبكم اوي ومبسوطة اني عرفتكم وان ربنا جمعني بيكم حتى لو من ورا الشاشات انتوا بقيتوا جزء من يومي ومن حياتي ومش مجرد ناس بكلمهم وخلاص انتوا ناس فارقة معايا بجد وزعلكم يزعلني وفرحتكم تفرحني ودايما بتمنى اشوفكم مبسوطين ❤️🫂

ويا رب افضل كل سنة الاقيكم معايا ونفضل نهزر ونضحك ونرخم على بعض ونفضل عيال مجانين كده ومحدش فينا يختفي ويعمل فيها غامض عشان هطلع دين امه 😂😂😂😭❤️

بحبكم يا احلى اخوات مجانين في الدنيا ويا رب متحرمنش منكم ابدا حتى لو انتوا ابتلاء من الابتلاءات اللي ربنا رزقني بيها 😂😂❤️❤️❤️😭😭
قاعدة بكتب الرسالة من غير ما حد يشوفها وهفضل جنب اخويا وهي بيحطها عشان اتأكد انه مش هيشوفها مع اني عارفة انه مش هيشوفها بس هقف برضو 😂💗💗🐍

__HIDDEN__
`;
const hiddenText = `آي لوففف يوووو سوووو ماااااتشششش`;
const wordDelay = 90;
const afterMessageDelay = 1000;

const message = document.getElementById("message");
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicToggleLabel = document.getElementById("musicToggleLabel");

music.volume = 0.18;
music.loop = true;
music.preload = "auto";
music.autoplay = true;
let userChoseMusic = false;

function updateMusicButton() {
  const playing = !music.paused;
  musicToggleLabel.textContent = playing ? "إيقاف" : "بدأ";
  musicToggle.setAttribute("aria-label", playing ? "إيقاف" : "بدأ");
  musicToggle.setAttribute("aria-pressed", String(playing));
  musicToggle.classList.toggle("is-playing", playing);
}

// محاولة التشغيل فور فتح الصفحة. قرار السماح بالتشغيل التلقائي يرجع للمتصفح.
function tryAutoplay() {
  if (userChoseMusic) return;
  if (music.paused) {
    const result = music.play();
    if (result && typeof result.catch === "function") result.catch(updateMusicButton);
  }
}

music.addEventListener("play", updateMusicButton);
music.addEventListener("pause", updateMusicButton);
music.addEventListener("ended", () => {
  music.currentTime = 0;
  music.play().catch(updateMusicButton);
});

let typingStarted = false;

musicToggle.addEventListener("click", () => {
  userChoseMusic = true;

  // تبدأ الرسالة مرة واحدة فقط عند أول ضغطة على زر الموسيقى.
  if (!typingStarted) {
    typingStarted = true;
    buildMessage(messageText);
    startTyping();
  }

  if (music.paused) {
    music.play().then(updateMusicButton).catch(updateMusicButton);
  } else {
    music.pause();
    updateMusicButton();
  }
});

tryAutoplay();
["loadedmetadata", "loadeddata", "canplay", "canplaythrough"].forEach(eventName => {
  music.addEventListener(eventName, tryAutoplay);
});
window.addEventListener("pageshow", tryAutoplay);
const autoplayRetry = setInterval(() => {
  if (!music.paused) {
    clearInterval(autoplayRetry);
    return;
  }
  tryAutoplay();
}, 1200);
setTimeout(() => clearInterval(autoplayRetry), 20000);
updateMusicButton();

// Subtle, randomly spaced twinkles in the background.
const sparkles = document.getElementById("sparkles");
for (let i = 0; i < 34; i++) {
  const dot = document.createElement("span");
  dot.className = "sparkle";
  dot.style.left = `${Math.random() * 100}%`;
  dot.style.top = `${Math.random() * 100}%`;
  dot.style.setProperty("--duration", `${4 + Math.random() * 5}s`);
  dot.style.setProperty("--delay", `${Math.random() * 6}s`);
  dot.style.setProperty("--shine", `${0.15 + Math.random() * 0.3}`);
  sparkles.appendChild(dot);
}

function buildMessage(text){
  message.textContent = "";
  message.scrollTop = 0;
  text = text.trimStart();

  for(const part of text.split(/(\s+)/)){
    if(/\s+/.test(part)){
      const s = document.createElement("span");
      s.className = "space";
      s.textContent = part;
      message.appendChild(s);
    }else if(part){
      if(part === "__HIDDEN__"){
        const spoiler = document.createElement("span");
        spoiler.className = "hidden-spoiler";
        spoiler.setAttribute("role","button");
        spoiler.setAttribute("tabindex","0");
        spoiler.setAttribute("aria-label","اضغط لإظهار النص المخفي");
        spoiler.textContent = hiddenText;

        const reveal = () => spoiler.classList.toggle("revealed");
        spoiler.addEventListener("click", reveal);
        spoiler.addEventListener("keydown", e => {
          if(e.key === "Enter" || e.key === " "){
            e.preventDefault();
            reveal();
          }
        });

        message.appendChild(spoiler);
      }else{
        const w = document.createElement("span");
        w.className = "word";
        w.textContent = part;
        message.appendChild(w);
      }
    }
  }
}

function startTyping(){
  const sequence = [...message.querySelectorAll(".word, .space, .hidden-spoiler")];
  const spoiler = message.querySelector(".hidden-spoiler");
  let followLatestMessage = true;
  let touchStartY = null;

  // ابدأ من أعلى الرسالة تمامًا. لا تعتمد على scrollHeight لأن الكلمات المخفية
  // تشغل مساحة من البداية؛ مرّر فقط عندما الكلمة الظاهرة الجديدة تخرج أسفل البابل.
  message.scrollTop = 0;
  requestAnimationFrame(() => { message.scrollTop = 0; });
  const scrollToLatest = (item) => {
    if (!followLatestMessage || !item) return;
    const messageRect = message.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    if (itemRect.bottom > messageRect.bottom - 2) {
      message.scrollTop += itemRect.bottom - messageRect.bottom + 8;
    }
  };

  // أي محاولة يدوية للتمرير توقف المتابعة التلقائية.
  message.addEventListener("wheel", () => { followLatestMessage = false; }, { passive: true });
  message.addEventListener("touchstart", e => {
    touchStartY = e.touches.length ? e.touches[0].clientY : null;
  }, { passive: true });
  message.addEventListener("touchmove", e => {
    if (touchStartY !== null && e.touches.length && Math.abs(e.touches[0].clientY - touchStartY) > 4) {
      followLatestMessage = false;
    }
  }, { passive: true });
  message.addEventListener("pointerdown", () => {
    // لا نوقف المتابعة بمجرد اللمس؛ فقط عند استخدام وسيلة تمرير فعلية أدناه.
  }, { passive: true });
  message.addEventListener("keydown", e => {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) {
      followLatestMessage = false;
    }
  });
  message.addEventListener("scroll", () => {
    // scrollTop يختلف هنا فقط إذا المستخدم مرّر بنفسه أو عند استدعاء scrollToLatest.
  }, { passive: true });

  sequence.forEach((item,index)=>{
    setTimeout(()=>{
      if(item === spoiler){
        item.classList.add("ready");
      }else if(item.classList.contains("space")){
        item.classList.add("visible-space");
      }else{
        item.classList.add("visible");
      }
      requestAnimationFrame(() => scrollToLatest(item));
    }, index * wordDelay);
  });
}
