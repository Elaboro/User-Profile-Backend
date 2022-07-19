import { HttpStatus } from "../enum/HttpStatus";

export class BaseError extends Error {

    status: number;

    constructor(message: string, status: number = HttpStatus.INTERNAL_SERVER_ERROR) {
        super(message);
        this.status = status;
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string = "Not Found") {
        super(message, HttpStatus.NOT_FOUND);
    }
}

export class DuplicateError extends BaseError {
    constructor(message: string = "Duplicate") {
        super(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}

export class ForbiddenError extends BaseError {
    constructor(message: string = "Forbidden") {
        super(message, HttpStatus.FORBIDDEN);
    }
}

export class UnauthorizedError extends BaseError {
    constructor(message: string = "Unauthorized") {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}
