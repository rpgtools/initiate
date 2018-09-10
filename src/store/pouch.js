import PouchDB from 'pouchdb';
const params = new URLSearchParams(window.location.search);
const dbName = (params.has('campaign')) ? params.get('campaign') : 'new_campaign';

const localDB = new PouchDB(dbName);
const remoteDB = new PouchDB("http://178.128.146.118:5984/initiate-dev");
localDB.sync(remoteDB, {live: true});
export const db = localDB;
