import {Injectable} from '@angular/core';
import {Model} from '../../sam/sam.model';
import {TrackerState} from './tracker.state';
import {DatabaseService} from '../../services/database.service';
import {Observable} from 'rxjs/Observable';

export interface ITrackerItem {
        //key: string;
        date: string;
        exercise: string;
        weight: number;
        hba1c: number;
        notes: string;
        glucoseAM1: number;
        glucoseAM2: number;
        glucosePM1: number;
        glucosePM2: number;
        newItem: boolean;
        lastEdited: ITrackerItem;
        deletedItemKey: string;
        item: ITrackerItem;  // new or edited item
}

@Injectable()
export class TrackerModel extends Model {
    public itemId: number;
    public trackerItems: ITrackerItem[] = [];
    public lastDeleted: ITrackerItem;
    public lastEdited: ITrackerItem;

    constructor(public state: TrackerState, public service: DatabaseService) {
        // this.state and this.service will be set by sam.component via tracker.component
        super(state, service);
        this.itemId = 0;
    }

    public init() {
        // load posts from database
        console.log("load tracking from firebase");
        this.trackerItems = [];
        this.service.getAll('tracker', 8)
            .subscribe((data: ITrackerItem) => {
                console.log("firebase tracking data=" + JSON.stringify(data));
                if (data) {
                    // this will be an array of posts
                    this.trackerItems = this.trackerItems.concat(data);
                } else {

                }
                this.state.render(this);
            },
            error => { console.log("firebase getAll trackerItems error=" + error); },
            () => { console.log('Get all trackerItems complete'); });
        // handle deletes from database
        this.service.handleDelete('tracker')
            .subscribe((data: ITrackerItem) => {
                console.log("firebase deleted tracker item data=" + JSON.stringify(data));
                // this will be a single post. 
                // find it and remove from our cache

                this.state.render(this);
            },
            error => { console.log("firebase handleDelete tracker item error=" + error); });
        //handle updates from database
        this.service.handleUpdate('tracker')
            .subscribe((data: ITrackerItem) => {
                console.log("firebase updated tracker data=" + JSON.stringify(data));
                // this will be a single post. 
                // find it and update in our cache

                this.state.render(this);
            },
            error => { console.log("firebase handleUpdate tracker item error=" + error); });
    }

    writeNewPost(item) {
        console.log("writeNewPost( " + JSON.stringify(item));
        // A post entry.
        var postData: ITrackerItem = <ITrackerItem>item;

        this.service.push('tracker', postData);
    }

    removePost(key) {
        console.log("removePost(" + key);
        this.service.remove('tracker', key);
    }

    public present(data: ITrackerItem) {
        console.log("present : " + data.date + " to service=" + this.service);
        data = data || <ITrackerItem>{};
    
        if (data.deletedItemKey !== undefined) {
            var d = -1;
            this.trackerItems.forEach(function (el, index) {
                if (el.date !== undefined) {
                    if (el.date == data.deletedItemKey) {
                        d = index;
                    }
                }
            });
            if (d >= 0) {
                this.lastDeleted = this.trackerItems.splice(d, 1)[0];
                this.removePost(this.lastDeleted.date);
            } else {
                console.log("deleted item not found " + data.deletedItemKey);
            }
        }

        if (data.item !== undefined) {
            if (!data.newItem) {
                // has been edited
                this.trackerItems.forEach(function (el, index) {
                    if (el.date !== undefined) {
                        if (el.date == data.item.date) {
                            this.trackerItems[index] = data.item;
                        }
                        // update changed item in database
                        ;
                    }
                });

            } else {
                // new item
                if (data.item.date ) {
                    //console.log("trackers before push=" + JSON.stringify(this.trackerItems));
                    //this.posts.push(data.item); // add to local store
                    this.writeNewPost(data.item);
                }
            }
        }
        this.state.render(this);
    }
}