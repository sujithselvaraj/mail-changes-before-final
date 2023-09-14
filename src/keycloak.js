import Keycloak from "keycloak-js";

export const keycloak = new Keycloak(
    {
    url: 'http://localhost:8080',
    realm: 'mailapplication',
    clientId: 'login-app'
});

try {
    const authenticated = await keycloak.init({onLoad:"login-required"});
    console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
    if(keycloak.authenticated){
        console.log("test")
    }

    keycloak.onTokenExpired = () => {
        console.log(">>> Re-Authenticated");
        keycloak.updateToken(50);
     };

    
} catch (error) {
    console.error('Failed to initialize adapter:', error);
}