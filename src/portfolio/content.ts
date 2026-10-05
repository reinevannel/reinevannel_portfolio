import type { Lang } from "./i18n-data";

type L = Record<Lang, string>;

export type Project = {
  id: string;
  year: string;
  num: string;
  title: string;
  category: "ux" | "code";
  featured: boolean;
  sub: L;
  desc: L;
  tags: string[];
  live: string | null;
  github: string | null;
  color: string;
  image: string;
};

/** Projets réels du studio — aperçus locaux, jamais d'images génériques externes. */
export const PROJECTS: Project[] = [
  {
    id: "reine-associes",
    year: "2026",
    num: "01",
    title: "Reine & Associés",
    category: "ux",
    featured: true,
    sub: { fr: "Cabinet fictif · bibliothèque vivante", en: "Fictional firm · living library", de: "Fiktive Kanzlei · lebende Bibliothek", sk: "Fiktívna kancelária · živá knižnica", cs: "Fiktivní kancelář · živá knihovna" },
    desc: {
      fr: "Un cabinet fictif au ton sombre et net, inspiré des grandes bibliothèques. Typographie tenue, case study UX/UI complet, maquettes Figma et intégration HTML/CSS/JS.",
      en: "A dark, precise fictional firm inspired by great libraries. Tight typography, a full UX/UI case study, Figma mocks and an HTML/CSS/JS build.",
      de: "Eine dunkle, klare fiktive Kanzlei, inspiriert von großen Bibliotheken. Strenge Typografie, vollständige UX/UI-Fallstudie, Figma und HTML/CSS/JS.", sk: "Fiktívna kancelária v tmavom a presnom tóne, inšpirovaná veľkými knižnicami. Striedma typografia, kompletná UX/UI prípadová štúdia, makety vo Figme a integrácia HTML/CSS/JS.", cs: "Fiktivní kancelář v tmavém a přesném tónu, inspirovaná velkými knihovnami. Střídmá typografie, kompletní UX/UI případová studie, makety ve Figmě a integrace HTML/CSS/JS.",
    },
    tags: ["Figma", "HTML", "CSS", "JavaScript", "UX Research"],
    live: "https://reinevannel.github.io/reine-associes/",
    github: "https://github.com/reinevannel",
    color: "#D4AF37",
    image: "/proj-reine-associes.jpg",
  },
  {
    id: "saisons-maman",
    year: "2027",
    num: "02",
    title: "Saisons de Maman",
    category: "ux",
    featured: true,
    sub: { fr: "Grimoire · Du jardin au four", en: "Grimoire · Garden to oven", de: "Grimoire · Vom Garten zum Ofen", sk: "Grimoár · Zo záhrady do rúry", cs: "Grimoár · Ze zahrady do trouby" },
    desc: {
      fr: "Interface saisonnière pour un potager suisse romand. Confitures, levain, marché local, gâteaux 3D sur mesure. Premier potager en 2027.",
      en: "A seasonal interface for a Swiss garden. Jams, sourdough, the local market, custom 3D cakes. First garden in 2027.",
      de: "Saisonales Interface für einen Westschweizer Garten. Konfitüren, Sauerteig, Markt, maßgefertigte 3D-Torten. Erster Garten 2027.", sk: "Sezónne rozhranie pre západošvajčiarsku záhradu. Džemy, kvas, miestny trh, torty na mieru v 3D. Prvá záhrada v roku 2027.", cs: "Sezónní rozhraní pro západošvýcarskou zahradu. Džemy, kvásek, místní trh, dorty na míru ve 3D. První zahrada v roce 2027.",
    },
    tags: ["Figma", "CSS", "React", "UX"],
    live: null,
    github: null,
    color: "#2EE6A6",
    image: "/proj-saisons.jpg",
  },
  {
    id: "aequor-lab",
    year: "2026",
    num: "03",
    title: "Aequor Lab",
    category: "code",
    featured: true,
    sub: { fr: "Créatures des grands fonds", en: "Deep-sea creatures", de: "Tiefseewesen", sk: "Tvorovia z hlbín", cs: "Tvorové z hlubin" },
    desc: {
      fr: "Laboratoire marin interactif. Créatures bioluminescentes, séquences, mutations et archives — dessinées comme un système, pas une image figée.",
      en: "An interactive marine lab. Bioluminescent creatures, sequences, mutations and archives — designed as a system, not a still image.",
      de: "Interaktives Meereslabor. Biolumineszente Wesen, Sequenzen, Mutationen und Archive — als System gezeichnet, nicht als starres Bild.", sk: "Interaktívne morské laboratórium. Bioluminiscenčné tvory, sekvencie, mutácie a archívy — kreslené ako systém, nie ako nehybný obraz.", cs: "Interaktivní mořská laboratoř. Bioluminiscenční tvorové, sekvence, mutace a archivy — kreslené jako systém, ne jako nehybný obraz.",
    },
    tags: ["Canvas", "JavaScript", "Figma"],
    live: "https://reinevannel.github.io/Bioluminescent-creature-simulator/",
    github: "https://github.com/reinevannel",
    color: "#7FD4FF",
    image: "/proj-aequor.jpg",
  },
  {
    id: "cavaliercare",
    year: "2026",
    num: "04",
    title: "CavalierCare",
    category: "ux",
    featured: true,
    sub: { fr: "Compagnon digital pour un Cavalier", en: "Digital companion for a Cavalier", de: "Digitaler Begleiter für einen Cavalier", sk: "Digitálny spoločník pre Cavaliera", cs: "Digitální společník pro Cavaliera" },
    desc: {
      fr: "Compagnon digital d'un Cavalier King Charles. Ration maison, promenades, recettes de race, dans une interface calme déjà ouverte.",
      en: "A digital companion for a Cavalier King Charles. Home rations, walks and breed recipes, in a calm interface that is already open.",
      de: "Digitaler Begleiter eines Cavalier King Charles. Hausration, Spaziergänge, Rassenrezepte — in einem ruhigen, bereits offenen Interface.", sk: "Digitálny spoločník pre Cavalier King Charles. Domáca kŕmna dávka, prechádzky, recepty pre plemeno, v pokojnom rozhraní, ktoré je už otvorené.", cs: "Digitální společník pro Cavalier King Charles. Domácí krmná dávka, procházky, recepty pro plemeno, v klidném rozhraní, které je už otevřené.",
    },
    tags: ["Figma", "SVG", "React", "UX"],
    live: "https://reinevannel.github.io/cavalier_care/",
    github: "https://github.com/reinevannel",
    color: "#D4AF37",
    image: "/proj-cavalier.jpg",
  },
  {
    id: "aethernest",
    year: "2026",
    num: "05",
    title: "AetherNest",
    category: "ux",
    featured: false,
    sub: { fr: "Neurolink Club · en ligne", en: "Neurolink Club · live", de: "Neurolink Club · online", sk: "Neurolink Club · online", cs: "Neurolink Club · online" },
    desc: {
      fr: "Application pour personnes TSA, THPI et neurodivergentes. Espaces calmes, batterie sociale, jardin d'intérêts, navigation prévisible. Publiée.",
      en: "An app for autistic, gifted and neurodivergent people. Calm spaces, a social battery, an interest garden, predictable navigation. Now live.",
      de: "App für autistische, hochbegabte und neurodivergente Menschen. Ruhige Räume, soziale Batterie, Interessengarten, vorhersehbare Navigation. Veröffentlicht.", sk: "Aplikácia pre autistické, intelektovo nadané a neurodivergentné osoby. Pokojné priestory, sociálna batéria, záhrada záujmov, predvídateľná navigácia. Zverejnené.", cs: "Aplikace pro autistické, intelektově nadané a neurodivergentní osoby. Klidné prostory, sociální baterie, zahrada zájmů, předvídatelná navigace. Zveřejněno.",
    },
    tags: ["Figma", "React", "Accessibilité"],
    live: "https://reinevannel.github.io/Neurolink_club/",
    github: "https://github.com/reinevannel/Neurolink_club",
    color: "#8FB4E8",
    image: "/proj-aethernest.jpg",
  },
  {
    id: "design-system",
    year: "2026",
    num: "06",
    title: "Design System Atelier",
    category: "code",
    featured: false,
    sub: { fr: "MarieReine Studio · tokens", en: "MarieReine Studio · tokens", de: "MarieReine Studio · Tokens", sk: "MarieReine Studio · tokeny", cs: "MarieReine Studio · tokeny" },
    desc: {
      fr: "Design system documenté en HTML et CSS. Couleurs sémantiques, typographie, espacement, composants et tokens — pour ne plus réinventer une palette à chaque mandat.",
      en: "A design system documented in HTML and CSS. Semantic colours, type, spacing, components and tokens — so a palette is never reinvented per brief.",
      de: "In HTML und CSS dokumentiertes Designsystem. Semantische Farben, Typografie, Abstände, Komponenten und Tokens.", sk: "Dizajnový systém zdokumentovaný v HTML a CSS. Sémantické farby, typografia, medzery, komponenty a tokeny — aby sa paleta nevymýšľala pri každej zákazke.", cs: "Designový systém zdokumentovaný v HTML a CSS. Sémantické barvy, typografie, mezery, komponenty a tokeny — aby se paleta nevymýšlela u každé zakázky.",
    },
    tags: ["HTML", "CSS", "Tokens", "Documentation"],
    live: "https://reinevannel.github.io/website-design-system/",
    github: "https://github.com/reinevannel",
    color: "#D4AF37",
    image: "/proj-design-system.jpg",
  },
  {
    id: "cheatsheet",
    year: "2026",
    num: "07",
    title: "HTML & CSS Cheat Sheet",
    category: "code",
    featured: false,
    sub: { fr: "Particules · clair / sombre · recherche", en: "Particles · light / dark · search", de: "Partikel · Hell / Dunkel · Suche", sk: "Častice · svetlo / tma · hľadanie", cs: "Částice · světlo / tma · hledání" },
    desc: {
      fr: "Antisèche interactive : fond étoilé, thème clair ou sombre, recherche instantanée. Fiches HTML, CSS et JavaScript consultables avant de livrer le front-end.",
      en: "An interactive cheat sheet: starfield, light or dark theme, instant search. HTML, CSS and JavaScript cards to check before shipping front-end.",
      de: "Interaktiver Spickzettel: Sternenhimmel, helles oder dunkles Thema, Sofortsuche. HTML-, CSS- und JavaScript-Karten.", sk: "Interaktívna ťaháka: hviezdne pozadie, svetlý alebo tmavý motív, okamžité hľadanie. Karty HTML, CSS a JavaScriptu pred odovzdaním front-endu.", cs: "Interaktivní tahák: hvězdné pozadí, světlý nebo tmavý motiv, okamžité hledání. Karty HTML, CSS a JavaScriptu před předáním front-endu.",
    },
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://reinevannel.github.io/web-cheatsheet/",
    github: "https://github.com/reinevannel",
    color: "#2EE6A6",
    image: "/proj-cheatsheet.jpg",
  },
  {
    id: "nexuspay",
    year: "2026",
    num: "08",
    title: "NexusPay Lab",
    category: "code",
    featured: false,
    sub: { fr: "Simuler, valider, sans encaisser", en: "Simulate and validate, no real money", de: "Simulieren, prüfen, kein echtes Geld", sk: "Simulovať, overiť, bez inkasa", cs: "Simulovat, ověřit, bez inkasa" },
    desc: {
      fr: "Parcours de paiement fictif en haute fidélité. Carte, validation, états d'erreur ou de confirmation. Aucun argent réel ne circule.",
      en: "A high-fidelity fictional payment flow. Card, validation, error and confirmation states. No real money moves.",
      de: "Hochauflösender fiktiver Zahlungsfluss. Karte, Prüfung, Fehler- und Bestätigungszustände. Es fließt kein echtes Geld.", sk: "Fiktívny platobný tok vo vysokej vernosti. Karta, overenie, stavy chyby alebo potvrdenia. Žiadne skutočné peniaze neprechádzajú.", cs: "Fiktivní platební tok ve vysoké věrnosti. Karta, ověření, stavy chyby nebo potvrzení. Žádné skutečné peníze neprocházejí.",
    },
    tags: ["React", "CSS", "Figma"],
    live: "https://reinevannel.github.io/Payment-simulator/",
    github: "https://github.com/reinevannel",
    color: "#D4AF37",
    image: "/proj-nexuspay.jpg",
  },
];

