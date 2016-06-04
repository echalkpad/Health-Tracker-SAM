"use strict";
const sam_actions_1 = require('../../sam/sam.actions');
class BlogActions extends sam_actions_1.Actions {
    constructor(model) {
        super(model);
        this.model = model;
        this.edit = function (data) {
            data.lastEdited = { title: data.title, description: data.description, id: data.id, key: data.key };
            this.present(data);
            return false;
        };
        this.save = function (data) {
            console.log('saving ' + JSON.stringify(data));
            data.item = { title: data.title, description: data.description, id: data.id || null };
            this.present(data);
            return false;
        };
        this.delete = function (data) {
            console.log("blog delete " + JSON.stringify(data));
            data = { deletedItemKey: data.key };
            this.present(data);
            return false;
        };
        this.cancel = function (data) {
            this.present(data);
            return false;
        };
    }
    init() {
        this.model.present({});
    }
}
exports.BlogActions = BlogActions;
//# sourceMappingURL=blog.actions.js.map