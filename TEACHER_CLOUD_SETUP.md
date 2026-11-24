# מדריך למורה: ניקוד אוטומטי מכל הכיתות + חסימת כפילויות (Anti-Cheat) 🏆

האתר מגן מפני הגשות כפולות ב-**4 שכבות משולבות**:
1. **מזהה מכשיר קבוע + גיבוי עוגייה (`localStorage` + `Cookie`):** חידה שנפתרה ננעלת על המכשיר גם לאחר רענון וגם אם נמחק `localStorage`.
2. **נעילת כיתה לאחר ההגשה הראשונה:** לאחר שתלמיד צובר נקודות ראשונות, הכיתה שלו ננעלת ולא ניתן להחליף כיתה.
3. **קוד מורה למצב בדיקה (`CONFIG.teacherPin = '2026'`):** מונע מתלמידים להיכנס ל"מצב בדיקה למורה" ולאפס נקודות. בנוסף, במצב מורה לא נשלח ניקוד לענן.
4. **חסימת כפילויות בצד השרת (גם נגד "גלישה בסתר" / Incognito!):** השרת בודק **גם** את מזהה המכשיר **וגם** את שם התלמיד/ה + הכיתה לכל יום, וחוסם אוטומטית כל ניסיון לצבור נקודות פעמיים באותו יום!

---

## אפשרות א' (מומלצת למייל יומי אוטומטי): Google Sheets + חסימת כפילויות + מייל יומי (3 דקות!)

1. פתחי גיליון חדש ב-[Google Sheets](https://sheets.new) וקראי לו **"ניקוד שבוע השפה העברית"**.
2. בתפריט העליון לחצי על **הרחבות (Extensions) ← Apps Script**.
3. מחקי את הקוד הקיים והדביקי במקומו את הקוד הבא (שני בשורה 2 את כתובת המייל שלך!):

```javascript
// כתובת המייל שלך לקבלת הסיכום היומי האוטומטי:
const TEACHER_EMAIL = 'your-email@gmail.com';
const SHEET_NAME = 'Submissions';
const BLOCKED_SHEET_NAME = 'BlockedDuplicates';

function getOrCreateSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
  }
  return sheet;
}

// מקבל כל פתרון מהאתר, בודק כפילויות לפי מכשיר + שם תלמיד/ה לאותו יום, ורושם רק הגשה ראשונה!
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getOrCreateSheet(SHEET_NAME, [
      'תאריך',
      'שעה',
      'יום החידה',
      'מספר יום',
      'כיתה',
      'שם תלמיד/ה',
      'נקודות',
      'מזהה מכשיר',
      'מזהה תלמיד',
    ]);

    const data = JSON.parse(e.postData.contents);
    const riddleId = Number(data.riddleId) || 1;
    const deviceId = String(data.deviceId || '').trim();
    const studentKey = String(data.studentKey || '').trim();

    // בדיקת כפילויות מול כל ההגשות הקיימות לאותו יום חידה
    const existingRows = sheet.getDataRange().getValues().slice(1);
    const isDuplicate = existingRows.some((row) => {
      const sameDay = Number(row[3]) === riddleId;
      if (!sameDay) return false;
      const sameDevice = deviceId && String(row[7] || '') === deviceId;
      const sameStudent = studentKey && String(row[8] || '') === studentKey;
      return sameDevice || sameStudent;
    });

    if (isDuplicate) {
      const blockedSheet = getOrCreateSheet(BLOCKED_SHEET_NAME, [
        'תאריך',
        'שעה',
        'מספר יום',
        'כיתה',
        'שם תלמיד/ה',
        'מזהה מכשיר',
        'סיבה',
      ]);
      blockedSheet.appendRow([
        data.dateIso || '',
        data.timeStr || '',
        riddleId,
        data.className || '',
        data.studentName || '',
        deviceId,
        'כפילות נחסמה אוטומטית (מכשיר או שם תלמיד/ה כבר הוגשו ביום זה)',
      ]);
      return ContentService.createTextOutput(JSON.stringify({ ok: false, duplicate: true })).setMimeType(
        ContentService.MimeType.JSON
      );
    }

    sheet.appendRow([
      data.dateIso || '',
      data.timeStr || '',
      data.dayLabel || '',
      riddleId,
      data.className || 'ללא כיתה',
      data.studentName || 'תלמיד/ה',
      Number(data.points) || 0,
      deviceId,
      studentKey,
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } finally {
    lock.releaseLock();
  }
}

// מחזיר לאתר את טבלת הניקוד העדכנית של כל הכיתות
function doGet() {
  const sheet = getOrCreateSheet(SHEET_NAME, [
    'תאריך',
    'שעה',
    'יום החידה',
    'מספר יום',
    'כיתה',
    'שם תלמיד/ה',
    'נקודות',
    'מזהה מכשיר',
    'מזהה תלמיד',
  ]);
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
  const sheet = getOrCreateSheet(SHEET_NAME, [
    'תאריך',
    'שעה',
    'יום החידה',
    'מספר יום',
    'כיתה',
    'שם תלמיד/ה',
    'נקודות',
    'מזהה מכשיר',
    'מזהה תלמיד',
  ]);
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
    `לצפייה בגיליון המלא (כולל לשונית חסימת כפילויות): ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`;

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
   - העתיקי את ה-URL והדביקי אותו בראש `script.js` בשדה `googleSheetWebhookUrl`.
5. **הגדרת המייל היומי האוטומטי:**
   - בתפריט השמאלי של Apps Script לחצי על אייקון ה**שעון (Triggers)** ← **הוסף מפעיל (Add Trigger)**.
   - פונקציה: `sendDailyEmailToTeacher` | מקור: **Time-driven** | **Day timer** | שעה רצויה (למשל `14:00–15:00`).

---

## אפשרות ב': Firebase Firestore (ניקוד חי בזמן אמת + נעילת כפילויות בענן)

1. ב-Firebase Console היכנסי ל-**Build ← Firestore Database ← Create database**.
2. העתיקי את `firebaseConfig` מ-**Project Settings ← Your apps** והדביקי בראש `script.js`.
3. בלשונית **Rules** ב-Firestore הדביקי את הכללים המאובטחים הבאים (מגנים על שמות התלמידים, מונעים דריסת נעילות, מגבילים הוספת נקודות ל-12 נק' מקסימום להגשה, ושומרים את המילים החדשות שיום השיא שולח לצפייה למורה בלבד):

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /submissionLocks/{lockId} {
      allow get: if true;
      allow list: if false;
      allow create: if !exists(/databases/$(database)/documents/submissionLocks/$(lockId));
      allow update, delete: if false;
    }
    match /classScores/{classId} {
      allow read: if true;
      allow create: if request.resource.data.total is int
                    && request.resource.data.total >= 10
                    && request.resource.data.total <= 12;
      allow update: if request.resource.data.total is int
                    && resource.data.total is int
                    && request.resource.data.total > resource.data.total
                    && (request.resource.data.total - resource.data.total) <= 12;
      allow delete: if false;
    }
    match /dailySubmissions/{docId} {
      allow create: if request.resource.data.points is int
                    && request.resource.data.points >= 10
                    && request.resource.data.points <= 12;
      allow read, update, delete: if false;
    }
    match /inventedWords/{docId} {
      allow create: if request.resource.data.word is string
                    && request.resource.data.word.size() >= 2
                    && request.resource.data.word.size() <= 40
                    && request.resource.data.meaning is string
                    && request.resource.data.meaning.size() >= 3
                    && request.resource.data.meaning.size() <= 160;
      allow read, update, delete: if false;
    }
  }
}
```

