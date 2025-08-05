export interface District {
  name: string;
  type: 'district';
}

export interface City {
  name: string;
  type: 'city';
}

export interface Region {
  name: string;
  type: 'region';
  cities: City[];
  districts: District[];
}

export const uzbekistanLocations: Region[] = [
  {
    name: "Tashkent City",
    type: "region",
    cities: [],
    districts: [
      { name: "Bektemir", type: "district" },
      { name: "Chilonzor", type: "district" },
      { name: "Mirobod", type: "district" },
      { name: "Mirzo Ulugbek", type: "district" },
      { name: "Sergeli", type: "district" },
      { name: "Shayxontohur", type: "district" },
      { name: "Uchtepa", type: "district" },
      { name: "Yakkasaroy", type: "district" },
      { name: "Yashnobod", type: "district" },
      { name: "Yunusobod", type: "district" },
      { name: "Almazar", type: "district" },
      { name: "Olmazor", type: "district" }
    ]
  },
  {
    name: "Tashkent Region",
    type: "region",
    cities: [
      { name: "Angren", type: "city" },
      { name: "Olmaliq", type: "city" },
      { name: "Chirchiq", type: "city" },
      { name: "Nurafshon", type: "city" },
      { name: "Yangiyo'l", type: "city" },
      { name: "Bekobod", type: "city" }
    ],
    districts: [
      { name: "Bo'ka", type: "district" },
      { name: "Chinoz", type: "district" },
      { name: "Oqqo'rg'on", type: "district" },
      { name: "Ohangaron", type: "district" },
      { name: "Parkent", type: "district" },
      { name: "Piskent", type: "district" },
      { name: "Quyichirchiq", type: "district" },
      { name: "Yangiyo'l", type: "district" },
      { name: "Zangiota", type: "district" },
      { name: "Yuqorichirchiq", type: "district" },
      { name: "Bekobod", type: "district" }
    ]
  },
  {
    name: "Andijan Region",
    type: "region",
    cities: [
      { name: "Andijon", type: "city" },
      { name: "Asaka", type: "city" },
      { name: "Xonobod", type: "city" },
      { name: "Shahrixon", type: "city" }
    ],
    districts: [
      { name: "Asaka", type: "district" },
      { name: "Baliqchi", type: "district" },
      { name: "Buloqboshi", type: "district" },
      { name: "Izboskan", type: "district" },
      { name: "Jalaquduq", type: "district" },
      { name: "Marhamat", type: "district" },
      { name: "Oltinko'l", type: "district" },
      { name: "Paxtaobod", type: "district" },
      { name: "Shahrixon", type: "district" },
      { name: "Ulug'nor", type: "district" },
      { name: "Xo'jaobod", type: "district" }
    ]
  },
  {
    name: "Fergana Region",
    type: "region",
    cities: [
      { name: "Farg'ona", type: "city" },
      { name: "Marg'ilon", type: "city" },
      { name: "Qo'qon", type: "city" }
    ],
    districts: [
      { name: "Beshariq", type: "district" },
      { name: "Bog'dod", type: "district" },
      { name: "Buvayda", type: "district" },
      { name: "Dang'ara", type: "district" },
      { name: "Farg'ona", type: "district" },
      { name: "Furqat", type: "district" },
      { name: "Oltiariq", type: "district" },
      { name: "Quva", type: "district" },
      { name: "Qo'shtepa", type: "district" },
      { name: "Rishton", type: "district" },
      { name: "So'x", type: "district" },
      { name: "Toshloq", type: "district" },
      { name: "Uchko'prik", type: "district" },
      { name: "Yozyovon", type: "district" }
    ]
  },
  {
    name: "Namangan Region",
    type: "region",
    cities: [
      { name: "Namangan", type: "city" },
      { name: "Chust", type: "city" },
      { name: "Pop", type: "city" }
    ],
    districts: [
      { name: "Chortoq", type: "district" },
      { name: "Chust", type: "district" },
      { name: "Kosonsoy", type: "district" },
      { name: "Mingbuloq", type: "district" },
      { name: "Namangan", type: "district" },
      { name: "Norin", type: "district" },
      { name: "Pop", type: "district" },
      { name: "To'raqo'rg'on", type: "district" },
      { name: "Uychi", type: "district" },
      { name: "Uchkurgan", type: "district" },
      { name: "Yangiqo'rg'on", type: "district" }
    ]
  },
  {
    name: "Syrdarya Region",
    type: "region",
    cities: [
      { name: "Guliston", type: "city" },
      { name: "Yangiyer", type: "city" },
      { name: "Shirin", type: "city" }
    ],
    districts: [
      { name: "Boyovut", type: "district" },
      { name: "Guliston", type: "district" },
      { name: "Mirzaobod", type: "district" },
      { name: "Oqoltin", type: "district" },
      { name: "Sardoba", type: "district" },
      { name: "Sayxunobod", type: "district" },
      { name: "Sirdaryo", type: "district" },
      { name: "Xovos", type: "district" }
    ]
  },
  {
    name: "Jizzakh Region",
    type: "region",
    cities: [
      { name: "Jizzax", type: "city" },
      { name: "G'allaorol", type: "city" },
      { name: "Do'stlik", type: "city" }
    ],
    districts: [
      { name: "Arnasoy", type: "district" },
      { name: "Baxmal", type: "district" },
      { name: "G'allaorol", type: "district" },
      { name: "Do'stlik", type: "district" },
      { name: "Forish", type: "district" },
      { name: "Mirzacho'l", type: "district" },
      { name: "Paxtakor", type: "district" },
      { name: "Yangiobod", type: "district" },
      { name: "Zarbdor", type: "district" },
      { name: "Zomin", type: "district" },
      { name: "Sharof Rashidov", type: "district" }
    ]
  },
  {
    name: "Samarkand Region",
    type: "region",
    cities: [
      { name: "Samarkand", type: "city" },
      { name: "Kattaqo'rg'on", type: "city" }
    ],
    districts: [
      { name: "Bulung'ur", type: "district" },
      { name: "Ishtixon", type: "district" },
      { name: "Jomboy", type: "district" },
      { name: "Kattaqo'rg'on", type: "district" },
      { name: "Narpay", type: "district" },
      { name: "Nurobod", type: "district" },
      { name: "Oqdaryo", type: "district" },
      { name: "Pastdarg'om", type: "district" },
      { name: "Paxtachi", type: "district" },
      { name: "Payariq", type: "district" },
      { name: "Qo'shrabot", type: "district" },
      { name: "Samarkand", type: "district" },
      { name: "Toyloq", type: "district" },
      { name: "Urgut", type: "district" }
    ]
  },
  {
    name: "Bukhara Region",
    type: "region",
    cities: [
      { name: "Buxoro", type: "city" },
      { name: "Kogon", type: "city" }
    ],
    districts: [
      { name: "Buxoro", type: "district" },
      { name: "G'ijduvon", type: "district" },
      { name: "Jondor", type: "district" },
      { name: "Kogon", type: "district" },
      { name: "Olot", type: "district" },
      { name: "Peshku", type: "district" },
      { name: "Qorako'l", type: "district" },
      { name: "Qorovulbozor", type: "district" },
      { name: "Romitan", type: "district" },
      { name: "Shofirkon", type: "district" },
      { name: "Vobkent", type: "district" }
    ]
  },
  {
    name: "Navoi Region",
    type: "region",
    cities: [
      { name: "Navoiy", type: "city" },
      { name: "Zarafshon", type: "city" }
    ],
    districts: [
      { name: "Konimex", type: "district" },
      { name: "Karmana", type: "district" },
      { name: "Navbahor", type: "district" },
      { name: "Nurota", type: "district" },
      { name: "Xatirchi", type: "district" },
      { name: "Qiziltepa", type: "district" },
      { name: "Tomdi", type: "district" },
      { name: "Uchquduq", type: "district" }
    ]
  },
  {
    name: "Kashkadarya Region",
    type: "region",
    cities: [
      { name: "Qarshi", type: "city" },
      { name: "Shahrisabz", type: "city" }
    ],
    districts: [
      { name: "Chiroqchi", type: "district" },
      { name: "Dehqonobod", type: "district" },
      { name: "G'uzor", type: "district" },
      { name: "Kasbi", type: "district" },
      { name: "Kitob", type: "district" },
      { name: "Koson", type: "district" },
      { name: "Ko'kdala", type: "district" },
      { name: "Muborak", type: "district" },
      { name: "Nishon", type: "district" },
      { name: "Qarshi", type: "district" },
      { name: "Shahrisabz", type: "district" },
      { name: "Yakkabog'", type: "district" }
    ]
  },
  {
    name: "Surkhandarya Region",
    type: "region",
    cities: [
      { name: "Termiz", type: "city" }
    ],
    districts: [
      { name: "Angor", type: "district" },
      { name: "Bandixon", type: "district" },
      { name: "Boysun", type: "district" },
      { name: "Denov", type: "district" },
      { name: "Jarqo'rg'on", type: "district" },
      { name: "Muzrabot", type: "district" },
      { name: "Oltinsoy", type: "district" },
      { name: "Qiziriq", type: "district" },
      { name: "Sariosiyo", type: "district" },
      { name: "Sherobod", type: "district" },
      { name: "Sho'rchi", type: "district" },
      { name: "Termiz", type: "district" },
      { name: "Uzun", type: "district" }
    ]
  },
  {
    name: "Karakalpakstan Republic",
    type: "region",
    cities: [
      { name: "Nukus", type: "city" },
      { name: "Beruniy", type: "city" },
      { name: "Chimboy", type: "city" },
      { name: "Xo'jayli", type: "city" },
      { name: "To'rtko'l", type: "city" }
    ],
    districts: [
      { name: "Amudaryo", type: "district" },
      { name: "Beruniy", type: "district" },
      { name: "Chimboy", type: "district" },
      { name: "Ellikqal'a", type: "district" },
      { name: "Kegeyli", type: "district" },
      { name: "Mo'ynoq", type: "district" },
      { name: "Nukus", type: "district" },
      { name: "Qanliko'l", type: "district" },
      { name: "Qorao'zak", type: "district" },
      { name: "Qo'ng'irot", type: "district" },
      { name: "Shumanay", type: "district" },
      { name: "Taxtako'pir", type: "district" },
      { name: "To'rtko'l", type: "district" },
      { name: "Xo'jayli", type: "district" }
    ]
  },
  {
    name: "Khorezm Region",
    type: "region",
    cities: [
      { name: "Urganch", type: "city" },
      { name: "Khiva", type: "city" }
    ],
    districts: [
      { name: "Bog'ot", type: "district" },
      { name: "Gurlan", type: "district" },
      { name: "Hazorasp", type: "district" },
      { name: "Khiva", type: "district" },
      { name: "Qo'shko'pir", type: "district" },
      { name: "Shovot", type: "district" },
      { name: "Urganch", type: "district" },
      { name: "Yangibozor", type: "district" },
      { name: "Yangiariq", type: "district" }
    ]
  }
];

export const getAllLocations = () => {
  const allLocations: Array<{name: string, type: 'region' | 'city' | 'district', region?: string}> = [];
  
  uzbekistanLocations.forEach(region => {
    allLocations.push({ name: region.name, type: 'region' });
    
    region.cities.forEach(city => {
      allLocations.push({ name: city.name, type: 'city', region: region.name });
    });
    
    region.districts.forEach(district => {
      allLocations.push({ name: district.name, type: 'district', region: region.name });
    });
  });
  
  return allLocations;
};

export const searchLocations = (query: string) => {
  const allLocations = getAllLocations();
  return allLocations.filter(location => 
    location.name.toLowerCase().includes(query.toLowerCase())
  );
};