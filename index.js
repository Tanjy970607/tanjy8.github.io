// Je Yen Tan - Freelancer Portfolio Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  initTypingAnimation();
  initTranslationSwitcher();
  initSlideCarousel();
  initQuoteEstimator();
  initContactForm();
  initScrollRevealFallback();
  initChatbotWidget();
  initWorkstationMockup();
});

// 1. Typing Animation
function initTypingAnimation() {
  const words = [
    "data cleanup",
    "PowerPoint slide design",
    "English-Chinese-Malay translation",
    "Python data support"
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
  const slideCounter = document.getElementById('slide-counter');
  const slideDots = document.querySelectorAll('.slide-dot');
  
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
    if (slideCounter) {
      slideCounter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    }
    slideDots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === currentIndex);
    });
  }

  if (arrowLeft) {
    arrowLeft.addEventListener('click', () => goToSlide(currentIndex - 1));
  }
  if (arrowRight) {
    arrowRight.addEventListener('click', () => goToSlide(currentIndex + 1));
  }
  slideDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = Number(dot.getAttribute('data-slide'));
      if (!Number.isNaN(slideIndex)) {
        goToSlide(slideIndex);
      }
    });
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  }

  goToSlide(0);
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

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nProject details:\n${message}`
    );
    window.location.href = `mailto:jeyentan@gmail.com?subject=${subject}&body=${body}`;
    form.reset();
  });
}

// 6. Scroll Reveal Fallback
function initScrollRevealFallback() {
  if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    const revealElements = document.querySelectorAll(
      '.quality-strip, .service-item, .translator-panel, .slider-container, .estimator-layout, .contact-container'
    );
    
    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => {
      el.classList.add('scroll-reveal-init');
      observer.observe(el);
    });
  }
}

// 7. Portfolio Chatbot Widget
function initChatbotWidget() {
  const widget = document.getElementById('chat-widget');
  const trigger = document.getElementById('chat-trigger');
  const closeBtn = document.getElementById('chat-close');
  const sendBtn = document.getElementById('chat-send-btn');
  const inputField = document.getElementById('chat-input');
  const messagesContainer = document.getElementById('chat-messages');

  if (!widget || !trigger || !closeBtn || !sendBtn || !inputField || !messagesContainer) return;

  // 1. Session Setup
  let sessionId = localStorage.getItem('chat_session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
    localStorage.setItem('chat_session_id', sessionId);
  }

  // 2. Load History
  let chatHistory = [];
  try {
    const saved = localStorage.getItem('chat_history');
    if (saved) {
      chatHistory = JSON.parse(saved);
      chatHistory.forEach(msg => {
        appendMessage(msg.sender, msg.text, false);
      });
    }
  } catch (e) {
    console.error('Failed to load chat history', e);
  }

  // 3. Toggle Panel
  trigger.addEventListener('click', () => {
    widget.classList.add('active');
    inputField.focus();
    scrollToBottom();
  });

  closeBtn.addEventListener('click', () => {
    widget.classList.remove('active');
  });

  // 4. Send Message
  async function handleSend() {
    const text = inputField.value.trim();
    if (!text) return;

    inputField.value = '';
    appendMessage('visitor', text, true);
    showTypingIndicator();

    try {
      const endpoint = window.PORTFOLIO_CHAT_ENDPOINT;

      if (!endpoint) {
        hideTypingIndicator();
        appendMessage(
          'agent',
          'Thanks. For the fastest reply, use the contact form or email jeyentan@gmail.com with your files, deadline, and expected output.',
          true
        );
        return;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message: text })
      });
      
      hideTypingIndicator();
      const data = await response.json();
      
      if (data.ok && data.reply) {
        appendMessage('agent', data.reply, true);
      } else {
        appendMessage('agent', "Thanks for your message! I'm having trouble connecting to Je Yen's server right now, but he has been notified and will get back to you shortly.", true);
      }
    } catch (err) {
      console.error(err);
      hideTypingIndicator();
      appendMessage('agent', "I'm currently offline and unable to connect to Je Yen's local server. Please reach him directly at jeyentan@gmail.com!", true);
    }
  }

  sendBtn.addEventListener('click', handleSend);
  inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  // 5. Short Polling Loop for human replies from Discord
  async function pollForReplies() {
    if (!widget.classList.contains('active') || !window.PORTFOLIO_CHAT_POLL_ENDPOINT) return;
    try {
      const response = await fetch(`${window.PORTFOLIO_CHAT_POLL_ENDPOINT}?session_id=${encodeURIComponent(sessionId)}`);
      const data = await response.json();
      if (data.ok && data.replies && data.replies.length > 0) {
        data.replies.forEach(reply => {
          appendMessage('agent', reply.text, true);
        });
      }
    } catch (e) {
      // Ignore polling errors quietly when offline
    }
  }

  // Poll every 4 seconds
  setInterval(pollForReplies, 4000);

  // 6. Helpers
  function appendMessage(sender, text, save = true) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'visitor' ? 'visitor-msg' : 'agent-msg');
    msgDiv.textContent = text;
    
    // Remove typing indicator if present and append before it
    const indicator = messagesContainer.querySelector('.typing-indicator');
    if (indicator) {
      messagesContainer.insertBefore(msgDiv, indicator);
    } else {
      messagesContainer.appendChild(msgDiv);
    }

    scrollToBottom();

    if (save) {
      chatHistory.push({ sender, text, timestamp: Date.now() });
      localStorage.setItem('chat_history', JSON.stringify(chatHistory));
    }
  }

  function showTypingIndicator() {
    if (messagesContainer.querySelector('.typing-indicator')) return;
    const indicatorDiv = document.createElement('div');
    indicatorDiv.classList.add('typing-indicator');
    indicatorDiv.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    messagesContainer.appendChild(indicatorDiv);
    scrollToBottom();
  }

  function hideTypingIndicator() {
    const indicator = messagesContainer.querySelector('.typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

// 8. Workstation Mockup Animation
function initWorkstationMockup() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const lid = document.querySelector('.laptop-lid');
    if (lid) lid.style.transform = 'rotateX(0deg)';
    return;
  }

  setTimeout(() => {
    const lid = document.querySelector('.laptop-lid');
    if (lid) {
      lid.style.transform = 'rotateX(0deg)';
    }
  }, 600);

  window.addEventListener('scroll', () => {
    const mockup = document.getElementById('workstation-preview');
    if (!mockup) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const lift = Math.min(24, scrollTop * 0.035);
    const rotateZ = -7 + Math.min(5, scrollTop * 0.004);
    mockup.style.transform = `rotateX(${58 - lift}deg) rotateZ(${rotateZ}deg) translateY(${Math.min(22, scrollTop * 0.03)}px)`;
  });
}
