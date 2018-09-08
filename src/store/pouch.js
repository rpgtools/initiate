import PouchDB from 'pouchdb';
const params = new URLSearchParams(window.location.search);
const dbName = (params.has('campaign')) ? params.get('campaign') : 'new_campaign';
export const db = new PouchDB(dbName);
