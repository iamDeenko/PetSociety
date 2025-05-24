let AuthService = {
  register: function () {
    console.log("Registering user...");

    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const firstName = document.getElementById("first_name").value;
      const lastName = document.getElementById("last_name").value;
      const phone = document.getElementById("phone").value;
      const addressLine1 = document.getElementById("address_line1").value;
      const city = document.getElementById("city").value;
      const country = document.getElementById("country").value;
      const postalCode = document.getElementById("postal_code").value;

      console.log("Form Data:", {
        email,
        password,
        firstName,
        lastName,
        phone,
        addressLine1,
        city,
        country,
        postalCode,
      });

      let data = {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        address_line1: addressLine1,
        city: city,
        country: country,
        postal_code: postalCode,
      };

      if (AuthService.validateEmail(email) == null) {
        toastr.error("Invalid Email!");
      } else {
        const registrationFormData = new FormData();

        registrationFormData.append("email", email);
        registrationFormData.append("password", password);
        registrationFormData.append("first_name", firstName);
        registrationFormData.append("last_name", lastName);
        registrationFormData.append("phone", phone);
        registrationFormData.append("address_line1", addressLine1);
        registrationFormData.append("city", city);
        registrationFormData.append("postal_code", postalCode);

        console.log(registrationFormData);

        $.ajax({
          url: "http://petsociety.local/api/auth/register",
          type: "POST",
          data: data,

          success: function (res) {
            console.log(res);
            toastr.success("Registration successful");

            window.location.href = "#view_login";
          },
          error: function (err) {
            console.log(err);
            toastr.error(err.responseText);
          },
        });
      }
    });
  },

  validateEmail: function (email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  },
};
