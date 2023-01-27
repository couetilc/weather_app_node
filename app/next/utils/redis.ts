import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL,
})

export async function get(...args: Parameters<typeof client.get>) {
  if (!client.isOpen) {
    await client.connect();
  }

  return client.get(...args);
}

export async function set(...args: Parameters<typeof client.set>) {
  if (!client.isOpen) {
    await client.connect();
  }

  return client.set(...args);
}
