export const services = [
  {
    id: "sales",
    number: "01",
    icon: "ShoppingBag",
    title: "Sales",
    shortDesc: "New air compressors and diesel generators from 16+ trusted global and Indian brands.",
    fullDesc:
      "We sell brand-new air compressors and diesel generators across capacities and configurations — sized to your duty cycle, power demand, and site conditions. Genuine units, manufacturer warranty, and pre-delivery commissioning support.",
    features: [
      "Screw, reciprocating, lube and oil-free air compressors, diesel power generators",
      "Diesel generators from 5 kVA to 2000 kVA",
      "Sizing and load assessment for every quote",
      "Manufacturer warranty and original documentation",
      "On-site delivery, installation and commissioning"
    ]
  },
  {
    id: "service-repair",
    number: "02",
    icon: "Wrench",
    title: "Service & Repair",
    shortDesc: "Breakdown response, overhauls and preventive maintenance for compressors and generators.",
    fullDesc:
      "Factory-trained technicians handle scheduled servicing, breakdown calls, and full overhauls across all major brands. We minimise downtime with on-site diagnostics, calibrated tooling, and a stocked service van.",
    features: [
      "24×7 breakdown response across Vellore region",
      "Top, mid and major overhauls for all brands",
      "Compressor airend and generator engine repairs",
      "Performance testing and load-bank verification",
      "Detailed service report with every visit"
    ]
  },
  {
    id: "spare-parts",
    number: "03",
    icon: "Cog",
    title: "Spare Parts Supply",
    shortDesc: "Genuine spares and consumables for every major compressor and generator brand we support.",
    fullDesc:
      "Direct supply of OEM and OEM-equivalent spares — filters, oils, valves, airends, alternators, AVRs, and consumables. Stock held locally for fast turnaround on common parts.",
    features: [
      "Genuine OEM spares with manufacturer documentation",
      "Air, oil and line filters always in stock",
      "Compressor lubricants and synthetic oils",
      "Alternators, AVRs, controllers and sensors",
      "Same-day dispatch on common consumables"
    ]
  },
  {
    id: "hiring",
    number: "04",
    icon: "Truck",
    title: "Equipment Hiring",
    shortDesc: "Short and long-term rental of compressors and generators for projects, events and standby.",
    fullDesc:
      "Rental fleet for construction sites, plant shutdowns, exhibitions, weddings, and emergency standby. Daily, weekly and monthly contracts — delivered, installed, fuelled and maintained for the rental period.",
    features: [
      "Diesel generators from 25 kVA to 1000 kVA on hire",
      "Compressors from 4 CFM to 1000 CFM on hire",
      "Portable and stationary air compressors",
      "Daily, weekly and monthly rental plans",
      "Fuel, operator and maintenance options",
      "Standby cover for plant shutdowns and events"
    ]
  },
  {
    id: "amc",
    number: "05",
    icon: "ShieldCheck",
    title: "AMC",
    shortDesc: "Annual Maintenance Contracts with monthly visits, health reports and remote parameter monitoring — major breakdowns billed under non-AMC terms.",
    fullDesc:
      "Annual Maintenance Contracts focused on preventive care — monthly site visits with equipment stability checks, parameter updates and detailed health reports. Includes our remote parameter mobile service, letting us monitor and tune equipment remotely between visits. Major breakdowns sit outside the AMC scope and are quoted separately under standard non-AMC service terms.",
    features: [
      "Monthly preventive maintenance visits",
      "Equipment stability checks and health reports",
      "Parameter updates and tuning",
      "Remote parameter mobile service — monitor and control equipment remotely",
      "Major breakdowns billed under non-AMC service terms"
    ]
  },
  {
    id: "import-export",
    number: "06",
    icon: "Globe",
    title: "Import & Export — Global Trade Solutions",
    shortDesc:
      "We import air compressors, generators, solar panels and electrical equipment from global manufacturers. We export genuine spare parts — compressor components, generator parts and electrical equipment — to markets worldwide.",
    fullDesc:
      "Direct sourcing of industrial compressors, diesel and gas generators, solar panels, control units and switchgear from leading global brands — passed through with genuine documentation, manufacturer warranty, and competitive landed pricing. On the export side we ship compressor dryers, filters, lubricants, kit parts, screw elements and PLCs, plus generator engine parts, alternators, coolers and radiators, and electrical power equipment (cables, VFDs, ATS, contactors) to buyers across the region.",
    features: [
      "Imports: compressors, generators, solar panels & control units, electrical goods",
      "Exports: compressor parts, generator parts, electrical power equipment",
      "Direct sourcing from global OEMs with full warranty pass-through",
      "Worldwide trade lanes — import and export across global markets",
      "Genuine documentation, traceable provenance, competitive landed pricing"
    ]
  }
]

export const importExportData = {
  import: {
    title: "Import",
    icon: "📦",
    description:
      "We import high-quality industrial equipment and components directly from global manufacturers — ensuring genuine products at competitive prices.",
    items: [
      {
        id: 1,
        name: "Air Compressors",
        icon: "⚙️",
        desc: "Screw, reciprocating, centrifugal and scroll compressors from leading global brands",
        tags: ["Screw", "Reciprocating", "Centrifugal", "Scroll", "Oil-Free"],
      },
      {
        id: 2,
        name: "Generators",
        icon: "⚡",
        desc: "Diesel and gas generators, gensets and generator control systems",
        tags: ["Diesel", "Gas", "Gensets", "Control Systems", "Standby"],
      },
      {
        id: 3,
        name: "Electrical Goods & Equipment",
        icon: "🔌",
        desc: "Industrial electrical components, switchgear, control panels and instrumentation",
        tags: ["Switchgear", "Control Panels", "Instrumentation", "Components"],
      },
      {
        id: 4,
        name: "Solar Panels & Control Units",
        icon: "☀️",
        desc: "Monocrystalline and polycrystalline solar panels with inverters, charge controllers, MPPT units and monitoring systems for industrial and commercial use",
        tags: ["Monocrystalline", "Polycrystalline", "Inverters", "MPPT", "Monitoring"],
      },
    ],
  },
  export: {
    title: "Export",
    icon: "🚢",
    description:
      "We export genuine compressed air system components and industrial electrical equipment to markets worldwide.",
    items: [
      {
        id: 1,
        category: "Compressor Parts",
        icon: "🔵",
        desc: "Air compressor dryers, filters, lubricants, kit parts, screw elements, PLC units and control systems",
        tags: ["Air Dryers", "Filters", "Lubricants", "Kit Parts", "Screw Elements", "PLC"],
      },
      {
        id: 2,
        category: "Generator Parts",
        icon: "⚡",
        desc: "Engine parts, alternator components, coolers, radiators, self-start motors and generator PLC systems",
        tags: ["Engine Parts", "Alternator Parts", "Coolers", "Radiators", "Self Motors", "PLC"],
      },
      {
        id: 3,
        category: "Electrical Power Equipment",
        icon: "🔌",
        desc: "Power cables, VFD/VSD drives, ATS switches, contactors, humidity displays and remote parameter analysers",
        tags: ["Cables", "VFD / VSD", "ATS Switches", "Contactors", "Humidity Displays", "Remote Parameter Analyser"],
      },
    ],
  },
};
