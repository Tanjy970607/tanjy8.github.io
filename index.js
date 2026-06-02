// Je Yen Tan - Freelancer Portfolio Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  initTypingAnimation();
  initTranslationSwitcher();
  initSlideCarousel();
  initQuoteEstimator();
  initContactForm();
});

// 1. Typing Animation
function initTypingAnimation() {
  const words = [
    "Data Entry Specialist",
    "PowerPoint (PPT) Designer",
    "English-Chinese-Malay Translator",
    "Python Data Scientist"
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenWords = 2000;
  const textElement = document.getElementById('typing-text');
  
  if (!textElement) return;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      textElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, delayBetweenWords);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    }
  }

  type();
}

// 2. Translation Switcher
const TRANSLATION_DATA = {
  welcome: {
    en: "Welcome to our platform! We are excited to collaborate with you to deliver high-quality data science and translation results.",
    zh: "欢迎来到我们的平台！我们非常高兴能与您合作，为您提供高质量的数据科学与翻译成果。",
    ms: "Selamat datang ke platform kami! Kami sangat teruja untuk bekerjasama dengan anda bagi menyampaikan hasil sains data dan terjemahan yang berkualiti tinggi."
  },
  instructions: {
    en: "Please compile all data files into a single Excel sheet and review the scope guidelines before submitting the final task request.",
    zh: "请将所有数据文件汇总到一个 Excel 工作表中，并在提交最终任务请求前仔细阅读范围指南。",
    ms: "Sila susun semua fail data ke dalam satu helaian Excel dan semak garis panduan skop sebelum menghantar permintaan tugasan akhir."
  },
  completion: {
    en: "The project deliverables have been successfully validated. All code routines run within optimal guidelines and are ready for deployment.",
    zh: "项目交付物已成功通过验证。所有代码程序均在最佳指南内运行，已准备好进行部署。",
    ms: "Bahan serahan projek telah berjaya disahkan. Semua rutin kod berjalan mengikut garis panduan optimum dan sedia untuk digunakan."
  }
};

function initTranslationSwitcher() {
  const phraseButtons = document.querySelectorAll('.phrase-btn');
  const sourceText = document.getElementById('source-text');
  const targetZh = document.getElementById('target-zh');
  const targetMs = document.getElementById('target-ms');

  if (!sourceText || !targetZh || !targetMs) return;

  function updatePhrases(key) {
    const phrase = TRANSLATION_DATA[key];
    if (!phrase) return;

    sourceText.value = phrase.en;
    targetZh.textContent = phrase.zh;
    targetMs.textContent = phrase.ms;
  }

  phraseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      phraseButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute('data-phrase');
      updatePhrases(key);
    });
  });

  // Load default
  updatePhrases('welcome');
}

// 3. PPT Slide Carousel
function initSlideCarousel() {
  const slider = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slide');
  const arrowLeft = document.querySelector('.arrow-left');
  const arrowRight = document.querySelector('.arrow-right');
  
  if (!slider || slides.length === 0) return;

  let currentIndex = 0;

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  if (arrowLeft) {
    arrowLeft.addEventListener('click', () => goToSlide(currentIndex - 1));
  }
  if (arrowRight) {
    arrowRight.addEventListener('click', () => goToSlide(currentIndex + 1));
  }

  // Auto-slide every 5 seconds
  setInterval(() => {
    goToSlide(currentIndex + 1);
  }, 5000);
}

// 4. Quote Estimator
const PRICING_CONFIG = {
  translation: {
    label: "Word Count",
    min: 100,
    max: 10000,
    step: 100,
    default: 1000,
    rate: 0.04, // RM 0.04 per word (approx RM 10/hour equivalent at 250 words/hr)
    suffix: " words"
  },
  ppt: {
    label: "Number of Slides",
    min: 3,
    max: 50,
    step: 1,
    default: 10,
    rate: 5.00, // RM 5.00 per slide (approx RM 10/hour equivalent at 2 slides/hr)
    suffix: " slides"
  },
  data: {
    label: "Data Entries (Records)",
    min: 50,
    max: 5000,
    step: 50,
    default: 500,
    rate: 0.05, // RM 0.05 per record (approx RM 10/hour equivalent at 200 records/hr)
    suffix: " records"
  }
};

const CURRENCY_CONFIG = {
  MYR: { symbol: "RM ", rate: 1.0 },
  USD: { symbol: "$", rate: 0.22 }, // 1 RM = 0.22 USD
  SGD: { symbol: "S$", rate: 0.30 }  // 1 RM = 0.30 SGD
};

function initQuoteEstimator() {
  const selectorButtons = document.querySelectorAll('.selector-btn');
  const currencyButtons = document.querySelectorAll('.currency-btn');
  const sliderLabel = document.getElementById('slider-label');
  const slider = document.getElementById('estimator-slider');
  const sliderVal = document.getElementById('slider-value-display');
  const priceDisplay = document.getElementById('price-value');
  const detailsDisplay = document.getElementById('calc-details-text');

  if (!slider || !priceDisplay) return;

  let currentService = 'translation';
  let currentCurrency = 'MYR';

  function updateConfig(service) {
    currentService = service;
    const config = PRICING_CONFIG[service];
    if (!config) return;

    sliderLabel.textContent = config.label;
    slider.min = config.min;
    slider.max = config.max;
    slider.step = config.step;
    slider.value = config.default;
    
    calculatePrice();
  }

  function calculatePrice() {
    const config = PRICING_CONFIG[currentService];
    if (!config) return;

    const qty = parseInt(slider.value);
    sliderVal.textContent = qty.toLocaleString() + config.suffix;
    
    const costInMYR = qty * config.rate;
    const currencyInfo = CURRENCY_CONFIG[currentCurrency];
    const costConverted = costInMYR * currencyInfo.rate;
    
    priceDisplay.textContent = `${currencyInfo.symbol}${costConverted.toFixed(2)}`;

    let details = "";
    if (currentService === 'translation') {
      details = `Estimated budget for English to Chinese/Malay translation at standard RM ${config.rate.toFixed(2)}/word. Includes proofreading.`;
    } else if (currentService === 'ppt') {
      details = `Estimated budget for premium layout and custom slides at RM ${config.rate.toFixed(2)}/slide. Includes typography alignment.`;
    } else {
      details = `Estimated budget for cleaning, validation, and entry of database records at RM ${config.rate.toFixed(2)}/record.`;
    }
    
    if (currentCurrency !== 'MYR') {
      details += ` (Converted from RM ${costInMYR.toFixed(2)} at approx exchange rate 1 RM = ${currencyInfo.rate} ${currentCurrency})`;
    }
    
    detailsDisplay.textContent = details;
  }

  selectorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectorButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const service = btn.getAttribute('data-service');
      updateConfig(service);
    });
  });

  currencyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currencyButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCurrency = btn.getAttribute('data-currency');
      calculatePrice();
    });
  });

  slider.addEventListener('input', calculatePrice);

  // Initialize defaults
  updateConfig('translation');
}

// 5. Contact Form
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const message = document.getElementById('form-message').value;

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    alert(`Thank you, ${name}! Your inquiry has been sent. Je Yen Tan will get back to you shortly.`);
    form.reset();
  });
}
