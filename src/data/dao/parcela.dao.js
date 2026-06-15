const pool = require('../db');
const ParcelaDTO = require('../../dto/parcela.dto');

class ParcelaDAO {

  static async listarTodas() {
    const sql = `SELECT * FROM parcelas ORDER BY nombre`;
    const [rows] = await pool.query(sql);
    return rows.map(mapearADTO);
  }

  static async buscarPorId(id) {
    const sql = `SELECT * FROM parcelas WHERE parcela_id = ?`;
    const [rows] = await pool.query(sql, [id]);
    if (rows.length === 0) return null;
    return mapearADTO(rows[0]);
  }

  static async crear(parcelaDTO) {
    const sql = `INSERT INTO parcelas (nombre, area_m2, cultivo, fecha_registro) VALUES (?, ?, ?, NOW())`;
    const [result] = await pool.query(sql, [
      parcelaDTO.nombre,
      parcelaDTO.areaM2,
      parcelaDTO.cultivo
    ]);
    return result.insertId;
  }

  static async actualizar(id, parcelaDTO) {
    const sql = `UPDATE parcelas SET nombre = ?, area_m2 = ?, cultivo = ? WHERE parcela_id = ?`;
    await pool.query(sql, [
      parcelaDTO.nombre,
      parcelaDTO.areaM2,
      parcelaDTO.cultivo,
      id
    ]);
  }

  static async eliminar(id) {
    const sql = `DELETE FROM parcelas WHERE parcela_id = ?`;
    await pool.query(sql, [id]);
  }

  static async nombreExiste(nombre, excluirId) {
    let sql = `SELECT COUNT(*) as count FROM parcelas WHERE nombre = ?`;
    const params = [nombre];
    if (excluirId) {
      sql += ' AND parcela_id != ?';
      params.push(excluirId);
    }
    const [rows] = await pool.query(sql, params);
    return rows[0].count > 0;
  }

  static async contarTotal() {
    const sql = `SELECT COUNT(*) as total FROM parcelas`;
    const [rows] = await pool.query(sql);
    return rows[0].total;
  }

  static async obtenerResumen() {
    const sql = `SELECT p.parcela_id, p.nombre, p.area_m2, p.cultivo,
      COUNT(l.lectura_id) as total_lecturas,
      (SELECT COUNT(*) FROM recomendaciones_riego r WHERE r.parcela_id = p.parcela_id) as total_recomendaciones
      FROM parcelas p
      LEFT JOIN lecturas_sensores l ON p.parcela_id = l.parcela_id
      GROUP BY p.parcela_id, p.nombre, p.area_m2, p.cultivo
      ORDER BY p.nombre`;
    const [rows] = await pool.query(sql);
    return rows;
  }
}

function mapearADTO(row) {
  return new ParcelaDTO({
    id: row.parcela_id,
    nombre: row.nombre,
    areaM2: row.area_m2,
    cultivo: row.cultivo,
    fechaRegistro: row.fecha_registro
  });
}

module.exports = ParcelaDAO;
