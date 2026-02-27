import type { Product, User } from "@/types";

export const ADMIN_EMAIL = "amirbehradkaz@gmail.com";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "هدفون بی‌سیم پریمیوم",
    description:
      "صدای کریستالی با هدفون بی‌سیم پریمیوم ما تجربه کنید. این هدفون با فناوری حذف نویز فعال (ANC) صدای محیط را حذف می‌کند تا شما بتوانید به موسیقی مورد علاقه‌تان تمرکز کنید. باتری قدرتمند ۳۰ ساعته امکان استفاده طولانی مدت را فراهم می‌کند. کوشن‌های گوشی از مواد مموری فوم نرم پوشیده شده‌اند که راحتی فوق‌العاده‌ای را در استفاده طولانی تضمین می‌کند.",
    price: 15000000,
    originalPrice: 20000000,
    category: "الکترونیک",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=500&q=80",
    ],
    stock: 45,
    rating: 4.8,
    reviewCount: 234,
    tags: ["بی‌سیم", "حذف نویز", "پریمیوم", "هدفون"],
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "ساعت چرمی مینیمالیست",
    description:
      "ساعت ظریف ساخته‌شده از چرم اصل ایتالیایی. این ساعت با طراحی مینیمالیستی و شیک، مناسب برای تمامی موقعیت‌هاست. شیشه کریستال یاقوت مقاوم در برابر خط و خش، مقاومت در برابر آب تا ۵۰ متر، و موتور با دقت بالا از ویژگی‌های برجسته این ساعت هستند. بند چرمی از چرم طبیعی گاو ساخته شده که با گذشت زمان زیباتر می‌شود.",
    price: 9500000,
    originalPrice: 12500000,
    category: "اکسسوری",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80",
    ],
    stock: 28,
    rating: 4.6,
    reviewCount: 156,
    tags: ["چرم", "مینیمالیست", "لوکس"],
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "3",
    name: "ردیاب هوشمند تناسب اندام",
    description:
      "معیارهای سلامتی خود را با دقت دنبال کنید. این ردیاب هوشمند با صفحه نمایش AMOLED و فناوری‌های پیشرفته، همراهی ایده‌آل برای سلامتی شما است. مانیتورینگ ضربانقلب به صورت ۲۴ ساعته، ردیابی کیفیت خواب، GPS داخلی برای ردیابی مسیر دویدن و دوچرخه‌سواری، و باتری ۷ روزه از ویژگی‌های برجسته این دستگاه هستند. همچنین مقاوم در برابر آب تا ۵۰ متر می‌باشد.",
    price: 7500000,
    originalPrice: 10000000,
    category: "الکترونیک",
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80",
      "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=500&q=80",
    ],
    stock: 67,
    rating: 4.5,
    reviewCount: 389,
    tags: ["تناسب اندام", "سلامت", "هوشمند"],
    createdAt: "2024-02-01T10:00:00Z",
  },
  {
    id: "4",
    name: "قهوه‌ساز حرفه‌ای",
    description:
      "قهوه با کیفیت کافه در خانه دم کنید. تنظیمات قابل برنامه‌ریزی، آسیاب داخلی و کارافه حرارتی.",
    price: 12500000,
    originalPrice: 16500000,
    category: "خانه و آشپزخانه",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80",
    stock: 19,
    rating: 4.7,
    reviewCount: 178,
    tags: ["قهوه", "آشپزخانه", "پریمیوم"],
    createdAt: "2024-02-10T10:00:00Z",
  },
  {
    id: "5",
    name: "کفش دویدن فوق‌سبک",
    description:
      "طراحی‌شده برای عملکرد. صفحه فیبر کربن، فوم واکنش‌پذیر و رویه مش تنفسی برای حداکثر سرعت.",
    price: 9000000,
    originalPrice: 11500000,
    category: "ورزشی",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    stock: 52,
    rating: 4.9,
    reviewCount: 512,
    tags: ["دویدن", "عملکرد", "سبک"],
    createdAt: "2024-02-15T10:00:00Z",
  },
  {
    id: "6",
    name: "اسپیکر بلوتوث قابل حمل",
    description:
      "صدای ۳۶۰ درجه در طراحی فشرده. ضدآب IPX7، ۲۴ ساعت پخش و میکروفون داخلی.",
    price: 4500000,
    originalPrice: 6000000,
    category: "الکترونیک",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    stock: 83,
    rating: 4.4,
    reviewCount: 267,
    tags: ["بلوتوث", "قابل حمل", "ضدآب"],
    createdAt: "2024-02-20T10:00:00Z",
  },
  {
    id: "12",
    name: "بطری آب استیل ضدزنگ",
    description:
      "عایق خلاء دو جداره. نوشیدنی‌ها را ۲۴ ساعت سرد یا ۱۲ ساعت گرم نگه می‌دارد. بدون BPA، درب ضدنشت، ظرفیت ۹۵۰ میلی‌لیتر.",
    price: 1750000,
    originalPrice: 2500000,
    category: "ورزشی",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
    stock: 120,
    rating: 4.7,
    reviewCount: 891,
    tags: ["بطری آب", "عایق", "سازگار با محیط زیست"],
    createdAt: "2024-03-18T10:00:00Z",
  },
  {
    id: "13",
    name: "مجموعه عطر لوکس",
    description:
      "ست ۳ عطر پریمیوم الهام‌گرفته از مقاصد اگزوتیک. ماندگاری ۱۲ ساعته با بطری‌های شیشه‌ای ظریف.",
    price: 10000000,
    originalPrice: 13500000,
    category: "زیبایی",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=500&q=80",
    stock: 41,
    rating: 4.8,
    reviewCount: 167,
    tags: ["عطر", "لوکس", "خوشبو"],
    createdAt: "2024-03-20T10:00:00Z",
  },
  {
    id: "14",
    name: "ست ظروف سرامیکی",
    description:
      "ست ۱۰ تکه ظروف سرامیکی نچسب. بدون PFOA، مقاوم در فر تا ۲۳۰ درجه، ماشین ظرفشویی و القایی.",
    price: 9500000,
    originalPrice: 12500000,
    category: "خانه و آشپزخانه",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80",
    stock: 27,
    rating: 4.5,
    reviewCount: 234,
    tags: ["ظروف", "سرامیک", "نچسب", "آشپزخانه"],
    createdAt: "2024-03-22T10:00:00Z",
  },
  {
    id: "15",
    name: "پد شارژ بی‌سیم",
    description:
      "شارژر بی‌سیم سریع ۱۵ واتی سازگار با تمام دستگاه‌های Qi. طراحی نازک، نشانگر LED و سطح ضدلغزش.",
    price: 2000000,
    originalPrice: 3000000,
    category: "الکترونیک",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&q=80",
    stock: 76,
    rating: 4.3,
    reviewCount: 512,
    tags: ["بی‌سیم", "شارژر", "Qi", "شارژ سریع"],
    createdAt: "2024-03-25T10:00:00Z",
  },
  {
    id: "16",
    name: "کیف چرمی دوشی",
    description:
      "کیف دوشی چرم اصل دست‌دوز. چندین جیب، بند قابل تنظیم و یراق‌آلات طلایی.",
    price: 8000000,
    originalPrice: 11000000,
    category: "اکسسوری",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
    stock: 33,
    rating: 4.7,
    reviewCount: 289,
    tags: ["چرم", "کیف", "دوشی", "مد"],
    createdAt: "2024-03-28T10:00:00Z",
  },
  {
    id: "17",
    name: "هاب خانه هوشمند",
    description:
      "تمام دستگاه‌های هوشمند خود را از یک جا کنترل کنید. سازگار با Alexa، Google Home و Apple HomeKit. کنترل صوتی.",
    price: 6000000,
    originalPrice: 8000000,
    category: "الکترونیک",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    stock: 44,
    rating: 4.4,
    reviewCount: 378,
    tags: ["خانه هوشمند", "هاب", "کنترل صوتی", "IoT"],
    createdAt: "2024-04-01T10:00:00Z",
  },
  {
    id: "18",
    name: "جاکاغذی بامبو",
    description:
      "جاکاغذی بامبو سازگار با محیط زیست با ۶ بخش. فضای کاری شما را مرتب و شیک نگه می‌دارد. رنگ طبیعی.",
    price: 2250000,
    originalPrice: 3200000,
    category: "مبلمان",
    image:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80",
    stock: 68,
    rating: 4.5,
    reviewCount: 156,
    tags: ["بامبو", "میز", "سازمان‌دهنده", "سازگار با محیط زیست"],
    createdAt: "2024-04-03T10:00:00Z",
  },
  {
    id: "19",
    name: "سرم ویتامین C",
    description:
      "سرم روشن‌کننده ۲۰٪ ویتامین C با هیالورونیک اسید و ویتامین E. لک‌های تیره را کاهش می‌دهد و تولید کلاژن را تقویت می‌کند.",
    price: 2500000,
    originalPrice: 3500000,
    category: "زیبایی",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80",
    stock: 89,
    rating: 4.6,
    reviewCount: 734,
    tags: ["ویتامین C", "سرم", "روشن‌کننده", "مراقبت پوست"],
    createdAt: "2024-04-05T10:00:00Z",
  },
  {
    id: "20",
    name: "ست کش مقاومتی",
    description:
      "ست ۵ کش مقاومتی با سطوح کشش مختلف. شامل لنگر در، دستگیره و بند مچ پا. ایده‌آل برای تمرین در خانه.",
    price: 1500000,
    originalPrice: 2250000,
    category: "ورزشی",
    image:
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&q=80",
    stock: 143,
    rating: 4.4,
    reviewCount: 967,
    tags: ["کش مقاومتی", "تمرین", "باشگاه خانگی", "تناسب اندام"],
    createdAt: "2024-04-08T10:00:00Z",
  },
  {
    id: "21",
    name: "ایربادز حذف نویز",
    description:
      "ایربادز بی‌سیم واقعی با حذف نویز فعال. باتری ۸ ساعته + کیس شارژ ۲۴ ساعته، مقاوم در برابر آب IPX5.",
    price: 9000000,
    originalPrice: 11500000,
    category: "الکترونیک",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
    stock: 61,
    rating: 4.7,
    reviewCount: 823,
    tags: ["ایربادز", "بی‌سیم", "حذف نویز", "ANC"],
    createdAt: "2024-04-10T10:00:00Z",
  },
  {
    id: "22",
    name: "ست شمع معطر",
    description:
      "ست ۴ شمع موم سویا لوکس با عطرهای روغن اساسی. هر کدام ۴۰ ساعت می‌سوزند. بسته‌بندی هدیه ظریف.",
    price: 2750000,
    originalPrice: 3750000,
    category: "خانه و آشپزخانه",
    image:
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=500&q=80",
    stock: 72,
    rating: 4.8,
    reviewCount: 412,
    tags: ["شمع", "موم سویا", "آروماتراپی", "هدیه"],
    createdAt: "2024-04-12T10:00:00Z",
  },
  {
    id: "23",
    name: "عینک آفتابی پلاریزه",
    description:
      "لنزهای پلاریزه UV400 با قاب تیتانیوم سبک. کاهش تابش و خستگی چشم. شامل جلد سخت و دستمال تمیزکننده.",
    price: 6000000,
    originalPrice: 8000000,
    category: "اکسسوری",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
    stock: 47,
    rating: 4.5,
    reviewCount: 298,
    tags: ["عینک آفتابی", "پلاریزه", "UV400", "مد"],
    createdAt: "2024-04-15T10:00:00Z",
  },
  {
    id: "24",
    name: "میز ایستاده برقی",
    description:
      "میز ایستاده برقی با ارتفاع قابل تنظیم. موتور دوگانه، حافظه پیش‌تنظیم، فناوری ضدتصادم. سطح ۱۴۰x۷۰ سانتی‌متر.",
    price: 35000000,
    originalPrice: 45000000,
    category: "مبلمان",
    image:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80",
    stock: 8,
    rating: 4.9,
    reviewCount: 187,
    tags: ["میز ایستاده", "ارگونومیک", "برقی", "اداری"],
    createdAt: "2024-04-18T10:00:00Z",
  },
  {
    id: "25",
    name: "پودر پروتئین ترکیبی",
    description:
      "۲۵ گرم پروتئین در هر وعده با تمام آمینواسیدهای ضروری. ترکیب وی ایزوله، کم‌قند، در ۵ طعم. ظرف ۹۰۰ گرمی.",
    price: 2750000,
    originalPrice: 3750000,
    category: "ورزشی",
    image:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&q=80",
    stock: 98,
    rating: 4.5,
    reviewCount: 1243,
    tags: ["پروتئین", "مکمل", "تناسب اندام", "تغذیه"],
    createdAt: "2024-04-20T10:00:00Z",
  },
  {
    id: "34",
    name: "میز قهوه‌خوری مرمری",
    description:
      "میز قهوه‌خوری مدرن با رویه مرمر اصل و پایه‌های فولادی طلایی. سطح ۱۲۰x۶۰ سانتی‌متر، مونتاژ آسان.",
    price: 20000000,
    originalPrice: 26500000,
    category: "مبلمان",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
    stock: 9,
    rating: 4.6,
    reviewCount: 134,
    tags: ["میز قهوه‌خوری", "مرمر", "مدرن", "مبلمان"],
    createdAt: "2024-05-12T10:00:00Z",
  },
  {
    id: "35",
    name: "مسواک برقی حرفه‌ای",
    description:
      "مسواک برقی سونیک با ۵ حالت تمیزکاری، سنسور فشار و تایمر ۲ دقیقه‌ای. عمر باتری ۳ هفته.",
    price: 5000000,
    originalPrice: 7000000,
    category: "زیبایی",
    image:
      "https://images.unsplash.com/photo-1559591937-abc3e3e3e3e3?w=500&q=80",
    stock: 87,
    rating: 4.7,
    reviewCount: 1089,
    tags: ["مسواک", "برقی", "بهداشت دهان", "سونیک"],
    createdAt: "2024-05-15T10:00:00Z",
  },
];

export const mockUsers: User[] = [
  {
    id: "admin-1",
    name: "امیربهراد کاظمی",
    email: "amirbehradkaz@gmail.com",
    password: "admin123",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amirbehrad",
  },
  {
    id: "user-1",
    name: "سارا جانسون",
    email: "sarah@example.com",
    password: "user123",
    role: "user",
    createdAt: "2024-01-10T00:00:00Z",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
  {
    id: "user-2",
    name: "مایکل چن",
    email: "michael@example.com",
    password: "user123",
    role: "user",
    createdAt: "2024-01-15T00:00:00Z",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
  },
  {
    id: "user-3",
    name: "اما ویلسون",
    email: "emma@example.com",
    password: "user123",
    role: "user",
    createdAt: "2024-02-01T00:00:00Z",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
  },
];

export const categories = [
  "همه",
  "الکترونیک",
  "اکسسوری",
  "خانه و آشپزخانه",
  "ورزشی",
  "زیبایی",
  "مبلمان",
];
