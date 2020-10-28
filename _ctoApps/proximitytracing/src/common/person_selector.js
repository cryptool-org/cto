function registerPersonSelector(persons, onPersonChanged) {

    const $dropdownEntries = jQueryFind("#persons-dropdown-entries");
    const $currentPerson = jQueryFind(".current-person");

    const changePerson = function (person) {
        $currentPerson.text(person.getName());
        onPersonChanged(person);
    }

    persons.forEach(person => {
        const dropdownEntry = jQuery(`<li><a href="javascript:void(0)" class="dropdown-item person-selector">${person.getName()}</a></li>`);
        $dropdownEntries.append(dropdownEntry);
        dropdownEntry.on('click', function (event) {
            event.preventDefault();
            changePerson(person);
        });
    });

    changePerson(persons[0]);
    
}