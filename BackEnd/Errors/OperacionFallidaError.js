class OperacionFallidaError extends Error {
  constructor(message) {
    super(message);
    this.name = "OperacionFallidaError";
  }
}
export default OperacionFallidaError;
