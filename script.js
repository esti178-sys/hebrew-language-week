/* ============================================================================
   מדריך מהיר למורה — היכן משנים תאריכים, חידות, לו"ז וקישורים?
   ============================================================================
   כל ההגדרות המרכזיות של האפליקציה מרוכזות מיד כאן למטה באובייקט CONFIG:

   1. תאריך ושעת יום השיא (עבור טיימר הספירה לאחור):
      שנו את הערך של `peakDayDateTime` בפורמט: 'YYYY-MM-DDTHH:MM:SS'
      לדוגמה: '2027-01-14T08:30:00'

   2. תאריכי פתיחת 7 הימים במפה (ימים א'–ו' + יום ז' יום השיא):
      שנו את 7 התאריכים במערך `dayDates` בפורמט: 'YYYY-MM-DD'
      כל יום נפתח אוטומטית בחצות של התאריך שנקבע לו.
      (לבדיקה מיידית של כל הימים בכל זמן — לחצו על "מצב בדיקה למורה" בתחתית העמוד).

   3. פרטי בית הספר והתעודה:
      שנו את `schoolSubtitle`, `certificateSchoolLine` ו-`certificateSignature`.

   4. החידות היומיות (6 חידות לימים א'–ו'):
      במערך `riddles` ניתן לערוך את השאלה, רמז האימוג'ים (אופציונלי),
      4 אפשרויות הבחירה, מספר התשובה הנכונה (`correctIndex` מתחיל מ-0: 0=א', 1=ב', 2=ג', 3=ד'),
      ואת קטע ה-"הידעת?" שנחשף לאחר פתרון נכון.

   5. לו"ז יום השיא:
      במערך `peakDaySchedule` ניתן להוסיף, למחוק או לערוך שעות, פעילויות ומיקומים.

   6. קישורים למשחקים וחידונים חיצוניים (Kahoot, Wordwall, האקדמיה ללשון ועוד):
      במערך `externalGames` החליפו את כתובות ה-`url` לקישורים הכיתתיים שלכם.
   ============================================================================ */

