Polymer("contacts-loader",{
    contactBook : [],
    responseChanged: function() {
        this.contactBook.contacts  = this.response.values;
        this.contactBook.amount = this.contactBook.contacts.length;
        this.contactBook.show_bar = true;
        this.visibility = true;
        this.reverse = false;
    },
    dateFilter: function(age) {
        var birthDay = new Date(age);

        //milliseconds from 1 jan 1970
        var currentDate = (new Date).getTime();

        //age difference in milliseconds
        var ageDifMs = currentDate - birthDay.getTime();

        // miliseconds from epoch
        var ageDate = new Date(ageDifMs);

        //calculating how old is person
        var yearsOld = Math.abs(ageDate.getUTCFullYear() - 1970);

        var outputDataString = yearsOld+" ("+birthDay.getFullYear()+"-"+("0" + (birthDay.getMonth() + 1)).slice(-2)+"-"+("0" + birthDay.getDate()).slice(-2)+")";

        return outputDataString ;
    },
    phoneFilter: function(tel) {
        return 'tel:' + tel;
    },
    mapFilter: function(address) {
        return 'http://maps.google.com/?q=' + address;
    },
    orderbyFilter: function(e, details, sender) {

        var contacts = this.contactBook.contacts ;

        //sorting func
        function sortMe(){
            contacts.sort(function (a, b) {
                //get attribute date from tag
                var attr = e.path[0].getAttribute("data".toLowerCase());
                if (a[attr]['v'] < b[attr]['v']) {return tr;}
                else if (a[attr]['v'] > b[attr]['v']) {return fl;}
                return 0;
            });
        }
        // call sort func if reverse false (normal sort)
        if (!this.reverse){
            tr = -1;
            fl = 1;
            sortMe(contacts,tr,fl);
            this.reverse = true;      // call sort func if reverse true (reverse sort)
        } else if (this.reverse){
            tr = 1;
            fl = -1;
            sortMe(contacts,tr,fl);
            this.reverse = false;
        }
    },
    birthdaySoon: function(age) {

        var currentDate = new Date;
        var birthdayDate = new Date(age);

        //calculate birthday date
        birthdayDate.setFullYear(currentDate.getFullYear());


        //calculate birthday date if birthday in next year
        if(birthdayDate-currentDate < 0){
            birthdayDate.setFullYear(currentDate.getFullYear()+1);
        }

        var dataDiff =  Math.floor((birthdayDate-currentDate) / (1000*60*60*24)); //milliseconds*seconds*minutes*hours

        //if < 30 days to birthday apply class warning. if < 15 days apply class danger
        if ( dataDiff <= 30 && dataDiff >= 0) {
            if (dataDiff <= 15) {
                return 'background-color:#f2dede';
            }
            return 'background-color:#fcf8e3';

        }
    }

});