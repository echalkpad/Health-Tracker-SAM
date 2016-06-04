import {Page} from 'ionic-angular';
import {BlogComponent} from './blog.component';

@Page({
    templateUrl: 'build/pages/blog/blog.html',
    directives: [BlogComponent]
})
export class Blog {
  constructor() {

  }
}
