import {Actions} from '../../sam/sam.actions';
import {BlogModel, IBlogPost} from './blog.model';

export class BlogActions extends Actions {

    constructor(public model: BlogModel) {
        super(model);
    }

    public init() {
        this.model.present(<IBlogPost>{});
    }

    edit = function (data: IBlogPost){
        data.lastEdited = <IBlogPost>{ title: data.title, description: data.description, id: data.id, key: data.key };
        this.present(data);
        return false;
    };

    save = function (data: IBlogPost) {
        console.log('saving ' + JSON.stringify(data));
        data.item = <IBlogPost>{ title: data.title, description: data.description, id: data.id || null };
        this.present(data);
        return false;
    };

    delete = function (data: IBlogPost) {
        console.log("blog delete " + JSON.stringify(data));
        data = <IBlogPost>{ deletedItemKey: data.key };
        this.present(data);
        return false;
    };

    cancel = function (data: IBlogPost) {
        this.present(data);
        return false;
    };
}