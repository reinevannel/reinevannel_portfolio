# 🦋 Reine Vannel Studio

Portfolio UX/UI et front‑end d’**Angélique M. R. Vannel**, conçu comme un atelier numérique où se rencontrent design, précision, narration et exigence.  

Aucune base de données n’est utilisée, aucun compte visiteur n’est requis : tout est pensé pour rester léger, rapide, sécurisé et maîtrisé.  

Le formulaire de contact envoie directement le brief depuis le navigateur vers l’adresse professionnelle : [reinestudio@proton.me](mailto:reinestudio@proton.me).

| | |
|---|---|
| ✉️ E-mail | reinestudio@proton.me |
| 📍 Atelier | Territoire de Belfort, France, à la frontière suisse |
| 🌍 Langues | Français, anglais, allemand, slovaque, tchèque |
| 🎨 Signature | Or, verre, papillon |
| 📦 Publication | le dossier `dist/`, généré après `npm run build` |

---

## ✨ Ce que contient le site

Le site est organisé en cinq espaces principaux, chacun pensé pour être clair, immersif et cohérent avec l’identité du studio.

- 🏠 **Accueil** — une entrée en matière qui mêle atelier de design et terminal numérique, avec une sélection de projets mis en avant pour illustrer la direction artistique et la maîtrise technique.
- 🧭 **Parcours** — un portrait complet, la dualité Droit / Design, les formations suivies, les certificats Codecademy, les outils utilisés au quotidien, et la philosophie de travail.
- 🗂️ **Projets** — une galerie filtrable selon les critères UX ou code, permettant de naviguer facilement entre les interfaces, prototypes, composants et réalisations front‑end.
- 💶 **Services** — une présentation claire des forfaits, disponibles en euro, franc suisse, dollar américain et couronne tchèque, avec un système d’arrondi cohérent et lisible.
- 📬 **Contact** — un formulaire envoyé via Web3Forms, avec une copie automatique dans le presse‑papiers si celui‑ci est bloqué, pour garantir que le brief arrive toujours à destination.
- 💬 **WhatsApp et LinkedIn** — des boutons flottants, discrets et accessibles, sans numéro affiché pour préserver la confidentialité.
- 🌙 **Mode clair / sombre**, préchargeur papillon, navigation au clavier — l’ensemble du site est optimisé pour l’accessibilité, la fluidité et le confort d’utilisation.

La langue par défaut est le français : l’adresse ne comporte pas de `?lang=`.  
Les autres langues s’ajoutent simplement : `?lang=en`, `?lang=de`, `?lang=sk`, `?lang=cs`.

---

## 🧰 Technique

Le site repose sur un socle moderne, rapide et minimaliste, pensé pour être durable et facile à maintenir.

| Outil | Rôle |
|---|---|
| [React 19](https://react.dev) | Interface et composants |
| [Vite](https://vite.dev) | Développement, hot reload, build |
| [TypeScript](https://www.typescriptlang.org) | Vérification stricte des types |
| [Tailwind CSS 4](https://tailwindcss.com) | Tokens `@theme` dans `src/styles.css` |
| Web3Forms | Envoi du brief côté navigateur |
| GitHub Actions | Test, build, publication automatique sur GitHub Pages |

Aucun routeur n’est installé : les pages changent via l’adresse du navigateur (`src/portfolio/link.tsx`).  
Ce choix permet un contrôle total sur la structure, une simplicité maximale et une performance optimale.

---

## 💻 Lancer en local

Le projet nécessite [Node.js 22](https://nodejs.org) (ou 20.19 au minimum).

```bash
npm install
npm run dev
```

Ouvrir ensuite :  
👉 [http://127.0.0.1:5173](http://127.0.0.1:5173)

Commandes principales :

```bash
npm test          # vérifie les textes, les tarifs, les certificats
npm run build     # vérifie les types, puis écrit dist/
npm run preview   # sert dist/ sur http://127.0.0.1:4173
```

`npm run build` doit impérativement se terminer sans erreur avant toute publication.  
Le dossier à mettre en ligne est **`dist/`**, jamais `src/` et jamais `node_modules/`.

---

## 🗂️ Carte du dossier

```text
reine-vannel-studio/
├── .github/workflows/deploy.yml   ← GitHub Actions
├── public/                        ← images, favicon, robots.txt
├── src/
│   ├── main.tsx                   ← choix de la page
│   ├── styles.css                 ← tout le visuel
│   └── portfolio/
│       ├── content.ts             ← projets, certificats, services, liens
│       ├── i18n-data.ts           ← tous les textes, 5 langues
│       ├── pricing.ts             ← devises et arrondi
│       ├── pages/                 ← Accueil, Parcours, Projets, Services, Contact
│       └── pages/Contact.tsx      ← clé publique Web3Forms
├── index.html
├── package.json
├── vercel.json                    ← repli SPA pour Vercel
└── vite.config.ts
```

Les dossiers `node_modules/` et `dist/` ne doivent jamais être commités : ils sont listés dans `.gitignore`.

---

## 📄 Droits

© 2026 Angélique M. R. Vannel · Reine Vannel Studio. Tous droits réservés.

Les certificats restent ceux de Codecademy. Les polices viennent de Google Fonts (Fraunces, DM Sans, JetBrains Mono, Caveat).