export const FEATURED = PROJECTS.filter((p) => ["reine-associes", "saisons-maman", "aequor-lab", "cavaliercare"].includes(p.id));

export type Service = {
  id: string;
  open: string;
  from: number;
  title: L;
  desc: L;
  steps: L[];
  color: string;
  tag: string;
  perScreen: number;
  perLang: number;
};

export const SERVICES: Service[] = [
  {
    id: "audit-ux",
    open: "2027",
    from: 550,
    title: { fr: "Audit UX", en: "UX audit", de: "UX-Audit", sk: "UX audit", cs: "UX audit" },
    desc: {
      fr: "Lecture écrite d'un site ou d'un parcours : friction, hiérarchie, mobile, accessibilité. Ce qu'un développeur ne pourra pas deviner.",
      en: "A written reading of a site or a flow: friction, hierarchy, mobile, accessibility. What a developer cannot guess.",
      de: "Schriftliche Lesung einer Website oder eines Ablaufs: Reibung, Hierarchie, Mobil, Barrierefreiheit.", sk: "Písomné čítanie webu alebo cesty: trenie, hierarchia, mobil, prístupnosť. To, čo vývojár nemôže uhádnuť.", cs: "Písemné čtení webu nebo cesty: tření, hierarchie, mobil, přístupnost. To, co vývojář nemůže uhodnout.",
    },
    steps: [
      { fr: "Accès en lecture et brief écrit", en: "Read access and a written brief", de: "Lesezugang und schriftliches Briefing", sk: "Prístup na čítanie a písomný brief", cs: "Přístup ke čtení a písemný brief" },
      { fr: "Audit complet · 7 points", en: "Full audit · 7 points", de: "Vollständiger Audit · 7 Punkte", sk: "Úplný audit · 7 bodov", cs: "Úplný audit · 7 bodů" },
      { fr: "Rapport écrit et recommandations", en: "Written report and recommendations", de: "Schriftlicher Bericht und Empfehlungen", sk: "Písomná správa a odporúčania", cs: "Písemná zpráva a doporučení" },
      { fr: "Livraison d'un PDF annoté", en: "Delivery of an annotated PDF", de: "Lieferung eines annotierten PDFs", sk: "Odovzdanie anotovaného PDF", cs: "Předání anotovaného PDF" },
    ],
    color: "#D4AF37",
    tag: "UX",
    perScreen: 0,
    perLang: 80,
  },
  {
    id: "identite",
    open: "2027",
    from: 1400,
    title: { fr: "Identité visuelle", en: "Visual identity", de: "Visuelle Identität", sk: "Vizuálna identita", cs: "Vizuální identita" },
    desc: {
      fr: "Nom, monogramme, palette, typographie et déclinaisons pour une TPE. Pas un modèle gratuit.",
      en: "Name, monogram, palette, typography and applications for a small business. Not a free template.",
      de: "Name, Monogramm, Palette, Typografie und Anwendungen für ein Kleinunternehmen. Keine Gratisvorlage.", sk: "Názov, monogram, paleta, typografia a použitia pre malú firmu. Nie bezplatná šablóna.", cs: "Název, monogram, paleta, typografie a použití pro malou firmu. Ne bezplatná šablona.",
    },
    steps: [
      { fr: "Brief écrit · contraintes et valeurs", en: "Written brief · constraints and values", de: "Schriftliches Briefing · Grenzen und Werte", sk: "Písomný brief · obmedzenia a hodnoty", cs: "Písemný brief · omezení a hodnoty" },
      { fr: "Trois directions · un choix", en: "Three directions · one choice", de: "Drei Richtungen · eine Wahl", sk: "Tri smery · jedna voľba", cs: "Tři směry · jedna volba" },
      { fr: "Développement de l'identité choisie", en: "Development of the chosen identity", de: "Entwicklung der gewählten Identität", sk: "Rozpracovanie zvolenej identity", cs: "Rozpracování zvolené identity" },
      { fr: "Charte et fichiers exportés", en: "Guidelines and exported files", de: "Manual und exportierte Dateien", sk: "Manuál a exportované súbory", cs: "Manuál a exportované soubory" },
    ],
    color: "#2EE6A6",
    tag: "DESIGN",
    perScreen: 0,
    perLang: 0,
  },
  {
    id: "prototype-handoff",
    open: "2027",
    from: 1850,
    title: { fr: "Prototype + handoff", en: "Prototype + handoff", de: "Prototyp + Handoff", sk: "Prototyp + handoff", cs: "Prototyp + handoff" },
    desc: {
      fr: "Écrans haute fidélité, états, tokens et dossier qu'un développeur peut exécuter sans ambiguïté.",
      en: "High-fidelity screens, states, tokens and a file a developer can build without ambiguity.",
      de: "Hochauflösende Screens, Zustände, Tokens und ein Dossier, das eine Entwicklerin ohne Mehrdeutigkeit umsetzen kann.", sk: "Obrazovky vo vysokej vernosti, stavy, tokeny a podklady, ktoré vývojár dokáže realizovať bez nejasností.", cs: "Obrazovky ve vysoké věrnosti, stavy, tokeny a podklady, které vývojář dokáže realizovat bez nejasností.",
    },
    steps: [
      { fr: "Écoute écrite · brief", en: "Written listening · brief", de: "Schriftliches Zuhören · Briefing", sk: "Písomné počúvanie · brief", cs: "Písemné naslouchání · brief" },
      { fr: "Cartographie du parcours et des contenus", en: "Journey and content map", de: "Ablauf- und Inhaltskarte", sk: "Mapa cesty a obsahu", cs: "Mapa cesty a obsahu" },
      { fr: "Fil de structure · wireframes", en: "Structure thread · wireframes", de: "Strukturfaden · Wireframes", sk: "Niť štruktúry · wireframy", cs: "Nit struktury · wireframy" },
      { fr: "Matière · UI haute fidélité", en: "Material · high-fidelity UI", de: "Materie · hochauflösende UI", sk: "Matéria · UI vo vysokej vernosti", cs: "Matérie · UI ve vysoké věrnosti" },
      { fr: "Transmission · tokens et handoff", en: "Handoff · tokens and specs", de: "Übergabe · Tokens und Specs", sk: "Odovzdanie · tokeny a špecifikácie", cs: "Předání · tokeny a specifikace" },
    ],
    color: "#7FD4FF",
    tag: "UX+UI",
    perScreen: 120,
    perLang: 200,
  },
  {
    id: "presentation",
    open: "2027",
    from: 900,
    title: { fr: "Présentation", en: "Presentation", de: "Präsentation", sk: "Prezentácia", cs: "Prezentace" },
    desc: {
      fr: "Deck sobre pour un produit, un marché ou un dossier. Une idée par planche, aucun effet de foire.",
      en: "A quiet deck for a product, a market or a dossier. One idea per slide, no fairground effects.",
      de: "Ruhiges Deck für ein Produkt, einen Markt oder ein Dossier. Eine Idee pro Folie, keine Jahrmarkt-Effekte.", sk: "Pokojná prezentácia pre produkt, trh alebo spis. Jedna myšlienka na snímku, žiadne jarmočné efekty.", cs: "Klidná prezentace pro produkt, trh nebo spis. Jedna myšlenka na snímek, žádné jarmareční efekty.",
    },
    steps: [
      { fr: "Brief · objectif et public", en: "Brief · goal and audience", de: "Briefing · Ziel und Publikum", sk: "Brief · cieľ a publikum", cs: "Brief · cíl a publikum" },
      { fr: "Plan · une idée par planche", en: "Plan · one idea per slide", de: "Plan · eine Idee pro Folie", sk: "Plán · jedna myšlienka na snímku", cs: "Plán · jedna myšlenka na snímek" },
      { fr: "Design des planches", en: "Slide design", de: "Foliendesign", sk: "Dizajn snímok", cs: "Design snímků" },
      { fr: "Livraison PDF et PPT", en: "PDF and PPT delivery", de: "Lieferung als PDF und PPT", sk: "Odovzdanie PDF a PPT", cs: "Předání PDF a PPT" },
    ],
    color: "#D4AF37",
    tag: "DESIGN",
    perScreen: 60,
    perLang: 0,
  },
  {
    id: "illustration",
    open: "2027",
    from: 650,
    title: { fr: "Illustration & couverture", en: "Illustration & cover", de: "Illustration & Cover", sk: "Ilustrácia a obálka", cs: "Ilustrace a obálka" },
    desc: {
      fr: "Visuel de case study, couverture, motif saisonnier. L'univers du studio n'est pas plaqué sur chaque client.",
      en: "Case-study visual, cover, seasonal pattern. The studio's world is not pasted onto every client.",
      de: "Fallstudienbild, Cover, saisonales Muster. Die Welt des Ateliers wird nicht auf jede Kundin gelegt.", sk: "Vizuál prípadovej štúdie, obálka, sezónny motív. Svet ateliéru sa nelepí na každého klienta.", cs: "Vizuál případové studie, obálka, sezónní motiv. Svět ateliéru se nelepí na každého klienta.",
    },
    steps: [
      { fr: "Brief illustré et références", en: "Illustrated brief and references", de: "Illustriertes Briefing und Referenzen", sk: "Ilustrovaný brief a referencie", cs: "Ilustrovaný brief a reference" },
      { fr: "Deux directions · esquisse", en: "Two directions · sketch", de: "Zwei Richtungen · Skizze", sk: "Dva smery · skica", cs: "Dva směry · skica" },
      { fr: "Développement et détails", en: "Development and details", de: "Entwicklung und Details", sk: "Rozpracovanie a detaily", cs: "Rozpracování a detaily" },
      { fr: "Export haute résolution", en: "High-resolution export", de: "Export in hoher Auflösung", sk: "Export vo vysokom rozlíšení", cs: "Export ve vysokém rozlišení" },
    ],
    color: "#2EE6A6",
    tag: "ART",
    perScreen: 0,
    perLang: 0,
  },
  {
    id: "conseil",
    open: "2027",
    from: 1300,
    title: { fr: "Conseil de structure TPE", en: "Small-business structure", de: "Strukturberatung KMU", sk: "Štruktúra malej firmy", cs: "Struktura malé firmy" },
    desc: {
      fr: "Mise en ordre d'une offre, d'un plan simple ou d'un message. Ce n'est pas un conseil juridique.",
      en: "Putting an offer, a simple plan or a message in order. This is not legal advice.",
      de: "Ordnung in ein Angebot, einen einfachen Plan oder eine Botschaft bringen. Keine Rechtsberatung.", sk: "Usporiadanie ponuky, jednoduchého plánu alebo odkazu. Nie je to právne poradenstvo.", cs: "Uspořádání nabídky, jednoduchého plánu nebo sdělení. Není to právní poradenství.",
    },
    steps: [
      { fr: "Brief écrit et documents existants", en: "Written brief and existing documents", de: "Schriftliches Briefing und vorhandene Unterlagen", sk: "Písomný brief a existujúce dokumenty", cs: "Písemný brief a existující dokumenty" },
      { fr: "Analyse de la structure actuelle", en: "Reading of the current structure", de: "Analyse der bestehenden Struktur", sk: "Čítanie súčasnej štruktúry", cs: "Čtení současné struktury" },
      { fr: "Plan restructuré et recommandations", en: "Restructured plan and recommendations", de: "Neu geordneter Plan und Empfehlungen", sk: "Preusporiadaný plán a odporúčania", cs: "Přeuspořádaný plán a doporučení" },
    ],
    color: "#D4AF37",
    tag: "CONSEIL",
    perScreen: 0,
    perLang: 0,
  },
  {
    id: "atelier",
    open: "2027",
    from: 350,
    title: { fr: "Atelier écrit", en: "Written workshop", de: "Schriftliches Atelier", sk: "Písomný ateliér", cs: "Písemný ateliér" },
    desc: {
      fr: "Session courte, questions préparées, compte-rendu. Pas d'appel improvisé.",
      en: "A short session, prepared questions, written notes. No improvised call.",
      de: "Kurze Sitzung, vorbereitete Fragen, Protokoll. Kein improvisierter Anruf.", sk: "Krátka relácia, pripravené otázky, zápis. Žiadny improvizovaný hovor.", cs: "Krátké sezení, připravené otázky, zápis. Žádný improvizovaný hovor.",
    },
    steps: [
      { fr: "Questions préparées à l'avance", en: "Questions prepared in advance", de: "Im Voraus vorbereitete Fragen", sk: "Otázky pripravené vopred", cs: "Otázky připravené předem" },
      { fr: "Session écrite · 60 à 90 min", en: "Written session · 60 to 90 min", de: "Schriftliche Sitzung · 60 bis 90 Min.", sk: "Písomná relácia · 60 až 90 min", cs: "Písemné sezení · 60 až 90 min" },
      { fr: "Compte-rendu structuré", en: "Structured notes", de: "Strukturiertes Protokoll", sk: "Štruktúrovaný zápis", cs: "Strukturovaný zápis" },
    ],
    color: "#2EE6A6",
    tag: "SESSION",
    perScreen: 0,
    perLang: 0,
  },
  {
    id: "frontend",
    open: "2028",
    from: 0,
    title: { fr: "Front-end", en: "Front-end", de: "Front-end", sk: "Front-end", cs: "Front-end" },
    desc: {
      fr: "HTML, CSS, JavaScript, React, TypeScript. Annoncé après au moins six mois d'exercice effectif. Pas au catalogue 2027.",
      en: "HTML, CSS, JavaScript, React, TypeScript. Announced after at least six months of real practice. Not in the 2027 catalogue.",
      de: "HTML, CSS, JavaScript, React, TypeScript. Angekündigt nach mindestens sechs Monaten Praxis. Nicht im Katalog 2027.", sk: "HTML, CSS, JavaScript, React, TypeScript. Ohlásené po najmenej šiestich mesiacoch skutočnej praxe. Nie v katalógu 2027.", cs: "HTML, CSS, JavaScript, React, TypeScript. Ohlášeno po nejméně šesti měsících skutečné praxe. Není v katalogu 2027.",
    },
    steps: [],
    color: "#7FD4FF",
    tag: "CODE",
    perScreen: 0,
    perLang: 0,
  },
];

