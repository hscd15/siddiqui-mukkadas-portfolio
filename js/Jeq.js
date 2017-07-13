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
                navBtn = document.getElementById("navBtn");

            nav[0].style.height = Jeq.get("clientHeight") + "px";
            
            Jeq.set("firstVisit", false);
            Jeq.checkVersion();

            for (var i = 0, len = links.length; i < len; i++) {
                links[i].style.lineHeight = (Jeq.get("clientHeight") * 0.25) + "px";

                links[i].addEventListener("click", Jeq.animate.nav, false);
            }

            navBtn.addEventListener("click", Jeq.animate.nav);

            window.addEventListener("resize", function () {
                var clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                    clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

                nav[0].style.height = clientHeight + "px";

                Jeq.set("clientWidth", clientWidth);
                Jeq.set("clientHeight", clientHeight);

                
                clientWidth = null;
                clientHeight = null;
            });

            navBtn = null;
            links = null;
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
                var check = Jeq.localCheck(args.url),
                    req = new XMLHttpRequest();

                if (args.url === "JeqV.json" && check === "11") {
                    check = "10";
                };

                if (check === "00" || check === "10") {
                    console.log("new get")
                    req.open('GET', args.url, true);
                    req.onreadystatechange = function () {
                        if (req.readyState == 4) {
                            if (req.status == 200) {
                                if (check === "10") {
                                    localStorage.setItem(args.url, req.response);
                                }

                                if (callBack !== undefined) {
                                    callBack(req.response);
                                }
                            }

                            if (req.status == 404) {
                                console.log('ajax not found');
                            }
                        }
                    };
                    req.send(null);
                };

                if (check === "11") {
                    console.log("cache get")
                    var localData = localStorage.getItem(args.url);

                    if (callBack !== undefined) {
                        callBack(localData);
                    }
                };

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
                //Local Storage Allowed
                if (localStorage.getItem(key) === null) {
                    //Item not in local storage
                    return "10";
                } else {
                    //Item exists in local storage
                    return "11";
                }
            } else {
                //Local Storage Not Allowed
                return "00";
            }
        },
        checkVersion = function (args) {
            var temp = localStorage.getItem("JeqV.json");
            //Check if version JSON has been downloaded
            //var initialCheck = Jeq.localCheck("JeqV.json");

            Jeq.ajax({
                "method": "get",
                "url": "JeqV.json"
            }, function (result) {
                if (temp === result) {
                    console.log("data versions the same");
                } else {
                    console.log("versions are different");
                }
            });
        };
    //extend protected members and return the resulting public data
    return utils.extend(this, {
        init: init,
        utils: utils,
        set: set,
        get: get,
        ajax: ajax,
        localCheck: localCheck,
        checkVersion: checkVersion
    });
}).call({});