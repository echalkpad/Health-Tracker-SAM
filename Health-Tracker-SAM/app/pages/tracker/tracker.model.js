"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const sam_model_1 = require('../../sam/sam.model');
const tracker_state_1 = require('./tracker.state');
const database_service_1 = require('../../services/database.service');
let TrackerModel = class TrackerModel extends sam_model_1.Model {
    constructor(state, service) {
        // this.state and this.service will be set by sam.component via tracker.component
        super(state, service);
        this.state = state;
        this.service = service;
        this.trackerItems = [];
        this.itemId = 0;
    }
    init() {
        // load posts from database
        console.log("load tracking from firebase");
        this.trackerItems = [];
        this.service.getAll('tracker', 8)
            .subscribe((data) => {
            console.log("firebase tracking data=" + JSON.stringify(data));
            if (data) {
                // this will be an array of posts
                this.trackerItems = this.trackerItems.concat(data);
            }
            else {
            }
            this.state.render(this);
        }, error => { console.log("firebase getAll trackerItems error=" + error); }, () => { console.log('Get all trackerItems complete'); });
        // handle deletes from database
        this.service.handleDelete('tracker')
            .subscribe((data) => {
            console.log("firebase deleted tracker item data=" + JSON.stringify(data));
            // this will be a single post. 
            // find it and remove from our cache
            this.state.render(this);
        }, error => { console.log("firebase handleDelete tracker item error=" + error); });
        //handle updates from database
        this.service.handleUpdate('tracker')
            .subscribe((data) => {
            console.log("firebase updated tracker data=" + JSON.stringify(data));
            // this will be a single post. 
            // find it and update in our cache
            this.state.render(this);
        }, error => { console.log("firebase handleUpdate tracker item error=" + error); });
    }
    writeNewPost(item) {
        console.log("writeNewPost( " + JSON.stringify(item));
        // A post entry.
        var postData = item;
        this.service.push('tracker', postData);
    }
    removePost(key) {
        console.log("removePost(" + key);
        this.service.remove('tracker', key);
    }
    present(data) {
        console.log("present : " + data.date + " to service=" + this.service);
        data = data || {};
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
            }
            else {
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
            }
            else {
                // new item
                if (data.item.date) {
                    //console.log("trackers before push=" + JSON.stringify(this.trackerItems));
                    //this.posts.push(data.item); // add to local store
                    this.writeNewPost(data.item);
                }
            }
        }
        this.state.render(this);
    }
};
TrackerModel = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [tracker_state_1.TrackerState, database_service_1.DatabaseService])
], TrackerModel);
exports.TrackerModel = TrackerModel;
//# sourceMappingURL=tracker.model.js.map