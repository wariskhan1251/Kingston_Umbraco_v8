// JavaScript source code
function Submitform(form) {
    //debugger;
    var FName = document.forms["MyForm"]["contctFName"];
    var LName = document.forms["MyForm"]["contctLName"];
    var Email = document.forms["MyForm"]["contctEmail"];
    var BedRooms =$("#BedDDL").text();
    var Budget = document.forms["MyForm"]["budget"];
    var PhoneNumber = document.forms["MyForm"]["contctTelephone"];
    var Message = document.forms["MyForm"]["contctMessage"];
    var Location = $("#LocDDL").text();
 
   
    var err = "";
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (FName.value == "") {
        err = "Please provide first name";
        document.getElementById("errormsg").innerHTML = err;
        FName.focus();
        return false;
    }
    if (LName.value == "") {
        err = "Please provide last name";
        document.getElementById("errormsg").innerHTML = err;
        LName.focus();
        return false;
    }
    if (Email.value == "") {
        err = "Please provide email address";
        document.getElementById("errormsg").innerHTML = err;
        Email.focus();
        return false;
    }
    if (!re.test(Email.value)) {
        err = "Please provide valid email address";
        document.getElementById("errormsg").innerHTML = err;
        Email.focus();
        return false;
    }
    if (PhoneNumber.value == "") {
        err = "Please provide telephone";
        document.getElementById("errormsg").innerHTML = err;
        PhoneNumber.focus();
        return false;
    }
    if (BedRooms == "" || BedRooms == "Number of bedrooms >") {
        err = "Please select number of bedrooms";
        document.getElementById("errormsg").innerHTML = err;
        $("#ContactingBedDDL").focus();
        return false;
    }
    if (Budget.value == "") {
        err = "Please provide budget";
        document.getElementById("errormsg").innerHTML = err;
        Budget.focus();
        return false;
    }
    if (Location == "" || Location == "Select your location >") {
        err = "Please select location";
        document.getElementById("errormsg").innerHTML = err;
        $("#ContactingAboutDDL").focus();
        return false;
    }
    if (Message.value == "") {
        err = "Please enter message";
        document.getElementById("errormsg").innerHTML = err;
        Message.focus();
        return false;
    }
    if ($("#terms").is(':checked') == false) {
        err = "Please click on terms and condition box";
        document.getElementById("errormsg").innerHTML = err;
        return false;
    }

    var CaptchaResult = grecaptcha.getResponse();
    if ((CaptchaResult == null || CaptchaResult == "" || CaptchaResult.length == 0
        && (document.location.href.indexOf(".co") > -1 || document.location.href.indexOf(".org") > -1))) {
        err = "Please tick to prove that you are not a robot.";
        document.getElementById("errormsg").innerHTML = err;
        return false;
    } 
}
function SubmitLoginform(form1) {
    var Password = document.forms["LoginForm"]["loginPassword"];
    if (Password.value == "") {
        err = "Please provide name";
        document.getElementById("errormsg").innerHTML = "Please enter password.";
        Password.focus();
        return false;
    }
   
}

//function recaptchaCallback() {
//            $('#captchaBox').valid();
//        };