export const EDUCATION: { num: string; period: L; status: L; degree: L; place: string; detail: L; color: string }[] = [
  {
    num: "01",
    period: { fr: "depuis 2026", en: "since 2026", de: "seit 2026", sk: "od roku 2026", cs: "od roku 2026" },
    status: { fr: "En cours", en: "In progress", de: "Laufend", sk: "Prebieha", cs: "Probíhá" },
    degree: { fr: "Bachelor en droit", en: "Bachelor of Law", de: "Bachelor Rechtswissenschaft", sk: "Bakalár práva", cs: "Bakalář práva" },
    place: "UniDistance — Suisse",
    detail: { fr: "Semestre 1, automne · temps partiel", en: "Semester 1, autumn · part-time", de: "Semester 1, Herbst · Teilzeit", sk: "Semester 1, jeseň · čiastočný úväzok", cs: "Semestr 1, podzim · částečný úvazek" },
    color: "#D4AF37",
  },
  {
    num: "02",
    period: { fr: "2024 – 2025", en: "2024 – 2025", de: "2024 – 2025", sk: "2024 – 2025", cs: "2024 – 2025" },
    status: { fr: "Mention Bien", en: "With distinction", de: "Mit Auszeichnung", sk: "S vyznamenaním", cs: "S vyznamenáním" },
    degree: { fr: "DU Sciences criminelles", en: "University diploma, Criminal Sciences", de: "DU Kriminalwissenschaften", sk: "DU kriminálne vedy", cs: "DU kriminální vědy" },
    place: "Université d'Angers, France",
    detail: { fr: "Diplôme universitaire", en: "University diploma", de: "Universitätsdiplom", sk: "Univerzitný diplom", cs: "Univerzitní diplom" },
    color: "#2EE6A6",
  },
  {
    num: "03",
    period: { fr: "2023 – 2025", en: "2023 – 2025", de: "2023 – 2025", sk: "2023 – 2025", cs: "2023 – 2025" },
    status: { fr: "Mention Bien", en: "With distinction", de: "Mit Auszeichnung", sk: "S vyznamenaním", cs: "S vyznamenáním" },
    degree: { fr: "Licence en droit", en: "Bachelor of Laws", de: "Licence en droit", sk: "Licence en droit", cs: "Licence en droit" },
    place: "Université Lumière Lyon 2, France",
    detail: { fr: "Mention Bien", en: "With distinction", de: "Mit Auszeichnung", sk: "S vyznamenaním", cs: "S vyznamenáním" },
    color: "#8FB4E8",
  },
  {
    num: "04",
    period: { fr: "2015 – 2019", en: "2015 – 2019", de: "2015 – 2019", sk: "2015 – 2019", cs: "2015 – 2019" },
    status: { fr: "Moyenne excellente", en: "Excellent average", de: "Ausgezeichneter Schnitt", sk: "Výborný priemer", cs: "Výborný průměr" },
    degree: { fr: "Maturita · Droit et Économie", en: "Maturita · Law and Economics", de: "Maturita · Recht und Wirtschaft", sk: "Maturita · právo a ekonómia", cs: "Maturita · právo a ekonomie" },
    place: "Lycée privé, Poprad",
    detail: { fr: "Domaine 6857 · slovaque", en: "Field 6857 · Slovak", de: "Bereich 6857 · Slowakisch", sk: "Odbor 6857 · slovenčina", cs: "Obor 6857 · slovenština" },
    color: "#D4AF37",
  },
];

