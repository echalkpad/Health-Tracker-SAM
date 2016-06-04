import {State} from '../../sam/sam.state';  // SAM model
import {SettingsActions} from './settings.actions';
import {SettingsViews} from './settings.views';

export class SettingsState extends State {
    constructor(public views: SettingsViews, public actions: SettingsActions) {
        super(views, actions);
    }

    ready(model) {
        return (true);
    }

    // Next action predicate, derives whether
    // the system is in a (control) state where
    // a new (next) action needs to be invoked

    nextAction(model) { };

    calendar = function (model) {
        return model.settings.calendar;
    }

    sheet = function (model) {
        return model.settings.sheet;
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
}