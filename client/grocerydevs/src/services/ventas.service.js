import http from "../http-common";

class VentasDataService {
  getAll() {
    return http.get("/ventas");
  }

  get(id) {
    return http.get(`/ventas/${id}`);
  }

  create(data) {
    return http.post("/ventas", data);
  }

  update(id, data) {
    return http.put(`/ventas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/ventas/${id}`);
  }

  deleteAll() {
    return http.delete(`/ventas`);
  }

  findByNu_item(nu_item) {
    return http.get(`/ventas?nu_item=${nu_item}`);
  }
}

export default new VentasDataService();