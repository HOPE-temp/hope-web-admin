export const env = {
  backend: {
    hostname:
      process.env.HOPE_BACKEND_HOSTNAME ||
      process.env.NEXT_PUBLIC_HOPE_BACKEND_HOSTNAME ||
      'http://localhost:3000',
  },
};
