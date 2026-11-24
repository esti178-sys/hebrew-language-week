/* ============================================================================
   מדריך מהיר למורה — היכן משנים תאריכים, כיתות, חידות וחיבור ניקוד אוטומטי?
   ============================================================================
   כל ההגדרות המרכזיות של האפליקציה נמצאות מיד כאן למטה באובייקט CONFIG:

   1. רשימת הכיתות לתחרות (`classes`):
      שנו את שמות הכיתות בבית הספר שלכם (לדוגמה: ["ה'1", "ה'2", "ו'1", ...]).

   2. תאריכי פתיחת 7 הימים ויום השיא (`peakDayDateTime` ו-`dayDates`):
      כל יום נפתח אוטומטית בחצות. לבדיקה מיידית לחצו על "מצב בדיקה למורה" בתחתית העמוד.

   3. חיבור ניקוד אוטומטי מהתלמידים אלייך כל יום (Firebase + Google Sheets/מייל):
      - לניקוד חי בזמן אמת בין כל המכשירים: הדביקו את פרטי הפרויקט שלכם מ-Firebase בתוך `firebaseConfig`.
      - לקבלת דוח ניקוד אוטומטי בטבלת Google Sheets + מייל סיכום יומי אוטומטי למורה:
        הדביקו את כתובת ה-Web App של Google Apps Script בתוך `googleSheetWebhookUrl`.
      - הוראות מלאות ופשוטות שלב־אחר־שלב (3 דקות הגדרה!) נמצאות בקובץ TEACHER_CLOUD_SETUP.md במאגר.

   4. החידות היומיות (`riddles`), מילת היום (`wordsOfTheDay`), משחק הניבים (`idiomMatchPairs`),
      לו"ז יום השיא (`peakDaySchedule`) והמשחקים החיצוניים (`externalGames`).
   ============================================================================ */

