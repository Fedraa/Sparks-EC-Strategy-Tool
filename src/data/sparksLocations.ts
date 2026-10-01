export interface SparksCenterLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  city: string;
  description: string;
}

export interface MapPoiItem {
  id: string;
  name: string;
  categoryId: number;
  categoryName: string;
  subType: string;
  lat: number;
  lng: number;
  distanceKm: number;
  address: string;
  estimatedWeeklyFootfall: number;
  crowdPeakDay: string;
  densityLevel: 'Very High' | 'High' | 'Medium';
  recommendedTactic: string;
  contactPerson?: string;
  contactPhone?: string;
  notes?: string;
}

export const PRESET_SPARKS_CENTERS: SparksCenterLocation[] = [
  {
    id: 'sparks-alam-sutera',
    name: 'Sparks Center — Alam Sutera',
    address: 'Jl. Jalur Sutera Barat No. 16, Alam Sutera, Tangerang',
    lat: -6.2291778,
    lng: 106.633914,
    city: 'Tangerang',
    description: 'Flagship Early Childhood Center in high-density family corridor.',
  },
  {
    id: 'sparks-bsd',
    name: 'Sparks Center — The Breeze BSD',
    address: 'The Breeze BSD City, Unit L-28, BSD Green Office Park, Tangerang Selatan',
    lat: -6.3015,
    lng: 106.6534,
    city: 'Tangerang Selatan',
    description: 'Surrounded by top international schools and modern residential clusters.',
  },
  {
    id: 'sparks-kelapa-gading',
    name: 'Sparks Center — Mall Kelapa Gading',
    address: 'Mall Kelapa Gading 3, Level 2, Jl. Boulevard Raya, Jakarta Utara',
    lat: -6.1585,
    lng: 106.9088,
    city: 'Jakarta Utara',
    description: 'High-density commercial family hub with premier Christian and public schools.',
  },
  {
    id: 'sparks-pondok-indah',
    name: 'Sparks Center — Pondok Indah',
    address: 'Jl. Metro Pondok Indah Blok III-B, Kebayoran Lama, Jakarta Selatan',
    lat: -6.2657,
    lng: 106.7842,
    city: 'Jakarta Selatan',
    description: 'Affluent residential catchment with leading mom communities and pediatric centers.',
  },
  {
    id: 'sparks-pakuwon-surabaya',
    name: 'Sparks Center — Pakuwon Mall Surabaya',
    address: 'Pakuwon Mall Level 2, Jl. Mayjend Jonosewojo No. 2, Surabaya Barat',
    lat: -7.2889,
    lng: 112.6756,
    city: 'Surabaya',
    description: 'Major family weekend destination in West Surabaya.',
  },
];

