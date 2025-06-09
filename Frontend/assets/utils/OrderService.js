let OrderService = {
  purchaseItems: function (data) {
    const userID = UserService.getUserId();
    const userToken = localStorage.getItem("user_token");
    console.log(userID);
    RestClient.request(
      `/api/user/cart/deletecart/${userID}`,
      "DELETE",
      null,
      function (data) {
        console.log("Delete successful:", data);
      },
      function (error) {
        toastr.success("Successfuly purchased!");
        console.error("Delete failed:", error);
      }
    );
  },
};
