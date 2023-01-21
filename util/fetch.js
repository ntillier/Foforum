
export default function get(op, query, variables = {}) {
    return fetch(
        '/api/graphql',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        }
    ).then(r => r.json()).then(r => r?.data[op]);
}