const CONFIG = {
  // --- 1. כותרת משנה ופרטי בית הספר בתעודה ---
  schoolSubtitle: "חגיגת השפה והתרבות · כיתות ה'–ח'",
  certificateSchoolLine: 'שבוע השפה העברית · בית הספר',
  certificateSignature: 'צוות השפה העברית',

  // --- 2. תאריך ושעת יום השיא (לטיימר הספירה לאחור) ---
  // פורמט: 'YYYY-MM-DDTHH:MM:SS'
  peakDayDateTime: '2026-11-29T08:30:00',

  // --- 3. מערך תאריכי הפתיחה האוטומטית של 7 הימים (ימים א'–ז') ---
  // פורמט: 'YYYY-MM-DD' (חייב להכיל 7 תאריכים: 6 ימי חידות + יום ז' יום השיא)
  dayDates: [
    '2026-11-22', // יום א' — חידה 1
    '2026-11-23', // יום ב' — חידה 2
    '2026-11-24', // יום ג' — חידה 3
    '2026-11-25', // יום ד' — חידה 4
    '2026-11-26', // יום ה' — חידה 5
    '2026-11-27', // יום ו' — חידה 6
    '2026-11-29', // יום ז' — יום השיא! (יום ראשון)
  ],

  // --- 4. מערך 6 החידות היומיות (גילאי 10–14, כיתות ה'–ח') ---
  riddles: [
    {
      id: 1,
      dayLabel: "יום א'",
      category: 'חידושי אליעזר בן-יהודה',
      shortDesc: 'איזו מילה מתוקה במיוחד חידש מחייה השפה העברית?',
      question:
        'אליעזר בן-יהודה חידש מאות מילים שאנו אומרים מדי יום. איזו מהמילים הבאות חידש משורש הקשור ל"קרישה" ו"קרח", וגם בהשראת הצליל של המילה האיטלקית Gelato?',
      emojiClue: '',
      options: ['שוקולד', 'גְּלִידָה', 'סוכרייה', 'עוגייה'],
      correctIndex: 1,
      didYouKnow:
        'המילה "גְּלִידָה" היא אחד החידושים המתוקים והמוצלחים ביותר של אליעזר בן-יהודה! הוא שילב בין השורש העברי ג-ל-ד (שפירושו להיקרש או לקפוא, כמו "גליד קרח") לבין הדמיון בצליל למילה האיטלקית "ג\'לאטו". מילים יומיומיות נוספות שכולנו אומרים בזכותו הן "מילון", "מגבת", "מדרכה" ו"אדיב".',
    },
    {
      id: 2,
      dayLabel: "יום ב'",
      category: "ניבים באימוג'ים",
      shortDesc: 'פענחו את הפתגם העברי המוכר שמסתתר מאחורי הסמלים.',
      question: "איזה פתגם עברי מוכר מסתתר מאחורי רצף האימוג'ים הבא?",
      emojiClue: '🐦 ✋  ⚖️  🐦🐦 🌳',
      options: [
        'ציפור לחשה לי באוזן',
        'התפוח לא נופל רחוק מהעץ',
        'טובה ציפור אחת ביד משתיים על העץ',
        'לעוף על כנפי הדמיון',
      ],
      correctIndex: 2,
      didYouKnow:
        'הפתגם "טובה ציפור אחת ביד משתיים על העץ" מלמד אותנו להעריך את מה שכבר נמצא בידינו ובטוח, במקום לוותר עליו למען הבטחה גדולה יותר שאינה מובטחת. ביטויים דומים מאוד קיימים בעשרות שפות בעולם, והרעיון מופיע כבר בכתבים עתיקים מלפני יותר מאלף שנה!',
    },
    {
      id: 3,
      dayLabel: "יום ג'",
      category: 'עברית תקנית מול סלנג',
      shortDesc: 'איך מנסחים סלנג יומיומי בעברית עשירה ותקנית?',
      question:
        'בהפסקה אמר עידו לחבריו: "אל תתבאסו, בפעם הבאה נצליח!" — מהי המקבילה התקנית והמדויקת ביותר בעברית לפועל "להתבאס"?',
      emojiClue: '',
      options: [
        'להתאכזב או להצטער',
        'להתפלא מאוד',
        'להזדרז ולמהר',
        'להתגאות בהצלחה',
      ],
      correctIndex: 0,
      didYouKnow:
        'המילה "באסה" נכנסה לסלנג הישראלי מהערבית המדוברת (במשמעות של צער או מצוקה), וממנה יצרו דוברי העברית פועל שלם בבניין התפעל — "התבאס"! זו דוגמה נהדרת ליכולת של השפה העברית לאמץ מילים ולהלביש אותן על השורשים והבניינים שלנו. בכתיבה רשמית נעדיף לכתוב "התאכזבתי" או "הצטערתי".',
    },
    {
      id: 4,
      dayLabel: "יום ד'",
      category: 'שורשים ומשקלים',
      shortDesc: 'גלו את "הקוד הסודי" שמחבר בין מילים בעלות אותו משקל.',
      question:
        'הביטו בשלוש המילים הבאות: מַחְשֵׁב, מַפְתֵּחַ, מַסְרֵק. כולן שייכות לאותו משקל (מַקְטֵל). מה המשותף למשמעות שלהן?',
      emojiClue: '',
      options: [
        'כולן שמות של מקומות ומבנים',
        'כולן מתארות בעלי מקצוע',
        'כולן שמות של תופעות טבע',
        'כולן שמות של כלים או מכשירים',
      ],
      correctIndex: 3,
      didYouKnow:
        'משקל מַקְטֵל הוא אחד המשקלים השימושיים ביותר בעברית ליצירת שמות של מכשירים וכלים — כמו מַזְלֵג, מַגְהֵץ, מַגְבֵּר, מַחְשֵׁב וּמַסְרֵק! לעומתו, משקל מִקְטָלָה (מִסְפָּרָה, מִרְפָּאָה, מִשְׁתָּלָה) מציין לרוב מקומות, ומשקל קַטֶּלֶת (אַדֶּמֶת, צַהֶבֶת) מציין מחלות. ממש כמו צופן מובנה בשפה!',
    },
    {
      id: 5,
      dayLabel: "יום ה'",
      category: "ניבים באימוג'ים",
      shortDesc: 'אתגר פענוח קצר, ציורי ומפתיע במיוחד.',
      question: "איזה ניב עברי ציורי מתאר את המעבר שמופיע באימוג'ים הבאים?",
      emojiClue: '🪰  ➡️  🐘',
      options: [
        'זיכרון של פיל',
        'לעשות מזבוב פיל',
        'הפיל שבחדר',
        'לא להזיז זבוב',
      ],
      correctIndex: 1,
      didYouKnow:
        'הביטוי "לעשות מזבוב פיל" מתאר הגזמה קיצונית — הפיכת עניין קטנטן לסיפור ענק ודרמטי. מקור הביטוי עתיק במיוחד: הוא מופיע כבר בכתביו של הסופר היווני-רומי לוקיאנוס במאה השנייה לספירה, נדד לשפות אירופה והשתרש היטב גם בעברית שלנו.',
    },
    {
      id: 6,
      dayLabel: "יום ו'",
      category: 'עברית תקנית',
      shortDesc: 'חידת ההכנה האחרונה לפני יום השיא — בדקו את פעלי הלבוש!',
      question:
        'אתם מתארגנים בבוקר לקראת חגיגת יום השיא בבית הספר. איזה מהמשפטים הבאים כתוב בעברית תקנית לחלוטין?',
      emojiClue: '',
      options: [
        'לבשתי חולצה חגיגית, לבשתי גרביים ושמתי נעליים.',
        'ענדתי חולצה חגיגית, חבשתי גרביים ונעלתי נעליים.',
        'לבשתי חולצה חגיגית, גרבתי גרביים ונעלתי נעליים.',
        'שמתי חולצה חגיגית, נעלתי גרביים ולבשתי נעליים.',
      ],
      correctIndex: 2,
      didYouKnow:
        'השפה העברית מתהדרת במגוון עשיר ומדויק של פעלי לבוש! חולצה ומכנסיים לובשים, גרביים גורבים, נעליים נועלים, כובע חובשים, שעון או צמיד עונדים, צעיף כורכים, ומשקפיים מרכיבים. כשאנו משתמשים בפועל המדויק — העברית שלנו נשמעת חדה, עשירה וחיה יותר.',
    },
  ],

  // --- 5. לו"ז פעילויות יום השיא (יום ז') ---
  peakDaySchedule: [
    {
      time: '08:15',
      title: 'פתיחה חגיגית והתכנסות שכבתית',
      description: 'דברי פתיחה, סרטון קצר על מחייה השפה העברית והזנקת יום השיא.',
      location: 'אולם הספורט / רחבת בית הספר',
    },
    {
      time: '09:00',
      title: 'סדנת "ממציאים מילה חדשה"',
      description: 'עבודה בקבוצות: בוחרים תופעה יומיומית שאין לה מילה בעברית וממציאים לה שם מקורי לפי שורש ומשקל.',
      location: 'כיתות האם',
    },
    {
      time: '10:15',
      title: 'הפסקה פעילה ותחנות שפה בחצר',
      description: 'תשבץ ענק, דומינו ניבים, חידות אימוג\'ים ועמדת צילום עם משפטי השראה בעברית.',
      location: 'חצר בית הספר',
    },
    {
      time: '11:00',
      title: 'חידון השפה הגדול בין הכיתות',
      description: 'תחרות טריוויה אינטראקטיבית בשידור חי בין נציגי כיתות ה\'–ח\'.',
      location: 'אולם הכינוסים',
    },
    {
      time: '12:15',
      title: 'טקס סיום והפקת תעודות אלופי העברית',
      description: 'הכרזה על המילים הזוכות, סיכום השבוע והענקת תעודות אישיות לכל משתתף ומשתתפת.',
      location: 'כיתות האם',
    },
  ],

  // --- 6. קישורים למשחקים וחידונים חיצוניים ליום השיא ---
  // ניתן להחליף את כתובות ה-url לקישורי Kahoot / Wordwall / Quizizz שהכנתם לכיתה!
  externalGames: [
    {
      title: 'חידוני האקדמיה ללשון העברית',
      description: 'שאלונים רשמיים ומשעשעים על עברית נכונה, ביטויים וחידושי מילים.',
      url: 'https://hebrew-academy.org.il/',
    },
    {
      title: 'חידון כיתתי חי (Kahoot)',
      description: 'הצטרפו לחידון הטריוויה השכבתי באמצעות קוד המשחק שיוקרן על הלוח.',
      url: 'https://kahoot.it/',
    },
    {
      title: 'משחקי שורשים, משקלים וניבים (Wordwall)',
      description: 'גלגל מזל, התאמת זוגות ומשחקי מיון מהירים לתרגול בכיף.',
      url: 'https://wordwall.net/he',
    },
    {
      title: 'אוצרות השפה — הספרייה הלאומית',
      description: 'סיפורים מרתקים, כרזות עתיקות ומכתבים מקוריים של אליעזר בן-יהודה.',
      url: 'https://www.nli.org.il/he',
    },
  ],
};

