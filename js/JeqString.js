"use strict";

Jeq.string = (function () {

    //From camel-case to camelCase
    var camelCase = function (string) {
            return string.replace(/-([a-z])/ig, function (all, letter) {
                return letter.toUpperCase();
            });
        },
        //From camel-case to Camel Case
        prettify = function (str) {
            return str.replace(/(-|^)([^-]?)/g, function (_, prep, letter) {
                return (prep && ' ') + letter.toUpperCase();
            });
        },
        //Change H1 heading text
        setHeading = function (string) {
            var headingNode = document.getElementsByTagName("h1");
           
            headingNode[0].textContent = Jeq.string.prettifty(string);

            headingNode = null;
            return;
        };

    return this.utils.extend({
        camelCase: camelCase,
        prettifty: prettify,
        setHeading: setHeading
    });
}).apply(Jeq);