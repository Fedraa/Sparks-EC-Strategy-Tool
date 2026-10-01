export interface PoICategory {
  id: number;
  slug: string;
  category: string;
  poiToTapIn: string;
  poiExamples: string[];
  catchmentTier: 'Primary (0-2 km)' | 'Secondary (2-5 km)' | 'Extended (5-10 km)';
  targetAudience: string;
  peakHours: string;
  impactScore: 'Very High' | 'High' | 'Medium';
  effortScore: 'Low' | 'Medium' | 'High';
  fastestLeadSource: boolean;
  strategicObjective: string;
  activationTactics: string[];
  conversionFunnel: {
    awareness: string;
    consideration: string;
    trialBooking: string;
    enrollment: string;
  };
  valuePropForPartner: string;
  samplePitchScriptWA: string;
  samplePitchEmail: string;
  checklist: string[];
}

export interface PartnerVenue {
  id: string;
  name: string;
  categoryId: number;
  categoryName: string;
  locationArea: string;
  distanceKm: number;
  contactPerson: string;
  contactChannel: string;
  status: 'Prospect' | 'Contacted' | 'In Discussion' | 'Agreement Signed' | 'Active Activation' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  estimatedWeeklyFootfall: number;
  agreedMechanism: string;
  leadsGenerated: number;
  notes: string;
}

