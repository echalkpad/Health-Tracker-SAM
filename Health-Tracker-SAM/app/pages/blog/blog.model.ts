import {Injectable} from '@angular/core';
import {Model} from '../../sam/sam.model';
import {BlogState} from './blog.state';
import {DatabaseService} from '../../services/database.service';
import {Observable} from 'rxjs/Observable';

export interface IBlogPost {
        id: number;
        key: string;
        name: string;
        title: string;
        description: string;
        deletedItemKey: string;
        lastEdited: IBlogPost;
        item: IBlogPost;  // new or edited item
}
export interface IBlogItem {
    key: IBlogPost
}

@Injectable()
export class BlogModel extends Model {
    public itemId: number;
    public posts: IBlogPost[] = [];
    lastDeleted: IBlogPost;
    lastEdited: IBlogPost;

    constructor(public state: BlogState, public service: DatabaseService) {
        // this.state and this.service will be set by sam.component via blog.component
        super(state, service);
        this.itemId = 0;
    }

    public init() {
        // load posts from database
        console.log("load posts from firebase");
        this.posts = [];
        this.service.getAll('posts')
            .subscribe((data: IBlogPost) => {
                console.log("firebase post data=" + JSON.stringify(data));
                if (data) {
                    // this will be an array of posts
                    this.posts = this.posts.concat(data);
                } else {

                }
                this.state.render(this);
            },
            error => { console.log("firebase getAll posts error=" + error); },
            () => { console.log('Get all posts complete'); });
        // handle deletes from database
        this.service.handleDelete('posts')
            .subscribe((data: IBlogPost) => {
                console.log("firebase deleted post data=" + JSON.stringify(data));
                // this will be a single post. 
                // find it and remove from our cache

                this.state.render(this);
            },
            error => { console.log("firebase handleDelete posts error=" + error); });
        //handle updates from database
        this.service.handleUpdate('posts')
            .subscribe((data: IBlogPost) => {
                console.log("firebase updated post data=" + JSON.stringify(data));
                // this will be a single post. 
                // find it and update in our cache

                this.state.render(this);
            },
            error => { console.log("firebase handleUpdate posts error=" + error); });
    }

    writeNewPost(username, title, body) {
        console.log("writeNewPost( " + username + "," + title);
        // A post entry.
        var postData: IBlogPost = <IBlogPost>{
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

    public present(data: IBlogPost) {
        console.log("present : " + JSON.stringify(data) + " to service=" + this.service);
        data = data || <IBlogPost>{};

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
            } else {
                console.log("deleted item not found " + data.deletedItemKey);
            }
        }

        if (data.lastEdited !== undefined) {
            this.lastEdited = data.lastEdited;
        } else {
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

            } else {
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
}