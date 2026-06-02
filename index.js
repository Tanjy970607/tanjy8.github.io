// Je Yen Tan - Freelancer Portfolio Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initTypingAnimation();
  initTranslationSwitcher();
  initSlideCarousel();
  initQuoteEstimator();
  initContactForm();
  initScrollRevealFallback();
  initChatbotWidget();
  initWorkstationMockup();
});

// Global Translation Dictionary
const I18N_DICTIONARY = {
  en: {
    // Nav
    "nav-services": "Services",
    "nav-translation": "Translation",
    "nav-carousel": "Slides",
    "nav-estimator": "Estimate",
    "nav-contact": "Contact",
    "nav-cta": "Request quote",
    
    // Hero
    "hero-role": "Independent freelancer in Penang, Malaysia",
    "hero-title": "Precision work for data, decks, translation, and small AI workflows.",
    "hero-desc": "I help clients clean information, translate English, Chinese, and Malay content, shape PowerPoint slides, and turn messy files into usable outputs.",
    "hero-typing-prefix": "Now ready for",
    "hero-btn-primary": "Estimate project",
    "hero-btn-secondary": "View work style",
    
    // Service Rail
    "rail-data": "Data entry",
    "rail-trans": "Translation",
    "rail-slides": "Slide design",
    "rail-python": "Python data",
    
    // Mockup
    "mockup-queue": "Task queue",
    "mockup-status": "Ready for review",
    "mockup-accuracy": "Accuracy",
    "mockup-lang": "Languages",
    
    // Highlights
    "highlight-1-title": "Scope first",
    "highlight-1-desc": "Files, format, deadline, and acceptance criteria are checked before work starts.",
    "highlight-2-title": "Clean output",
    "highlight-2-desc": "Every task is prepared for review, export, or handoff without extra cleanup.",
    "highlight-3-title": "Local workflow",
    "highlight-3-desc": "Data, slides, translation, and small scripts are handled with practical tools.",
    
    // Services Section
    "services-pre": "Services",
    "services-title": "Built for jobs that need accuracy, clear language, and clean presentation.",
    "s1-title": "High-volume data entry",
    "s1-desc": "Spreadsheet cleanup, record entry, duplicate checks, validation, and table formatting for Excel or Google Sheets.",
    "s1-bullet-1": "Data collection and input",
    "s1-bullet-2": "Cleaning and validation",
    "s1-bullet-3": "Excel and Google Sheets",
    
    "s2-title": "Trilingual translation",
    "s2-desc": "Natural translation across English, Chinese, and Malay for documents, websites, business copy, and instructions.",
    "s2-bullet-1": "English",
    "s2-bullet-2": "Chinese",
    "s2-bullet-3": "Bahasa Melayu",
    
    "s3-title": "PowerPoint design",
    "s3-desc": "Business decks, slide cleanup, layout hierarchy, and data visuals for presentations that need to look organized.",
    "s3-bullet-1": "Pitch decks",
    "s3-bullet-2": "Corporate slides",
    "s3-bullet-3": "Charts and visuals",
    
    "s4-title": "Python data science",
    "s4-desc": "Small analysis scripts, pandas workflows, charts, and reports for clients who need quick technical support.",
    "s4-bullet-1": "pandas and NumPy",
    "s4-bullet-2": "Data visualization",
    "s4-bullet-3": "Report support",
    
    // Translation Panel
    "trans-pre": "Translation showcase",
    "trans-title": "Compare meaning across English, Chinese, and Malay.",
    "trans-btn-welcome": "Welcome text",
    "trans-btn-inst": "Instructions",
    "trans-btn-complete": "Completion status",
    "trans-label-en": "English source",
    "trans-label-zh": "Chinese output",
    "trans-label-ms": "Malay output",
    
    // Slides Carousel
    "slides-pre": "PowerPoint slide layouts",
    "slides-title": "Slide structures for business, workflow, and data stories.",
    "slide1-tracker": "MARKET ASSESSMENT",
    "slide1-title": "Regional demand, clear momentum.",
    "slide1-desc": "Analysis of regional growth parameters indicates robust demand curves heading into fiscal year-end, driven by localized operations scaling.",
    "slide1-bullet-1": "Driven by high-volume service localization",
    "slide1-bullet-2": "Verified market size metrics in primary sectors",
    "slide1-bullet-3": "Operational readiness targets met ahead of schedule",
    "slide1-tam": "TAM (Total Addressable Market)",
    "slide1-growth": "↑ 18% YoY growth",
    "slide1-sam": "SAM (Serviceable Market)",
    "slide1-cagr": "↑ 22% CAGR",
    "slide1-chart-title": "PROJECTED SECTOR REVENUE GROWTH (MYR)",
    
    "slide2-tracker": "OPERATIONAL PERFORMANCE",
    "slide2-title": "Highlights with one clean read.",
    "slide2-desc": "Financial summaries show robust operational margins, exceeding baseline parameters for key performance indicators in Q2.",
    "slide2-th-metric": "KPI Metric",
    "slide2-th-perf": "Q2 Performance",
    "slide2-th-target": "Vs Target",
    "slide2-td-rev": "Revenue Growth",
    "slide2-td-ord": "Orders Processed",
    "slide2-td-margin": "Operating Margin",
    "slide2-td-retention": "Retention Rate",
    "slide2-chart-title": "REVENUE DISTRIBUTION BY SERVICE",
    "slide2-donut-center-label": "Target Met",
    "slide2-legend-1": "Translation (38%)",
    "slide2-legend-2": "PPT Design (26%)",
    "slide2-legend-3": "Data Entry (18%)",
    "slide2-legend-4": "Python Data (18%)",
    
    "slide3-tracker": "IMPLEMENTATION ROADMAP",
    "slide3-title": "From cleanup to confident delivery.",
    "slide3-desc": "Step-by-step methodology detailing client data ingestion, cleaning, layout formatting, and automated validation rules.",
    "slide3-badge1": "Phase 1",
    "slide3-card1-title": "Ingestion & Audit",
    "slide3-card1-desc": "Import raw datasets, detect duplicate entries, identify translation ambiguities, and lock slide content briefs.",
    "slide3-card1-b1": "Deduplication & schema audit",
    "slide3-card1-b2": "Source verification checks",
    
    "slide3-badge2": "Phase 2",
    "slide3-card2-title": "Layout & Polish",
    "slide3-card2-desc": "Apply core design systems, translate source materials, design CSS data-charts, and set widescreen slide margins.",
    "slide3-card2-b1": "Typographic hierarchy grids",
    "slide3-card2-b2": "Trilingual translation matching",
    
    "slide3-badge3": "Phase 3",
    "slide3-card3-title": "Verify & Handoff",
    "slide3-card3-desc": "Execute automated unit check scripts, perform keyboard-accessibility review, build Pages zip, and deliver final files.",
    "slide3-card3-b1": "Live server responsiveness checks",
    "slide3-card3-b2": "Direct file package delivery",
    
    // Estimator
    "calc-pre": "Quote estimator",
    "calc-title": "Get a quick starting budget before you message.",
    "calc-service-label": "Select service",
    "calc-opt-translation": "Translation",
    "calc-opt-ppt": "PPT slides",
    "calc-opt-data": "Data entry",
    "calc-qty-label": "Quantity",
    "calc-currency-label": "Select currency",
    "calc-notes-title": "Quote notes",
    "calc-notes-desc": "Final price depends on source quality, deadline, revision count, and whether files need extra cleanup.",
    "calc-output-label": "Estimated budget",
    "calc-check-1": "Custom estimate after details",
    "calc-check-2": "Email-ready inquiry generated below",
    "calc-check-3": "No fake checkout or payment flow",
    
    // Contact & Form
    "contact-pre": "Contact",
    "contact-title": "Send the task details and I will reply with next steps.",
    "contact-label-location": "Location",
    "contact-val-location": "Penang, Malaysia (MYT)",
    "contact-label-services": "Services",
    "contact-val-services": "Translation, data entry, PowerPoint, Python data",
    "form-guide-title": "Best message format",
    "form-guide-desc": "Tell me the service type, source files, target format, deadline, budget range, and what done should look like.",
    "form-label-name": "Your name *",
    "form-label-email": "Your email *",
    "form-label-msg": "Project description *",
    "form-ph-name": "Your name",
    "form-ph-email": "you@example.com",
    "form-ph-msg": "Describe the files, languages, slide count, data rows, deadline, and expected output.",
    "form-submit-btn": "Prepare email inquiry",
    
    // Chatbot
    "chat-title": "Contact assistant",
    "chat-welcome-desc": "Tell me your service type, file format, deadline, and expected output. I can prepare a clean email for Je Yen.",
    "chat-ph-input": "Example: 12-slide deck by Friday",
    "chat-send-btn": "Send"
  },
  zh: {
    // Nav
    "nav-services": "服务项目",
    "nav-translation": "三语翻译",
    "nav-carousel": "幻灯片设计",
    "nav-estimator": "预算估算",
    "nav-contact": "联系我",
    "nav-cta": "获取报价",
    
    // Hero
    "hero-role": "马来西亚槟城独立自由职业者",
    "hero-title": "为您提供精准的数据处理、演示文稿设计、翻译及小型 AI 工作流服务。",
    "hero-desc": "我协助客户清洗数据、提供英中马三语翻译、优化 PowerPoint 幻灯片，并将杂乱的文件转化为规范的输出成果。",
    "hero-typing-prefix": "现已就绪：",
    "hero-btn-primary": "评估项目",
    "hero-btn-secondary": "查看工作风格",
    
    // Service Rail
    "rail-data": "数据录入",
    "rail-trans": "三语翻译",
    "rail-slides": "幻灯片设计",
    "rail-python": "Python 数据",
    
    // Mockup
    "mockup-queue": "任务队列",
    "mockup-status": "已准备好审核",
    "mockup-accuracy": "数据准确率",
    "mockup-lang": "语言能力",
    
    // Highlights
    "highlight-1-title": "明确范围",
    "highlight-1-desc": "在项目启动前，严格确认文件、格式、截止日期和验收标准。",
    "highlight-2-title": "规范交付",
    "highlight-2-desc": "每项任务都已准备好供审查、导出或交接，无需额外的二次清理。",
    "highlight-3-title": "高效工具",
    "highlight-3-desc": "利用实用工具高效处理数据、演示幻灯片、语言翻译和自动化小脚本。",
    
    // Services Section
    "services-pre": "服务项目",
    "services-title": "致力于提供精确、语言清晰且排版整洁的交付成果。",
    "s1-title": "大批量数据录入",
    "s1-desc": "为 Excel 或 Google 表格提供电子表格清洗、记录输入、查重、验证和表格格式化。",
    "s1-bullet-1": "数据收集与录入",
    "s1-bullet-2": "数据清洗与验证",
    "s1-bullet-3": "Excel 与 Google 表格",
    
    "s2-title": "三语翻译",
    "s2-desc": "提供英语、中文和马来语之间自然流畅的翻译，适用于文档、网站、商务文案及说明书。",
    "s2-bullet-1": "英语",
    "s2-bullet-2": "中文",
    "s2-bullet-3": "马来语",
    
    "s3-title": "PowerPoint 设计",
    "s3-desc": "为需要严谨排版的演示文稿提供商业幻灯片、页面美化、排版层级和数据可视化设计。",
    "s3-bullet-1": "路演幻灯片",
    "s3-bullet-2": "企业汇报",
    "s3-bullet-3": "图表与视觉效果",
    
    "s4-title": "Python 数据处理",
    "s4-desc": "为需要快速技术支持的客户提供小型分析脚本、pandas 工作流、数据图表和分析报告。",
    "s4-bullet-1": "pandas 与 NumPy",
    "s4-bullet-2": "数据可视化",
    "s4-bullet-3": "报告技术支持",
    
    // Translation Panel
    "trans-pre": "翻译展示",
    "trans-title": "对比英语、中文和马来语的语言表达与语境含义。",
    "trans-btn-welcome": "欢迎词",
    "trans-btn-inst": "操作说明",
    "trans-btn-complete": "完成状态",
    "trans-label-en": "英文原文",
    "trans-label-zh": "中文译文",
    "trans-label-ms": "马来文译文",
    
    // Slides Carousel
    "slides-pre": "PowerPoint 幻灯片布局",
    "slides-title": "适用于商业演示、业务工作流和数据故事的幻灯片结构。",
    "slide1-tracker": "市场评估",
    "slide1-title": "区域需求旺盛，增长势头明确。",
    "slide1-desc": "对区域增长参数的分析表明，在本地化运营规模扩大的推动下，财政年末的需求曲线强劲。",
    "slide1-bullet-1": "由高负荷本地化服务推动",
    "slide1-bullet-2": "主要行业市场规模指标经过验证",
    "slide1-bullet-3": "运营就绪目标提前达成",
    "slide1-tam": "TAM (潜在市场总额)",
    "slide1-growth": "↑ 18% 同比增长",
    "slide1-sam": "SAM (可服务市场额)",
    "slide1-cagr": "↑ 22% 复合年增长率",
    "slide1-chart-title": "行业预测收入增长 (MYR)",
    
    "slide2-tracker": "运营绩效",
    "slide2-title": "关键绩效，一目了然。",
    "slide2-desc": "财务摘要显示运营利润率强劲，第二季度关键绩效指标超出基准参数。",
    "slide2-th-metric": "KPI 指标",
    "slide2-th-perf": "Q2 绩效",
    "slide2-th-target": "对比目标",
    "slide2-td-rev": "收入增长",
    "slide2-td-ord": "已处理订单",
    "slide2-td-margin": "运营利润率",
    "slide2-td-retention": "客户留存率",
    "slide2-chart-title": "各服务收入占比",
    "slide2-donut-center-label": "达成目标",
    "slide2-legend-1": "三语翻译 (38%)",
    "slide2-legend-2": "幻灯片设计 (26%)",
    "slide2-legend-3": "数据录入 (18%)",
    "slide2-legend-4": "Python 数据 (18%)",
    
    "slide3-tracker": "实施路线图",
    "slide3-title": "从数据清洗到稳定交付。",
    "slide3-desc": "包含客户数据导入、清洗、布局格式化和自动化验证规则的详细步骤方法。",
    "slide3-badge1": "第一阶段",
    "slide3-card1-title": "数据导入与审计",
    "slide3-card1-desc": "导入原始数据集、检测重复条目、识别翻译歧义，并锁定幻灯片内容大纲。",
    "slide3-card1-b1": "查重与数据结构审计",
    "slide3-card1-b2": "源数据验证检查",
    
    "slide3-badge2": "第二阶段",
    "slide3-card2-title": "版式设计与打磨",
    "slide3-card2-desc": "应用核心设计系统、翻译源材料、设计 CSS 数据图表并设置宽屏幻灯片边距。",
    "slide3-card2-b1": "排版层级网格",
    "slide3-card2-b2": "三语翻译精准匹配",
    
    "slide3-badge3": "第三阶段",
    "slide3-card3-title": "验证与交付",
    "slide3-card3-desc": "运行自动化单元检查脚本、进行键盘访问性审查、打包 Pages 压缩包并交付最终文件。",
    "slide3-card3-b1": "在线服务器响应式检查",
    "slide3-card3-b2": "文件包直接交付",
    
    // Estimator
    "calc-pre": "报价估算器",
    "calc-title": "在您留言前，快速获取初步项目预算。",
    "calc-service-label": "选择服务项目",
    "calc-opt-translation": "三语翻译",
    "calc-opt-ppt": "幻灯片设计",
    "calc-opt-data": "数据录入",
    "calc-qty-label": "数量",
    "calc-currency-label": "选择货币",
    "calc-notes-title": "报价须知",
    "calc-notes-desc": "最终价格取决于源文件质量、截止日期、修改次数以及文件是否需要额外清洗。",
    "calc-output-label": "预计总预算",
    "calc-check-1": "细节确认后提供定制估算",
    "calc-check-2": "下方生成可直接发送的邮件咨询",
    "calc-check-3": "无虚假结账或付款流程",
    
    // Contact & Form
    "contact-pre": "联系我",
    "contact-title": "发送项目详细需求，我将回复您后续步骤。",
    "contact-label-location": "工作地点",
    "contact-val-location": "马来西亚槟城 (MYT)",
    "contact-label-services": "服务项目",
    "contact-val-services": "三语翻译、数据录入、PowerPoint设计、Python数据分析",
    "form-guide-title": "建议留言格式",
    "form-guide-desc": "请告诉我服务类型、源文件、目标格式、截止日期、预算范围以及交付验收标准。",
    "form-label-name": "您的姓名 *",
    "form-label-email": "您的邮箱 *",
    "form-label-msg": "项目描述 *",
    "form-ph-name": "您的姓名",
    "form-ph-email": "you@example.com",
    "form-ph-msg": "请描述您的文件格式、源语言、幻灯片数量、数据行数、截止日期以及期望交付成果。",
    "form-submit-btn": "生成邮件咨询",
    
    // Chatbot
    "chat-title": "联系助手",
    "chat-welcome-desc": "请告诉我您的服务类型、文件格式、截止日期和验收标准。我可以为您生成一封发送给 Je Yen 的规范邮件。",
    "chat-ph-input": "例如：周五前完成一份12页的幻灯片",
    "chat-send-btn": "发送"
  }
};

