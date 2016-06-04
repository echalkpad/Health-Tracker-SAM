// database.service.ts
import {Observable} from 'rxjs/Observable';
import {FirebaseRef} from 'angularfire2';
import { FIREBASE_ROOT } from '../config';
import {Service} from '../sam/sam.service';
import {AuthService} from '../services/auth.service';


export class DatabaseService extends Service {
    error: any
    ref: Firebase;

    constructor(public auth: AuthService) {
        super(auth);
        this.ref = new Firebase(FIREBASE_ROOT);
    }

    getUid() {
        return this.auth.getUid();
    }

    getUsername() {
        return this.auth.getUsername();
    }

    // handle deletions from database
    handleDelete(path: string): Observable<any> {
        let uid = this.auth.getUid();
        console.log("handleDelete " + FIREBASE_ROOT + '/' + path + '/' + uid);
        let ref: Firebase = new Firebase(FIREBASE_ROOT + '/' + path + '/' + uid);
        return Observable.create(observer => {
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
    handleUpdate(path: string): Observable<any> {
        let uid = this.auth.getUid();
        console.log("handleUpdate " + FIREBASE_ROOT + '/' + path + '/' + uid);
        let ref: Firebase = new Firebase(FIREBASE_ROOT + '/' + path + '/' + uid);
        return Observable.create(observer => {
            let listener = ref.on('child_changed', snapshot => {
                //console.log('handleUpdate: snapshot=' + snapshot);  // 1 updated child
                console.log(path + " handleUpdate:" + JSON.stringify(snapshot.val()) + ":" + snapshot.key());
                let item = snapshot.val();
                item.key = snapshot.key();
                observer.next(item);
            }, (error) => { console.log("firebase " + path + " handleUpdate=" + error); });
        });
    }

    create(path: string, item: any): void {
        let uid = this.auth.getUid();
        let ref: Firebase = new Firebase(FIREBASE_ROOT + '/' + path + '/' + uid);
        console.log("set " + path + "=" + JSON.stringify(item));
        ref.set(item).then((_data) => {
                console.log(_data);
            }).catch((_error) => {
                console.log(_error);
            });
    }

    push(path: string, item: any): void {
        let uid = this.auth.getUid();
        let ref: Firebase = new Firebase(FIREBASE_ROOT + '/' + path + '/' + uid);
        console.log("push " + path + "=" + JSON.stringify(item));
        ref.push(item).then((_data) => {
            console.log(_data);
        }).catch((_error) => {
            console.log(_error);
        });
    }

    remove(path: string, key: string): void {
        let uid = this.auth.getUid();
        let ref: Firebase = new Firebase(FIREBASE_ROOT + '/' + path + '/' + uid + '/' + key);
        ref.remove()
            .then((_data) => {
                console.log("removed " + _data);
            }).catch((_error) => {
                console.log("remove " + _error);
            });
    }

    getValue(path: string): Observable<any> {
        let uid = this.auth.getUid();
        console.log("getValue for " + FIREBASE_ROOT + '/' + path + '/' + uid);
        let ref: Firebase = new Firebase(FIREBASE_ROOT + '/' + path + '/' + uid);
        return Observable.create(observer => {
            let listener = ref.on('value', snapshot => {  // read data 1 time
                // val() == null indicates no data found
                console.log(path + " getValue:" + JSON.stringify(snapshot.val()));
                let item = snapshot.val();
                if (item) {
                    item.key = snapshot.key();
                    observer.next(item);
                } else {
                    console.log("getValue " + path + ": EOF");
                    observer.next(item);
                }
            }, (error) => { console.log("firebase " + path + " getValue error=" + error); });
        });
    }

    getAll(path: string, limit?: number): Observable<any> {
        if (typeof limit === "undefined") { limit = 10; }
        let uid = this.auth.getUid();
        //console.log("db getAll path=" + path + " uid=" + uid);
        console.log("getAll for " + FIREBASE_ROOT + '/' + path + '/' + uid + " limit=" + limit);
        let ref: Firebase = new Firebase(FIREBASE_ROOT + '/' + path + '/' + uid);
        return Observable.create(observer => {
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
};