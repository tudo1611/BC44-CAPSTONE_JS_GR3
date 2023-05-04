function renderPrdList(prdArr) {
  var contentHTML = "";
  for (var i = 0; i < prdArr.length; i++) {
    var pro = prdArr[i];
    var contentTr = `<tr>
        <td>${pro.id}</td> 
        <td>${pro.name}</td>
        <td>${pro.price}</td>
        <td>${pro.screen}</td>
        <td>${pro.backCamera}</td>
        <td>${pro.frontCamera}</td>
        <td>
        <img src="${pro.img}" class="img-thumbnail img-prd" width = "100"/>
        </td>
        <td>${pro.desc}</td>
        <td>${pro.type}</td>
        <td>
              <button onclick="delPrd(${pro.id})" class="btn btn-danger mb-2 px-3" >Delete</button>
               <button 
               onclick="changePrd(${pro.id})"
               class="btn btn-secondary" >Change</button>
        </td>
        </tr>`;
    contentHTML = contentHTML + contentTr;
  }
  document.getElementById("tbodyPrd").innerHTML = contentHTML;
}

function getInfo() {
  var id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;
  var screen = document.getElementById("screen").value;
  var backCamera = document.getElementById("backCamera").value;
  var frontCamera = document.getElementById("frontCamera").value;
  var img = document.getElementById("img").value;
  var desc = document.getElementById("desc").value;
  var type = document.getElementById("type").value;
  // lưu
  var pro = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  return pro;
}

function showInfo(pro) {
  document.getElementById("id").value = pro.id;
  document.getElementById("name").value = pro.name;
  document.getElementById("price").value = pro.price;
  document.getElementById("screen").value = pro.screen;
  document.getElementById("backCamera").value = pro.backCamera;
  document.getElementById("frontCamera").value = pro.frontCamera;
  document.getElementById("img").value = pro.img;
  document.getElementById("desc").value = pro.desc;
  document.getElementById("type").value = pro.type;
}

function batLoading() {
  document.getElementById("loading").style.display = "flex";
}

function tatLoading() {
  document.getElementById("loading").style.display = "none";
}
