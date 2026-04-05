module.exports = {
  apps: [
    {
      name: "market-scanner-daily",
      script: "server.js",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: 4321,
        REFRESH_INTERVAL_MS: 10800000,
        REFRESH_TIME_ZONE: "America/New_York",
        USE_MANUAL_EDITION: "true"
      }
    }
  ]
};
