import {Actions} from '../../sam/sam.actions';
import {TrackerModel, ITrackerItem} from './tracker.model';

export class TrackerActions extends Actions {

    constructor(public model: TrackerModel) {
        super(model);
    }

    public init() {
        this.model.present(<ITrackerItem>{});
    }

    edit = function (data: ITrackerItem){
        data.lastEdited = <ITrackerItem>data;
        this.present(data);
        return false;
    };

    save = function (data: ITrackerItem) {
        console.log('saving ' + JSON.stringify(data));
        data.item = <ITrackerItem>data;
        data.newItem = true;
        this.present(data);
        return false;
    };

    delete = function (data: ITrackerItem) {
        console.log("tracker delete " + JSON.stringify(data));
        data = <ITrackerItem>{ deletedItemKey: data.date };
        this.present(data);
        return false;
    };

    cancel = function (data: ITrackerItem) {
        this.present(data);
        return false;
    };
}