import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      'dashboard': 'Dashboard',
      'certificates': 'Certificates',
      'newCertificate': 'New Certificate',
      'profile': 'Profile',
      'audit': 'Audit Log',
      'family': 'Family Tree',
      'logout': 'Logout',
      
      // Dashboard
      'welcome': 'Welcome',
      'totalCertificates': 'Total Certificates',
      'pendingCertificates': 'Pending Certificates',
      'approvedCertificates': 'Approved Certificates',
      'recentActivities': 'Recent Activities',
      'achievements': 'Achievements',
      'monthlyTrends': 'Monthly Trends',
      'certificateTypes': 'Certificate Types',
      
      // Certificate Types
      'BIRTH': 'Birth Certificate',
      'DEATH': 'Death Certificate',
      'MARRIAGE': 'Marriage Certificate',
      'DIVORCE': 'Divorce Certificate',
      'ADOPTION': 'Adoption Certificate',
      
      // Certificate Status
      'PENDING': 'Pending',
      'UNDER_REVIEW': 'Under Review',
      'VERIFIED': 'Verified',
      'APPROVED': 'Approved',
      'ISSUED': 'Issued',
      'REJECTED': 'Rejected',
      'EXPIRED': 'Expired',
      
      // Forms
      'email': 'Email',
      'password': 'Password',
      'firstName': 'First Name',
      'lastName': 'Last Name',
      'phone': 'Phone',
      'login': 'Login',
      'register': 'Register',
      'fullName': 'Full Name',
      'dateOfBirth': 'Date of Birth',
      'placeOfBirth': 'Place of Birth',
      'gender': 'Gender',
      'nationality': 'Nationality',
      'fatherName': "Father's Name",
      'motherName': "Mother's Name",
      'spouseName': "Spouse's Name",
      'dateOfEvent': 'Date of Event',
      'placeOfEvent': 'Place of Event',
      'submit': 'Submit',
      'cancel': 'Cancel',
      'save': 'Save',
      
      // Actions
      'view': 'View',
      'edit': 'Edit',
      'delete': 'Delete',
      'approve': 'Approve',
      'reject': 'Reject',
      'verify': 'Verify',
      'download': 'Download',
      'print': 'Print',
      
      // Messages
      'loading': 'Loading...',
      'noData': 'No data available',
      'success': 'Success',
      'error': 'Error',
      'confirmAction': 'Are you sure?',
      
      // Theme
      'lightMode': 'Light Mode',
      'darkMode': 'Dark Mode',
      
      // Languages
      'english': 'English',
      'amharic': 'አማርኛ',
      'oromo': 'Afaan Oromoo',
      'tigrinya': 'ትግርኛ',
      'arabic': 'العربية'
    }
  },
  am: {
    translation: {
      'dashboard': 'ዳሽቦርድ',
      'certificates': 'የምስክር ወረቀቶች',
      'newCertificate': 'አዲስ የምስክር ወረቀት',
      'profile': 'መገለጫ',
      'audit': 'የመጽሐፍ ማስታወሻ',
      'family': 'የቤተሰብ ዛፍ',
      'logout': 'ውጣ',
      'welcome': 'እንኳን ደህና መጡ',
      'totalCertificates': 'ጠቅላላ የምስክር ወረቀቶች',
      'pendingCertificates': 'በመጠባበቅ ላይ ያሉ',
      'approvedCertificates': 'የፀደቁ ምስክር ወረቀቶች',
      'recentActivities': 'የቅርብ ጊዜ እንቅስቃሴዎች',
      'achievements': 'ስኬቶች',
      'BIRTH': 'የልደት ምስክር ወረቀት',
      'DEATH': 'የሞት ምስክር ወረቀት',
      'MARRIAGE': 'የጋብቻ ምስክር ወረቀት',
      'DIVORCE': 'የፍቺ ምስክር ወረቀት',
      'ADOPTION': 'የልጅ ማጣደፊያ ምስክር ወረቀት',
      'email': 'ኢሜይል',
      'password': 'የይለፍ ቃል',
      'firstName': 'ስም',
      'lastName': 'የአባት ስም',
      'login': 'ግባ',
      'register': 'ተመዝገብ',
      'english': 'English',
      'amharic': 'አማርኛ',
      'oromo': 'Afaan Oromoo',
      'tigrinya': 'ትግርኛ',
      'arabic': 'العربية'
    }
  },
  or: {
    translation: {
      'dashboard': 'Gabatee',
      'certificates': 'Ragaalee',
      'newCertificate': 'Ragaa Haaraa',
      'profile': 'Seenaa',
      'logout': 'Ba\'i',
      'welcome': 'Baga nagaan dhuftan',
      'BIRTH': 'Ragaa Dhaloota',
      'MARRIAGE': 'Ragaa Fuudhaatii',
      'english': 'English',
      'amharic': 'አማርኛ',
      'oromo': 'Afaan Oromoo',
      'tigrinya': 'ትግርኛ',
      'arabic': 'العربية'
    }
  },
  ar: {
    translation: {
      'dashboard': 'لوحة التحكم',
      'certificates': 'الشهادات',
      'newCertificate': 'شهادة جديدة',
      'profile': 'الملف الشخصي',
      'logout': 'تسجيل الخروج',
      'welcome': 'مرحباً',
      'BIRTH': 'شهادة الميلاد',
      'MARRIAGE': 'شهادة الزواج',
      'email': 'البريد الإلكتروني',
      'password': 'كلمة المرور',
      'login': 'تسجيل الدخول',
      'register': 'التسجيل',
      'english': 'English',
      'amharic': 'አማርኛ',
      'oromo': 'Afaan Oromoo',
      'tigrinya': 'ትግርኛ',
      'arabic': 'العربية'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;