const CONFIG = {
  // --- 1. פרטי בית הספר והתעודה ---
  schoolSubtitle: "בית ספר הראל · חגיגת השפה העברית (כיתות ה'–ח')",
  certificateSchoolLine: 'שבוע השפה העברית · בית ספר הראל',
  certificateSignature: 'צוות השפה העברית · בי"ס הראל',

  // --- 2. הכיתות המשתתפות בתחרות הניקוד (20 כיתות: 5 ה', 5 ו', 6 ז', 4 ח') ---
  classes: [
    "ה'1", "ה'2", "ה'3", "ה'4", "ה'5",
    "ו'1", "ו'2", "ו'3", "ו'4", "ו'5",
    "ז'1", "ז'2", "ז'3", "ז'4", "ז'5", "ז'6",
    "ח'1", "ח'2", "ח'3", "ח'4",
  ],

  // --- 3. ניקוד אוטומטי וקוד כניסה למצב מורה (מונע מתלמידים לאפס נקודות) ---
  pointsPerRiddle: 10, // נקודות בסיס לפתרון נכון
  firstTryBonus: 2, // בונוס נוסף לפתרון בניסיון ראשון
  teacherPin: '2026', // קוד סודי לכניסה ל"מצב בדיקה למורה" — שנו לכל קוד שתרצו!

  // --- 4. חיבור ענן לניקוד חי בין מכשירים (Firebase Firestore — מחובר!) ---
  firebaseConfig: {
    apiKey: 'AIzaSyBlSdvGVuOVavslbj7a4xe0nfT2IoHj_ik',
    authDomain: 'hebrew-language-week.firebaseapp.com',
    projectId: 'hebrew-language-week',
    storageBucket: 'hebrew-language-week.firebasestorage.app',
    messagingSenderId: '803413993762',
    appId: '1:803413993762:web:20e929852f0258f7be5d7b',
    measurementId: 'G-9P4DYV46L0',
  },

  // --- 5. חיבור לטבלת Google Sheets + שליחת מייל יומי אוטומטי למורה (אופציונלי) ---
  // הדביקו כאן את כתובת ה-Web App מ-Google Apps Script (ראו TEACHER_CLOUD_SETUP.md):
  googleSheetWebhookUrl: '',

  // --- 6. תאריך ושעת יום השיא (לטיימר הספירה לאחור) ---
  peakDayDateTime: '2026-12-24T08:30:00',

  // --- 7. תאריכי הפתיחה האוטומטית של 7 הימים (מדלג על שבת 19.12 ומגיע ליום השיא ב-24.12) ---
  dayDates: [
    '2026-12-17', // יום א' לאתגר — חמישי 17.12
    '2026-12-18', // יום ב' לאתגר — שישי 18.12
    '2026-12-20', // יום ג' לאתגר — ראשון 20.12
    '2026-12-21', // יום ד' לאתגר — שני 21.12
    '2026-12-22', // יום ה' לאתגר — שלישי 22.12
    '2026-12-23', // יום ו' לאתגר — רביעי 23.12
    '2026-12-24', // יום ז' — יום השיא! חמישי 24.12
  ],

  // --- 8. מערך 6 החידות היומיות (גילאי 10–14, כיתות ה'–ח') ---
  riddles: [
    {
      id: 1,
      dayLabel: "יום א'",
      icon: '🍦',
      badgeName: 'מחדש/ת מילים',
      category: 'חידושי אליעזר בן-יהודה',
      shortDesc: 'איזו מילה מתוקה במיוחד חידש מחייה השפה העברית?',
      question:
        'אליעזר בן-יהודה חידש מאות מילים שאנו אומרים מדי יום. איזו מהמילים הבאות חידש משורש הקשור ל"קרישה" ו"קרח", וגם בהשראת הצליל של המילה האיטלקית Gelato?',
      emojiClue: '',
      hint: 'חשבו על מאכל קר ומתוק שאוכלים בגביע או בכוס בימי הקיץ!',
      options: ['שוקולד', 'גְּלִידָה', 'סוכרייה', 'עוגייה'],
      correctIndex: 1,
      didYouKnow:
        'המילה "גְּלִידָה" היא אחד החידושים המתוקים והמוצלחים ביותר של אליעזר בן-יהודה! הוא שילב בין השורש העברי ג-ל-ד (שפירושו להיקרש או לקפוא, כמו "גליד קרח") לבין הדמיון בצליל למילה האיטלקית "ג\'לאטו". מילים יומיומיות נוספות שכולנו אומרים בזכותו הן "מילון", "מגבת", "מדרכה" ו"אדיב".',
    },
    {
      id: 2,
      dayLabel: "יום ב'",
      icon: '🐦',
      badgeName: 'מפצח/ת פתגמים',
      category: "ניבים באימוג'ים",
      shortDesc: 'פענחו את הפתגם העברי המוכר שמסתתר מאחורי הסמלים.',
      question: "איזה פתגם עברי מוכר מסתתר מאחורי רצף האימוג'ים הבא?",
      emojiClue: '🐦 ✋  ⚖️  🐦🐦 🌳',
      hint: 'בצד אחד יש ציפור אחת על היד, ובצד השני שתיים על העץ — מה עדיף?',
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
      icon: '💬',
      badgeName: 'שומר/ת התקנית',
      category: 'עברית תקנית מול סלנג',
      shortDesc: 'איך מנסחים סלנג יומיומי בעברית עשירה ותקנית?',
      question:
        'בהפסקה אמר עידו לחבריו: "אל תתבאסו, בפעם הבאה נצליח!" — מהי המקבילה התקנית והמדויקת ביותר בעברית לפועל "להתבאס"?',
      emojiClue: '',
      hint: 'כשמישהו אומר "התבאסתי", האם הוא שמח, מופתע או מאוכזב?',
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
      icon: '🔑',
      badgeName: 'בלש/ית שורשים',
      category: 'שורשים ומשקלים',
      shortDesc: 'גלו את "הקוד הסודי" שמחבר בין מילים בעלות אותו משקל.',
      question:
        'הביטו בשלוש המילים הבאות: מַחְשֵׁב, מַפְתֵּחַ, מַסְרֵק. כולן שייכות לאותו משקל (מַקְטֵל). מה המשותף למשמעות שלהן?',
      emojiClue: '',
      hint: 'שאלו את עצמכם: מה עושים עם מחשב, מפתח ומסרק? כולם עוזרים לנו לבצע פעולה!',
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
      icon: '🐘',
      badgeName: 'אמן/ית הניבים',
      category: "ניבים באימוג'ים",
      shortDesc: 'אתגר פענוח קצר, ציורי ומפתיע במיוחד.',
      question: "איזה ניב עברי ציורי מתאר את המעבר שמופיע באימוג'ים הבאים?",
      emojiClue: '🪰  ➡️  🐘',
      hint: 'חיה קטנטנה שהופכת לחיה ענקית — איך קוראים לזה כשמגזימים?',
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
      icon: '👟',
      badgeName: 'אלוף/ת הניסוח',
      category: 'עברית תקנית',
      shortDesc: 'חידת ההכנה האחרונה לפני יום השיא — בדקו את פעלי הלבוש!',
      question:
        'אתם מתארגנים בבוקר לקראת חגיגת יום השיא בבית הספר. איזה מהמשפטים הבאים כתוב בעברית תקנית לחלוטין?',
      emojiClue: '',
      hint: 'זכרו: חולצה לובשים, נעליים נועלים, ומה עושים עם גרביים? (מתחיל באות ג\'!)',
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

  // --- 9. כרטיסיות "מילת היום" המתהפכות (חידושי האקדמיה ללשון העברית) ---
  wordsOfTheDay: [
    {
      word: 'הֶסְכֵּת',
      meaning: 'פודקאסט',
      example: 'מהשורש ס-כ-ת (להקשיב קשב רב). לדוגמה: "האזנתי בדרך לבית הספר להֶסְכֵּת מרתק על חלל!"',
    },
    {
      word: 'יִשּׂוּמוֹן',
      meaning: 'אפליקציה (App)',
      example: 'מילה עברית חמודה ליישום קטן בטלפון. לדוגמה: "פתחנו את היישומון של שבוע השפה העברית!"',
    },
    {
      word: 'כְּרוּכִית',
      meaning: 'הסמל @ (שטרודל)',
      example: 'בדיוק כמו עוגת שטרודל מגולגלת! גם הסימן במייל נקרא בעברית תקנית "כְּרוּכִית".',
    },
    {
      word: 'מַרְשֶׁתֶת',
      meaning: 'אינטרנט',
      example: 'שילוב של "רשת" במשקל מַקְטֶלֶת — הרשת הגדולה שמחברת את כל העולם.',
    },
    {
      word: 'מִסְרוֹן',
      meaning: 'הודעת טקסט (SMS)',
      example: 'מהמילה "מֶסֶר" בתוספת הסיומת "-וֹן" להקטנה — מסר קצר ומהיר.',
    },
    {
      word: 'תַּקְרִישׁ',
      meaning: 'ג\'לי (קינוח)',
      example: 'מהשורש ק-ר-ש (להיקרש ולהתייצב). קינוח תַּקְרִישׁ תות — נשמע אלגנטי, לא?',
    },
  ],

  // --- 10. זוגות למיני-משחק המובנה של יום השיא ("שידוך ניבים!") ---
  idiomMatchPairs: [
    { id: 1, idiom: 'ראש קטן', meaning: 'להתחמק מאחריות ולעשות רק את המינימום' },
    { id: 2, idiom: 'לשבור את הקרח', meaning: 'להפיג מבוכה וליצור אווירה נעימה' },
    { id: 3, idiom: 'עשרת מונים', meaning: 'הרבה יותר, פי כמה וכמה' },
    { id: 4, idiom: 'על קצה המזלג', meaning: 'בקצרה, רק טעימה מהנושא' },
    { id: 5, idiom: 'יוצא מן הכלל', meaning: 'מיוחד ונפלא במיוחד' },
    { id: 6, idiom: 'טמן את ראשו בחול', meaning: 'התעלם מבעיה במקום להתמודד איתה' },
  ],

  // --- 11. לו"ז פעילויות יום השיא (יום ז') ---
  peakDaySchedule: [
    {
      time: '08:15',
      title: 'פתיחה חגיגית והתכנסות שכבתית',
      description: 'דברי פתיחה, סרטון קצר על מחייה השפה העברית והכרזה על הכיתה המובילה בתחרות.',
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
      title: 'טקס סיום, הכרזת הכיתה הזוכה וחלוקת תעודות',
      description: 'הכרזה על המילים הזוכות, הענקת גביע לאלופת השבוע והפקת תעודות אישיות לכל תלמיד ותלמידה.',
      location: 'כיתות האם',
    },
  ],

  // --- 12. קישורים למשחקים וחידונים חיצוניים ליום השיא ---
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
  SOLVED: 'hlw_solved_meta_v2',
  CERT_PROFILE: 'hlw_cert_profile_v2',
  SELECTED_CLASS: 'hlw_selected_class_v2',
  LOCAL_SCORES: 'hlw_class_scores_v2',
  SOUND_ENABLED: 'hlw_sound_enabled_v2',
  DEVICE_ID: 'hlw_device_id_v1',
};

const COOKIE_KEYS = {
  DEVICE_ID: 'hlw_dev_id',
  SOLVED_IDS: 'hlw_solved_ids',
};

const HEBREW_LETTERS = ["א'", "ב'", "ג'", "ד'"];
const HEBREW_WEEKDAYS_SHORT = ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", 'שבת'];
const PRAISE_PHRASES = [
  'בול בפוני! 🎯',
  'אלופים בעברית! 🏆',
  'שפה ברמה גבוהה! ✨',
  'פגיעה מדויקת! 🌟',
  'איזה מוח חד! 🧠',
];

const state = {
  deviceId: '',
  // מיפוי riddleId -> { points, className, solvedAt }
  solvedMeta: {},
  selectedClass: '',
  // מיפוי className -> { total: number, byDay: { [dayId]: number } }
  classScores: {},
  leaderboardTab: 'today', // 'today' | 'weekly'
  leaderboardGradeFilter: 'all', // 'all' | 'ה' | 'ו' | 'ז' | 'ח'
  teacherMode: false,
  teacherReportOpen: false,
  activeRiddleId: null,
  activeRiddleHadWrongAttempt: false,
  soundEnabled: true,
  wordIndex: 0,
  cloudSyncMode: 'local', // 'local' | 'firebase' | 'sheets' | 'both'
  certProfile: {
    name: '',
    className: '',
    gender: 'female',
  },
  // מצב מיני-משחק שידוך ניבים
  matchGame: {
    selectedIdiomId: null,
    selectedMeaningId: null,
    matchedIds: new Set(),
    shuffledMeanings: [],
  },
};

let countdownInterval = null;
let toastTimer = null;
let lastFocusedElement = null;
let firebaseApi = null;
let audioCtx = null;

// --- עזרי עוגיות ומזהה מכשיר קבוע (למניעת הגשות כפולות מאותו מכשיר) ---

function readCookie(name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : '';
}

function writeCookie(name, value, days = 90) {
  try {
    const expires = new Date(Date.now() + days * 86400 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  } catch {
    // התעלמות שקטה אם עוגיות חסומות
  }
}

function getOrCreateDeviceId() {
  let id = '';
  try {
    id = localStorage.getItem(STORAGE_KEYS.DEVICE_ID) || '';
  } catch {
    id = '';
  }
  if (!id) {
    id = readCookie(COOKIE_KEYS.DEVICE_ID);
  }
  if (!id) {
    const rand = Math.random().toString(36).slice(2, 10);
    const ts = Date.now().toString(36);
    id = `dev_${ts}_${rand}`;
  }
  try {
    localStorage.setItem(STORAGE_KEYS.DEVICE_ID, id);
  } catch {
    // התעלמות שקטה
  }
  writeCookie(COOKIE_KEYS.DEVICE_ID, id, 120);
  return id;
}

// יוצר מזהה אחיד לשם תלמיד+כיתה לצורך חסימת כפילויות בצד השרת (גם מגלישה בסתר)
function normalizeStudentKey(className, fullName) {
  const cleanClass = String(className || '')
    .trim()
    .replace(/['"`\s]/g, '');
  const cleanName = String(fullName || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\u0590-\u05FFa-z0-9_]/g, '');
  return `${cleanClass}__${cleanName}`;
}

function hasValidStudentName() {
  return state.certProfile.name.trim().length >= 2;
}

// --- עזרי תאריכים (בזמן מקומי בלבד) ---

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
  const weekday = HEBREW_WEEKDAYS_SHORT[d.getDay()] || '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${weekday} · ${day}.${month}`;
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

// מחזיר את מזהה היום הנוכחי (1–6) לצורך לשונית "ניקוד היום"
function getCurrentCompetitionDayId() {
  for (let i = 0; i < CONFIG.riddles.length; i += 1) {
    if (isDayToday(i)) return CONFIG.riddles[i].id;
  }
  // אם היום אינו אחד מ-6 ימי החידות, מציגים את היום הפתוח האחרון או יום 1
  let lastOpen = 1;
  for (let i = 0; i < CONFIG.riddles.length; i += 1) {
    if (getTodayStart().getTime() >= parseLocalDate(CONFIG.dayDates[i]).getTime()) {
      lastOpen = CONFIG.riddles[i].id;
    }
  }
  return lastOpen;
}

// --- אתחול מבנה ניקוד כיתות ---

function createEmptyScoresMap() {
  const map = {};
  CONFIG.classes.forEach((cls) => {
    map[cls] = { total: 0, byDay: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 } };
  });
  return map;
}

function ensureClassEntry(cls) {
  if (!state.classScores[cls]) {
    state.classScores[cls] = { total: 0, byDay: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 } };
  }
  return state.classScores[cls];
}

// --- שמירה וטעינה מ-localStorage + גיבוי בעוגייה למניעת כפל ניקוד ---

function loadStateFromStorage() {
  state.deviceId = getOrCreateDeviceId();
  state.classScores = createEmptyScoresMap();

  try {
    const rawSolved = localStorage.getItem(STORAGE_KEYS.SOLVED);
    if (rawSolved) {
      const parsed = JSON.parse(rawSolved);
      if (parsed && typeof parsed === 'object') {
        state.solvedMeta = parsed;
      }
    }

    // שחזור מגיבוי עוגייה אם תלמיד ניסה למחוק localStorage בלבד
    const cookieSolved = readCookie(COOKIE_KEYS.SOLVED_IDS);
    if (cookieSolved) {
      cookieSolved
        .split(',')
        .map((n) => Number(n))
        .filter((n) => Number.isInteger(n) && n >= 1 && n <= CONFIG.riddles.length)
        .forEach((id) => {
          if (!state.solvedMeta[id]) {
            state.solvedMeta[id] = {
              points: CONFIG.pointsPerRiddle,
              className: '',
              solvedAt: '',
              restoredFromCookie: true,
            };
          }
        });
    }

    const rawClass = localStorage.getItem(STORAGE_KEYS.SELECTED_CLASS);
    if (rawClass && CONFIG.classes.includes(rawClass)) {
      state.selectedClass = rawClass;
    }

    const rawScores = localStorage.getItem(STORAGE_KEYS.LOCAL_SCORES);
    if (rawScores) {
      const parsedScores = JSON.parse(rawScores);
      if (parsedScores && typeof parsedScores === 'object') {
        CONFIG.classes.forEach((cls) => {
          if (parsedScores[cls]) {
            state.classScores[cls] = {
              total: Number(parsedScores[cls].total) || 0,
              byDay: {
                1: Number(parsedScores[cls].byDay?.[1]) || 0,
                2: Number(parsedScores[cls].byDay?.[2]) || 0,
                3: Number(parsedScores[cls].byDay?.[3]) || 0,
                4: Number(parsedScores[cls].byDay?.[4]) || 0,
                5: Number(parsedScores[cls].byDay?.[5]) || 0,
                6: Number(parsedScores[cls].byDay?.[6]) || 0,
              },
            };
          }
        });
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

    if (!state.certProfile.className && state.selectedClass) {
      state.certProfile.className = state.selectedClass;
    }

    const rawSound = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
    if (rawSound === 'false') {
      state.soundEnabled = false;
    }
  } catch {
    // ממשיכים בזיכרון במקרה של הגבלת אחסון
  }
}

function saveLocalState() {
  try {
    localStorage.setItem(STORAGE_KEYS.SOLVED, JSON.stringify(state.solvedMeta));
    localStorage.setItem(STORAGE_KEYS.SELECTED_CLASS, state.selectedClass);
    localStorage.setItem(STORAGE_KEYS.LOCAL_SCORES, JSON.stringify(state.classScores));
    localStorage.setItem(STORAGE_KEYS.CERT_PROFILE, JSON.stringify(state.certProfile));
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, String(state.soundEnabled));
  } catch {
    // התעלמות שקטה
  }
  const solvedKeys = Object.keys(state.solvedMeta);
  writeCookie(COOKIE_KEYS.SOLVED_IDS, solvedKeys.join(','), 90);
}

function getSolvedCount() {
  return Object.keys(state.solvedMeta).length;
}

function getMyEarnedPoints() {
  return Object.values(state.solvedMeta).reduce((sum, entry) => sum + (Number(entry.points) || 0), 0);
}

// --- צלילים עדינים (Web Audio API ללא קבצים חיצוניים) ---

function playChime(type) {
  if (!state.soundEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    const notes = type === 'success' ? [523.25, 659.25, 783.99, 1046.5] : [260, 215];
    const step = type === 'success' ? 0.085 : 0.1;

    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type === 'success' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * step);

      gain.gain.setValueAtTime(0.001, now + idx * step);
      gain.gain.exponentialRampToValueAtTime(0.11, now + idx * step + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * step + 0.28);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + idx * step);
      osc.stop(now + idx * step + 0.3);
    });
  } catch {
    // אם הדפדפן חוסם שמע — ממשיכים בשקט
  }
}

