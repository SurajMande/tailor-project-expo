module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        [
          'module:react-native-dotenv',
          {
            moduleName: '@env', // Import as `import { API_BASE_URL } from '@env'`
            path: '.env',       // Path to .env file
            safe: false,        // Set to true if you want to enforce defined variables
            allowUndefined: true, // Allow undefined variables
          },
        ],
      ],
    };
  };