/* ============================================================================
   קוד האפליקציה — אין צורך לערוך מתחת לקו זה לצורך עדכון תוכן
   ============================================================================ */

const STORAGE_KEYS = {
  SOLVED: 'hlw_solved_riddles_v1',
  CERT_PROFILE: 'hlw_cert_profile_v1',
};

const HEBREW_LETTERS = ["א'", "ב'", "ג'", "ד'"];

const state = {
  solvedIds: new Set(),
  teacherMode: false,
  activeRiddleId: null,
  certProfile: {
    name: '',
    className: '',
    gender: 'female',
  },
};

let countdownInterval = null;
let toastTimer = null;
let lastFocusedElement = null;

// --- עזרי תאריכים (בזמן מקומי בלבד למניעת סטיות אזור זמן) ---

function parseLocalDate(isoDateStr) {
  const [year, month, day] = isoDateStr.split('-').map(Number);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}

function getTodayStart() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
}

function formatShortHebrewDate(isoDateStr) {
  const d = parseLocalDate(isoDateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}`;
}

function formatFullHebrewDate(dateObj) {
  try {
    return new Intl.DateTimeFormat('he-IL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(dateObj);
  } catch {
    return dateObj.toLocaleDateString('he-IL');
  }
}

function isDayUnlocked(dayIndex) {
  if (state.teacherMode) return true;
  const dateStr = CONFIG.dayDates[dayIndex];
  if (!dateStr) return false;
  return getTodayStart().getTime() >= parseLocalDate(dateStr).getTime();
}

function isDayToday(dayIndex) {
  const dateStr = CONFIG.dayDates[dayIndex];
  if (!dateStr) return false;
  return getTodayStart().getTime() === parseLocalDate(dateStr).getTime();
}

// --- שמירה וטעינה מ-localStorage ---

function loadStateFromStorage() {
  try {
    const rawSolved = localStorage.getItem(STORAGE_KEYS.SOLVED);
    if (rawSolved) {
      const parsed = JSON.parse(rawSolved);
      if (Array.isArray(parsed)) {
        state.solvedIds = new Set(parsed.filter((id) => Number.isInteger(id)));
      }
    }

    const rawProfile = localStorage.getItem(STORAGE_KEYS.CERT_PROFILE);
    if (rawProfile) {
      const parsedProfile = JSON.parse(rawProfile);
      if (parsedProfile && typeof parsedProfile === 'object') {
        state.certProfile.name = typeof parsedProfile.name === 'string' ? parsedProfile.name : '';
        state.certProfile.className =
          typeof parsedProfile.className === 'string' ? parsedProfile.className : '';
        state.certProfile.gender = parsedProfile.gender === 'male' ? 'male' : 'female';
      }
    }
  } catch {
    // במקרה של הגבלת אחסון מקומי בדפדפן, ממשיכים בזיכרון ללא תקלה
  }
}

function saveSolvedToStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.SOLVED, JSON.stringify([...state.solvedIds]));
  } catch {
    // התעלמות שקטה אם localStorage חסום
  }
}

function saveProfileToStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.CERT_PROFILE, JSON.stringify(state.certProfile));
  } catch {
    // התעלמות שקטה אם localStorage חסום
  }
}

// --- טוסט הודעות ---

function showToast(message) {
  const toastEl = document.getElementById('toast');
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.hidden = false;

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.hidden = true;
  }, 3200);
}

// --- עדכון מד התקדמות ---

function renderProgressSummary() {
  const total = CONFIG.riddles.length;
  const solvedCount = state.solvedIds.size;
  const percentage = total > 0 ? Math.round((solvedCount / total) * 100) : 0;

  const countText = document.getElementById('progress-count-text');
  const fill = document.getElementById('progress-bar-fill');
  const track = document.getElementById('progress-bar-track');

  if (countText) {
    countText.textContent =
      solvedCount === total
        ? `כל הכבוד! השלמת ${solvedCount} מתוך ${total} חידות`
        : `${solvedCount} מתוך ${total} חידות הושלמו`;
  }
  if (fill) {
    fill.style.width = `${percentage}%`;
  }
  if (track) {
    track.setAttribute('aria-valuemax', String(total));
    track.setAttribute('aria-valuenow', String(solvedCount));
  }
}

// --- טיימר ספירה לאחור ליום השיא ---

function initCountdown() {
  const targetDate = new Date(CONFIG.peakDayDateTime);
  const dateDisplay = document.getElementById('peak-date-display');
  const grid = document.getElementById('countdown-grid');
  const liveMsg = document.getElementById('countdown-live-msg');
  const heading = document.getElementById('countdown-heading');

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-minutes');
  const secsEl = document.getElementById('cd-seconds');

  if (dateDisplay && !Number.isNaN(targetDate.getTime())) {
    const timeStr = `${String(targetDate.getHours()).padStart(2, '0')}:${String(
      targetDate.getMinutes()
    ).padStart(2, '0')}`;
    dateDisplay.textContent = `יום השיא: ${formatFullHebrewDate(targetDate)} · שעה ${timeStr}`;
  }

  function tick() {
    const now = Date.now();
    const diff = targetDate.getTime() - now;

    if (Number.isNaN(diff) || diff <= 0) {
      if (grid) grid.hidden = true;
      if (liveMsg) liveMsg.hidden = false;
      if (heading) heading.textContent = 'יום השיא בעיצומו!';
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
      return;
    }

    if (grid) grid.hidden = false;
    if (liveMsg) liveMsg.hidden = true;

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  tick();
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(tick, 1000);
}

// --- אייקוני SVG ---

function getLockSvg() {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <rect x="4" y="11" width="16" height="10" rx="2.5"></rect>
    <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
  </svg>`;
}