function updateSoundButtonUI() {
  const btn = document.getElementById('sound-toggle-btn');
  const icon = document.getElementById('sound-toggle-icon');
  const label = document.getElementById('sound-toggle-label');
  if (!btn) return;
  btn.setAttribute('aria-pressed', String(state.soundEnabled));
  if (icon) icon.textContent = state.soundEnabled ? '🔊' : '🔇';
  if (label) label.textContent = state.soundEnabled ? 'צלילים פעילים' : 'צלילים מושתקים';
}

// --- חגיגת קונפטי צבעונית (HTML5 Canvas) ---

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#0ea5e9', '#f5c443', '#16a34a', '#0e2a47', '#38bdf8', '#fb923c'];
  const particles = Array.from({ length: 85 }, () => ({
    x: canvas.width * (0.2 + Math.random() * 0.6),
    y: canvas.height * 0.35 + (Math.random() - 0.5) * 60,
    vx: (Math.random() - 0.5) * 12,
    vy: -6 - Math.random() * 9,
    size: 6 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * Math.PI * 2,
    vRot: (Math.random() - 0.5) * 0.25,
    alpha: 1,
  }));

  let frame = 0;
  function animate() {
    frame += 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let alive = false;
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.32;
      p.rot += p.vRot;
      if (frame > 55) p.alpha -= 0.022;

      if (p.alpha > 0 && p.y < canvas.height + 20) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
        ctx.restore();
      }
    });

    if (alive && frame < 140) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(animate);
}

// --- סנכרון ענן אופציונלי (Firebase Firestore + Google Sheets Webhook) ---

function hasFirebaseConfigured() {
  const fc = CONFIG.firebaseConfig;
  return Boolean(fc && fc.apiKey && fc.projectId);
}

function hasSheetsConfigured() {
  return Boolean(CONFIG.googleSheetWebhookUrl && CONFIG.googleSheetWebhookUrl.trim().startsWith('http'));
}

function updateCloudSyncLabels() {
  const syncPill = document.getElementById('leaderboard-sync-pill');
  const teacherSync = document.getElementById('teacher-sync-status');

  const fbOn = state.cloudSyncMode === 'firebase' || state.cloudSyncMode === 'both';
  const sheetsOn = hasSheetsConfigured();

  let pillText = 'מצב תצוגה מקומי';
  let teacherText =
    'מצב סנכרון: מקומי בדפדפן. לחיבור ניקוד חי מכל התלמידים ודוח מייל יומי אוטומטי — ראו TEACHER_CLOUD_SETUP.md.';

  if (fbOn && sheetsOn) {
    pillText = 'מחובר חי · Firebase + גיליון מורה';
    teacherText = 'מחובר ל-Firebase Firestore (ניקוד חי בזמן אמת) ול-Google Sheets (יומן + מייל יומי אוטומטי).';
  } else if (fbOn) {
    pillText = 'ניקוד חי בזמן אמת · Firebase';
    teacherText = 'מחובר ל-Firebase Firestore! כל ניקוד מכל תלמיד מתעדכן כאן אוטומטית בזמן אמת.';
  } else if (sheetsOn) {
    pillText = 'מחובר לגיליון מורה · Google Sheets';
    teacherText = 'מחובר ל-Google Sheets! כל פתרון נשלח אוטומטית לטבלה שלך ונשלח אלייך בסיכום היומי.';
  }

  if (syncPill) {
    syncPill.textContent = pillText;
    syncPill.classList.toggle('is-live', fbOn || sheetsOn);
  }
  if (teacherSync) {
    teacherSync.textContent = teacherText;
  }
}

async function initCloudSync() {
  const sheetsOn = hasSheetsConfigured();
  if (sheetsOn) {
    state.cloudSyncMode = 'sheets';
    // משיכת ניקוד עדכני מגיליון Google Sheets אם מוגדר
    try {
      const resp = await fetch(`${CONFIG.googleSheetWebhookUrl}?action=scores`);
      if (resp.ok) {
        const data = await resp.json();
        if (data && data.scores) {
          applyRemoteScoresSnapshot(data.scores);
        }
      }
    } catch {
      // ממשיכים עם נתונים מקומיים אם אין תשובת קריאה
    }
  }

  if (hasFirebaseConfigured()) {
    try {
      const [{ initializeApp }, firestore] = await Promise.all([
        import('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js'),
        import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js'),
      ]);

      const app = initializeApp(CONFIG.firebaseConfig);
      const db = firestore.getFirestore(app);
      firebaseApi = { db, ...firestore };
      state.cloudSyncMode = sheetsOn ? 'both' : 'firebase';

      // האזנה חיה לטבלת ניקוד הכיתות ב-Firestore
      const scoresCol = firestore.collection(db, 'classScores');
      firestore.onSnapshot(scoresCol, (snapshot) => {
        const fresh = createEmptyScoresMap();
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const cls = docSnap.id;
          if (!fresh[cls]) {
            fresh[cls] = { total: 0, byDay: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 } };
          }
          fresh[cls].total = Number(data.total) || 0;
          for (let d = 1; d <= 6; d += 1) {
            fresh[cls].byDay[d] = Number(data[`day_${d}`]) || 0;
          }
        });
        state.classScores = fresh;
        renderLeaderboard();
        renderTeacherReportTable();
      });
    } catch {
      // במקרה של הגדרת Firebase חלקית או חוסר אינטרנט נשארים במצב מקומי
    }
  }

  updateCloudSyncLabels();
}

function applyRemoteScoresSnapshot(remoteMap) {
  const merged = createEmptyScoresMap();
  Object.keys(remoteMap).forEach((cls) => {
    const entry = remoteMap[cls];
    merged[cls] = {
      total: Number(entry.total) || 0,
      byDay: {
        1: Number(entry.byDay?.[1]) || 0,
        2: Number(entry.byDay?.[2]) || 0,
        3: Number(entry.byDay?.[3]) || 0,
        4: Number(entry.byDay?.[4]) || 0,
        5: Number(entry.byDay?.[5]) || 0,
        6: Number(entry.byDay?.[6]) || 0,
      },
    };
  });
  state.classScores = merged;
  renderLeaderboard();
  renderTeacherReportTable();
}

async function recordClassPoints({ className, riddleId, points, studentName }) {
  if (!className || !points) return;

  // במצב בדיקה למורה: עדכון מקומי בלבד לתצוגה, לא נשלח ניקוד אמיתי לענן!
  if (state.teacherMode || !firebaseApi) {
    const entry = ensureClassEntry(className);
    entry.total += points;
    entry.byDay[riddleId] = (entry.byDay[riddleId] || 0) + points;
    saveLocalState();
    renderLeaderboard();
    renderTeacherReportTable();
    if (state.teacherMode) return;
  }

  const cleanName = (studentName || '').trim() || 'תלמיד/ה';
  const studentKey = normalizeStudentKey(className, cleanName);

  // שליחה אוטומטית ל-Firebase Firestore עם חסימת כפילויות (מכשיר + שם מלא)
  if (firebaseApi) {
    try {
      const { db, doc, getDoc, setDoc, increment, collection, addDoc, serverTimestamp } = firebaseApi;
      const devLockRef = doc(db, 'submissionLocks', `${riddleId}_dev_${state.deviceId}`);
      const stuLockRef = doc(db, 'submissionLocks', `${riddleId}_stu_${studentKey}`);

      const [devSnap, stuSnap] = await Promise.all([getDoc(devLockRef), getDoc(stuLockRef)]);
      if (devSnap.exists() || stuSnap.exists()) {
        showToast('החידה הזו כבר נרשמה בעבר עבור מכשיר או תלמיד/ה זה — הנקודות לא נוספו פעמיים 🔒');
        return;
      }

      // נעילת המכשיר ושם התלמיד/ה ליום זה לפני זקיפת הניקוד (ללא שמירת שם גלוי במסמך הנעילה)
      await Promise.all([
        setDoc(devLockRef, { className, riddleId, createdAt: serverTimestamp() }),
        setDoc(stuLockRef, { className, riddleId, createdAt: serverTimestamp() }),
      ]);

      const classDocRef = doc(db, 'classScores', className);
      await setDoc(
        classDocRef,
        {
          total: increment(points),
          [`day_${riddleId}`]: increment(points),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      await addDoc(collection(db, 'dailySubmissions'), {
        className,
        riddleId,
        points,
        studentName: cleanName,
        studentKey,
        deviceId: state.deviceId,
        dateIso: new Date().toISOString().slice(0, 10),
        createdAt: serverTimestamp(),
      });
    } catch {
      // במקרה של ניתוק רגעי מהאינטרנט — שומרים מקומית כגיבוי
      const entry = ensureClassEntry(className);
      entry.total += points;
      entry.byDay[riddleId] = (entry.byDay[riddleId] || 0) + points;
      saveLocalState();
      renderLeaderboard();
      renderTeacherReportTable();
    }
  }

  // 3. שליחה אוטומטית ל-Google Sheets Webhook (כולל deviceId + studentKey לחסימת כפילויות)
  if (hasSheetsConfigured()) {
    try {
      await fetch(CONFIG.googleSheetWebhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          dateIso: new Date().toISOString().slice(0, 10),
          timeStr: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
          riddleId,
          dayLabel: CONFIG.riddles.find((r) => r.id === riddleId)?.dayLabel || `יום ${riddleId}`,
          className,
          studentName: cleanName,
          studentKey,
          deviceId: state.deviceId,
          points,
        }),
      });
    } catch {
      // התעלמות שקטה במקרה של ניתוק רגעי
    }
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
  }, 3400);
}

// --- עדכון בועת הדיבור המזמינה בכותרת ---