export const POI_CATEGORIES: PoICategory[] = [
  {
    id: 1,
    slug: 'kids-activity-enrichment',
    category: 'Kids Activity & Enrichment',
    poiToTapIn: 'Kumon, coding class, art class, music class, ballet, swimming, gymnastics',
    poiExamples: ['Kumon Learning Center', 'Yamaha Music School', 'Marlupi Dance Academy', 'Robologee Coding', 'Global Art Studio', 'Aquatic Baby Swim'],
    catchmentTier: 'Primary (0-2 km)',
    targetAudience: 'High-intent parents investing in structured child development, motor skills, and creative intelligence (Ages 3-10).',
    peakHours: 'Weekday afternoons (15:00 - 18:30) & Saturday mornings (09:00 - 14:00)',
    impactScore: 'Very High',
    effortScore: 'Medium',
    fastestLeadSource: true,
    strategicObjective: 'Capture parents who already allocate monthly budget for extracurricular learning and seek holistic development at Sparks EC.',
    activationTactics: [
      'Waiting Lounge Standee & Brochure Holder with QR Trial Pass',
      'Joint "Creative Explorer" Voucher Exchange (e.g. 1 Free Sparks EC class with Kumon/Music enrollment)',
      'Cross-event masterclass (e.g. Sparks EC sensory play day hosted during ballet semester breaks)',
      'Teacher / Coach referral incentive card'
    ],
    conversionFunnel: {
      awareness: 'Flyer & pop-up banner while parents wait during class',
      consideration: 'QR scan to special "Enrichment Parents VIP Pass" with zero trial fee',
      trialBooking: 'Weekend sensory & play-based experiential session at Sparks EC',
      enrollment: 'Bundled membership rebate upon showing proof of active enrollment in partner class'
    },
    valuePropForPartner: 'Value-add for their students; zero competition since Sparks EC complements specialized classes with foundational play-based enrichment.',
    samplePitchScriptWA: 'Halo Kak [Nama Owner/Manager], salam dari tim Sparks EC [Area]. Kami melihat siswa di [Nama Tempat] sangat aktif. Kami ingin mengajukan program cross-promo benefit di mana murid [Nama Tempat] mendapatkan Complimentary 1-Day Sparks Experience Pass eksklusif, dan sebaliknya kami menyediakan voucher khusus bagi member Sparks. Apakah ada waktu luang 10 menit untuk diskusi santai?',
    samplePitchEmail: 'Subjek: Penawaran Kolaborasi Cross-Benefit Sparks EC x [Nama Partner]\n\nDear Manajemen [Nama Tempat],\n\nPerkenalkan kami dari Sparks EC (Early Childhood & Enrichment Center). Melihat keselarasan visi kita dalam menunjang tumbuh kembang optimal anak, kami bermaksud menawarkan program mutual cross-promosi tanpa biaya...\n\nSalam hangat,\nTim Partnership Sparks EC',
    checklist: [
      'Siapkan 100 printed voucher dengan custom QR code tracking',
      'Kirim standee akrilik A5 untuk meja resepsionis',
      'Briefing singkat frontliner partner terkait benefit voucher',
      'Review jumlah lead masuk setiap minggu'
    ]
  },
  {
    id: 2,
    slug: 'preschool-daycare',
    category: 'Preschool / Daycare',
    poiToTapIn: 'Preschool, daycare, playgroup, Montessori, kindergarten',
    poiExamples: ['Kinderfield Preschool', 'Tumble Tots Daycare', 'Kangaroo Montessori', 'Apple Tree Playgroup', 'Little Sunshine Daycare'],
    catchmentTier: 'Primary (0-2 km)',
    targetAudience: 'Working and modern mothers with toddlers aged 1.5 - 5 years seeking socialization and motor development.',
    peakHours: 'Morning drop-off (07:30 - 08:30) & Afternoon dismissal pickup (11:30 - 13:00)',
    impactScore: 'Very High',
    effortScore: 'Medium',
    fastestLeadSource: true,
    strategicObjective: 'Establish Sparks EC as the #1 weekend continuation and after-school enrichment provider for preschool families.',
    activationTactics: [
      'School gate flyering during pickup wait-time (when parents & nannies are waiting in cars)',
      'Term excursion / field trip destination package to Sparks EC center',
      'Sponsorship of preschool graduation ceremony or sports day goodie bags',
      'Parenting seminar series hosted by Sparks EC child development specialist at the preschool'
    ],
    conversionFunnel: {
      awareness: 'Hands-on flyer distribution during pickup rush hour + teacher recommendation',
      consideration: 'Invitation to dedicated "Preschool Class Playdate" at Sparks EC',
      trialBooking: 'Private group booking with classmates',
      enrollment: 'Term discount when 3+ friends from the same school register together'
    },
    valuePropForPartner: 'Free curated educational field trip and premium graduation goodie bag sponsor for their students without burdening school operational budget.',
    samplePitchScriptWA: 'Selamat pagi Ibu Kepala Sekolah/Koordinator [Nama Preschool], saya [Nama] dari Sparks EC [Area]. Kami memiliki program Field Trip & Sensory Motor Outing edukatif khusus untuk anak usia TK/Playgroup. Kami siap memfasilitasi program kunjungan bermain atau menyediakan goodie bag sponsorship untuk event terdekat sekolah. Boleh kami kirimkan proposal singkatnya?',
    samplePitchEmail: 'Subjek: Penawaran Kemitraan Field Trip & Sponsoring Edukasi Sparks EC\n\nYth. Pimpinan Preschool [Nama Sekolah],\n\nSparks EC berkomitmen mendampingi tumbuh kembang anak usia dini lewat stimulasi kinestetik dan kreatif. Kami mengundang siswa/siswi untuk mengadakan mini excursion ke fasilitas kami dengan panduan fasilitator bersertifikat...',
    checklist: [
      'Data jadwal jam kepulangan masing-masing jenjang (PG, TK A, TK B)',
      'Siapkan tim flyering berseragam rapi dan ramah di dekat drop-off zone',
      'Surat resmi permohonan kunjungan field trip untuk Kepala Sekolah',
      'Sediakan merchandise anak (balon branding / sticker sheet) yang disukai anak'
    ]
  },
  {
    id: 3,
    slug: 'kids-play-entertainment',
    category: 'Kids Play & Family Entertainment',
    poiToTapIn: 'Indoor playground, kids café, trampoline park, family entertainment center',
    poiExamples: ['Kidzlandia', 'Playtopia', 'Miniapolis', 'Bounce Street Trampoline', 'Fanpekka', 'Lolipop Playland'],
    catchmentTier: 'Secondary (2-5 km)',
    targetAudience: 'Families looking for joyful physical release, weekend bonding, and engaging indoor play (Ages 1-9).',
    peakHours: 'Friday evening, Saturday & Sunday all day (10:00 - 20:30), School holidays',
    impactScore: 'High',
    effortScore: 'Medium',
    fastestLeadSource: false,
    strategicObjective: 'Convert casual play seekers into structured lifelong enrichment members by showcasing Sparks EC interactive learning concepts.',
    activationTactics: [
      'Ticket counter redemption tie-in (e.g. Show playground ticket to get Sparks EC trial pass)',
      'Pop-up mini experiential corner on weekday slow hours (interactive storytelling & sensory craft)',
      'Co-branded stamp rally for kids who complete activities across both venues',
      'Kids socks / wristband co-branding or discount exchange'
    ],
    conversionFunnel: {
      awareness: 'Visible banner / flyers placed at shoe locker & waiting area',
      consideration: 'Curiosity on "what makes Sparks EC more developmental than regular playground"',
      trialBooking: 'Trial session emphasizing purposeful structured play and learning modules',
      enrollment: 'Conversion package with free admission bonus'
    },
    valuePropForPartner: 'Drive repeat visits during low-traffic weekdays; value-added bonus pass given to playground visitors.',
    samplePitchScriptWA: 'Halo Kak [Nama PIC Playground], perkenalkan saya [Nama] dari Sparks EC. Kami sangat menyukai antusiasme pengunjung di [Nama Playground]. Kami ingin mengusulkan cross-campaign: setiap pengunjung [Playground] mendapatkan trial pass eksklusif di Sparks EC, dan sebaliknya kami merekomendasikan playground Kakak untuk outdoor activity member kami. Bisakah kita diskusikan mekanismenya?',
    samplePitchEmail: 'Subjek: Usulan Kemitraan Co-Marketing Sparks EC x [Nama Playground]\n\nDear Tim Marketing [Nama Playground],\n\nMenghadapi musim liburan sekolah, kami ingin mengajak berkolaborasi dalam bentuk cross-reward program...',
    checklist: [
      'Koordinasi izin peletakan materi promo di kasir & loker sepatu',
      'Pastikan QR code voucher terhubung langsung ke CS booking WhatsApp',
      'Jadwalkan review penukaran voucher di akhir bulan'
    ]
  },
  {
    id: 4,
    slug: 'parenting-communities',
    category: 'Parenting Communities',
    poiToTapIn: 'Mom community, parenting groups, playdate communities, baby & toddler communities',
    poiExamples: ['Mommy & Me Community', 'Klub Main Toddler Jabodetabek', 'Komunitas Ibu Cerdas', 'Playdate Seru BSD', 'Moms & Babes Club'],
    catchmentTier: 'Extended (5-10 km)',
    targetAudience: 'Highly connected mothers with strong peer influence; active on WhatsApp, Telegram, and Instagram.',
    peakHours: 'Online interaction 24/7; private offline playdates on weekday mornings (09:30 - 11:30)',
    impactScore: 'Very High',
    effortScore: 'Low',
    fastestLeadSource: true,
    strategicObjective: 'Create organic word-of-mouth recommendations, group trials, and high-trust social proof for Sparks EC.',
    activationTactics: [
      'Complimentary VIP Venue Host for community private playdates and birthday clusters',
      'Admin / Community Leader referral program and honorary Sparks EC ambassadorship',
      'Sponsored free interactive parenting workshop with expert child psychologist',
      'Exclusive community discount code shared directly inside member WhatsApp groups'
    ],
    conversionFunnel: {
      awareness: 'WhatsApp group recommendation from trusted Community Admin or Mom Influencer',
      consideration: 'Moms visit together in a group (eliminating hesitation & social anxiety)',
      trialBooking: 'Group private trial session arranged specifically for their playdate circle',
      enrollment: 'Bulk group registration discount (5+ families registering together)'
    },
    valuePropForPartner: 'Free private venue rental with curated educational activities for their community meetups + prestige perks for community leaders.',
    samplePitchScriptWA: 'Halo Bunda [Nama Admin Komunitas], salam hangat dari Sparks EC! Kami melihat kehangatan komunitas [Nama Komunitas] dalam mendukung parenting. Kami ingin menawarkan Sparks EC sebagai venue GRATIS untuk playdate komunitas Bunda lengkap dengan fasilitator bermain dan goodie bag untuk para si kecil. Apakah Bunda berkenan jika kami fasilitasi jadwalnya?',
    samplePitchEmail: 'Subjek: Penawaran Venue Playdate Gratis & Kolaborasi Komunitas Moms\n\nHalo Moms Leader [Nama Komunitas],\n\nSparks EC ingin memberikan apresiasi bagi komunitas hebat seperti [Nama Komunitas] dengan menyediakan fasilitas kami sebagai host playdate eksklusif...',
    checklist: [
      'Identifikasi top 5 mom community leaders di area catchment',
      'Kirim paket apresiasi atau voucher VIP khusus untuk Admin komunitas',
      'Jadwalkan tanggal playdate eksklusif pada slot weekday morning',
      'Siapkan photo booth & template IG story untuk memudahkan para ibu posting'
    ]
  },
  {
    id: 5,
    slug: 'maternity-baby-stores',
    category: 'Maternity & Baby Stores',
    poiToTapIn: 'Mothercare-type stores, baby shops, kids stores, maternity stores',
    poiExamples: ['Mothercare', 'Birds & Bees Baby Shop', 'Suzanna Baby Shop', 'Baby Wisdom', 'Chicco Store', 'Bebiluck Shop'],
    catchmentTier: 'Secondary (2-5 km)',
    targetAudience: 'Expectant mothers and parents of infants/toddlers with above-average purchasing power and focus on child welfare.',
    peakHours: 'Payday weekend windows (25th - 5th), Saturday & Sunday afternoons (13:00 - 19:00)',
    impactScore: 'High',
    effortScore: 'Low',
    fastestLeadSource: false,
    strategicObjective: 'Tap parents early in their child parenting journey before they settle on competitors.',
    activationTactics: [
      'Shopping Bag Inserter: Flyer voucher slipped into shopping bags for purchases > IDR 300,000',
      'Cashier Standee with high-contrast acrylic QR: "Ambil Voucher Trial Sparks EC 100% Gratis"',
      'Display corner collaboration: Small demo sensory toy corner inside baby shop',
      'Staff incentive: IDR 10,000 cashback / referral reward for cashier staff per verified trial lead'
    ],
    conversionFunnel: {
      awareness: 'Flyer discovered right inside shopping bag at home during unboxing',
      consideration: 'Parent notices Sparks EC location is very close to their routine shopping stop',
      trialBooking: 'Direct WhatsApp booking with priority weekend slot',
      enrollment: 'Enrollment starter kit gift with Sparks EC merchandise'
    },
    valuePropForPartner: 'Added customer delight (extra value for shoppers) and incentive commission for cashier staff.',
    samplePitchScriptWA: 'Selamat siang Pak/Bu [Manager Baby Shop], saya [Nama] dari Sparks EC. Kami ingin menawarkan program Gift-With-Purchase (GWP) gratis untuk customer [Nama Toko] berupa Free Trial Pass Sparks EC yang bisa diselipkan di shopping bag belanja customer. Program ini 100% didukung Sparks tanpa biaya untuk toko. Apakah berkenan kami kirimkan sampel vouchernya?',
    samplePitchEmail: 'Subjek: Kemitraan Bag-Insert Voucher untuk Pelanggan [Nama Toko]\n\nYth. Manajemen Retail [Nama Toko],\n\nSebagai brand yang melayani segmen keluarga muda, kami mengajukan program kolaborasi customer reward...',
    checklist: [
      'Cetak 500 pcs voucher kartu tebal (art carton 260gr) dengan desain premium',
      'Koordinasi dengan Store Manager untuk izin bag-inserting',
      'Sediakan insentif kopi / snack mingguan untuk tim kasir sebagai bentuk apresiasi'
    ]
  },
  {
    id: 6,
    slug: 'pediatric-healthcare',
    category: 'Pediatric / Family Healthcare',
    poiToTapIn: 'Pediatric clinics, child development clinics, vaccination centers',
    poiExamples: ['Klinik Tumbuh Kembang Anak', 'RSIA Bunda', 'Pusat Vaksinasi Anak', 'Klinik Pediatri Brawijaya', 'Klinik Terapi Wicara & Sensori'],
    catchmentTier: 'Secondary (2-5 km)',
    targetAudience: 'Health-conscious parents highly attentive to developmental milestones, speech delays, sensory processing, and motor skills.',
    peakHours: 'Morning vaccination hours (08:00 - 11:30) & Evening consultation hours (16:30 - 20:00)',
    impactScore: 'Very High',
    effortScore: 'Medium',
    fastestLeadSource: true,
    strategicObjective: 'Position Sparks EC as an expert-backed enrichment center supporting holistic motoric and social development.',
    activationTactics: [
      'Waiting Room Educational Brochure & Co-branded Child Milestone Guide (Usia 1-6 Tahun)',
      '"Sertifikat Anak Pemberani" after vaccination with 1x Free Sparks EC Sensory Play Pass',
      'Pediatrician & Therapist referral partnership (recommend Sparks EC for socialization & sensory stimulation)',
      'Kids play table sponsorship in the clinic waiting lobby'
    ],
    conversionFunnel: {
      awareness: 'High dwell time in clinic waiting room (average 30-60 mins) reading educational materials',
      consideration: 'Doctor/Nurse endorsement: "Anak butuh lebih banyak stimulasi sensori bermain bersama teman"',
      trialBooking: 'Immediate booking via QR code on vaccination courage certificate',
      enrollment: 'Membership program tailored to developmental stimulation'
    },
    valuePropForPartner: 'Enhances clinic waiting experience; provides non-clinical lifestyle stimulation recommendation for patients without medical commercialization.',
    samplePitchScriptWA: 'Selamat pagi Dokter / Tim Manajemen [Nama Klinik/RSIA], salam dari Sparks EC. Kami sangat mengagumi dedikasi klinik dalam kesehatan anak. Kami ingin menyediakan kartu "Anak Pemberani Vaksin" gratis yang dilengkapi bonus 1x Trial Sensory Session di Sparks EC untuk menghibur pasien cilik setelah imunisasi. Bolehkah kami koordinasikan dengan tim marketing klinik?',
    samplePitchEmail: 'Subjek: Kolaborasi Program Reward Pasien Anak: Sparks EC x [Nama RSIA/Klinik]\n\nYth. Direksi & Tim Layanan Pasien [Nama Klinik],\n\nDalam rangka menciptakan pengalaman berobat yang ramah anak, Sparks EC berinisiatif menghadirkan media edukasi milestone anak serta sertifikat apresiasi pasca-vaksinasi...',
    checklist: [
      'Pastikan materi brochure bernada edukatif medis ramah (bebas klaim klaim berlebihan)',
      'Sertifikat Anak Pemberani dicetak dengan kertas tebal berkarakter kartun lucu',
      'Izin resmi dari kepala humas/marketing RSIA'
    ]
  },
  {
    id: 7,
    slug: 'family-fnb',
    category: 'Family F&B',
    poiToTapIn: 'Family cafés, kids-friendly restaurants, cafés near schools/preschools',
    poiExamples: ['Pancake Co & Kids Corner', 'Family Garden Café', 'Restoran Ramah Anak', 'Café dekat Sekolah BPK', 'Bakery & Gelato Lounge'],
    catchmentTier: 'Primary (0-2 km)',
    targetAudience: 'Families having lunch or dinner with children, mothers gathering after school drop-offs or during tutoring hours.',
    peakHours: 'Lunch rush (11:30 - 14:00), Tea time moms hangout (14:00 - 16:30), Dinner (17:30 - 20:30)',
    impactScore: 'High',
    effortScore: 'Low',
    fastestLeadSource: false,
    strategicObjective: 'Engage parents during relaxed dining moments and turn waiting time into Sparks EC discovery.',
    activationTactics: [
      'Custom Sparks EC Table Placemat Coloring Paper (Free placemats provided for the restaurant with fun coloring maze & Sparks EC QR coupon for parents)',
      'Bill-folder Insert Voucher: "Dapatkan Gratis 1x Sparks Play Session dengan struk makan hari ini"',
      'Moms Gathering Combo: Special coffee perk for Sparks EC parents or vice versa',
      'Small acrylic standee on family booths'
    ],
    conversionFunnel: {
      awareness: 'Child is happily engaged coloring the Sparks EC placemat while food is prepared',
      consideration: 'Parents scan the placemat QR code while relaxing at the table',
      trialBooking: 'Convenient scheduling for the upcoming weekend or tomorrow after school',
      enrollment: 'Sparks EC welcome pack bonus'
    },
    valuePropForPartner: 'Saves the restaurant cost on disposable kids placemats/crayons while improving customer family-friendly rating.',
    samplePitchScriptWA: 'Halo Kak [Owner Café/Resto], kami dari Sparks EC di dekat lokasi resto Kakak. Kami tahu banyak keluarga dengan anak kecil sering makan di [Nama Resto]. Kami ingin men-sponsor kertas alas meja mewarnai anak (kids coloring placemat) gratis secara berkala lengkap dengan crayon ramah anak. Kakak tidak perlu keluar biaya cetak. Apakah tertarik?',
    samplePitchEmail: 'Subjek: Penawaran Sponsorship Kids Coloring Placemat Gratis untuk [Nama Restoran]\n\nDear Manajemen [Nama Café/Resto],\n\nUntuk meningkatkan kenyamanan keluarga saat bersantap di tempat Anda, Sparks EC bermaksud menyediakan fasilitas placemat mewarnai anak gratis...',
    checklist: [
      'Desain placemat A3 dengan puzzle interaktif, labirin, dan maskot Sparks EC',
      'Sertakan barcode QR voucher yang menarik dan mudah di-scan',
      'Distribusikan batch pertama 200 lembar + 20 set crayon'
    ]
  },
  {
    id: 8,
    slug: 'residential-communities',
    category: 'Residential Communities',
    poiToTapIn: 'Cluster, apartment, condo, residential estate with many young families',
    poiExamples: ['Cluster NavaPark BSD', 'Apartemen Belmont Residence', 'Cluster Greenwich Park', 'Perumahan Grand Galaxy', 'Kondominium Taman Anggrek'],
    catchmentTier: 'Primary (0-2 km)',
    targetAudience: 'Dense cluster of young homeowners with toddlers and elementary school children living in close proximity.',
    peakHours: 'Morning sports / car free hours (06:30 - 09:00), weekend afternoons around community playgrounds/clubhouses',
    impactScore: 'Very High',
    effortScore: 'Medium',
    fastestLeadSource: true,
    strategicObjective: 'Dominate the immediate hyper-local neighborhood and trigger powerful neighbor-to-neighbor word of mouth.',
    activationTactics: [
      'Estate Clubhouse Weekend Pop-Up: Mini Sensory Play & Science Lab station during Car Free Day / Sunday morning',
      'Official Estate WhatsApp / Bulletin Board Announcement via Pengurus RT/RW or Estate Management',
      'Special "Tetangga Dekat" Discount Voucher distributed directly to resident mailboxes/doors',
      'Sponsorship of Cluster 17-an Independence Day or Family Fun Walk event'
    ],
    conversionFunnel: {
      awareness: 'Direct mailbox drop / WhatsApp group announcement inside private estate',
      consideration: 'Seeing neighbor children attending Sparks EC uniform/tote bag',
      trialBooking: 'Shared carpool trial bookings among neighboring mothers',
      enrollment: 'High retention due to minimal commute distance (< 5-10 minutes)'
    },
    valuePropForPartner: 'Free vibrant family activities and workshops inside the residential clubhouse, boosting resident satisfaction.',
    samplePitchScriptWA: 'Selamat pagi Bapak/Ibu Pengurus Paguyuban / Estate Management [Nama Cluster], saya [Nama] warga/tim Sparks EC [Area]. Kami melihat banyak balita dan anak-anak di lingkungan cluster kita. Kami ingin mengajukan demo sensory play & fun games gratis di clubhouse cluster pada hari Sabtu/Minggu pagi untuk hiburan warga. Semua perlengkapan kami siapkan. Boleh kami jelaskan teknisnya?',
    samplePitchEmail: 'Subjek: Permohonan Izin Kegiatan Ramah Anak di Fasilitas Clubhouse [Nama Cluster]\n\nYth. Pengurus RT/RW & Manajemen Estate [Nama Cluster],\n\nDalam rangka mempererat silaturahmi keluarga muda di lingkungan perumahan, Sparks EC mengajukan kegiatan edutainment gratis bagi anak-anak warga...',
    checklist: [
      'Hubungi kepala paguyuban cluster atau estate manager',
      'Siapkan surat izin resmi dan rundown acara mini pop-up',
      'Siapkan 100 flyer khusus "Exclusive Resident Privilege Pass"'
    ]
  },
  {
    id: 9,
    slug: 'malls-family-hubs',
    category: 'Malls & Family Hubs',
    poiToTapIn: 'Malls with kids area, family events, weekend kids activities',
    poiExamples: ['Mall Kelapa Gading', 'AEON Mall BSD', 'Pondok Indah Mall', 'Central Park Mall', 'Pakuwon Mall Surabaya', 'Summarecon Mall Serpong'],
    catchmentTier: 'Extended (5-10 km)',
    targetAudience: 'Broad lifestyle families spending weekends shopping, dining, and seeking educational recreation.',
    peakHours: 'Saturday & Sunday (11:00 - 21:00), National holidays, School breaks',
    impactScore: 'Very High',
    effortScore: 'High',
    fastestLeadSource: false,
    strategicObjective: 'Drive mass awareness, high-volume lead capture, and brand authority across the wider regional trade area.',
    activationTactics: [
      'Mall Customer Service Loyalty Perk: Redeem mall points for Sparks EC Trial Voucher',
      'Weekend Atrium Booth / Stage Performance: Mini science show, sensory art live demo',
      'Stroller Rental tag sponsorship (Co-branding on mall rental strollers)',
      'Mall directory & digital escalator screen advertising exchange'
    ],
    conversionFunnel: {
      awareness: 'High-volume footfall past atrium booth or customer loyalty desk',
      consideration: 'Interactive child engagement at booth (instant smile, curiosity from parents)',
      trialBooking: 'Instant schedule booking on tablet at booth in exchange for immediate lucky-dip gift',
      enrollment: 'Enrollment during promotion period with mall shopping voucher incentive'
    },
    valuePropForPartner: 'Provides interactive family crowd-puller at mall atrium, drives footfall and customer dwell time.',
    samplePitchScriptWA: 'Halo Tim Tenant & Event Marketing [Nama Mall], saya [Nama] dari Sparks EC. Kami melihat traffic keluarga di mall sangat tinggi. Kami ingin berkolaborasi untuk aktivasi weekend family event: kami siap mengisi panggung utama dengan interactive sensory show gratis atau menyediakan voucher untuk customer loyalty reward mall. Boleh kami hubungi PIC event-nya?',
    samplePitchEmail: 'Subjek: Kolaborasi Event Edukasi Keluarga & Atrium Activation di [Nama Mall]\n\nYth. Departemen Promosi & Marcomm [Nama Mall],\n\nSparks EC mengajukan kemitraan aktivasi panggung edutainment anak di atrium mall untuk mendukung traffic keluarga pada akhir pekan...',
    checklist: [
      'Proposal formal aktivasi event dengan detail layout booth & visual',
      'Tablet / form digital untuk registrasi lead instan di lokasi',
      'Hadiah lucky dip / merchandise Sparks EC menarik untuk anak'
    ]
  },
  {
    id: 10,
    slug: 'schools',
    category: 'Schools',
    poiToTapIn: 'TK, PAUD, elementary schools — especially around pickup/drop-off areas',
    poiExamples: ['TK Kristen IPEKA', 'SD & TK Al-Azhar', 'PAUD Mawar Indah', 'Sekolah Pelita Harapan (Early Years)', 'TK Santa Ursula'],
    catchmentTier: 'Primary (0-2 km)',
    targetAudience: 'School parents, parent-teacher associations (Komite Sekolah / POMG), teachers, and young pupils.',
    peakHours: 'Morning drop-off (06:45 - 07:45) & Pick-up waiting window (11:30 - 13:45)',
    impactScore: 'Very High',
    effortScore: 'Medium',
    fastestLeadSource: true,
    strategicObjective: 'Position Sparks EC as the premier academic and creative enrichment partner complementing school curriculum.',
    activationTactics: [
      'Pickup gate direct flyer distribution during waiting period (target parents seated in parked cars)',
      'Sponsor school sports day / Pentas Seni (Pensi) / Kartini Day / Independence Day competitions',
      'Host after-school enrichment club sessions on-campus or transport busing to Sparks EC',
      'Parenting seminar for school parents on "Mempersiapkan Fokus & Motorik Anak"'
    ],
    conversionFunnel: {
      awareness: 'Direct flyer handover to waiting parent in car + announcement from school committee',
      consideration: 'Endorsement from school friends already joined Sparks EC',
      trialBooking: 'Group booking after school pickup time',
      enrollment: 'After-school routine integration (seamless transition from school to Sparks EC)'
    },
    valuePropForPartner: 'School enrichment enrichment offering without additional teacher headcount, plus event trophy and goodie bag sponsorship.',
    samplePitchScriptWA: 'Selamat siang Ibu/Bapak Pengurus Komite Sekolah (POMG) [Nama Sekolah], perkenalkan saya [Nama] dari Sparks EC. Kami sangat mengapresiasi kegiatan sekolah yang aktif. Dalam rangka event [Nama Event Sekolah / Hari Kartini], kami dari Sparks EC ingin berpartisipasi sebagai sponsor piala lomba atau goodie bag edukatif untuk seluruh peserta lomba. Apakah kami bisa silaturahmi untuk membahasnya?',
    samplePitchEmail: 'Subjek: Penawaran Sponsorship Kegiatan Siswa & Kerjasama Ekstrakurikuler Sparks EC\n\nYth. Komite Sekolah & Pimpinan [Nama Sekolah],\n\nSparks EC ingin berkontribusi dalam mendukung kesuksesan agenda kegiatan siswa dengan menyediakan dukungan sponsorship piala dan goodie bag voucher...',
    checklist: [
      'Peta jadwal kepulangan per jenjang kelas',
      'Tim flyering standby 30 menit sebelum bel pulang sekolah',
      'Voucher memiliki masa berlaku spesifik (misal 14 hari) untuk menciptakan urgency'
    ]
  },
  {
    id: 11,
    slug: 'religious-community-centers',
    category: 'Religious / Community Centers',
    poiToTapIn: 'Family-oriented community activities, children\'s classes',
    poiExamples: ['Sekolah Minggu GKI / GKJ', 'TPA & Majelis Taklim Ibu-Ibu', 'Pusat Komunitas Warga', 'Sunday School Catholic Church', 'Balai Pertemuan RW'],
    catchmentTier: 'Secondary (2-5 km)',
    targetAudience: 'Families anchored in community values, strong trust networks, high loyalty to group recommendations.',
    peakHours: 'Friday afternoons, Saturday afternoons, Sunday mornings (08:00 - 12:00)',
    impactScore: 'Medium',
    effortScore: 'Low',
    fastestLeadSource: false,
    strategicObjective: 'Build deep communal goodwill, social trust, and word-of-mouth among family networks.',
    activationTactics: [
      'Holiday Bible School (HBS) or Pesantren Kilat educational craft & science workshop partner',
      'Community notice board poster placement',
      'Charity social responsibility (CSR) sensory play day for local children',
      'Teacher / Guru Ngaji / Sunday School Teacher appreciation passes'
    ],
    conversionFunnel: {
      awareness: 'Information shared via community coordinator or notice board',
      consideration: 'High implicit trust because recommended within a community setting',
      trialBooking: 'Parents bring children together after weekend worship / gathering',
      enrollment: 'Community group membership referral'
    },
    valuePropForPartner: 'High-quality educational materials, craft supplies, and fun learning activities donated for their youth classes.',
    samplePitchScriptWA: 'Salam sejahtera Bapak/Ibu Koordinator [Nama Komunitas/Gereja/TPA], kami dari Sparks EC. Dalam menyambut liburan sekolah / kegiatan anak, kami ingin menyumbangkan paket aktivitas kreativitas anak dan siap membantu mengisi sesi games edukatif gratis untuk anak-anak kelas binaan Bapak/Ibu. Apakah kiranya kami bisa berkoordinasi?',
    samplePitchEmail: 'Subjek: Partisipasi Dukungan Edukasi Anak untuk Kegiatan [Nama Tempat/Komunitas]\n\nYth. Pengurus Komunitas [Nama Lembaga],\n\nSebagai wujud kepedulian kami terhadap perkembangan karakter dan keterampilan generasi muda, Sparks EC ingin berpartisipasi mendukung kegiatan anak...',
    checklist: [
      'Sesuaikan materi kegiatan agar netral dan fokus pada kreativitas serta keterampilan sains/seni anak',
      'Pastikan koordinasi izin resmi dengan pengurus lingkungan',
      'Dokumentasikan kegiatan dengan izin tertulis dari orang tua'
    ]
  },
  {
    id: 12,
    slug: 'kids-events',
    category: 'Kids Events',
    poiToTapIn: 'Kids bazaar, parenting fair, school fair, family festival, children\'s competition',
    poiExamples: ['Indonesia Maternity, Baby & Kids Expo (IMBEX)', 'Mommy n Me Festival', 'Bazaar Sekolah Tahunan', 'Lomba Mewarnai Anak Tingkat Kota', 'Festival Anak Ceria'],
    catchmentTier: 'Extended (5-10 km)',
    targetAudience: 'Mass high-density gathering of parents actively looking for products, classes, and entertainment for their kids.',
    peakHours: 'Full weekend event days (09:00 - 21:00)',
    impactScore: 'Very High',
    effortScore: 'High',
    fastestLeadSource: true,
    strategicObjective: 'Achieve massive burst lead acquisition (100-300+ leads in a single weekend) to fuel Sparks EC trial pipeline.',
    activationTactics: [
      'Interactive Activity Booth: Slime lab, Sensory Sandbox, or Robot Coding Challenge that naturally attracts children',
      'Spin-The-Wheel Lead Generator: Every child gets to spin for instant merchandise upon parent scanning QR & registering contact',
      'Event Sponsor & Trophy Provider for children drawing/coloring competitions',
      'Stage MC interactive quiz giving away Sparks EC Free Month Membership'
    ],
    conversionFunnel: {
      awareness: 'Child is magnetically drawn to the colorful Sparks interactive station',
      consideration: 'While child plays, Sparks EC counselor chats with parent explaining curriculum benefits',
      trialBooking: 'Counselor books trial appointment directly on tablet with instant WhatsApp confirmation',
      enrollment: 'Exclusive "Event-Only Registration Deal" (e.g. Free registration fee + Free uniform)'
    },
    valuePropForPartner: 'Sparks booth creates an exciting interactive crowd attraction, elevating overall event satisfaction for visitors.',
    samplePitchScriptWA: 'Halo Tim Event Organizer [Nama Event], saya [Nama] dari Sparks EC. Kami sangat tertarik untuk bergabung di event [Nama Event]. Kami ingin mengajukan booth interaktif (Free Sensory Lab) dan menjadi sponsor hadiah trofi lomba anak. Boleh kami minta dikirimkan proposal sponsorship dan layout booth yang masih tersedia?',
    samplePitchEmail: 'Subjek: Minat Sponsorship & Interactive Booth di [Nama Event]\n\nDear Event Organizer [Nama Acara],\n\nSparks EC ingin berpartisipasi sebagai exhibitor dan activity partner dalam penyelenggaraan [Nama Event]...',
    checklist: [
      'Siapkan 2-3 staff berenergi tinggi yang pintar berinteraksi dengan anak-anak',
      'Booth tools: Spin the wheel, 500 pcs balon branding, 300 lembar worksheet interaktif',
      'Target minimal 150 verified lead per hari event'
    ]
  }
];

