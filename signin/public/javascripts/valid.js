var velidator = {
    form: {
        username: {
            status: false,
            errorMessage: '6~18位英文字母、数字或下划线，必须以英文字母开头'
        },
        password: {
            status: false,
            errorMessage: '密码为6~12位数字、大小写字母、中划线、下划线'
        },
        'repeat-password': {
            status: false,
            errorMessage: '两次输入的密码不一致'
        },
        sid: {
            status: false,
            errorMessage: '8位数字，不能以0开头'
        },
        phone: {
            status: false,
            errorMessage: '11位数字，不能以0开头'
        },
        email: {
            status: false,
            errorMessage: '请输入合法邮箱'
        }
    },
}
var validator = [false, false, false, false, false, false];
function isValid () {
    for (var i = 0; i <= 5; i++) {
        if (validator[i] == false) {
            alert("注册失败，请查看错误提示");
            return false;
        }
    }
    return true;
}
function isPasswordValid() {
    //$(this).next().html("right");
    validator[5] = true;
    if (/[a-zA-Z0-9_-]{6,12}$/.test($(this).val())) {
        $(this).next().prop("class", "message")
        return;       
    }
    else {
        $(this).next().html("密码为6~12位数字、大小写字母、中划线、下划线");
    }
    $(this).next().prop("class", "errorMessage");
    validator[5] = false;
}
function isNameValid () {
    $(this).next().html("right");
    validator[0] = true;
    if (/^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test($(this).val())) {
        $(this).next().prop("class", "message")
        return;       
    }
    else {
        $(this).next().html("6~18位英文字母、数字或下划线，必须以英文字母开头");
    }
    $(this).next().prop("class", "errorMessage");
    validator[0] = false;
}

function isIdValid () {
    $(this).next().html("right");
    validator[1] = true;
    if (/^[1-9][0-9]{7}$/.test($(this).val())) {
        $(this).next().prop("class", "message")
        return;       
    }
    else {
        $(this).next().html("8位数字，不能以0开头");
    }
    $(this).next().prop("class", "errorMessage");
    validator[1] = false;
}

function isPhoneValid () {
    $(this).next().html("right");
    validator[2] = true;
    if (/^[1-9][0-9]{10}$/.test($(this).val())) {
        $(this).next().prop("class", "message")
        return;       
    }
    else
        $(this).next().html("11位数字，不能以0开头");
    $(this).next().prop("class", "errorMessage");
    validator[2] = false;
}

function isEmailValid () {
    $(this).next().html("right");
    validator[3] = true;
    if (/^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/.test($(this).val())) {
        $(this).next().prop("class", "message")
        return;       
    } else
        $(this).next().html("请输入合法邮箱");
    $(this).next().prop("class", "errorMessage");  
    validator[3] = false;
}

function isRepeatPassword () {
    $("#password-repeat").next().html("right");
    validator[4] = true;
    if ($("#password").val() == $("#password-repeat").val()) {
        $("#password, #password-repeat").next().prop("class", "message")
        return;       
    } else {
        $("#password-repeat").next().html("密码不一致");
    }
    $("#password-repeat").next().prop("class", "errorMessage");  
    validator[4] = false;      
}

$(document).ready(function () {
    $("#name, #studentid, #phone, #email, #password, #password-repeat").next().prop("class", "message")
    $("#name").focusout(isNameValid);
    $("#studentid").focusout(isIdValid);
    $("#phone").focusout(isPhoneValid);
    $("#email").focusout(isEmailValid);
    $("#password").focusout(isPasswordValid);
    $("#password-repeat").focusout(isRepeatPassword);
})