function getCheckSvg() {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>`;
}

function getArrowLeftSvg() {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>`;
}

function getStarSvg() {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>`;
}

// --- רינדור מפת 7 הימים ---

function renderRoadmap() {
  const grid = document.getElementById('days-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // 6 ימי החידות (ימים א'–ו')
  CONFIG.riddles.forEach((riddle, index) => {
    const unlocked = isDayUnlocked(index);
    const today = isDayToday(index);
    const solved = state.solvedIds.has(riddle.id);
    const dateLabel = formatShortHebrewDate(CONFIG.dayDates[index]);

    const card = document.createElement('button');
    card.type = 'button';
    card.setAttribute('role', 'listitem');
    card.id = `day-card-${riddle.id}`;

    const classes = ['day-card'];
    if (!unlocked) classes.push('day-card--locked');
    else if (solved) classes.push('day-card--done');
    else if (today) classes.push('day-card--today');
    card.className = classes.join(' ');

    let statusHtml = '';
    let ctaHtml = '';

    if (!unlocked) {
      statusHtml = `<span class="day-card__status day-card__status--locked">${getLockSvg()}<span>ייפתח ב-${dateLabel}</span></span>`;
      ctaHtml = `<span class="day-card__cta">${getLockSvg()}<span>נעול עד ${dateLabel}</span></span>`;
    } else if (solved) {
      statusHtml = `<span class="day-card__status day-card__status--done">${getCheckSvg()}<span>הושלם</span></span>`;
      ctaHtml = `<span class="day-card__cta"><span>צפייה בפתרון וב"הידעת?"</span>${getArrowLeftSvg()}</span>`;
    } else if (today) {
      statusHtml = `<span class="day-card__status day-card__status--today">פתוח היום</span>`;
      ctaHtml = `<span class="day-card__cta"><span>פתרו את חידת היום</span>${getArrowLeftSvg()}</span>`;
    } else {
      statusHtml = `<span class="day-card__status day-card__status--open">פתוח</span>`;
      ctaHtml = `<span class="day-card__cta"><span>לפתרון החידה</span>${getArrowLeftSvg()}</span>`;
    }

    card.innerHTML = `
      <div>
        <div class="day-card__top">
          <div class="day-card__day-group">
            <span class="day-card__number">${index + 1}</span>
            <div>
              <span class="day-card__day-name">${riddle.dayLabel}</span>
              <span class="day-card__date">${dateLabel}</span>
            </div>
          </div>
          ${statusHtml}
        </div>
        <h3 class="day-card__topic">${riddle.category}</h3>
        <p class="day-card__desc">${riddle.shortDesc}</p>
      </div>
      ${ctaHtml}
    `;

    card.addEventListener('click', () => {
      if (!unlocked) {
        showToast(`חידת ${riddle.dayLabel} תיפתח אוטומטית בתאריך ${dateLabel}.`);
        return;
      }
      openRiddleModal(riddle.id);
    });

    grid.appendChild(card);
  });

  // כרטיס יום ז' — יום השיא
  const peakIndex = 6;
  const peakUnlocked = isDayUnlocked(peakIndex);
  const peakDateLabel = formatShortHebrewDate(CONFIG.dayDates[peakIndex]);

  const peakCard = document.createElement('button');
  peakCard.type = 'button';
  peakCard.setAttribute('role', 'listitem');
  peakCard.id = 'day-card-7';
  peakCard.className = `day-card day-card--peak${peakUnlocked ? '' : ' day-card--locked'}`;

  peakCard.innerHTML = `
    <div class="day-card__peak-body">
      <div class="day-card__peak-meta">
        <span class="day-card__number">${getStarSvg()}</span>
        <div>
          <span class="day-card__day-name">יום ז' · יום השיא החגיגי</span>
          <span class="day-card__date">${peakDateLabel}</span>
        </div>
        <span class="day-card__status ${
          peakUnlocked ? 'day-card__status--today' : 'day-card__status--locked'
        }">
          ${peakUnlocked ? 'המתחם פתוח!' : `${getLockSvg()}<span>ייפתח ב-${peakDateLabel}</span>`}
        </span>
      </div>
      <h3 class="day-card__topic">לו"ז חגיגי, משחקים ומחולל תעודת אלוף/ת העברית</h3>
      <p class="day-card__desc">
        השיא של שבוע השפה העברית: פעילויות, חידונים כיתתיים ותעודה אישית מעוצבת להורדה ולהדפסה.
      </p>
    </div>
    <span class="day-card__cta">
      ${
        peakUnlocked
          ? `<span>כניסה למתחם יום השיא</span>${getArrowLeftSvg()}`
          : `${getLockSvg()}<span>ייפתח ב-${peakDateLabel}</span>`
      }
    </span>
  `;

  peakCard.addEventListener('click', () => {
    if (!peakUnlocked) {
      showToast(`מתחם יום השיא ייפתח אוטומטית בתאריך ${peakDateLabel}.`);
      return;
    }
    const peakSection = document.getElementById('peak-day-section');
    if (peakSection) {
      peakSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  grid.appendChild(peakCard);
}

// --- מודאל החידה היומית ---

function openRiddleModal(riddleId) {
  const riddle = CONFIG.riddles.find((r) => r.id === riddleId);
  if (!riddle) return;

  lastFocusedElement = document.activeElement;
  state.activeRiddleId = riddleId;

  const modal = document.getElementById('riddle-modal');
  const dayLabel = document.getElementById('modal-day-label');
  const categoryLabel = document.getElementById('modal-category-label');
  const titleEl = document.getElementById('modal-title');
  const emojiEl = document.getElementById('modal-emoji-clue');
  const optionsEl = document.getElementById('modal-options');
  const feedbackEl = document.getElementById('modal-feedback');
  const dykEl = document.getElementById('modal-dyk');
  const dykTextEl = document.getElementById('modal-dyk-text');

  if (!modal || !optionsEl) return;

  dayLabel.textContent = riddle.dayLabel;
  categoryLabel.textContent = riddle.category;
  titleEl.textContent = riddle.question;

  if (riddle.emojiClue) {
    emojiEl.textContent = riddle.emojiClue;
    emojiEl.hidden = false;
  } else {
    emojiEl.hidden = true;
    emojiEl.textContent = '';
  }

  const alreadySolved = state.solvedIds.has(riddle.id);
  optionsEl.innerHTML = '';

  riddle.options.forEach((optionText, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.id = `riddle-opt-${idx}`;
    btn.innerHTML = `
      <span class="option-btn__letter">${HEBREW_LETTERS[idx] || idx + 1}</span>
      <span>${optionText}</span>
    `;

    if (alreadySolved) {
      btn.disabled = true;
      if (idx === riddle.correctIndex) {
        btn.classList.add('option-btn--correct');
      }
    } else {
      btn.addEventListener('click', () => handleOptionSelect(riddle, idx, btn));
    }

    optionsEl.appendChild(btn);
  });

  if (alreadySolved) {
    feedbackEl.className = 'feedback-box feedback-box--success';
    feedbackEl.textContent = 'כל הכבוד! חידה זו כבר נפתרה בהצלחה ונשמרה בהתקדמות שלך.';
    feedbackEl.hidden = false;
    dykTextEl.textContent = riddle.didYouKnow;
    dykEl.hidden = false;
  } else {
    feedbackEl.hidden = true;
    feedbackEl.textContent = '';
    dykEl.hidden = true;
    dykTextEl.textContent = '';
  }

  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) closeBtn.focus();
}

function handleOptionSelect(riddle, chosenIndex, clickedBtn) {
  const optionsEl = document.getElementById('modal-options');
  const feedbackEl = document.getElementById('modal-feedback');
  const dykEl = document.getElementById('modal-dyk');
  const dykTextEl = document.getElementById('modal-dyk-text');

  if (chosenIndex === riddle.correctIndex) {
    // תשובה נכונה
    const allButtons = optionsEl.querySelectorAll('.option-btn');
    allButtons.forEach((b) => {
      b.disabled = true;
      b.classList.remove('option-btn--wrong');
    });
    clickedBtn.classList.add('option-btn--correct');

    feedbackEl.className = 'feedback-box feedback-box--success';
    feedbackEl.textContent = 'כל הכבוד! תשובה מדויקת — החידה סומנה כהושלמה.';
    feedbackEl.hidden = false;

    dykTextEl.textContent = riddle.didYouKnow;
    dykEl.hidden = false;
    dykEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    state.solvedIds.add(riddle.id);
    saveSolvedToStorage();
    renderProgressSummary();
    renderRoadmap();
    updateCertificatePreview();
  } else {
    // תשובה שגויה — מאפשרים לנסות שוב
    clickedBtn.classList.remove('option-btn--wrong');
    // הפעלה מחדש של אנימציית הניענוע
    void clickedBtn.offsetWidth;
    clickedBtn.classList.add('option-btn--wrong');

    feedbackEl.className = 'feedback-box feedback-box--error';
    feedbackEl.textContent = 'לא בדיוק — נסו שוב! חשבו על הקשר למילה או לביטוי.';
    feedbackEl.hidden = false;
  }
}

function closeRiddleModal() {
  const modal = document.getElementById('riddle-modal');
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.body.style.overflow = '';
  state.activeRiddleId = null;

  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}

// --- מתחם יום השיא (לו"ז, משחקים ומחולל תעודה) ---

function renderPeakDaySection() {
  const unlocked = isDayUnlocked(6);
  const lockedPanel = document.getElementById('peak-locked-panel');
  const unlockedContent = document.getElementById('peak-unlocked-content');
  const lockedDesc = document.getElementById('peak-locked-desc');

  if (lockedPanel) lockedPanel.hidden = unlocked;
  if (unlockedContent) unlockedContent.hidden = !unlocked;

  if (!unlocked && lockedDesc) {
    const peakDate = formatFullHebrewDate(parseLocalDate(CONFIG.dayDates[6]));
    lockedDesc.textContent = `המתחם ייפתח אוטומטית ב${peakDate}. בינתיים המשיכו לפתור את החידות היומיות כדי לצבור נקודות לתעודת אלוף/ת העברית!`;
  }

  renderScheduleList();
  renderGamesList();
  updateCertificatePreview();
}

function renderScheduleList() {
  const listEl = document.getElementById('schedule-list');
  if (!listEl) return;
  listEl.innerHTML = '';

  CONFIG.peakDaySchedule.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'timeline__item';
    li.innerHTML = `
      <span class="timeline__time">${item.time}</span>
      <div>
        <h4 class="timeline__title">${item.title}</h4>
        <p class="timeline__desc">${item.description}</p>
        ${item.location ? `<span class="timeline__location">${item.location}</span>` : ''}
      </div>
    `;
    listEl.appendChild(li);
  });
}

function renderGamesList() {
  const listEl = document.getElementById('games-list');
  if (!listEl) return;
  listEl.innerHTML = '';

  CONFIG.externalGames.forEach((game) => {
    const a = document.createElement('a');
    a.className = 'game-card';
    a.href = game.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML = `
      <div class="game-card__info">
        <h4 class="game-card__title">${game.title}</h4>
        <p class="game-card__desc">${game.description}</p>
      </div>
      <span class="game-card__action">
        <span>לפתיחה</span>
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </span>
    `;
    listEl.appendChild(a);
  });
}

// --- מחולל התעודה ---

function getCertificateCopy() {
  const isMale = state.certProfile.gender === 'male';
  const total = CONFIG.riddles.length;
  const solved = state.solvedIds.size;
  const trimmedName = state.certProfile.name.trim();
  const trimmedClass = state.certProfile.className.trim();

  const title = isMale ? 'תעודת אלוף העברית' : 'תעודת אלופת העברית';
  const awardedTo = isMale
    ? 'מוענקת בזאת בהערכה רבה לתלמיד'
    : 'מוענקת בזאת בהערכה רבה לתלמידה';

  const solvedVerb = isMale ? 'ופתר' : 'ופתרה';
  const body = `על השתתפות פעילה ומעוררת השראה בשבוע השפה העברית, במהלכו גילה/תה סקרנות, יצירתיות ואהבת השפה ${solvedVerb} ${solved} מתוך ${total} חידות השבוע.`
    .replace('גילה/תה', isMale ? 'גילה' : 'גילתה');

  let rank = '';
  if (solved >= total) {
    rank = isMale ? 'אלוף העברית בהצטיינות יתרה' : 'אלופת העברית בהצטיינות יתרה';
  } else if (solved >= 4) {
    rank = isMale ? 'אלוף העברית' : 'אלופת העברית';
  } else if (solved >= 1) {
    rank = isMale ? 'חוקר השפה העברית' : 'חוקרת השפה העברית';
  } else {
    rank = isMale ? 'משתתף בשבוע השפה העברית' : 'משתתפת בשבוע השפה העברית';
  }

  const todayDateText = new Intl.DateTimeFormat('he-IL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());

  return {
    title,
    awardedTo,
    displayName: trimmedName || 'שמך יופיע כאן',
    hasRealName: Boolean(trimmedName),
    classLabel: trimmedClass ? `כיתה ${trimmedClass}` : '',
    body,
    rank,
    solved,
    total,
    dateText: todayDateText,
  };
}

function updateCertificatePreview() {
  const copy = getCertificateCopy();

  const schoolEl = document.getElementById('cert-school-name');
  const titleEl = document.getElementById('cert-title-text');
  const awardedEl = document.getElementById('cert-awarded-text');
  const nameEl = document.getElementById('cert-student-name');
  const classEl = document.getElementById('cert-student-class');
  const bodyEl = document.getElementById('cert-body-text');
  const rankEl = document.getElementById('cert-rank-badge');
  const sigEl = document.getElementById('cert-signature-label');
  const dateEl = document.getElementById('cert-date-value');
  const formScoreEl = document.getElementById('cert-form-score');

  if (schoolEl) schoolEl.textContent = CONFIG.certificateSchoolLine;
  if (titleEl) titleEl.textContent = copy.title;
  if (awardedEl) awardedEl.textContent = copy.awardedTo;
  if (nameEl) nameEl.textContent = copy.displayName;
  if (classEl) {
    classEl.textContent = copy.classLabel;
    classEl.hidden = !copy.classLabel;
  }
  if (bodyEl) bodyEl.textContent = copy.body;
  if (rankEl) rankEl.textContent = copy.rank;
  if (sigEl) sigEl.textContent = CONFIG.certificateSignature;
  if (dateEl) dateEl.textContent = copy.dateText;
  if (formScoreEl) formScoreEl.textContent = `${copy.solved} מתוך ${copy.total} חידות`;
}

// פונקציית עזר לשבירת שורות נקייה על Canvas בעברית
function drawWrappedText(ctx, text, centerX, startY, maxWidth, lineHeight) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });
  if (currentLine) lines.push(currentLine);

  lines.forEach((line, index) => {
    ctx.fillText(line, centerX, startY + index * lineHeight);
  });

  return startY + lines.length * lineHeight;
}

// יצירת קובץ PNG איכותי ברזולוציה גבוהה (A4 לרוחב: 1600x1131) והורדה ישירה
async function downloadCertificatePng() {
  const copy = getCertificateCopy();
  if (!copy.hasRealName) {
    const nameInput = document.getElementById('student-name-input');
    if (nameInput) nameInput.focus();
    showToast('אנא הזינו את שם התלמיד/ה לפני הורדת התעודה.');
    return;
  }

  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // ממשיכים גם אם בדיקת הפונטים נדחתה
    }
  }

  const width = 1600;
  const height = 1131;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.direction = 'rtl';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // רקע נייר עדין
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#fffdf9');
  bgGrad.addColorStop(0.65, '#ffffff');
  bgGrad.addColorStop(1, '#f4f8fc');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // עיטורי פינה מינימליסטיים בתכלת רך
  ctx.fillStyle = 'rgba(14, 165, 233, 0.06)';
  ctx.beginPath();
  ctx.arc(0, 0, 260, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(width, height, 280, 0, Math.PI * 2);
  ctx.fill();

  // מסגרת חיצונית כחול עמוק
  ctx.strokeStyle = '#0e2a47';
  ctx.lineWidth = 10;
  ctx.strokeRect(48, 48, width - 96, height - 96);

  // מסגרת פנימית צהוב-חרדל
  ctx.strokeStyle = '#e2a81d';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(70, 70, width - 140, height - 140);

  // פינות חרדל מעודנות
  const cornerLen = 36;
  ctx.strokeStyle = '#0e2a47';
  ctx.lineWidth = 5;
  const corners = [
    [82, 82, 1, 1],
    [width - 82, 82, -1, 1],
    [82, height - 82, 1, -1],
    [width - 82, height - 82, -1, -1],
  ];
  corners.forEach(([cx, cy, dx, dy]) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy + dy * cornerLen);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx + dx * cornerLen, cy);
    ctx.stroke();
  });

  // סמל עגול עם האות ע'
  const emblemX = width / 2;
  const emblemY = 175;
  ctx.beginPath();
  ctx.arc(emblemX, emblemY, 56, 0, Math.PI * 2);
  ctx.fillStyle = '#fef5d4';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#d49a1a';
  ctx.stroke();

  ctx.beginPath();
  ctx.setLineDash([6, 6]);
  ctx.arc(emblemX, emblemY, 44, 0, Math.PI * 2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#0e2a47';
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#0e2a47';
  ctx.font = '900 56px "Frank Ruhl Libre", Georgia, serif';
  ctx.fillText('ע', emblemX, emblemY + 5);

  // שורת בית ספר
  ctx.fillStyle = '#0284c7';
  ctx.font = '700 28px "Heebo", sans-serif';
  ctx.fillText(CONFIG.certificateSchoolLine, width / 2, 272);

  // כותרת התעודה
  ctx.fillStyle = '#0e2a47';
  ctx.font = '900 84px "Frank Ruhl Libre", Georgia, serif';
  ctx.fillText(copy.title, width / 2, 365);

  // שורת פתיחה
  ctx.fillStyle = '#465a70';
  ctx.font = '600 32px "Assistant", sans-serif';
  ctx.fillText(copy.awardedTo, width / 2, 450);

  // שם התלמיד/ה + קו חרדל מתחת
  ctx.fillStyle = '#0e2a47';
  ctx.font = '900 66px "Heebo", sans-serif';
  ctx.fillText(copy.displayName, width / 2, 540);

  const nameWidth = Math.max(460, Math.min(920, ctx.measureText(copy.displayName).width + 120));
  ctx.strokeStyle = '#e2a81d';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - nameWidth / 2, 592);
  ctx.lineTo(width / 2 + nameWidth / 2, 592);
  ctx.stroke();

  let nextY = 640;
  if (copy.classLabel) {
    ctx.fillStyle = '#6e8094';
    ctx.font = '700 30px "Heebo", sans-serif';
    ctx.fillText(copy.classLabel, width / 2, 632);
    nextY = 695;
  } else {
    nextY = 665;
  }

  // פסקת הוקרה
  ctx.fillStyle = '#334155';
  ctx.font = '600 31px "Assistant", sans-serif';
  const afterBodyY = drawWrappedText(ctx, copy.body, width / 2, nextY, 1100, 48);

  // תגית דרגה
  const badgeY = Math.min(865, afterBodyY + 42);
  ctx.font = '800 28px "Heebo", sans-serif';
  const rankTextWidth = ctx.measureText(copy.rank).width;
  const pillW = rankTextWidth + 72;
  const pillH = 54;
  const pillX = width / 2 - pillW / 2;
  const pillY = badgeY - pillH / 2;

  ctx.fillStyle = '#fef5d4';
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 27);
  ctx.fill();
  ctx.strokeStyle = '#e2a81d';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#a6750c';
  ctx.fillText(copy.rank, width / 2, badgeY + 2);

  // שורת חתימות ותאריך בתחתית
  const footerY = 985;
  const rightSigX = width - 340;
  const leftSigX = 340;

  ctx.strokeStyle = '#163a5f';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(rightSigX - 135, footerY - 12);
  ctx.lineTo(rightSigX + 135, footerY - 12);
  ctx.stroke();

  ctx.fillStyle = '#6e8094';
  ctx.font = '600 24px "Heebo", sans-serif';
  ctx.fillText(CONFIG.certificateSignature, rightSigX, footerY + 20);

  ctx.fillStyle = '#0e2a47';
  ctx.font = '700 26px "Heebo", sans-serif';
  ctx.fillText(copy.dateText, leftSigX, footerY - 34);

  ctx.beginPath();
  ctx.moveTo(leftSigX - 115, footerY - 12);
  ctx.lineTo(leftSigX + 115, footerY - 12);
  ctx.stroke();

  ctx.fillStyle = '#6e8094';
  ctx.font = '600 24px "Heebo", sans-serif';
  ctx.fillText('תאריך', leftSigX, footerY + 20);

  // הורדת הקובץ
  const safeName = copy.displayName.replace(/[^\u0590-\u05FFa-zA-Z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
  const link = document.createElement('a');
  link.download = `תעודת-שבוע-השפה-העברית-${safeName || 'אישית'}.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('התעודה ירדה למחשב/טלפון בהצלחה!');
}

