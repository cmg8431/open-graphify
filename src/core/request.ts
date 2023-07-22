import request from 'superagent';

import { OpenGraphOptions } from './types';

/**
 * Performs the fetch request and formats the data for ogs
 *
 * @param {string} url - URL to fetch
 * @param {object} options - options for ogs
 * @returns {Promise<{ data: string, response: { status: number, headers: object } }>} formatted request data and response
 */
export const httpRequest = async (
  url: string,
  options: OpenGraphOptions = {},
) => {
  try {
    const {
      text: data,
      status,
      headers,
    } = await request
      .get(url || '')
      .timeout((options.timeout || 10) * 1000)
      .set({ Origin: url })
      .set(options.headers || {});

    if (!data) throw new Error('Page not found or empty');

    if (!headers['content-type']?.includes('text/'))
      throw new Error('Invalid content type detected');

    if (status >= 400 && status <= 599) handleError(status);

    return { data, headers, status };
  } catch (error) {
    throw error;
  }
};

/**
 * Handles HTTP error status codes and throws corresponding error messages.
 *
 * @param {number} status - HTTP status code
 * @throws {Error} Error with the corresponding error message
 */
const handleError = (status: number) => {
  const message =
    ERROR_MESSAGE[status] || 'Server has returned a client or server error';

  throw new Error(message);
};

const ERROR_MESSAGE: Record<number, string> = {
  400: '400 Bad Request',
  401: '401 Unauthorized',
  403: '403 Forbidden',
  404: '404 Not Found',
  408: '408 Request Timeout',
  410: '410 Gone',
  500: '500 Internal Server Error',
  502: '502 Bad Gateway',
  503: '503 Service Unavailable',
  504: '504 Gateway Timeout',
};
