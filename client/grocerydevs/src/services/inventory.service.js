import http from "../http-common";

class InventoryDataService {
  getAll() {
    return http.get("/inventory");
  }

  get(id) {
    return http.get(`/inventory/${id}`);
  }

  create(data) {
    return http.post("/inventory", data);
  }

  update(id, data) {
    return http.put(`/inventory/${id}`, data);
  }

  delete(id) {
    return http.delete(`/inventory/${id}`);
  }

  deleteAll() {
    return http.delete(`/inventories`);
  }

  findByName(name) {
    return http.get(`/inventory?title=${name}`);
  }
}

export default new InventoryDataService();