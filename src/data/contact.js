export const contactInfo = {
  company: "Sheyam Enterprises",
  tagline: "Master in all Types of Air Compressors & Generators",
  phones: ["9965499444", "6383171788", "8098093737"],
  // Primary email kept in the legacy markdown shape so existing consumers
  // (Navbar, ErrorBoundary, schema.js) keep working with parseMdLink/cleanEmail.
  email: "[sheyamenterprises@gmail.com](mailto:sheyamenterprises@gmail.com)",
  // Full list — plain strings, iterate to render both on contact-heavy surfaces.
  emails: [
    "sheyamenterprises@gmail.com",
    "sheyamsalesandservice@gmail.com",
  ],
  website: "[www.sheyamenterprises.com](http://www.sheyamenterprises.com)",
  address: {
    street: "No. 594/6, Nethaji Bose Main Road",
    area: "Vallalar, Sathuvachari, Phase-3",
    city: "Vellore",
    pincode: "632 009",
    state: "Tamil Nadu",
    full: "No. 594/6, Nethaji Bose Main Road, Vallalar, Sathuvachari, Phase-3, Vellore – 632 009. T.N."
  },
  hours: { weekdays: "Monday – Saturday: 9:00 AM – 6:30 PM", sunday: "Closed" },
  whatsapp: "919965499444",
  // Sheyam Enterprises pin on Google Maps (resolved from maps.app.goo.gl/iDR5snnw81c8SdAk6)
  location: {
    lat: 12.9419942,
    lng: 79.1684241,
    placeId: "ChIJlfNFRtg5rTsRaV5Ow-3zRVk", // 0x3bad39d84645f395:0x5945f3edc34e5e69
    shortUrl: "https://maps.app.goo.gl/iDR5snnw81c8SdAk6",
  },
}

export const stats = [
  { value: 500, suffix: "+", label: "Clients Served" },
  { value: 25,  suffix: "+", label: "Years Experience" },
  { value: 16,  suffix: "+", label: "Brands Supported" },
  { value: 3,   suffix: "",  label: "Service Numbers" }
]
