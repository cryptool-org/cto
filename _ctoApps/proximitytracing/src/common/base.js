"use strict";

@@include('../../node_modules/shepherd.js/dist/js/shepherd.min.js')

const OBSERVATION_DAYS = 14;
const TABLE_PAGE_SIZE = 10;

jQuery(function () {
    jQuery('[data-toggle="tooltip"]').tooltip();
    jQuery('[data-toggle="popover"]').popover();
});

function toHex(byteArray) {
    return byteArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

@@include('./date_util.js')
@@include('./pagination.js')
@@include('./person.js')

const proxtrac = {};

const root = document.getElementById("@@ROOT_ID");
//Method to search for elements in the root element of this plugin.
//This is needed because CTO will include the plugin several times at once:
const jQueryFind = function(selector) {
    return jQuery(selector, root);
};

@@include('./person_selector.js')
@@include('./day_selector.js')
@@include('./broadcast_history.js')
@@include('./contact_list.js')
@@include('./server_list.js')
@@include('./matching_list.js')
@@include('./walkthrough.js', { "ROOT_ID": "@@ROOT_ID" })

const persons = ["Bob", "Carlos", "Charlie", "Chuck", "Craig", "Dan", "Erin", "Eve"];
proxtrac.broadcastHistory.registerPersons(persons.map(p => new Person(p)));