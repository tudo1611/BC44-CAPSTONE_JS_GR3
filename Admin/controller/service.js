var prdService = {
  getList: function () {
    return axios({
      url: `${BASE_URL}`,
      method: "GET",
    });
  },
  remove: function (id) {
    return axios({
      url: `https://643ff4b93dee5b763e2ab2bb.mockapi.io/pro/${id}`,
      method: "DELETE",
    });
  },
  create: function (data) {
    return axios({
      url: BASE_URL,
      method: "POST",
      data: data,
    });
  },
};
