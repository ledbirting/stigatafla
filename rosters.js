/**
 * Match-day rosters: player intro + goal graphics per club (team id keys).
 * Add players here; empty arrays mean no lineup / goal graphics for that club yet.
 */
(function (global) {
  global.STIGATAFLA_ROSTERS = {
    kr: [
      {
        id: "arnar-freyr-olafsson",
        name: "Arnar Freyr Olafsson",
        number: 1,
        introUrl:
          "https://media.zapp.is/storage/v1/object/public/zapp-web-assets/KR/Player_Graphics/Celebration/KR-Mark-Test.mp4",
        goalUrl:
          "https://media.zapp.is/storage/v1/object/public/zapp-web-assets/KR/Player_Graphics/Introduction/KR-Mark-Test.mp4",
      },
    ],
    keflavik: [],
  };
})(typeof window !== "undefined" ? window : this);
