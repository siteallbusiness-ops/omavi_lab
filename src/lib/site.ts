export const site = {
  name: "Biotech Laboratory",
  shortName: "Biotech",
  tagline: "Specialty analytical testing",
  description:
    "Biotech Laboratory provides identity, purity and quantity testing for peptides and specialty compounds, with clear reporting and public COA lookup.",
  email: "contact@biotech-laboratory.com",
  domain: "biotech-laboratory.com",
  address: [
    "2500 CityWest Boulevard",
    "Suite 300",
    "Houston, TX 77042",
    "United States",
  ] as const,
  year: 2026,
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/testing-techniques", label: "Testing Techniques" },
  { href: "/coa-lookup", label: "COA Lookup" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNavLinks = navLinks.filter((link) => link.href !== "/");

export type PricingRow = {
  analyte: string;
  fee: string;
};

export type PricingCategory = {
  id: string;
  title: string;
  navLabel: string;
  countLabel: string;
  icon:
    | "peptide"
    | "research"
    | "growth"
    | "steroid"
    | "sarms"
    | "pharma"
    | "hormonal"
    | "screening";
  rows: PricingRow[];
  columnLabel?: string;
};

export const pricingCategories: PricingCategory[] = [
  {
    id: "glp-1",
    title: "GLP-1 peptides",
    navLabel: "GLP-1 peptides",
    countLabel: "7 tests",
    icon: "peptide",
    rows: [
      { analyte: "Semaglutide", fee: "$300" },
      { analyte: "Tirzepatide", fee: "$300" },
      { analyte: "Retatrutide", fee: "$300" },
      { analyte: "Cagrilintide", fee: "$380" },
      { analyte: "Liraglutide", fee: "$240" },
      { analyte: "Mazdutide", fee: "$304" },
      { analyte: "Survodutide", fee: "$304" },
    ],
  },
  {
    id: "research",
    title: "Research peptides",
    navLabel: "Research peptides",
    countLabel: "24 tests",
    icon: "research",
    rows: [
      { analyte: "BPC-157", fee: "$180" },
      { analyte: "TB-500", fee: "$180" },
      { analyte: "PT-141", fee: "$180" },
      { analyte: "Melanotan-1", fee: "$380" },
      { analyte: "Melanotan-2", fee: "$180" },
      { analyte: "CJC-1295 DAC", fee: "$180" },
      { analyte: "CJC-1295 no DAC", fee: "$180" },
      { analyte: "DSIP", fee: "$240" },
      { analyte: "Epithalon", fee: "$240" },
      { analyte: "GHK", fee: "$240" },
      { analyte: "GHK-Cu", fee: "$240" },
      { analyte: "Thymosin Alpha-1", fee: "$240" },
      { analyte: "MOTS-C", fee: "$380" },
      { analyte: "Kisspeptin-10", fee: "$380" },
      { analyte: "KPV", fee: "$380" },
      { analyte: "Oxytocin", fee: "$380" },
      { analyte: "Selank", fee: "$240" },
      { analyte: "Semax", fee: "$240" },
      { analyte: "LL-37", fee: "$380" },
      { analyte: "SS-31", fee: "$380" },
      { analyte: "NAD+", fee: "$380" },
      { analyte: "Glutathione", fee: "$96" },
      { analyte: "Gonadorelin", fee: "$192" },
      { analyte: "Triptorelin", fee: "$144" },
    ],
  },
  {
    id: "growth",
    title: "Growth hormone & related compounds",
    navLabel: "Growth hormone & related",
    countLabel: "16 tests",
    icon: "growth",
    columnLabel: "Analyte / test",
    rows: [
      { analyte: "Somatropin (HGH) amount and purity", fee: "$300" },
      { analyte: "Somatropin (HGH) amount, purity and dimer", fee: "$420" },
      { analyte: "IGF-1 LR3", fee: "$300" },
      { analyte: "IGF-1", fee: "$380" },
      { analyte: "IGF-1 DES", fee: "$380" },
      { analyte: "hGH Fragment (176-191)", fee: "$180" },
      { analyte: "AOD-9604", fee: "$180" },
      { analyte: "AOD-9604 with DMSO/5% acetic acid", fee: "$200" },
      { analyte: "GHRP-2", fee: "$180" },
      { analyte: "GHRP-6", fee: "$180" },
      { analyte: "Ipamorelin", fee: "$180" },
      { analyte: "Hexarelin", fee: "$380" },
      { analyte: "Sermorelin", fee: "$240" },
      { analyte: "Tesamorelin", fee: "$240" },
      { analyte: "HCG", fee: "$180" },
      { analyte: "HCG immunoassay", fee: "$240" },
    ],
  },
  {
    id: "steroids",
    title: "Anabolic steroids",
    navLabel: "Anabolic steroids",
    countLabel: "13 tests",
    icon: "steroid",
    rows: [
      { analyte: "Testosterone Propionate", fee: "$120" },
      { analyte: "Testosterone Enanthate", fee: "$120" },
      { analyte: "Testosterone Cypionate", fee: "$120" },
      { analyte: "Nandrolone Decanoate", fee: "$120" },
      { analyte: "Trenbolone Acetate", fee: "$120" },
      { analyte: "Trenbolone Enanthate", fee: "$120" },
      { analyte: "Boldenone Undecylenate", fee: "$120" },
      { analyte: "Drostanolone Propionate", fee: "$120" },
      { analyte: "Methenolone Enanthate", fee: "$120" },
      { analyte: "Stanozolol", fee: "$120" },
      { analyte: "Oxandrolone", fee: "$120" },
      { analyte: "Oxymetholone", fee: "$120" },
      { analyte: "Methandrostenolone", fee: "$120" },
    ],
  },
  {
    id: "sarms",
    title: "SARMs",
    navLabel: "SARMs",
    countLabel: "16 tests",
    icon: "sarms",
    rows: [
      { analyte: "GW-0742", fee: "$220" },
      { analyte: "GW-501516", fee: "$170" },
      { analyte: "MK-677", fee: "$170" },
      { analyte: "AC-262", fee: "$136" },
      { analyte: "ACP-105", fee: "$136" },
      { analyte: "LGD3303", fee: "$136" },
      { analyte: "LGD4033", fee: "$136" },
      { analyte: "MK2866", fee: "$136" },
      { analyte: "OTR-AC", fee: "$136" },
      { analyte: "RAD140", fee: "$136" },
      { analyte: "RAD150", fee: "$136" },
      { analyte: "SR9009", fee: "$136" },
      { analyte: "SR9011", fee: "$136" },
      { analyte: "S23", fee: "$136" },
      { analyte: "S4", fee: "$136" },
      { analyte: "YK11", fee: "$136" },
    ],
  },
  {
    id: "pharma",
    title: "Pharmaceutical compounds",
    navLabel: "Pharmaceutical compounds",
    countLabel: "13 tests",
    icon: "pharma",
    rows: [
      { analyte: "Tesofensine", fee: "$380" },
      { analyte: "Thyroxine", fee: "$120" },
      { analyte: "Liothyronine", fee: "$144" },
      { analyte: "L-Thyroxine", fee: "$144" },
      { analyte: "2,4-Dinitrophenol", fee: "$120" },
      { analyte: "Clenbuterol", fee: "$120" },
      { analyte: "Pramipexole", fee: "$380" },
      { analyte: "Telmisartan", fee: "$380" },
      { analyte: "TUDCA", fee: "$120" },
      { analyte: "Modafinil", fee: "$120" },
      { analyte: "Melatonin", fee: "$120" },
      { analyte: "Cabergoline", fee: "$144" },
      { analyte: "Isotretinoin", fee: "$120" },
    ],
  },
  {
    id: "hormonal",
    title: "Hormonal modulators",
    navLabel: "Hormonal modulators",
    countLabel: "16 tests",
    icon: "hormonal",
    rows: [
      { analyte: "Tamoxifen", fee: "$144" },
      { analyte: "Clomiphene", fee: "$144" },
      { analyte: "Raloxifene", fee: "$144" },
      { analyte: "Enclomiphene Citrate", fee: "$170" },
      { analyte: "Toremifene Citrate", fee: "$170" },
      { analyte: "Anastrozole", fee: "$144" },
      { analyte: "Exemestane", fee: "$144" },
      { analyte: "Letrozole", fee: "$144" },
      { analyte: "Tadalafil", fee: "$144" },
      { analyte: "Sildenafil", fee: "$144" },
      { analyte: "Vardenafil", fee: "$170" },
      { analyte: "Finasteride", fee: "$180" },
      { analyte: "Dutasteride", fee: "$180" },
      { analyte: "Setipiprant", fee: "$180" },
      { analyte: "Bimatoprost", fee: "$180" },
      { analyte: "Minoxidil", fee: "$144" },
    ],
  },
  {
    id: "services",
    title: "Specialized testing",
    navLabel: "Specialized testing",
    countLabel: "5 services",
    icon: "screening",
    columnLabel: "Test",
    rows: [
      { analyte: "Heavy Metal Screening (As, Cd, Pb, Hg)", fee: "$60" },
      { analyte: "GCMS Screening with NIST library", fee: "$170" },
      { analyte: "Sterility Test", fee: "$192" },
      { analyte: "Endotoxin Count", fee: "$192" },
      { analyte: "Rush Fee (+100%)", fee: "+100%" },
    ],
  },
];
