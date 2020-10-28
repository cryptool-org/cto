(() => {

    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        exitOnEsc: true,
        defaultStepOptions: {
            classes: '@@ROOT_ID-tour',
            cancelIcon: {
                enabled: true
            },
            scrollTo: { behavior: 'smooth', block: 'center' }
        }
    });

    tour.addStep({
        title: "${{ base.broadcastHistory.header }}$",
        text: "${{ base.tour.step1.description }}$",
        attachTo: {
            element: '#@@ROOT_ID #broadcast-history-card',
            on: 'right'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: '${{ base.tour.backButton }}$'
            },
            {
                action() {
                    return this.next();
                },
                text: '${{ base.tour.nextButton }}$'
            }
        ]
    });

    tour.addStep({
        title: "${{ base.contactList.header }}$",
        text: "${{ base.tour.step2.description }}$",
        attachTo: {
            element: '#@@ROOT_ID #contact-list-card',
            on: 'left'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: '${{ base.tour.backButton }}$'
            },
            {
                action() {
                    return this.next();
                },
                text: '${{ base.tour.nextButton }}$'
            }
        ]
    });

    tour.addStep({
        title: "${{ base.serverList.header }}$",
        text: "${{ base.tour.step3.description }}$",
        attachTo: {
            element: '#@@ROOT_ID #server-list-card',
            on: 'top'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: '${{ base.tour.backButton }}$'
            },
            {
                action() {
                    return this.next();
                },
                text: '${{ base.tour.nextButton }}$'
            }
        ]
    });

    tour.addStep({
        title: "${{ base.matchingList.header }}$",
        text: "${{ base.tour.step4.description }}$",
        attachTo: {
            element: '#@@ROOT_ID #matching-list-card',
            on: 'top'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: '${{ base.tour.backButton }}$'
            },
            {
                action() {
                    return this.next();
                },
                text: '${{ base.tour.nextButton }}$'
            }
        ]
    });

    tour.addStep({
        title: "${{ base.tour.step5.title }}$",
        text: "${{ base.tour.step5.description }}$",
        attachTo: {
            element: '#@@ROOT_ID #person-selection',
            on: 'bottom'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: '${{ base.tour.backButton }}$'
            },
            {
                action() {
                    return this.next();
                },
                text: '${{ base.tour.nextButton }}$'
            }
        ]
    });

    tour.addStep({
        title: "${{ base.tour.step6.title }}$",
        text: "${{ base.tour.step6.description }}$",
        attachTo: {
            element: '#@@ROOT_ID #day-selection',
            on: 'bottom'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: '${{ base.tour.backButton }}$'
            },
            {
                action() {
                    return this.next();
                },
                text: '${{ base.tour.nextButton }}$'
            }
        ]
    });

    tour.addStep({
        title: "${{ base.tour.step7.title }}$",
        text: "${{ base.tour.step7.description }}$",
        attachTo: {
            element: '#@@ROOT_ID #broadcast-history-table',
            on: 'right'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: '${{ base.tour.backButton }}$'
            },
            {
                action() {
                    return this.next();
                },
                text: '${{ base.tour.nextButton }}$'
            }
        ]
    });

    tour.addStep({
        title: "${{ base.tour.step8.title }}$",
        text: "${{ base.tour.step8.description }}$",
        attachTo: {
            element: '#@@ROOT_ID #report-infected-button',
            on: 'right'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: '${{ base.tour.backButton }}$'
            },
            {
                action() {
                    return this.next();
                },
                text: '${{ base.tour.nextButton }}$'
            }
        ]
    });

    tour.addStep({
        title: "${{ base.tour.step9.title }}$",
        text: "${{ base.tour.step9.description }}$",
        attachTo: {
            element: '#@@ROOT_ID #start-walkthrough-button',
            on: 'bottom'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: '${{ base.tour.backButton }}$'
            },
            {
                action() {
                    return this.complete();
                },
                text: '${{ base.tour.quitButton }}$'
            }
        ]
    });

    let currentStep = null;

    const allWalkthroughComponents = [
        '#walkthrough-welcome',
        '#walkthrough-step1',
        '#walkthrough-step1-success',
        '#walkthrough-step2',
        '#walkthrough-step2-error',
        '#walkthrough-step2-success',
        '#walkthrough-step3',
        '#walkthrough-step3-success',
        '#help-button',
        '#collapse-up-button'
    ];

    const $helpButton = jQueryFind("#help-button");
    const $collapseUpButton = jQueryFind("#collapse-up-button");
    let lastShownComponentName = null;

    function showWalkthroughComponent(componentName) {
        //Hide all other walkthrough components:
        allWalkthroughComponents.forEach(component => {
            if (component !== componentName) {
                jQueryFind(component).hide();
            }
        });

        if (componentName) {
            lastShownComponentName = componentName;
            jQueryFind(componentName).show();
        }
    }

    function showWelcomeCard() {
        currentStep = null;
        showWalkthroughComponent("#walkthrough-welcome");
    }

    function startWalkthroughStep1() {
        currentStep = 1;
        jQueryFind('#complete-walkthrough-step1-button').prop("disabled", true);
        showWalkthroughComponent('#walkthrough-step1');
    }

    function startWalkthroughStep2() {
        currentStep = 2;
        jQueryFind('.complete-walkthrough-step2-button').prop("disabled", true);
        showWalkthroughComponent('#walkthrough-step2');
    }

    function startWalkthroughStep3() {
        currentStep = 3;
        jQueryFind('#complete-walkthrough-step3-button').prop("disabled", true);
        showWalkthroughComponent('#walkthrough-step3');
    }

    function stopWalkthrough() {
        showWalkthroughComponent(null);
        $helpButton.show();
        $collapseUpButton.show();
    }

    $helpButton.on('click', function (event) {
        event.preventDefault();
        showWelcomeCard();
    });

    $collapseUpButton.on('click', function (event) {
        event.preventDefault();
        showWalkthroughComponent(lastShownComponentName);
    });

    jQueryFind('#start-tour-button').on('click', function (event) {
        event.preventDefault();
        tour.start();
    });

    jQueryFind('#start-walkthrough-button').on('click', function (event) {
        event.preventDefault();
        startWalkthroughStep1();
    });

    jQueryFind('.cancel-walkthrough-button').on('click', function (event) {
        event.preventDefault();
        stopWalkthrough();
    });

    jQueryFind('#complete-walkthrough-step1-button').on('click', function (event) {
        event.preventDefault();
        currentStep = null;
        showWalkthroughComponent('#walkthrough-step1-success');
    });

    jQueryFind('#proceed-walkthrough-step2-button').on('click', function (event) {
        event.preventDefault();
        startWalkthroughStep2();
    });

    jQueryFind('.complete-walkthrough-step2-button').on('click', function (event) {
        event.preventDefault();
        currentStep = null;
        showWalkthroughComponent('#walkthrough-step2-success');
    });

    jQueryFind('#proceed-walkthrough-step3-button').on('click', function (event) {
        event.preventDefault();
        startWalkthroughStep3();
    });

    jQueryFind('#complete-walkthrough-step3-button').on('click', function (event) {
        event.preventDefault();
        currentStep = null;
        showWalkthroughComponent('#walkthrough-step3-success');
    });

    jQueryFind('#walkthrough .close').on('click', function () {
        stopWalkthrough();
    })

    function evaluateInfectionReporting() {
        //Check whether Alice's contact list matches against reported entries:
        const contactDict = {};
        proxtrac.contactList.list.forEach(contactEntry => {
            contactDict[contactEntry.broadcastId] = contactEntry;
        });
        const foundMatch = proxtrac.serverList.list.find(reportedEntry => {
            const day = reportedEntry.day;
            const dayKey = reportedEntry.dayKey;
            const broadcastIds = algo.getAllBroadcastIdsFromDayKey(day, dayKey, getNumberOfDays(day));
            if (broadcastIds.find(entry => contactDict[entry.broadcastId])) {
                return true;
            }
            return false;
        });

        if (!foundMatch) {
            //No match found. Show error message to the user:
            showWalkthroughComponent('#walkthrough-step2-error');
        } else {
            jQueryFind('.complete-walkthrough-step2-button').prop("disabled", false);
        }
    }

    //Hook into "proxtrac.contactList.addContact" to get new contact event for step 1&2:
    const realAddContact = proxtrac.contactList.addContact;
    proxtrac.contactList.addContact = function (...args) {
        realAddContact(...args);

        if (currentStep === 1) {
            jQueryFind('#complete-walkthrough-step1-button').prop("disabled", false);
        } else if (currentStep === 2) {
            evaluateInfectionReporting();
        }
    };

    //Hook into "proxtrac.serverList.addInfectionToServerList" to get new report event for step 2:
    const realAddInfectionToServerList = proxtrac.serverList.addInfectionToServerList;
    proxtrac.serverList.addInfectionToServerList = function (...args) {
        realAddInfectionToServerList(...args);

        if (currentStep === 2) {
            evaluateInfectionReporting();
        }
    };


    //Hook into "proxtrac.matchingList.inspectServerEntry" to get inspection event for step 3:
    const realInspectServerEntry = proxtrac.matchingList.inspectServerEntry;
    proxtrac.matchingList.inspectServerEntry = function (...args) {
        realInspectServerEntry(...args);

        if (currentStep === 3) {
            jQueryFind('#complete-walkthrough-step3-button').prop("disabled", false);
        }
    };

    //Start with walkthrough welcome card:
    showWelcomeCard();
    jQueryFind('#walkthrough .hide').removeClass('hide');

    $('.modal').on('show.bs.modal', function (e) {
        if (tour.isActive()) {
            //Do not show modal dialogs if tour is running:
            return e.preventDefault();
        }
    });
    
})();