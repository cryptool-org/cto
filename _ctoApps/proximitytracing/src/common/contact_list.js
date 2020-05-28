(() => {
    const $contactListTable = jQueryFind("#contact-list-table");
    
    function showContactListPage(pageEntries) {
        $contactListTable.children("tbody").empty();
        pageEntries.forEach(contact => {
            const row = jQuery(`<tr><td>${contact.day.toUTCDateString()}</td><td>${contact.duration}</td><td>${toHex(contact.broadcastId)}</td></tr>`);
            if (contact.isMatch) {
                row.addClass("danger");
            }
            $contactListTable.append(row)
        });
    }
    
    const $contactListPagination = jQueryFind('#contact-list-pagination');
    const contactListPagination = new Pagination($contactListPagination, TABLE_PAGE_SIZE, showContactListPage);
    
    const contactList = [];
    contactListPagination.setEntries([]);
    
    proxtrac.contactList = { list: contactList };
    proxtrac.contactList.addContact = function (day, duration, broadcastId) {
        contactList.push({ day, duration, broadcastId });
        contactListPagination.setEntries(contactList);
        proxtrac.matchingList.updatedMatches();
    };
    proxtrac.contactList.updateMatches = function (matchOperator) {
        contactList.forEach(contact => contact.isMatch = matchOperator(contact));
        contactListPagination.update();
    };
})();