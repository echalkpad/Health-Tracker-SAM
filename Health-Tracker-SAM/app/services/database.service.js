"use strict";
// database.service.ts
const Observable_1 = require('rxjs/Observable');
const config_1 = require('../config');
const sam_service_1 = require('../sam/sam.service');
class DatabaseService extends sam_service_1.Service {
    constructor(auth) {
        super(auth);
        this.auth = auth;
        this.ref = new Firebase(config_1.FIREBASE_ROOT);
    }
    getUid() {
        return this.auth.getUid();
    }
    getUsername() {
        return this.auth.getUsername();
    }
    // handle deletions from database
    handleDelete(path) {
        let uid = this.auth.getUid();
        console.log("handleDelete " + config_1.FIREBASE_ROOT + '/' + path + '/' + uid);
        let ref = new Firebase(config_1.FIREBASE_ROOT + '/' + path + '/' + uid);
        return Observable_1.Observable.create(observer => {
            let listener = ref.on('child_removed', snapshot => {
                //console.log('handleDelete: snapshot=' + snapshot);  // 1 deleted child
                console.log(path + " handleDelete:" + JSON.stringify(snapshot.val()) + ":" + snapshot.key());
                let item = snapshot.val();
                item.key = snapshot.key();
                observer.next(item);
            }, (error) => { console.log("firebase " + path + " handleDelete=" + error); });
        });
    }
    // handle updates from database
    handleUpdate(path) {
        let uid = this.auth.getUid();
        console.log("handleUpdate " + config_1.FIREBASE_ROOT + '/' + path + '/' + uid);
        let ref = new Firebase(config_1.FIREBASE_ROOT + '/' + path + '/' + uid);
        return Observable_1.Observable.create(observer => {
            let listener = ref.on('child_changed', snapshot => {
                //console.log('handleUpdate: snapshot=' + snapshot);  // 1 updated child
                console.log(path + " handleUpdate:" + JSON.stringify(snapshot.val()) + ":" + snapshot.key());
                let item = snapshot.val();
                item.key = snapshot.key();
                observer.next(item);
            }, (error) => { console.log("firebase " + path + " handleUpdate=" + error); });
        });
    }
    create(path, item) {
        let uid = this.auth.getUid();
        let ref = new Firebase(config_1.FIREBASE_ROOT + '/' + path + '/' + uid);
        console.log("set " + path + "=" + JSON.stringify(item));
        ref.set(item).then((_data) => {
            console.log(_data);
        }).catch((_error) => {
            console.log(_error);
        });
    }
    push(path, item) {
        let uid = this.auth.getUid();
        let ref = new Firebase(config_1.FIREBASE_ROOT + '/' + path + '/' + uid);
        console.log("push " + path + "=" + JSON.stringify(item));
        ref.push(item).then((_data) => {
            console.log(_data);
        }).catch((_error) => {
            console.log(_error);
        });
    }
    remove(path, key) {
        let uid = this.auth.getUid();
        let ref = new Firebase(config_1.FIREBASE_ROOT + '/' + path + '/' + uid + '/' + key);
        ref.remove()
            .then((_data) => {
            console.log("removed " + _data);
        }).catch((_error) => {
            console.log("remove " + _error);
        });
    }
    getValue(path) {
        let uid = this.auth.getUid();
        console.log("getValue for " + config_1.FIREBASE_ROOT + '/' + path + '/' + uid);
        let ref = new Firebase(config_1.FIREBASE_ROOT + '/' + path + '/' + uid);
        return Observable_1.Observable.create(observer => {
            let listener = ref.on('value', snapshot => {
                // val() == null indicates no data found
                console.log(path + " getValue:" + JSON.stringify(snapshot.val()));
                let item = snapshot.val();
                if (item) {
                    item.key = snapshot.key();
                    observer.next(item);
                }
                else {
                    console.log("getValue " + path + ": EOF");
                    observer.next(item);
                }
            }, (error) => { console.log("firebase " + path + " getValue error=" + error); });
        });
    }
    getAll(path, limit) {
        if (typeof limit === "undefined") {
            limit = 10;
        }
        let uid = this.auth.getUid();
        //console.log("db getAll path=" + path + " uid=" + uid);
        console.log("getAll for " + config_1.FIREBASE_ROOT + '/' + path + '/' + uid + " limit=" + limit);
        let ref = new Firebase(config_1.FIREBASE_ROOT + '/' + path + '/' + uid);
        return Observable_1.Observable.create(observer => {
            let listener = ref.limitToLast(limit).on('child_added', snapshot => {
                console.log(path + " getAll:" + JSON.stringify(snapshot.val()) + ":" + snapshot.key());
                let item = snapshot.val();
                if (item) {
                    item.key = snapshot.key();
                    observer.next(item);
                }
            }, (error) => { console.log("firebase " + path + " getAll error=" + error); });
            //return () => {
            //    ref.off('child_added', listener);
            //};
        });
    }
}
exports.DatabaseService = DatabaseService;
;
//# sourceMappingURL=database.service.js.map