export function makeOptions(method, body) {
  const opts = {
    method: method,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
  }

  if (body) {
    opts.body = JSON.stringify(body)
  }

  return opts
}
