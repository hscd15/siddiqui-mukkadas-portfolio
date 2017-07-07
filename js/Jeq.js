//"use strict";
var Jeq = (function () {
    //protected and privileged config dictionary
    var config = {
            "clientWidth": window.innerWidth || document.documentElement.clientWidth,
            "clientHeight": window.innerHeight || document.documentElement.clientHeight,
            "btnState": false,
            "navState": false,
            "modalState": false,
            "firstVisit": true,
        },
        init = function (event) {
            var nav = document.getElementsByTagName("nav"),
                links = nav[0].querySelectorAll("a"),
                navBtn = document.getElementById("navBtn"),
                closeModalBtn = document.getElementById("closeModalBtn");

            nav[0].style.height = Jeq.get("clientHeight") + "px";

            for (var i = 0, len = links.length; i < len; i++) {
                links[i].style.lineHeight = (Jeq.get("clientHeight") * 0.25) + "px";

                links[i].addEventListener("click", Jeq.animate.nav, false);
            }

            navBtn.addEventListener("click", Jeq.animate.nav);

            /*window.addEventListener("resize", function () {
                var clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

                console.log(clientWidth + " " + clientHeight);
            });*/
        },
        //On first visit, runs from routes not init method
        firstVisit = function () {
            var modal = document.getElementById("modal"),
                firstVisit = config.firstVisit;

            if (firstVisit) {
                modal.style.top = "100%";
                config.firstVisit = false;

                modal = null;
            }
        },
        //protected utility functions
        utils = {
            //add properties to an object
            extend: function (root, props) {
                for (var key in props) {
                    if (props.hasOwnProperty(key)) {
                        root[key] = props[key];
                    }
                }
                return root;
            },

            //copy an object property then delete the original 
            privatise: function (root, prop) {
                var data = root[prop];
                try {
                    delete root[prop];
                } catch (ex) {
                    root[prop] = null;
                }
                return data;
            }
        },

        //public config definition function
        set = function (key, value) {
            if (typeof config[key] == 'undefined') {
                console.log("caller is " + arguments.callee.caller.toString());
                alert('There is no config option "' + key + '"');
            } else {
                if (Object.prototype.toString.call(config[key]) === '[object Array]') {
                    if (value.length == 0) {
                        config[key] = value;
                    } else {
                        config[key].push(value);
                    }
                } else {
                    config[key] = value;
                }
            }
        },
        //public config fetch function
        get = function (key) {
            if (typeof config[key] == 'undefined') {
                alert('There is no config option "' + key + '"');
            } else {
                return config[key];
            }
        },
        //Public ajax methods
        ajax = function (args, callBack) {
            switch (args.method) {
            case "get":
                var check = localCheck(args.url),
                    req = new XMLHttpRequest();

                console.log(check);
                console.log(args.url);
                if (check === "00" || check === "10") {
                    req.open('GET', args.url, true);
                    req.onreadystatechange = function () {
                        if (req.readyState == 4) {
                            if (req.status == 200) {
                                if (check === "10") {
                                    localStorage.setItem(args.url, req.response);
                                }

                                callBack(req.response);
                            }

                            if (req.status == 404) {
                                console.log('ajax not found');
                            }
                        }
                    };
                    req.send(null);
                }

                if (check === "11") {
                    var localData = localStorage.getItem(args.url);
                    callBack(localData);
                }

                break;
            case "post":
                break;
            default:
                //code block
            }
        },
        //Check if item exists in localstorage or if localstorage is not allowed in browser version
        localCheck = function (key) {
            if (typeof (Storage) !== "undefined") {
                if (localStorage.getItem(key) === null) {
                    return "10";
                } else {
                    return "11";
                }
            } else {
                return "00";
            }
        };
    //extend protected members and return the resulting public data
    return utils.extend(this, {
        init: init,
        firstVisit: firstVisit,
        utils: utils,
        set: set,
        get: get,
        ajax: ajax
    });
}).call({});