function handlePrintCertificate() {
  const copy = getCertificateCopy();
  if (!copy.hasRealName) {
    const nameInput = document.getElementById('student-name-input');
    if (nameInput) nameInput.focus();
    showToast('אנא הזינו את שם התלמיד/ה לפני ההדפסה או השמירה כ-PDF.');
    return;
  }
  window.print();
}

// --- מצב בדיקה למורה ואיפוס התקדמות ---

function setTeacherMode(enabled) {
  state.teacherMode = enabled;

  const banner = document.getElementById('teacher-banner');
  const footerBtn = document.getElementById('teacher-mode-btn');
  const footerResetBtn = document.getElementById('footer-reset-btn');

  if (banner) banner.hidden = !enabled;
  if (footerBtn) {
    footerBtn.setAttribute('aria-pressed', String(enabled));
    footerBtn.textContent = enabled ? 'מצב בדיקה למורה (פעיל)' : 'מצב בדיקה למורה';
  }
  if (footerResetBtn) footerResetBtn.hidden = !enabled;

  renderRoadmap();
  renderPeakDaySection();

  showToast(
    enabled
      ? 'מצב בדיקה למורה הופעל — כל 7 הימים ומתחם יום השיא פתוחים.'
      : 'חזרה למצב רגיל לפי תאריכי הפתיחה.'
  );
}

