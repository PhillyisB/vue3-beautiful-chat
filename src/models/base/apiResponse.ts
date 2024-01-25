import problemDetails from "./problemDetails";

export default class apiResponse<tResponseData> {
  /** The data returned from the server */
  public response?: tResponseData;
  /** The error response if the request failed */
  public errorResponse?: problemDetails

  /** Whether the apiResponse was a success */
  public get success () {
    return this.errorResponse === undefined
  }

  /** Indicates the async constructor has completed construction.
   * Ensure you await this before attempting to use the created instance.
   */
  public ready: Promise<void>;

  /** Type guard to check if an error looks like ProblemDetails */
  private isProblem (error: unknown): error is problemDetails {
    return (error as problemDetails).status !== undefined;
  }

  /** Constructs the instance */
  constructor (requestFunc:() => Promise<tResponseData>) {
    this.ready = new Promise((resolve) => {
      requestFunc()
        .then(response => {
          this.response = response;
          resolve(undefined);
        })
        .catch(error => {
          if (this.isProblem(error)) {
            this.errorResponse = error;
          }
          else {
            this.errorResponse = { 
              detail: "An unexpected error occurred",
              status: 500
            }
          }
          resolve(undefined); 
        });
    });
  }
}

