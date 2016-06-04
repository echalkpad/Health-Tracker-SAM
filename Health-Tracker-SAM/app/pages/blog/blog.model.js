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
const blog_state_1 = require('./blog.state');
const database_service_1 = require('../../services/database.service');
let BlogModel = class BlogModel extends sam_model_1.Model {
    constructor(state, service) {
        // this.state and this.service will be set by sam.component via blog.component
        super(state, service);
        this.state = state;
        this.service = service;
        this.posts = [];
        this.itemId = 0;
    }
    init() {
        // load posts from database
        console.log("load posts from firebase");
        this.posts = [];
        this.service.getAll('posts')
            .subscribe((data) => {
            console.log("firebase post data=" + JSON.stringify(data));
            if (data) {
                // this will be an array of posts
                this.posts = this.posts.concat(data);
            }
            else {
            }
            this.state.render(this);
        }, error => { console.log("firebase getAll posts error=" + error); }, () => { console.log('Get all posts complete'); });
        // handle deletes from database
        this.service.handleDelete('posts')
            .subscribe((data) => {
            console.log("firebase deleted post data=" + JSON.stringify(data));
            // this will be a single post. 
            // find it and remove from our cache
            this.state.render(this);
        }, error => { console.log("firebase handleDelete posts error=" + error); });
        //handle updates from database
        this.service.handleUpdate('posts')
            .subscribe((data) => {
            console.log("firebase updated post data=" + JSON.stringify(data));
            // this will be a single post. 
            // find it and update in our cache
            this.state.render(this);
        }, error => { console.log("firebase handleUpdate posts error=" + error); });
    }
    writeNewPost(username, title, body) {
        console.log("writeNewPost( " + username + "," + title);
        // A post entry.
        var postData = {
            name: username,
            description: body,
            title: title
        };
        this.service.push('posts', postData);
    }
    removePost(uid, key) {
        console.log("removePost(" + uid + ", " + key);
        this.service.remove('posts', key);
    }
    present(data) {
        console.log("present : " + JSON.stringify(data) + " to service=" + this.service);
        data = data || {};
        if (data.deletedItemKey !== undefined) {
            var d = -1;
            this.posts.forEach(function (el, index) {
                if (el.key !== undefined) {
                    if (el.key == data.deletedItemKey) {
                        d = index;
                    }
                }
            });
            if (d >= 0) {
                this.lastDeleted = this.posts.splice(d, 1)[0];
                this.removePost(this.lastDeleted.name, this.lastDeleted.key);
            }
            else {
                console.log("deleted item not found " + data.deletedItemKey);
            }
        }
        if (data.lastEdited !== undefined) {
            this.lastEdited = data.lastEdited;
        }
        else {
            delete this.lastEdited;
        }
        if (data.item !== undefined) {
            if (data.item.key !== undefined) {
                // has been edited
                this.posts.forEach(function (el, index) {
                    if (el.key !== undefined) {
                        if (el.key == data.item.key) {
                            this.posts[index] = data.item;
                        }
                    }
                });
            }
            else {
                // new item
                if (data.item.title && data.item.description) {
                    data.item.id = this.itemId++;
                    console.log("posts before push=" + JSON.stringify(this.posts));
                    //this.posts.push(data.item); // add to local store
                    this.writeNewPost('Jim Myers', data.item.title, data.item.description);
                }
            }
        }
        this.state.render(this);
    }
};
BlogModel = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [blog_state_1.BlogState, database_service_1.DatabaseService])
], BlogModel);
exports.BlogModel = BlogModel;
//# sourceMappingURL=blog.model.js.map