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
    /** Slide transition between intro slides (ms total ≈ exit + enter); 0 disables. Keflavík uses 700. */
    var introSlideTransitionMs = Math.max(0, Number(opts.introSlideTransitionMs) || 0);
    var gen = 0;
    var introControllable = null;

    video.setAttribute("playsinline", "");
    video.playsInline = true;

    function stripMediaTransforms() {
      video.style.transition = "";
      video.style.transform = "";
      img.style.transition = "";
      img.style.transform = "";
    }

    function hideMedia() {
      stripMediaTransforms();
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.onended = null;
      video.onerror = null;
      img.removeAttribute("src");
      img.style.display = "none";
      video.style.display = "none";
    }

    function visibleOutgoingEl() {
      if (!overlay.classList.contains("player-media-overlay--visible")) return null;
      if (video.style.display === "block" && (video.src || video.currentSrc)) return video;
      if (img.style.display === "block" && img.src) return img;
      return null;
    }

    function playImageWithSlideEnter(url, durationMs, onDone, myGen, fromRight, halfMs, easing) {
      video.style.display = "none";
      img.style.display = "block";
      img.style.transition = "none";
      img.style.transform = "translateX(" + (fromRight ? "100%" : "-100%") + ")";
      var enterDoneTimer = null;
      var displayTimer = null;
      var enterStarted = false;
      function beginEnterFromLoad() {
        if (enterStarted) return;
        enterStarted = true;
        img.onload = null;
        if (myGen !== gen) return;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            if (myGen !== gen) return;
            img.style.transition = "transform " + halfMs + "ms " + easing;
            img.style.transform = "translateX(0)";
          });
        });
        enterDoneTimer = setTimeout(function () {
          if (myGen !== gen) return;
          stripMediaTransforms();
          displayTimer = setTimeout(function () {
            if (myGen !== gen) return;
            onDone();
          }, durationMs);
        }, halfMs);
      }
      img.onload = beginEnterFromLoad;
      img.onerror = function () {
        img.onerror = null;
        if (enterDoneTimer) clearTimeout(enterDoneTimer);
        if (displayTimer) clearTimeout(displayTimer);
        if (myGen !== gen) return;
        onDone();
      };
      img.src = url;
      if (img.complete && img.naturalWidth > 0) {
        beginEnterFromLoad();
      }
    }

    function playVideoWithSlideEnter(url, onDone, myGen, fromRight, halfMs, easing) {
      img.style.display = "none";
      video.style.display = "block";
      video.style.transition = "none";
      video.style.transform = "translateX(" + (fromRight ? "100%" : "-100%") + ")";
      video.muted = false;
      var enterAnimStarted = false;

      function startEnterAnimOnce() {
        if (enterAnimStarted) return;
        enterAnimStarted = true;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            if (myGen !== gen) return;
            video.style.transition = "transform " + halfMs + "ms " + easing;
            video.style.transform = "translateX(0)";
          });
        });
      }

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

      function onLoadedData() {
        video.removeEventListener("loadeddata", onLoadedData);
        startEnterAnimOnce();
      }
      video.addEventListener("loadeddata", onLoadedData);

      video.src = url;
      if (video.readyState >= 2) {
        onLoadedData();
      }
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

    function runIntroSlideTransition(incomingUrl, direction, imageDurationMs, onDone, myGen) {
      var half = introSlideTransitionMs / 2;
      var easing = "cubic-bezier(0.33, 0, 0.2, 1)";
      var outEl = visibleOutgoingEl();
      if (!outEl) {
        playOne(incomingUrl, imageDurationMs, onDone, myGen);
        return;
      }
      outEl.style.transition = "transform " + half + "ms " + easing;
      outEl.style.transform = direction > 0 ? "translateX(-100%)" : "translateX(100%)";
      setTimeout(function () {
        if (myGen !== gen) return;
        stripMediaTransforms();
        hideMedia();
        var fromRight = direction > 0;
        showOverlay();
        if (mediaKindFromUrl(incomingUrl) === "image") {
          playImageWithSlideEnter(
            incomingUrl,
            imageDurationMs,
            onDone,
            myGen,
            fromRight,
            half,
            easing
          );
        } else {
          playVideoWithSlideEnter(incomingUrl, onDone, myGen, fromRight, half, easing);
        }
      }, half);
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

    /**
     * Single full-bleed overlay: still images use imageDurationMs; videos run until ended (duration ignored).
     * Invalidates any in-flight slide timers from a previous run.
     */
    function playOverlayOnce(url, imageDurationMs, onComplete) {
      if (!url) {
        if (onComplete) onComplete();
        return;
      }
      gen += 1;
      introControllable = null;
      var ms = Math.max(1000, Number(imageDurationMs) || GOAL_IMAGE_MS);
      playSequence([url], ms, onComplete);
    }

    function callIntroSlideChange(s, isEnded) {
      if (s && s.onSlideChange) {
        if (isEnded) s.onSlideChange(-1, s.urls ? s.urls.length : 0, true);
        else s.onSlideChange(s.i, s.urls.length, false);
      }
    }

    function playCurrentIntroSlide(slideDirection) {
      if (slideDirection == null) slideDirection = 1;
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
      function onIntroSlideFinished() {
        if (myGen !== gen) return;
        if (!introControllable || introControllable !== s) return;
        s.i += 1;
        playCurrentIntroSlide(1);
      }
      var useSlide = introSlideTransitionMs > 0 && visibleOutgoingEl();
      if (useSlide) {
        runIntroSlideTransition(url, slideDirection, INTRO_IMAGE_MS, onIntroSlideFinished, myGen);
        return;
      }
      playOne(url, INTRO_IMAGE_MS, onIntroSlideFinished);
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
      if (introSlideTransitionMs <= 0) {
        hideMedia();
      }
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
      playCurrentIntroSlide(1);
    }

    function introGoPrev() {
      var s = introControllable;
      if (!s) return;
      if (s.i <= 0) return;
      gen += 1;
      if (introSlideTransitionMs <= 0) {
        hideMedia();
      }
      s.i -= 1;
      playCurrentIntroSlide(-1);
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
      playOverlayOnce: playOverlayOnce,
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
