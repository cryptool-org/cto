(() => {
    const $matchingListTable = jQueryFind("#matching-list-table");
    
    function showMatchingListPage(pageEntries) {
        $matchingListTable.children("tbody").empty();
        pageEntries.forEach(entry => {
            const row = jQuery(`<tr><td>${entry.day.toUTCDateString()}</td><td>${toHex(entry.broadcastId)}</td></tr>`);
    
            if (entry.isMatch) {
                row.addClass("success");
            }
            $matchingListTable.append(row);
        });
    }
    
    const $matchingListPagination = jQueryFind('#matching-list-pagination');
    const matchingListPagination = new Pagination($matchingListPagination, TABLE_PAGE_SIZE, showMatchingListPage);
    
    const $matchingPanelContent = jQueryFind("#matching-panel-content");
    const $altMatchingPanelContent = jQueryFind("#alt-matching-panel-content");
    
    let matchingList;
    clearInspectServerEntry();
    
    const $matchButton = jQueryFind("#match-button");
    let isMatchFilterOn = false;
    
    function inspectServerEntry(day, dayKey) {
        const broadcastIds = algo.getAllBroadcastIdsFromDayKey(day, dayKey, getNumberOfDays(day));
        matchingList = broadcastIds.map(entry => ({
            day: entry.day,
            broadcastId: entry.broadcastId
        }));
    
        matchingListPagination.setEntries(matchingList, false);
    
        findMatches();
        isMatchFilterOn = false;
        setMatchFilterStatus(isMatchFilterOn);
    
        $matchingPanelContent.show();
        $altMatchingPanelContent.hide();
    }
    
    function clearInspectServerEntry() {
        matchingList = [];
        matchingListPagination.setEntries([], false);
    
        $matchingPanelContent.hide();
        $altMatchingPanelContent.show();
        updatedMatches();
    }
    
    $matchButton.on('click', event => {
        event.preventDefault();
        isMatchFilterOn = !isMatchFilterOn;
        setMatchFilterStatus(isMatchFilterOn);
    });
    
    function updatedMatches() {
        findMatches();
        if (isMatchFilterOn) {
            filterMatches();
        }
    }
    
    function setMatchFilterStatus(active) {
        if (!active) {
            $matchButton.removeClass("btn-success");
            $matchButton.addClass("btn-danger");
            clearFilter();
        } else {
            $matchButton.addClass("btn-success");
            $matchButton.removeClass("btn-danger");
            filterMatches();
        }
    }
    
    function filterMatches() {
        matchingListPagination.setEntries(matchingList.filter(f => f.isMatch), false);
    }
    
    function findMatches() {
        let matchCounter = 0;
        const matchingListDictionary = {};
        
        matchingList.forEach(entry => {
            matchingListDictionary[entry.broadcastId] = entry;
            entry.isMatch = false;
        });
        proxtrac.contactList.updateMatches(contact => {
            const entry = matchingListDictionary[contact.broadcastId];
            if (entry) {
                if (isSameDay(contact.day, entry.day)) {
                    entry.isMatch = true;
                    matchCounter++;
                    return true;
                }
            }
            return false;
        });
    
        jQuery("#matching-counter").text(matchCounter);
        matchingListPagination.update();
    }
    
    function clearFilter() {
        matchingListPagination.setEntries(matchingList, false);
    }

    proxtrac.matchingList = {};
    proxtrac.matchingList.inspectServerEntry = inspectServerEntry;
    proxtrac.matchingList.clearInspectServerEntry = clearInspectServerEntry;
    proxtrac.matchingList.updatedMatches = updatedMatches;
})();