export type CertItem = {
  title: string;
  /** course, parcours carrière, ou skill path — tel qu'affiché sur Codecademy. */
  kind: "course" | "path" | "skill";
  group: "ux" | "code";
  syllabus: string;
  certificate: string;
};

const cert = (id: string) => `https://www.codecademy.com/profiles/reine.vannel/certificates/${id}`;

/** Sélection courte : parcours pro, skill paths, et langages vraiment utiles. Les deux colonnes ont le même nombre de lignes. */
export const CERTIFICATES: CertItem[] = [
  { title: "UX Designer", kind: "path", group: "ux", syllabus: "https://www.codecademy.com/learn/paths/ux-designer-career-path", certificate: cert("c2a72f8e81dd4fada36a71a7f8968ac1") },
  { title: "Introduction to UI and UX Design", kind: "course", group: "ux", syllabus: "https://www.codecademy.com/learn/intro-to-ui-ux", certificate: cert("4ccef8d532484ea2aeec3b3b3dbb4f9c") },
  { title: "Learn Interaction Design", kind: "course", group: "ux", syllabus: "https://www.codecademy.com/learn/learn-interaction-design", certificate: cert("480eaeabe094423f8935cf972c7e27de") },
  { title: "Learn Visual Design", kind: "course", group: "ux", syllabus: "https://www.codecademy.com/learn/learn-visual-design", certificate: cert("3baa1916b9214b06982903c548601c0e") },
  { title: "Learn Color Design", kind: "course", group: "ux", syllabus: "https://www.codecademy.com/learn/learn-color-design", certificate: cert("0a6884fad1dbf4afe5df084d2ec1e7c3") },
  { title: "Learn Design Thinking: Iteration", kind: "course", group: "ux", syllabus: "https://www.codecademy.com/learn/design-thinking-iteration", certificate: cert("5d8eaede21fb4a999c8482b3c3c0bab4") },
  { title: "Learn User Research: Generative", kind: "course", group: "ux", syllabus: "https://www.codecademy.com/learn/learn-user-research-generative", certificate: cert("8b5e81d520f9431d964d1233b62a12d3") },
  { title: "Learn User Research: Evaluative", kind: "course", group: "ux", syllabus: "https://www.codecademy.com/learn/learn-user-research-evaluative", certificate: cert("ed6f6765d962423585dd352d8f883326") },
  { title: "UX Design Career Preparedness", kind: "course", group: "ux", syllabus: "https://www.codecademy.com/learn/ux-design-career-preparedness", certificate: cert("e5a1590f57d04ae0ac5647d0b837eac5") },
  { title: "Learn Digital Accessibility", kind: "course", group: "ux", syllabus: "https://www.codecademy.com/learn/learn-digital-accessibility", certificate: cert("2081cf1e2aa94082b199a1120aa63ee2") },
  { title: "Front-End Engineer", kind: "path", group: "code", syllabus: "https://www.codecademy.com/career-journey/front-end-engineer", certificate: cert("2682884a0719474f96407efe432fdd87") },
  { title: "Build a Website with HTML, CSS, and GitHub Pages", kind: "skill", group: "code", syllabus: "https://www.codecademy.com/learn/paths/learn-how-to-build-websites", certificate: cert("5cadfefe5f1de806e9704577") },
  { title: "Code Foundations", kind: "skill", group: "code", syllabus: "https://www.codecademy.com/learn/paths/code-foundations", certificate: cert("5b55e668646caa552f8e4d1d") },
  { title: "Learn HTML", kind: "course", group: "code", syllabus: "https://www.codecademy.com/learn/learn-html", certificate: cert("9eb0741e5ebef1f9f58a53bfac67d3a7") },
  { title: "Learn CSS: Flexbox and Grid", kind: "course", group: "code", syllabus: "https://www.codecademy.com/learn/learn-css-flexbox-and-grid", certificate: cert("93533d9ae7544926b4943d59201cdeae") },
  { title: "Learn CSS: Responsive Design", kind: "course", group: "code", syllabus: "https://www.codecademy.com/learn/learn-responsive-design", certificate: cert("3a62023b0054dc793edc0adecd715fd7") },
  { title: "Learn CSS: Typography and Fonts", kind: "course", group: "code", syllabus: "https://www.codecademy.com/learn/learn-css-typography-and-fonts", certificate: cert("f3a0c29e357d4c90b74d8093009ced22") },
  { title: "Learn JavaScript", kind: "course", group: "code", syllabus: "https://www.codecademy.com/learn/introduction-to-javascript", certificate: cert("705dcb15de0da4dd9d9fc4f3274b430e") },
  { title: "Learn React", kind: "course", group: "code", syllabus: "https://www.codecademy.com/learn/react-101", certificate: cert("af00e5032d0a68cc84879983f5d8333b") },
  { title: "Learn Git & GitHub", kind: "course", group: "code", syllabus: "https://www.codecademy.com/learn/learn-git", certificate: cert("a8ab218d5950c29861635cc0bf12fd13") },
];

