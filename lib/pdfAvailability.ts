export const pdfAvailability: Record<string, Record<string, boolean>> = {
  "جامعة جدارا": {
    "برمجة 1": true,
    "برمجة 2": true,
  },
  "جامعة عجلون الوطنية": {
    "C++": true,
  },
  "جامعة اربد الاهليه": {
    "البرمجة بلغة مختاره": true,
    "C++": true,
  },
  "جامعة الزيتونة الأردنية": {
    "برمجة 1": true,
    "برمجة 2": true,
  },
};

export function isPdfAvailable(university: string, course: string) {
  return pdfAvailability[university]?.[course] ?? false;
}