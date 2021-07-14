import firebase from 'firebase-admin';

const authJson = (function() {
    // if on heroku, do generate json from env vars
    if (process.env.NODE_ENV === 'production') {
        return {
            "type": process.env.BACKNED_FIREBASE_TYPE,
            "project_id": process.env.BACKNED_FIREBASE_PROJECT_ID,
            "private_key_id": process.env.BACKNED_FIREBASE_PRIVATE_KEY_ID,
            "private_key": process.env.BACKNED_FIREBASE_PRIVATE_KEY,
            "client_email": process.env.BACKEND_FIREBASE_CLIENT_EMAIL,
            "client_id": process.env.BACKEND_FIREBASE_CLIENT_ID,
            "auth_uri": process.env.BACKEND_FIREBASE_AUTH_URI,
            "token_uri": process.env.BACKEND_FIREBASE_TOKEN_URI,
            "auth_provider_x509_cert_url": process.env.BACKEND_FIREBASE_AUTH_PROVIDER_X509,
            "client_x509_cert_url": process.env.BACKEND_FIREBASE_CLIENT_X509
        }
    }
    return require('./serviceAccountKey.json');
})();

const admin = firebase.initalizeApp(authJson);

export default admin;
export const auth = app.auth();
export const db = app.firestore();