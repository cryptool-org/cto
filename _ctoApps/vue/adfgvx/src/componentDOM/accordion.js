import Vue from 'vue';

var Accordion = Vue.component('accordion', {

    methods: {
        toggleAccordion() {
            var acc = document.getElementsByClassName("accordion");
            for (var i = 0; i < acc.length; i++) {
                acc[i].onclick = function(){
                    this.innerText = this.innerText.replace('Hide', 'Show');
                    this.classList.toggle("active");
                    this.nextElementSibling.classList.toggle("show");
                    if (this.classList.contains("active")) {
                        this.innerText = this.innerText.replace('Show', 'Hide');
                    }
                }
            }
        }
    }
});
export default Accordion;
