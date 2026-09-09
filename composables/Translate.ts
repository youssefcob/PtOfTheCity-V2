type Language = 'EN' | 'ES' | 'AR';

interface PhraseDictionary {
  [key: string]: {
    [lang in Language]: string;
  };
}

const phrase: PhraseDictionary = {
  
  // navbar
  services: {
    EN: 'Services',
    ES: 'Servicios',
    AR: 'خدمات'
  },
  serviceAndPrograms: {
    EN: 'Service & Programs',
    ES: 'Servicios y Programas',
    AR: 'الخدمات والبرامج'
  },
  about: {
    EN: 'About',
    ES: 'Acerca de',
    AR: 'من نحن'
  },
  patientInfo: {
    EN: 'Patient Info',
    ES: 'Información del Paciente',
    AR: 'معلومات المريض'
  },
  providers: {
    EN: 'Providers',
    ES: 'Proveedores',
    AR: 'مقدمو الخدمة'
  },
  insurance: {
    EN: 'Insurance',
    ES: 'Seguro',
    AR: 'تأمين'
  },
  whoWeAre: {
    EN: 'Who We Are',
    ES: 'Quiénes Somos',
    AR: 'من نحن'
  },
  blog: {
    EN: 'Blog',
    ES: 'Blog',
    AR: 'مدونة'
  },
  careers: {
    EN: 'Careers',
    ES: 'Carreras',
    AR: 'وظائف'
  },
  trustedBy: {
    EN: 'Trusted by',
    ES: 'Confiado por',
    AR: 'موثوق من '
  },
  faqs: {
    EN: 'FAQs',
    ES: 'Preguntas Frecuentes',
    AR: 'أسئلة مكررة'
  },
  contactUs: {
    EN: 'Contact us',
    ES: 'Contáctenos',
    AR: 'اتصل بنا'
  },
  search: {
    EN: 'Search...',
    ES: 'Buscar...',
    AR: '...بحث'
  },
  menu: {
    EN: 'Menu',
    ES: 'Menú',
    AR: 'قائمة'
  },


  //landing Page
  where_healing_happens: {
    EN: 'Where Healing Happens',
    ES: 'Donde Sanación Sucede',
    AR: 'حيث يحدث الشفاء'
  },


  //insurance section
  insurances_we_accept: {
    EN: 'Insurances We Accept',
    ES: 'Seguros Que Aceptamos',
    AR: 'التأمينات التي نقبلها'
  },



  //check eligibility
  check_eligibility: {
    EN: 'Check Eligibility',
    ES: 'Verificar Elegibilidad',
    AR: 'تحقق من الأهلية'
  },

  eligibility_check_phrase: {
    EN: 'Check your benefits and eligibility and our team will get back to you within 24 hours',
    ES: 'Verifique sus beneficios y elegibilidad y nuestro equipo se comunicará con usted dentro de 30 minutos',
    AR: 'تحقق من استحقاقك وأهليتك وسيتصل فريقنا بك خلال 30 دقيقة'
  },


  // who we are
  satisfied_patients: {
    EN: 'Satisfied Patients',
    ES: 'Pacientes Satisfechos',
    AR: 'مرضى راضون'
  },
  employees: {
    EN: 'Employees',
    ES: 'Empleados',
    AR: 'موظف'
  },
  clinics: {
    EN: 'Clinics',
    ES: 'Clínicas',
    AR: 'عيادات '
  },
  our_story: {
    EN: 'Our Story',
    ES: 'Nuestra Historia',
    AR: 'قصتنا'
  },
  our_story_text: {
    EN: 'Our story of success started with Dr. Mahmoud`s simple dream of being the best physical therapy clinic in town. It grew over the years into a dream that came true with the establishment of the PT of the city in 2020. We reached 14 locations in a few years, all over New York, with the dedication of our partners and team and the trust of our patients. And to more success, we go. ',
    ES: 'Nuestra historia de éxito comenzó con el simple sueño del Dr. Mahmoud de ser la mejor clínica de fisioterapia de la ciudad. Creció con los años en un sueño que se hizo realidad con el establecimiento del PT of the city en 2020. Alcanzamos 14 ubicaciones en pocos años, en todo Nueva York, con la dedicación de nuestros socios y equipo y la confianza de nuestros pacientes. Y a más éxito, vamos.',
    AR: `بدأت قصتنا الناجحة بحلم د. محمود البسيط بأن تكون أفضل عيادة علاج طبيعي في المدينة. نمت على مر السنين إلى حلم تحقق مع إنشاء <span style="direction:rtl;unicode-bidi: embed;">PT of the city<span/>  في عام 2020. وصلنا إلى 14 موقعًا في بضع سنوات ، في جميع أنحاء نيويورك ، بتفاني شركائنا وفريقنا وثقة مرضانا. وإلى المزيد من النجاح ، نذهب.`
  },
  our_technique: {
    EN: 'Our Technique',
    ES: 'Nuestra Técnica',
    AR: 'تقنيتنا'
  },
  our_technique_text: {
    EN: `We offer you a treatment plan specialized for each case to achieve the most effective results. You will be given detailed information about the nature of the case and injury, the treatment plan, tools, and devices you will use, as well as the expected outcome from the treatment. Our main concern is your comfort and wellness. You will be treated with the most recent evidence guidelines and the most advanced tools, techniques, and devices that will help you reach the treatment goal in the most convenient way and in the shortest duration of time.`,
    ES: `Le ofrecemos un plan de tratamiento especializado para cada caso para lograr los resultados más efectivos. Se le proporcionará información detallada sobre la naturaleza del caso y la lesión, el plan de tratamiento, las herramientas y dispositivos que utilizará, así como el resultado esperado del tratamiento. Nuestra principal preocupación es su comodidad y bienestar. Será tratado con las pautas de evidencia más recientes y las herramientas, técnicas y dispositivos más avanzados que lo ayudarán a alcanzar el objetivo del tratamiento de la manera más conveniente y en el menor tiempo posible.`,
    AR: `نقدم لك خطة علاج متخصصة لكل حالة لتحقيق أكثر النتائج فعالية. ستحصل على معلومات مفصلة حول طبيعة الحالة والإصابة وخطة العلاج والأدوات والأجهزة التي ستستخدمها ، بالإضافة إلى النتيجة المتوقعة من العلاج. همنا الأساسي هو راحتك وصحتك. سيتم علاجك بأحدث الإرشادات الدليلية وأحدث الأدوات والتقنيات والأجهزة التي ستساعدك على تحقيق هدف العلاج بأكثر الطرق ملاءمة وفي أقصر مدة زمنية.`
  },


  //clinics section
  clinics_phrase: {
    EN: "22 clinics all over New York",
    ES: "22 clínicas en todo Nueva York",
    AR: "٢٢ عيادة في جميع أنحاء نيويورك"
  },


  //cities
  Manhattan: {
    EN: 'Manhattan',
    ES: 'Manhattan',
    AR: 'مانهاتن'
  },
  Brooklyn: {
    EN: 'Brooklyn',
    ES: 'Brooklyn',
    AR: 'بروكلين'
  },
  Bronx: {
    EN: 'Bronx',
    ES: 'Bronx',
    AR: 'برونكس'
  },
  Queens: {
    EN: 'Queens',
    ES: 'Queens',
    AR: 'كوينز'
  },


  // staff section
  meet_our_staff: {
    EN: 'Meet Our Staff',
    ES: 'Conoce a Nuestro Personal',
    AR: 'تعرف على فريقنا'
  },

  meet_our_staff_phrase: {
    EN: 'Physical Therapists you can trust',
    ES: 'Fisioterapeutas en los que puedes confiar',
    AR: 'أخصائيو العلاج الطبيعي الذين يمكنك الوثوق بهم'
  },

  
  //careers
  join_us: {
    EN: 'Join Us',
    ES: 'Únete a Nosotros',
    AR: 'انضم إلينا'
  },
  now: {
    EN: 'Now',
    ES: 'Ahora',
    AR: 'الآن'
  },
  we_are_always_hiring: {
    EN: 'We are always hiring',
    ES: 'Siempre estamos contratando',
    AR: 'نحن نوظف دائمًا'
  },


  // trusted by
  trusted_by: {
    EN: 'Trusted by',
    ES: 'Confiado por',
    AR: 'موثوق من'
  },


  //testimonials
  testimonials: {
    EN: 'Testimonials',
    ES: 'Testimonios',
    AR: 'شهادات'
  },


  //contact us
  contact_us_phrase: {
    EN: 'We would love to hear from you!',
    ES: '¡Nos encantaría saber de ti!',
    AR: 'نود أن نسمع منك!'
  },

  subject: {
    EN: 'Subject',
    ES: 'Asunto',
    AR: 'الموضوع'
  },
  name: {
    EN: 'Name',
    ES: 'Nombre',
    AR: 'الاسم'
  },
  phone: {
    EN: 'Phone number',
    ES: 'Número de teléfono',
    AR: 'رقم الهاتف'
  },
  message: {
    EN: 'Tell us how we can help you',
    ES: 'Díganos cómo podemos ayudarte',
    AR: 'قل لنا كيف يمكننا مساعدتك'
  },
  always_available: {
    EN: 'We Are Always Available',
    ES: 'Siempre Estamos Disponibles',
    AR: 'نحن متاحون دائمًا'
  },
  working_hours_weekdays: {
    EN: 'Mon-Fri: From 7am to 8pm',
    ES: 'Lun-Vie: De 7am a 8pm',
    AR: 'من الإثنين إلى الجمعة: من 7 صباحًا إلى 8 مساءً'
  },
  working_hours_weekends: {
    EN: 'Sat-Sun: From 9am to 5pm',
    ES: 'Sáb-Dom: De 9am a 5pm',
    AR: 'من السبت إلى الأحد: من 9 صباحًا إلى 5 مساءً'
  },


  //buttons
  apply_now: {
    EN: 'Apply Now',
    ES: 'Aplica Ahora',
    AR: 'قدم الآن'
  },

  show_more: {
    EN: 'Show More',
    ES: 'Mostrar Más',
    AR: 'أظهر المزيد'
  },
  show_less: {
    EN: 'Show Less',
    ES: 'Mostrar Menos',
    AR: 'أظهر أقل'
  },

  book_now: {
    EN: 'Request Appointment',
    ES: 'Reserva Ahora',
    AR: 'احجز الآن'
  },

  learn_more: {
    EN: 'Learn More',
    ES: 'Aprende Más',
    AR: 'أعرف أكثر'
  },
  submit: {
    EN: 'Submit',
    ES: 'Enviar',
    AR: 'إرسال'
  },
  choose_file: {
    EN: 'Choose File',
    ES: 'Elegir Archivo',
    AR: 'اختر ملف'
  },
  find_your_nearest_location: {
    EN: 'Find Your Nearest Location',
    ES: 'Encuentra tu ubicación más cercana',
    AR: 'العثور على أقرب موقع لك'
  },



  //input fields
  first_name: {
    EN: 'First Name',
    ES: 'Nombre de Pila',
    AR: 'الاسم الاول'
  },
  last_name: {
    EN: 'Last Name',
    ES: 'Apellido',
    AR: 'الكنية'
  },
  email: {
    EN: 'Email',
    ES: 'Correo Electrónico',
    AR: 'البريد الإلكتروني'
  },
  phone_number: {
    EN: 'Phone Number',
    ES: 'Número de Teléfono',
    AR: 'رقم الهاتف'
  },
  insurance_provider: {
    EN: 'Insurance Provider',
    ES: 'Proveedor de Seguros',
    AR: 'مزود التأمين'
  },
  date_of_birth: {
    EN: 'Date of Birth',
    ES: 'Fecha de Nacimiento',
    AR: 'تاريخ الميلاد'
  },
  gender: {
    EN: 'Gender',
    ES: 'Género',
    AR: 'جنس'
  },
  member_id: {
    EN: 'Member ID',
    ES: 'Identificación de Miembro',
    AR: 'رقم العضو'
  },
  medicare_id: {
    EN: 'Medicare ID',
    ES: 'Identificación de Medicare',
    AR: 'هوية ميديكير'
  },
  medicaid_id: {
    EN: 'Medicaid ID',
    ES: 'Identificación de Medicaid',
    AR: 'هوية ميديكايد'
  },
  insurance_card_front: {
    EN: 'Insurance Card from the Front',
    ES: 'Tarjeta de Seguro Frente',
    AR: 'بطاقة التأمين من الأمام'
  },
  insurance_card_back: {
    EN: 'Insurance Card from the Back',
    ES: 'Tarjeta de Seguro Parte Posterior',
    AR: 'بطاقة التأمين من الخلف'
  },
  Male: {
    EN: 'Male',
    ES: 'Hombre',
    AR: 'ذكر'
  },
  Female: {
    EN: 'Female',
    ES: 'Mujer',
    AR: 'أنثى'
  },
  Other: {
    EN: 'Other',
    ES: 'Otro',
    AR: 'آخر'
  }
}

