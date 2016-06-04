import {Actions} from '../../sam/sam.actions';
import {SettingsModel} from './settings.model';

export class SettingsActions extends Actions {
    constructor(public model: SettingsModel) {
        super(model);
    }

    public init() {
        //this.model.present({});
    }

    save = function (data) {
        console.log('saving ' + JSON.stringify(data));
        this.present(data);
        return false;
    };
}