export const CERTIFS_UX = CERTIFICATES.filter((item) => item.group === "ux");
export const CERTIFS_CODE = CERTIFICATES.filter((item) => item.group === "code");

export const WHY: { num: string; mark: string; title: L; desc: L; accent: string }[] = [
  {
    num: "01",
    mark: "01",
    title: { fr: "La clarté avant l'effet", en: "Clarity before effect", de: "Klarheit vor dem Effekt", sk: "Jasnosť pred efektom", cs: "Jasnost před efektem" },
    desc: {
      fr: "Je nomme le parcours, les mots et les états vides avant de choisir une couleur. Le beau vient après, quand la lecture est déjà juste.",
      en: "I name the journey, the words and the empty states before choosing a colour. Beauty comes after, when the reading is already right.",
      de: "Ich benenne den Ablauf, die Wörter und die leeren Zustände, bevor ich eine Farbe wähle. Schönheit kommt danach, wenn das Lesen schon stimmt.", sk: "Najprv pomenujem cestu, slová a prázdne stavy, až potom volím farbu. Krása prichádza potom, keď je čítanie už správne.", cs: "Nejprve pojmenuji cestu, slova a prázdné stavy, teprve pak volím barvu. Krása přichází potom, když je čtení už správné.",
    },
    accent: "#D4AF37",
  },
  {
    num: "02",
    mark: "02",
    title: { fr: "La main, puis l'écran", en: "The hand, then the screen", de: "Die Hand, dann der Bildschirm", sk: "Ruka, potom obrazovka", cs: "Ruka, potom obrazovka" },
    desc: {
      fr: "Wireframe au crayon, illustration, puis prototype. Je ne commence pas dans un logiciel pour cacher une idée encore floue.",
      en: "Pencil wireframe, illustration, then prototype. I don't open software to hide an idea that is still blurry.",
      de: "Wireframe mit dem Stift, Illustration, dann Prototyp. Ich öffne keine Software, um eine noch unscharfe Idee zu verstecken.", sk: "Wireframe ceruzkou, ilustrácia, potom prototyp. Neotváram softvér, aby som skryla ešte nejasnú myšlienku.", cs: "Wireframe tužkou, ilustrace, potom prototyp. Neotvírám software, abych skryla ještě nejasnou myšlenku.",
    },
    accent: "#2EE6A6",
  },
  {
    num: "03",
    mark: "03",
    title: { fr: "Une pensée qui tient la complexité", en: "A mind that holds complexity", de: "Ein Denken, das Komplexität trägt", sk: "Myslenie, ktoré unesie zložitosť", cs: "Myšlení, které unese složitost" },
    desc: {
      fr: "Le haut potentiel me sert à tenir beaucoup d'informations, puis à n'en garder que ce qui aide.",
      en: "High potential lets me hold a lot of information, then keep only what helps.",
      de: "Hochbegabung erlaubt mir, viele Informationen zu halten und nur das zu behalten, was hilft.", sk: "Vysoký potenciál mi umožňuje udržať veľa informácií a ponechať si len to, čo pomáha.", cs: "Vysoký potenciál mi umožňuje udržet mnoho informací a ponechat si jen to, co pomáhá.",
    },
    accent: "#7FD4FF",
  },
  {
    num: "04",
    mark: "04",
    title: { fr: "Le droit comme méthode", en: "Law as a method", de: "Recht als Methode", sk: "Právo ako metóda", cs: "Právo jako metoda" },
    desc: {
      fr: "Rigueur, précision, logique, structure. Lire une spécification comme un contrat : chaque terme a un sens.",
      en: "Rigour, precision, logic, structure. Reading a specification like a contract: every term has a meaning.",
      de: "Strenge, Präzision, Logik, Struktur. Eine Spezifikation wie einen Vertrag lesen: jeder Begriff hat einen Sinn.", sk: "Prísnosť, presnosť, logika, štruktúra. Čítať špecifikáciu ako zmluvu: každý pojem má význam.", cs: "Přísnost, přesnost, logika, struktura. Číst specifikaci jako smlouvu: každý pojem má význam.",
    },
    accent: "#D4AF37",
  },
  {
    num: "05",
    mark: "05",
    title: { fr: "Case study complet", en: "A full case study", de: "Vollständige Fallstudie", sk: "Kompletná prípadová štúdia", cs: "Kompletní případová studie" },
    desc: {
      fr: "Chaque projet est documenté — intention, wireframe, itération, décision — pas seulement le résultat final.",
      en: "Every project is documented — intent, wireframe, iteration, decision — not only the final result.",
      de: "Jedes Projekt ist dokumentiert — Absicht, Wireframe, Iteration, Entscheidung — nicht nur das Endergebnis.", sk: "Každý projekt je zdokumentovaný — zámer, wireframe, iterácia, rozhodnutie — nielen konečný výsledok.", cs: "Každý projekt je zdokumentován — záměr, wireframe, iterace, rozhodnutí — nejen konečný výsledek.",
    },
    accent: "#2EE6A6",
  },
  {
    num: "06",
    mark: "06",
    title: { fr: "Handoff développeur", en: "Developer handoff", de: "Entwickler-Handoff", sk: "Handoff pre vývojára", cs: "Handoff pro vývojáře" },
    desc: {
      fr: "Tokens, fichiers, checklist d'accessibilité. Ce qu'un développeur peut exécuter sans réunion supplémentaire.",
      en: "Tokens, files, an accessibility checklist. What a developer can build without another meeting.",
      de: "Tokens, Dateien, Checkliste zur Barrierefreiheit. Was eine Entwicklerin ohne weiteres Meeting umsetzen kann.", sk: "Tokeny, súbory, kontrolný zoznam prístupnosti. To, čo vývojár zrealizuje bez ďalšej schôdzky.", cs: "Tokeny, soubory, kontrolní seznam přístupnosti. To, co vývojář realizuje bez další schůzky.",
    },
    accent: "#7FD4FF",
  },
];

