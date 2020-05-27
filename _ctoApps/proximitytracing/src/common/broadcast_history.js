(() => {
    const INITIAL_KEY_DISPLAY_LENGTH = 4;
    const DAY_KEY_DISPLAY_LENGTH = 15;

    let currentPerson = null;
    let currentDayIndex = null;
    let currentDay = null;
    let currentDayKey = null;
    
    const $broadcastHistoryTable = jQueryFind("#broadcast-history-table");
    
    const $addContactListModal = jQueryFind("#add-contact-list-modal");
    const $addContactListButton = $addContactListModal.find('#add-contact-list-button');
    const $contactDurationSelect = jQueryFind("#contact-duration-select");
    
    $addContactListButton.on('click', function (event) {
        event.preventDefault();
        $addContactListModal.modal('hide');
        const duration = $contactDurationSelect.val();
    
        const contactSlot = $addContactListModal.contactSlot;
        const day = contactSlot.time;
        const broadcastId = contactSlot.broadcastId;
        contactSlot.hadContact = true;
        markRowAsContact($addContactListModal.contactRow);
        
        proxtrac.contactList.addContact(day, duration, broadcastId);
    });
    
    function addToContactList(slot, row) {
        $addContactListModal.contactSlot = slot;
        $addContactListModal.contactRow = row;
        $addContactListModal.find("#add-contact-list-modal-person").text(currentPerson.getName());
        $addContactListModal.find("#add-contact-list-modal-timeslot").text(slot.time.toUTCTimeString());
        $addContactListModal.modal('show');
    }
    
    const $reportInfectedButton = jQueryFind("#report-infected-button");
    const $addServerListModal = jQueryFind("#add-server-list-modal");
    const $addServerListButton = $addServerListModal.find('#add-server-list-button');
    
    function setReportInfectedButtonState(disabled) {
        $reportInfectedButton.prop("disabled", disabled);
    }
    
    $addServerListModal.on('show.bs.modal', function (event) {
        jQuery(this).find("#add-server-list-modal-day").text(currentDay.toUTCDateString());
        jQuery(this).find("#add-server-list-modal-person").text(currentPerson.getName());
    });
    
    $addServerListButton.on('click', function (event) {
        event.preventDefault();
        $addServerListModal.modal('hide');
        currentPerson.setIsReported();
        setReportInfectedButtonState(true);
        proxtrac.serverList.addInfectionToServerList(currentPerson, currentDayIndex);
    });
    
    function markRowAsContact(row) {
        row.addClass("success");
    }
    
    function showBroadcastHistoryPage(pageEntries) {
        $broadcastHistoryTable.children("tbody").empty();
        pageEntries.forEach(slot => {
            const row = jQuery(`<tr><td>${slot.time.toUTCTimeString()}</td><td>${toHex(slot.broadcastId)}</td></tr>`);
            if (slot.hadContact) {
                markRowAsContact(row);
            }
            $broadcastHistoryTable.append(row)
            row.on('click', function (event) {
                event.preventDefault();
                if (!slot.hadContact) {
                    addToContactList(slot, row);
                }
            });
        });
    }
    
    const $broadcastHistoryPagination = jQueryFind('#broadcast-history-pagination');
    const broadcastHistoryPagination = new Pagination(
        $broadcastHistoryPagination, 
        TABLE_PAGE_SIZE, 
        showBroadcastHistoryPage);
    
    const $currentDay = jQueryFind(".current-day");
    const $secretDayKey = jQueryFind("#secret-day-key");
    const secretDayKeyTemplateText = $secretDayKey.attr("data-content");
    
    const $personInitialKey = jQueryFind("#person-initial-key");
    const $personInitialKeyButton = jQueryFind("#person-initial-key-button");
    const personInitialKeyButtonTemplateText = $personInitialKeyButton.attr("data-content");
    
    function onDayChanged(dayIndex) {
        const dayHistory = currentPerson.getBroadcastHistory(dayIndex);
        broadcastHistoryPagination.setEntries(dayHistory.timeSlots, false);
        currentDayIndex = dayIndex;
        currentDay = dayHistory.day;
        currentDayKey = dayHistory.dayKey;
        $currentDay.text(currentDay.toUTCDateString());
    
        const dayKey = toHex(currentDayKey);
        $secretDayKey.text(dayKey.substring(0, DAY_KEY_DISPLAY_LENGTH) + "...");
        $secretDayKey.attr("data-content", `${secretDayKeyTemplateText}\n${dayKey}`);
    }
    
    const daySelector = new DaySelector(onDayChanged);
    
    function showPerson(person) {
        currentPerson = person;
        
        const initialKey = person.getInitialKey();
        if (!initialKey) {
            $personInitialKey.hide();
        } else {
            $personInitialKey.show();
            const initialKeyHex = toHex(initialKey);
            $personInitialKeyButton.text(initialKeyHex.substring(0, INITIAL_KEY_DISPLAY_LENGTH) + "...");
            $personInitialKeyButton.attr("data-content", `${personInitialKeyButtonTemplateText}\n${initialKeyHex}`);
        }

        setReportInfectedButtonState(person.getIsReported());
    
        daySelector.reset(getMaxDayIndex());
    }

    proxtrac.broadcastHistory = {};
    proxtrac.broadcastHistory.registerPersons = function (persons) {
        registerPersonSelector(persons, showPerson);
    };
})();
