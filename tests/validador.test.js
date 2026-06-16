const { describe, it } = require('node:test');
const assert = require('node:assert');
const Validador = require('../src/core/validador');

describe('Validador', () => {

  describe('esRangoHumedad', () => {

    it('acepta humedad válida (50)', () => {
      assert.strictEqual(Validador.esRangoHumedad(50), true);
    });

    it('acepta humedad en límite inferior (0)', () => {
      assert.strictEqual(Validador.esRangoHumedad(0), true);
    });

    it('acepta humedad en límite superior (100)', () => {
      assert.strictEqual(Validador.esRangoHumedad(100), true);
    });

    it('lanza error si humedad < 0', () => {
      assert.throws(() => Validador.esRangoHumedad(-1), /Humedad fuera de rango/);
    });

    it('lanza error si humedad > 100', () => {
      assert.throws(() => Validador.esRangoHumedad(101), /Humedad fuera de rango/);
    });

    it('lanza error si humedad no es número', () => {
      assert.throws(() => Validador.esRangoHumedad('abc'), /Humedad fuera de rango/);
    });
  });

  describe('esRangoTemperatura', () => {

    it('acepta temperatura válida (25)', () => {
      assert.strictEqual(Validador.esRangoTemperatura(25), true);
    });

    it('acepta temperatura mínima (-10)', () => {
      assert.strictEqual(Validador.esRangoTemperatura(-10), true);
    });

    it('acepta temperatura máxima (50)', () => {
      assert.strictEqual(Validador.esRangoTemperatura(50), true);
    });

    it('lanza error si temperatura < -10', () => {
      assert.throws(() => Validador.esRangoTemperatura(-15), /Temperatura fuera de rango/);
    });

    it('lanza error si temperatura > 50', () => {
      assert.throws(() => Validador.esRangoTemperatura(55), /Temperatura fuera de rango/);
    });
  });

  describe('validarUmbrales', () => {

    it('acepta umbrales válidos', () => {
      assert.strictEqual(Validador.validarUmbrales(30, 70), true);
    });

    it('lanza error si min >= max', () => {
      assert.throws(() => Validador.validarUmbrales(80, 40), /mínimo debe ser menor/);
    });

    it('lanza error si umbral < 0', () => {
      assert.throws(() => Validador.validarUmbrales(-10, 80), /0% y 100%/);
    });

    it('lanza error si umbral > 100', () => {
      assert.throws(() => Validador.validarUmbrales(30, 150), /0% y 100%/);
    });
  });

  describe('validarKc', () => {

    it('acepta Kc = 1.0', () => {
      assert.strictEqual(Validador.validarKc(1.0), true);
    });

    it('lanza error si Kc < 0.1', () => {
      assert.throws(() => Validador.validarKc(0.05), /0.1 y 2.0/);
    });

    it('lanza error si Kc > 2.0', () => {
      assert.throws(() => Validador.validarKc(2.5), /0.1 y 2.0/);
    });
  });

  describe('esAreaValida', () => {

    it('acepta área positiva', () => {
      assert.strictEqual(Validador.esAreaValida(100), true);
    });

    it('lanza error si área es 0', () => {
      assert.throws(() => Validador.esAreaValida(0), /mayor a 0/);
    });

    it('lanza error si área es negativa', () => {
      assert.throws(() => Validador.esAreaValida(-5), /mayor a 0/);
    });
  });
});