export const TOOLS: { name: string; cat: "DESIGN" | "CODE" | "OFFICE"; desc: L }[] = [
  { name: "Figma", cat: "DESIGN", desc: { fr: "Maquettes, prototypes, handoff.", en: "Mocks, prototypes, handoff.", de: "Entwürfe, Prototypen, Handoff.", sk: "Makety, prototypy, handoff.", cs: "Makety, prototypy, handoff." } },
  { name: "Sketch", cat: "DESIGN", desc: { fr: "Croquis d'interface et variantes.", en: "Interface sketches and variants.", de: "Interface-Skizzen und Varianten.", sk: "Skice rozhrania a varianty.", cs: "Skici rozhraní a varianty." } },
  { name: "Blender", cat: "DESIGN", desc: { fr: "Volumes, lumière, visuels 3D.", en: "Volumes, light, 3D visuals.", de: "Volumen, Licht, 3D-Bilder.", sk: "Objemy, svetlo, 3D vizuály.", cs: "Objemy, světlo, 3D vizuály." } },
  { name: "Excel", cat: "OFFICE", desc: { fr: "Chiffrage et tableaux de suivi.", en: "Pricing and tracking sheets.", de: "Kalkulation und Übersichtstabellen.", sk: "Oceňovanie a tabuľky sledovania.", cs: "Oceňování a tabulky sledování." } },
  { name: "Word", cat: "OFFICE", desc: { fr: "Dossiers, devis, textes longs.", en: "Dossiers, quotes, long texts.", de: "Dossiers, Angebote, lange Texte.", sk: "Spisy, ponuky, dlhé texty.", cs: "Spisy, nabídky, dlouhé texty." } },
  { name: "Notion", cat: "OFFICE", desc: { fr: "Briefs écrits et suivi asynchrone.", en: "Written briefs and async tracking.", de: "Schriftliche Briefings und asynchrone Nachverfolgung.", sk: "Písomné briefy a asynchrónne sledovanie.", cs: "Písemné briefy a asynchronní sledování." } },
  { name: "VS Code", cat: "CODE", desc: { fr: "Édition front-end, fichier par fichier.", en: "Front-end editing, file by file.", de: "Front-end-Arbeit, Datei für Datei.", sk: "Úpravy front-endu, súbor po súbore.", cs: "Úpravy front-endu, soubor po souboru." } },
  { name: "Git & GitHub", cat: "CODE", desc: { fr: "Historique public et dépôts vérifiables.", en: "Public history and verifiable repositories.", de: "Öffentliche Historie und prüfbare Repositories.", sk: "Verejná história a overiteľné repozitáre.", cs: "Veřejná historie a ověřitelné repozitáře." } },
  { name: "HTML · CSS · JS", cat: "CODE", desc: { fr: "La page elle-même, sans framework obligatoire.", en: "The page itself, no mandatory framework.", de: "Die Seite selbst, kein Pflicht-Framework.", sk: "Samotná stránka, bez povinného frameworku.", cs: "Samotná stránka, bez povinného frameworku." } },
  { name: "React", cat: "CODE", desc: { fr: "Composants, état, interfaces dynamiques.", en: "Components, state, dynamic interfaces.", de: "Komponenten, Zustand, dynamische Interfaces.", sk: "Komponenty, stav, dynamické rozhrania.", cs: "Komponenty, stav, dynamická rozhraní." } },
];

