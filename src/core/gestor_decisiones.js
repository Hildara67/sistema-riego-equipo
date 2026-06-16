class GestorDecisiones {

  // Evalúa la humedad del suelo contra los umbrales configurados.
  // Retorna la acción recomendada: APLICAR_RIEGO, DETENER_RIEGO o MANTENER.
  // Los umbrales mínimo y máximo los define el SUPERVISOR en la pantalla de Configuración.
  static evaluarUmbral(hFinal, umbralMin, umbralMax) {
    if (hFinal < umbralMin) return 'APLICAR_RIEGO';
    if (hFinal > umbralMax) return 'DETENER_RIEGO';
    return 'MANTENER';
  }

  // Calcula el volumen de agua necesario en litros.
  // Fórmula: déficit × área × 0.07 (factor de conversión basado en
  // la capacidad de retención de humedad del suelo).
  static calcularVolumen(deficit, area) {
    if (deficit <= 0) return 0.00;
    const volumen = deficit * area * 0.07;
    return Number(volumen.toFixed(2));
  }

  // Determina el nivel de urgencia de la recomendación basado en
  // qué tan lejos está la humedad del umbral mínimo.
  // CRÍTICO = necesita atención inmediata, BAJO = monitoreo normal.
  static determinarUrgencia(hFinal, umbralMin) {
    const deficit = umbralMin - hFinal;
    if (deficit > 20) return 'CRÍTICO';
    if (deficit > 10) return 'ALTO';
    if (deficit > 5) return 'MEDIO';
    return 'BAJO';
  }

  // Calcula el estado del semáforo visual del dashboard.
  // deficit = rojo, alerta = amarillo, optimo = verde.
  static calcularEstadoSemaforo(humedad, umbralMin, umbralMax) {
    if (humedad < 30 || humedad > 90) return 'deficit';
    if (humedad < umbralMin || humedad > umbralMax) return 'alerta';
    return 'optimo';
  }
}

module.exports = GestorDecisiones;
