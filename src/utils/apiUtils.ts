interface RequestOptions {
  method: string;
  headers?: Record<string, string>;
  body?: string;
}

const superFetch = async (
  endpoint: string,
  options: RequestOptions
): Promise<Response> => {
  const url = `${process.env.REACT_APP_ENDPOINT_DEV}/${endpoint}`;

  try {
    const response = await fetch(url, options);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default superFetch;
