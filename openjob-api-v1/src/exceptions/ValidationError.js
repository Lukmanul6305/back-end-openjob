import ClientError from "./ClientError.js";

class ValidationError extends ClientError {
    constructor(message = 'Validation error') {
        super(message, 400);
        this.name = 'ValidationError';
    }
}

export default ValidationError;