// Use reactive state for consistent hydration
const language = ref<Language>('EN');

// Get current language - always 'EN' during SSR to prevent hydration mismatch
const getCurrentLanguage = (): Language => {
  if (process.server) {
    return 'EN'; // Always use English during SSR
  }
  return language.value;
};

// Initialize language only on client side
// onMounted(() => {
//   if (process.client) {
//     const savedLang = localStorage.getItem('lang') as Language;
//     if (savedLang && ['EN', 'ES', 'AR'].includes(savedLang)) {
//       language.value = savedLang;
//     }
//   }
// });

function translate(phraseKey: keyof PhraseDictionary | undefined): string {
  if (!phraseKey) {
    return '';
  }
  let phraseName = phrase[phraseKey];
  if (phraseName) {
    let translatedPhrase = phraseName[getCurrentLanguage()];
    if (translatedPhrase) {
      return translatedPhrase;
    }
  }
  return phraseKey as string;
}

function transNumbers(num: number | string | undefined): string {
  if (!num) {
    return '';
  }
  if (getCurrentLanguage() === 'AR') {
    return num.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
  }
  return num.toString();
}

function lang(): string {
  return getCurrentLanguage().toLowerCase();
}

function dir(): string {
  return getCurrentLanguage() === 'AR' ? 'rtl' : 'ltr';
}

function setLanguage(newLang: Language) {
  language.value = newLang;
  if (process.client) {
    localStorage.setItem('lang', newLang);
  }
}

export { translate, lang, dir, transNumbers, setLanguage };