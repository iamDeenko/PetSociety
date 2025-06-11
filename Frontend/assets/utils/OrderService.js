let OrderService = {
  purchaseItems: function (data) {
    const userID = UserService.getUserId();
    const userToken = localStorage.getItem("user_token");
    console.log(userID);

    RestClient.delete(
      `/user/cart/deletecart/${userID}`,
      JSON.stringify(data),
      function (response) {
        console.log("Purchase successful:", response);
        toastr.success("Successfuly purchased!");
        window.location.href = "#view_main";
      },
      function (error) {
        console.error("Purchase failed:", error);
        toastr.error("Purchase failed: " + error.responseText);
      }
    );
  },
};
