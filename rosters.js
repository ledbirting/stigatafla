/**
 * Match-day rosters: player intro + goal graphics per club (team id keys).
 * KR: intro JPGs in Introduction/. goalUrl reuses the same file until celebration clips exist.
 */
(function (global) {
  var KR_INTRO =
    "https://media.zapp.is/storage/v1/object/public/zapp-web-assets/KR/Player_Graphics/Introduction/";

  function krImg(file) {
    var u = KR_INTRO + file;
    return { introUrl: u, goalUrl: u };
  }

  var ROSTERS = {
    kr: [
      { id: "p0", name: "Óskar Hrafn Þorvaldsson", number: 0, isStaff: true, ...krImg("0-Oskar.jpg") },
      { id: "p1", name: "Arnar Freyr Ólafsson", number: 1, ...krImg("1-Arnar.jpg") },
      { id: "p4", name: "Michael Akoto", number: 4, ...krImg("4-Akoto.jpg") },
      { id: "p5", name: "Birgir Steinn Styrmisson", number: 5, ...krImg("5-Birgir.jpg") },
      { id: "p6", name: "Alexander Helgi Sigurðarspn", number: 6, ...krImg("6-Alexander.jpg") },
      { id: "p7", name: "Finnur Tómas Pálmason", number: 7, ...krImg("7-Finnur.jpg") },
      { id: "p8", name: "Stefán Árni Geirsson", number: 8, ...krImg("8-Stefan.jpg") },
      { id: "p9", name: "Eiður Gauti Sæbjörnsson", number: 9, ...krImg("9-Eidur.jpg") },
      { id: "p10", name: "Guðmundur Andri Tryggvason", number: 10, ...krImg("10-Gudmundur.jpg") },
      { id: "p11", name: "Aron Sigurðarson", number: 11, ...krImg("11-Aron.jpg") },
      { id: "p12", name: "Halldór Snær Garðarsspn", number: 12, ...krImg("12-Halldor.jpg") },
      { id: "p14", name: "Alexander Rafn Pálmason", number: 14, ...krImg("14-Alexander.jpg") },
      { id: "p15", name: "Gyrðir Hrafn Guðbrandsson", number: 15, ...krImg("15-Gyrdir.jpg") },
      { id: "p16", name: "Fredrick Delali", number: 16, ...krImg("16-Delali.jpg") },
      { id: "p17", name: "Luke Rae", number: 17, ...krImg("17-Rae.jpg") },
      { id: "p18", name: "Jón Ernir Ragnarsson", number: 18, ...krImg("18-Jon.jpg") },
      { id: "p19", name: "Amin Cosic", number: 19, ...krImg("19-Cosic.jpg") },
      { id: "p20", name: "Tristan Gauti Línberg Arnórsson", number: 20, ...krImg("20-Tristan-Gauti.jpg") },
      { id: "p21", name: "Gabríel Hrannar", number: 21, ...krImg("21-Gabriel-Hrannar.jpg") },
      { id: "p22", name: "Ástbjörn Þórðarson", number: 22, ...krImg("22-Astbjorn-Thordarson.jpg") },
      { id: "p23", name: "Arnór Ingvi Traustason", number: 23, ...krImg("23-Arnor-Ingvi.jpg") },
      { id: "p24", name: "Fannar Heimisson", number: 24, ...krImg("24-Fannar.jpg") },
      { id: "p25", name: "Matthías Björgvin Kjartansson", number: 25, ...krImg("25-Matthias.jpg") },
      { id: "p26", name: "Hrafn Tómasson", number: 26, ...krImg("26-Krummi.jpg") },
      { id: "p28", name: "Hjalti Sigurðsson", number: 28, ...krImg("28-Hjalti.jpg") },
      { id: "p29", name: "Aron Þórður Albertsson", number: 29, ...krImg("29-Aron.jpg") },
      { id: "p30", name: "Sigurður Breki Kárasson", number: 30, ...krImg("30-Sigurdur.jpg") },
      { id: "p33", name: "Skarphéðinn Gauti Ingimarsson", number: 33, ...krImg("33-Skarphedinn.jpg") },
      { id: "p37", name: "Marinó Leví Ottósson", number: 37, ...krImg("37-Marino.jpg") },
      { id: "p45", name: "Galdur Guðmundsson", number: 45, ...krImg("45-Galdur.jpg") },
      { id: "p77", name: "Orri Hrafn Kjartansson", number: 77, ...krImg("77-Orri.jpg") },
      { id: "p99", name: "Haukur Logi Tryggvason", number: 99, ...krImg("99-Haukur.jpg") },
    ],
    keflavik: [
      { id: "kef-manager", name: "Þjálfari", isStaff: true, number: null, introUrl: "", goalUrl: "" },
    ],
  };
  global.STIGATAFLA_ROSTERS_DEFAULT = ROSTERS;
  global.STIGATAFLA_ROSTERS = ROSTERS;
})(typeof window !== "undefined" ? window : this);
