// lấy dữ liệu từ server và render

const BASE_URL = "https://643ff4b93dee5b763e2ab2bb.mockapi.io/pro";
var idSelected = null;
function fetchPrdList() {
  batLoading();
  prdService
    .getList()
    .then(function (res) {
      tatLoading();
      console.log("res: ", res);
      renderPrdList(res.data.reverse());
    })
    .catch(function (err) {
      tatLoading();
      console.log("err: ", err);
    });
}
fetchPrdList();

//xoa prd

function delPrd(id) {
  batLoading();
  prdService
    .remove(id)
    .then(function (res) {
      console.log("res: ", res);
      fetchPrdList();
      Toastify({
        text: "Xóa SP thành công",
        offset: {
          x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: 10, // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
      }).showToast();
      tatLoading();
      resetForm();
    })
    .catch(function (err) {
      console.log("err: ", err);
    });
}

function createPrd() {
  var dataPrd = getInfo();
  console.log("dataPrd: ", dataPrd);
  prdService
    .create(dataPrd)
    .then(function (res) {
      //gọi lại api lấy danh sách mới nhất từ server sau khi xóa thành công
      fetchPrdList();
    })
    .catch(function (err) {
      console.log("err: ", err);
    });
}

function changePrd(id) {
  idSelected = id;
  batLoading();
  axios({
    url: `https://643ff4b93dee5b763e2ab2bb.mockapi.io/pro/${id}`,
    method: "GET",
  })
    .then(function (res) {
      tatLoading();
      //chặn user sửa tknv
      document.getElementById("id").disabled = true;
      showInfo(res.data);
      console.log(res);
    })
    .catch(function (err) {
      tatLoading();
      console.log(err);
    });
}

function updatePrd() {
  axios({
    url: `${BASE_URL}/${idSelected}`,
    method: "PUT",
    data: getInfo(),
  })
    .then(function (res) {
      //bỏ chặn user
      document.getElementById("id").disabled = false;
      fetchPrdList();
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function resetForm() {
  document.getElementById("formQLSP").reset();
}
