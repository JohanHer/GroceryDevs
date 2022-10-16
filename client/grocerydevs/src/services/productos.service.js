import http from "../http-common";

class ProductosDataService {
  getAll() {
    return http.get("/productos");
  }

  get(id) {
    return http.get(`/productos/${id}`);
  }

  create(data) {
    return http.post("/productos", data);
  }

  update(id, data) {
    return http.put(`/productos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/productos/${id}`);
  }

  deleteAll() {
    return http.delete(`/productos`);
  }

  findByNombre(nombre) {
    return http.get(`/productos?nombre=${nombre}`);
  }
}

export default new ProductosDataService();