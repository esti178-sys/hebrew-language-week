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

  // --- 8. מערך 6 החידות היומיות של בית ספר הראל (כולל איורי SVG מונפשים מובנים) ---
  riddles: [
    {
      id: 1,
      dayLabel: "יום א'",
      icon: '🌙',
      badgeName: 'מחדש/ת מילים',
      category: 'חידת תמונה',
      shortDesc: 'איך קוראת האקדמיה ללשון העברית לפיג\'מה?',
      question: 'איך קוראת האקדמיה ללשון העברית לפיג\'מה?',
      svgIllustration: `
        <svg viewBox="0 0 360 185" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="איור של דמות בפיג'מת פסים וכובע שינה עם סימני Zzz">
          <!-- רקע לילה עדין -->
          <rect x="14" y="10" width="332" height="165" rx="22" fill="#EBF5FF" />
          <circle cx="62" cy="48" r="18" fill="#F5C443" />
          <circle cx="70" cy="44" r="15" fill="#EBF5FF" />
          <circle cx="98" cy="36" r="2.6" fill="#0EA5E9" />
          <circle cx="294" cy="42" r="3" fill="#F5C443" />
          <circle cx="310" cy="70" r="2.2" fill="#38BDF8" />

          <!-- גוף הדמות בפיג'מת פסים -->
          <g transform="translate(115, 22)">
            <!-- צוואר וגוף פיג'מה -->
            <path d="M22 152 C22 108 38 92 65 92 C92 92 108 108 108 152 Z" fill="#17416C" />
            <!-- פסים של הפיג'מה -->
            <path d="M28 118 H102" stroke="#38BDF8" stroke-width="6" stroke-linecap="round" />
            <path d="M24 134 H106" stroke="#38BDF8" stroke-width="6" stroke-linecap="round" />
            <path d="M23 148 H107" stroke="#BAE6FD" stroke-width="5" stroke-linecap="round" />
            <!-- צווארון וכפתורים -->
            <path d="M47 93 L65 110 L83 93" fill="#FFFFFF" stroke="#0E2A47" stroke-width="2.5" stroke-linejoin="round" />
            <circle cx="65" cy="118" r="3.2" fill="#F5C443" />
            <circle cx="65" cy="134" r="3.2" fill="#F5C443" />
            <!-- כיס קטן -->
            <rect x="75" y="114" width="16" height="15" rx="4" fill="#0E2A47" stroke="#F5C443" stroke-width="1.8" />

            <!-- ראש ישן וחמוד -->
            <circle cx="65" cy="66" r="28" fill="#FDE4C8" stroke="#0E2A47" stroke-width="2.5" />
            <!-- לחיים ורודות -->
            <ellipse cx="47" cy="72" rx="4.5" ry="2.8" fill="#FDA4AF" opacity="0.7" />
            <ellipse cx="83" cy="72" rx="4.5" ry="2.8" fill="#FDA4AF" opacity="0.7" />
            <!-- עיניים עצומות בחיוך -->
            <path d="M48 64 Q54 70 60 64" stroke="#0E2A47" stroke-width="2.6" stroke-linecap="round" fill="none" />
            <path d="M70 64 Q76 70 82 64" stroke="#0E2A47" stroke-width="2.6" stroke-linecap="round" fill="none" />
            <!-- חיוך ישנוני -->
            <path d="M58 77 Q65 83 72 77" stroke="#0E2A47" stroke-width="2.4" stroke-linecap="round" fill="none" />

            <!-- כובע שינה מפוספס עם פונפון חרדל -->
            <path d="M36 53 C36 22 72 8 106 24 C90 28 84 40 94 50 Z" fill="#0E2A47" stroke="#0E2A47" stroke-width="2" />
            <path d="M44 43 Q65 30 90 36" stroke="#38BDF8" stroke-width="4.5" stroke-linecap="round" fill="none" />
            <path d="M54 31 Q72 22 93 26" stroke="#F5C443" stroke-width="3.5" stroke-linecap="round" fill="none" />
            <rect x="33" y="46" width="64" height="11" rx="5.5" fill="#FFFFFF" stroke="#0E2A47" stroke-width="2.2" />
            <circle cx="109" cy="26" r="8" fill="#F5C443" stroke="#0E2A47" stroke-width="2" />
          </g>

          <!-- סימני Zzz מרחפים באנימציה -->
          <text x="242" y="76" class="svg-zzz svg-zzz--1" fill="#0284C7" font-family="Heebo, sans-serif" font-size="22" font-weight="900">z</text>
          <text x="262" y="54" class="svg-zzz svg-zzz--2" fill="#0E2A47" font-family="Heebo, sans-serif" font-size="27" font-weight="900">Z</text>
          <text x="285" y="34" class="svg-zzz svg-zzz--3" fill="#D49A1A" font-family="Heebo, sans-serif" font-size="19" font-weight="900">z</text>
        </svg>
      `,
      emojiClue: '',
      hint: 'חשבו על השורש של המילים "נמנום" ו"תנומה" — ובאותו משקל של המילה רַכֶּבֶת!',
      options: ['שְׁנָתוֹן', 'נַמְנֶמֶת', 'כֻּתֹּנֶת לַיְלָה', 'רְדוּמִית'],
      correctIndex: 1,
      didYouKnow:
        'המילה "נַמְנֶמֶת" נוצרה מהשורש נ.ו.מ (תנומה), בדיוק באותו משקל של המילים רַכֶּבֶת, טַיֶּסֶת וצַמֶּרֶת!',
    },
    {
      id: 2,
      dayLabel: "יום ב'",
      icon: '📺',
      badgeName: 'שומר/ת הסוד',
      category: 'עברית של מסכים',
      shortDesc: 'איך אומרים בעברית תקנית "ספוילר" של סדרה או סרט?',
      question: 'תמיד יהיה החבר הזה שיעשה לך ספוילר! איך אומרים בעברית תקנית "ספוילר"?',
      svgIllustration: `
        <svg viewBox="0 0 360 185" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="מסך טלוויזיה וקולנוע מואר">
          <rect x="14" y="10" width="332" height="165" rx="22" fill="#EEF6FF" />

          <!-- נצנוצים עדינים ברקע -->
          <circle cx="56" cy="52" r="4" fill="#38BDF8" opacity="0.5" />
          <circle cx="304" cy="48" r="4.5" fill="#F5C443" opacity="0.7" />
          <circle cx="312" cy="128" r="3" fill="#0EA5E9" opacity="0.45" />
          <circle cx="48" cy="130" r="3" fill="#F5C443" opacity="0.6" />

          <!-- מסך טלוויזיה / קולנוע מואר במרכז -->
          <g transform="translate(86, 26)">
            <!-- הילה מוארת מאחורי המסך -->
            <rect x="-6" y="-6" width="200" height="122" rx="22" fill="#38BDF8" opacity="0.22" class="svg-screen-glow" />
            <!-- גוף המסך -->
            <rect x="0" y="0" width="188" height="110" rx="16" fill="#0E2A47" />
            <rect x="10" y="10" width="168" height="90" rx="10" fill="#0284C7" class="svg-screen-glow" />
            <!-- סצנת סיום דרמטית על המסך + סמל ניגון -->
            <circle cx="94" cy="46" r="22" fill="rgba(14, 42, 71, 0.32)" />
            <polygon points="88,35 88,57 107,46" fill="#F5C443" />
            <!-- כוכבי דרמה עדינים בפינות המסך -->
            <polygon points="34,26 36,31 41,32 36,34 34,39 32,34 27,32 32,31" fill="#FEF08A" />
            <polygon points="154,28 156,33 161,34 156,36 154,41 152,36 147,34 152,33" fill="#FEF08A" />
            <!-- פס התקדמות לקראת סוף הפרק -->
            <rect x="24" y="80" width="140" height="7" rx="3.5" fill="rgba(255,255,255,0.3)" />
            <rect x="24" y="80" width="124" height="7" rx="3.5" fill="#F5C443" />
            <circle cx="148" cy="83.5" r="5" fill="#FFFFFF" />
            <!-- מעמד הטלוויזיה -->
            <rect x="82" y="110" width="24" height="16" fill="#17416C" />
            <rect x="58" y="124" width="72" height="9" rx="4.5" fill="#0E2A47" />
          </g>
        </svg>
      `,
      emojiClue: '',
      hint: 'בדיוק כמו המילה Spoil באנגלית (לקלקל) — איזו מילה בנויה מהשורש ק-ל-ק-ל?',
      options: ['מְגַלֶּה', 'הַרְסָן', 'קַלְקְלָן', 'פַּטְפְּטָן'],
      correctIndex: 2,
      didYouKnow:
        'האקדמיה ללשון העברית ממציאה מילים גם לעולם המסכים: במקום "פודקאסט" אומרים הֶסְכֵּת, ובמקום "בינג\'" אומרים צְפִיַּת בּוּלְמוּס.',
    },
    {
      id: 3,
      dayLabel: "יום ג'",
      icon: '🖍️',
      badgeName: 'צייד/ת המילים',
      category: 'תפוס את המילה האמיתית',
      shortDesc: 'שלוש מילים הומצאו הרגע — רק אחת היא מילה תקנית אמיתית!',
      question:
        'שלוש מהמילים הבאות הומצאו הרגע, אבל אחת היא מילה תקנית אמיתית של האקדמיה ללשון. מי היא?',
      svgIllustration: '',
      emojiClue: '',
      hint: 'זו מילה שמשלבת בין "מדגיש" לבין "צובע" — מכשיר שיש כמעט בכל קלמר!',
      options: ['שַׁרְבּוּטוֹן', 'מַדְגֵּשׁוֹן', 'צַבְעָנִית', 'מַצְבֵּעַ'],
      correctIndex: 3,
      didYouKnow:
        'מַצְבֵּעַ הוא השם התקני לטוש מדגיש (מרקר) – שילוב של המילים "מַדְגִּישׁ" ו"צוֹבֵעַ"!',
    },
    {
      id: 4,
      dayLabel: "יום ד'",
      icon: '❤️',
      badgeName: 'פותר/ת המשוואות',
      category: 'משוואת תמונות',
      shortDesc: 'חברו שתי תמונות מימין לשמאל וגלו איזו מילה עברית נוצרת!',
      question: 'חברו את שתי התמונות (רֶגֶשׁ + פַּרְצוּף): איזו מילה חדשה נוצרת?',
      svgIllustration: `
        <svg viewBox="0 0 360 170" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="משוואה חזותית מימין לשמאל: לב אדום ועוד פרצוף מחייך שווה סימן שאלה">
          <rect x="12" y="10" width="336" height="150" rx="22" fill="#F0F9FF" />

          <!-- צד ימין: לב אדום (רֶגֶשׁ) -->
          <rect x="252" y="34" width="76" height="82" rx="18" fill="#FFFFFF" stroke="#BAE6FD" stroke-width="2" />
          <g class="svg-heartbeat">
            <path d="M290 98 C290 98 265 82 265 65 C265 55 273 49 281 49 C286 49 289 52 290 55 C291 52 294 49 299 49 C307 49 315 55 315 65 C315 82 290 98 290 98 Z" fill="#EF4444" stroke="#991B1B" stroke-width="2.2" stroke-linejoin="round" />
            <path d="M274 62 Q276 56 282 56" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" opacity="0.7" />
          </g>
          <text x="290" y="138" text-anchor="middle" fill="#43586F" font-family="Heebo, sans-serif" font-size="13" font-weight="800">רֶגֶשׁ</text>

          <!-- סימן פלוס -->
          <g stroke="#0E2A47" stroke-width="4.5" stroke-linecap="round">
            <line x1="234" y1="65" x2="234" y2="85" />
            <line x1="224" y1="75" x2="244" y2="75" />
          </g>

          <!-- אמצע: פרצוף מחייך (פַּרְצוּף) -->
          <rect x="142" y="34" width="76" height="82" rx="18" fill="#FFFFFF" stroke="#BAE6FD" stroke-width="2" />
          <circle cx="180" cy="75" r="26" fill="#F5C443" stroke="#0E2A47" stroke-width="2.4" />
          <ellipse cx="166" cy="78" rx="4" ry="2.4" fill="#FB7185" opacity="0.65" />
          <ellipse cx="194" cy="78" rx="4" ry="2.4" fill="#FB7185" opacity="0.65" />
          <path d="M168 69 Q172 64 176 69" stroke="#0E2A47" stroke-width="2.6" stroke-linecap="round" fill="none" />
          <path d="M184 69 Q188 64 192 69" stroke="#0E2A47" stroke-width="2.6" stroke-linecap="round" fill="none" />
          <path d="M168 81 Q180 93 192 81" stroke="#0E2A47" stroke-width="2.8" stroke-linecap="round" fill="none" />
          <text x="180" y="138" text-anchor="middle" fill="#43586F" font-family="Heebo, sans-serif" font-size="13" font-weight="800">פַּרְצוּף</text>

          <!-- סימן שווה -->
          <g stroke="#0E2A47" stroke-width="4.5" stroke-linecap="round">
            <line x1="114" y1="69" x2="132" y2="69" />
            <line x1="114" y1="81" x2="132" y2="81" />
          </g>

          <!-- צד שמאל: סימן שאלה מעוצב -->
          <g class="svg-q-pulse">
            <rect x="30" y="34" width="76" height="82" rx="18" fill="#0E2A47" stroke="#F5C443" stroke-width="3" />
            <circle cx="68" cy="75" r="27" fill="rgba(56, 189, 248, 0.16)" stroke="#F5C443" stroke-width="1.8" stroke-dasharray="4 4" />
            <text x="68" y="88" text-anchor="middle" fill="#F5C443" font-family="Heebo, sans-serif" font-size="40" font-weight="900">?</text>
          </g>
          <text x="68" y="138" text-anchor="middle" fill="#0284C7" font-family="Heebo, sans-serif" font-size="13" font-weight="800">המילה?</text>
        </svg>
      `,
      emojiClue: '',
      hint: 'הסתכלו על ההתחלה של המילה "רֶגֶשׁ" — איזו אפשרות בנויה בדיוק ממנה?',
      options: ['רִגְשׁוֹן', 'חַיְכָן', 'פַּרְצוּפוֹן', 'סִמְלוֹן'],
      correctIndex: 0,
      didYouKnow:
        'המילה "רִגְשׁוֹן" היא החלופה העברית לאימוג\'י (Emoji) – מילה יפנית שפירושה "תמונה" + "אות/תו".',
    },
    {
      id: 5,
      dayLabel: "יום ה'",
      icon: '🤳',
      badgeName: 'כוכב/ת הרשת',
      category: 'פנטומימה של רשת',
      shortDesc: 'איך האקדמיה ללשון העברית קוראת לצילום עצמי בטלפון (סלפי)?',
      question: 'צפו בדמות שבסרטון: איך האקדמיה ללשון העברית החליטה לקרוא לצילום עצמי בטלפון (סלפי)?',
      svgIllustration: `
        <svg viewBox="0 0 360 185" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="סמארטפון מצלם סלפי עם פרצוף מצחיק ואפקט פלאש מהבהב">
          <rect x="14" y="10" width="332" height="165" rx="22" fill="#EBF6FF" />

          <!-- נצנוצים עדינים ברקע -->
          <circle cx="88" cy="54" r="4" fill="#38BDF8" opacity="0.55" />
          <circle cx="276" cy="128" r="5" fill="#F5C443" opacity="0.65" />
          <circle cx="72" cy="134" r="3" fill="#0E2A47" opacity="0.25" />

          <!-- סמארטפון מוטה קלות לצילום סלפי -->
          <g transform="translate(132, 18) rotate(-5 48 75)">
            <!-- צל עדין -->
            <rect x="6" y="8" width="96" height="148" rx="18" fill="#0E2A47" opacity="0.14" />
            <!-- גוף הסמארטפון -->
            <rect x="0" y="0" width="96" height="148" rx="18" fill="#0E2A47" />
            <!-- מסך הטלפון -->
            <rect x="7" y="14" width="82" height="114" rx="10" fill="#BAE6FD" />
            <!-- חריץ מצלמה קדמית -->
            <rect x="36" y="5" width="24" height="4" rx="2" fill="#334155" />
            <circle cx="67" cy="7" r="2.4" fill="#38BDF8" />

            <!-- דמות עם פרצוף מצחיק בתוך המסך -->
            <path d="M16 128 C18 102 32 95 48 95 C64 95 78 102 80 128 Z" fill="#17416C" />
            <circle cx="48" cy="68" r="24" fill="#FDE4C8" stroke="#0E2A47" stroke-width="2.2" />
            <!-- בלורית שמחה -->
            <path d="M25 62 C26 42 42 36 55 40 C66 42 73 50 72 62 C64 52 54 49 42 51 C34 52 29 56 25 62 Z" fill="#0E2A47" />
            <!-- עין אחת קורצת ועין אחת פקוחה -->
            <circle cx="39" cy="66" r="4" fill="#0E2A47" />
            <circle cx="40.5" cy="64.5" r="1.4" fill="#FFFFFF" />
            <path d="M53 66 Q58 61 63 66" stroke="#0E2A47" stroke-width="2.6" stroke-linecap="round" fill="none" />
            <!-- פה מחייך עם לשון מצחיקה החוצה -->
            <path d="M38 77 Q48 85 58 77" stroke="#0E2A47" stroke-width="2.4" stroke-linecap="round" fill="#0E2A47" />
            <path d="M44 80 Q48 92 53 80 Z" fill="#FB7185" stroke="#0E2A47" stroke-width="1.6" />
            <!-- מסגרת פוקוס מצלמה -->
            <path d="M15 24 V20 H19 M81 24 V20 H77 M15 114 V118 H19 M81 114 V118 H77" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />

            <!-- כפתור צילום בתחתית -->
            <circle cx="48" cy="138" r="6" fill="#FFFFFF" />
            <circle cx="48" cy="138" r="3.6" fill="#F5C443" />
          </g>

          <!-- אפקט פלאש מהבהב ב-CSS ליד העדשה -->
          <g class="svg-selfie-flash" transform="translate(216, 38)">
            <circle cx="0" cy="0" r="24" fill="#FEF08A" opacity="0.55" />
            <polygon points="0,-24 5,-6 24,0 5,6 0,24 -5,6 -24,0 -5,-6" fill="#F5C443" stroke="#FFFFFF" stroke-width="1.8" />
            <circle cx="0" cy="0" r="6" fill="#FFFFFF" />
          </g>
        </svg>
      `,
      emojiClue: '',
      hint: 'המילה נגזרה מהמילה העתיקה "צֶלֶם" (דמות) וגם קשורה למילה "צילום"!',
      options: ['עַצְמוֹן', 'צַלְמִית', 'פַּרְצוּפוֹן', 'שִׁקּוּפִית'],
      correctIndex: 1,
      didYouKnow:
        'המילה "צַלְמִית" נגזרה מהמילה העתיקה "צֶלֶם" (דמות), והיא משמשת בעברית גם לתיאור אייקון במחשב או בטלפון!',
    },
    {
      id: 6,
      dayLabel: "יום ו'",
      icon: '☁️',
      badgeName: 'בלש/ית השפה',
      category: 'בלשי השפה',
      shortDesc: 'הסתכלו היטב על האיור — איזה ביטוי עברי מוכר מסתתר בו?',
      question: 'הסתכלו היטב על האיור: איזה ביטוי עברי מוכר מסתתר בתמונה?',
      svgIllustration: `
        <svg viewBox="0 0 360 185" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="איור של דמות שהראש שלה נמצא ממש בתוך ענן לבן ורך">
          <!-- רקע שמיים רכים -->
          <rect x="14" y="10" width="332" height="165" rx="22" fill="#E0F2FE" />
          <circle cx="72" cy="48" r="3" fill="#F5C443" />
          <circle cx="294" cy="44" r="3.5" fill="#F5C443" />
          <circle cx="272" cy="116" r="2.5" fill="#0EA5E9" />
          <circle cx="90" cy="126" r="2.5" fill="#0EA5E9" />

          <!-- גוף הדמות שעומדת רגועה -->
          <g transform="translate(132, 96)">
            <!-- סוודר כחול עמוק עם פס חרדל -->
            <path d="M8 78 C8 32 24 14 48 14 C72 14 88 32 88 78 Z" fill="#0E2A47" />
            <path d="M13 44 H83" stroke="#F5C443" stroke-width="8" stroke-linecap="round" />
            <path d="M10 58 H86" stroke="#38BDF8" stroke-width="4.5" stroke-linecap="round" />
            <!-- צווארון וצוואר שנכנס ישר לתוך הענן -->
            <rect x="39" y="-8" width="18" height="26" rx="7" fill="#FDE4C8" stroke="#0E2A47" stroke-width="2.2" />
            <path d="M34 15 Q48 25 62 15" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" fill="none" />
          </g>

          <!-- ענן לבן גדול ורך שעוטף לגמרי את הראש של הדמות -->
          <g class="svg-cloud-drift">
            <!-- צל רך תחתון לענן -->
            <path d="M126 100 H238 C254 100 264 89 264 76 C264 63 254 53 240 52 C236 33 218 20 196 20 C179 20 164 29 157 42 C152 39 146 38 139 38 C122 38 109 50 109 66 C100 70 96 78 96 86 C96 95 107 100 126 100 Z" fill="#BAE6FD" transform="translate(0, 5)" />
            <!-- גוף הענן הלבן -->
            <path d="M126 98 H238 C254 98 264 87 264 74 C264 61 254 51 240 50 C236 31 218 18 196 18 C179 18 164 27 157 40 C152 37 146 36 139 36 C122 36 109 48 109 64 C100 68 96 76 96 84 C96 93 107 98 126 98 Z" fill="#FFFFFF" stroke="#0EA5E9" stroke-width="2.2" stroke-linejoin="round" />
            <!-- קווי רכות עדינים בתוך הענן -->
            <path d="M142 54 Q152 46 164 52" stroke="#E0F2FE" stroke-width="3" stroke-linecap="round" fill="none" />
            <path d="M210 42 Q222 38 229 48" stroke="#E0F2FE" stroke-width="3" stroke-linecap="round" fill="none" />
            <!-- נצנוצי חלום קטנים סביב הענן -->
            <polygon points="104,34 106,40 112,42 106,44 104,50 102,44 96,42 102,40" fill="#F5C443" />
            <polygon points="266,28 267.5,33 272.5,34.5 267.5,36 266,41 264.5,36 259.5,34.5 264.5,33" fill="#0EA5E9" />
          </g>
        </svg>
      `,
      emojiClue: '',
      hint: 'איפה בדיוק נמצא הראש של הדמות באיור? אמרו את המשפט בקול רם!',
      options: ['רֹאשׁ בְּרֹאשׁ', 'עָנָן שֶׁל כָּבוֹד', 'הָרֹאשׁ שֶׁלּוֹ בָּעֲנָנִים', 'מְרַחֵף בֶּחָלָל'],
      correctIndex: 2,
      didYouKnow:
        'כשמישהו חולם בהקיץ או לא מרוכז אומרים ש"הראש שלו בעננים" – אבל בעברית תקנית יש מילה אחת למי שנמצא במצב הזה: מְרֻחָף או חוֹלְמָנִי.',
    },
  ],

  // --- 8ב. קטעי מידע יומיים ("דקה של עברית") לכל אחד מ-6 הימים ---
  dailyStories: {
    1: {
      title: 'הנס היחיד בהיסטוריה: איך העברית קמה לתחייה?',
      paragraphs: [
        'במשך כמעט 2,000 שנה העברית כמעט לא נשמעה ברחובות — אנשים קראו בה בתפילה ובספרים, אך בבית דיברו שפות אחרות. לפני כ-140 שנה החליט אליעזר בן-יהודה לשנות את ההיסטוריה ולהפוך את העברית שוב לשפת יומיום חיה.',
        'כדי להוכיח שזה אפשרי, הוא ואשתו דבורה גידלו את בנם איתמר בן-אב"י כילד הראשון בעת החדשה ששמע ודיבר אך ורק עברית. כשחסרו מילים לחיי היומיום — כמו גלידה, בובה, מטרייה או עיתון — בן-יהודה פשוט חידש אותן!',
      ],
      highlight:
        'העברית היא השפה היחידה בעולם שהפסיקה להיות מדוברת ביומיום במשך מאות שנים — וחזרה בהצלחה להיות שפת אם של מיליוני אנשים.',
      discussion:
        'אילו מילים חדשות מהחיים שלכם הייתם חייבים להמציא מיד, אילו הייתם גדלים בבית שבו עדיין אין מילים עבריות לעולם המודרני?',
    },
    2: {
      title: 'מילים עבריות שכבשו את האנגלית ואת העולם!',
      paragraphs: [
        'לפעמים נדמה לנו שרק העברית שואלת מילים מאנגלית — אבל האמת מפתיעה הרבה יותר: עשרות מילים עבריות עתיקות עשו את הדרך ההפוכה ונטמעו עמוק בשפות העולם.',
        'כך, למשל, המילה האנגלית Camel נולדה מהמילה העברית גָּמָל, המילה Cinnamon הגיעה מקִנָּמוֹן, המילה Sabbath מקורה בשַׁבָּת, ואפילו המילים Amen (אָמֵן) ו-Jubilee (יוֹבֵל) עברו מהתנ"ך היישר לשפה הבינלאומית.',
      ],
      highlight:
        'גם המילה האנגלית Alphabet (אלפבית) מגיעה משתי האותיות הראשונות של השפות השמיות העתיקות — אלף ובית!',
      discussion:
        'מכירים עוד מילה באנגלית או בשפה אחרת שנשמעת דומה מאוד למילה בעברית? נסו לגלות יחד מאיזו שפה היא התחילה.',
    },
    3: {
      title: 'מאחורי הקלעים של האקדמיה ללשון העברית',
      paragraphs: [
        'איך נולדת מילה תקנית חדשה בישראל? ועדות של חוקרי לשון, סופרים ומומחים בודקות מה חסר בשיח היומיומי, ובונות מילים חדשות לפי שורשים ומשקלים — או בחיבור חכם של שתי מילים יחד (הלחם בסיסים), כמו "כדור" + "רגל" = כַּדּוּרֶגֶל או "רכב" + "כבל" = רַכֶּבֶל.',
        'לא כל מילה שממציאים תופסת: מילים כמו "מחשב", "קלטת" ו"מרפסת" הפכו לחלק טבעי מחיינו, בעוד שההצעה "שח-רחוק" לטלפון נשארה בעיקר בספרי ההיסטוריה — ובסוף הציבור הוא שמכריע.',
      ],
      highlight:
        'כל תלמיד ותלמידה בישראל יכולים לשלוח הצעה למילה עברית חדשה באתר האקדמיה ללשון — וחלק מהחידושים המפורסמים ביותר הגיעו דווקא מילדים ונוער!',
      discussion:
        'איזו מילה לועזית שאתם משתמשים בה בכל יום הייתם שמחים להחליף במילה עברית קליטה וחדשה?',
    },
    4: {
      title: 'הלגו הגאוני של השפה העברית: קסם השורשים',
      paragraphs: [
        'העברית נחשבת לאחת השפות החכמות והחסכוניות בעולם בזכות שיטת השורשים שלה. במקום לשנן מילים שונות לגמרי לכל רעיון, לוקחים שלוש אותיות שורש ומלבישים אותן בתבניות שונות — ממש כמו קוביות לגו.',
        'קחו לדוגמה את השורש כ-ת-ב: ממנו נוצרות המילים כָּתַב, מִכְתָּב, כְּתֹבֶת, כַּתָּבָה, כְּתִיבָה, הִתְכַּתְּבוּת ומַכְתֵּבָה. גם אם פוגשים מילה עברית בפעם הראשונה בחיים, אפשר לזהות את השורש שלה ולנחש מיד למה היא קשורה!',
      ],
      highlight:
        'משורש עברי אחד בן שלוש אותיות בלבד אפשר לבנות לעיתים יותר מ-30 מילים שונות בעלות קשר משפחתי ברור.',
      discussion:
        'נסו תחרות בזק בכיתה: כמה מילים אמיתיות תצליחו למצוא בתוך 30 שניות מהשורש ס-פ-ר או ל-מ-ד?',
    },
    5: {
      title: 'מילים מהתנ"ך שקיבלו חיים חדשים בעידן הטכנולוגי',
      paragraphs: [
        'כשאנחנו משתמשים היום במילים מעולם המדע והטכנולוגיה, קשה להאמין שרבות מהן נכתבו כבר לפני אלפי שנים. מחדשי השפה העברית פתחו את התנ"ך, מצאו מילים נדירות ומדויקות והעניקו להן משמעות מודרנית.',
        'המילה "חַשְׁמַל", למשל, מופיעה כבר בספר יחזקאל לתיאור אור זוהר ומסתורי; המילה "תּוֹתָח" מופיעה בספר איוב; והמילה "מְכוֹנִית" נגזרה מהמילה המקראית "מְכוֹנָה" ששימשה לתיאור עגלה מיוחדת על גלגלים.',
      ],
      highlight:
        'בזכות החיבור הזה, תלמיד בכיתה ה\' בבית ספר הראל מסוגל לקרוא היום מגילות עתיקות בנות יותר מ-2,000 שנה ולהבין חלק גדול מהמילים בהן!',
      discussion:
        'איזו מילה מודרנית מהטלפון או מהמחשב מפתיע אתכם לדעת שמתבססת על מילה עברית עתיקה?',
    },
    6: {
      title: 'הסיפורים המפתיעים מאחורי הביטויים שלנו',
      paragraphs: [
        'העברית מלאה בביטויים ציוריים שאנחנו אומרים כמעט בלי לחשוב על מקורם. כשאומרים "על קצה המזלג" מתכוונים לטעימה קצרצרה בלבד — ממש כמו כמות זעירה שנאחזת בקצה המזלג.',
        'והביטוי "יצא המרצע מן השק"? מַרְצֵעַ הוא כלי חד של סנדלרים; אם מנסים להחביא אותו בתוך שק בד, החוד הדק מנקב את השק ויוצא החוצה — ולכן משתמשים בביטוי כשסוד מתגלה לפתע.',
      ],
      highlight:
        'והפתעה קטנה לסיום השבוע: למרות הביטוי המפורסם "טמן את ראשו בחול", יענים בטבע כלל לא טומנות את הראש בחול — הן רק מתכופפות להפוך את הביצים שלהן בקן!',
      discussion:
        'איזה ביטוי עברי אהוב עליכם במיוחד, ואיך הייתם מציירים אותו כחידת איור לחברים?',
    },
  },

  // --- 9. כרטיסיות "מילת היום" המתהפכות (חידושי האקדמיה ללשון העברית) ---
  wordsOfTheDay: [
    {
      word: 'קִשּׁוּרִית',
      meaning: 'קישור באינטרנט (Link)',
      example:
        'מילה עברית חביבה מהמילה "קֶשֶׁר" בסיומת הקטנה "-ִית". לדוגמה: "שלחתי לקבוצת הכיתה קִשּׁוּרִית לאתר שבוע השפה העברית!"',
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
  INVENTED_WORD: 'hlw_invented_word_v1',
};

const COOKIE_KEYS = {
  DEVICE_ID: 'hlw_dev_id',
  SOLVED_IDS: 'hlw_solved_ids',
};

const SITE_SHARE_URL = 'https://esti178-sys.github.io/hebrew-language-week/';

const HEBREW_LETTERS = ["א'", "ב'", "ג'", "ד'"];
const HEBREW_WEEKDAYS_SHORT = ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", 'שבת'];
const PRAISE_PHRASES = [
  'קליעה למטרה! 🎯',
  'אלופים בעברית! 🏆',
  'שפה ברמה גבוהה! ✨',
  'תשובה מדויקת! 🌟',
  'חשיבה חדה ומצוינת! 🧠',
];

const state = {
  deviceId: '',
  // מיפוי riddleId -> { points, className, solvedAt }
  solvedMeta: {},
  selectedClass: '',
  // מיפוי className -> { total, solves, byDay: {1..6}, solvesByDay: {1..6} }
  classScores: {},
  leaderboardTab: 'today', // 'today' | 'weekly'
  boardTab: 'today', // 'today' | 'weekly'
  leaderboardGradeFilter: 'all', // 'all' | 'ה' | 'ו' | 'ז' | 'ח'
  teacherMode: false,
  teacherReportOpen: false,
  activeRiddleId: null,
  activeRiddleHadWrongAttempt: false,
  soundEnabled: true,
  wordIndex: 0,
  cloudSyncMode: 'local', // 'local' | 'firebase' | 'sheets' | 'both'
  inventedWord: null,
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
let preTeacherSnapshot = null;

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

function createEmptyClassRecord() {
  return {
    total: 0,
    solves: 0,
    byDay: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    solvesByDay: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
  };
}

function createEmptyScoresMap() {
  const map = {};
  CONFIG.classes.forEach((cls) => {
    map[cls] = createEmptyClassRecord();
  });
  return map;
}

function ensureClassEntry(cls) {
  if (!state.classScores[cls]) {
    state.classScores[cls] = createEmptyClassRecord();
  }
  if (!state.classScores[cls].solvesByDay) {
    state.classScores[cls].solvesByDay = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  }
  if (typeof state.classScores[cls].solves !== 'number') {
    state.classScores[cls].solves = 0;
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
              solves: Number(parsedScores[cls].solves) || 0,
              byDay: {
                1: Number(parsedScores[cls].byDay?.[1]) || 0,
                2: Number(parsedScores[cls].byDay?.[2]) || 0,
                3: Number(parsedScores[cls].byDay?.[3]) || 0,
                4: Number(parsedScores[cls].byDay?.[4]) || 0,
                5: Number(parsedScores[cls].byDay?.[5]) || 0,
                6: Number(parsedScores[cls].byDay?.[6]) || 0,
              },
              solvesByDay: {
                1: Number(parsedScores[cls].solvesByDay?.[1]) || 0,
                2: Number(parsedScores[cls].solvesByDay?.[2]) || 0,
                3: Number(parsedScores[cls].solvesByDay?.[3]) || 0,
                4: Number(parsedScores[cls].solvesByDay?.[4]) || 0,
                5: Number(parsedScores[cls].solvesByDay?.[5]) || 0,
                6: Number(parsedScores[cls].solvesByDay?.[6]) || 0,
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

    const rawInvented = localStorage.getItem(STORAGE_KEYS.INVENTED_WORD);
    if (rawInvented) {
      const parsedInv = JSON.parse(rawInvented);
      if (parsedInv && typeof parsedInv.word === 'string' && parsedInv.word.trim()) {
        state.inventedWord = parsedInv;
      }
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
  // במצב בדיקה למורה לא שומרים פרטים או נקודות בדפדפן, כדי שלא יישארו אחרי היציאה!
  if (state.teacherMode) {
    try {
      localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, String(state.soundEnabled));
    } catch {
      // התעלמות שקטה
    }
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEYS.SOLVED, JSON.stringify(state.solvedMeta));
    localStorage.setItem(STORAGE_KEYS.SELECTED_CLASS, state.selectedClass);
    localStorage.setItem(STORAGE_KEYS.LOCAL_SCORES, JSON.stringify(state.classScores));
    localStorage.setItem(STORAGE_KEYS.CERT_PROFILE, JSON.stringify(state.certProfile));
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, String(state.soundEnabled));
    if (state.inventedWord) {
      localStorage.setItem(STORAGE_KEYS.INVENTED_WORD, JSON.stringify(state.inventedWord));
    } else {
      localStorage.removeItem(STORAGE_KEYS.INVENTED_WORD);
    }
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
            fresh[cls] = createEmptyClassRecord();
          }
          fresh[cls].total = Number(data.total) || 0;
          fresh[cls].solves = Number(data.solves) || 0;
          for (let d = 1; d <= 6; d += 1) {
            fresh[cls].byDay[d] = Number(data[`day_${d}`]) || 0;
            fresh[cls].solvesByDay[d] = Number(data[`solves_day_${d}`]) || 0;
          }
        });
        state.classScores = fresh;
        renderLeaderboard();
        renderTeacherReportTable();
        renderBoardMode();
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
      solves: Number(entry.solves) || 0,
      byDay: {
        1: Number(entry.byDay?.[1]) || 0,
        2: Number(entry.byDay?.[2]) || 0,
        3: Number(entry.byDay?.[3]) || 0,
        4: Number(entry.byDay?.[4]) || 0,
        5: Number(entry.byDay?.[5]) || 0,
        6: Number(entry.byDay?.[6]) || 0,
      },
      solvesByDay: {
        1: Number(entry.solvesByDay?.[1]) || 0,
        2: Number(entry.solvesByDay?.[2]) || 0,
        3: Number(entry.solvesByDay?.[3]) || 0,
        4: Number(entry.solvesByDay?.[4]) || 0,
        5: Number(entry.solvesByDay?.[5]) || 0,
        6: Number(entry.solvesByDay?.[6]) || 0,
      },
    };
  });
  state.classScores = merged;
  renderLeaderboard();
  renderTeacherReportTable();
  renderBoardMode();
}

