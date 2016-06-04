import {State} from './sam.state';
import {Service} from './sam.service';

export class Model {
    constructor(public state: State, public service: Service) {
    }

    public present(data) {
        this.render(this);
    }

    public render(model) {
        this.state.render(model);
    }
}