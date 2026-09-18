const messageText = ` بحبكم، هتوحشوني أوي 






💔
.
.
.


عايزين تعرفوا اللي في قلبي كله؟

هتعرففوه بأغنيتين حرفيًا

الأولى هي أغنية لأصالة إسمها "60 دقيقة حياة"
التانية أغنية مش عارفة لمين بس عاجباني، حسيتها لمست قلبي إسمها "أساهر ليلي في طيفي"
بجد ركزوا في كل كلمة،.... 





هههه إنها تمطر. . . 😭💔



واثقة إني هشوفكم كتير لسة

ودي صورتي اخدتها قبل يوم العملية بعد ما قلتلكم إني ولد هههههههه 

الصورة أنا طالعة فيها بشعري وكل حاجة محدش يشوفها غيركم..............

__HIDDEN__

بحبكم في الله 😭❤️

`;
const hiddenText = "ومش ناقصة تنمر والله المرض بهدلني، وعارفة إن مكانش هيجي على بالكم تنمر اصلا ههههههه
";
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