async function recordClassPoints({ className, riddleId, points, studentName }) {
  if (!className || !points) return;

  // במצב בדיקה למורה: עדכון מקומי בלבד לתצוגה, לא נשלח ניקוד אמיתי לענן!
  if (state.teacherMode || !firebaseApi) {
    const entry = ensureClassEntry(className);
    entry.total += points;
    entry.solves += 1;
    entry.byDay[riddleId] = (entry.byDay[riddleId] || 0) + points;
    entry.solvesByDay[riddleId] = (entry.solvesByDay[riddleId] || 0) + 1;
    saveLocalState();
    renderLeaderboard();
    renderTeacherReportTable();
    renderBoardMode();
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
          solves: increment(1),
          [`day_${riddleId}`]: increment(points),
          [`solves_day_${riddleId}`]: increment(1),
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
      entry.solves += 1;
      entry.byDay[riddleId] = (entry.byDay[riddleId] || 0) + points;
      entry.solvesByDay[riddleId] = (entry.solvesByDay[riddleId] || 0) + 1;
      saveLocalState();
      renderLeaderboard();
      renderTeacherReportTable();
      renderBoardMode();
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
      'בחרו את הכיתה שלכם, הכניסו את שמכם והתחילו לצבור נקודות לאליפות!';
  } else if (solved === 0) {
    if (headingEl) headingEl.textContent = `קדימה ${firstName}, כיתה ${state.selectedClass} יוצאת לדרך! 🚀`;
    speechEl.textContent = `חידה אחת מדויקת שווה עד ${
      CONFIG.pointsPerRiddle + CONFIG.firstTryBonus
    } נקודות לכיתה ומדבקת הישג ראשונה!`;
  } else if (solved < total) {
    if (headingEl) headingEl.textContent = `כיתה ${state.selectedClass} בדרך לפסגה! ✨`;
    speechEl.textContent = `כל הכבוד ${firstName} — כבר פיצחת ${solved} מתוך ${total} חידות והבאת ${pts} נקודות לכיתה!`;
  } else {
    if (headingEl) headingEl.textContent = `אלופי העברית של הראל! 🏆`;
    speechEl.textContent = `הישג נפלא, ${firstName}! פיצחת את כל ${total} החידות והבאת ${pts} נקודות נהדרות לכיתה ${state.selectedClass}!`;
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
    titleEl.textContent = '🏫 בחרו את הכיתה שלכם, הכניסו שם מלא והתחילו לצבור נקודות:';
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
    let cardTitle = '';
    let cardDesc = '';

    if (!unlocked) {
      statusHtml = `<span class="day-card__status day-card__status--locked">${getLockSvg()}<span>ייפתח ב-${dateLabel}</span></span>`;
      ptsHtml = `<span class="day-card__pts">+${CONFIG.pointsPerRiddle} נק'</span>`;
      ctaHtml = `<span class="day-card__cta">${getLockSvg()}<span>נעול</span></span>`;
      cardTitle = 'אתגר סודי';
      cardDesc = `החידה תיחשף אוטומטית ב-${dateLabel} — יש למה לחכות!`;
    } else if (solved) {
      statusHtml = `<span class="day-card__status day-card__status--done">${getCheckSvg()}<span>הושלם!</span></span>`;
      ptsHtml = `<span class="day-card__pts">+${solvedEntry.points} נק' נצברו ✓</span>`;
      ctaHtml = `<span class="day-card__cta"><span>לחידה ול"דקה של עברית"</span>${getArrowLeftSvg()}</span>`;
      cardTitle = riddle.category;
      cardDesc = 'החידה נפתרה בהצלחה! לחצו כדי לצפות שוב בפתרון ולקרוא את "דקה של עברית".';
    } else if (today) {
      statusHtml = `<span class="day-card__status day-card__status--today">🔥 פתוח היום!</span>`;
      ptsHtml = `<span class="day-card__pts">עד +${CONFIG.pointsPerRiddle + CONFIG.firstTryBonus} נק'</span>`;
      ctaHtml = `<span class="day-card__cta"><span>לפתיחת אתגר היום</span>${getArrowLeftSvg()}</span>`;
      cardTitle = riddle.category;
      cardDesc = 'לחצו כדי לפתור את החידה היומית ולקרוא את "דקה של עברית"!';
    } else {
      statusHtml = `<span class="day-card__status day-card__status--open">פתוח</span>`;
      ptsHtml = `<span class="day-card__pts">עד +${CONFIG.pointsPerRiddle + CONFIG.firstTryBonus} נק'</span>`;
      ctaHtml = `<span class="day-card__cta"><span>לפתיחת אתגר היום</span>${getArrowLeftSvg()}</span>`;
      cardTitle = riddle.category;
      cardDesc = 'לחצו כדי לפתור את החידה היומית ולקרוא את "דקה של עברית"!';
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
        <h3 class="day-card__topic">${cardTitle}</h3>
        <p class="day-card__desc">${cardDesc}</p>
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
          <span class="day-card__day-name">פסגת יום השיא החגיגי</span>
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
  renderHeroTodayButton();
}

function getTargetTodayRiddle() {
  // 1. אם היום הוא אחד מ-6 ימי התחרות ופתוח — מחזירים אותו
  for (let i = 0; i < CONFIG.riddles.length; i += 1) {
    if (isDayToday(i) && isDayUnlocked(i)) {
      return CONFIG.riddles[i];
    }
  }
  // 2. אחרת, מחפשים את האתגר הפתוח שעדיין לא נפתר (האחרון שנפתח)
  const unlocked = CONFIG.riddles.filter((_, i) => isDayUnlocked(i));
  if (!unlocked.length) return null;
  const unsolved = unlocked.filter((r) => !state.solvedMeta[r.id]);
  if (unsolved.length) return state.teacherMode ? unsolved[0] : unsolved[unsolved.length - 1];
  return unlocked[unlocked.length - 1];
}

function renderHeroTodayButton() {
  const btn = document.getElementById('hero-today-challenge-btn');
  if (!btn) return;

  const target = getTargetTodayRiddle();
  if (!target) {
    const firstDate = formatShortHebrewDate(CONFIG.dayDates[0]);
    btn.classList.add('hero-today-btn--upcoming');
    btn.textContent = `🗓️ האתגר הראשון ייפתח ב-${firstDate} · למפת המסע ↓`;
    return;
  }

  btn.classList.remove('hero-today-btn--upcoming');
  const isSolved = Boolean(state.solvedMeta[target.id]);
  btn.textContent = isSolved
    ? `✅ אתגר ${target.dayLabel} הושלם — לפתיחה מחדש ←`
    : `🚀 ישר לאתגר של היום (${target.dayLabel}) ←`;
}

function handleHeroTodayClick() {
  const target = getTargetTodayRiddle();
  if (!target) {
    const firstDate = formatShortHebrewDate(CONFIG.dayDates[0]);
    const roadmap = document.getElementById('roadmap-section');
    if (roadmap) roadmap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast(`האתגר הראשון ייפתח אוטומטית בתאריך ${firstDate} — בינתיים בחרו כיתה והתכוננו! ⏳`);
    return;
  }
  openRiddleModal(target.id);
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

function formatSolvesCount(count) {
  const num = Number(count) || 0;
  return num === 1 ? 'פתרון 1' : `${num} פתרונות`;
}

function getSortedClassStandings(mode, gradeFilter = 'all') {
  const activeDayId = getCurrentCompetitionDayId();

  return CONFIG.classes
    .filter((cls) => gradeFilter === 'all' || cls.startsWith(gradeFilter))
    .map((cls) => {
      const entry = state.classScores[cls] || createEmptyClassRecord();
      const score = mode === 'today' ? Number(entry.byDay?.[activeDayId]) || 0 : Number(entry.total) || 0;
      const solves =
        mode === 'today' ? Number(entry.solvesByDay?.[activeDayId]) || 0 : Number(entry.solves) || 0;
      return { className: cls, score, solves };
    })
    .sort((a, b) => b.score - a.score || b.solves - a.solves || a.className.localeCompare(b.className, 'he'));
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
      <div class="podium-card__solves">${formatSolvesCount(item.solves)}</div>
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
      <div class="rank-row__meta">
        <span class="rank-row__pts">${item.score} נק'</span>
        <span class="rank-row__solves">${formatSolvesCount(item.solves)}</span>
      </div>
    `;
    listEl.appendChild(row);
  });
}

// --- 📺 מסך הקרנה ללוח / טלוויזיה במסדרון (מתעדכן חי מ-Firebase) ---

function renderBoardMode() {
  const overlay = document.getElementById('board-mode-overlay');
  if (!overlay || overlay.hidden) return;

  const podiumEl = document.getElementById('board-podium');
  const gridEl = document.getElementById('board-grid');
  const todayBtn = document.getElementById('board-tab-today');
  const weeklyBtn = document.getElementById('board-tab-weekly');
  if (!podiumEl || !gridEl) return;

  const activeDayId = getCurrentCompetitionDayId();
  const activeDayLabel = CONFIG.riddles.find((r) => r.id === activeDayId)?.dayLabel || "יום א'";

  if (todayBtn) {
    todayBtn.textContent = `ניקוד היום (${activeDayLabel})`;
    todayBtn.classList.toggle('is-active', state.boardTab === 'today');
  }
  if (weeklyBtn) {
    weeklyBtn.classList.toggle('is-active', state.boardTab === 'weekly');
  }

  const standings = getSortedClassStandings(state.boardTab, 'all');
  const maxScore = Math.max(10, standings[0]?.score || 0);
  const medals = ['🥇', '🥈', '🥉'];

  podiumEl.innerHTML = '';
  standings.slice(0, 3).forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = `board-podium__card board-podium__card--${idx + 1}`;
    card.innerHTML = `
      <div class="board-podium__medal" aria-hidden="true">${medals[idx]}</div>
      <div class="board-podium__class">כיתה ${item.className}</div>
      <div class="board-podium__pts">${item.score} נקודות</div>
      <div class="board-podium__solves">${formatSolvesCount(item.solves)}</div>
    `;
    podiumEl.appendChild(card);
  });

  gridEl.innerHTML = '';
  standings.forEach((item, idx) => {
    const widthPct = item.score > 0 ? Math.max(8, Math.round((item.score / maxScore) * 100)) : 0;
    const row = document.createElement('div');
    row.className = 'board-row';
    row.innerHTML = `
      <div class="board-row__top">
        <span class="board-row__name">#${idx + 1} · כיתה ${item.className}</span>
        <span class="board-row__pts">${item.score} נק'</span>
      </div>
      <div class="board-row__bar" aria-hidden="true">
        <div class="board-row__fill" style="width: ${widthPct}%"></div>
      </div>
      <div class="board-row__sub">${formatSolvesCount(item.solves)}</div>
    `;
    gridEl.appendChild(row);
  });
}

function openBoardMode() {
  const overlay = document.getElementById('board-mode-overlay');
  if (!overlay) return;
  state.boardTab = state.leaderboardTab;
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  renderBoardMode();
  const closeBtn = document.getElementById('board-close-btn');
  if (closeBtn) closeBtn.focus();
}

function closeBoardMode() {
  const overlay = document.getElementById('board-mode-overlay');
  if (!overlay || overlay.hidden) return;
  overlay.hidden = true;
  document.body.style.overflow = '';
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

  const illustrationEl = document.getElementById('modal-illustration');

  if (iconEl) iconEl.textContent = riddle.icon;
  dayLabel.textContent = riddle.dayLabel;
  categoryLabel.textContent = riddle.category;
  titleEl.textContent = riddle.question;

  if (illustrationEl) {
    if (riddle.svgIllustration && riddle.svgIllustration.trim()) {
      illustrationEl.innerHTML = riddle.svgIllustration;
      illustrationEl.hidden = false;
    } else {
      illustrationEl.innerHTML = '';
      illustrationEl.hidden = true;
    }
  }

  if (riddle.emojiClue) {
    emojiEl.textContent = riddle.emojiClue;
    emojiEl.hidden = false;
  } else {
    emojiEl.hidden = true;
    emojiEl.textContent = '';
  }

  // תזכורת למילוי שם מלא וכיתה אם טרם מולאו והחידה טרם נפתרה (במצב בדיקה למורה לא נדרש)
  if (modalClassPrompt) {
    const modalNameInput = document.getElementById('modal-student-name');
    if (modalNameInput) modalNameInput.value = state.certProfile.name;

    if (!state.teacherMode && !alreadySolved && (!state.selectedClass || !hasValidStudentName())) {
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
    updateWhatsappShareButton(riddle, solvedEntry.points, solvedEntry.className || state.selectedClass);
  } else {
    feedbackEl.hidden = true;
    feedbackEl.textContent = '';
    dykEl.hidden = true;
    dykTextEl.textContent = '';
    updateWhatsappShareButton(null, 0, '');
  }

  renderDailyStory(riddle);
  setRiddleModalTab('story');

  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) closeBtn.focus();
}

function renderDailyStory(riddle) {
  const story = CONFIG.dailyStories?.[riddle.id];
  const kickerEl = document.getElementById('story-kicker');
  const titleEl = document.getElementById('story-title');
  const bodyEl = document.getElementById('story-paragraphs');
  const highlightEl = document.getElementById('story-highlight-text');
  const discussionEl = document.getElementById('story-discussion-text');
  const backBtn = document.getElementById('story-back-riddle-btn');

  if (!story) return;

  if (kickerEl) kickerEl.textContent = `📖 דקה של עברית · ${riddle.dayLabel} · קריאה של 30 שניות`;
  if (titleEl) titleEl.textContent = story.title;
  if (bodyEl) {
    bodyEl.innerHTML = '';
    story.paragraphs.forEach((paraText) => {
      const p = document.createElement('p');
      p.textContent = paraText;
      bodyEl.appendChild(p);
    });
  }
  if (highlightEl) highlightEl.textContent = story.highlight;
  if (discussionEl) discussionEl.textContent = story.discussion;
  if (backBtn) {
    const isSolved = Boolean(state.solvedMeta[riddle.id]);
    backBtn.textContent = isSolved
      ? '🧩 חזרה לפתרון החידה ←'
      : '🧩 סיימתם לקרוא? לחצו כאן למעבר לחידת היום ←';
  }
}

function setRiddleModalTab(tab) {
  const isStory = tab === 'story';
  const riddleTab = document.getElementById('modal-tab-riddle');
  const storyTab = document.getElementById('modal-tab-story');
  const riddlePanel = document.getElementById('modal-panel-riddle');
  const storyPanel = document.getElementById('modal-panel-story');
  const dialog = document.querySelector('#riddle-modal .modal-dialog');

  if (riddleTab) {
    riddleTab.classList.toggle('is-active', !isStory);
    riddleTab.setAttribute('aria-selected', String(!isStory));
  }
  if (storyTab) {
    storyTab.classList.toggle('is-active', isStory);
    storyTab.setAttribute('aria-selected', String(isStory));
  }
  if (riddlePanel) riddlePanel.hidden = isStory;
  if (storyPanel) storyPanel.hidden = !isStory;
  if (dialog) dialog.scrollTop = 0;

  if (isStory && state.activeRiddleId) {
    const backBtn = document.getElementById('story-back-riddle-btn');
    if (backBtn) {
      const isSolved = Boolean(state.solvedMeta[state.activeRiddleId]);
      backBtn.textContent = isSolved
        ? '🧩 חזרה לפתרון החידה ←'
        : '🧩 סיימתם לקרוא? לחצו כאן למעבר לחידת היום ←';
    }
  }
}

function updateWhatsappShareButton(riddle, earnedPoints, className) {
  const waBtn = document.getElementById('modal-whatsapp-btn');
  if (!waBtn) return;

  if (!riddle) {
    waBtn.hidden = true;
    waBtn.href = '#';
    return;
  }

  const text = className
    ? `פיצחתי את חידת ${riddle.dayLabel} בשבוע השפה העברית של בית ספר הראל והוספתי ${earnedPoints} נקודות לכיתה ${className}! 🏆 הצטרפו וצברו נקודות לכיתה שלנו: ${SITE_SHARE_URL}`
    : `פיצחתי את חידת ${riddle.dayLabel} בשבוע השפה העברית של בית ספר הראל! 🏆 הצטרפו לאתגר היומי וצברו נקודות לכיתה שלכם: ${SITE_SHARE_URL}`;

  waBtn.href = `https://wa.me/?text=${encodeURIComponent(text)}`;
  waBtn.hidden = false;
}

function handleOptionSelect(riddle, chosenIndex, clickedBtn) {
  const optionsEl = document.getElementById('modal-options');
  const feedbackEl = document.getElementById('modal-feedback');
  const dykEl = document.getElementById('modal-dyk');
  const dykTextEl = document.getElementById('modal-dyk-text');
  const unlockedBadgeEl = document.getElementById('modal-unlocked-badge');
  const hintArea = document.getElementById('modal-hint-area');
  const modalClassPrompt = document.getElementById('modal-class-prompt');

  // מחייבים שם מלא + כיתה לפני זקיפת ניקוד (רק לתלמידים; במצב בדיקה למורה אפשר לבדוק חופשי!)
  if (
    !state.teacherMode &&
    (!state.selectedClass || !hasValidStudentName()) &&
    chosenIndex === riddle.correctIndex &&
    modalClassPrompt
  ) {
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
    feedbackEl.textContent =
      state.teacherMode && !state.selectedClass
        ? `${praise} (מצב בדיקה למורה — לא נרשמות נקודות בענן)`
        : `${praise} +${earnedPoints} נקודות נוספו אוטומטית לכיתה ${state.selectedClass}${bonusNote}`;
    feedbackEl.hidden = false;

    dykTextEl.textContent = riddle.didYouKnow;
    if (unlockedBadgeEl) unlockedBadgeEl.textContent = `🏅 זכית במדבקה: ${riddle.badgeName}`;
    dykEl.hidden = false;
    dykEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    updateWhatsappShareButton(riddle, earnedPoints, state.selectedClass);

    state.solvedMeta[riddle.id] = {
      points: earnedPoints,
      className: state.selectedClass,
      solvedAt: new Date().toISOString(),
    };
    saveLocalState();

    // שליחת ניקוד אוטומטית לכיתה (במצב בדיקה למורה לא נשלח לענן!)
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
    feedbackEl.textContent = 'כמעט! נסו שוב — אפשר גם להיעזר בכפתור הרמז למעלה 💡';
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
  if (!state.matchGame.shuffledMeanings.length) {
    resetIdiomMatchGame();
  }
  renderInventWordSection();
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

// --- אתגר יום השיא: ממציאים מילה חדשה לבית ספר הראל ---

function renderInventWordSection() {
  const formEl = document.getElementById('invent-word-form');
  const successEl = document.getElementById('invent-word-success');
  const titleEl = document.getElementById('invent-success-title');
  const previewEl = document.getElementById('invent-success-preview');
  const wordInput = document.getElementById('invent-word-input');
  const meaningInput = document.getElementById('invent-meaning-input');
  const exampleInput = document.getElementById('invent-example-input');

  if (!formEl || !successEl) return;

  if (state.inventedWord) {
    formEl.hidden = true;
    successEl.hidden = false;
    if (titleEl) {
      titleEl.textContent = state.teacherMode
        ? 'תצוגת בדיקה — המילה התקבלה בהצלחה (במצב בדיקה למורה לא נשמר בענן) 🏆'
        : 'המילה שלך נשלחה בהצלחה לצוות השפה העברית של בית ספר הראל! 🏆';
    }
    if (previewEl) {
      const exampleText = state.inventedWord.example
        ? ` · דוגמה: "${state.inventedWord.example}"`
        : '';
      previewEl.textContent = `"${state.inventedWord.word}" — ${state.inventedWord.meaning}${exampleText}`;
    }
  } else {
    formEl.hidden = false;
    successEl.hidden = true;
    if (wordInput) wordInput.value = '';
    if (meaningInput) meaningInput.value = '';
    if (exampleInput) exampleInput.value = '';
  }
}

async function handleInventWordSubmit(event) {
  event.preventDefault();
  if (state.inventedWord) return;

  const wordInput = document.getElementById('invent-word-input');
  const meaningInput = document.getElementById('invent-meaning-input');
  const exampleInput = document.getElementById('invent-example-input');
  const submitBtn = document.getElementById('invent-submit-btn');

  const word = (wordInput?.value || '').trim();
  const meaning = (meaningInput?.value || '').trim();
  const example = (exampleInput?.value || '').trim();

  if (word.length < 2) {
    if (wordInput) wordInput.focus();
    showToast('אנא הקלידו מילה חדשה בת לפחות 2 אותיות.');
    return;
  }
  if (meaning.length < 3) {
    if (meaningInput) meaningInput.focus();
    showToast('אנא כתבו בקצרה מה פירוש המילה שהמצאתם.');
    return;
  }

  if (submitBtn) submitBtn.disabled = true;

  const entry = {
    word,
    meaning,
    example,
    studentName: state.certProfile.name.trim() || 'תלמיד/ה',
    className: state.selectedClass || state.certProfile.className.trim() || '',
    submittedAt: new Date().toISOString(),
  };

  if (firebaseApi && !state.teacherMode) {
    try {
      const { db, collection, addDoc, serverTimestamp } = firebaseApi;
      await addDoc(collection(db, 'inventedWords'), {
        word: entry.word,
        meaning: entry.meaning,
        example: entry.example,
        studentName: entry.studentName,
        className: entry.className,
        deviceId: state.deviceId,
        createdAt: serverTimestamp(),
      });
    } catch {
      // במקרה של ניתוק רגעי או חוקי אבטחה שטרם עודכנו — שומרים מקומית כדי לא לאבד את ההמצאה
    }
  }

  state.inventedWord = entry;
  saveLocalState();
  renderInventWordSection();
  playChime('success');
  launchConfetti();
  showToast(
    state.teacherMode
      ? 'תצוגת בדיקה: המילה התקבלה (לא נשלחה לענן במצב מורה) ✨'
      : `נהדר! המילה "${entry.word}" נשלחה לצוות השפה העברית של בית ספר הראל ✨`
  );

  if (submitBtn) submitBtn.disabled = false;
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
  const emblemY = 172;
  let drewLogo = false;
  try {
    const logoImg = new Image();
    logoImg.src = 'harel-logo.png';
    await new Promise((resolve, reject) => {
      if (logoImg.complete && logoImg.naturalWidth > 0) resolve();
      else {
        logoImg.onload = resolve;
        logoImg.onerror = reject;
      }
    });
    const maxLogoH = 136;
    const ratio = logoImg.naturalWidth / logoImg.naturalHeight;
    const drawH = maxLogoH;
    const drawW = drawH * ratio;
    ctx.drawImage(logoImg, emblemX - drawW / 2, emblemY - drawH / 2, drawW, drawH);
    drewLogo = true;
  } catch {
    drewLogo = false;
  }

  if (!drewLogo) {
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
  }

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
      data: state.classScores[cls] || createEmptyClassRecord(),
    }))
    .sort((a, b) => b.data.total - a.data.total || b.data.solves - a.data.solves || a.cls.localeCompare(b.cls, 'he'));

  rows.forEach(({ cls, data }) => {
    const solves = Number(data.solves) || 0;
    const total = Number(data.total) || 0;
    const avg = solves > 0 ? (total / solves).toFixed(1) : '0';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>כיתה ${cls}</td>
      <td>${data.byDay[1] || 0}</td>
      <td>${data.byDay[2] || 0}</td>
      <td>${data.byDay[3] || 0}</td>
      <td>${data.byDay[4] || 0}</td>
      <td>${data.byDay[5] || 0}</td>
      <td>${data.byDay[6] || 0}</td>
      <td class="teacher-table__total">${total}</td>
      <td>${solves}</td>
      <td>${avg}</td>
    `;
    tbody.appendChild(tr);
  });
}

function exportTeacherCsv() {
  const header = [
    'כיתה',
    "יום א'",
    "יום ב'",
    "יום ג'",
    "יום ד'",
    "יום ה'",
    "יום ו'",
    'סה"כ נקודות',
    'מספר פתרונות',
    'ממוצע לפתרון',
  ];
  const lines = [header.join(',')];

  const rows = CONFIG.classes
    .map((cls) => ({
      cls,
      data: state.classScores[cls] || createEmptyClassRecord(),
    }))
    .sort((a, b) => b.data.total - a.data.total || b.data.solves - a.data.solves);

  rows.forEach(({ cls, data }) => {
    const solves = Number(data.solves) || 0;
    const total = Number(data.total) || 0;
    const avg = solves > 0 ? (total / solves).toFixed(1) : '0';
    lines.push(
      [
        `"כיתה ${cls}"`,
        data.byDay[1] || 0,
        data.byDay[2] || 0,
        data.byDay[3] || 0,
        data.byDay[4] || 0,
        data.byDay[5] || 0,
        data.byDay[6] || 0,
        total,
        solves,
        avg,
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
    ...todayStandings.map(
      (s, i) => `${i + 1}. כיתה ${s.className} — ${s.score} נקודות (${formatSolvesCount(s.solves)})`
    ),
    '',
    '🌟 טבלה מצטברת לשבוע:',
    ...weeklyStandings.map(
      (s, i) => `${i + 1}. כיתה ${s.className} — ${s.score} נקודות (${formatSolvesCount(s.solves)})`
    ),
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
    const todaySolves = Math.floor(Math.random() * 8) + 2;
    const todayBonusSolves = Math.floor(Math.random() * (todaySolves + 1));
    const todayPts = todaySolves * CONFIG.pointsPerRiddle + todayBonusSolves * CONFIG.firstTryBonus;

    entry.byDay[activeDayId] = (entry.byDay[activeDayId] || 0) + todayPts;
    entry.solvesByDay[activeDayId] = (entry.solvesByDay[activeDayId] || 0) + todaySolves;

    const prevDay = activeDayId > 1 ? activeDayId - 1 : 1;
    if (prevDay !== activeDayId) {
      const prevSolves = Math.floor(Math.random() * 10) + 4;
      const prevBonus = Math.floor(Math.random() * (prevSolves + 1));
      const prevPts = prevSolves * CONFIG.pointsPerRiddle + prevBonus * CONFIG.firstTryBonus;
      entry.byDay[prevDay] = (entry.byDay[prevDay] || 0) + prevPts;
      entry.solvesByDay[prevDay] = (entry.solvesByDay[prevDay] || 0) + prevSolves;
    }

    entry.total = Object.values(entry.byDay).reduce((a, b) => a + b, 0);
    entry.solves = Object.values(entry.solvesByDay).reduce((a, b) => a + b, 0);
  });
  saveLocalState();
  renderLeaderboard();
  renderTeacherReportTable();
  renderBoardMode();
  showToast('נוספו נקודות דמה לבדיקת לוח התחרות והדוח! 🎲');
}

// --- 🖨️ מודאל כרזת QR מוכנה להדפסה (עמוד A4 נקי) ---

function openQrPosterModal() {
  const modal = document.getElementById('qr-poster-modal');
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  const closeBtn = document.getElementById('qr-modal-close-btn');
  if (closeBtn) closeBtn.focus();
}

function closeQrPosterModal() {
  const modal = document.getElementById('qr-poster-modal');
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.body.style.overflow = '';
}

function printQrPoster() {
  const svgContainer = document.getElementById('qr-svg-container');
  const qrSvgMarkup = svgContainer ? svgContainer.innerHTML : '';
  const logoUrl = new URL('harel-logo.png', window.location.href).href;
  const win = window.open('', '_blank', 'width=850,height=1100');
  if (!win) {
    showToast('הדפדפן חסם את חלון ההדפסה — אנא אפשרו חלונות קופצים ונסו שוב.');
    return;
  }

  win.document.write(`<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>כרזת QR — שבוע השפה העברית · בית ספר הראל</title>
  <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@500;700;800;900&display=swap" rel="stylesheet" />
  <style>
    @page { size: A4 portrait; margin: 12mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    body {
      font-family: 'Heebo', Arial, sans-serif;
      background: #ffffff;
      color: #0e2a47;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8mm;
    }
    .poster {
      width: 100%;
      max-width: 175mm;
      border: 4px solid #0e2a47;
      border-radius: 26px;
      padding: 13mm 14mm;
      text-align: center;
      background: linear-gradient(180deg, #f0f9ff 0%, #ffffff 55%, #fffbeb 100%);
    }
    .school-logo {
      display: block;
      width: 28mm;
      height: auto;
      margin: 0 auto 5mm;
    }
    .kicker {
      display: inline-block;
      background: #f5c443;
      color: #081e36;
      font-size: 15pt;
      font-weight: 900;
      padding: 5px 22px;
      border-radius: 999px;
      margin-bottom: 6mm;
    }
    h1 {
      font-size: 38pt;
      font-weight: 900;
      color: #0e2a47;
      margin-bottom: 4mm;
      line-height: 1.1;
    }
    .sub {
      font-size: 15pt;
      font-weight: 700;
      color: #334155;
      margin-bottom: 9mm;
    }
    .qr-box {
      width: 86mm;
      height: 86mm;
      margin: 0 auto 8mm;
      padding: 5mm;
      background: #ffffff;
      border: 4px solid #0ea5e9;
      border-radius: 22px;
    }
    .qr-box svg { width: 100%; height: 100%; display: block; }
    .cta {
      font-size: 19pt;
      font-weight: 900;
      color: #0e2a47;
      margin-bottom: 3.5mm;
    }
    .steps {
      font-size: 13pt;
      color: #475569;
      margin-bottom: 6mm;
      line-height: 1.55;
    }
    .url {
      font-size: 13pt;
      font-weight: 800;
      color: #0284c7;
      direction: ltr;
    }
  </style>
</head>
<body>
  <div class="poster">
    <img src="${logoUrl}" alt='סמל בית ספר הראל לוד' class="school-logo" />
    <span class="kicker">בית ספר הראל לוד · כיתות ה'–ח'</span>
    <h1>שבוע השפה העברית</h1>
    <p class="sub">17.12 – 24.12 · 6 חידות יומיות · אליפות 20 הכיתות · יום שיא חגיגי!</p>
    <div class="qr-box">${qrSvgMarkup}</div>
    <p class="cta">📱 סרקו עם מצלמת הטלפון והצטרפו לאליפות!</p>
    <p class="steps">בוחרים כיתה · מזינים שם מלא · פותרים את חידת היום וצוברים נקודות לכיתה!</p>
    <p class="url">esti178-sys.github.io/hebrew-language-week</p>
  </div>
  <script>
    window.addEventListener('load', function () {
      setTimeout(function () { window.print(); }, 250);
    });
  </script>
</body>
</html>`);
  win.document.close();
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
  if (enabled && !state.teacherMode) {
    // שמירת תמונת מצב לפני הבדיקה — כך שביציאה כל נתוני הבדיקה נמחקים אוטומטית
    preTeacherSnapshot = {
      solvedMeta: JSON.parse(JSON.stringify(state.solvedMeta)),
      selectedClass: state.selectedClass,
      classScores: JSON.parse(JSON.stringify(state.classScores)),
      certProfile: { ...state.certProfile },
      inventedWord: state.inventedWord ? { ...state.inventedWord } : null,
    };
  }

  state.teacherMode = enabled;

  if (!enabled) {
    state.teacherReportOpen = false;
    closeBoardMode();
    closeQrPosterModal();
    if (preTeacherSnapshot) {
      state.solvedMeta = preTeacherSnapshot.solvedMeta;
      state.selectedClass = preTeacherSnapshot.selectedClass;
      state.classScores = preTeacherSnapshot.classScores;
      state.certProfile = preTeacherSnapshot.certProfile;
      state.inventedWord = preTeacherSnapshot.inventedWord;
      preTeacherSnapshot = null;

      const heroNameInput = document.getElementById('hero-student-name');
      const modalNameInput = document.getElementById('modal-student-name');
      const nameInput = document.getElementById('student-name-input');
      const classInput = document.getElementById('student-class-input');
      if (heroNameInput) heroNameInput.value = state.certProfile.name;
      if (modalNameInput) modalNameInput.value = state.certProfile.name;
      if (nameInput) nameInput.value = state.certProfile.name;
      if (classInput) classInput.value = state.certProfile.className;
    }
  }

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

  closeRiddleModal();
  renderClassPicker();
  renderProgressSummary();
  renderRoadmap();
  renderBadgesShelf();
  renderLeaderboard();
  renderPeakDaySection();
  renderTeacherReportTable();
  updateMascotSpeech();
  updateCertificatePreview();

  showToast(
    enabled
      ? 'מצב בדיקה למורה הופעל — כל 6 החידות ויום השיא פתוחים ללא שמירה (אפשר לבדוק חופשי בלי להירשם!).'
      : 'יצאת ממצב בדיקה למורה — נתוני הבדיקה נוקו אוטומטית.'
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
  state.inventedWord = null;
  if (!firebaseApi) {
    state.classScores = createEmptyScoresMap();
  }
  state.certProfile = { name: '', className: '', gender: 'female' };
  preTeacherSnapshot = {
    solvedMeta: {},
    selectedClass: '',
    classScores: createEmptyScoresMap(),
    certProfile: { name: '', className: '', gender: 'female' },
    inventedWord: null,
  };

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
  closeBoardMode();
  closeQrPosterModal();
  renderClassPicker();
  renderProgressSummary();
  renderRoadmap();
  renderBadgesShelf();
  renderLeaderboard();
  renderTeacherReportTable();
  renderInventWordSection();
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

  // כפתור קיצור מהיר לאתגר של היום
  const heroTodayBtn = document.getElementById('hero-today-challenge-btn');
  if (heroTodayBtn) {
    heroTodayBtn.addEventListener('click', handleHeroTodayClick);
  }

  // מודאל חידה ורמז + לשונית "דקה של עברית"
  const modal = document.getElementById('riddle-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const doneBtn = document.getElementById('modal-done-btn');
  const hintBtn = document.getElementById('modal-hint-btn');
  const hintText = document.getElementById('modal-hint-text');
  const modalTabRiddle = document.getElementById('modal-tab-riddle');
  const modalTabStory = document.getElementById('modal-tab-story');
  const modalGoStoryBtn = document.getElementById('modal-go-story-btn');
  const storyBackRiddleBtn = document.getElementById('story-back-riddle-btn');

  if (closeBtn) closeBtn.addEventListener('click', closeRiddleModal);
  if (doneBtn) doneBtn.addEventListener('click', closeRiddleModal);
  if (modalTabRiddle) modalTabRiddle.addEventListener('click', () => setRiddleModalTab('riddle'));
  if (modalTabStory) modalTabStory.addEventListener('click', () => setRiddleModalTab('story'));
  if (modalGoStoryBtn) modalGoStoryBtn.addEventListener('click', () => setRiddleModalTab('story'));
  if (storyBackRiddleBtn) storyBackRiddleBtn.addEventListener('click', () => setRiddleModalTab('riddle'));
  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeRiddleModal();
    });
  }
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeRiddleModal();
      closeTeacherPinModal();
      closeBoardMode();
      closeQrPosterModal();
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

  // משחק שידוך ניבים + אתגר המצאת מילה חדשה
  const matchResetBtn = document.getElementById('match-reset-btn');
  if (matchResetBtn) matchResetBtn.addEventListener('click', resetIdiomMatchGame);

  const inventWordForm = document.getElementById('invent-word-form');
  if (inventWordForm) inventWordForm.addEventListener('submit', handleInventWordSubmit);

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

  // מסך הקרנה ללוח (טלוויזיית מסדרון / לוח כיתה)
  const bannerBoardBtn = document.getElementById('banner-board-btn');
  const boardCloseBtn = document.getElementById('board-close-btn');
  const boardTabToday = document.getElementById('board-tab-today');
  const boardTabWeekly = document.getElementById('board-tab-weekly');

  if (bannerBoardBtn) bannerBoardBtn.addEventListener('click', openBoardMode);
  if (boardCloseBtn) boardCloseBtn.addEventListener('click', closeBoardMode);
  if (boardTabToday) {
    boardTabToday.addEventListener('click', () => {
      state.boardTab = 'today';
      renderBoardMode();
    });
  }
  if (boardTabWeekly) {
    boardTabWeekly.addEventListener('click', () => {
      state.boardTab = 'weekly';
      renderBoardMode();
    });
  }

  // מודאל כרזת QR להדפסה
  const bannerQrBtn = document.getElementById('banner-qr-btn');
  const qrModal = document.getElementById('qr-poster-modal');
  const qrCloseBtn = document.getElementById('qr-modal-close-btn');
  const qrDoneBtn = document.getElementById('qr-modal-done-btn');
  const printQrBtn = document.getElementById('print-qr-poster-btn');

  if (bannerQrBtn) bannerQrBtn.addEventListener('click', openQrPosterModal);
  if (qrCloseBtn) qrCloseBtn.addEventListener('click', closeQrPosterModal);
  if (qrDoneBtn) qrDoneBtn.addEventListener('click', closeQrPosterModal);
  if (printQrBtn) printQrBtn.addEventListener('click', printQrPoster);
  if (qrModal) {
    qrModal.addEventListener('click', (event) => {
      if (event.target === qrModal) closeQrPosterModal();
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
