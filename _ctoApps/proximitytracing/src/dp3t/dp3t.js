"use strict";

window.addEventListener('load', function() {
    @@include('../../node_modules/sjcl/sjcl.js')
    @@include('../../node_modules/sjcl/core/codecBytes.js')
    @@include('../../node_modules/sjcl/core/ctr.js')
    @@include('./dp3t_algo.js')
    const algo = new Dp3t();
    @@include('../common/base.js', { "ROOT_ID": "dp3t-root" })
});


//Injecting style containing terms specific to DP-3T.
//These terms need to be used with the help of CSS classes 
//because the translation engine cannot handle dynamic content directly.
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
    .dp3t-root-popover .day-key:before, #dp3t-root .day-key:before {
        content: "${{ dp3t.dayKey }}$"
    }

    #dp3t-root .day-keys:before {
        content: "${{ dp3t.dayKeys }}$"
    }

    .dp3t-root-tour .broadcast-id:before, #dp3t-root .broadcast-id:before {
        content: "EphID"
    }

    .dp3t-root-tour .broadcast-ids:before, #dp3t-root .broadcast-ids:before {
        content: "EphIDs"
    }

    #dp3t-root .broadcast-id-refresh:before {
        content: "15"
    }
`;
document.getElementsByTagName('head')[0].appendChild(style);