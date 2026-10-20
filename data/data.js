/*
 * Datos de la demo. Fuente: dossier del 20/10/2026 (web, carteles y publicaciones de Google).
 * Tarifas y horarios salen de imágenes: validar con el gimnasio antes de publicar.
 * Se carga como script normal (no fetch) para que la demo funcione abriendo index.html directamente.
 */
window.VULTURE = {
  site: {
    nombre: 'Vulture Fitness & Box',
    registro: 'https://vulturefitnessandbox.com/register',
    login: 'https://vulturefitnessandbox.com/login',
    reinscripcion:
      'https://docs.google.com/forms/d/e/1FAIpQLSeAFyWnjym7SPG4mGri-17syRBQX7hiKVFKMONTefHLGdA83A/viewform',
    whatsapp: 'https://api.whatsapp.com/send?phone=34621160232',
    telefono: '+34 621 160 232',
    email: 'moncada@vulturefitnessandbox.com',
    mapa: 'https://www.google.com/maps/search/?api=1&query=Vulture+Fitness+%26+Box+Carrer+de+Barcelona+23+Moncada',
    instagram: 'https://www.instagram.com/vulturefitnessandbox/',
    instagramDentro: 'https://www.instagram.com/p/DSpH0IngvhL/',
    facebook: 'https://www.facebook.com/VultureFitnessandBox',
    tiktok: 'https://www.tiktok.com/@vulturefitnessandbox',
    youtube: 'https://www.youtube.com/channel/UCSuJRFp-fIUr-YBGI1X46_w',
    // Enlaces cortos de Metricool que usa hoy el gimnasio; sustituir por el formulario directo.
    trabaja: 'https://f.mtr.cool/CJROJSHTZQ',
    imagen: 'https://f.mtr.cool/IDCEXVWXWV'
  },

  // Fotos del propio gimnasio, descargadas de su web actual (assets/img). Provisional: sustituir por originales.
  imgBase: 'assets/img/',
  img: {
    heroVillains: 'hero-villains.png',
    heroHeroes: 'hero-heroes.png',
    box: 'box.png',
    maquinas: 'maquinas.png',
    pesoLibre: 'peso-libre.png',
    cardio: 'cardio.png',
    racks: 'racks.png',
    sala: 'sala.png',
    cesped: 'cesped.png',
    gym: 'gym.png',
    gymMorado: 'gym-morado.png',
    maquinas2: 'maquinas2.png'
  },

  // ---- Tarifas vigentes desde el 24/08/2026 ----
  tarifas: {
    vigenciaDesde: '2026-08-24',
    paseDia: { villains: 10, heroes: 8 },
    periodos: [
      { id: 'mensual', label: 'Mensual', meses: 1 },
      { id: 'trimestral', label: 'Trimestral', meses: 3 },
      { id: 'semestral', label: 'Semestral', meses: 6 },
      { id: 'anual', label: 'Anual', meses: 12 }
    ],
    villains: [
      {
        id: 'open-box',
        nombre: 'Open Box',
        lema: 'A tu aire',
        incluye: ['Open Box ilimitado en horario de Open Box, sin entrenador', 'Zona fitness ilimitada', 'Clases de recovery'],
        mensual: 55,
        trimestral: { total: 157, dto: 5 },
        semestral: { total: 297, dto: 10 },
        anual: { total: 561, dto: 15 }
      },
      {
        id: '10wod-4ob',
        nombre: '10 WOD + 4 OB',
        lema: 'Frecuencia media',
        incluye: ['10 clases con coach + 4 sesiones de Open Box al mes', 'Pensada para 2–3 días por semana', 'Zona fitness ilimitada', 'Clases de recovery'],
        mensual: 65,
        trimestral: { total: 185, dto: 5 },
        semestral: { total: 351, dto: 10 },
        anual: { total: 663, dto: 15 }
      },
      {
        id: '15wod-4ob',
        nombre: '15 WOD + 4 OB',
        lema: 'Alto rendimiento',
        incluye: ['15 clases con coach + 4 sesiones de Open Box al mes', 'Pensada para 3–4 días por semana', 'Zona fitness ilimitada', 'Clases de recovery'],
        mensual: 75,
        trimestral: { total: 216, dto: 4 },
        semestral: { total: 414, dto: 8 },
        anual: { total: 792, dto: 12 }
      },
      {
        id: 'ilimitado',
        nombre: 'Ilimitado',
        lema: 'Villano sin límites',
        incluye: ['WODs y Open Box ilimitados', 'Todas las clases colectivas', 'Zona fitness ilimitada'],
        mensual: 85,
        trimestral: { total: 247, dto: 3 },
        semestral: { total: 479, dto: 6 },
        anual: { total: 918, dto: 10 }
      }
    ],
    heroes: [
      {
        id: 'vulture-senal',
        nombre: 'La Vulture Señal',
        lema: 'Solo sala',
        incluye: ['Sala fitness', 'Actividades virtuales'],
        matricula: '19,99 € con mochila de regalo (sin matrícula en trimestral, semestral y anual)',
        mensual: 31.99,
        trimestral: { total: 90, dto: 6 },
        semestral: { total: 175, dto: 8 },
        anual: { total: 330, dto: null }
      },
      {
        id: 'v-student',
        nombre: 'V-Student',
        lema: 'Hasta 25 años',
        incluye: ['Sala fitness', 'Hasta 25 años (incluidos), con acreditación'],
        matricula: '1 matrícula gratis por año escolar (sep–jun) · a confirmar',
        mensual: 31.99,
        soloMensual: true
      },
      {
        id: 'heroe-o-villano',
        nombre: '¿Héroe o Villano?',
        lema: 'Gym + 4 WOD',
        incluye: ['Sala fitness', '4 WOD al mes (1 a la semana)'],
        matricula: 'Sin matrícula',
        mensual: 45,
        trimestral: { total: 125, dto: 8 },
        semestral: { total: 240, dto: 11 },
        anual: { total: 450, dto: 17 }
      },
      {
        id: 'v-senal-actividades',
        nombre: 'V-Señal + Actividades',
        lema: 'Gym + clases',
        nueva: true,
        incluye: ['Sala fitness', 'Clases colectivas'],
        matricula: '19,99 € con mochila de regalo en mensual (sin matrícula en los demás periodos)',
        mensual: 34.99,
        trimestral: { total: 99, dto: null },
        semestral: { total: 193, dto: null },
        anual: { total: 366, dto: null }
      },
      {
        id: 'v-student-actividades',
        nombre: 'V-Student + Actividades',
        lema: 'Hasta 25 años',
        nueva: true,
        incluye: ['Sala fitness', 'Clases colectivas', 'Hasta 25 años (incluidos), con acreditación'],
        matricula: '1 matrícula gratis por año escolar (sep–jun)',
        mensual: 34.99,
        soloMensual: true
      }
    ]
  },

  // ---- Horarios temporada 26/27 ----
  horarios: {
    temporada: '26/27',
    aviso: 'Horario sujeto a ajustes de temporada. Reserva tu plaza desde la app.',
    dias: [
      { id: 'lunes', corto: 'Lun', largo: 'Lunes' },
      { id: 'martes', corto: 'Mar', largo: 'Martes' },
      { id: 'miercoles', corto: 'Mié', largo: 'Miércoles' },
      { id: 'jueves', corto: 'Jue', largo: 'Jueves' },
      { id: 'viernes', corto: 'Vie', largo: 'Viernes' },
      { id: 'sabado', corto: 'Sáb', largo: 'Sábado' },
      { id: 'domingo', corto: 'Dom', largo: 'Domingo' }
    ],
    // [hora, clase]
    heroes: {
      lunes: [['6:20','BodyBalance LM'],['7:20','BodyPump LM'],['8:15','Pilates'],['9:15','Zumba'],['10:15','BodyBalance'],['11:15','Body Vulture'],['12:15','Core Virtual'],['14:30','Fitboxing'],['15:30','Body Vulture'],['16:30','Yoga'],['17:30',"Pilates 50'"],['19:00','HIIT Funcional'],['19:30','HIIT Funcional'],['20:10','Body Vulture'],['21:10','Combat LM']],
      martes: [['6:20','BodyBalance LM'],['7:20','BodyPump LM'],['8:15','Body Tone'],['9:15','Pilates'],['10:15','Body Vulture'],['11:15','BodyBalance'],['12:15','Core Virtual'],['14:30','Body Vulture'],['15:30','Gotham Funcional'],['16:30','Pilates'],['17:30',"Glute Pump 45'"],['18:20',"Combat Vulture 40'"],['19:15','Body Vulture'],['20:15','Fitboxing'],['21:10','Fitboxing Virtual']],
      miercoles: [['6:20','BodyBalance LM'],['7:20','BodyPump LM'],['8:15','Zumba'],['9:15','Pilates'],['10:15','Body Vulture'],['11:15','Glute Pump'],['12:15','Core Virtual'],['14:30','Fitboxing'],['16:00',"Pilates 50'"],['17:00','Body Vulture'],['18:00','Pilates'],['19:00','HIIT Funcional'],['19:30','HIIT Funcional'],['20:10','Body Vulture'],['21:10','BodyBalance LM']],
      jueves: [['6:20','BodyBalance LM'],['7:20','BodyPump LM'],['8:15','Body Tone'],['9:15','GAP'],['10:15','Yoga'],['11:15','Body Vulture'],['12:15','Core Virtual'],['14:30','Body Vulture'],['15:30','Zumba'],['16:30','Body Tone'],['17:30',"GAP 45'"],['18:20',"Combat Vulture 40'"],['19:15','Body Vulture'],['20:15','Fitboxing'],['21:10','Fitboxing Virtual']],
      viernes: [['6:20','BodyBalance LM'],['7:20','BodyPump LM'],['8:15','Pilates'],['9:15','Zumba'],['10:15','BodyBalance'],['11:15','Glute Pump'],['12:15','Core Virtual'],['14:30','Fitboxing'],['15:30','Body Vulture'],['16:30','Gotham Funcional'],['17:30','Pilates'],['19:00','HIIT Funcional'],['20:10','BodyPump LM'],['21:10','Combat LM']],
      sabado: [['9:15','BodyBalance LM'],['10:15','BodyPump LM'],['11:15','Core Virtual'],['12:15','Combat LM'],['14:30','Fitboxing Virtual'],['15:30','BodyBalance LM'],['16:30','BodyPump LM']],
      domingo: [['9:15','BodyBalance LM'],['10:15','BodyPump LM'],['11:15','Core Virtual'],['12:15','Combat LM'],['14:30','Fitboxing Virtual'],['15:30','BodyBalance LM'],['16:30','BodyPump LM']]
    },
    // [hora, tipo, entrenador|null, enfoque|null]
    villains: {
      lunes: [['6:00','Open Box'],['6:30','WOD','Eros','lower / halterofilia'],['7:30','WOD','Eros','lower / halterofilia'],['8:30','WOD','Eros','lower / halterofilia'],['9:30','WOD','Eros','lower / halterofilia'],['10:30','Open Box'],['14:30','WOD','Thais','lower / halterofilia'],['15:30','HYROX','Thais'],['16:30','WOD','Thais','lower / halterofilia'],['17:30','WOD','Thais','lower / halterofilia'],['18:30','WOD','Thais','lower / halterofilia'],['19:30','WOD','Dani','lower / halterofilia'],['20:30','Open Box'],['22:00','Open Box']],
      martes: [['6:00','Open Box'],['6:30','HYROX','Eros','engine'],['7:30','HYROX','Eros','engine'],['8:30','HYROX','Eros','engine'],['9:30','HYROX','Eros','engine'],['10:30','Open Box'],['15:30','HYROX','Dani','engine'],['16:30','HYROX','Thais','engine'],['17:30','HYROX','Thais','engine'],['18:30','HYROX','Thais','engine'],['19:30','HYROX','Thais','engine'],['20:30','HYROX','Dani','engine'],['22:00','Open Box']],
      miercoles: [['6:00','Open Box'],['6:30','WOD','Eros','upper / gimnásticos'],['7:30','WOD','Eros','upper / gimnásticos'],['8:30','WOD','Eros','upper / gimnásticos'],['9:30','WOD','Eros','upper / gimnásticos'],['10:30','Open Box'],['14:30','WOD','Thais','upper / gimnásticos'],['15:30','HYROX','Thais'],['16:30','WOD','Thais','upper / gimnásticos'],['17:30','CrossKids','Thais'],['18:30','WOD','Dani','upper / gimnásticos'],['19:30','WOD','Dani','upper / gimnásticos'],['20:30','Open Box'],['22:00','Open Box']],
      jueves: [['6:00','Open Box'],['6:30','WOD','Eros','haltero / fullbody'],['7:30','WOD','Eros','haltero / fullbody'],['8:30','WOD','Eros','haltero / fullbody'],['9:30','WOD','Eros','haltero / fullbody'],['10:30','Open Box'],['15:30','HYROX','Dani'],['16:30','WOD','Dani','haltero / fullbody'],['17:30','WOD','Dani','haltero / fullbody'],['18:30','WOD','Dani','haltero / fullbody'],['19:30','WOD','Dani','haltero / fullbody'],['20:30','Open Box'],['22:00','Open Box']],
      viernes: [['6:00','Open Box'],['6:30','HYROX','Eros','power strength'],['7:30','HYROX','Eros','power strength'],['8:30','HYROX','Eros','power strength'],['9:30','HYROX','Eros','power strength'],['10:30','Open Box'],['15:30','HYROX','Dani','power strength'],['16:30','HYROX','Dani','power strength'],['17:30','CrossKids','Dani'],['18:30','HYROX','Dani','power strength'],['19:30','HYROX','Dani','power strength'],['20:30','Open Box'],['22:00','Open Box']],
      sabado: [['9:30','MEGA WOD',null,'sesión especial · aprox. 90 minutos'],['10:30','Open Box',null,'entrenamiento libre']],
      domingo: [['9:30','Open Box',null,'entrenamiento libre']]
    },
    // Franjas de Open Box seguido que el cartel dibuja como un bloque
    openBoxNota: 'Entre sesiones con coach, el box está en Open Box (entrenamiento libre). El cartel no indica la hora de fin del Open Box de fin de semana.'
  },

  // ---- Actividades (publicaciones de Google del 20/08/2026, resumidas) ----
  programas: [
    { nombre: 'Hyrox Engine', texto: 'Resistencia cardiovascular: ergómetros (remo, ski, bici), burpees y carrera.', nivel: 'Principiante' },
    { nombre: 'Hyrox Strength', texto: 'Fuerza funcional: trineo, paseo del granjero, peso muerto y zancadas.', nivel: 'Principiante' },
    { nombre: 'Cross Strength', texto: 'Fuerza básica aplicada al Cross: sentadilla, peso muerto y press.', nivel: 'Media' },
    { nombre: 'Cross Weightlifting', texto: 'Halterofilia olímpica: arrancada, cargada y envión.', nivel: 'Avanzada' },
    { nombre: 'Upper Gymnastics Strength', texto: 'Fuerza de tren superior con calistenia: dominadas, flexiones, cuerda.', nivel: 'Avanzada' }
  ],
  clases: [
    { nombre: 'Fitboxing', texto: 'Boxeo y Muay Thai al saco. Guantes obligatorios.', nivel: 'Medio' },
    { nombre: 'Combat Vulture', texto: 'Cardio de golpeo al aire, sin contacto.', nivel: 'Principiante' },
    { nombre: 'GAP', texto: 'Glúteos, abdomen y piernas.', nivel: 'Principiante' },
    { nombre: 'Glute Pump', texto: 'Trabajo exclusivo de glúteo.', nivel: 'Intermedio' },
    { nombre: 'Gotham Funcional', texto: 'Entreno exprés con pesas y ergómetros. Paso previo a Villanos.', nivel: 'Iniciación' },
    { nombre: 'Body Vulture', texto: 'Levantamiento con barra y discos, en grupo.', nivel: 'Medio' },
    { nombre: 'HIIT Funcional', texto: 'Circuitos por intervalos de alta intensidad.', nivel: 'Avanzado' },
    { nombre: 'Body Tone', texto: 'Tonificación global suave, sin cargas excesivas.', nivel: 'Moderado' },
    { nombre: 'Pilates', texto: 'Colchoneta, postura y core.', nivel: 'Todos' },
    { nombre: 'Yoga', texto: 'Asanas, respiración y meditación.', nivel: 'Todos' },
    { nombre: 'Zumba', texto: 'Baile fitness con ritmos latinos.', nivel: 'Principiante' },
    { nombre: 'Core Virtual', texto: 'Abdomen y zona lumbar, emitida por la app.', nivel: 'Adaptable' }
  ]
};
