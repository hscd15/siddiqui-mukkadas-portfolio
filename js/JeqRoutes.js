"use strict";
var Router = new Grapnel(),
    JeqRoutes = {
        "": function () {
            Jeq.firstVisit();
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
            Jeq.firstVisit();
            Jeq.string.setHeading("Portfolio");
            document.title = "Porfolio | Mukkadas Siddiqui";

            var modalState = Jeq.get("modalState");
            if (modalState) {
                Jeq.animate.modal();
            }

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

            var url = "templates/portfolio/" + Jeq.string.camelCase(req.params.pieceId) + ".html";

            Jeq.ajax({
                "method": "get",
                "url": url
            }, function (resultData) {
                Jeq.html.set({
                    "nodeId": "modal",
                    "type": "piece",
                    "data": resultData
                }, function () {
                    Jeq.animate.modal(function () {
                        setTimeout(function () {
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
                        }, 300);
                    });
                });
            });


        },
        "resume": function () {
            Jeq.firstVisit();
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
            Jeq.firstVisit();
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