function updateMascotSpeech() {
  const headingEl = document.getElementById('mascot-heading');
  const speechEl = document.getElementById('mascot-speech');
  if (!speechEl) return;

  const solved = getSolvedCount();
  const total = CONFIG.riddles.length;
  const pts = getMyEarnedPoints();
  const firstName = state.certProfile.name.trim().split(/\s+/)[0] || '';

  if (!state.selectedClass || !hasValidStudentName()) {
    if (headingEl) headingEl.textContent = 'מוכנים לאתגר העברית של הראל? 🚀';
    speechEl.textContent =
      'בוחרים כיתה, מפצחים את חידת היום ולוקחים את הגביע הבית־ספרי!';
  } else if (solved === 0) {
    if (headingEl) headingEl.textContent = `יאללה ${firstName}, כיתה ${state.selectedClass} יוצאת לדרך! 🔥`;
    speechEl.textContent = `חידה אחת מדויקת שווה עד ${
      CONFIG.pointsPerRiddle + CONFIG.firstTryBonus
    } נקודות לכיתה ומדבקת הישג ראשונה!`;
  } else if (solved < total) {
    if (headingEl) headingEl.textContent = `כיתה ${state.selectedClass} על הגל! ✨`;
    speechEl.textContent = `כל הכבוד ${firstName} — כבר פיצחת ${solved} מתוך ${total} חידות והבאת ${pts} נקודות לכיתה!`;
  } else {
    if (headingEl) headingEl.textContent = `אלופי העברית של הראל! 🏆`;
    speechEl.textContent = `וואו ${firstName}! פיצחת את כל ${total} החידות והבאת ${pts} נקודות אדירות לכיתה ${state.selectedClass}!`;
  }
}

// --- סנכרון שם תלמיד/ה בין הכותרת, המודאל ומחולל התעודה ---

function syncStudentName(newName) {
  state.certProfile.name = newName;
  const heroInput = document.getElementById('hero-student-name');
  const modalInput = document.getElementById('modal-student-name');
  const certInput = document.getElementById('student-name-input');

  if (heroInput && heroInput.value !== newName) heroInput.value = newName;
  if (modalInput && modalInput.value !== newName) modalInput.value = newName;
  if (certInput && certInput.value !== newName) certInput.value = newName;

  saveLocalState();
  updateMascotSpeech();
  updateCertificatePreview();

  const modalPrompt = document.getElementById('modal-class-prompt');
  if (modalPrompt && state.selectedClass && hasValidStudentName()) {
    modalPrompt.hidden = true;
  }
}

// מציג את 20 הכיתות בצורה מסודרת לפי שורות שכבה (ה', ו', ז', ח')
function renderGroupedClassChips(containerEl) {
  if (!containerEl) return;
  containerEl.innerHTML = '';
  containerEl.classList.add('class-chips--grouped');

  const gradeOrder = [];
  const byGrade = {};
  CONFIG.classes.forEach((cls) => {
    const grade = cls.charAt(0);
    if (!byGrade[grade]) {
      byGrade[grade] = [];
      gradeOrder.push(grade);
    }
    byGrade[grade].push(cls);
  });

  gradeOrder.forEach((grade) => {
    const row = document.createElement('div');
    row.className = 'class-grade-row';

    const label = document.createElement('span');
    label.className = 'class-grade-row__label';
    label.textContent = `שכבת ${grade}':`;
    row.appendChild(label);

    byGrade[grade].forEach((cls) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `class-chip${state.selectedClass === cls ? ' is-selected' : ''}`;
      btn.textContent = cls;
      btn.addEventListener('click', () => selectStudentClass(cls));
      row.appendChild(btn);
    });

    containerEl.appendChild(row);
  });
}

// --- בוחר הכיתה והשם בכותרת ---

function renderClassPicker() {
  const setupFields = document.getElementById('student-setup-fields');
  const heroNameInput = document.getElementById('hero-student-name');
  const chipsEl = document.getElementById('hero-class-chips');
  const selectedBar = document.getElementById('class-selected-bar');
  const changeBtn = document.getElementById('change-class-btn');
  const titleEl = document.getElementById('class-picker-title');
  const badgeEl = document.getElementById('selected-class-badge');
  const ptsEl = document.getElementById('selected-class-points-text');

  if (!chipsEl) return;
  if (heroNameInput && heroNameInput.value !== state.certProfile.name) {
    heroNameInput.value = state.certProfile.name;
  }

  const classLocked = getSolvedCount() > 0 && !state.teacherMode;
  renderGroupedClassChips(chipsEl);

  const isRegistered = Boolean(state.selectedClass && hasValidStudentName());
  if (isRegistered) {
    if (setupFields) setupFields.hidden = true;
    selectedBar.hidden = false;
    changeBtn.hidden = classLocked;
    titleEl.textContent = classLocked
      ? '🔒 הכיתה והשם שלך נעולים לשבוע התחרות (למניעת כפל ניקוד):'
      : '🏫 הפרטים שלך בתחרות השבועית:';
    badgeEl.textContent = `${state.certProfile.name.trim()} · כיתה ${state.selectedClass}`;
    ptsEl.textContent = `צברת עד כה ${getMyEarnedPoints()} נקודות לכיתה! 🌟`;
  } else {
    if (setupFields) setupFields.hidden = false;
    selectedBar.hidden = true;
    changeBtn.hidden = true;
    titleEl.textContent =
      '🏫 הירשמו לתחרות הכיתות (פעם אחת לכל השבוע — כדי שכל חידה תיספר בדיוק פעם אחת):';
  }
}

function selectStudentClass(cls) {
  if (getSolvedCount() > 0 && !state.teacherMode && state.selectedClass && state.selectedClass !== cls) {
    showToast('לא ניתן להחליף כיתה לאחר שכבר נצברו נקודות מהמכשיר הזה 🔒');
    return;
  }

  state.selectedClass = cls;
  state.certProfile.className = cls;

  const classInput = document.getElementById('student-class-input');
  if (classInput) classInput.value = cls;

  saveLocalState();
  renderClassPicker();
  renderModalClassChips();
  renderLeaderboard();
  updateMascotSpeech();
  updateCertificatePreview();

  const modalPrompt = document.getElementById('modal-class-prompt');
  if (modalPrompt && hasValidStudentName()) {
    modalPrompt.hidden = true;
  }

  if (!hasValidStudentName()) {
    const heroName = document.getElementById('hero-student-name');
    const modalName = document.getElementById('modal-student-name');
    if (modalPrompt && !modalPrompt.hidden && modalName) {
      modalName.focus();
    } else if (heroName) {
      heroName.focus();
    }
    showToast(`נבחרה כיתה ${cls}! כעת הקלידו שם פרטי ושם משפחה כדי להשלים את ההרשמה.`);
  } else {
    showToast(`מעולה! כל חידה שתפתרו תוסיף נקודות לכיתה ${cls} 🏆`);
  }
}

// --- עדכון מד התקדמות ---

function renderProgressSummary() {
  const total = CONFIG.riddles.length;
  const solvedCount = getSolvedCount();
  const percentage = total > 0 ? Math.round((solvedCount / total) * 100) : 0;

  const countText = document.getElementById('progress-count-text');
  const fill = document.getElementById('progress-bar-fill');
  const track = document.getElementById('progress-bar-track');

  if (countText) {
    countText.textContent =
      solvedCount === total
        ? `כל הכבוד! השלמת ${solvedCount} מתוך ${total} חידות 🎉`
        : `${solvedCount} מתוך ${total} חידות הושלמו`;
  }
  if (fill) fill.style.width = `${percentage}%`;
  if (track) {
    track.setAttribute('aria-valuemax', String(total));
    track.setAttribute('aria-valuenow', String(solvedCount));
  }
}

// --- טיימר ספירה לאחור ---

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
    const diff = targetDate.getTime() - Date.now();
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

// --- אייקוני SVG קומפקטיים ---

function getLockSvg() {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <rect x="4" y="11" width="16" height="10" rx="2.5"></rect>
    <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
  </svg>`;
}

function getCheckSvg() {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>`;
}

function getArrowLeftSvg() {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>`;
}

// --- רינדור מפת המסע של 7 הימים ---

function renderRoadmap() {
  const grid = document.getElementById('days-grid');
  if (!grid) return;
  grid.innerHTML = '';

  CONFIG.riddles.forEach((riddle, index) => {
    const unlocked = isDayUnlocked(index);
    const today = isDayToday(index);
    const solvedEntry = state.solvedMeta[riddle.id];
    const solved = Boolean(solvedEntry);
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
    let ptsHtml = '';
    let ctaHtml = '';

    if (!unlocked) {
      statusHtml = `<span class="day-card__status day-card__status--locked">${getLockSvg()}<span>ייפתח ב-${dateLabel}</span></span>`;
      ptsHtml = `<span class="day-card__pts">+${CONFIG.pointsPerRiddle} נק'</span>`;
      ctaHtml = `<span class="day-card__cta">${getLockSvg()}<span>נעול</span></span>`;
    } else if (solved) {
      statusHtml = `<span class="day-card__status day-card__status--done">${getCheckSvg()}<span>הושלם!</span></span>`;
      ptsHtml = `<span class="day-card__pts">+${solvedEntry.points} נק' נצברו ✓</span>`;
      ctaHtml = `<span class="day-card__cta"><span>צפייה ב"הידעת?"</span>${getArrowLeftSvg()}</span>`;
    } else if (today) {
      statusHtml = `<span class="day-card__status day-card__status--today">🔥 פתוח היום!</span>`;
      ptsHtml = `<span class="day-card__pts">עד +${CONFIG.pointsPerRiddle + CONFIG.firstTryBonus} נק'</span>`;
      ctaHtml = `<span class="day-card__cta"><span>לפתרון החידה</span>${getArrowLeftSvg()}</span>`;
    } else {
      statusHtml = `<span class="day-card__status day-card__status--open">פתוח</span>`;
      ptsHtml = `<span class="day-card__pts">עד +${CONFIG.pointsPerRiddle + CONFIG.firstTryBonus} נק'</span>`;
      ctaHtml = `<span class="day-card__cta"><span>לפתרון החידה</span>${getArrowLeftSvg()}</span>`;
    }

    card.innerHTML = `
      <div>
        <div class="day-card__top">
          <div class="day-card__day-group">
            <span class="day-card__icon-badge" aria-hidden="true">${unlocked ? riddle.icon : '🔒'}</span>
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
      <div class="day-card__bottom">
        ${ptsHtml}
        ${ctaHtml}
      </div>
    `;

    card.addEventListener('click', () => {
      if (!unlocked) {
        showToast(`חידת ${riddle.dayLabel} תיפתח אוטומטית בתאריך ${dateLabel}. סבלנות! ⏳`);
        return;
      }
      openRiddleModal(riddle.id);
    });

    grid.appendChild(card);
  });

  // כרטיס פסגת יום השיא (יום ז')
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
        <span class="day-card__icon-badge" aria-hidden="true">${peakUnlocked ? '🏆' : '🔒'}</span>
        <div>
          <span class="day-card__day-name">יום ז' · פסגת יום השיא החגיגי</span>
          <span class="day-card__date">${peakDateLabel}</span>
        </div>
        <span class="day-card__status ${
          peakUnlocked ? 'day-card__status--today' : 'day-card__status--locked'
        }">
          ${peakUnlocked ? '🎉 המתחם פתוח!' : `${getLockSvg()}<span>ייפתח ב-${peakDateLabel}</span>`}
        </span>
      </div>
      <h3 class="day-card__topic">לו"ז חגיגי, משחק שידוך ניבים ומחולל תעודת אלוף/ת העברית</h3>
      <p class="day-card__desc">
        האירוע המסכם של שבוע השפה העברית: משחקי שפה, חידונים כיתתיים ותעודה אישית מעוצבת להורדה ולהדפסה.
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
    if (peakSection) peakSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  grid.appendChild(peakCard);
}

