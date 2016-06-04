import {Actions} from './sam.actions';
import {Model} from './sam.model';
import {State} from './sam.state';
import {Views} from './sam.views';
import {Service} from './sam.service';
import {Auth} from './sam.auth';

export class Sam<A extends Actions, M extends Model, S extends State, V extends Views, X extends Service, U extends Auth>{
    public actions: A;
    public model: M;
    public state: S;
    public views: V;
    public service: X;
    public auth: U;

    constructor(_actions, _model, _state, _views, _service, _auth) {
        this.actions = new _actions(this.model);
        this.model = new _model(this.state);
        this.state = new _state(this.views, this.actions);
        this.views = new _views();
        this.service = new _service();
        this.auth = new _auth;

        // injection dependencies SAM
        this.actions.model = this.model;
        this.model.state = this.state;
        this.state.views = this.views;
        this.state.actions = this.actions;
        this.model.service = this.service;
        this.service.auth = this.auth;
    }
}