export const CONTACT_SERVICES: L[] = [
  { fr: "UX/UI Design", en: "UX/UI Design", de: "UX/UI Design", sk: "UX/UI Design", cs: "UX/UI Design" },
  { fr: "Site web", en: "Website", de: "Website", sk: "Webová stránka", cs: "Webová stránka" },
  { fr: "Identité visuelle", en: "Visual identity", de: "Visuelle Identität", sk: "Vizuálna identita", cs: "Vizuální identita" },
  { fr: "Maquette Figma", en: "Figma prototype", de: "Figma-Prototyp", sk: "Prototyp vo Figme", cs: "Prototyp ve Figmě" },
  { fr: "Design system", en: "Design system", de: "Designsystem", sk: "Dizajnový systém", cs: "Designový systém" },
  { fr: "Documentation", en: "Documentation", de: "Dokumentation", sk: "Dokumentácia", cs: "Dokumentace" },
  { fr: "Refonte UX", en: "UX redesign", de: "UX-Überarbeitung", sk: "UX redizajn", cs: "UX redesign" },
  { fr: "Autre", en: "Other", de: "Anderes", sk: "Iné", cs: "Jiné" },
];

export const BUDGETS = ["< 500 €", "500 – 1 000 €", "1 000 – 2 500 €", "2 500 – 5 000 €", "> 5 000 €"];

