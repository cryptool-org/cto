"use strict";

window.addEventListener('load', function() {
    @@include('../../node_modules/sjcl/sjcl.js')
    @@include('../../node_modules/sjcl/core/codecBytes.js')
    @@include('../../node_modules/sjcl/core/hkdf.js')
    @@include('./exposurenotification_algo.js')
    const algo = new ExposureNotification();
    @@include('../common/base.js', { "ROOT_ID": "exposurenotification-root" })
});


//Injecting style containing terms specific to Exposure Notification.
//These terms need to be used with the help of CSS classes 
//because the translation engine cannot handle dynamic content directly.
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
    .exposurenotification-root-popover .day-key:before, #exposurenotification-root .day-key:before {
        content: "${{ exposurenotification.temporaryExposureKey }}$"
    }

    #exposurenotification-root .day-keys:before {
        content: "${{ exposurenotification.temporaryExposureKeys }}$"
    }

    .exposurenotification-root-tour .broadcast-id:before, #exposurenotification-root .broadcast-id:before {
        content: "${{ exposurenotification.rollingProximityID }}$"
    }

    .exposurenotification-root-tour .broadcast-ids:before, #exposurenotification-root .broadcast-ids:before {
        content: "${{ exposurenotification.rollingProximityID }}$s"
    }

    #exposurenotification-root .broadcast-id-refresh:before {
        content: "10"
    }
`;
document.getElementsByTagName('head')[0].appendChild(style);