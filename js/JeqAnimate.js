"use strict";
Jeq.animate = (function () {
    var fade = function (domId, method, callBack) {
            var domNode = document.getElementById(domId);

            if (method === "show") {
                domNode.style.zIndex = 99;
                domNode.classList.remove("fadeOut");
                domNode.classList.add("fadeIn");

                if (callBack !== undefined) {
                    setTimeout(function () {
                        domNode = null;
                        callBack();
                    }, 350);
                }
            }

            if (method === "hide") {
                domNode.classList.remove("fadeIn");
                domNode.classList.add("fadeOut");

                setTimeout(function () {
                    domNode.style.zIndex = 0;

                    if (callBack !== undefined) {
                        domNode = null;
                        callBack();
                    }
                }, 350);
            }
        },
        nav = function () {
            var wrap = document.getElementById("wrap"),
                nav = document.getElementsByTagName("nav"),
                navState = Jeq.get("navState"),
                modalState = Jeq.get("modalState"),
                clientHeight = Jeq.get("clientHeight");

            //nav is open
            if (navState) {
                wrap.style.height = "auto";
                nav[0].style.cssText = "top: -100%; height: " + Jeq.get("clientHeight") + "px";

                Jeq.animate.navBtn();
                Jeq.set("navState", false);

                clientHeight = null;
                navState = null;
                nav = null;
                wrap = null;
            } else {
                if (modalState) {
                    Jeq.animate.modal(function () {
                        Router.navigate('portfolio');
                    });
                } else {
                    wrap.style.cssText = "height: " + clientHeight + "px; overflow: hidden";

                    nav[0].style.cssText = "top: 0px; height: " + clientHeight + "px";

                    Jeq.animate.navBtn();
                    Jeq.set("navState", true);
                }

                clientHeight = null;
                navState = null;
                nav = null;
                wrap = null;
            }
        },
        navBtn = function () {
            var navBtn = document.getElementById("navBtn"),
                navSvgs = navBtn.querySelectorAll("svg"),
                btnState = Jeq.get("btnState"),
                modalState = Jeq.get("modalState"),
                clientWidth = Jeq.get("clientWidth"),
                svgTop = document.querySelector(".gh-svg-top"),
                svgBottom = document.querySelector(".gh-svg-bottom");

            if (!btnState) {
                //if nav btn is original state
                if (modalState) {
                    setTimeout(function () {
                        navBtn.style.cssText = "background: rgba(255, 255, 255, 0.9); box-shadow: 0 1px 10px rgba(43, 46, 57, 0.4)";
                    }, 200);
                }

                Jeq.set("btnState", true);
                for (var i = 0, len = navSvgs.length; i < len; i++) {
                    if (!modalState) {
                        navSvgs[i].style.fill = "#ffffff";
                    }
                };

                if (clientWidth === 768 || clientWidth > 768) {
                    console.log("yay")
                    svgTop.style.cssText += "transform: translate(-3.5px, 3.5px) rotate(45deg);"
                    svgBottom.style.cssText += "transform: translate(-3.5px, -3.5px) rotate(-45deg);"
                };

                if (clientWidth < 768 && clientWidth !== 768) {
                    svgTop.style.cssText += "transform: translate(-2.5px, 2.5px) rotate(45deg);"
                    svgBottom.style.cssText += "transform: translate(-2.5px, -2.5px) rotate(-45deg);"
                }
            } else {
                Jeq.set("btnState", false);

                if (modalState) {
                    navBtn.style.cssText = "background: none; box-shadow: none;";
                }

                svgTop.style.cssText += "transform: translate(0, 0) rotate(0deg);"
                svgBottom.style.cssText += "transform: translate(0, 0) rotate(0deg);"

                setTimeout(function () {
                    var navSvgs = navBtn.querySelectorAll("svg")

                    for (var i = 0, len = navSvgs.length; i < len; i++) {
                        navSvgs[i].style.fill = "#323031";
                    };

                }, 350);
            }
        },
        modal = function (callBack) {
            var wrap = document.getElementById("wrap"),
                modal = document.getElementById("modal"),
                modalState = Jeq.get("modalState"),
                firstVisit = Jeq.get("firstVisit"),
                clientHeight = Jeq.get("clientHeight");

            //If modal is open
            if (modalState) {
                Jeq.animate.navBtn();
                Jeq.set("modalState", false);
                modal.style.cssText = "position: fixed; top: 100%";

                wrap.style.height = "auto";
            } else {
                if (!firstVisit) {
                    modal.style.cssText = "position: absolute; top: 0px; height: " + clientHeight + "px";

                    wrap.style.cssText = "height: " + clientHeight + "px; overflow: hidden";
                } else {
                    //firstVisit
                    modal.style.cssText = "position: absolute; z-index: 99; height: " + clientHeight + "px";
                    wrap.style.cssText = "height: " + clientHeight + "px; overflow: hidden";
                }

                Jeq.set("modalState", true);
                Jeq.animate.navBtn();
            }
            //Jeq.animate.navBtn(false);
            if (callBack !== undefined) {
                callBack();
            }
        };

    return this.utils.extend({
        fade: fade,
        nav: nav,
        navBtn: navBtn,
        modal: modal
    });
}).apply(Jeq);