export const URGENCIES: { label: L; sub: L }[] = [
  { label: { fr: "Flexible", en: "Flexible", de: "Flexibel", sk: "Flexibilný", cs: "Flexibilní" }, sub: { fr: "4 semaines et plus", en: "4 weeks or more", de: "4 Wochen und mehr", sk: "4 týždne a viac", cs: "4 týdny a více" } },
  { label: { fr: "Standard", en: "Standard", de: "Standard", sk: "Štandard", cs: "Standard" }, sub: { fr: "2 à 4 semaines", en: "2 to 4 weeks", de: "2 bis 4 Wochen", sk: "2 až 4 týždne", cs: "2 až 4 týdny" } },
  { label: { fr: "Urgent", en: "Urgent", de: "Dringend", sk: "Súrne", cs: "Naléhavé" }, sub: { fr: "1 à 2 semaines", en: "1 to 2 weeks", de: "1 bis 2 Wochen", sk: "1 až 2 týždne", cs: "1 až 2 týdny" } },
  { label: { fr: "Prioritaire", en: "Priority", de: "Priorität", sk: "Prioritné", cs: "Prioritní" }, sub: { fr: "Moins d'une semaine", en: "Under one week", de: "Unter einer Woche", sk: "Menej ako týždeň", cs: "Méně než týden" } },
];

export const EMAIL = "reinestudio@proton.me";
/** Conservé pour le lien wa.me. Ne jamais l'afficher : le numéro reste hors de l'interface. */
export const PHONE_DISPLAY = "+33 7 52 03 75 73";
export const PHONE_E164 = "33752037573";

export function whatsAppHref(text = "") {
  const note = text.trim();
  return note ? `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(note)}` : `https://wa.me/${PHONE_E164}`;
}
export const GITHUB = "https://github.com/reinevannel";
export const LINKEDIN = "https://www.linkedin.com/in/reine-vannel-a01934438/";
export const LINKEDIN_CERTS = "https://www.linkedin.com/in/reine-vannel-a01934438/details/certifications/";

export const DESIGN_WORDS: Record<Lang, string[]> = {
  fr: ["Interface.", "Récit.", "Identité.", "Clarté."],
  en: ["Interface.", "Narrative.", "Identity.", "Clarity."],
  de: ["Interface.", "Erzählung.", "Identität.", "Klarheit."],
  sk: ["Rozhranie.", "Príbeh.", "Identita.", "Jasnosť."],
  cs: ["Rozhraní.", "Příběh.", "Identita.", "Jasnost."],
};

export const CODE_WORDS: Record<Lang, string[]> = {
  fr: ["grid(8pt)", "const emerge = true", "pixel-perfect", "// front-end vivant"],
  en: ["grid(8pt)", "const emerge = true", "pixel-perfect", "// living front-end"],
  de: ["grid(8pt)", "const emerge = true", "pixel-perfect", "// lebendiges Front-End"],
  sk: ["grid(8pt)", "const emerge = true", "pixel-perfect", "// živý front-end"],
  cs: ["grid(8pt)", "const emerge = true", "pixel-perfect", "// živý front-end"],
};
