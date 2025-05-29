$(document).on("click", "#back", function () {
  const all = document.getElementById("all");
  console.log("123");
  all.scrollLeft += 150;
});

$(document).on("click", "#forward", function () {
  const all = document.getElementById("all");

  all.scrollLeft -= 150;
});
