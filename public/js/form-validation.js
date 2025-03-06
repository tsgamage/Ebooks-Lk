$(document).ready(function () {
  $("#register").validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6,
      },
      confirmPassword: {
        required: true,
        equalTo: "#password",
      },
    },


    // messages: {
    //     name:{
    //         required: "Enter your name"
    //     },
    //   email: {
    //     required: "Enter your email",
    //     email: "Enter a valid email",
    //   },
    //   password: {
    //     required: "Enter a password",
    //     minlength: "Password must be at least 6 characters",
    //   },
    //   confirmPassword: {
    //     required: "Confirm your password",
    //     equalTo: "Passwords must match",
    //   },
    // },


    // submitHandler: function(form) {
    //     alert("Form submitted successfully");
    //     form.submit(); // this will send the form if everything is correct
    // }
  });
});

$(document).ready($("#register").on("input",()=>{
    document.querySelectorAll(".error-message").forEach((element)=>{
        element.classList.add("d-none")
    })
}))

$(document).ready($("#login").on("input",()=>{
    document.querySelectorAll(".error-message").forEach((element)=>{
        element.classList.add("d-none")
    })
}))