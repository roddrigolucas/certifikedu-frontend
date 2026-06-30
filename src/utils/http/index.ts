export const get = async <TRequestResponse>(endpoint: string, bearerToken: string) => {
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data: TRequestResponse = await response.json();

  return data;
};

export async function post<T, U>(
  url: string,
  data: T,
  timeoutDuration: number = 20000,
): Promise<U> {
  try {
    const fetchPromise = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const response = await Promise.race([fetchPromise, timeout(timeoutDuration)]);

    if (!(response instanceof Response)) {
      throw new Error('The response is not an instance of Response.');
    }
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(
        `${errorBody.response.message || `Erro nos servidores, por favor, tente novamente em instantes.`}`,
      );
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

function timeout(ms: number): Promise<void> {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), ms));
}
