import { NextResponse } from 'next/server';

interface ErrorResponse {
  message: string;
  status?: number;
  headers?: HeadersInit;
}

export const apiResponse = {
  error({ message, status = 500, headers }: ErrorResponse) {
    const responseInit: ResponseInit = { status };
    if (headers !== undefined) {
      responseInit.headers = headers;
    }

    return NextResponse.json(
      { error: message },
      responseInit
    );
  },

  success<T>(data: T, status = 200) {
    return NextResponse.json(data, { status });
  },

  unauthorized() {
    return this.error({
      message: 'Session expired or unauthorized',
      status: 401,
      headers: {
        'WWW-Authenticate': 'Bearer error="invalid_token"'
      }
    });
  },

  notFound(message = 'Resource not found') {
    return this.error({ message, status: 404 });
  },

  badRequest(message: string) {
    return this.error({ message, status: 400 });
  },

  serverError() {
    return this.error({ 
      message: 'Internal Server Error',
      status: 500 
    });
  }
};
