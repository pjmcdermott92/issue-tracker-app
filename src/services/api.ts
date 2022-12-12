type Url = string;
type Body = object | null;

const headers = {
    'Content-Type': 'application/json'
}

export const api = {
    get: async (url: Url) => {
        return await makeRequest(url, 'GET');
    },
    post: async (url: Url, body: Body) => {
        return await makeRequest(url, 'POST', body);
    },
    put: async (url: Url , body: Body) => {
        return await makeRequest(url, 'PUT', body);
    },
    delete: async (url: Url) => {
        return await makeRequest(url, 'DELETE');
    }
}

async function makeRequest(
    url: string,
    method: string = 'GET',
    body?: object | null
) {
    try {
        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
            credentials: 'include'
        });
    
        const res = await response.json();
        return res;
    } catch (err: any) {
        //@TODO: Handle errors in Fetch
    }
}
