//Grey Lock with picture of fire (its type of lock that TSA has key for)
//pharmacy magazines

"use strict";
Jeq.html = (function () {
    var set = function (args, callBack) {
            var domNode = document.getElementById(args.nodeId),
                url = "null";

            if (args.type === "main") {
                domNode.innerHTML = null;
                domNode.insertAdjacentHTML("afterbegin", args.data);
            }

            if (args.type === "piece") {
                domNode.innerHTML = null;
                domNode.insertAdjacentHTML("afterbegin", args.data);
            }

            domNode = null;
            args = null;

            if (callBack !== undefined) {
                callBack();
            }
        },
        insertBefore = function (args) {
            console.log(args)
            var beforeThis = args.parent.querySelector(args.id),
                parentNode = beforeThis.parentNode;
            
            parentNode.insertBefore(args.data, beforeThis);
            
            parentNode = null;
            beforeThis = null;
            args = null;
            return;
        };

    return this.utils.extend({
        set: set
    });
}).apply(Jeq);