import FancyError from "../handle/fancy-error.js";

interface FRequest {
  get(url: URL, headers?: Headers): Promise<FancyResponse | FancyError>;
  post(url: URL, body: BodyInit, headers?: Headers): Promise<FancyResponse | FancyError>;
  put(url: URL, body: BodyInit, headers?: Headers): Promise<FancyResponse | FancyError>;
  delete(url: URL, headers?: Headers): Promise<FancyResponse | FancyError>;
}

interface FResponse {
    readonly data: any;
    readonly status: number;
    readonly statusText: string;
}

class FancyResponse implements FResponse {
  constructor(public readonly data: any, public readonly status: number, public readonly statusText:string) {
  }
}

class FancyRequest implements FRequest {
  constructor() {
  }
  /**
   * Method for handling GET requests
   * @param url - Put a valid URL
   * @param headers - Headers to send to the server
   * @returns {FancyResponse} FancyResponse object
   */
  async get(url: URL, headers?: Headers) {
    try {
      const fetchResponse = await fetch(url, { headers });
      const responseData = await fetchResponse.json();
      const fancyResponse = new FancyResponse(responseData, fetchResponse.status, "ok");
      return fancyResponse;
    } catch (error: any) {
      const customError = new FancyError(error);
      return customError
    }
  }

  /**
   * Method for handling POST requests
   * @param url - Put a valid URL
   * @param body - Object containing data to send to the server
   * @param headers - Headers to send to the server
   * @returns {FancyResponse} FancyResponse object
   */
  async post(url: URL, body: BodyInit, headers?: Headers) {
    try {
      if (!body) {
        const response = new FancyResponse("Body is required in POST request.", 400, 'Bad Request');
        return response;
      }
      const fetchResponse = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      const responseData = await fetchResponse.json();
      const response = new FancyResponse(responseData, fetchResponse.status, fetchResponse.statusText);
      return response;
    } catch (error: any) {
      const customError = new FancyError(error);
      return customError
    }
  }

  /**
   * Method for handling PUT requests
   * @param url - Put a valid URL
   * @param body - Object containing data to send to the server
   * @param headers - Headers to send to the server
   * @returns {FancyResponse} FancyResponse object
   */
  async put(url: URL, body: BodyInit, headers?: Headers) {
    try {
      if (!body) {
        const response = new FancyResponse("Body is required in PUT request.", 400, 'Bad request');
        return response;
      }
      const fetchResponse = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body),
      });
      const responseData = await fetchResponse.json();
      const response = new FancyResponse(responseData, fetchResponse.status, "ok");
      return response;
    } catch (error: any) {
      const customError = new FancyError(error);
      return customError
    }
  }

  /**
   * Method for handling DELETE requests
   * @param url - Put a valid URL
   * @param headers - Headers to send to the server
   * @returns {FancyResponse} FancyResponse object
   */
  async delete(url: URL, headers?: Headers) {
    try {
      const fetchResponse = await fetch(url, {
        method: "DELETE",
        headers: headers,
      });
      const responseData = await fetchResponse.json();
      const response = new FancyResponse(responseData, fetchResponse.status, "ok");
      return response;
    } catch (error: any) {
      const customError = new FancyError(error);
      return customError
    }
  }
}

export default new FancyRequest();
