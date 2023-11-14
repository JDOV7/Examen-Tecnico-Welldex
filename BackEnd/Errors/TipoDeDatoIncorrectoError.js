class TipoDeDatoIncorrectoError extends Error {
  constructor(message) {
    super(message);
    this.name = "TipoDeDatoIncorrectoError";
  }
}
export default TipoDeDatoIncorrectoError;
