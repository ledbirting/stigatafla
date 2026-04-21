/**
 * Shared league team badges (leidbirting-efni). All badge assets use .png.
 * Club-specific home badges: STIGATAFLA_BADGE_KR, STIGATAFLA_BADGE_KEFLAVIK.
 */
(function (global) {
  var B = "https://media.zapp.is/storage/v1/object/public/ledbirting-efni/";
  global.STIGATAFLA_LEAGUE_TEAMS = [
    { id: "afturelding", name: "Afturelding", badgeUrl: B + "Afturelding-F.png" },
    { id: "breidablik", name: "Breiðablik", badgeUrl: B + "Breidablik.png" },
    { id: "fh", name: "FH", badgeUrl: B + "FH-F.png" },
    { id: "fjolnir", name: "Fjölnir", badgeUrl: B + "Fjolnir.png" },
    { id: "fram", name: "Fram", badgeUrl: B + "Fram.png" },
    { id: "fylkir", name: "Fylkir", badgeUrl: B + "Fylkir.png" },
    { id: "grindavik-njardvik", name: "Grindavík/Njarðvík", badgeUrl: B + "Grindavik-Njardvik.png" },
    { id: "grindavik", name: "Grindavík", badgeUrl: B + "Grindavik.png" },
    { id: "grotta", name: "Grótta", badgeUrl: B + "Grotta-F.png" },
    { id: "haukar", name: "Haukar", badgeUrl: B + "Haukar.png" },
    { id: "hk", name: "HK", badgeUrl: B + "HK-F.png" },
    { id: "ia", name: "ÍA", badgeUrl: B + "IA-F.png" },
    { id: "ibv", name: "ÍBV", badgeUrl: B + "IBV.png" },
    { id: "ir", name: "ÍR", badgeUrl: B + "IR.png" },
    { id: "ka", name: "KA", badgeUrl: B + "KA.png" },
    { id: "keflavik", name: "Keflavík", badgeUrl: B + "keflavik.png" },
    { id: "leiknir", name: "Leiknir", badgeUrl: B + "Leiknir.png" },
    { id: "njardvik", name: "Njarðvík", badgeUrl: B + "Njardvik.png" },
    { id: "selfoss", name: "Selfoss", badgeUrl: B + "Selfoss.png" },
    { id: "stjarnan", name: "Stjarnan", badgeUrl: B + "Stjarnan.png" },
    { id: "thor-ka", name: "Þór/KA", badgeUrl: B + "Thor-KA.png" },
    { id: "thor", name: "Þór", badgeUrl: B + "Thor.png" },
    { id: "throttur", name: "Þróttur", badgeUrl: B + "Throttur-F.png" },
    { id: "tindastoll", name: "Tindastóll", badgeUrl: B + "Tindastoll.png" },
    { id: "valur", name: "Valur", badgeUrl: B + "Valur.png" },
    { id: "vestri", name: "Vestri", badgeUrl: B + "Vestri-F.png" },
    { id: "vikingur", name: "Víkingur Reykjavík", badgeUrl: B + "Vikingur.png" },
    { id: "volsungur", name: "Völsungur", badgeUrl: B + "Volsungur.png" },
  ];
  global.STIGATAFLA_BADGE_KR = {
    id: "kr",
    name: "KR",
    badgeUrl: "https://media.zapp.is/storage/v1/object/public/zapp-web-assets/KR/KR.png",
  };
  global.STIGATAFLA_BADGE_KEFLAVIK = {
    id: "keflavik",
    name: "Keflavík",
    badgeUrl: B + "keflavik.png",
  };
})(typeof window !== "undefined" ? window : this);
