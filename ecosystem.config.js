module.exports = {
  apps : [{
    name: "wealpy-api",
    script: 'app.js',
    watch: ".",
    instances  : 0,
    exec_mode  : "cluster",
    ignore_watch: ['node_modules'],
    "env_testing": {
      "NODE_ENV": "test"
    },
    "env_production" : {
      "NODE_ENV": "production"
    }
  }]
};