// 1. Language Switcher Logic
function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn');
  
  function setLanguage(lang) {
    localStorage.setItem('site_lang', lang);
    
    // Update active class on buttons
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    // Update data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (I18N_DICTIONARY[lang] && I18N_DICTIONARY[lang][key]) {
        el.textContent = I18N_DICTIONARY[lang][key];
      }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (I18N_DICTIONARY[lang] && I18N_DICTIONARY[lang][key]) {
        el.placeholder = I18N_DICTIONARY[lang][key];
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Trigger Quote Estimator recalculation
    const slider = document.getElementById('estimator-slider');
    if (slider) {
      slider.dispatchEvent(new Event('input'));
    }
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  // Load default from storage (defaulting to 'en')
  const defaultLang = localStorage.getItem('site_lang') || 'en';
  setLanguage(defaultLang);
}

// 2. Typing Animation
function initTypingAnimation() {
  const wordsMap = {
    en: [
      "data cleanup",
      "PowerPoint slide design",
      "English-Chinese-Malay translation",
      "Python data support"
    ],
    zh: [
      "数据清洗",
      "PowerPoint 幻灯片设计",
      "英中马三语翻译",
      "Python 数据技术支持"
    ]
  };

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenWords = 2000;
  const textElement = document.getElementById('typing-text');
  
  if (!textElement) return;

  function type() {
    const lang = localStorage.getItem('site_lang') || 'en';
    const words = wordsMap[lang] || wordsMap.en;
    const currentWord = words[wordIndex % words.length];

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

// 3. Translation Switcher
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

// 4. PPT Slide Carousel
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

// 5. Quote Estimator
const PRICING_CONFIG = {
  translation: {
    label: { en: "Word Count", zh: "翻译字数" },
    min: 100,
    max: 10000,
    step: 100,
    default: 1000,
    rate: 0.04, // RM 0.04 per word
    suffix: { en: " words", zh: " 字" }
  },
  ppt: {
    label: { en: "Number of Slides", zh: "幻灯片页数" },
    min: 3,
    max: 50,
    step: 1,
    default: 10,
    rate: 5.00, // RM 5.00 per slide
    suffix: { en: " slides", zh: " 页" }
  },
  data: {
    label: { en: "Data Entries (Records)", zh: "数据录入行数" },
    min: 50,
    max: 5000,
    step: 50,
    default: 500,
    rate: 0.05, // RM 0.05 per record
    suffix: { en: " records", zh: " 行" }
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

    slider.min = config.min;
    slider.max = config.max;
    slider.step = config.step;
    slider.value = config.default;
    
    calculatePrice();
  }

  function calculatePrice() {
    const lang = localStorage.getItem('site_lang') || 'en';
    const config = PRICING_CONFIG[currentService];
    if (!config) return;

    const qty = parseInt(slider.value);
    
    // Localized label and suffix
    const labelText = typeof config.label === 'object' ? config.label[lang] : config.label;
    const suffixText = typeof config.suffix === 'object' ? config.suffix[lang] : config.suffix;
    
    if (sliderLabel) sliderLabel.textContent = labelText;
    if (sliderVal) sliderVal.textContent = qty.toLocaleString() + suffixText;
    
    const costInMYR = qty * config.rate;
    const currencyInfo = CURRENCY_CONFIG[currentCurrency];
    const costConverted = costInMYR * currencyInfo.rate;
    
    priceDisplay.textContent = `${currencyInfo.symbol}${costConverted.toFixed(2)}`;

    let details = "";
    if (currentService === 'translation') {
      details = lang === 'en' 
        ? `Estimated budget for English to Chinese/Malay translation at standard RM ${config.rate.toFixed(2)}/word. Includes proofreading.`
        : `标准费率 RM ${config.rate.toFixed(2)}/字，英中马三语翻译估算预算。包含人工校对。`;
    } else if (currentService === 'ppt') {
      details = lang === 'en'
        ? `Estimated budget for premium layout and custom slides at RM ${config.rate.toFixed(2)}/slide. Includes typography alignment.`
        : `标准费率 RM ${config.rate.toFixed(2)}/页，演示幻灯片排版与定制设计估算预算。包含排版对齐。`;
    } else {
      details = lang === 'en'
        ? `Estimated budget for cleaning, validation, and entry of database records at RM ${config.rate.toFixed(2)}/record.`
        : `标准费率 RM ${config.rate.toFixed(2)}/行，数据清洗、格式验证及录入估算预算。`;
    }
    
    if (currentCurrency !== 'MYR') {
      if (lang === 'en') {
        details += ` (Converted from RM ${costInMYR.toFixed(2)} at approx exchange rate 1 RM = ${currencyInfo.rate} ${currentCurrency})`;
      } else {
        details += ` （按近似汇率 1 RM = ${currencyInfo.rate} ${currentCurrency} 从 RM ${costInMYR.toFixed(2)} 折算）`;
      }
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

  // Expose calculation globally to be triggered by language switcher
  slider.addEventListener('change', calculatePrice);
}

// 6. Contact Form
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

// 7. Scroll Reveal Fallback
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

// 8. Portfolio Chatbot Widget
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

    const lang = localStorage.getItem('site_lang') || 'en';
    inputField.value = '';
    appendMessage('visitor', text, true);
    showTypingIndicator();

    try {
      const endpoint = window.PORTFOLIO_CHAT_ENDPOINT;

      if (!endpoint) {
        hideTypingIndicator();
        const fallbackText = lang === 'en'
          ? 'Thanks. For the fastest reply, use the contact form or email jeyentan@gmail.com with your files, deadline, and expected output.'
          : '感谢您的留言。为了获得最快的回复，请使用联系表单或直接发送电子邮件至 jeyentan@gmail.com，并附上您的文件、截止日期和期望交付成果。';
        appendMessage('agent', fallbackText, true);
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
        const errorText = lang === 'en'
          ? "Thanks for your message! I'm having trouble connecting to Je Yen's server right now, but he has been notified and will get back to you shortly."
          : "感谢您的留言！我现在连接到 Je Yen 的本地服务器时遇到一些问题，但他已被通知并将很快回复您。";
        appendMessage('agent', errorText, true);
      }
    } catch (err) {
      console.error(err);
      hideTypingIndicator();
      const offlineText = lang === 'en'
        ? "I'm currently offline and unable to connect to Je Yen's local server. Please reach him directly at jeyentan@gmail.com!"
        : "我目前处于离线状态，无法连接到 Je Yen 的本地服务器。请直接通过 jeyentan@gmail.com 与他取得联系！";
      appendMessage('agent', offlineText, true);
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

// 9. Workstation Mockup Animation
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