// --- מדף תגי ההישגים (מדבקות) ---

function renderBadgesShelf() {
  const grid = document.getElementById('badges-grid');
  const summary = document.getElementById('badges-summary-text');
  if (!grid) return;

  grid.innerHTML = '';
  const solvedCount = getSolvedCount();

  if (summary) {
    summary.textContent =
      solvedCount === CONFIG.riddles.length
        ? 'מדהים! אספת את כל 6 תגי ההישגים של שבוע השפה העברית! 🏆'
        : `נאספו ${solvedCount} מתוך ${CONFIG.riddles.length} מדבקות — פתרו עוד חידות כדי להשלים את האוסף!`;
  }

  CONFIG.riddles.forEach((riddle) => {
    const unlocked = Boolean(state.solvedMeta[riddle.id]);
    const item = document.createElement('div');
    item.className = `badge-sticker${unlocked ? ' is-unlocked' : ''}`;
    item.title = unlocked
      ? `הושג ב${riddle.dayLabel}!`
      : `פתרו את חידת ${riddle.dayLabel} כדי לפתוח תג זה`;
    item.innerHTML = `
      <span class="badge-sticker__icon" aria-hidden="true">${riddle.icon}</span>
      <span class="badge-sticker__name">${riddle.badgeName}</span>
    `;
    grid.appendChild(item);
  });
}

// --- כרטיסיית "מילת היום" המתהפכת ---

function renderWordOfTheDay() {
  const list = CONFIG.wordsOfTheDay;
  if (!list.length) return;
  const item = list[state.wordIndex % list.length];

  const frontEl = document.getElementById('word-front-text');
  const meaningEl = document.getElementById('word-back-meaning');
  const exampleEl = document.getElementById('word-back-example');
  const idxEl = document.getElementById('word-index-label');
  const cardEl = document.getElementById('word-flip-card');

  if (frontEl) frontEl.textContent = item.word;
  if (meaningEl) meaningEl.textContent = item.meaning;
  if (exampleEl) exampleEl.textContent = item.example;
  if (idxEl) idxEl.textContent = `${state.wordIndex + 1} / ${list.length}`;
  if (cardEl) {
    cardEl.classList.remove('is-flipped');
    cardEl.setAttribute('aria-pressed', 'false');
  }
}

// --- 🏆 לוח תחרות הניקוד בין הכיתות ---

function getSortedClassStandings(mode, gradeFilter = 'all') {
  const activeDayId = getCurrentCompetitionDayId();

  return CONFIG.classes
    .filter((cls) => gradeFilter === 'all' || cls.startsWith(gradeFilter))
    .map((cls) => {
      const entry = state.classScores[cls] || { total: 0, byDay: {} };
      const score = mode === 'today' ? Number(entry.byDay?.[activeDayId]) || 0 : Number(entry.total) || 0;
      return { className: cls, score };
    })
    .sort((a, b) => b.score - a.score || a.className.localeCompare(b.className, 'he'));
}

function renderLeaderboard() {
  const podiumEl = document.getElementById('podium-grid');
  const listEl = document.getElementById('rankings-list');
  const todayTabBtn = document.getElementById('tab-today-scores');
  const weeklyTabBtn = document.getElementById('tab-weekly-scores');
  if (!podiumEl || !listEl) return;

  const activeDayId = getCurrentCompetitionDayId();
  const activeDayLabel = CONFIG.riddles.find((r) => r.id === activeDayId)?.dayLabel || "יום א'";
  if (todayTabBtn) {
    todayTabBtn.textContent = `ניקוד היום (${activeDayLabel})`;
    todayTabBtn.classList.toggle('is-active', state.leaderboardTab === 'today');
    todayTabBtn.setAttribute('aria-selected', String(state.leaderboardTab === 'today'));
  }
  if (weeklyTabBtn) {
    weeklyTabBtn.classList.toggle('is-active', state.leaderboardTab === 'weekly');
    weeklyTabBtn.setAttribute('aria-selected', String(state.leaderboardTab === 'weekly'));
  }

  document.querySelectorAll('.grade-filter-btn').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.grade === state.leaderboardGradeFilter);
  });

  const standings = getSortedClassStandings(state.leaderboardTab, state.leaderboardGradeFilter);
  const maxScore = Math.max(10, standings[0]?.score || 0);
  const medals = ['🥇', '🥈', '🥉'];

  // פודיום 3 הראשונים
  podiumEl.innerHTML = '';
  standings.slice(0, 3).forEach((item, idx) => {
    const isMine = item.className === state.selectedClass;
    const card = document.createElement('div');
    card.className = `podium-card podium-card--${idx + 1}`;
    card.innerHTML = `
      <div class="podium-card__medal" aria-hidden="true">${medals[idx]}</div>
      <div class="podium-card__class">כיתה ${item.className}</div>
      <div class="podium-card__pts">${item.score} נקודות</div>
      ${isMine ? '<span class="podium-card__mine">הכיתה שלך!</span>' : ''}
    `;
    podiumEl.appendChild(card);
  });

  // רשימת כל הכיתות
  listEl.innerHTML = '';
  standings.forEach((item, idx) => {
    const isMine = item.className === state.selectedClass;
    const widthPct = item.score > 0 ? Math.max(8, Math.round((item.score / maxScore) * 100)) : 0;

    const row = document.createElement('div');
    row.className = `rank-row${isMine ? ' is-my-class' : ''}`;
    row.innerHTML = `
      <span class="rank-row__pos">${idx + 1}</span>
      <span class="rank-row__name">${item.className}${isMine ? ' ⭐' : ''}</span>
      <div class="rank-row__bar" aria-hidden="true">
        <div class="rank-row__fill" style="width: ${widthPct}%"></div>
      </div>
      <span class="rank-row__pts">${item.score} נק'</span>
    `;
    listEl.appendChild(row);
  });
}

// --- מודאל החידה היומית (כולל רמז, בדיקת כיתה, קונפטי וניקוד אוטומטי) ---

function renderModalClassChips() {
  const container = document.getElementById('modal-class-chips');
  renderGroupedClassChips(container);
}