export const INITIAL_PARTNER_VENUES: PartnerVenue[] = [
  {
    id: 'ven-1',
    name: 'Kumon Ruko Foresta BSD',
    categoryId: 1,
    categoryName: 'Kids Activity & Enrichment',
    locationArea: 'BSD City, Tangerang Selatan',
    distanceKm: 0.8,
    contactPerson: 'Ibu Ratna (Owner/Center Director)',
    contactChannel: 'WA: 0812-9876-XXXX',
    status: 'Agreement Signed',
    priority: 'High',
    estimatedWeeklyFootfall: 240,
    agreedMechanism: 'Standee QR trial voucher di ruang tunggu + voucher exchange',
    leadsGenerated: 38,
    notes: 'Sangat kooperatif, murid Kumon banyak usia 4-7 tahun yang cocok untuk Sparks EC.'
  },
  {
    id: 'ven-2',
    name: 'Kinderfield Preschool BSD',
    categoryId: 2,
    categoryName: 'Preschool / Daycare',
    locationArea: 'BSD City, Tangerang Selatan',
    distanceKm: 1.2,
    contactPerson: 'Ms. Clara (Academic Head)',
    contactChannel: 'Email: admissions@kinderfield-bsd.sch.id',
    status: 'Active Activation',
    priority: 'High',
    estimatedWeeklyFootfall: 180,
    agreedMechanism: 'Flyering saat dismissal pickup + Paket Field Trip ke Sparks',
    leadsGenerated: 54,
    notes: 'Sudah selesai 1 batch field trip 25 anak, 12 orang tua langsung ambil trial lanjutan.'
  },
  {
    id: 'ven-3',
    name: 'Kidzlandia AEON Mall BSD',
    categoryId: 3,
    categoryName: 'Kids Play & Family Entertainment',
    locationArea: 'AEON Mall BSD Lantai 2',
    distanceKm: 2.1,
    contactPerson: 'Bpk. Dimas (Store Supervisor)',
    contactChannel: 'WA: 0813-1122-XXXX',
    status: 'In Discussion',
    priority: 'Medium',
    estimatedWeeklyFootfall: 1200,
    agreedMechanism: 'Struk pembelian playground include potongan tiket Sparks',
    leadsGenerated: 14,
    notes: 'Sedang menunggu approval proposal dari head office.'
  },
  {
    id: 'ven-4',
    name: 'Komunitas Mom & Toddler BSD Serpong',
    categoryId: 4,
    categoryName: 'Parenting Communities',
    locationArea: 'Serpong & BSD Raya',
    distanceKm: 3.5,
    contactPerson: 'Bunda Jessica (Community Admin - 450 members)',
    contactChannel: 'WA: 0818-4455-XXXX',
    status: 'Active Activation',
    priority: 'High',
    estimatedWeeklyFootfall: 450,
    agreedMechanism: 'Host private playdate bulanan gratis di Sparks EC + share kode promo khusus di grup WA',
    leadsGenerated: 62,
    notes: 'Tingkat konversi tinggi (42% dari trial berlanjut enroll karena bonding sesama ibu).'
  },
  {
    id: 'ven-5',
    name: 'Mothercare Living World Alam Sutera',
    categoryId: 5,
    categoryName: 'Maternity & Baby Stores',
    locationArea: 'Alam Sutera, Tangerang',
    distanceKm: 4.8,
    contactPerson: 'Ibu Linda (Store Manager)',
    contactChannel: 'WA: 0811-3322-XXXX',
    status: 'Contacted',
    priority: 'Medium',
    estimatedWeeklyFootfall: 600,
    agreedMechanism: 'Bag-inserting voucher belanja di atas Rp 500.000',
    leadsGenerated: 0,
    notes: 'Meeting dijadwalkan Selasa jam 14:00.'
  },
  {
    id: 'ven-6',
    name: 'Klinik Anak & Tumbuh Kembang Mandiri',
    categoryId: 6,
    categoryName: 'Pediatric / Family Healthcare',
    locationArea: 'Ruko Golden Boulevard BSD',
    distanceKm: 1.5,
    contactPerson: 'dr. Anita, Sp.A & Bpk. Hendra (Klinik Manager)',
    contactChannel: 'WA: 0812-7788-XXXX',
    status: 'Active Activation',
    priority: 'High',
    estimatedWeeklyFootfall: 310,
    agreedMechanism: 'Kartu Anak Pemberani Vaksin + Booklet Milestone Tumbuh Kembang',
    leadsGenerated: 46,
    notes: 'Dokter sangat antusias karena butuh rujukan enrichment sensori untuk anak usia pra-sekolah.'
  },
  {
    id: 'ven-7',
    name: 'Pancake Co & Family Lounge',
    categoryId: 7,
    categoryName: 'Family F&B',
    locationArea: 'The Breeze BSD',
    distanceKm: 1.9,
    contactPerson: 'Bpk. Fajar (Restaurant Manager)',
    contactChannel: 'WA: 0815-6677-XXXX',
    status: 'Active Activation',
    priority: 'Medium',
    estimatedWeeklyFootfall: 750,
    agreedMechanism: 'Sponsor kids coloring placemat A3 + voucher QR code',
    leadsGenerated: 29,
    notes: 'Konsumsi placemat rata-rata 120 lembar per weekend.'
  },
  {
    id: 'ven-8',
    name: 'Cluster Greenwich Park BSD',
    categoryId: 8,
    categoryName: 'Residential Communities',
    locationArea: 'Greenwich Park, BSD City',
    distanceKm: 1.1,
    contactPerson: 'Bpk. Irwan (Ketua Paguyuban Cluster)',
    contactChannel: 'WA: 0819-2233-XXXX',
    status: 'Agreement Signed',
    priority: 'High',
    estimatedWeeklyFootfall: 380,
    agreedMechanism: 'Weekend pop-up booth di clubhouse saat Car Free Day cluster',
    leadsGenerated: 31,
    notes: 'Cluster dihuni banyak keluarga muda dengan anak usia 2-6 tahun.'
  }
];
