import {State} from '../../sam/sam.state';
import {TrackerActions} from './tracker.actions';
import {TrackerViews} from './tracker.views';

export class TrackerState extends State {
    constructor(public views: TrackerViews, public actions: TrackerActions) {
        super(views, actions);
    }

    ready(model) {
        return (true);
    }

    representation(model) {
        var representation = {};

        if (this.ready(model)) {
            representation = this.views.ready(model);
        }

        this.views.display(representation);
    }

    next(model) {

    }

    redner(model) {
        //super.render(model);
        this.representation(model);
        this.next(model);
    }

    // Next action predicate, derives whether
    // the system is in a (control) state where
    // a new (next) action needs to be invoked

    nextAction (model) { };

}