"use client";

import { useState, useEffect } from "react";
import dealData from "../deal-page-data.json";

function stripHtml(text: string) {
  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [hotelImgIdx, setHotelImgIdx] = useState(0);

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [yourMessage, setYourMessage] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const heroImages = dealData.heroImages ?? [];
  const overviewImages = dealData.overview?.images ?? [];

  const rawData: any = dealData;
  const hotelSource =
    rawData.hotel ?? rawData.accommodation ?? rawData.hotels?.[0] ?? {};

  const jsonHotelImages: string[] = Array.isArray(hotelSource?.images)
    ? hotelSource.images
        .map((img: any) =>
          typeof img === "string" ? img : img?.path || img?.url || ""
        )
        .filter(Boolean)
    : [];

  const hotelImages =
    jsonHotelImages.length > 0
      ? jsonHotelImages
      : [
          "https://cdn.techneapp-staging.site/deals/1037/overview/5d3d254b-2d11-4d48-94e0-fc941b840347.jpg",
          "https://cdn.techneapp-staging.site/deals/1037/overview/0a7ae6b5-27a0-49a0-b5e0-8f1a449843a3.jpg",
          "https://cdn.techneapp-staging.site/deals/1037/overview/243a3612-c6c2-4262-a303-9ed5c40b24dc.jpg",
          "https://cdn.techneapp-staging.site/destinations/technesection/site/image/cdd9edd2-d7b6-45e6-aee4-19af13799fd5.jpg",
          ...overviewImages.map((img) => img.path).filter(Boolean),
        ].slice(0, 7);

  const dealDestinationObj = Array.isArray(rawData.dealDestinations)
    ? rawData.dealDestinations[0]?.destination
    : null;

  const bucharestBannerImage =
    dealDestinationObj?.image?.path ||
    dealDestinationObj?.image?.url ||
    (typeof dealDestinationObj?.image === "string"
      ? dealDestinationObj.image
      : "") ||
    "https://cdn.techneapp-staging.site/destinations/48/image/19a506da-ebba-4e3b-bd35-87c04414e2d4.jpg";

  const bucharestBannerAlt =
    dealDestinationObj?.image?.alt ||
    dealDestinationObj?.title ||
    dealDestinationObj?.name ||
    "Bucharest night skyline";

  const glimpseImage =
    "/images/e3186e93f233efae7f920b93e6f791d1.jpg" ||
    overviewImages[0]?.path ||
    rawData.glimpse?.image ||
    heroImages[0]?.path;

  const seasonsImage = "/images/b2b7d31002926a362ce3ca0f11cd0e3c.jpg";

  const discoverMoreImage =
    "/images/243a3612-c6c2-4262-a303-9ed5c40b24dc.jpg";

  const cultureImage = "/images/Bucharest.jpg";

  const excursionBannerImage =
    "/images/default-excursions.webp" ||
    rawData.excursionsBanner?.path ||
    rawData.excursionsBanner?.url ||
    (typeof rawData.excursionsBanner === "string"
      ? rawData.excursionsBanner
      : "") ||
    rawData.excursionsImage?.path ||
    rawData.excursionsImage?.url ||
    (typeof rawData.excursionsImage === "string"
      ? rawData.excursionsImage
      : "") ||
    overviewImages[0]?.path ||
    heroImages[0]?.path;

  const paymentPlanImage = "/images/lcv-payment.webp";

  // Hero slider timer
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroImages.length);
    }, 1000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const activeHotelIdx =
    hotelImages.length > 0 ? hotelImgIdx % hotelImages.length : 0;

  function goToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function openEnquiryForm() {
    if (isSubmitted) {
      resetForm();
    }

    goToSection("enquire");

    setTimeout(() => {
      const input = document.getElementById(
        "enquiry-fullname"
      ) as HTMLInputElement | null;
      if (input) {
        input.focus();
      }
    }, 350);
  }

  function handleFormSubmit(e: any) {
    e.preventDefault();

    let isValid = true;
    setNameError("");
    setEmailError("");
    setMessageError("");

    if (!fullName.trim()) {
      setNameError("Please enter your name.");
      isValid = false;
    }

    if (
      !emailAddress.trim() ||
      !emailAddress.includes("@") ||
      !emailAddress.includes(".")
    ) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!yourMessage.trim()) {
      setMessageError("Please enter your message.");
      isValid = false;
    }

    if (isValid) {
      setIsSubmitted(true);
    }
  }

  function resetForm() {
    setFullName("");
    setEmailAddress("");
    setYourMessage("");
    setNameError("");
    setEmailError("");
    setMessageError("");
    setIsSubmitted(false);
  }

  function changeHotelSlide(step: number) {
    if (hotelImages.length === 0) return;
    const nextIdx =
      (activeHotelIdx + step + hotelImages.length) % hotelImages.length;
    setHotelImgIdx(nextIdx);
  }

  const nearbyRestaurants = [
    "Pergola Cotroceni",
    "Bocca Lupo",
    "Derby",
  ];

  const nearbyAttractions = [
    "The Stairs of Happiness",
    "The Zodiac Fountain",
    "Palace of Parliament",
  ];

  const itineraryPhotos = [
    "/images/images.jpg",
    "/images/image_processing20190112-4-12h4n56.jpg",
    "/images/images (1).jpg",
    "/images/bucharest-romania-top-view-above-amazing-city-landscape-summer-sunnset-bucharest-top-view-above-201140787.webp",
  ];

  const keyAmenities = [
    "Free parking",
    "Free Internet (WiFi)",
    "Restaurant",
    "Free breakfast",
    "Bar / lounge",
    "Shuttle bus service",
  ];

  const locationDetails = [
    "Bucharest, Romania",
    "Europe",
    "3 Nights",
  ];

  const bucharestParagraphs = [
    "Romania's capital, Bucharest, is rich with a legendary history that combines with its present character.",
    'It was formerly known as "Little Paris" for its magnificent architecture. The architectural collision is both perplexing and exciting.',
    "Its Byzantine structures, 16th, 17th, and 18th-century churches, Art Nouveau palaces, and stunning Neoclassical façade have weathered earthquakes, wars, and communism.",
    "Sombre block panel masonry and tyrant Nicolae Ceausescu's favourite creation, the Palace of the Parliament, left their impression throughout that terrible political era.",
    "Exploring Bucharest's colossal city parks, enjoying the works of art and exhibits at its outstanding museums, and getting lost in the dirty yet lovely streets that thread through the Old Town reveal the city's beauty.",
    "A journey down Calea Victoriei, perhaps one of the city's most beautiful streets, is a chance to see some of the country's most important structures and monuments, all of which bear witness to bygone eras.",
    "Exploring Bucharest entails delving into a complicated past that gives way to a modern sense as a thriving European centre.",
  ];

  const bucharestFacts = [
    { label: "Capital", value: "Bucharest" },
    {
      label: "International Airport",
      value: "Henri Coandă\nInternational Airport",
    },
    { label: "Population", value: "1,794,000" },
    { label: "Currency", value: "Romanian leu" },
    { label: "Time", value: "UTC+2" },
    { label: "Driving side", value: "Right" },
    { label: "Main electricity", value: "230V" },
    { label: "Official Language", value: "Romanian" },
    { label: "Religion", value: "Romanian Orthodox" },
  ];

  const seasonsParagraphs = [
    "Many people believe that spring is the best time to visit Bucharest.",
    "The parks are lush with flowers, birds chirp joyfully, and warm and pleasant weather.",
    "If you visit the city during one of these months, you'll get the best of both worlds.",
    "However, if you enjoy meeting people and seeing the city in its most valid form, avoid visiting on May 1st.",
    "Most Romanians go on holiday to the countryside during this time, and Bucharest becomes a ghost town.",
  ];

  const worthAVisitItems = [
    {
      title: "Palace of Parliament",
      image: "/images/2f185390a42a879574909032886ced0c.jpg",
      paragraphs: [
        "The Palace of Parliament is the world's second-largest administrative facility after the Pentagon.",
        "The vast and luxurious tower, which was Nicolae Ceausescu's idea, began construction in 1984. It has not, however, been completed to this day.",
        "The neoclassical structure, which has over 3,000 rooms, serves as a reminder to Romanians of the communist era's excesses, primarily since it was constructed when most of the country's population was impoverished.",
        "Because this is one of Bucharest's most famous tourist destinations, travellers are advised to purchase tickets in advance.",
      ],
    },
    {
      title: "Stavropoleos Church",
      image: "/images/a331a83408557162d453a741430902ff.jpg",
      paragraphs: [
        "Stavropoleos Church, erected in 1724 and located in the Old City, is a tiny, charming church.",
        "It is recognised for its exquisite carved doors and unique Brancovan architectural style.",
        "Lord Nicolae Mavrocordat's throne is among the fascinating antiquities in Stavropoleos Church.",
        "The church was once part of an inn and had a monastery attached to it, but the late 1800s razed both.",
        "This church is also one of the few churches in Bucharest's Old Town to have survived the 1847 Great Fire, which destroyed many of the city.",
      ],
    },
    {
      title: "Village Museum",
      image: "/images/6d0ac25d7397e943a0e813aab56f93d7.jpg",
      paragraphs: [
        "This open-air museum, located on Lake Herastrau, is home to hundreds of historic houses, farms, and other structures that have been relocated from their original places throughout Romania and rebuilt on this site.",
        "The Dimitrie Gusti National Village Museum was founded in 1936, and the majority of the buildings come from the mid-nineteenth century.",
        "However, there are a few that are even older. Some constructions in Berbesti, a region in the centre of Romania, dating back to 1775, for example.",
        "Anyone who will not have the opportunity to travel outside of Bucharest to view the Romanian countryside should visit the Village Museum.",
      ],
    },
  ];

  const discoverMoreParagraphs = [
    "The George Enescu Philharmonic Orchestra is housed in this magnificent neoclassical domed tower, which debuted in 1888 and is one of Romania's most well-known attractions.",
    "It's also one of Romania's largest international cultural event venues, the George Enescu Music Festival, every two years.",
    "The Romanian Athenaeum seats about 800 people, and the interior circular wall is covered with a mural depicting significant events in Romanian history.",
    "Travellers should try to get seats for a performance here if feasible, but even if that isn't possible, they should visit the building and its magnificent gardens.",
  ];

  const cultureParagraphs = [
    "The most fantastic thing about Bucharest is that it has yet to establish itself as a tourist destination.",
    "A vibrant metropolis vying for attention with the rest of Europe, luring interested visitors with an air of unknown intrigue that well-trodden tourism magnets like Rome, Madrid, and London haven't been able to match since charter flights were a novelty.",
    'It\'s one of those "go-now" destinations, a city that rewards you with bragging rights for discovering it before everyone else.',
    "This metropolitan sprawl, home to about two million people, is a painting of historical traces and is culturally rich in a unique way.",
    "Bucharest's past — its tremendous and less illustrious faces — is seen everywhere.",
  ];

  const excursionsList = [
    {
      title: "Dracula's Castle, Peleş Castle & Braşov Day Trip",
      description:
        "Explore the famous castles and historic city of Braşov in Transylvania.",
      price: "£38",
      image: "/images/download.jpg",
    },
    {
      title: "2-Hour City Highlights Bike Tour",
      description:
        "Discover Bucharest's famous landmarks and city streets on a guided bicycle tour.",
      price: "£27",
      image: "/images/Bucharest evening.jpg",
    },
    {
      title: "Parliament Palace Skip-the-Line Ticket",
      description:
        "Visit the impressive Palace of Parliament with priority entrance access.",
      price: "£19",
      image: "/images/34c8fa2901d87d32a2f5fe79acaede89.jpg",
    },
    {
      title: "Bucharest City Tour and Wine Tasting",
      description:
        "Combine sightseeing in Bucharest with a local wine tasting experience.",
      price: "£70",
      image: "/images/Travel Romania - where to stay in Bucharest Romania.jpg",
    },
    {
      title: "Charm of the Belle Époque Private Tour",
      description:
        "Discover Bucharest's elegant historic architecture and Belle Époque heritage.",
      price: "£58",
      image: "/images/📍The National Museum of Art of Romania.jpg",
    },
    {
      title: "Pub Crawl in the Old Town",
      description:
        "Experience Bucharest nightlife and explore historic Old Town pubs.",
      price: "£24",
      image: "/images/Lively scene in the heart of Old Town Bucharest ❤️.jpg",
    },
    {
      title: "Cotroceni Palace Entry Ticket and Guided Tour",
      description:
        "Discover the history and architecture of Cotroceni Palace with a guided visit.",
      price: "£30",
      image:
        "/images/Muzeul Național Cotroceni, situat in Palatul Cotroceni din Bucuresti, Romania.jpg",
    },
    {
      title: "Small Group Day Trip to Medieval Bulgaria",
      description:
        "Explore historic medieval attractions in Bulgaria on a small group day trip.",
      price: "£59",
      image: "/images/Plovdiv, Bulgaria.jpg",
    },
    {
      title: "Therme Bucureşti Admission and Transfers",
      description:
        "Enjoy a relaxing visit to Therme Bucharest with admission and transfers.",
      price: "£52",
      image:
        "/images/Therme Bucharest_ Everything You Need To Know Before Visiting - Jess Eats The World.jpg",
    },
  ];

  const finePrintCards = [
    {
      title: "Booking & Pricing",
      items: [
        "Price based on two people sharing a room.",
        "Bed and Breakfast basis.",
        "Hand luggage only; extra luggage may incur supplements.",
        "Rates may vary depending on dates and availability.",
        "Tourist and city taxes are not included.",
      ],
    },
    {
      title: "Flights & Travel",
      items: [
        "Lowest price based on flights from London airports.",
        "Supplements may apply for alternative airports.",
        "Inbound flights: 8am - 11.45pm",
        "Outbound flights: 06am - 4.30pm",
      ],
    },
    {
      title: "Important Requirements",
      items: [
        "Passenger names must match passports.",
        "At least one traveller must be 18 or older.",
        "Inform the company about medical conditions or reduced mobility before booking.",
        "Notify the company if passport details change after reservation.",
      ],
    },
    {
      title: "Protection & Documents",
      items: [
        "The holiday is financially protected under ATOL.",
        "Travel documents will be delivered no later than 10 days before departure.",
        "The offer is subject to the agency's booking terms.",
      ],
    },
  ];

  const faqItems = [
    {
      number: "01.",
      question:
        "What is included in the Mysterious Vibes in Transylvania holiday package?",
      answer:
        "This holiday package includes return flights from London, a 3-night stay at the 4-star Parliament Hotel in Bucharest with breakfast, and a complimentary Transylvania day trip.",
    },
    {
      number: "02.",
      question: "Can I fly from an airport outside London?",
      answer:
        "Yes! Flights from regional UK airports are available upon request. Additional charges may apply depending on your preferred departure airport, travel dates, and availability.",
    },
    {
      number: "03.",
      question: "Will I get to visit Dracula's Castle during this holiday?",
      answer:
        "The suggested itinerary features Bran Castle, famously known as Dracula's Castle, along with Peleş Castle and the historic city of Braşov. Please confirm the exact tour stops and any entrance fees with our travel experts before booking.",
    },
    {
      number: "04.",
      question: "Where will I stay during my Bucharest holiday?",
      answer:
        "You will enjoy a 3-night stay at the 4-star Parliament Hotel in Bucharest. The hotel offers comfortable accommodation, WiFi, dining facilities, and convenient access to attractions such as the Palace of Parliament.",
    },
    {
      number: "05.",
      question: "Can I pay for my Transylvania holiday in instalments?",
      answer:
        "Yes! An initial deposit of 25% of the total holiday cost is required, with the remaining balance payable through agreed monthly instalments. The final 35% must be paid six weeks before departure.",
    },
  ];

  const travellerReviews = [
    {
      quote:
        '"Everything was well organized, from the flights to the hotel. Transylvania was beautiful, and the trip was truly memorable."',
      name: "Sarah M.",
      avatar: "/images/jkjkjk.jpg",
      rating: 4,
    },
    {
      quote:
        '"The hotel was comfortable, and exploring Bucharest was a wonderful experience. I loved discovering the history and culture of Romania."',
      name: "James R.",
      avatar: "/images/aesthetic boy amazing look 😃😄.jpg",
      rating: 4,
    },
    {
      quote:
        '"A lovely holiday at a great price. The itinerary gave us a chance to explore beautiful places and enjoy a relaxing break."',
      name: "Emily T.",
      avatar: "/images/AI.jpg",
      rating: 4,
    },
  ];

  return (
    <div
      id="top"
      className="min-h-screen overflow-x-hidden bg-white text-[#0B1120] font-sans antialiased"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-[#070B34] text-white border-b border-white/10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-2 px-3 py-3 sm:px-4 md:px-16 md:py-4">
          <a href="#top" className="shrink-0 flex items-center">
            <img
              src="/images/logo-blue.png"
              alt="Lowcost Vibes - Good Vibes Only"
              className="h-5 sm:h-7 md:h-8 w-auto object-contain"
            />
          </a>

          <nav className="flex items-center gap-2 sm:gap-4 md:gap-8 text-[10px] sm:text-xs md:text-sm font-medium text-white/95">
            <button
              type="button"
              onClick={() => goToSection("highlights")}
              className="hover:text-[#F97316] transition whitespace-nowrap cursor-pointer"
            >
              Holidays
            </button>
            <button
              type="button"
              onClick={() => goToSection("bucharest")}
              className="hover:text-[#F97316] transition whitespace-nowrap cursor-pointer"
            >
              Destinations
            </button>
            <button
              type="button"
              onClick={() => goToSection("excursions")}
              className="hover:text-[#F97316] transition whitespace-nowrap cursor-pointer"
            >
              Deals
            </button>
            <button
              type="button"
              onClick={() => goToSection("overview")}
              className="hidden sm:inline-block hover:text-[#F97316] transition whitespace-nowrap cursor-pointer"
            >
              Overview
            </button>
            <button
              type="button"
              onClick={openEnquiryForm}
              className="hidden sm:inline-block hover:text-[#F97316] transition whitespace-nowrap cursor-pointer"
            >
              Contact
            </button>
          </nav>

          <button
            type="button"
            onClick={openEnquiryForm}
            className="shrink-0 rounded-full bg-[#F97316] px-3 py-1.5 text-[10px] sm:text-xs font-semibold text-white hover:bg-[#EA580C] active:scale-95 transition md:px-5 md:py-2 md:text-sm cursor-pointer"
          >
            Enquire Now
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative w-full min-h-[540px] sm:min-h-[620px] md:min-h-[680px] flex items-center text-white overflow-hidden">
        {heroImages[heroIdx]?.path && (
          <img
            src={heroImages[heroIdx].path}
            alt={dealData.title || "Mysterious Vibes in Transylvania"}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-[#070B34]/90 via-[#070B34]/65 to-black/25" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 py-10 md:px-16 md:py-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-1.5 text-xs md:text-sm font-bold uppercase tracking-wider text-[#F97316]">
              <span>📍</span>
              <span>ROMANIA · EUROPE</span>
            </div>

            <h1 className="mt-3 text-3xl sm:text-4xl md:text-[52px] font-extrabold uppercase leading-[1.08] tracking-tight text-white">
              {dealData.title}
            </h1>

            <p className="mt-4 text-base md:text-lg font-semibold text-[#F97316]">
              Discover the magic of Romania.
            </p>

            <p className="mt-1.5 text-sm md:text-[15px] leading-relaxed text-white/95 max-w-md">
              Explore Romania&apos;s beautiful castles, historic towns and breathtaking landscapes on a 4-day escape.
            </p>

            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-extrabold text-white">
                £{dealData.price}
              </span>
              <span className="text-xs md:text-sm font-medium text-white/90">
                Per Person
              </span>
            </div>

            <ul className="mt-4 space-y-2.5 text-xs md:text-sm text-white/95">
              <li className="flex items-center gap-2.5">
                <span className="text-sm">✈️</span>
                <span>Return flights from London</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-sm">🏨</span>
                <span>3 nights at Parliament Hotel, Bucharest (4★)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-sm">📍</span>
                <span>Complimentary Transylvania Day Trip</span>
              </li>
            </ul>

            <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 max-w-md sm:max-w-none">
              <button
                type="button"
                onClick={openEnquiryForm}
                className="w-full sm:w-auto rounded-lg bg-[#F97316] px-6 py-3 text-sm font-semibold text-white hover:bg-[#EA580C] transition text-center cursor-pointer"
              >
                Enquire Now
              </button>
              <button
                type="button"
                onClick={() => goToSection("itinerary")}
                className="w-full sm:w-auto rounded-lg bg-[#FDE8DC] px-6 py-3 text-sm font-semibold text-[#F97316] hover:bg-white transition text-center cursor-pointer"
              >
                Explore the Trip
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="bg-white py-12 sm:py-14 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-16">
          <div className="grid grid-cols-1 gap-8 lg:gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F97316]">
                DISCOVER ROMANIA
              </p>

              <h2 className="mt-2 text-2xl sm:text-3xl md:text-[38px] font-extrabold leading-[1.18] tracking-tight text-[#070B34]">
                A Journey Beyond the Ordinary
              </h2>

              <div
                className="mt-4 text-sm md:text-[15px] leading-7 sm:leading-[2.8] text-[#4B5563] [&_p]:mb-5 sm:[&_p]:mb-8 last:[&_p]:mb-0 [&_a]:text-[#F97316] [&_a]:font-medium [&_a]:underline-offset-2 hover:[&_a]:underline"
                dangerouslySetInnerHTML={{
                  __html: dealData.overview?.content || "",
                }}
              />
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {overviewImages.slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  className="group relative h-44 md:h-[172px] overflow-hidden rounded-2xl bg-gray-100 shadow-sm"
                >
                  <img
                    src={img.path}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}

              {overviewImages[4] && (
                <div className="group relative sm:col-span-2 h-48 md:h-[192px] overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                  <img
                    src={overviewImages[4].path}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights" className="bg-[#FAF8F5] py-14 sm:py-16 md:py-24">
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F97316]">
              YOUR HOLIDAY AT A GLANCE
            </p>
            <h2 className="mt-2.5 text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-[#070B34]">
              Holiday Highlights
            </h2>
            <p className="mt-2.5 text-sm sm:text-[15px] text-[#6B7280]">
              Everything you need for your Romanian getaway.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="rounded-2xl border border-[#F7C59F] bg-white p-6 sm:p-8 shadow-[0_2px_10px_rgba(249,115,22,0.03)]">
              <span className="text-xl">✈️</span>
              <h3 className="mt-4 text-lg font-bold text-[#070B34]">
                Return Flights
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">
                Return flights from London. Regional airports available upon request.
              </p>
            </div>

            <div className="rounded-2xl border border-[#F7C59F] bg-white p-6 sm:p-8 shadow-[0_2px_10px_rgba(249,115,22,0.03)]">
              <span className="text-xl">🏨</span>
              <h3 className="mt-4 text-lg font-bold text-[#070B34]">
                3-Night Stay
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">
                Stay at the 4-star Parliament Hotel in Bucharest.
              </p>
            </div>

            <div className="rounded-2xl border border-[#F7C59F] bg-white p-6 sm:p-8 shadow-[0_2px_10px_rgba(249,115,22,0.03)]">
              <span className="text-xl">📍</span>
              <h3 className="mt-4 text-lg font-bold text-[#070B34]">
                Complimentary Tour
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">
                Transylvania Day Trip from Bucharest.
              </p>
            </div>

            <div className="rounded-2xl border border-[#F7C59F] bg-white p-6 sm:p-8 shadow-[0_2px_10px_rgba(249,115,22,0.03)]">
              <span className="text-xl">🛡️</span>
              <h3 className="mt-4 text-lg font-bold text-[#070B34]">
                Financial Protection
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">
                Financially protected holiday package.
              </p>
            </div>

            <div className="rounded-2xl border border-[#F7C59F] bg-white p-6 sm:p-8 shadow-[0_2px_10px_rgba(249,115,22,0.03)]">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E5E7EB]">
                <span>🍽️</span>
                <h3 className="text-lg font-bold text-[#070B34]">
                  Nearby Restaurants
                </h3>
              </div>

              <ul className="mt-4 space-y-3">
                {nearbyRestaurants.map((place) => (
                  <li
                    key={place}
                    className="flex items-center gap-2.5 text-sm text-[#4B5563]"
                  >
                    <span className="text-[#F97316]">•</span>
                    <span>{place}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#F7C59F] bg-white p-6 sm:p-8 shadow-[0_2px_10px_rgba(249,115,22,0.03)]">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E5E7EB]">
                <span>🏛️</span>
                <h3 className="text-lg font-bold text-[#070B34]">
                  Nearby Attractions
                </h3>
              </div>

              <ul className="mt-4 space-y-3">
                {nearbyAttractions.map((spot) => (
                  <li
                    key={spot}
                    className="flex items-center gap-2.5 text-sm text-[#4B5563]"
                  >
                    <span className="text-[#F97316]">•</span>
                    <span>{spot}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section id="itinerary" className="bg-white py-14 sm:py-16 md:py-24">
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F97316]">
              YOUR JOURNEY
            </p>
            <h2 className="mt-2.5 text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-[#070B34]">
              Explore Your 4-Day Itinerary
            </h2>
            <p className="mt-2.5 text-sm sm:text-[15px] text-[#6B7280]">
              Discover the highlights of Romania, one day at a time.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 rounded-3xl bg-[#F7F5F2] p-4 sm:p-8 md:p-10 space-y-5">
            {(dealData.itineraries ?? []).map((item, idx) => {
              const paragraphs = item.content
                .split("</p>")
                .map((p) => stripHtml(p))
                .filter(Boolean);
              const dayTitle = paragraphs[0] || `Day ${item.day}`;
              const dayBody = paragraphs.slice(1);
              const photoSrc =
                itineraryPhotos[idx] ||
                overviewImages[idx]?.path ||
                heroImages[0]?.path;

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-stretch gap-5 sm:gap-6 rounded-2xl border border-[#F7C59F] bg-white p-5 sm:p-6 shadow-[0_2px_10px_rgba(249,115,22,0.03)]"
                >
                  <img
                    src={photoSrc}
                    alt={dayTitle}
                    className="w-full sm:w-48 md:w-56 h-48 sm:min-h-[210px] sm:h-auto shrink-0 rounded-xl object-cover"
                  />

                  <div className="flex-1 pt-0.5">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#F97316]">
                      DAY 0{item.day}
                    </p>
                    <h3 className="mt-1 text-lg sm:text-xl font-bold text-[#070B34]">
                      {dayTitle}
                    </h3>
                    <div className="mt-2.5 space-y-2 text-xs sm:text-sm leading-[1.75] text-[#6B7280]">
                      {dayBody.map((text, pIdx) => (
                        <p key={pIdx}>{text}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section id="accommodation" className="bg-[#FAF8F5] py-14 sm:py-16 md:py-24">
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F97316]">
              YOUR ACCOMMODATION
            </p>
            <h2 className="mt-2.5 text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-[#070B34]">
              Stay in Comfort
            </h2>
            <p className="mt-2.5 text-sm sm:text-[15px] text-[#6B7280]">
              Discover your home away from home in Bucharest.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-6">
              <div className="relative h-[300px] sm:h-[440px] md:h-[480px] w-full overflow-hidden rounded-2xl bg-gray-200 shadow-sm">
                <img
                  src={hotelImages[activeHotelIdx] || heroImages[0]?.path}
                  alt="Parliament Hotel Bucharest"
                  className="h-full w-full object-cover transition-all duration-500"
                />

                {hotelImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => changeHotelSlide(-1)}
                      aria-label="Previous hotel photo"
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111827] shadow-md hover:bg-gray-100 transition cursor-pointer"
                    >
                      &lt;
                    </button>

                    <button
                      type="button"
                      onClick={() => changeHotelSlide(1)}
                      aria-label="Next hotel photo"
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111827] shadow-md hover:bg-gray-100 transition cursor-pointer"
                    >
                      &gt;
                    </button>
                  </>
                )}
              </div>

              {hotelImages.length > 1 && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  {hotelImages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setHotelImgIdx(i)}
                      aria-label={`Hotel photo ${i + 1}`}
                      className={`h-2.5 w-2.5 rounded-full transition-colors cursor-pointer ${
                        activeHotelIdx === i ? "bg-[#070B34]" : "bg-[#D1D5DB]"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-6 pt-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#070B34]">
                Parliament Hotel
              </h3>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-[#FBBF24] text-sm">★★★★</span>
                <span className="text-xs sm:text-sm text-[#6B7280]">
                  4-Star Hotel
                </span>
              </div>

              <p className="mt-1.5 text-xs sm:text-sm text-[#6B7280]">
                Bucharest, Romania
              </p>

              <div className="mt-6">
                <h4 className="text-sm font-bold text-[#070B34]">
                  About the Hotel
                </h4>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#6B7280]">
                  The Parliament Hotel in Bucharest is a luxurious 4-star hotel that blends contemporary elegance with Romanian hospitality.
                </p>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-bold text-[#070B34]">
                  Key Amenities
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {keyAmenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-[#4B5563]"
                    >
                      <span className="text-[#070B34] font-bold">✓</span>
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex justify-stretch sm:justify-end">
                <button
                  type="button"
                  onClick={openEnquiryForm}
                  className="w-full sm:w-auto rounded-full bg-[#F97316] px-6 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-[#EA580C] transition shadow-sm cursor-pointer"
                >
                  Enquire About This Holiday
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Bucharest */}
      <section id="bucharest" className="bg-white py-14 sm:py-16 md:py-24">
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F97316]">
              EXPLORE ROMANIA
            </p>
            <h2 className="mt-2.5 text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-[#070B34]">
              Discover Bucharest
            </h2>
          </div>

          <div className="mt-10 relative min-h-[340px] sm:min-h-[420px] md:min-h-[450px] w-full overflow-hidden rounded-3xl bg-[#070B34] shadow-md flex items-center">
            <img
              src={bucharestBannerImage}
              alt={bucharestBannerAlt}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />

            <div className="relative z-10 max-w-md px-5 py-8 sm:px-10 md:px-12 text-white">
              <p className="text-xs sm:text-sm leading-relaxed text-white/95">
                Bucharest, the capital of Romania, is a city where fascinating history meets modern European life. Discover beautiful architecture, historic landmarks, charming streets and a rich cultural heritage during your stay.
              </p>

              <h3 className="mt-5 text-sm sm:text-base font-bold text-[#F97316]">
                Location Details
              </h3>

              <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-white/95">
                {locationDetails.map((detail) => (
                  <li key={detail} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-white shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Glimpse */}
      <section id="glimpse" className="bg-white py-14 sm:py-16 md:py-24">
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F97316]">
              GET TO KNOW THE CITY
            </p>
            <h2 className="mt-2.5 text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-[#070B34]">
              A Glimpse of Bucharest
            </h2>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-6">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F97316]">
                BUCHAREST AT A GLANCE
              </h3>

              <div className="mt-4 space-y-3.5 text-xs sm:text-[13.5px] leading-[1.72] text-[#6B7280]">
                {bucharestParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                <img
                  src={glimpseImage}
                  alt="Aerial view of Bucharest"
                  className="h-60 sm:h-[400px] md:h-[430px] w-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-14 max-w-xl mx-auto">
            <dl className="space-y-3 text-xs sm:text-sm">
              {bucharestFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-2 items-start gap-4 sm:gap-6 py-0.5"
                >
                  <dt className="text-right font-bold text-[#070B34]">
                    {fact.label}
                  </dt>
                  <dd className="text-left text-[#6B7280] whitespace-pre-line">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* City experiences */}
      <section
        id="experiences"
        className="bg-white py-14 sm:py-16 md:py-24 border-t border-gray-100"
      >
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F97316]">
              CITY EXPERIENCES
            </p>
            <h2 className="mt-2.5 text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-[#070B34]">
              Highlights of Bucharest
            </h2>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
            <div className="flex flex-col sm:flex-row items-stretch gap-5 rounded-2xl border border-[#F7C59F] bg-white p-5 sm:p-6 shadow-[0_2px_10px_rgba(249,115,22,0.02)]">
              <img
                src="/images/90e92f89e68f03e443cc8f2f0e73a17e.jpg"
                alt="Grigore Antipa Natural History Museum"
                className="w-full sm:w-36 md:w-40 h-44 sm:h-auto rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 pt-0.5">
                <h3 className="text-base font-extrabold text-[#070B34] leading-snug">
                  Grigore Antipa Natural History Museum
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] leading-[1.68] text-[#6B7280]">
                  The Grigore Antipa Natural History Museum, which opened in 1834, is a fascinating way for travellers with a hunger for information and families to spend a couple of hours in Bucharest.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-5 rounded-2xl border border-[#F7C59F] bg-white p-5 sm:p-6 shadow-[0_2px_10px_rgba(249,115,22,0.02)]">
              <img
                src="/images/Peaceful Park in Bucharest, Romania _ European Garden Aesthetic.jpg"
                alt="Peaceful City Gardens"
                className="w-full sm:w-36 md:w-40 h-44 sm:h-auto rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 pt-0.5">
                <h3 className="text-base font-extrabold text-[#070B34] leading-snug">
                  Peaceful City Gardens
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] leading-[1.68] text-[#6B7280]">
                  These gardens offer a tranquil respite from the city&apos;s hustle and bustle.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-5 rounded-2xl border border-[#F7C59F] bg-white p-5 sm:p-6 shadow-[0_2px_10px_rgba(249,115,22,0.02)]">
              <img
                src="/images/2f185390a42a879574909032886ced0c.jpg"
                alt="Palace of Parliament"
                className="w-full sm:w-36 md:w-40 h-44 sm:h-auto rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 pt-0.5">
                <h3 className="text-base font-extrabold text-[#070B34] leading-snug">
                  Palace of Parliament
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] leading-[1.68] text-[#6B7280]">
                  The Palace of Parliament is the second-largest administrative structure in the world.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-5 rounded-2xl border border-[#F7C59F] bg-white p-5 sm:p-6 shadow-[0_2px_10px_rgba(249,115,22,0.02)]">
              <img
                src="/images/a331a83408557162d453a741430902ff.jpg"
                alt="Stavropoleos Church"
                className="w-full sm:w-36 md:w-40 h-44 sm:h-auto rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 pt-0.5">
                <h3 className="text-base font-extrabold text-[#070B34] leading-snug">
                  Stavropoleos Church
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] leading-[1.68] text-[#6B7280]">
                  Lord Nicolae Mavrocordat&apos;s throne is among the fascinating antiquities in Stavropoleos Church.
                </p>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col sm:flex-row items-stretch gap-5 rounded-2xl border border-[#F7C59F] bg-white p-5 sm:p-6 shadow-[0_2px_10px_rgba(249,115,22,0.02)]">
              <img
                src="/images/eeab3e18eb22857967f2bf59db827d86.jpg"
                alt="Spring Palace"
                className="w-full sm:w-36 md:w-40 h-44 sm:h-auto rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 pt-0.5">
                <h3 className="text-base font-extrabold text-[#070B34] leading-snug">
                  Spring Palace
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] leading-[1.68] text-[#6B7280]">
                  The former residence of Romanian President Nicolae Ceausescu and his wife Elena, who was toppled during the Romanian Revolution, is the Spring Palace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seasons */}
      <section
        id="seasons"
        className="bg-white py-14 sm:py-16 md:py-24 border-t border-gray-100"
      >
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F97316]">
              PLAN YOUR VISIT
            </p>
            <h2 className="mt-2.5 text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-[#070B34]">
              Seasons to Travel
            </h2>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-5 space-y-4 text-xs sm:text-[13.5px] leading-[1.72] text-[#6B7280]">
              {seasonsParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                <img
                  src={seasonsImage}
                  alt="Seasons to travel in Bucharest"
                  className="h-56 sm:h-[360px] md:h-[390px] w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Landmarks */}
      <section
        id="landmarks"
        className="bg-white py-14 sm:py-16 md:py-24 border-t border-gray-100"
      >
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F97316]">
              EXPLORE THE LANDMARKS
            </p>
            <h2 className="mt-2.5 text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-[#070B34]">
              Worth a Visits to Travel
            </h2>
          </div>

          <div className="mt-10 sm:mt-12 space-y-6">
            {worthAVisitItems.map((landmark) => (
              <div
                key={landmark.title}
                className="flex flex-col sm:flex-row items-stretch gap-5 sm:gap-6 rounded-2xl border border-[#F7C59F] bg-white p-5 sm:p-6 shadow-[0_2px_10px_rgba(249,115,22,0.02)]"
              >
                <img
                  src={landmark.image}
                  alt={landmark.title}
                  className="w-full sm:w-44 md:w-52 h-48 sm:h-auto rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 pt-0.5">
                  <h3 className="text-lg sm:text-xl font-bold text-[#070B34]">
                    {landmark.title}
                  </h3>
                  <div className="mt-2 space-y-1.5 text-xs sm:text-[13px] leading-[1.68] text-[#6B7280]">
                    {landmark.paragraphs.map((text, pIdx) => (
                      <p key={pIdx}>{text}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover more */}
      <section
        id="discover-more"
        className="bg-white py-14 sm:py-16 md:py-24 border-t border-gray-100"
      >
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F97316]">
              MORE PLACES TO EXPLORE
            </p>
            <h2 className="mt-2.5 text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-[#070B34]">
              Discover More
            </h2>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-5">
              <h3 className="text-sm sm:text-base font-semibold text-[#F97316]">
                Romanian Athenaeum
              </h3>

              <div className="mt-4 space-y-4 text-xs sm:text-[13.5px] leading-[1.72] text-[#6B7280]">
                {discoverMoreParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                <img
                  src={discoverMoreImage}
                  alt="Romanian Athenaeum"
                  className="h-56 sm:h-[360px] md:h-[390px] w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section
        id="culture"
        className="bg-white py-14 sm:py-16 md:py-24 border-t border-gray-100"
      >
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F97316]">
              THE SPIRIT OF ROMANIA
            </p>
            <h2 className="mt-2.5 text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-[#070B34]">
              Culture &amp; Traditions
            </h2>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-5 space-y-4 text-xs sm:text-[13.5px] leading-[1.72] text-[#6B7280]">
              {cultureParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                <img
                  src={cultureImage}
                  alt="Culture and traditions in Bucharest"
                  className="h-56 sm:h-[360px] md:h-[390px] w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Excursions */}
      <section
        id="excursions"
        className="bg-[#FAF8F5] py-14 sm:py-16 md:py-24 border-t border-gray-100"
      >
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F97316]">
              MAKE YOUR TRIP SPECIAL
            </p>
            <h2 className="mt-2.5 text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-[#070B34]">
              Explore Excursions
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-[#6B7280]">
              Discover more of Romania with exciting tours, historic landmarks and unforgettable experiences.
            </p>
          </div>

          <div className="mt-10 h-44 sm:h-60 md:h-64 w-full overflow-hidden rounded-2xl bg-gray-200 shadow-sm">
            <img
              src={excursionBannerImage}
              alt="Explore Excursions in Romania"
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {excursionsList.map((excursion) => (
              <div
                key={excursion.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-[#F7C59F] bg-white shadow-[0_2px_10px_rgba(249,115,22,0.02)]"
              >
                <div className="h-40 sm:h-36 w-full overflow-hidden bg-gray-100">
                  <img
                    src={excursion.image}
                    alt={excursion.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#070B34] leading-snug">
                      {excursion.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#6B7280]">
                      {excursion.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-baseline gap-1">
                    <span className="text-sm font-extrabold text-[#F97316]">
                      {excursion.price}
                    </span>
                    <span className="text-[11px] text-[#6B7280]">
                      / person
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-white px-5 sm:px-6 py-5 shadow-sm border border-gray-100">
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#070B34]">
                Ready for More Adventures?
              </h3>
              <p className="mt-0.5 text-xs sm:text-sm text-[#6B7280]">
                Make your Romanian holiday even more memorable with exciting optional experiences.
              </p>
            </div>

            <button
              type="button"
              onClick={openEnquiryForm}
              className="w-full sm:w-auto shrink-0 rounded-full bg-[#F97316] px-6 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-[#EA580C] transition text-center cursor-pointer"
            >
              Enquire About Excursions
            </button>
          </div>
        </div>
      </section>

      {/* Payment plans */}
      <section
        id="payment-plans"
        className="bg-white py-14 sm:py-16 md:py-24 border-t border-gray-100"
      >
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F97316]">
              PAYMENT OPTIONS
            </p>
            <h2 className="mt-2.5 text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-[#070B34]">
              Flexible Payment Plans
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-[#6B7280]">
              Plan your holiday payments with Low Cost Vibes.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <h3 className="text-sm sm:text-base font-bold text-[#F97316]">
                Low Deposits
              </h3>
              <p className="mt-2 text-xs sm:text-[13.5px] leading-relaxed text-[#6B7280] max-w-sm">
                The first low deposit, due per person, will be presented at the time of booking.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                <img
                  src={paymentPlanImage}
                  alt="Supported payment methods"
                  className="h-48 sm:h-60 md:h-64 w-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <div className="rounded-2xl border border-[#F7C59F] bg-white p-6 sm:p-7 shadow-[0_2px_10px_rgba(249,115,22,0.02)]">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#F97316]">
                25%
              </p>
              <h3 className="mt-3 text-sm sm:text-base font-bold text-[#070B34]">
                Low Deposit
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#6B7280]">
                Initially, a 25% low deposit of the total holiday cost is required.
              </p>
            </div>

            <div className="rounded-2xl border border-[#F7C59F] bg-white p-6 sm:p-7 shadow-[0_2px_10px_rgba(249,115,22,0.02)]">
              <span className="text-2xl">📅</span>
              <h3 className="mt-3 text-sm sm:text-base font-bold text-[#070B34]">
                Monthly Payments
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#6B7280]">
                The balance is settled monthly at the time of booking, as agreed upon between the lead passenger and the travel consultant.
              </p>
            </div>

            <div className="rounded-2xl border border-[#F7C59F] bg-white p-6 sm:p-7 shadow-[0_2px_10px_rgba(249,115,22,0.02)]">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#F97316]">
                35%
              </p>
              <h3 className="mt-3 text-sm sm:text-base font-bold text-[#070B34]">
                Final Payment
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#6B7280]">
                The final 25% will be settled 6 weeks before departure.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#F7C59F] bg-white px-5 sm:px-6 py-4 text-center shadow-[0_2px_10px_rgba(249,115,22,0.02)]">
            <p className="text-xs sm:text-sm font-semibold text-[#F97316]">
              You can customise your payment plan by speaking to your Low Cost Vibes expert.
            </p>
          </div>
        </div>
      </section>

      {/* Fine print */}
      <section
        id="fine-print"
        className="bg-[#FAF8F5] py-14 sm:py-16 md:py-24 border-t border-gray-100"
      >
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F97316]">
              IMPORTANT INFORMATION
            </p>
            <h2 className="mt-2.5 text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-[#070B34]">
              The Fine Print
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-[#6B7280]">
              Please review the important details before booking your holiday.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {finePrintCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-[#F7C59F] bg-white p-6 sm:p-8 shadow-[0_2px_10px_rgba(249,115,22,0.02)]"
              >
                <h3 className="text-sm sm:text-base font-bold text-[#F97316]">
                  {card.title}
                </h3>

                <ul className="mt-4 space-y-2.5 text-xs sm:text-[13px] leading-relaxed text-[#4B5563]">
                  {card.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-[#4B5563] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="bg-white py-14 sm:py-16 md:py-24 border-t border-gray-100"
      >
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F97316]">
              NEED TO KNOW?
            </p>
            <h2 className="mt-2.5 text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-[#070B34]">
              Frequently Asked Questions
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-[#6B7280]">
              Everything you need to know before booking your Transylvania escape.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 space-y-4">
            {faqItems.map((faq) => (
              <div
                key={faq.number}
                className="rounded-2xl border border-[#F7C59F] bg-white px-5 py-5 sm:px-8 sm:py-6 shadow-[0_2px_10px_rgba(249,115,22,0.02)]"
              >
                <h3 className="text-sm sm:text-base font-bold text-[#F97316]">
                  {faq.number} {faq.question}
                </h3>
                <p className="mt-2 text-xs sm:text-[13.5px] leading-relaxed text-[#6B7280]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="bg-[#FAF8F5] py-14 sm:py-16 md:py-24 border-t border-gray-100"
      >
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-[#070B34]">
              What Our Travellers Say
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-[#6B7280]">
              Memorable journeys start with great experiences.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {travellerReviews.map((review) => (
              <div
                key={review.name}
                className="flex flex-col justify-between rounded-2xl border border-[#F7C59F] bg-white p-6 sm:p-7 shadow-[0_2px_10px_rgba(249,115,22,0.02)]"
              >
                <p className="text-xs sm:text-[13px] leading-[1.7] text-[#6B7280]">
                  {review.quote}
                </p>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="h-9 w-9 rounded-full object-cover shrink-0 bg-gray-100"
                    />
                    <span className="text-xs sm:text-sm font-bold text-[#F97316]">
                      {review.name}
                    </span>
                  </div>

                  <span className="text-xs text-[#FBBF24] shrink-0">
                    {"★".repeat(review.rating)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section
        id="enquire"
        className="scroll-mt-20 bg-white py-14 sm:py-16 md:py-24 border-t border-gray-100"
      >
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-[#070B34]">
              Ready for Your Transylvania Adventure?
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-[#6B7280]">
              Have questions about this holiday? Reach out to our friendly and knowledgeable travel experts for help.
            </p>
          </div>

          <div className="mt-10 max-w-4xl mx-auto">
            {isSubmitted ? (
              <div className="rounded-2xl bg-[#FAF8F5] px-6 py-12 sm:px-10 sm:py-14 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A] text-2xl font-bold">
                  ✓
                </div>

                <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold text-[#070B34]">
                  Thank You!
                </h3>

                <p className="mt-2 text-xs sm:text-sm font-semibold text-[#16A34A]">
                  Your enquiry has been received.
                </p>

                <p className="mt-1.5 text-xs sm:text-[13px] text-[#6B7280]">
                  Our team will be in touch to assist you with your Transylvania holiday.
                </p>

                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-7 w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-[#F97316] px-8 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-[#EA580C] transition shadow-sm cursor-pointer"
                >
                  Back to Holiday
                </button>
              </div>
            ) : (
              <div className="rounded-2xl bg-[#FAF8F5] p-5 sm:p-8 md:p-10 shadow-sm">
                <h3 className="text-base sm:text-lg font-extrabold text-[#F97316]">
                  Send Us an Enquiry
                </h3>

                <form
                  onSubmit={handleFormSubmit}
                  noValidate
                  className="mt-6 space-y-5"
                >
                  <div>
                    <label
                      htmlFor="enquiry-fullname"
                      className="block text-xs sm:text-[13px] font-bold text-[#070B34]"
                    >
                      Full Name
                    </label>
                    <input
                      id="enquiry-fullname"
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (nameError) setNameError("");
                      }}
                      placeholder="Enter your full name"
                      className={`mt-2 w-full rounded-lg bg-white px-4 py-3 text-xs sm:text-sm text-[#070B34] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 transition ${
                        nameError
                          ? "border border-[#EF4444]"
                          : "border border-[#E5E7EB] focus:border-[#F97316]"
                      }`}
                    />
                    {nameError && (
                      <p className="mt-1.5 text-[11px] sm:text-xs text-[#EF4444]">
                        {nameError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-email"
                      className="block text-xs sm:text-[13px] font-bold text-[#070B34]"
                    >
                      Email Address
                    </label>
                    <input
                      id="enquiry-email"
                      type="email"
                      value={emailAddress}
                      onChange={(e) => {
                        setEmailAddress(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      placeholder="Enter your email address"
                      className={`mt-2 w-full rounded-lg bg-white px-4 py-3 text-xs sm:text-sm text-[#070B34] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 transition ${
                        emailError
                          ? "border border-[#EF4444]"
                          : "border border-[#E5E7EB] focus:border-[#F97316]"
                      }`}
                    />
                    {emailError && (
                      <p className="mt-1.5 text-[11px] sm:text-xs text-[#EF4444]">
                        {emailError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-message"
                      className="block text-xs sm:text-[13px] font-bold text-[#070B34]"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="enquiry-message"
                      rows={4}
                      value={yourMessage}
                      onChange={(e) => {
                        setYourMessage(e.target.value);
                        if (messageError) setMessageError("");
                      }}
                      placeholder="Tell us how we can help you..."
                      className={`mt-2 w-full rounded-lg bg-white px-4 py-3 text-xs sm:text-sm text-[#070B34] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 transition resize-y ${
                        messageError
                          ? "border border-[#EF4444]"
                          : "border border-[#E5E7EB] focus:border-[#F97316]"
                      }`}
                    />
                    {messageError && (
                      <p className="mt-1.5 text-[11px] sm:text-xs text-[#EF4444]">
                        {messageError}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[#F97316] py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#EA580C] transition shadow-sm cursor-pointer"
                  >
                    Send Enquiry
                  </button>
                </form>

                <p className="mt-3.5 text-[11px] text-[#6B7280]">
                  Our team will get back to you shortly to assist you with your holiday enquiry.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050826] text-white">
        <div className="mx-auto max-w-[1160px] px-4 pt-12 pb-10 sm:px-6 lg:px-8">
          <div>
            <a href="#top" className="inline-flex items-center">
              <img
                src="/images/logo-blue.png"
                alt="Lowcost Vibes - Good Vibes Only"
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xs font-bold text-white">Brand</h3>
              <ul className="mt-3 space-y-2 text-[11px] text-white/75">
                <li className="uppercase tracking-wide text-white/80">
                  LOW COST VIBES
                </li>
                <li>Your next adventure starts here.</li>
                <li>{dealData.title || "Mysterious Vibes in Transylvania"}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold text-white">Quick Links</h3>
              <ul className="mt-3 space-y-2 text-[11px] text-white/75">
                <li>
                  <button
                    type="button"
                    onClick={() => goToSection("overview")}
                    className="hover:text-[#F97316] transition cursor-pointer"
                  >
                    Overview
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => goToSection("highlights")}
                    className="hover:text-[#F97316] transition cursor-pointer"
                  >
                    Highlights
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => goToSection("itinerary")}
                    className="hover:text-[#F97316] transition cursor-pointer"
                  >
                    Itinerary
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => goToSection("accommodation")}
                    className="hover:text-[#F97316] transition cursor-pointer"
                  >
                    Hotel
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => goToSection("excursions")}
                    className="hover:text-[#F97316] transition cursor-pointer"
                  >
                    Excursions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => goToSection("faq")}
                    className="hover:text-[#F97316] transition cursor-pointer"
                  >
                    FAQs
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold text-white">Contact</h3>
              <ul className="mt-3 space-y-2 text-[11px] text-white/75">
                <li>
                  <button
                    type="button"
                    onClick={openEnquiryForm}
                    className="hover:text-[#F97316] transition cursor-pointer"
                  >
                    Contact us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={openEnquiryForm}
                    className="hover:text-[#F97316] transition cursor-pointer"
                  >
                    Send an enquiry
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => goToSection("fine-print")}
                    className="hover:text-[#F97316] transition cursor-pointer"
                  >
                    Terms &amp; Conditions
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto max-w-[1160px] px-4 py-4 sm:px-6 lg:px-8">
            <p className="text-[11px] text-white/70">
              © 2025 Low Cost Vibes. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
