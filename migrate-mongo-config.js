const config = {
  mongodb: {
    url: "mongodb://localhost:27017/somon",

    options: {},
  },

  migrationsDir: "migrations",

  changelogCollectionName: "changelog",

  migrationFileExtension: ".js",

  useFileHash: false,

  moduleSystem: "commonjs",
};

export default config;