// Seeded sample POIs within 5-7 km radius of Alam Sutera / BSD (-6.2291, 106.6339)
export const SAMPLE_POIS_ALAM_SUTERA: Omit<MapPoiItem, 'distanceKm'>[] = [
  // 1. Kids Activity & Enrichment
  {
    id: 'poi-1',
    name: 'Kumon Ruko Jalur Sutera',
    categoryId: 1,
    categoryName: 'Kids Activity & Enrichment',
    subType: 'Kumon Center',
    lat: -6.2245,
    lng: 106.6385,
    address: 'Ruko Jalur Sutera 29A No. 12, Alam Sutera',
    estimatedWeeklyFootfall: 350,
    crowdPeakDay: 'Thu',
    densityLevel: 'Very High',
    recommendedTactic: 'Standee QR voucher di ruang tunggu + barter brosur',
    contactPerson: 'Ibu Ratna (Director)',
    contactPhone: '0812-9876-1122',
  },
  {
    id: 'poi-2',
    name: 'Yamaha Music School Alam Sutera',
    categoryId: 1,
    categoryName: 'Kids Activity & Enrichment',
    subType: 'Music Class',
    lat: -6.2268,
    lng: 106.6452,
    address: 'Living World Alam Sutera Lt. 2',
    estimatedWeeklyFootfall: 420,
    crowdPeakDay: 'Sat',
    densityLevel: 'Very High',
    recommendedTactic: 'Voucher exclusive Sparks trial untuk murid junior music',
    contactPerson: 'Ms. Cindy',
    contactPhone: '0813-8899-2233',
  },
  {
    id: 'poi-3',
    name: 'Marlupi Dance Academy Serpong',
    categoryId: 1,
    categoryName: 'Kids Activity & Enrichment',
    subType: 'Ballet & Dance',
    lat: -6.2412,
    lng: 106.6285,
    address: 'Ruko Gading Serpong Blok AA3',
    estimatedWeeklyFootfall: 280,
    crowdPeakDay: 'Sat',
    densityLevel: 'High',
    recommendedTactic: 'Flyer drop saat jam pergantian kelas balet balita',
    contactPerson: 'Ibu Maya',
    contactPhone: '0815-4433-2211',
  },
  {
    id: 'poi-4',
    name: 'Robologee Kids Coding Center',
    categoryId: 1,
    categoryName: 'Kids Activity & Enrichment',
    subType: 'Coding & Robotics Class',
    lat: -6.2355,
    lng: 106.6312,
    address: 'Ruko Boulevard Gading Serpong M5/12',
    estimatedWeeklyFootfall: 190,
    crowdPeakDay: 'Wed',
    densityLevel: 'Medium',
    recommendedTactic: 'Joint STEM workshop Sparks Sensory x Robologee',
    contactPerson: 'Bpk. Kevin',
    contactPhone: '0811-9988-7766',
  },

  // 2. Preschool / Daycare
  {
    id: 'poi-5',
    name: 'Kinderfield Preschool Alam Sutera',
    categoryId: 2,
    categoryName: 'Preschool / Daycare',
    subType: 'Preschool & Kindergarten',
    lat: -6.2185,
    lng: 106.6421,
    address: 'Jl. Sutera Utama No. 8, Alam Sutera',
    estimatedWeeklyFootfall: 310,
    crowdPeakDay: 'Mon',
    densityLevel: 'Very High',
    recommendedTactic: 'Flyering saat dismissal pickup pukul 11:30 - 13:00 + Paket Field Trip',
    contactPerson: 'Ms. Clara (Academic Head)',
    contactPhone: '0812-5544-3322',
  },
  {
    id: 'poi-6',
    name: 'Tumble Tots & Daycare Gading Serpong',
    categoryId: 2,
    categoryName: 'Preschool / Daycare',
    subType: 'Daycare & Playgroup',
    lat: -6.2485,
    lng: 106.6255,
    address: 'Ruko Sentra Gading Serpong Blok SG1',
    estimatedWeeklyFootfall: 240,
    crowdPeakDay: 'Tue',
    densityLevel: 'High',
    recommendedTactic: 'Program weekend pass khusus anak daycare',
    contactPerson: 'Bunda Lilis',
    contactPhone: '0817-2233-4455',
  },
  {
    id: 'poi-7',
    name: 'Montessori Haus Alam Sutera',
    categoryId: 2,
    categoryName: 'Preschool / Daycare',
    subType: 'Montessori Playgroup',
    lat: -6.2231,
    lng: 106.6512,
    address: 'Cluster Sutera Narada No. 15',
    estimatedWeeklyFootfall: 180,
    crowdPeakDay: 'Thu',
    densityLevel: 'Medium',
    recommendedTactic: 'Sponsorship goodie bag perayaan graduation preschool',
    contactPerson: 'Ms. Fiona',
    contactPhone: '0818-7766-5544',
  },

  // 3. Kids Play & Family Entertainment
  {
    id: 'poi-8',
    name: 'Playtopia Living World Alam Sutera',
    categoryId: 3,
    categoryName: 'Kids Play & Family Entertainment',
    subType: 'Indoor Playground',
    lat: -6.2265,
    lng: 106.6455,
    address: 'Living World Mall Lt. 3',
    estimatedWeeklyFootfall: 1600,
    crowdPeakDay: 'Sun',
    densityLevel: 'Very High',
    recommendedTactic: 'Voucher potongan Sparks diselipkan pada tiket gelang masuk playground',
    contactPerson: 'Bpk. Dimas (SPV)',
    contactPhone: '0813-1122-3344',
  },
  {
    id: 'poi-9',
    name: 'Miniapolis Mall @ Alam Sutera',
    categoryId: 3,
    categoryName: 'Kids Play & Family Entertainment',
    subType: 'Family Entertainment Center',
    lat: -6.2215,
    lng: 106.6542,
    address: 'Mall @ Alam Sutera Lantai 2',
    estimatedWeeklyFootfall: 1250,
    crowdPeakDay: 'Sat',
    densityLevel: 'Very High',
    recommendedTactic: 'Pop-up booth sensory craft pada jam ramai Sabtu sore',
    contactPerson: 'Ibu Ratih',
    contactPhone: '0812-4455-6677',
  },
  {
    id: 'poi-10',
    name: 'Bounce Street Trampoline Park',
    categoryId: 3,
    categoryName: 'Kids Play & Family Entertainment',
    subType: 'Trampoline Park',
    lat: -6.2585,
    lng: 106.6212,
    address: 'Gading Serpong Commercial Park',
    estimatedWeeklyFootfall: 950,
    crowdPeakDay: 'Sun',
    densityLevel: 'High',
    recommendedTactic: 'Cross-promo reward stamp card motorik anak',
    contactPerson: 'Bpk. Andre',
    contactPhone: '0815-9988-1122',
  },

  // 4. Parenting Communities
  {
    id: 'poi-11',
    name: 'Mommy & Toddler Playdate Serpong',
    categoryId: 4,
    categoryName: 'Parenting Communities',
    subType: 'Mom Community (500+ Members)',
    lat: -6.2312,
    lng: 106.6398,
    address: 'Basecamp: Sutera Flamboyan & Online WA Group',
    estimatedWeeklyFootfall: 520,
    crowdPeakDay: 'Wed',
    densityLevel: 'Very High',
    recommendedTactic: 'Host VIP playdate gratis di Sparks Center khusus admin & member aktif',
    contactPerson: 'Bunda Jessica',
    contactPhone: '0818-4455-6677',
  },
  {
    id: 'poi-12',
    name: 'Tangerang Young Parents Club',
    categoryId: 4,
    categoryName: 'Parenting Communities',
    subType: 'Baby & Toddler Community',
    lat: -6.2155,
    lng: 106.6485,
    address: 'Alam Sutera Hub / Digital Network',
    estimatedWeeklyFootfall: 380,
    crowdPeakDay: 'Sat',
    densityLevel: 'High',
    recommendedTactic: 'Sponsorship workshop parenting dengan psikolog anak di Sparks EC',
    contactPerson: 'Mama Sheila',
    contactPhone: '0812-3344-5566',
  },

  // 5. Maternity & Baby Stores
  {
    id: 'poi-13',
    name: 'Mothercare Living World',
    categoryId: 5,
    categoryName: 'Maternity & Baby Stores',
    subType: 'Mothercare-type Store',
    lat: -6.2262,
    lng: 106.6459,
    address: 'Living World Alam Sutera Lt. 1',
    estimatedWeeklyFootfall: 850,
    crowdPeakDay: 'Sun',
    densityLevel: 'Very High',
    recommendedTactic: 'Bag-inserting kartu voucher Sparks untuk belanja > Rp 400.000',
    contactPerson: 'Ibu Linda (Store Head)',
    contactPhone: '0811-3322-1144',
  },
  {
    id: 'poi-14',
    name: 'Birds & Bees Baby Shop Alam Sutera',
    categoryId: 5,
    categoryName: 'Maternity & Baby Stores',
    subType: 'Baby & Kids Store',
    lat: -6.2285,
    lng: 106.6375,
    address: 'Ruko Jalur Sutera Timur No. 5B',
    estimatedWeeklyFootfall: 450,
    crowdPeakDay: 'Sat',
    densityLevel: 'High',
    recommendedTactic: 'Akrilik standee QR Free Sparks Welcome Pass di samping mesin kasir',
    contactPerson: 'Bpk. Yudi',
    contactPhone: '0813-7788-9900',
  },

  // 6. Pediatric / Family Healthcare
  {
    id: 'poi-15',
    name: 'RSIA Bina Medika Bintaro - Klinik Satelit Alam Sutera',
    categoryId: 6,
    categoryName: 'Pediatric / Family Healthcare',
    subType: 'Pediatric Clinic',
    lat: -6.2345,
    lng: 106.6412,
    address: 'Ruko Sutera Niaga 1 No. 8',
    estimatedWeeklyFootfall: 480,
    crowdPeakDay: 'Mon',
    densityLevel: 'Very High',
    recommendedTactic: 'Kartu "Anak Pemberani Vaksin" dengan reward 1x Free Sparks Sensory Session',
    contactPerson: 'dr. Anita, Sp.A & Bpk. Hendra',
    contactPhone: '0812-7788-9911',
  },
  {
    id: 'poi-16',
    name: 'Pusat Tumbuh Kembang & Sensori Anak Mandiri',
    categoryId: 6,
    categoryName: 'Pediatric / Family Healthcare',
    subType: 'Child Development Clinic',
    lat: -6.2455,
    lng: 106.6322,
    address: 'Ruko Crystal Gading Serpong',
    estimatedWeeklyFootfall: 220,
    crowdPeakDay: 'Wed',
    densityLevel: 'High',
    recommendedTactic: 'Rujukan stimulasi sensori terapis ke kelas Sparks EC',
    contactPerson: 'Ibu Sari (Koordinator Terapi)',
    contactPhone: '0815-6677-8899',
  },

  // 7. Family F&B
  {
    id: 'poi-17',
    name: 'Pancake Co & Kids Lounge Alam Sutera',
    categoryId: 7,
    categoryName: 'Family F&B',
    subType: 'Kids-friendly Restaurant',
    lat: -6.2255,
    lng: 106.6435,
    address: 'Flavor Bliss Alam Sutera',
    estimatedWeeklyFootfall: 1100,
    crowdPeakDay: 'Sun',
    densityLevel: 'Very High',
    recommendedTactic: 'Sponsorship kertas alas meja mewarnai anak (kids coloring placemat A3)',
    contactPerson: 'Bpk. Fajar',
    contactPhone: '0815-6677-2233',
  },
  {
    id: 'poi-18',
    name: 'Kopi & Mom Hangout Space dekat Sekolah',
    categoryId: 7,
    categoryName: 'Family F&B',
    subType: 'Café near Schools',
    lat: -6.2198,
    lng: 106.6432,
    address: 'Ruko Sutera Renata No. 3',
    estimatedWeeklyFootfall: 580,
    crowdPeakDay: 'Tue',
    densityLevel: 'High',
    recommendedTactic: 'Tent card di meja promosi "Free Coffee while your child is in Sparks Trial"',
    contactPerson: 'Kak Reno',
    contactPhone: '0819-0011-2233',
  },

  // 8. Residential Communities
  {
    id: 'poi-19',
    name: 'Cluster Sutera Narada Alam Sutera',
    categoryId: 8,
    categoryName: 'Residential Communities',
    subType: 'Gated Residential Cluster',
    lat: -6.2225,
    lng: 106.6505,
    address: 'Kawasan Sutera Narada (450 KK Keluarga Muda)',
    estimatedWeeklyFootfall: 750,
    crowdPeakDay: 'Sun',
    densityLevel: 'Very High',
    recommendedTactic: 'Mini sensory pop-up station di clubhouse saat Car Free Day cluster',
    contactPerson: 'Bpk. Irwan (Ketua Paguyuban)',
    contactPhone: '0819-2233-4455',
  },
  {
    id: 'poi-20',
    name: 'Cluster Sutera Victoria',
    categoryId: 8,
    categoryName: 'Residential Communities',
    subType: 'Residential Estate',
    lat: -6.2315,
    lng: 106.6465,
    address: 'Kawasan Sutera Victoria',
    estimatedWeeklyFootfall: 620,
    crowdPeakDay: 'Sat',
    densityLevel: 'High',
    recommendedTactic: 'Direct mail voucher khusus warga "Tetangga Dekat Sparks EC"',
    contactPerson: 'Pengurus RT/RW 08',
    contactPhone: '0811-4455-6677',
  },
  {
    id: 'poi-21',
    name: 'Apartemen Saumata & Paddington Alam Sutera',
    categoryId: 8,
    categoryName: 'Residential Communities',
    subType: 'Condo / Apartment with Young Families',
    lat: -6.2275,
    lng: 106.6345,
    address: 'Jl. Lingkar Barat, Alam Sutera',
    estimatedWeeklyFootfall: 890,
    crowdPeakDay: 'Sat',
    densityLevel: 'Very High',
    recommendedTactic: 'Notice board poster di lift lobby & penawaran paket antar jemput',
    contactPerson: 'Tenant Relation Saumata',
    contactPhone: '0812-8877-6655',
  },

  // 9. Malls & Family Hubs
  {
    id: 'poi-22',
    name: 'Mall @ Alam Sutera',
    categoryId: 9,
    categoryName: 'Malls & Family Hubs',
    subType: 'Mall with Kids Area',
    lat: -6.2212,
    lng: 106.6545,
    address: 'Jl. Jalur Sutera Barat Kav. 16',
    estimatedWeeklyFootfall: 3500,
    crowdPeakDay: 'Sun',
    densityLevel: 'Very High',
    recommendedTactic: 'Mall loyalty points redemption untuk Free Sparks Trial Pass',
    contactPerson: 'Marcomm Mall Dept',
    contactPhone: '021-3044-xxxx',
  },
  {
    id: 'poi-23',
    name: 'Living World Alam Sutera',
    categoryId: 9,
    categoryName: 'Malls & Family Hubs',
    subType: 'Family Hub & Weekend Events',
    lat: -6.2265,
    lng: 106.6455,
    address: 'Jl. Alam Sutera Boulevard Kav. 21',
    estimatedWeeklyFootfall: 4200,
    crowdPeakDay: 'Sat',
    densityLevel: 'Very High',
    recommendedTactic: 'Atrium stage kids performance demo & stroller tag branding',
    contactPerson: 'Promotion Team',
    contactPhone: '021-5312-xxxx',
  },

  // 10. Schools
  {
    id: 'poi-24',
    name: 'Sekolah Santa Laurensia (Early Years & Elementary)',
    categoryId: 10,
    categoryName: 'Schools',
    subType: 'TK & Elementary School',
    lat: -6.2285,
    lng: 106.6485,
    address: 'Jl. Sutera Utama No. 1, Alam Sutera',
    estimatedWeeklyFootfall: 1400,
    crowdPeakDay: 'Fri',
    densityLevel: 'Very High',
    recommendedTactic: 'School pickup gate flyer handout 30 menit sebelum bel kepulangan',
    contactPerson: 'Komite Orang Tua (POMG)',
    contactPhone: '0812-9900-1122',
  },
  {
    id: 'poi-25',
    name: 'TK & SD Saint John’s Catholic School',
    categoryId: 10,
    categoryName: 'Schools',
    subType: 'School Pickup / Drop-off Area',
    lat: -6.2495,
    lng: 106.6342,
    address: 'Kawasan Kencana Loka, Sektor XII',
    estimatedWeeklyFootfall: 780,
    crowdPeakDay: 'Thu',
    densityLevel: 'High',
    recommendedTactic: 'Sponsorship lomba hari kemerdekaan / pensi sekolah',
    contactPerson: 'Ibu Theresia',
    contactPhone: '0813-2211-4433',
  },

  // 11. Religious / Community Centers
  {
    id: 'poi-26',
    name: 'Sekolah Minggu Gereja Santo Laurensius Alam Sutera',
    categoryId: 11,
    categoryName: 'Religious / Community Centers',
    subType: 'Children Sunday School & Family Classes',
    lat: -6.2295,
    lng: 106.6492,
    address: 'Jl. Sutera Utama No. 2, Alam Sutera',
    estimatedWeeklyFootfall: 920,
    crowdPeakDay: 'Sun',
    densityLevel: 'Very High',
    recommendedTactic: 'Dukungan materi craft edukatif untuk kelas bina iman anak',
    contactPerson: 'Bpk. Anton (Koordinator Bina Iman)',
    contactPhone: '0816-3344-5566',
  },
  {
    id: 'poi-27',
    name: 'TPA & Majelis Taklim Keluarga Nurul Huda',
    categoryId: 11,
    categoryName: 'Religious / Community Centers',
    subType: 'Family Community Activity Center',
    lat: -6.2165,
    lng: 106.6322,
    address: 'Jl. Raya Serpong Utara No. 18',
    estimatedWeeklyFootfall: 420,
    crowdPeakDay: 'Fri',
    densityLevel: 'High',
    recommendedTactic: 'Pesantren kilat holiday workshop & games motorik anak',
    contactPerson: 'Ustadz Farid',
    contactPhone: '0812-1144-7788',
  },

  // 12. Kids Events
  {
    id: 'poi-28',
    name: 'Bazaar & Parenting Fair Flavor Bliss',
    categoryId: 12,
    categoryName: 'Kids Events',
    subType: 'Kids Bazaar & Parenting Festival',
    lat: -6.2255,
    lng: 106.6442,
    address: 'Ring O Flavor Bliss Alam Sutera',
    estimatedWeeklyFootfall: 2100,
    crowdPeakDay: 'Sat',
    densityLevel: 'Very High',
    recommendedTactic: 'Interactive Slime & Sensory booth dengan Spin-The-Wheel voucher lead capture',
    contactPerson: 'Event Organizer Ceria',
    contactPhone: '0811-9922-3344',
  },
  {
    id: 'poi-29',
    name: 'Kids Drawing Competition & Family Festival',
    categoryId: 12,
    categoryName: 'Kids Events',
    subType: 'Children Competition',
    lat: -6.2215,
    lng: 106.6548,
    address: 'Atrium Mall @ Alam Sutera',
    estimatedWeeklyFootfall: 1800,
    crowdPeakDay: 'Sun',
    densityLevel: 'Very High',
    recommendedTactic: 'Piala juara & goodie bag eksklusif dari Sparks EC',
    contactPerson: 'Tim EO Lomba',
    contactPhone: '0813-4455-6677',
  },
];

// Helper to compute haversine distance in km
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Number(d.toFixed(2));
}

// Generate realistic POIs based on center lat/lng and max radius
export function getPoisForCenter(
  centerLat: number,
  centerLng: number,
  radiusMeters: number,
  selectedCategoryIds: number[]
): MapPoiItem[] {
  const maxRadiusKm = radiusMeters / 1000;

  // Offset standard sample POIs relative to the selected center if needed
  const centerDeltaLat = centerLat - -6.2291778;
  const centerDeltaLng = centerLng - 106.633914;

  const generated = SAMPLE_POIS_ALAM_SUTERA.map((item) => {
    // Project relative coordinates around the current center
    const adjustedLat = item.lat + centerDeltaLat;
    const adjustedLng = item.lng + centerDeltaLng;
    const dist = calculateDistanceKm(centerLat, centerLng, adjustedLat, adjustedLng);

    return {
      ...item,
      lat: adjustedLat,
      lng: adjustedLng,
      distanceKm: dist,
    };
  });

  return generated
    .filter((poi) => poi.distanceKm <= maxRadiusKm)
    .filter((poi) => selectedCategoryIds.includes(poi.categoryId))
    .sort((a, b) => a.distanceKm - b.distanceKm);
}