function openRiddleModal(riddleId) {
  const riddle = CONFIG.riddles.find((r) => r.id === riddleId);
  if (!riddle) return;

  lastFocusedElement = document.activeElement;
  state.activeRiddleId = riddleId;
  state.activeRiddleHadWrongAttempt = false;

  const modal = document.getElementById('riddle-modal');
  const iconEl = document.getElementById('modal-day-icon');
  const dayLabel = document.getElementById('modal-day-label');
  const categoryLabel = document.getElementById('modal-category-label');
  const titleEl = document.getElementById('modal-title');
  const emojiEl = document.getElementById('modal-emoji-clue');
  const hintArea = document.getElementById('modal-hint-area');
  const hintBtn = document.getElementById('modal-hint-btn');
  const hintText = document.getElementById('modal-hint-text');
  const optionsEl = document.getElementById('modal-options');
  const feedbackEl = document.getElementById('modal-feedback');
  const dykEl = document.getElementById('modal-dyk');
  const dykTextEl = document.getElementById('modal-dyk-text');
  const unlockedBadgeEl = document.getElementById('modal-unlocked-badge');
  const modalClassPrompt = document.getElementById('modal-class-prompt');

  if (!modal || !optionsEl) return;

  const solvedEntry = state.solvedMeta[riddle.id];
  const alreadySolved = Boolean(solvedEntry);

  if (iconEl) iconEl.textContent = riddle.icon;
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

  // תזכורת למילוי שם מלא וכיתה אם טרם מולאו והחידה טרם נפתרה
  if (modalClassPrompt) {
    const modalNameInput = document.getElementById('modal-student-name');
    if (modalNameInput) modalNameInput.value = state.certProfile.name;

    if (!alreadySolved && (!state.selectedClass || !hasValidStudentName())) {
      renderModalClassChips();
      modalClassPrompt.hidden = false;
    } else {
      modalClassPrompt.hidden = true;
    }
  }

  // רמז
  if (hintArea && hintBtn && hintText) {
    if (riddle.hint && !alreadySolved) {
      hintArea.hidden = false;
      hintText.textContent = `💡 רמז: ${riddle.hint}`;
      hintText.hidden = true;
      hintBtn.setAttribute('aria-expanded', 'false');
      hintBtn.textContent = '💡 צריכים רמז קטן?';
    } else {
      hintArea.hidden = true;
    }
  }

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
      if (idx === riddle.correctIndex) btn.classList.add('option-btn--correct');
    } else {
      btn.addEventListener('click', () => handleOptionSelect(riddle, idx, btn));
    }
    optionsEl.appendChild(btn);
  });

  if (alreadySolved) {
    feedbackEl.className = 'feedback-box feedback-box--success';
    feedbackEl.textContent = `חידה זו כבר נפתרה בהצלחה! (+${solvedEntry.points} נקודות${
      solvedEntry.className ? ` לכיתה ${solvedEntry.className}` : ''
    })`;
    feedbackEl.hidden = false;
    dykTextEl.textContent = riddle.didYouKnow;
    if (unlockedBadgeEl) unlockedBadgeEl.textContent = `🏅 תג פתוח: ${riddle.badgeName}`;
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
  const unlockedBadgeEl = document.getElementById('modal-unlocked-badge');
  const hintArea = document.getElementById('modal-hint-area');
  const modalClassPrompt = document.getElementById('modal-class-prompt');

  // מחייבים שם מלא + כיתה לפני זקיפת ניקוד (למניעת כפל ניקוד וגם להכנת התעודה)
  if ((!state.selectedClass || !hasValidStudentName()) && chosenIndex === riddle.correctIndex && modalClassPrompt) {
    const modalNameInput = document.getElementById('modal-student-name');
    if (modalNameInput) modalNameInput.value = state.certProfile.name;
    renderModalClassChips();
    modalClassPrompt.hidden = false;
    modalClassPrompt.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (!hasValidStudentName() && modalNameInput) modalNameInput.focus();
    showToast('רגע לפני הנקודות — הקלידו שם מלא ובחרו כיתה למעלה כדי שהניקוד יירשם פעם אחת! 🏫');
    return;
  }

  if (chosenIndex === riddle.correctIndex) {
    const allButtons = optionsEl.querySelectorAll('.option-btn');
    allButtons.forEach((b) => {
      b.disabled = true;
      b.classList.remove('option-btn--wrong');
    });
    clickedBtn.classList.add('option-btn--correct');
    if (hintArea) hintArea.hidden = true;
    if (modalClassPrompt) modalClassPrompt.hidden = true;

    const earnedPoints = state.activeRiddleHadWrongAttempt
      ? CONFIG.pointsPerRiddle
      : CONFIG.pointsPerRiddle + CONFIG.firstTryBonus;
    const praise = PRAISE_PHRASES[Math.floor(Math.random() * PRAISE_PHRASES.length)];
    const bonusNote = state.activeRiddleHadWrongAttempt ? '' : ' (כולל +2 בונוס לניסיון ראשון!)';

    feedbackEl.className = 'feedback-box feedback-box--success';
    feedbackEl.textContent = `${praise} +${earnedPoints} נקודות נוספו אוטומטית לכיתה ${state.selectedClass}${bonusNote}`;
    feedbackEl.hidden = false;

    dykTextEl.textContent = riddle.didYouKnow;
    if (unlockedBadgeEl) unlockedBadgeEl.textContent = `🏅 זכית במדבקה: ${riddle.badgeName}`;
    dykEl.hidden = false;
    dykEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    state.solvedMeta[riddle.id] = {
      points: earnedPoints,
      className: state.selectedClass,
      solvedAt: new Date().toISOString(),
    };
    saveLocalState();

    // שליחת ניקוד אוטומטית לכיתה (מקומי + Firebase / Google Sheets)
    recordClassPoints({
      className: state.selectedClass,
      riddleId: riddle.id,
      points: earnedPoints,
      studentName: state.certProfile.name,
    });

    playChime('success');
    launchConfetti();
    renderProgressSummary();
    renderRoadmap();
    renderBadgesShelf();
    renderClassPicker();
    updateMascotSpeech();
    updateCertificatePreview();
  } else {
    state.activeRiddleHadWrongAttempt = true;
    clickedBtn.classList.remove('option-btn--wrong');
    void clickedBtn.offsetWidth;
    clickedBtn.classList.add('option-btn--wrong');

    playChime('error');
    feedbackEl.className = 'feedback-box feedback-box--error';
    feedbackEl.textContent = 'אופס, כמעט! נסו שוב — אפשר גם להיעזר בכפתור הרמז למעלה 💡';
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

// --- מיני-משחק מובנה ליום השיא: שידוך ניבים ---

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function resetIdiomMatchGame() {
  state.matchGame = {
    selectedIdiomId: null,
    selectedMeaningId: null,
    matchedIds: new Set(),
    shuffledMeanings: shuffleArray(CONFIG.idiomMatchPairs),
  };
  const feedbackEl = document.getElementById('match-feedback');
  if (feedbackEl) feedbackEl.hidden = true;
  renderIdiomMatchGame();
}

function renderIdiomMatchGame() {
  const idiomsCol = document.getElementById('match-idioms-col');
  const meaningsCol = document.getElementById('match-meanings-col');
  const scorePill = document.getElementById('match-score-pill');
  if (!idiomsCol || !meaningsCol) return;

  const { selectedIdiomId, selectedMeaningId, matchedIds, shuffledMeanings } = state.matchGame;
  if (scorePill) {
    scorePill.textContent = `זוגות שנמצאו: ${matchedIds.size} / ${CONFIG.idiomMatchPairs.length}`;
  }

  idiomsCol.innerHTML = '';
  CONFIG.idiomMatchPairs.forEach((pair) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    const matched = matchedIds.has(pair.id);
    btn.className = `match-tile${matched ? ' is-matched' : ''}${
      selectedIdiomId === pair.id ? ' is-selected' : ''
    }`;
    btn.disabled = matched;
    btn.textContent = matched ? `✓ ${pair.idiom}` : pair.idiom;
    btn.addEventListener('click', () => handleMatchClick('idiom', pair.id, btn));
    idiomsCol.appendChild(btn);
  });

  meaningsCol.innerHTML = '';
  shuffledMeanings.forEach((pair) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    const matched = matchedIds.has(pair.id);
    btn.className = `match-tile${matched ? ' is-matched' : ''}${
      selectedMeaningId === pair.id ? ' is-selected' : ''
    }`;
    btn.disabled = matched;
    btn.textContent = matched ? `✓ ${pair.meaning}` : pair.meaning;
    btn.addEventListener('click', () => handleMatchClick('meaning', pair.id, btn));
    meaningsCol.appendChild(btn);
  });
}

function handleMatchClick(side, pairId, clickedEl) {
  if (side === 'idiom') {
    state.matchGame.selectedIdiomId = pairId;
  } else {
    state.matchGame.selectedMeaningId = pairId;
  }

  const { selectedIdiomId, selectedMeaningId } = state.matchGame;
  if (selectedIdiomId !== null && selectedMeaningId !== null) {
    if (selectedIdiomId === selectedMeaningId) {
      state.matchGame.matchedIds.add(selectedIdiomId);
      state.matchGame.selectedIdiomId = null;
      state.matchGame.selectedMeaningId = null;
      playChime('success');
      renderIdiomMatchGame();

      if (state.matchGame.matchedIds.size === CONFIG.idiomMatchPairs.length) {
        launchConfetti();
        const feedbackEl = document.getElementById('match-feedback');
        if (feedbackEl) {
          feedbackEl.textContent = '🎉 כל הכבוד! שידכתם בהצלחה את כל 6 הניבים העבריים!';
          feedbackEl.hidden = false;
        }
      }
    } else {
      playChime('error');
      clickedEl.classList.add('is-wrong');
      setTimeout(() => {
        state.matchGame.selectedIdiomId = null;
        state.matchGame.selectedMeaningId = null;
        renderIdiomMatchGame();
      }, 360);
    }
  } else {
    renderIdiomMatchGame();
  }
}

// --- מתחם יום השיא ---

