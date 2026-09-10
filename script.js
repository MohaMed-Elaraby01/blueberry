const messageText = `هلووززز بمنة وسماء حبيباتي
انا يسماء كدبت عليكي على اني هنام دلوقتي اللي هي الساعة كانت 12 انا بسهر حبة واهلي كلهم صاحيين جنبي اهم
واخويا محمد مستني اخلص الرسالة عشان يحطها هو عارف حالتي وكلهم لحد دلوقتي مصدومين من اني مريضة سرطان وامراض تانية، في منهم اللي منكد واللي بيعيط واللي بيحاول يضحكني

تعالو تعالو هفضفض معاكم وهقولكم حالتهم 
امي منكدة
اخويا الكبير احمد في الشغل عشان ميترفدش
محمد قاعد جنبي اهو وحاضني
حازم قاعد جنب شهاب منكدين

اما انا ف مبسوطة بعيلتي و بيكم

يمنةةةةة خدي بالك من نفسك واوعي تزعلي وقولي لمعاذ لو زعلك تقى هتشتكيه لربنا

ويا سماء اضحكي اضحكي انا عايشة اكيد ومعاكي دلوقتي

كدا كدا يعني اكيد هكون معاكم ومش هسيبكم صح يخواتي؟

منة سماء حبيبتك وبتحبك
سماء منة حبيبتك وبتحبك برضو

تقى منة وسماء بيحبوكي اوي . . . __HIDDEN__

تعالو نضحك شوية بيقولكم كان مرة في كلب دخل المطعم كل حتة لحمة مسمومة مات اصحاب الكلب لقوه كتبو على تربته كان مرة في كلب دخل المطعم كل حتة لحمة مسمومة مات اصحاب الكلب لقوه كتبو ع..... هيهيهيهيههيهيهي

انا حبيتكو اوي

وطبعا موصكمش لو انا لا قدر الله مت عندكم اخواتي كلهم اطلبو اللي تحتاجوه وهم تحت امركم تمام؟


أنا نفسي اكمل كتابة بس تعبانة اوي فهقفل بقى بحبكم وإن شاء الله مش هندم اني مكتبتش تاني لاني هعيش واقعد معاكم 


ودي صورة الاغنية الحلوةةة و صورتي وانا بضحككك يلا هدي لاخويا بقى يظبط الضنيا

اخويا بيقولي 

صورتك من حلاوتها فيها مشكلة ومش بترضى تترفع على الموقع 😂🙂
بحبكم 

 
`;
const hiddenText = "طب ما انا تقى يهبلة بتقولي ايه عارفة";
const wordDelay = 400;
const afterMessageDelay = 1000;

const message = document.getElementById("message");
const photoFrame = document.getElementById("photoFrame");
const photo = document.getElementById("photo");

function buildMessage(text){
  message.textContent = "";

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
  // المربع عنصر في نفس تسلسل الكلمات، لذلك يظهر عند مكانه الحقيقي.
  const sequence = [...message.querySelectorAll(".word, .hidden-spoiler")];
  const spoiler = message.querySelector(".hidden-spoiler");

  sequence.forEach((item,index)=>{
    setTimeout(()=>{
      if(item === spoiler){
        // يظهر المربع الرمادي فقط، والنص داخله يظل مخفيًا تمامًا.
        item.classList.add("ready");
      }else{
        item.classList.add("visible");
      }
    }, index * wordDelay);
  });

  const last = Math.max(0,(sequence.length - 1) * wordDelay);

  setTimeout(()=>{
    photoFrame.classList.add("show");
    photoFrame.setAttribute("aria-hidden","false");
  }, last + 500 + afterMessageDelay);
}

photo.addEventListener("error",()=>photoFrame.remove());

buildMessage(messageText);
startTyping();