function resetProgressForTesting() {
  state.solvedIds.clear();
  state.certProfile = { name: '', className: '', gender: 'female' };

  try {
    localStorage.removeItem(STORAGE_KEYS.SOLVED);
    localStorage.removeItem(STORAGE_KEYS.CERT_PROFILE);
  } catch {
    // התעלמות שקטה
  }

  // איפוס שדות הטופס של התעודה
  const nameInput = document.getElementById('student-name-input');
  const classInput = document.getElementById('student-class-input');
  const femaleRadio = document.querySelector('input[name="cert-gender"][value="female"]');

  if (nameInput) nameInput.value = '';
  if (classInput) classInput.value = '';
  if (femaleRadio) femaleRadio.checked = true;

  closeRiddleModal();
  renderProgressSummary();
  renderRoadmap();
  updateCertificatePreview();
  showToast('ההתקדמות אופסה בהצלחה לבדיקה מחדש.');
}

// --- חיבור אירועים ואתחול ---

function bindEvents() {
  // מודאל
  const modal = document.getElementById('riddle-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const doneBtn = document.getElementById('modal-done-btn');

  if (closeBtn) closeBtn.addEventListener('click', closeRiddleModal);
  if (doneBtn) doneBtn.addEventListener('click', closeRiddleModal);
  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeRiddleModal();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeRiddleModal();
  });

  // טופס תעודה
  const nameInput = document.getElementById('student-name-input');
  const classInput = document.getElementById('student-class-input');
  const genderRadios = document.querySelectorAll('input[name="cert-gender"]');
  const pngBtn = document.getElementById('download-png-btn');
  const printBtn = document.getElementById('print-pdf-btn');

  if (nameInput) {
    nameInput.value = state.certProfile.name;
    nameInput.addEventListener('input', (e) => {
      state.certProfile.name = e.target.value;
      saveProfileToStorage();
      updateCertificatePreview();
    });
  }

  if (classInput) {
    classInput.value = state.certProfile.className;
    classInput.addEventListener('input', (e) => {
      state.certProfile.className = e.target.value;
      saveProfileToStorage();
      updateCertificatePreview();
    });
  }

  genderRadios.forEach((radio) => {
    radio.checked = radio.value === state.certProfile.gender;
    radio.addEventListener('change', (e) => {
      if (e.target.checked) {
        state.certProfile.gender = e.target.value;
        saveProfileToStorage();
        updateCertificatePreview();
      }
    });
  });

  if (pngBtn) pngBtn.addEventListener('click', downloadCertificatePng);
  if (printBtn) printBtn.addEventListener('click', handlePrintCertificate);

  // מצב בדיקה למורה ואיפוס
  const teacherModeBtn = document.getElementById('teacher-mode-btn');
  const bannerExitBtn = document.getElementById('banner-exit-btn');
  const bannerResetBtn = document.getElementById('banner-reset-btn');
  const footerResetBtn = document.getElementById('footer-reset-btn');

  if (teacherModeBtn) {
    teacherModeBtn.addEventListener('click', () => setTeacherMode(!state.teacherMode));
  }
  if (bannerExitBtn) {
    bannerExitBtn.addEventListener('click', () => setTeacherMode(false));
  }
  if (bannerResetBtn) {
    bannerResetBtn.addEventListener('click', resetProgressForTesting);
  }
  if (footerResetBtn) {
    footerResetBtn.addEventListener('click', resetProgressForTesting);
  }
}

function initApp() {
  loadStateFromStorage();

  const eyebrow = document.getElementById('school-eyebrow');
  if (eyebrow) eyebrow.textContent = CONFIG.schoolSubtitle;

  bindEvents();
  initCountdown();
  renderProgressSummary();
  renderRoadmap();
  renderPeakDaySection();
}

document.addEventListener('DOMContentLoaded', initApp);