function renderPeakDaySection() {
  const unlocked = isDayUnlocked(6);
  const lockedPanel = document.getElementById('peak-locked-panel');
  const unlockedContent = document.getElementById('peak-unlocked-content');
  const lockedDesc = document.getElementById('peak-locked-desc');

  if (lockedPanel) lockedPanel.hidden = unlocked;
  if (unlockedContent) unlockedContent.hidden = !unlocked;

  if (!unlocked && lockedDesc) {
    const peakDate = formatFullHebrewDate(parseLocalDate(CONFIG.dayDates[6]));
    lockedDesc.textContent = `המתחם ייפתח אוטומטית ב${peakDate}. בינתיים המשיכו לפתור חידות, לאסוף מדבקות ולצבור נקודות לכיתה!`;
  }

  renderScheduleList();
  renderGamesList();
  if (!state.matchGame.shuffledMeanings.length) {
    resetIdiomMatchGame();
  }
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
      <span class="game-card__action">לפתיחה ↗</span>
    `;
    listEl.appendChild(a);
  });
}

// --- מחולל תעודת אלוף/ת העברית (תצוגה חיה + PDF + PNG) ---

function getCertificateCopy() {
  const isMale = state.certProfile.gender === 'male';
  const total = CONFIG.riddles.length;
  const solved = getSolvedCount();
  const earnedPts = getMyEarnedPoints();
  const trimmedName = state.certProfile.name.trim();
  const trimmedClass = state.certProfile.className.trim();

  const title = isMale ? 'תעודת אלוף העברית' : 'תעודת אלופת העברית';
  const awardedTo = isMale
    ? 'מוענקת בזאת בהערכה רבה לתלמיד'
    : 'מוענקת בזאת בהערכה רבה לתלמידה';

  const solvedVerb = isMale ? 'ופתר' : 'ופתרה';
  const showedVerb = isMale ? 'גילה' : 'גילתה';
  const ptsClause = earnedPts > 0 ? ` וצבר${isMale ? '' : 'ה'} ${earnedPts} נקודות לכיתה` : '';
  const body = `על השתתפות פעילה ומעוררת השראה בשבוע השפה העברית, במהלכו ${showedVerb} סקרנות, יצירתיות ואהבת השפה, ${solvedVerb} ${solved} מתוך ${total} חידות השבוע${ptsClause}.`;

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
    earnedPts,
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
  if (formScoreEl) {
    formScoreEl.textContent = `${copy.solved} מתוך ${copy.total} חידות · ${copy.earnedPts} נקודות לכיתה`;
  }
}

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
      // ממשיכים גם ללא טעינת פונט מלאה
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

  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#fffdf9');
  bgGrad.addColorStop(0.65, '#ffffff');
  bgGrad.addColorStop(1, '#f3f8ff');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = 'rgba(14, 165, 233, 0.065)';
  ctx.beginPath();
  ctx.arc(0, 0, 260, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(width, height, 280, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#0e2a47';
  ctx.lineWidth = 10;
  ctx.strokeRect(48, 48, width - 96, height - 96);

  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(70, 70, width - 140, height - 140);

  const cornerLen = 36;
  ctx.strokeStyle = '#0e2a47';
  ctx.lineWidth = 5;
  [
    [82, 82, 1, 1],
    [width - 82, 82, -1, 1],
    [82, height - 82, 1, -1],
    [width - 82, height - 82, -1, -1],
  ].forEach(([cx, cy, dx, dy]) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy + dy * cornerLen);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx + dx * cornerLen, cy);
    ctx.stroke();
  });

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

  ctx.fillStyle = '#0284c7';
  ctx.font = '700 28px "Heebo", sans-serif';
  ctx.fillText(CONFIG.certificateSchoolLine, width / 2, 272);

  ctx.fillStyle = '#0e2a47';
  ctx.font = '900 84px "Frank Ruhl Libre", Georgia, serif';
  ctx.fillText(copy.title, width / 2, 365);

  ctx.fillStyle = '#43586f';
  ctx.font = '600 32px "Assistant", sans-serif';
  ctx.fillText(copy.awardedTo, width / 2, 448);

  ctx.fillStyle = '#0e2a47';
  ctx.font = '900 66px "Heebo", sans-serif';
  ctx.fillText(copy.displayName, width / 2, 536);

  const nameWidth = Math.max(460, Math.min(920, ctx.measureText(copy.displayName).width + 120));
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - nameWidth / 2, 588);
  ctx.lineTo(width / 2 + nameWidth / 2, 588);
  ctx.stroke();

  let nextY = 660;
  if (copy.classLabel) {
    ctx.fillStyle = '#6b7f96';
    ctx.font = '700 30px "Heebo", sans-serif';
    ctx.fillText(copy.classLabel, width / 2, 628);
    nextY = 690;
  }

  ctx.fillStyle = '#334155';
  ctx.font = '600 30px "Assistant", sans-serif';
  const afterBodyY = drawWrappedText(ctx, copy.body, width / 2, nextY, 1120, 46);

  const badgeY = Math.min(870, afterBodyY + 42);
  ctx.font = '800 28px "Heebo", sans-serif';
  const rankTextWidth = ctx.measureText(copy.rank).width;
  const pillW = rankTextWidth + 72;
  const pillH = 54;
  ctx.fillStyle = '#fef5d4';
  ctx.beginPath();
  ctx.roundRect(width / 2 - pillW / 2, badgeY - pillH / 2, pillW, pillH, 27);
  ctx.fill();
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#9a6b08';
  ctx.fillText(copy.rank, width / 2, badgeY + 2);

  const footerY = 988;
  const rightSigX = width - 340;
  const leftSigX = 340;

  ctx.strokeStyle = '#17416c';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(rightSigX - 135, footerY - 12);
  ctx.lineTo(rightSigX + 135, footerY - 12);
  ctx.stroke();

  ctx.fillStyle = '#6b7f96';
  ctx.font = '600 24px "Heebo", sans-serif';
  ctx.fillText(CONFIG.certificateSignature, rightSigX, footerY + 20);

  ctx.fillStyle = '#0e2a47';
  ctx.font = '700 26px "Heebo", sans-serif';
  ctx.fillText(copy.dateText, leftSigX, footerY - 34);

  ctx.beginPath();
  ctx.moveTo(leftSigX - 115, footerY - 12);
  ctx.lineTo(leftSigX + 115, footerY - 12);
  ctx.stroke();

  ctx.fillStyle = '#6b7f96';
  ctx.font = '600 24px "Heebo", sans-serif';
  ctx.fillText('תאריך', leftSigX, footerY + 20);

  const safeName = copy.displayName
    .replace(/[^\u0590-\u05FFa-zA-Z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  const link = document.createElement('a');
  link.download = `תעודת-שבוע-השפה-העברית-${safeName || 'אישית'}.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('התעודה ירדה בהצלחה! 🎉');
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

// --- לוח דוח ניקוד למורה (טבלה יומית, ייצוא CSV ל-Excel והעתקת סיכום יומי) ---

function renderTeacherReportTable() {
  const tbody = document.getElementById('teacher-report-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const rows = CONFIG.classes
    .map((cls) => ({
      cls,
      data: state.classScores[cls] || { total: 0, byDay: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 } },
    }))
    .sort((a, b) => b.data.total - a.data.total || a.cls.localeCompare(b.cls, 'he'));

  rows.forEach(({ cls, data }) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>כיתה ${cls}</td>
      <td>${data.byDay[1] || 0}</td>
      <td>${data.byDay[2] || 0}</td>
      <td>${data.byDay[3] || 0}</td>
      <td>${data.byDay[4] || 0}</td>
      <td>${data.byDay[5] || 0}</td>
      <td>${data.byDay[6] || 0}</td>
      <td class="teacher-table__total">${data.total || 0}</td>
    `;
    tbody.appendChild(tr);
  });
}

function exportTeacherCsv() {
  const header = ['כיתה', "יום א'", "יום ב'", "יום ג'", "יום ד'", "יום ה'", "יום ו'", 'סה"כ נקודות'];
  const lines = [header.join(',')];

  const rows = CONFIG.classes
    .map((cls) => ({
      cls,
      data: state.classScores[cls] || { total: 0, byDay: {} },
    }))
    .sort((a, b) => b.data.total - a.data.total);

  rows.forEach(({ cls, data }) => {
    lines.push(
      [
        `"כיתה ${cls}"`,
        data.byDay[1] || 0,
        data.byDay[2] || 0,
        data.byDay[3] || 0,
        data.byDay[4] || 0,
        data.byDay[5] || 0,
        data.byDay[6] || 0,
        data.total || 0,
      ].join(',')
    );
  });

  // הוספת BOM כדי ש-Excel יפתח את העברית בצורה תקינה לחלוטין
  const blob = new Blob([`\uFEFF${lines.join('\n')}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `דוח-ניקוד-שבוע-השפה-העברית-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('דוח הניקוד ירד כקובץ Excel/CSV בהצלחה! 📊');
}

async function copyDailySummaryForTeacher() {
  const activeDayId = getCurrentCompetitionDayId();
  const activeDayLabel = CONFIG.riddles.find((r) => r.id === activeDayId)?.dayLabel || "יום א'";
  const todayStandings = getSortedClassStandings('today');
  const weeklyStandings = getSortedClassStandings('weekly');

  const lines = [
    `🏆 סיכום ניקוד שבוע השפה העברית (${activeDayLabel} · ${new Date().toLocaleDateString('he-IL')})`,
    '',
    `📌 מובילות היום (${activeDayLabel}):`,
    ...todayStandings.map((s, i) => `${i + 1}. כיתה ${s.className} — ${s.score} נקודות`),
    '',
    '🌟 טבלה מצטברת לשבוע:',
    ...weeklyStandings.map((s, i) => `${i + 1}. כיתה ${s.className} — ${s.score} נקודות`),
  ];

  const text = lines.join('\n');
  try {
    await navigator.clipboard.writeText(text);
    showToast('הסיכום היומי הועתק! אפשר להדביק ישירות במייל או בוואטסאפ 📋');
  } catch {
    showToast('לא ניתן להעתיק אוטומטית בדפדפן זה — ניתן להוריד CSV במקום.');
  }
}

function addDemoClassScores() {
  const activeDayId = getCurrentCompetitionDayId();
  CONFIG.classes.forEach((cls) => {
    const entry = ensureClassEntry(cls);
    const todayPts = (Math.floor(Math.random() * 8) + 2) * 10;
    const prevPts = (Math.floor(Math.random() * 12) + 4) * 10;
    entry.byDay[activeDayId] = (entry.byDay[activeDayId] || 0) + todayPts;
    const prevDay = activeDayId > 1 ? activeDayId - 1 : 1;
    if (prevDay !== activeDayId) {
      entry.byDay[prevDay] = (entry.byDay[prevDay] || 0) + prevPts;
    }
    entry.total = Object.values(entry.byDay).reduce((a, b) => a + b, 0);
  });
  saveLocalState();
  renderLeaderboard();
  renderTeacherReportTable();
  showToast('נוספו נקודות דמה לבדיקת לוח התחרות והדוח! 🎲');
}

// --- מצב בדיקה למורה (מוגן בקוד מורה) ואיפוס ---

function openTeacherPinModal() {
  const pinModal = document.getElementById('teacher-pin-modal');
  const pinInput = document.getElementById('teacher-pin-input');
  const pinError = document.getElementById('teacher-pin-error');
  if (!pinModal) return;

  if (pinInput) pinInput.value = '';
  if (pinError) pinError.hidden = true;
  pinModal.hidden = false;
  document.body.style.overflow = 'hidden';
  if (pinInput) pinInput.focus();
}

function closeTeacherPinModal() {
  const pinModal = document.getElementById('teacher-pin-modal');
  if (!pinModal || pinModal.hidden) return;
  pinModal.hidden = true;
  document.body.style.overflow = '';
}

function setTeacherMode(enabled) {
  state.teacherMode = enabled;
  if (!enabled) state.teacherReportOpen = false;

  const banner = document.getElementById('teacher-banner');
  const drawer = document.getElementById('teacher-report-drawer');
  const footerBtn = document.getElementById('teacher-mode-btn');
  const footerResetBtn = document.getElementById('footer-reset-btn');

  if (banner) banner.hidden = !enabled;
  if (drawer) drawer.hidden = !enabled || !state.teacherReportOpen;
  if (footerBtn) {
    footerBtn.setAttribute('aria-pressed', String(enabled));
    footerBtn.textContent = enabled ? 'מצב בדיקה למורה (פעיל)' : 'מצב בדיקה למורה';
  }
  if (footerResetBtn) footerResetBtn.hidden = !enabled;

  renderClassPicker();
  renderRoadmap();
  renderPeakDaySection();
  renderTeacherReportTable();

  showToast(
    enabled
      ? 'מצב בדיקה למורה הופעל — כל 7 הימים פתוחים (במצב זה לא נשלח ניקוד לענן).'
      : 'חזרה למצב רגיל לפי תאריכי הפתיחה.'
  );
}

function toggleTeacherReport(open) {
  state.teacherReportOpen = open;
  const drawer = document.getElementById('teacher-report-drawer');
  if (drawer) {
    drawer.hidden = !open;
    if (open) {
      renderTeacherReportTable();
      drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

function resetProgressForTesting() {
  state.solvedMeta = {};
  state.selectedClass = '';
  state.classScores = createEmptyScoresMap();
  state.certProfile = { name: '', className: '', gender: 'female' };

  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      if (key !== STORAGE_KEYS.SOUND_ENABLED && key !== STORAGE_KEYS.DEVICE_ID) {
        localStorage.removeItem(key);
      }
    });
  } catch {
    // התעלמות שקטה
  }
  // ניקוי עוגיית החידות הפתורות לבדיקת המורה בלבד
  writeCookie(COOKIE_KEYS.SOLVED_IDS, '', -1);

  const heroNameInput = document.getElementById('hero-student-name');
  const modalNameInput = document.getElementById('modal-student-name');
  const nameInput = document.getElementById('student-name-input');
  const classInput = document.getElementById('student-class-input');
  const femaleRadio = document.querySelector('input[name="cert-gender"][value="female"]');
  if (heroNameInput) heroNameInput.value = '';
  if (modalNameInput) modalNameInput.value = '';
  if (nameInput) nameInput.value = '';
  if (classInput) classInput.value = '';
  if (femaleRadio) femaleRadio.checked = true;

  closeRiddleModal();
  renderClassPicker();
  renderProgressSummary();
  renderRoadmap();
  renderBadgesShelf();
  renderLeaderboard();
  renderTeacherReportTable();
  resetIdiomMatchGame();
  updateMascotSpeech();
  updateCertificatePreview();
  showToast('ההתקדמות והניקוד המקומי אופסו בהצלחה לבדיקה מחדש.');
}

// --- חיבור אירועים ואתחול ---

function bindEvents() {
  // מתג צלילים
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      saveLocalState();
      updateSoundButtonUI();
      if (state.soundEnabled) playChime('success');
    });
  }

  // שדה שם התלמיד/ה בכותרת ובמודאל (מסונכרנים אוטומטית עם התעודה)
  const heroNameInput = document.getElementById('hero-student-name');
  const heroSaveBtn = document.getElementById('hero-save-student-btn');
  const modalNameInput = document.getElementById('modal-student-name');
  if (heroNameInput) {
    heroNameInput.value = state.certProfile.name;
    heroNameInput.addEventListener('input', (e) => {
      syncStudentName(e.target.value);
    });
    heroNameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (heroSaveBtn) heroSaveBtn.click();
      }
    });
  }
  if (heroSaveBtn) {
    heroSaveBtn.addEventListener('click', () => {
      if (!hasValidStudentName()) {
        if (heroNameInput) heroNameInput.focus();
        showToast('אנא הקלידו שם פרטי ושם משפחה.');
        return;
      }
      if (!state.selectedClass) {
        showToast('מעולה! עכשיו בחרו את הכיתה שלכם למטה 👇');
        return;
      }
      renderClassPicker();
      updateMascotSpeech();
      showToast(`נרשמת בהצלחה! כל חידה שתפתרו תוסיף נקודות לכיתה ${state.selectedClass} 🏆`);
    });
  }
  if (modalNameInput) {
    modalNameInput.value = state.certProfile.name;
    modalNameInput.addEventListener('input', (e) => {
      syncStudentName(e.target.value);
      renderClassPicker();
    });
  }

  // עריכת פרטים בכותרת (זמינה רק לפני פתרון החידה הראשונה)
  const changeClassBtn = document.getElementById('change-class-btn');
  if (changeClassBtn) {
    changeClassBtn.addEventListener('click', () => {
      const setupFields = document.getElementById('student-setup-fields');
      if (setupFields) setupFields.hidden = !setupFields.hidden;
    });
  }

  // מודאל חידה ורמז
  const modal = document.getElementById('riddle-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const doneBtn = document.getElementById('modal-done-btn');
  const hintBtn = document.getElementById('modal-hint-btn');
  const hintText = document.getElementById('modal-hint-text');

  if (closeBtn) closeBtn.addEventListener('click', closeRiddleModal);
  if (doneBtn) doneBtn.addEventListener('click', closeRiddleModal);
  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeRiddleModal();
    });
  }
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeRiddleModal();
      closeTeacherPinModal();
    }
  });

  if (hintBtn && hintText) {
    hintBtn.addEventListener('click', () => {
      const willShow = hintText.hidden;
      hintText.hidden = !willShow;
      hintBtn.setAttribute('aria-expanded', String(willShow));
      hintBtn.textContent = willShow ? '💡 הסתרת הרמז' : '💡 צריכים רמז קטן?';
    });
  }

  // כרטיסיית מילת היום מתהפכת
  const flipCard = document.getElementById('word-flip-card');
  const prevWordBtn = document.getElementById('word-prev-btn');
  const nextWordBtn = document.getElementById('word-next-btn');

  if (flipCard) {
    flipCard.addEventListener('click', () => {
      const flipped = flipCard.classList.toggle('is-flipped');
      flipCard.setAttribute('aria-pressed', String(flipped));
    });
  }
  if (prevWordBtn) {
    prevWordBtn.addEventListener('click', () => {
      state.wordIndex = (state.wordIndex - 1 + CONFIG.wordsOfTheDay.length) % CONFIG.wordsOfTheDay.length;
      renderWordOfTheDay();
    });
  }
  if (nextWordBtn) {
    nextWordBtn.addEventListener('click', () => {
      state.wordIndex = (state.wordIndex + 1) % CONFIG.wordsOfTheDay.length;
      renderWordOfTheDay();
    });
  }

  // טאבים בלוח התחרות בין הכיתות
  const todayTabBtn = document.getElementById('tab-today-scores');
  const weeklyTabBtn = document.getElementById('tab-weekly-scores');
  if (todayTabBtn) {
    todayTabBtn.addEventListener('click', () => {
      state.leaderboardTab = 'today';
      renderLeaderboard();
    });
  }
  if (weeklyTabBtn) {
    weeklyTabBtn.addEventListener('click', () => {
      state.leaderboardTab = 'weekly';
      renderLeaderboard();
    });
  }
  document.querySelectorAll('.grade-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.leaderboardGradeFilter = btn.dataset.grade || 'all';
      renderLeaderboard();
    });
  });

  // משחק שידוך ניבים
  const matchResetBtn = document.getElementById('match-reset-btn');
  if (matchResetBtn) matchResetBtn.addEventListener('click', resetIdiomMatchGame);

  // טופס תעודה
  const nameInput = document.getElementById('student-name-input');
  const classInput = document.getElementById('student-class-input');
  const genderRadios = document.querySelectorAll('input[name="cert-gender"]');
  const pngBtn = document.getElementById('download-png-btn');
  const printBtn = document.getElementById('print-pdf-btn');

  if (nameInput) {
    nameInput.value = state.certProfile.name;
    nameInput.addEventListener('input', (e) => {
      syncStudentName(e.target.value);
    });
  }
  if (classInput) {
    classInput.value = state.certProfile.className;
    classInput.addEventListener('input', (e) => {
      state.certProfile.className = e.target.value;
      saveLocalState();
      updateCertificatePreview();
    });
  }
  genderRadios.forEach((radio) => {
    radio.checked = radio.value === state.certProfile.gender;
    radio.addEventListener('change', (e) => {
      if (e.target.checked) {
        state.certProfile.gender = e.target.value;
        saveLocalState();
        updateCertificatePreview();
      }
    });
  });

  if (pngBtn) pngBtn.addEventListener('click', downloadCertificatePng);
  if (printBtn) printBtn.addEventListener('click', handlePrintCertificate);

  // מודאל קוד כניסה למורה
  const pinModal = document.getElementById('teacher-pin-modal');
  const pinForm = document.getElementById('teacher-pin-form');
  const pinInput = document.getElementById('teacher-pin-input');
  const pinError = document.getElementById('teacher-pin-error');
  const pinCloseBtn = document.getElementById('pin-modal-close-btn');
  const pinCancelBtn = document.getElementById('pin-modal-cancel-btn');

  if (pinCloseBtn) pinCloseBtn.addEventListener('click', closeTeacherPinModal);
  if (pinCancelBtn) pinCancelBtn.addEventListener('click', closeTeacherPinModal);
  if (pinModal) {
    pinModal.addEventListener('click', (event) => {
      if (event.target === pinModal) closeTeacherPinModal();
    });
  }
  if (pinForm) {
    pinForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const entered = (pinInput?.value || '').trim();
      if (!CONFIG.teacherPin || entered === String(CONFIG.teacherPin)) {
        closeTeacherPinModal();
        setTeacherMode(true);
      } else {
        if (pinError) pinError.hidden = false;
        if (pinInput) {
          pinInput.value = '';
          pinInput.focus();
        }
      }
    });
  }

  // כפתורי מצב מורה ודוח ניקוד
  const teacherModeBtn = document.getElementById('teacher-mode-btn');
  const bannerExitBtn = document.getElementById('banner-exit-btn');
  const bannerResetBtn = document.getElementById('banner-reset-btn');
  const footerResetBtn = document.getElementById('footer-reset-btn');
  const bannerReportBtn = document.getElementById('banner-report-btn');
  const closeReportBtn = document.getElementById('close-report-btn');
  const bannerDemoBtn = document.getElementById('banner-demo-btn');
  const exportCsvBtn = document.getElementById('export-csv-btn');
  const copySummaryBtn = document.getElementById('copy-daily-summary-btn');

  if (teacherModeBtn) {
    teacherModeBtn.addEventListener('click', () => {
      if (state.teacherMode) {
        setTeacherMode(false);
      } else if (CONFIG.teacherPin) {
        openTeacherPinModal();
      } else {
        setTeacherMode(true);
      }
    });
  }
  if (bannerExitBtn) bannerExitBtn.addEventListener('click', () => setTeacherMode(false));
  if (bannerResetBtn) bannerResetBtn.addEventListener('click', resetProgressForTesting);
  if (footerResetBtn) footerResetBtn.addEventListener('click', resetProgressForTesting);
  if (bannerReportBtn) {
    bannerReportBtn.addEventListener('click', () => toggleTeacherReport(!state.teacherReportOpen));
  }
  if (closeReportBtn) closeReportBtn.addEventListener('click', () => toggleTeacherReport(false));
  if (bannerDemoBtn) bannerDemoBtn.addEventListener('click', addDemoClassScores);
  if (exportCsvBtn) exportCsvBtn.addEventListener('click', exportTeacherCsv);
  if (copySummaryBtn) copySummaryBtn.addEventListener('click', copyDailySummaryForTeacher);
}

function initApp() {
  loadStateFromStorage();

  // מילת היום מתחילה אוטומטית לפי היום הנוכחי של השבוע
  state.wordIndex = (getCurrentCompetitionDayId() - 1) % CONFIG.wordsOfTheDay.length;

  const eyebrow = document.getElementById('school-eyebrow');
  if (eyebrow) eyebrow.textContent = CONFIG.schoolSubtitle;

  updateSoundButtonUI();
  bindEvents();
  initCountdown();
  renderClassPicker();
  renderProgressSummary();
  renderRoadmap();
  renderBadgesShelf();
  renderWordOfTheDay();
  renderLeaderboard();
  renderPeakDaySection();
  updateMascotSpeech();
  initCloudSync();
}

document.addEventListener('DOMContentLoaded', initApp);
