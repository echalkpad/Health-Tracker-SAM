// auth.service.ts
import {Observable} from 'rxjs/Observable';
import {FirebaseAuth} from 'angularfire2';
import {Auth} from '../sam/sam.auth';


export class AuthService extends Auth {

    constructor(public auth: FirebaseAuth) {
        super(auth);
    }

};