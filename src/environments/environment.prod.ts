export const environment = {
  production: true,
  TRANSLATE_SERVICE_BASE_PATH: 'http://' + location.hostname + ':8080',
  dataSource5m: 'http://' + location.hostname + ':8081',
  tradeHistoryUrl: 'http://' + location.hostname + ':8081',
  KEYCLOAK_URL: 'http://' + location.hostname + ':9090',
  KEYCLOAK_REALM: 'enigma',
  KEYCLOAK_CLIENT_ID: 'enigma-client'
};
