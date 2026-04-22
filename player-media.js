/**
 * Full-screen media overlay on the scoreboard: intro / goal sequences.
 * Videos play through; still images use a fixed duration (30s for goals per product spec).
 * Controllable intro: next / previous / stop with auto-advance on slide end.
 */
(function (global) {
  var GOAL_IMAGE_MS = 30000;
  var INTRO_IMAGE_MS = 30000;

  function mediaKindFromUrl(url) {
    var path = (url || "").split("?")[0].toLowerCase();
    if (/\.(png|jpe?g|gif|webp|bmp|svg)(\s*$)/.test(path)) return "image";
    return "video";
  }

  function createPlayerMediaPlayer(opts) {
    var overlay = opts.overlay;
    var video = opts.video;
    var img = opts.img;
    var skipBtn = opts.skipBtn;
    var gen = 0;
    var introControllable = null;

    video.setAttribute("playsinline", "");
    video.playsInline = true;

    function hideMedia() {
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.onended = null;
      video.onerror = null;
      img.removeAttribute("src");
      img.style.display = "none";
      video.style.display = "none";
    }

    function hideOverlay() {
      hideMedia();
      overlay.classList.remove("player-media-overlay--visible");
      overlay.setAttribute("aria-hidden", "true");
    }

    function showOverlay() {
      overlay.classList.add("player-media-overlay--visible");
      overlay.setAttribute("aria-hidden", "false");
    }

    function playVideo(url, onDone, myGen) {
      video.muted = false;
      video.style.display = "block";
      img.style.display = "none";
      video.onended = function () {
        video.onended = null;
        if (myGen !== gen) return;
        onDone();
      };
      video.onerror = function () {
        video.onerror = null;
        if (myGen !== gen) return;
        onDone();
      };
      video.src = url;
      var attempt = video.play();
      if (attempt && typeof attempt.catch === "function") {
        attempt.catch(function () {
          if (myGen !== gen) return;
          video.muted = true;
          var p2 = video.play();
          if (p2 && p2.catch) {
            p2.catch(function () {
              if (myGen !== gen) return;
              onDone();
            });
          }
        });
      }
    }

    function playImage(url, durationMs, onDone, myGen) {
      video.style.display = "none";
      img.style.display = "block";
      img.onload = function () {
        img.onload = null;
      };
      img.onerror = function () {
        img.onerror = null;
        if (myGen !== gen) return;
        onDone();
      };
      img.src = url;
      setTimeout(function () {
        if (myGen !== gen) return;
        onDone();
      }, durationMs);
    }

    function playOne(url, imageDurationMs, onDone) {
      var myGen = gen;
      if (!url) {
        onDone();
        return;
      }
      showOverlay();
      if (mediaKindFromUrl(url) === "image") {
        playImage(url, imageDurationMs, onDone, myGen);
      } else {
        playVideo(url, onDone, myGen);
      }
    }

    function playSequence(urls, imageDurationMs, onComplete) {
      introControllable = null;
      var i = 0;
      var myGen = gen;
      function next() {
        if (myGen !== gen) return;
        if (i >= urls.length) {
          hideOverlay();
          if (onComplete) onComplete();
          return;
        }
        var url = urls[i];
        i += 1;
        playOne(url, imageDurationMs, next);
      }
      next();
    }

    function callIntroSlideChange(s, isEnded) {
      if (s && s.onSlideChange) {
        if (isEnded) s.onSlideChange(-1, s.urls ? s.urls.length : 0, true);
        else s.onSlideChange(s.i, s.urls.length, false);
      }
    }

    function playCurrentIntroSlide() {
      var s = introControllable;
      if (!s) return;
      if (s.i >= s.urls.length) {
        var oc = s.onComplete;
        introControllable = null;
        callIntroSlideChange(s, true);
        hideOverlay();
        if (oc) oc();
        return;
      }
      callIntroSlideChange(s, false);
      var myGen = gen;
      var url = s.urls[s.i];
      playOne(url, INTRO_IMAGE_MS, function () {
        if (myGen !== gen) return;
        if (!introControllable || introControllable !== s) return;
        s.i += 1;
        playCurrentIntroSlide();
      });
    }

    function startControllableIntro(urls, onComplete, onSlideChange) {
      if (!urls || !urls.length) {
        if (onComplete) onComplete();
        return;
      }
      gen += 1;
      hideMedia();
      introControllable = {
        urls: urls,
        i: 0,
        onComplete: onComplete,
        onSlideChange: onSlideChange,
      };
      playCurrentIntroSlide();
    }

    function introGoNext() {
      var s = introControllable;
      if (!s) return;
      gen += 1;
      hideMedia();
      if (s.i < s.urls.length) {
        s.i += 1;
      }
      if (s.i >= s.urls.length) {
        var oc = s.onComplete;
        introControllable = null;
        callIntroSlideChange(s, true);
        hideOverlay();
        if (oc) oc();
        return;
      }
      playCurrentIntroSlide();
    }

    function introGoPrev() {
      var s = introControllable;
      if (!s) return;
      if (s.i <= 0) return;
      gen += 1;
      hideMedia();
      s.i -= 1;
      playCurrentIntroSlide();
    }

    function introGetSlideState() {
      var s = introControllable;
      if (!s) return null;
      return { index: s.i, total: s.urls.length, canPrev: s.i > 0, canNext: s.i < s.urls.length - 1, isLast: s.i === s.urls.length - 1 };
    }

    function cancel() {
      gen += 1;
      introControllable = null;
      hideOverlay();
    }

    function isActive() {
      return overlay.classList.contains("player-media-overlay--visible");
    }

    if (skipBtn) {
      skipBtn.addEventListener("click", cancel);
    }

    return {
      GOAL_IMAGE_MS: GOAL_IMAGE_MS,
      INTRO_IMAGE_MS: INTRO_IMAGE_MS,
      mediaKindFromUrl: mediaKindFromUrl,
      playGoalGraphic: function (url, onComplete) {
        if (!url) {
          if (onComplete) onComplete();
          return;
        }
        playSequence([url], GOAL_IMAGE_MS, onComplete);
      },
      playIntroSequence: function (urls, onComplete, onSlideChange) {
        startControllableIntro(urls, onComplete, onSlideChange);
      },
      introNext: introGoNext,
      introPrevious: introGoPrev,
      getIntroSlideState: introGetSlideState,
      cancel: cancel,
      isActive: isActive,
      hide: hideOverlay,
    };
  }

  global.StigataflaPlayerMedia = {
    createPlayerMediaPlayer: createPlayerMediaPlayer,
    mediaKindFromUrl: mediaKindFromUrl,
    GOAL_IMAGE_MS: GOAL_IMAGE_MS,
    INTRO_IMAGE_MS: INTRO_IMAGE_MS,
  };
})(typeof window !== "undefined" ? window : this);
