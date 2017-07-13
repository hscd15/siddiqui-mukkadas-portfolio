"use strict";
var Router = new Grapnel(),
    JeqRoutes = {
        "": function () {
            Jeq.string.setHeading("About Me");
            document.title = "About Me | Mukkadas Siddiqui";

            Jeq.ajax({
                "method": "get",
                "url": "templates/aboutMe.html"
            }, function (resultData) {
                Jeq.html.set({
                    "nodeId": "content",
                    "type": "main",
                    "data": resultData
                });
            });
        },
        "portfolio": function () {
            Jeq.string.setHeading("Portfolio");
            document.title = "Porfolio | Mukkadas Siddiqui";

            Jeq.ajax({
                "method": "get",
                "url": "templates/portfolio.html"
            }, function (resultData) {
                Jeq.html.set({
                    "nodeId": "content",
                    "type": "main",
                    "data": resultData
                });
            });
        },
        "portfolio/:pieceId": function (req, e) {
            Jeq.string.setHeading(req.params.pieceId);

            var url = "templates/portfolio/" + Jeq.string.camelCase(req.params.pieceId) + ".html",
                firstVisit = Jeq.get("firstVisit"),
                article = document.getElementById("content"),
                clientHeight = Jeq.get("clientHeight");

            if (firstVisit) {
                Jeq.ajax({
                    "method": "get",
                    "url": url
                }, function (resultData) {
                    Jeq.html.set({
                        "nodeId": "content",
                        "type": "main",
                        "data": resultData
                    }, function () {
                        article.style.height = (clientHeight - 60) + "px";
                    });
                });
            } else {
                Jeq.ajax({
                    "method": "get",
                    "url": url
                }, function (resultData) {
                    Jeq.html.set({
                        "nodeId": "JeqModal",
                        "type": "piece",
                        "data": resultData
                    }, function () {
                        Jeq.animate.modal();
                    });
                });
            }
        },
        "resume": function () {
            Jeq.string.setHeading("Resume");
            document.title = "Resume | Mukkadas Siddiqui";

            Jeq.ajax({
                "method": "get",
                "url": "templates/resume.html"
            }, function (resultData) {
                Jeq.html.set({
                    "nodeId": "content",
                    "type": "main",
                    "data": resultData
                });
            });
        },
        "contact": function () {
            Jeq.string.setHeading("Contact");
            document.title = "Contact Me | Mukkadas Siddiqui";

            Jeq.ajax({
                "method": "get",
                "url": "templates/contactMe.html"
            }, function (resultData) {
                Jeq.html.set({
                    "nodeId": "content",
                    "type": "main",
                    "data": resultData
                });
            });
        }
    };

Grapnel.listen(JeqRoutes);
document.addEventListener("DOMContentLoaded", Jeq.init(), false);