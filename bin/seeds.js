const mongoose = require('mongoose');
const Plan = require('../models/plan.model');

require('../configs/db.configs');

const plans = [{
  title: 'La Gatoteca, casa de acogida para gatos, con acceso libre',
  description: 'Acércate a la Gatoteca para conocer a sus habitantes, descubrir todas las actividades que ofrecen y, quién sabe, tal vez surja una relación muy especial con alguno de los gatos… ¿Puede haber algo mejor que la compañía y el cariño de una mascota durmiendo junto a ti en el sofá?',
  imgUrl: 'https://lh3.googleusercontent.com/proxy/GA3cv0n0UgZe2fyughVJizZZQ7Nh_FnTWkeSCiXKbZLdU45bj7MnTL51yMHBviCspO6LKWhMguNmIu-jBp-Lb-dJ6T7EcVMqwFq0D1_1IbZrgMiKFjqFklsHKQYfImTECZ8uM3LwtqxUj4CXyyxy1oPSZ1ufsBIN6Ee_O2LOw4Z4qZ11R5dGdkg9yubsD2l8IPEeCZamaw7D3Sv7zIoIpTbpOZmqE8NwRSrwksYREN1dfEn7C9UDtMiHJYEiVuWPftG3TPiI8Y379sC6k7zEpSF6EvkCNQEuk8S_LVTnxtJwxD6njJzKYiaL7ZREQA9-oucUfVcmVX3sXmEfpSaZ3CE=w1200-h630-p-k-no-nu',
  createdBy: '5a8aff61c7dab70d8cf7c666',
  sunny: false,
  price: 10,
  // duration: 2,
  // days: [true, true, true, true, true, false, false],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  startTime: 12,
  endTime: 15,
  latPosition: 40.407408,
  lngPosition: -3.696279,
  // endPosition: '{40.407408,-3.696279}'
},{
  title: 'Salt Room: Vacuna Natural para los catarros',
  description: 'Aubicado en la zona de Argüelles, en un edificio protegido por la antigüedad y belleza de su fachada, se encuentra este espacio inspirado en las cuevas de sal de Polonia, donde tuvo origen el tratamiento de la haloterapia, basado en la ausencia de problemas respiratorios de los mineros que trabajaban en las minas de sal de Wieliczka, lo que llevó a médicos e investigadores a la conclusión de que el beneficio provenía del ambiente salino que respiraban los mineros.',
  imgUrl: 'http://www.saltroommadrid.com/images/sala01.jpg',
  createdBy: '5a8aff61c7dab70d8cf7c666',
  sunny: false,
  price: 22,
  // duration: 1,
  // days: [true, true, true, true, true, true, false],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  startTime: 10,
  endTime: 13,
  latPosition: 40.435277,
  lngPosition: -3.710721,
  // endPosition: '{40.435277,-3.710721}'
},{
  title: 'Copas por malasaña',
  description: 'La Vía Láctea es otro de los históricos de la zona. En su día fue un templo de la modernidad y hoy todavía tiene días de grandes llenos. Abre todos los días a las 20h, en el 18 de Velarde.  El Diplodocus, en el 31 de Manuela Malasaña, se llenaba hasta la bandera en los años 80. El último día que pasamos por allí seguía ofreciendo su Leche de Brontosaurio.  El Palentino lleva mucho tiempo en el barrio, en el 12 de Pez. Pero en marzo de 2017 se popularizó aún más por ser el escenario de la película El Bar, de Alex de la Iglesia..',
  imgUrl: 'http://3.bp.blogspot.com/-3IS8Zzzphic/UVIsPYlDlsI/AAAAAAAAAFU/Stm_KzyrQjE/s1600/plaza_dos_de_mayo.jpg',
  createdBy: '5a8aff61c7dab70d8cf7c666',
  sunny: false,
  price: 3,
  // duration: 1,
  // days: [true, true, true, true, true, true, true],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  startTime: 19,
  endTime: 22,
  latPosition: 40.427777,
  lngPosition: -3.701890,
  // endPosition: '{40.420238,-3.703017}'
}, {
  title: 'El Rey León el musical',
  description: 'Gracias al genio, visión artística y creativa de su directora, Julie Taymor, el género musical da un paso adelante. Con su sorprendente y colorida puesta en escena, EL REY LEÓN transporta al espectador al exotismo africano, con evocadoras músicas, constituyendo un nuevo hito en el mundo del espectáculo, un punto de inflexión en el diseño artístico, y en general, en el género musical, que a nadie deja indiferente. Un genial equipo creativo para un musical inolvidable.',
  imgUrl: 'http://www.elcorreoextremadura.com/imagenes/noticias_regionales/noticia_27077.jpg',
  createdBy: '5a8aff61c7dab70d8cf7c666',
  sunny: false,
  price: 44,
  // duration: 2,
  // days: [false, true, true, true, true, true, true],
  days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  startTime: 18,
  endTime: 21,
  latPosition: 40.421549,
  lngPosition: -3.7089918,
  // endPosition: '{40.421549,-3.7089918}'
}, {
  title: 'Entrada a la excursión por el estadio Santiago Bernabéu',
  description: 'Visite el Estadio Santiago Bernabéu en Madrid con una entrada, y explore el emblemático estadio del club de fútbol Real Madrid a su propio ritmo. Dentro del estadio no se puede perder el palco presidencial, la sala de trofeos y el túnel de los vestuarios donde los jugadores caminan victoriosos o agachan la cabeza de vergüenza. Conozca la historia del estadio y el club en las grandes pantallas junto al terreno de juego y en las exhibiciones ',
  imgUrl: 'https://images.musement.com/default/0001/24/bernabeu-stadium-tickets-and-tour_header-23614.jpeg?w=600&h=315&crop=edges',
  createdBy: '5a8aff61c7dab70d8cf7c666',
  sunny: true,
  price: 25,
  // duration: 1,
  // days: [true, true, true, true, true, true, true],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  startTime: 8,
  endTime: 10,
  latPosition: 40.4523663,
  lngPosition: -3.6897446,
  // endPosition: '{40.4523663,-3.6897446}'
}, {
  title: 'Madrid Wax Museum Admission Ticket',
  description: 'The Wax Museum is located in the center of Madrid, in what is called the golden mile of museums, since nearby is placed the Archeological Museum, and following the Paseo del Prado, we find the Prado Museum, the Thyssen Museum or Reina Sofia Museum. ',
  imgUrl: 'https://ep01.epimg.net/verne/imagenes/2015/03/05/articulo/1425549987_841133_1425571033_noticia_normal.jpg',
  createdBy: '5a8aff61c7dab70d8cf7c666',
  sunny: false,
  price: 19,
  // duration: 1,
  // days: [true, true, true, true, true, true, false],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  startTime: 15,
  endTime: 17,
  latPosition: 40.4249622,
  lngPosition: -3.6935239,
  // endPosition: '{40.4249622,-3.6935239}'
}, {
  title: 'VIP de Viator: Acceso a primera hora al Museo del Prado con el Museo Reina Sofía al final',
  description: 'Disfrute del Museo del Prado antes de que se abran las puertas al público en este tour de 4 horas en Madrid, una oferta VIP de Viator que no está disponible en ningún otro lugar. La exclusiva experiencia, que solo está disponible a través de Viator, le ofrece acceso al museo antes de su apertura oficial, por lo que podrá ver obras como Las Meninas de Velázquez y La Anunciación de El Greco sin multitudes. Aprenda sobre las obras gracias a su guía, y luego diríjase al Museo Reina Sofía para admirar obras abstractas y surrealistas de Picasso, Dalí y muchos más. Si desea un tour privado o para grupos pequeños, elija la opción superior cuando haga su reserva.',
  imgUrl: 'https://cdn.20m.es/img2/recortes/2017/04/03/451899-944-550.jpg',
  createdBy: '5a8aff61c7dab70d8cf7c666',
  sunny: false,
  price: 1300,
  // duration: 6,
  // days: [true, true, true, true, true, true, false],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  startTime: 7,
  endTime: 10,
  latPosition: 40.4137859,
  lngPosition: -3.6943158,
  // endPosition: '{40.4079164,-3.6967456}'
}, {
  title: 'Kapital: Party all night long',
  description: 'En el centro de Madrid, una de las salas mas emblematicas de Europa. En una ubicacion realmente privilegiada, situada en el triangulo del arte entre el museo Thyssen Bornemisa, el museo del Prado y el museo de arte contemporaneo Reina Sofia. Con 7 plantas independientes, la propuesta de Teatro Kapital permite ofrecer diferentes tipos de musica, espacios, decoraciones y esteticas ... siempre en un marco elegante y exclusivo, cualidades que ya son parte de la tradicion de la sala: ',
  imgUrl: 'http://www.grupo-kapital.com/kapital/v4_imagenes/cuerpo_info_r1_c1.jpg',
  createdBy: '5a8aff61c7dab70d8cf7c666',
  sunny: false,
  price: 18,
  // duration: 1,
  // days: [true, true, true, true, true, true, true],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  startTime: 2,
  endTime: 6,
  latPosition: 40.409776,
  lngPosition: -3.6931638,
  // endPosition: '{40.409776,-3.6931638}'
}, {
  title: 'De churros por la mañana',
  description: 'En el centro de Madrid, En una ubicacion realmente privilegiada, situada al lado de la plaza Mayor se encuentra la chocolatería san gines, pidete unos churros despues de una noche de fiesta.',
  imgUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/10/2f/ac/f8/chocolate-con-churros.jpg',
  createdBy: '5a8aff61c7dab70d8cf7c666',
  sunny: false,
  price: 10,
  // duration: 1,
  // days: [true, true, true, true, true, true, true],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  startTime: 5,
  endTime: 7,
  latPosition: 40.409776,
  lngPosition: -3.6931638,
  // endPosition: '{40.409776,-3.6931638}'
}, {
  title: 'De fiesta hasta morir',
  description: 'Eres un marchoso que no consigue morir? Con esta ruta podrás salir por todas las discotecas mas emblematicas de madrid hasta las 12am del dia siguiente',
  imgUrl: 'http://www.electrowow.net/wp-content/uploads/2012/11/Viral-Video-Of-Techno-Party-From-1997-Surfaces-On-Internet.jpg',
  createdBy: '5a8aff61c7dab70d8cf7c666',
  sunny: false,
  price: 150,
  // duration: 2,
  // days: [true, true, true, true, true, true, true],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  startTime: 1,
  endTime: 13,
  latPosition: 40.409776,
  lngPosition: -3.6931638,
  // endPosition: '{40.409776,-3.6931638}'
}, {
  title: 'DMadrid de los Austrias de noche',
  description: 'Vea lo bonito de madrid por la oche hasta el amanecer',
  imgUrl: 'https://invictursblog.files.wordpress.com/2014/03/madrid-de-noche.gif',
  createdBy: '5a8aff61c7dab70d8cf7c666',
  sunny: true,
  price: 5,
  // duration: 1,
  // days: [true, true, true, true, true, true, true],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  startTime: 2,
  endTime: 5,
  latPosition: 40.409776,
  lngPosition: -3.6931638,
  // endPosition: '{40.409776,-3.6931638}'
}, {
  title: 'Monologos en la chocita del Loro',
  description: 'En La Chocita del Loro desde 1998 nos dimos cuenta que cuando una persona ríe porque está alegre genera unas sustancias beneficiosas para su organismo. La risa es un privilegio del ser humano, ningún otro animal,que no tenga dinero en el bolsillo se ríe. El reír produce un enorme bienestar a las personas. Sigmund Freud afirmaba que la risa-sobre todo la carcajada- ayuda a liberar la energía negativa. ',
  imgUrl: 'http://www.lachocitadelloro.com/img/chocitas/img_gran_via.jpg',
  createdBy: '5a8aff61c7dab70d8cf7c666',
  sunny: true,
  price: 15,
  // duration: 1,
  // days: [true, true, true, true, true, true, true],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  startTime: 21,
  endTime: 23,
  latPosition: 40.409776,
  lngPosition: -3.6931638,
  // endPosition: '{40.409776,-3.6931638}'
}, {
  title: 'Next Level Arcade Bar, una auténtica sala de recreativos en pleno Centro',
  description: 'Si eres de los que pasaste tu infancia y parte de tu adolescencia en una sala de recreativos, esto te va a interesar. Hace años que este tipo de salas desaparecieron de nuestro país y, aunque aún es posible encontrar algunos vestigios en contados locales, lo cierto es que el espíritu que rodeaba a estas salas se fue con ellas. ',
  imgUrl: 'http://2.bp.blogspot.com/-U8LV7qXwc8A/VWQ5-0JATWI/AAAAAAAAJ_Q/CmnxbW1wGOw/s1600/Headquarters-600.jpg',
  createdBy: '5a8aff61c7dab70d8cf7c666',
  sunny: true,
  price: 3,
  // duration: 1,
  // days: [true, true, true, true, true, true, true],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  startTime: 18,
  endTime: 21,
  latPosition: 40.409776,
  lngPosition: -3.6931638,
  // endPosition: '{40.409776,-3.6931638}'
}];


Plan.create(plans, (err, docs) => {
  if (err) {
    throw err;
  };
  docs.forEach((plan) => {
    console.log(plan.title);
  });
  mongoose.connection.close();
});