// eslint-disable-next-line max-classes-per-file
class InvalidArgumentError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'InvalidArgumentError';
    }
}

class InternalServerError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'InternalServerError';
    }
}

module.exports = {
    InvalidArgumentError,
    InternalServerError
};
