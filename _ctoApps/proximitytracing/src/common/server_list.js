(() => {

    const $serverListTable = jQueryFind("#server-list-table");

    function markRow(row) {
        $serverListTable.find("tr").removeClass("info");
        row.addClass("info");
    }

    function showServerListPage(pageEntries) {
        $serverListTable.children("tbody").empty();
        pageEntries.forEach(entry => {
            const row = jQuery(`<tr><td>${entry.day.toUTCDateString()}</td><td>${toHex(entry.dayKey)}</td></tr>`);
            $serverListTable.append(row);
            row.on('click', function (event) {
                event.preventDefault();
                proxtrac.matchingList.inspectServerEntry(entry.day, entry.dayKey);
                markRow(row);
            });
        });
    }

    const $serverListPagination = jQueryFind('#server-list-pagination');
    const serverListPagination = new Pagination($serverListPagination, TABLE_PAGE_SIZE, showServerListPage);

    const serverList = [];
    serverListPagination.setEntries([]);

    proxtrac.serverList = { list: serverList };
    proxtrac.serverList.addInfectionToServerList = function (person, startDayIndex) {
        const report = algo.getAllDayKeysToReport(
            person.initialKey, 
            dayIndex => person.getDayKey(dayIndex), 
            getDayForIndex(0), 
            startDayIndex, 
            OBSERVATION_DAYS-startDayIndex);
        report.forEach(entry => {
            serverList.push({
                day: getDayForIndex(entry.dayIndex),
                dayKey: entry.dayKey
            });
        });

        serverListPagination.setEntries(serverList);
        proxtrac.matchingList.clearInspectServerEntry();
    }

})();