// Disable the no explicit any rule as it is too restrictive for generic PATCH, POST and PUT methods 
import type problemDetails from "@/models/base/problemDetails";

export const httpClient = {
  get,
  getFile,
  post,
  postFile,
  put,
  delete: _delete,
  patch
};

import { formatISO } from "date-fns";

Date.prototype.toJSON = function () {
  return formatISO(this, { representation: "date" });
};

/** GET method */
async function get<tResponse> (url: string, queryParams?: Record<string, string>): Promise<tResponse> {
  // If any parameters
  if (queryParams) {
    // Convert to string
    const params = new URLSearchParams(queryParams).toString();

    // Build URL with params
    url = url.concat(url.includes("?") ? "&" : "?", params);
  }

  const headers = new Headers();
  headers.append("X-Requested-With", "XMLHttpRequest");
  headers.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "GET",
    cache: "no-store",
    headers,
  };

  return handleResponse(await fetch(url, requestOptions));
}

async function getFile (url: string, queryParams?: Record<string, string>): Promise<Blob> {
  // If any parameters
  if (queryParams) {
    // Convert to string
    const params = new URLSearchParams(queryParams).toString();

    // Build URL with params
    url = url.concat(url.includes("?") ? "&" : "?", params);
  }

  const headers = new Headers();
  headers.append("X-Requested-With", "XMLHttpRequest");
  headers.append("Content-Type", "application/pdf");

  const requestOptions: RequestInit = {
    headers,
  };

  const response = await fetch(url, requestOptions);
  
  if (response.ok) {
    return Promise.resolve(response.blob());
  }

  return Promise.reject();
}

/** POST method */
async function post<tResponse, tBodyType> (url: string, body: tBodyType): Promise<tResponse> {

  const headers = new Headers();
  headers.append("X-Requested-With", "XMLHttpRequest");
  headers.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  };

  return handleResponse(await fetch(url, requestOptions));
}

async function postFile<tResponse, tBodyType> (url: string, file: File): Promise<tResponse> {
  const data = new FormData();
  data.append("file", file);

  const headers = new Headers();
  headers.append("X-Requested-With", "XMLHttpRequest");
  // headers.append("Content-Type", "application/pdf");

  const requestOptions: RequestInit = {
    method: "POST",
    headers,
    body: data
  };

  return handleResponse(await fetch(url, requestOptions));
}

/** PUT method */
async function put<tResponse, tBodyType> (url: string, resourceId: string, body: tBodyType): Promise<tResponse> {
  if (resourceId != undefined && !url.includes(`/${resourceId}`)) {
    url += !url.endsWith("/") ? `/${resourceId}` : resourceId;
  }

  const headers = new Headers();
  headers.append("X-Requested-With", "XMLHttpRequest");
  headers.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  };


  return handleResponse(await fetch(url, requestOptions));
}

/** PATCH method */
async function patch<tResponse, tBodyType> (url: string, resourceId: string, body: tBodyType): Promise<tResponse> {
  if (resourceId != undefined && !url.includes(`/${resourceId}`)) {
    url += !url.endsWith("/") ? `/${resourceId}` : resourceId;
  }

  const headers = new Headers();
  headers.append("X-Requested-With", "XMLHttpRequest");
  headers.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
  };

  return handleResponse(await fetch(url, requestOptions));
}

/** DELETE method */
// prefixed with underscore because delete is a reserved word in javascript
// exported as delete
async function _delete<tResponse, tBodyType> (url: string, resourceId?: string, body?: tBodyType): Promise<tResponse> {
  if (resourceId != undefined && !url.includes(`/${resourceId}`)) {
    url += !url.endsWith("/") ? `/${resourceId}` : resourceId;
  }

  const headers = new Headers();
  headers.append("X-Requested-With", "XMLHttpRequest");
  headers.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "DELETE",
    headers,
    body: JSON.stringify(body)
  };

  return handleResponse(await fetch(url, requestOptions));
}

// helper functions
async function handleResponse<tResponse> (response: Response): Promise<tResponse> {
  let text = await response.text();
  // handle no content
  if (!text && response.ok) {
    text = "{}";
  }

  let data;
  try {
    data = text && JSON.parse(text);
  } catch (e) {
    throw "Invalid JSON string. Please ensure controller returns valid JSON string not Raw text";
  }

  if (!response.ok) {
    const error = data || { message: response.statusText, status: response.status } as problemDetails;
    return Promise.reject(error);
  }
  
  return data;
}
