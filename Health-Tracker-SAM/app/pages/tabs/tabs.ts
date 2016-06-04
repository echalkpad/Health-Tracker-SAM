import {Page, Platform} from 'ionic-angular';
import {Home} from '../home/home';
import {SettingsComponent} from '../settings/settings.component';
import {TrackerComponent} from '../tracker/tracker.component';
import {Rocket} from '../rocket/rocket';
import {BlogComponent} from '../blog/blog.component';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = Home;
  tab2Root: any = SettingsComponent;
  tab3Root: any = TrackerComponent;
  tab4Root: any = BlogComponent;
}
