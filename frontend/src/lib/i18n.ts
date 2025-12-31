import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      dashboard: 'Dashboard',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      help: 'Help',
      faq: 'FAQ',
      
      // Hero Section
      heroTitle: 'Secure Digital Identity for Every Ethiopian',
      heroSubtitle: 'Register life events, verify certificates, and access government services with confidence. Built on world-class security standards.',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      
      // Features
      secureRegistration: 'Secure Registration',
      secureRegistrationDesc: 'Register births, marriages, deaths, and other life events with bank-level security.',
      instantVerification: 'Instant Verification',
      instantVerificationDesc: 'Verify any certificate instantly with QR codes and blockchain technology.',
      multilingual: 'Multilingual Support',
      multilingualDesc: 'Full support for all Ethiopian languages with RTL and LTR text.',
      
      // Common
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      save: 'Save',
      cancel: 'Cancel',
      continue: 'Continue',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      search: 'Search',
      download: 'Download',
      upload: 'Upload',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      close: 'Close',
      
      // Auth
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      forgotPassword: 'Forgot Password?',
      
      // Dashboard
      welcome: 'Welcome',
      profile: 'Profile',
      certificates: 'Certificates',
      notifications: 'Notifications',
      settings: 'Settings',
      myDocuments: 'My Documents',
      recentActivity: 'Recent Activity',
      
      // Services
      birthRegistration: 'Birth Registration',
      marriageRegistration: 'Marriage Registration',
      deathRegistration: 'Death Registration',
      divorceRegistration: 'Divorce Registration',
      adoptionServices: 'Adoption Services',
      certificateVerification: 'Certificate Verification',
      
      // Footer
      quickLinks: 'Quick Links',
      support: 'Support',
      legal: 'Legal',
      followUs: 'Follow Us',
      allRightsReserved: 'All rights reserved',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      accessibility: 'Accessibility',
      cookies: 'Cookies',
      transparency: 'Transparency',
      education: 'Education',
      
      // Contact
      contactUs: 'Contact Us',
      sendMessage: 'Send Message',
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      subject: 'Subject',
      message: 'Message',
      
      // Help
      helpCenter: 'Help Center',
      searchHelp: 'Search for help...',
      needHelp: 'Need Help?',
      viewGuides: 'View Guides',
    }
  },
  am: {
    translation: {
      // Navigation
      home: 'መነሻ',
      services: 'አገልግሎቶች',
      about: 'ስለ እኛ',
      contact: 'ያነጋግሩን',
      dashboard: 'ዳሽቦርድ',
      login: 'ግባ',
      register: 'ተመዝገብ',
      logout: 'ውጣ',
      help: 'እርዳታ',
      faq: 'ጥያቄዎች',
      
      // Hero Section
      heroTitle: 'ለእያንዳንዱ ኢትዮጵያዊ ደህንነቱ የተጠበቀ ዲጂታል መታወቂያ',
      heroSubtitle: 'የህይወት ክስተቶችን ይመዝግቡ፣ የምስክር ወረቀቶችን ያረጋግጡ እና በመተማመን የመንግስት አገልግሎቶችን ያግኙ።',
      getStarted: 'ጀምር',
      learnMore: 'ተጨማሪ ተማር',
      
      // Features
      secureRegistration: 'ደህንነቱ የተጠበቀ ምዝገባ',
      secureRegistrationDesc: 'ልደት፣ ጋብቻ፣ ሞት እና ሌሎች የህይወት ክስተቶችን በባንክ ደረጃ ደህንነት ይመዝግቡ።',
      instantVerification: 'ፈጣን ማረጋገጫ',
      instantVerificationDesc: 'በQR ኮድ እና ብሎክቼይን ቴክኖሎጂ ማንኛውንም የምስክር ወረቀት በፍጥነት ያረጋግጡ።',
      multilingual: 'ባለብዙ ቋንቋ ድጋፍ',
      multilingualDesc: 'ለሁሉም የኢትዮጵያ ቋንቋዎች ከRTL እና LTR ጽሑፍ ጋር ሙሉ ድጋፍ።',
      
      // Common
      loading: 'በመጫን ላይ...',
      error: 'ስህተት',
      success: 'ተሳክቷል',
      save: 'አስቀምጥ',
      cancel: 'ሰርዝ',
      continue: 'ቀጥል',
      back: 'ተመለስ',
      next: 'ቀጣይ',
      submit: 'አስገባ',
      search: 'ፈልግ',
      download: 'አውርድ',
      upload: 'ስቀል',
      delete: 'ሰርዝ',
      edit: 'አርትዕ',
      view: 'ይመልከቱ',
      close: 'ዝጋ',
      
      // Auth
      email: 'ኢሜል',
      password: 'የሚስጥር ቃል',
      confirmPassword: 'የሚስጥር ቃል አረጋግጥ',
      signIn: 'ግባ',
      signUp: 'ተመዝገብ',
      forgotPassword: 'የሚስጥር ቃል ረሳሁ',
      
      // Dashboard
      welcome: 'እንኳን በደህና መጡ',
      profile: 'መገለጫ',
      certificates: 'የምስክር ወረቀቶች',
      notifications: 'ማሳወቂያዎች',
      settings: 'ቅንብሮች',
      myDocuments: 'የእኔ ሰነዶች',
      recentActivity: 'የቅርብ ጊዜ እንቅስቃሴ',
      
      // Services
      birthRegistration: 'የልደት ምዝገባ',
      marriageRegistration: 'የጋብቻ ምዝገባ',
      deathRegistration: 'የሞት ምዝገባ',
      divorceRegistration: 'የፍቺ ምዝገባ',
      adoptionServices: 'የጉዲፈቻ አገልግሎቶች',
      certificateVerification: 'የምስክር ወረቀት ማረጋገጫ',
      
      // Footer
      quickLinks: 'ፈጣን አገናኞች',
      support: 'ድጋፍ',
      legal: 'ህጋዊ',
      followUs: 'ይከተሉን',
      allRightsReserved: 'ሁሉም መብቶች የተጠበቁ ናቸው',
      privacyPolicy: 'የግላዊነት መመሪያ',
      termsOfService: 'የአገልግሎት ውል',
      accessibility: 'ተደራሽነት',
      cookies: 'ኩኪዎች',
      transparency: 'ግልጽነት',
      education: 'ትምህርት',
      
      // Contact
      contactUs: 'አግኙን',
      sendMessage: 'መልዕክት ላክ',
      fullName: 'ሙሉ ስም',
      phoneNumber: 'ስልክ ቁጥር',
      subject: 'ርዕስ',
      message: 'መልዕክት',
      
      // Help
      helpCenter: 'የእርዳታ ማዕከል',
      searchHelp: 'እርዳታ ፈልግ...',
      needHelp: 'እርዳታ ይፈልጋሉ?',
      viewGuides: 'መመሪያዎችን ይመልከቱ',
    }
  },
  ti: {
    translation: {
      // Navigation
      home: 'ገጽ ቤት',
      services: 'አገልግሎታት',
      about: 'ብዛዕባና',
      contact: 'ርኸቡና',
      dashboard: 'ዳሽቦርድ',
      login: 'እቶ',
      register: 'ተመዝገብ',
      logout: 'ውጻእ',
      help: 'ሓገዝ',
      faq: 'መልሲ ናይ ተደጋጋሚ ሕቶታት',
      
      // Hero Section
      heroTitle: 'ንኹሉ ኢትዮጵያዊ ውሕስነት ዘለዎ ዲጂታላዊ መንነት',
      heroSubtitle: 'ናይ ህይወት ፍጻሜታት ምዝገባ፣ ሰነዳት ምርግጋጽን ናይ መንግስቲ ኣገልግሎታት ብምትእምማን ምርካብ።',
      getStarted: 'ጀምር',
      learnMore: 'ተወሳኺ ተማሃር',
      
      // Features
      secureRegistration: 'ውሕስነት ዘለዎ ምዝገባ',
      secureRegistrationDesc: 'ልደት፣ ሓዳር፣ ሞት ከምኡውን ካልኦት ናይ ህይወት ፍጻሜታት ብደረጃ ባንኪ ውሕስነት ምዝገባ።',
      instantVerification: 'ቅልጡፍ ምርግጋጽ',
      instantVerificationDesc: 'ብQR ኮድን ብሎክቼይን ቴክኖሎጂን ዝኾነ ሰነድ ብቕልጡፍ ምርግጋጽ።',
      multilingual: 'ብዙሕ ቋንቋታት ደገፍ',
      multilingualDesc: 'ንኹሎም ናይ ኢትዮጵያ ቋንቋታት ምስ RTL ን LTR ጽሑፍን ምሉእ ደገፍ።',
      
      // Common
      loading: 'ይጽዓን ኣሎ...',
      error: 'ጌጋ',
      success: 'ተዓዊቱ',
      save: 'ዓቅብ',
      cancel: 'ስረዝ',
      continue: 'ቀጽል',
      back: 'ተመለስ',
      next: 'ቀጻሊ',
      submit: 'ኣእቱ',
      search: 'ድለ',
      download: 'ኣውርድ',
      upload: 'ኣእቱ',
      delete: 'ስረዝ',
      edit: 'ኣርትዕ',
      view: 'ርአ',
      close: 'ዕጸው',
      
      // Auth
      email: 'ኢመይል',
      password: 'ሓላፊ ቃል',
      confirmPassword: 'ሓላፊ ቃል ኣረጋግጽ',
      signIn: 'እቶ',
      signUp: 'ተመዝገብ',
      forgotPassword: 'ሓላፊ ቃል ረሲዐዮ',
      
      // Dashboard
      welcome: 'እንቋዕ ደሓን መጻእካ',
      profile: 'መግለጺ',
      certificates: 'ሰነዳት',
      notifications: 'መበጽሕታት',
      settings: 'ኣቀማምጣ',
      myDocuments: 'ናተይ ሰነዳት',
      recentActivity: 'ናይ ቀረባ ግዜ ንጥፈታት',
      
      // Services
      birthRegistration: 'ምዝገባ ልደት',
      marriageRegistration: 'ምዝገባ ሓዳር',
      deathRegistration: 'ምዝገባ ሞት',
      divorceRegistration: 'ምዝገባ ፍቺ',
      adoptionServices: 'ኣገልግሎታት ጉዲፈቻ',
      certificateVerification: 'ምርግጋጽ ሰነድ',
      
      // Footer
      quickLinks: 'ቅልጡፍ መራኸቢታት',
      support: 'ደገፍ',
      legal: 'ሕጋዊ',
      followUs: 'ተኸተሉና',
      allRightsReserved: 'ኩሎም መሰላት ተሓሊዮም',
      privacyPolicy: 'ፖሊሲ ብሕትዊነት',
      termsOfService: 'ውዕል ኣገልግሎት',
      accessibility: 'ተበጻሕነት',
      cookies: 'ኩኪስ',
      transparency: 'ግሉጽነት',
      education: 'ትምህርቲ',
      
      // Contact
      contactUs: 'ርኸቡና',
      sendMessage: 'መልእኽቲ ስደድ',
      fullName: 'ምሉእ ስም',
      phoneNumber: 'ቁጽሪ ተሌፎን',
      subject: 'ርእሲ',
      message: 'መልእኽቲ',
      
      // Help
      helpCenter: 'ማእከል ሓገዝ',
      searchHelp: 'ሓገዝ ድለ...',
      needHelp: 'ሓገዝ ይድልየካ?',
      viewGuides: 'መምርሒታት ርአ',
    }
  },
  om: {
    translation: {
      // Navigation
      home: 'Mana',
      services: 'Tajaajilaalee',
      about: 'Waaʼee Keenya',
      contact: 'Nu Qunnamaa',
      dashboard: 'Daashboordi',
      login: 'Seeni',
      register: 'Galmaaʼi',
      logout: 'Baʼi',
      help: 'Gargaarsa',
      faq: 'Gaaffilee Irra Deddeebiin Gaafataman',
      
      // Hero Section
      heroTitle: 'Eenyummaa Dijitaalaa Nageenya Qabu Oromoo Hundaaf',
      heroSubtitle: 'Taateelee jireenyaa galmeessi, ragaalee mirkaneessi, fi tajaajila mootummaa amanamummaan argadhu.',
      getStarted: 'Jalqabi',
      learnMore: 'Dabalataan Baradhu',
      
      // Features
      secureRegistration: 'Galmeenya Nageenya Qabu',
      secureRegistrationDesc: 'Dhaloota, gaa\'ela, du\'a fi taateelee jireenyaa biroo nageenya sadarkaa baankii waliin galmeessi.',
      instantVerification: 'Mirkanaa\'ina Ariifachiisaa',
      instantVerificationDesc: 'Ragaa kamiyyuu koordii QR fi teknooloojii blockchain fayyadamuun ariifachiisaan mirkaneessi.',
      multilingual: 'Deeggarsa Afaanota Hedduu',
      multilingualDesc: 'Afaanota Itoophiyaa hundaaf barreeffama RTL fi LTR waliin deeggarsa guutuu.',
      
      // Common
      loading: 'Fe\'aa jira...',
      error: 'Dogoggora',
      success: 'Milkaa\'ina',
      save: 'Olkaaʼi',
      cancel: 'Haqii',
      continue: 'Itti Fufi',
      back: 'Duubatti Deebiʼi',
      next: 'Itti Aanuu',
      submit: 'Galchi',
      search: 'Barbaadi',
      download: 'Bu\'uura Kaaʼi',
      upload: 'Olkaaʼi',
      delete: 'Haqii',
      edit: 'Gulaalii',
      view: 'Ilaalii',
      close: 'Cufi',
      
      // Auth
      email: 'Imeelii',
      password: 'Jecha Iccitii',
      confirmPassword: 'Jecha Iccitii Mirkaneessi',
      signIn: 'Seeni',
      signUp: 'Galmaaʼi',
      forgotPassword: 'Jecha Iccitii Irraanfadheeta',
      
      // Dashboard
      welcome: 'Baga Nagaan Dhuftan',
      profile: 'Ibsa',
      certificates: 'Ragaalee',
      notifications: 'Beeksisaawwan',
      settings: 'Qindaayinoota',
      myDocuments: 'Galmee Koo',
      recentActivity: 'Sochii Dhiyoo',
      
      // Services
      birthRegistration: 'Galma Dhaloota',
      marriageRegistration: 'Galma Fuudhaa',
      deathRegistration: 'Galma Du\'aa',
      divorceRegistration: 'Galma Walliigaltii',
      adoptionServices: 'Tajaajila Guddifannaa',
      certificateVerification: 'Mirkaneessuu Ragaa',
      
      // Footer
      quickLinks: 'Walqunnama Ariifachiisaa',
      support: 'Deeggarsa',
      legal: 'Seera',
      followUs: 'Nu Hordofaa',
      allRightsReserved: 'Mirgi Hunduu Eegameera',
      privacyPolicy: 'Imaammata Dhuunfaa',
      termsOfService: 'Waliigaltii Tajaajilaa',
      accessibility: 'Argachuuf Dandeettii',
      cookies: 'Kuukiyoota',
      transparency: 'Iftoominaa',
      education: 'Barnootaa',
      
      // Contact
      contactUs: 'Nu Qunnamaa',
      sendMessage: 'Ergaa Ergi',
      fullName: 'Maqaa Guutuu',
      phoneNumber: 'Lakkoofsa Bilbilaa',
      subject: 'Mata Duree',
      message: 'Ergaa',
      
      // Help
      helpCenter: 'Giddugala Gargaarsaa',
      searchHelp: 'Gargaarsa Barbaadi...',
      needHelp: 'Gargaarsa Barbaadduu?',
      viewGuides: 'Qajeelfamoota Ilaalii',
    }
  },
  so: {
    translation: {
      // Navigation
      home: 'Bogga Hore',
      services: 'Adeegyada',
      about: 'Naga Xaggeenna',
      contact: 'Nala Soo Xiriir',
      dashboard: 'Baandheeyga',
      login: 'Gal',
      register: 'Isdiiwaangeli',
      logout: 'Ka Bax',
      help: 'Caawimo',
      faq: 'Su\'aalaha Inta Badan La Su\'aalo',
      
      // Hero Section
      heroTitle: 'Aqoonsiga Dhijitaalka Ammaan Ah Somalida Oo Dhan',
      heroSubtitle: 'Diiwaan geli dhacdooyinka nolosha, xaqiiji shahaadooyinka, oo hel adeegyada dawladda kalsooni.',
      getStarted: 'Bilow',
      learnMore: 'Wax Dheeraad Ah Baro',
      
      // Features
      secureRegistration: 'Diiwaangelinta Ammaan Ah',
      secureRegistrationDesc: 'Diiwaan geli dhalashada, guurka, geerida iyo dhacdooyinka nolosha kale ammaan heer bangiyeed ah.',
      instantVerification: 'Xaqiijin Degdeg Ah',
      instantVerificationDesc: 'Xaqiiji shahaado kasta degdeg ah oo adeegsanaya koodhka QR iyo teknoolajiyada blockchain.',
      multilingual: 'Taageerada Luuqadaha Badan',
      multilingualDesc: 'Taageero buuxa oo loogu talagalay dhammaan luqadaha Itoobiya iyo qoraalka RTL iyo LTR.',
      
      // Common
      loading: 'Waa la Rarayo...',
      error: 'Khalad',
      success: 'Lagu Guuleystay',
      save: 'Kaydi',
      cancel: 'Jooji',
      continue: 'Sii Wad',
      back: 'Dib U Noqo',
      next: 'Xiga',
      submit: 'Soo Gudbi',
      search: 'Raadi',
      download: 'Soo Deji',
      upload: 'Kor U Qaad',
      delete: 'Tirtir',
      edit: 'Wax Ka Badal',
      view: 'Arag',
      close: 'Xir',
      
      // Auth
      email: 'Iimayl',
      password: 'Furaha Sirta Ah',
      confirmPassword: 'Xaqiiji Furaha Sirta Ah',
      signIn: 'Gal',
      signUp: 'Isdiiwaangeli',
      forgotPassword: 'Furaha Sirta Ah Ma Illowday',
      
      // Dashboard
      welcome: 'Soo Dhowoow',
      profile: 'Astaanta',
      certificates: 'Shahaadooyinka',
      notifications: 'Ogeysiisyada',
      settings: 'Dejinta',
      myDocuments: 'Dukumentiyada',
      recentActivity: 'Waxqabadka Dhawaan',
      
      // Services
      birthRegistration: 'Diiwaan Gelinta Dhalashada',
      marriageRegistration: 'Diiwaan Gelinta Guurka',
      deathRegistration: 'Diiwaan Gelinta Geerida',
      divorceRegistration: 'Diiwaan Gelinta Furashada',
      adoptionServices: 'Adeegyada Korsashada',
      certificateVerification: 'Xaqiijinta Shahaadada',
      
      // Footer
      quickLinks: 'Isku Xirka Degdega Ah',
      support: 'Taageero',
      legal: 'Sharci',
      followUs: 'Na Raac',
      allRightsReserved: 'Xuquuqda Oo Dhan Waa La Ilaaliyey',
      privacyPolicy: 'Siyaasadda Sirta',
      termsOfService: 'Shuruudaha Adeegga',
      accessibility: 'Helitaanka',
      cookies: 'Cookies',
      transparency: 'Daahfurnimo',
      education: 'Waxbarashada',
      
      // Contact
      contactUs: 'Nala Soo Xiriir',
      sendMessage: 'Fariin Dir',
      fullName: 'Magaca Oo Dhan',
      phoneNumber: 'Lambarka Telefoonka',
      subject: 'Mawduuca',
      message: 'Fariinta',
      
      // Help
      helpCenter: 'Xarunta Caawinta',
      searchHelp: 'Caawimo Raadi...',
      needHelp: 'Ma U Baahan Tahay Caawimo?',
      viewGuides: 'Arag Tilmaamaha',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;