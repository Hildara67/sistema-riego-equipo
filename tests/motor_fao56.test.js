const { describe, it } = require('node:test');
const assert = require('node:assert');
const MotorFAO56 = require('../src/core/motor_fao56');

describe('MotorFAO56', () => {

  it('calcula ETc correctamente con valores válidos', () => {
    const resultado = MotorFAO56.calcularETc(1.0, 5.0);
    assert.strictEqual(resultado, 5.00);
  });

  it('calcula ETc con Kc = 0.5', () => {
    const resultado = MotorFAO56.calcularETc(0.5, 6.0);
    assert.strictEqual(resultado, 3.00);
  });

  it('lanza error si Kc no es numérico', () => {
    assert.throws(() => MotorFAO56.calcularETc('a', 5), /numéricos/);
  });

  it('lanza error si ETo no es numérico', () => {
    assert.throws(() => MotorFAO56.calcularETc(1.0, 'x'), /numéricos/);
  });

  it('calcula balance hídrico correctamente', () => {
    const balance = MotorFAO56.calcularBalanceHidrico(50, 10, 20, 5, 2);
    assert.strictEqual(balance, 73.00);
  });

  it('balance hídrico con valores negativos (déficit)', () => {
    const balance = MotorFAO56.calcularBalanceHidrico(10, 0, 0, 15, 0);
    assert.strictEqual(balance, -5.00);
  });

  it('redondea a 2 decimales', () => {
    const balance = MotorFAO56.calcularBalanceHidrico(10.123, 3.456, 0, 2.1, 0.5);
    assert.strictEqual(balance, 10.98);
  });
});
