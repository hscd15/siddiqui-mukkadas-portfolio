"use strict";
Jeq.listeners = (function () {
    var set = function (args) {
            var parent,
                queryItems;

            if (Object.prototype.toString.call(args.parentId) === '[object Array]') {
                args.parentId.map(function (parentId) {
                    
                    parent = document.getElementById(parentId);
                    
                    
                    queryItems = parent.querySelectorAll(args.querySelectorClass);
                    
                    Array.prototype.map.call(queryItems, function (obj) {
                        var input = obj.getElementsByTagName("input");
                        input[0].addEventListener("click", args.onClickMethod, false);
                    })
                })
            } else {
                parent = document.getElementById(args.parentId);
                queryItems = parent.querySelectorAll(args.querySelectorClass);

                Array.prototype.map.call(queryItems, function (obj) {
                    obj.addEventListener("click", args.onClickMethod, false);
                });
            }

            queryItems = null;
            parent = null;
            args = null;
        },
        unSet = function (args, callBack) {
            var parent,
                queryItems;

            if (Object.prototype.toString.call(args.parentId) === '[object Array]') {
                args.parentId.map(function (parentId) {
                    parent = document.getElementById(parentId);
                    queryItems = parent.querySelectorAll(args.querySelectorClass);

                    Array.prototype.map.call(queryItems, function (obj) {
                        var input = obj.getElementsByTagName("input");

                        input[0].removeEventListener("click", args.onClickMethod, false);
                    })
                })
            } else {
                parent = document.getElementById(args.parentId);
                queryItems = parent.querySelectorAll(args.querySelectorClass);

                Array.prototype.map.call(queryItems, function (obj) {
                    obj.removeEventListener("click", args.onClickMethod, false);
                });
            }

            if (callBack !== undefined) {

                queryItems = null;
                parent = null;
                args = null;

                callBack();
            };
        },
        categoryClick = function () {
            var itemId = "null",
                itemData = null,
                callBackArguments = {};

            if (event.target.id === "") {
                itemId = event.target.parentNode.id;
            } else {
                itemId = event.target.id;
            }

            itemData = Jeq.getObj({
                "parsedJson": Jeq.get("categoryJSON"),
                "categoryId": Jeq.get("categoryId"),
                "itemId": itemId
            });

            Jeq.set("itemJSON", itemData);

            Jeq.html.set({
                "nodeId": "itemModal",
                "type": "item",
                "data": null
            }, Jeq.animate.itemModal());
        },
        itemClick = function (event) {
            var eventType = event.target.getAttribute("name"),
                optionType = event.target.parentNode.parentNode.id;

            if (event.target.checked) {
                //                BpItem.check(optionType, event.target.id, function (checkBool) {
                //                    if (checkBool === true) {
                
                console.log(event.target.id)
                Jeq.item.increment({
                    "type": optionType,
                    "optionId": event.target.id
                });
                //                    } else {

                //                    }
                //                });
            } else {
                Jeq.item.decrement({
                    "type": optionType,
                    "optionId": event.target.id
                });
            }
        };

    return this.utils.extend({
        set: set,
        unSet: unSet,
        categoryClick: categoryClick,
        itemClick: itemClick
    });
}).apply(Jeq);