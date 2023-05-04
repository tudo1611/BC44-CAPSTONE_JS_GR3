let cart = [];

// Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("cart");
var close = document.getElementsByClassName("close")[0];
var close_footer = document.getElementsByClassName("close-footer")[0];
var order = document.getElementsByClassName("order")[0];
btn.onclick = function () {
  modal.style.display = "block";
};
close.onclick = function () {
  modal.style.display = "none";
};
close_footer.onclick = function () {
  modal.style.display = "none";
};
order.onclick = function () {
  alert("Thank you for your order payment");
  clearCart();
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// lấy data từ server và render
function fetchList() {
  batLoading();

  axios({
    url: "https://643ff4b93dee5b763e2ab2bb.mockapi.io/pro",
    method: "GET",
  })
    .then(function (res) {
      tatLoading();
      console.log(res.data);
      render(res.data);
    })
    .catch(function (err) {
      tatLoading();
      console.log("err: ", err);
    });
}
fetchList();





