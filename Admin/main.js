// lấy dữ liệu từ server và render

const BASE_URL = "https://643ff4b93dee5b763e2ab2bb.mockapi.io/pro";
var idSelected = 0;
var productArr = [];
var dataJson = localStorage.getItem("PRD_LOCAL");
if (dataJson != null) {
  var dataArr = JSON.parse(dataJson);
  for (var i = 0; i < dataArr.length; i++) {
    var item = dataArr[i];
    var prd = new Product(
      item.id,
      item.name,
      item.price,
      item.screen,
      item.bCamera,
      item.fCamera,
      item.img,
      item.desc,
      item.type
    );
    productArr.push(prd);
    console.log("productArr", productArr);
  }
}
function fetchPrdList() {
  batLoading();
  prdService
    .getList()
    .then(function (res) {
      tatLoading();
      console.log("res: ", res);
      renderPrdList(res.data.reverse());
      var dataJson = JSON.stringify(res.data);
      localStorage.setItem("PRD_LOCAL", dataJson);
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
        text: "Delete product successfully!!!",
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
  batLoading();
  var dataPrd = getInfo();
  var isValid = checkEmpty("spanName", dataPrd.name);
  isValid = isValid & checkEmpty("spanPrice", dataPrd.price);
  isValid = isValid & checkEmpty("spanScreen", dataPrd.screen);
  isValid = isValid & checkEmpty("spanBCamera", dataPrd.backCamera);
  isValid = isValid & checkEmpty("spanFCamera", dataPrd.frontCamera);
  isValid = isValid & checkEmpty("spanImg", dataPrd.img);
  isValid = isValid & checkEmpty("spanDesc", dataPrd.desc);
  isValid =
    isValid & checkEmpty("spanType", dataPrd.type) &&
    validateProductType(dataPrd.type);

  console.log("dataPrd: ", dataPrd);
  if (!isValid) {
    return;
  }
  prdService
    .create(dataPrd)
    .then(function (res) {
      tatLoading();
      //gọi lại api lấy danh sách mới nhất từ server sau khi xóa thành công
      fetchPrdList();
      resetForm();
      Toastify({
        text: "More successful products!!!",
        offset: {
          x: 50,
          y: 10,
        },
      }).showToast();
      tatLoading();
    })
    .catch(function (err) {
      console.log("err: ", err);
      tatLoading();
    });
}

function changePrd(id) {
  idSelected = id;
  // batLoading();
  axios({
    url: `https://643ff4b93dee5b763e2ab2bb.mockapi.io/pro/${id}`,
    method: "GET",
  })
    .then(function (res) {
      // tatLoading();
      //chặn user sửa id
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
  var dataPrd = getInfo();
  var isValid = checkEmpty("spanName", dataPrd.name);
  isValid = isValid & checkEmpty("spanPrice", dataPrd.price);
  isValid = isValid & checkEmpty("spanScreen", dataPrd.screen);
  isValid = isValid & checkEmpty("spanBCamera", dataPrd.backCamera);
  isValid = isValid & checkEmpty("spanFCamera", dataPrd.frontCamera);
  isValid = isValid & checkEmpty("spanImg", dataPrd.img);
  isValid = isValid & checkEmpty("spanDesc", dataPrd.desc);
  isValid =
    isValid & checkEmpty("spanType", dataPrd.type) &&
    validateProductType(dataPrd.type);

  console.log("dataPrd: ", dataPrd);
  if (!isValid) {
    return;
  }
  axios({
    url: `${BASE_URL}/${idSelected}`,
    method: "PUT",
    data: getInfo(),
  })
    .then(function (res) {
      //bỏ chặn user
      document.getElementById("id").disabled = false;
      fetchPrdList();
      resetForm();
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function resetForm() {
  document.getElementById("formPrd").reset();
}

function ascending() {
  var arrSort1 = productArr.sort((a, b) => a.price - b.price);
  console.log(arrSort1);
  renderPrdList(arrSort1);
}
function decrease() {
  var arrSort2 = productArr.sort((a, b) => b.price - a.price);
  console.log(arrSort2);
  renderPrdList(arrSort2);
}

// search
async function getAllProduct() {
  return await axios
    .get("https://643ff4b93dee5b763e2ab2bb.mockapi.io/pro")
    .then(function (res) {
      return res.data;
    });
}


async function search() {
  batLoading();
  searchName = document.getElementById("txtSearch").value;
  console.log("searchName: ", searchName);
  let prdList = await getAllProduct();
  var newArr = prdList.filter(function (item) {
    return item.name.toLowerCase().includes(searchName.toLowerCase());
  });
  tatLoading();
  renderPrdList(newArr);
}
