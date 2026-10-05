import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CERTIFICATES, EMAIL, PHONE_DISPLAY, PHONE_E164, PROJECTS, SERVICES } from "./content.ts";
import { LANGS, translations } from "./i18n-data.ts";
import { morphKind, PRELOADER, stageIndex } from "./preloader-math.ts";
import { computePrice, formatCurrency } from "./pricing.ts";

describe("traductions", () => {
  it("chaque clé existe dans chaque langue", () => {
    for (const [key, value] of Object.entries(translations)) {
      for (const lang of LANGS) {
        assert.equal(typeof value[lang], "string", `${key}.${lang}`);
        assert.ok(value[lang].trim().length > 0, `${key}.${lang} vide`);
      }
    }
  });
});

describe("preloader", () => {
  it("laisse le temps d'accueillir, sans rester trop longtemps", () => {
    assert.ok(PRELOADER.welcomeMs >= 1000);
    assert.ok(PRELOADER.welcomeMs <= 2000);
    assert.ok(PRELOADER.morphMs >= 4000);
    assert.ok(PRELOADER.morphMs <= 5600);
  });

  it("fait correspondre le pourcentage à la bonne étape", () => {
    assert.equal(stageIndex(0), 0);
    assert.equal(stageIndex(19), 0);
    assert.equal(stageIndex(20), 1);
    assert.equal(stageIndex(46), 2);
    assert.equal(stageIndex(72), 3);
    assert.equal(stageIndex(100), 4);
  });

  it("métamorphose l'œuf en papillon", () => {
    assert.equal(morphKind(0), "egg");
    assert.equal(morphKind(0.25), "caterpillar");
    assert.equal(morphKind(0.45), "cocoon");
    assert.equal(morphKind(0.7), "butterfly");
  });
});

describe("tarifs", () => {
  it("inclut 5 écrans et 1 langue dans le forfait", () => {
    assert.equal(computePrice(1850, 120, 200, 5, 1), 1850);
    assert.equal(computePrice(1850, 120, 200, 8, 2), 1850 + 360 + 200);
  });

  it("n'affiche pas de prix pour le front-end 2028", () => {
    assert.equal(computePrice(0, 0, 0, 8, 1), null);
  });

  it("convertit et arrondit à la dizaine", () => {
    assert.equal(formatCurrency(550, "CHF"), "CHF 550");
    assert.equal(formatCurrency(550, "EUR"), "€ 530");
    assert.equal(formatCurrency(550, "USD"), "$610");
    assert.equal(formatCurrency(550, "CZK"), "14\u202f300\u00a0Kč");
  });
});

describe("certificats", () => {
  it("liste les vrais certificats Codecademy, chacun avec un lien public", () => {
    assert.equal(EMAIL, "reinestudio@proton.me");
    assert.equal(PHONE_DISPLAY, "+33 7 52 03 75 73");
    assert.equal(PHONE_E164, "33752037573");
    assert.equal(CERTIFICATES.length, 20);
    assert.equal(CERTIFICATES.filter((item) => item.group === "ux").length, 10);
    assert.equal(CERTIFICATES.filter((item) => item.group === "code").length, 10);
    const titles = new Set<string>();
    for (const item of CERTIFICATES) {
      assert.ok(item.title.length > 3);
      assert.equal(titles.has(item.title), false, item.title);
      titles.add(item.title);
      assert.equal(item.certificate.startsWith("https://www.codecademy.com/profiles/reine.vannel/certificates/"), true);
      assert.equal(item.syllabus.startsWith("https://www.codecademy.com/"), true);
      assert.equal(item.group === "ux" || item.group === "code", true);
    }
  });
});

describe("projets", () => {
  it("pointe les aperçus vers des adresses https réelles", () => {
    for (const project of PROJECTS) {
      assert.equal(project.image.startsWith("/"), true, project.id);
      assert.equal(project.image.includes("unsplash"), false);
      if (project.live) {
        assert.equal(project.live.startsWith("https://"), true, project.id);
      }
      for (const lang of LANGS) {
        assert.ok(project.desc[lang].length > 20);
        assert.ok(project.sub[lang].length > 3);
      }
    }
  });

  it("donne un titre dans chaque langue à chaque service", () => {
    assert.ok(SERVICES.length >= 8);
    for (const service of SERVICES) {
      for (const lang of LANGS) assert.ok(service.title[lang].length > 1);
    }
  });
});
