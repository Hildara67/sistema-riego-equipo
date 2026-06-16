class MotorFAO56 {

  // Calcula la evapotranspiración del cultivo (ETc) multiplicando
  // el coeficiente del cultivo (Kc) por la evapotranspiración de referencia (ETo).
  // Kc varía según el tipo de cultivo y etapa fenológica.
  // ETo se obtiene de la API NASA POWER (datos climáticos históricos).
  static calcularETc(kc, et0) {
    const kcNum = Number(kc);
    const et0Num = Number(et0);
    if (isNaN(kcNum) || isNaN(et0Num)) {
      throw new Error('Parámetros deben ser numéricos');
    }
    const resultado = kcNum * et0Num;
    return Number(resultado.toFixed(2));
  }

  // Calcula el balance hídrico del suelo usando la ecuación:
  // Balance = Humedad inicial + Precipitación + Riego - ETc - Drenaje
  // Un resultado positivo indica excedente de agua, negativo indica déficit.
  static calcularBalanceHidrico(hInicial, precip, riego, etc, drenaje) {
    const balance = hInicial + precip + riego - etc - drenaje;
    return Number(balance.toFixed(2));
  }
}

module.exports = MotorFAO56;
