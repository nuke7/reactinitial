import { createServer, Model } from 'miragejs';
export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,
    models: {
      hotel: Model,
    },
    seeds(server) {
      server.create('hotel', {
        name: 'Hotel Nulla sit amet',
        stars: 3,
        city: "Los Angeles",
      });
      server.create('hotel', {
        name: 'Hotel Curabitur suscipit suscipit',
        stars: 4,
        city: "Las Vegas",
      });
      server.create('hotel', {
        name: 'Hotel Donec id justo',
        stars: 5,
        city: "San Francisco",
      });
    },
    routes() {
      this.namespace = 'api/hotels';
      this.timing = 2000

      this.get('/', (schema, request) => {
        return schema.hotels.all().models;
      });
      this.post('/subscribe', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        if (attrs.email === "a@b.c" && attrs.hotel === "Hotel Curabitur suscipit suscipit") {
          return { success: false };
        }
        return  { success: true };
      });
    },
  });
  return server;
}
