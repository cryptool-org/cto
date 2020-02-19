import Vue from 'vue';

var Tab = Vue.component('tabs', {

    methods: {
        openTab(evt, tabName)  {
            if (document.getElementById(tabName).style.display !== "block") {
                let tabcontent = document.getElementsByClassName("tabcontent");
                for (let i = 0; i < tabcontent.length; i++) {
                    tabcontent[i].style.display = "none";
                }
                document.getElementById(tabName).style.display = "block";
            } else {
                document.getElementById(tabName).style.display = "none";
            }

            let tablinks = document.getElementsByClassName("tablinks");
            for (let i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            //evt.currentTarget.className += " active";
        },
        closeTab(tabName) {
            document.getElementById(tabName).style.display = "none";
        },

        // Get the element with id="defaultOpen" and click on it
        //document.getElementById("defaultOpen").click();
    }
});
export default Tab;
