# מדריך למורה: קבלת ניקוד אוטומטי מכל הכיתות כל יום 🏆

האתר בודק כל חידה **אוטומטית**, מחשב 10 נקודות (+2 בונוס בניסיון ראשון) וזוקף אותן אוטומטית לכיתה שהתלמיד בחר.

כדי שהניקוד ייאסף מכל הטלפונים והמחשבים של התלמידים **ויישלח אלייך אוטומטית למייל בסוף כל יום**, יש שתי אפשרויות חינמיות ופשוטות (אפשר לבחור אחת או לשלב את שתיהן):

---

## אפשרות א' (הכי מומלצת לקבלת מייל יומי אוטומטי): Google Sheets + מייל יומי אוטומטי (3 דקות!)

1. פתחי גיליון חדש ב-[Google Sheets](https://sheets.new) וקראי לו **"ניקוד שבוע השפה העברית"**.
2. בתפריט העליון לחצי על **הרחבות (Extensions) ← Apps Script**.
3. מחקי את הקוד הקיים, והדביקי במקומו את הקוד הבא (שני בשורה 2 את כתובת המייל שלך!):

```javascript
// כתובת המייל שלך לקבלת הסיכום היומי האוטומטי:
const TEACHER_EMAIL = 'your-email@gmail.com';
const SHEET_NAME = 'Submissions';

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['תאריך', 'שעה', 'יום החידה', 'מספר יום', 'כיתה', 'שם תלמיד/ה', 'נקודות']);
  }
  return sheet;
}

// מקבל אוטומטית כל פתרון נכון מהאתר ורושם בגיליון
function doPost(e) {
  const sheet = getOrCreateSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.dateIso || '',
    data.timeStr || '',
    data.dayLabel || '',
    Number(data.riddleId) || 1,
    data.className || 'ללא כיתה',
    data.studentName || 'תלמיד/ה',
    Number(data.points) || 0,
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON
  );
}

// מחזיר לאתר את טבלת הניקוד העדכנית של כל הכיתות
function doGet() {
  const sheet = getOrCreateSheet();
  const rows = sheet.getDataRange().getValues().slice(1);
  const scores = {};

  rows.forEach((row) => {
    const dayId = Number(row[3]) || 1;
    const cls = String(row[4] || '').trim();
    const pts = Number(row[6]) || 0;
    if (!cls) return;
    if (!scores[cls]) {
      scores[cls] = { total: 0, byDay: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 } };
    }
    scores[cls].total += pts;
    scores[cls].byDay[dayId] = (scores[cls].byDay[dayId] || 0) + pts;
  });

  return ContentService.createTextOutput(JSON.stringify({ scores })).setMimeType(
    ContentService.MimeType.JSON
  );
}

// שולח אלייך מייל יומי אוטומטי עם מצב התחרות היום ובסיכום השבועי!
function sendDailyEmailToTeacher() {
  const sheet = getOrCreateSheet();
  const rows = sheet.getDataRange().getValues().slice(1);
  const todayIso = Utilities.formatDate(new Date(), 'Asia/Jerusalem', 'yyyy-MM-dd');

  const todayMap = {};
  const weeklyMap = {};

  rows.forEach((row) => {
    const rowDate = String(row[0] || '');
    const cls = String(row[4] || '').trim();
    const pts = Number(row[6]) || 0;
    if (!cls) return;

    weeklyMap[cls] = (weeklyMap[cls] || 0) + pts;
    if (rowDate === todayIso) {
      todayMap[cls] = (todayMap[cls] || 0) + pts;
    }
  });

  const formatList = (map) => {
    const entries = Object.entries(map).sort((a, b) => b[1] - a[1]);
    if (!entries.length) return 'עדיין לא נצברו נקודות.';
    return entries.map(([cls, pts], i) => `${i + 1}. כיתה ${cls} — ${pts} נקודות`).join('\n');
  };

  const body =
    `שלום! הנה סיכום הניקוד האוטומטי של שבוע השפה העברית לתאריך ${todayIso}:\n\n` +
    `📌 דירוג היום:\n${formatList(todayMap)}\n\n` +
    `🏆 טבלה מצטברת לשבוע:\n${formatList(weeklyMap)}\n\n` +
    `לצפייה בטבלה המלאה: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`;

  MailApp.sendEmail({
    to: TEACHER_EMAIL,
    subject: `🏆 דוח ניקוד יומי — שבוע השפה העברית (${todayIso})`,
    body,
  });
}
```

4. לחצי למעלה על **פריסה (Deploy) ← פריסה חדשה (New deployment)**:
   - סוג: **אפליקציית אינטרנט (Web app)**
   - הפעל בתור: **אני (Me)**
   - למי יש גישה: **כל אחד (Anyone)**
   - לחצי **פריסה (Deploy)** ואשרי הרשאות.
   - **העתיקי את כתובת ה-URL** שתקבלי והדביקי אותה בקובץ `script.js` בשדה `googleSheetWebhookUrl`.
5. **הגדרת המייל היומי האוטומטי:**
   - בתפריט השמאלי של Apps Script לחצי על אייקון ה**שעון (Triggers / מפעילים)** ← **הוסף מפעיל (Add Trigger)**.
   - בחרי בפונקציה: `sendDailyEmailToTeacher`
   - מקור אירוע: **מופעל זמן (Time-driven)** ← **טיימר יומי (Day timer)** ← בחרי שעה (לדוגמה: `14:00–15:00`).
   - שמרי! מעכשיו בכל יום אחר הצהריים ינחת אצלך במייל דוח מסודר אוטומטית.

---

## אפשרות ב': חיבור ל-Firebase Firestore (לניקוד חי בזמן אמת בין כל המכשירים)

מאחר שכבר פתחת פרויקט ב-Firebase:
1. ב-Firebase Console היכנסי ל-**Build ← Firestore Database ← Create database** (בחרי Production או Test mode).
2. היכנסי ל-**Project Settings (גלגל שיניים) ← Your apps ← הוספת אפליקציית Web (`</>`)** והעתיקי את האובייקט `firebaseConfig`.
3. הדביקי את הערכים בתוך `CONFIG.firebaseConfig` בראש הקובץ `script.js`.
4. בלשונית **Rules** ב-Firestore הדביקי כללי אבטחה פשוטים לתקופת שבוע השפה העברית:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /classScores/{classId} {
      allow read, write: if true;
    }
    match /dailySubmissions/{docId} {
      allow create, read: if true;
    }
  }
}
```

מרגע זה, בכל פעם שתלמיד פותר חידה — הטבלה באתר מתעדכנת **מיידית ובזמן אמת** על המסכים של כל הכיתות, ובמצב **"מצב בדיקה למורה" ← "📊 דוח ניקוד כיתות"** תוכלי גם להוריד קובץ Excel (CSV) בכל רגע!
