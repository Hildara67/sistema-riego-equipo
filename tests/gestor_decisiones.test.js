const { describe, it } = require('node:test');
const assert = require('node:assert');
const GestorDecisiones = require('../src/core/gestor_decisiones');

describe('GestorDecisiones', () => {

  describe('evaluarUmbral', () => {

    it('retorna APLICAR_RIEGO cuando humedad es menor al mínimo', () => {
      assert.strictEqual(GestorDecisiones.evaluarUmbral(30, 40, 80), 'APLICAR_RIEGO');
    });

    it('retorna DETENER_RIEGO cuando humedad supera el máximo', () => {
      assert.strictEqual(GestorDecisiones.evaluarUmbral(85, 40, 80), 'DETENER_RIEGO');
    });

    it('retorna MANTENER cuando humedad está dentro del rango', () => {
      assert.strictEqual(GestorDecisiones.evaluarUmbral(60, 40, 80), 'MANTENER');
    });

    it('retorna APLICAR_RIEGO en límite inferior exacto', () => {
      assert.strictEqual(GestorDecisiones.evaluarUmbral(39, 40, 80), 'APLICAR_RIEGO');
    });

    it('retorna DETENER_RIEGO en límite superior exacto', () => {
      assert.strictEqual(GestorDecisiones.evaluarUmbral(81, 40, 80), 'DETENER_RIEGO');
    });
  });

  describe('calcularVolumen', () => {

    it('retorna 0 cuando déficit es 0', () => {
      assert.strictEqual(GestorDecisiones.calcularVolumen(0, 100), 0);
    });

    it('retorna 0 cuando déficit es negativo', () => {
      assert.strictEqual(GestorDecisiones.calcularVolumen(-5, 100), 0);
    });

    it('calcula volumen correctamente', () => {
      const resultado = GestorDecisiones.calcularVolumen(20, 100);
      assert.strictEqual(resultado, 140.00);
    });
  });

  describe('determinarUrgencia', () => {

    it('retorna CRÍTICO cuando déficit > 20', () => {
      assert.strictEqual(GestorDecisiones.determinarUrgencia(19, 40), 'CRÍTICO');
    });

    it('retorna ALTO cuando déficit > 10', () => {
      assert.strictEqual(GestorDecisiones.determinarUrgencia(25, 40), 'ALTO');
    });

    it('retorna MEDIO cuando déficit > 5', () => {
      assert.strictEqual(GestorDecisiones.determinarUrgencia(30, 40), 'MEDIO');
    });

    it('retorna BAJO cuando déficit <= 5', () => {
      assert.strictEqual(GestorDecisiones.determinarUrgencia(38, 40), 'BAJO');
    });
  });

  describe('calcularEstadoSemaforo', () => {

    it('retorna deficit cuando humedad < 30', () => {
      assert.strictEqual(GestorDecisiones.calcularEstadoSemaforo(20, 40, 80), 'deficit');
    });

    it('retorna deficit cuando humedad > 90', () => {
      assert.strictEqual(GestorDecisiones.calcularEstadoSemaforo(95, 40, 80), 'deficit');
    });

    it('retorna alerta cuando humedad está fuera de umbrales', () => {
      assert.strictEqual(GestorDecisiones.calcularEstadoSemaforo(35, 40, 80), 'alerta');
    });

    it('retorna optimo cuando humedad está dentro del rango', () => {
      assert.strictEqual(GestorDecisiones.calcularEstadoSemaforo(60, 40, 80), 'optimo');
    });
  });
});
