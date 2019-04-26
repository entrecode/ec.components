import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TabComponent } from '../tab/tab.component';

/** The TabsComponent holds serveral instances of TabComponent.
 * <example-url>https://components.entrecode.de/ui/tabs?e=1</example-url>
*/
@Component({
  selector: 'ec-tabs',
  templateUrl: './tabs.component.html',
})
export class TabsComponent implements AfterContentInit {
  /** The nested Tabs */
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  /** You can set the initially selected tab by passing a TabComponent in (e.g. via #variable) */
  @Input() selected: TabComponent;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.selectByUrl(event.url);
      }
    });
  }

  /** Selects the tab associated with the route present in the given url */
  selectByUrl(url: string) {
    if (!url || !this.tabs) {
      return;
    }
    const paths = new URL(url, window.location.origin).pathname.split('/');
    const match = this.tabs.find((tab) => paths[paths.length - 1].indexOf(tab.route) !== -1);
    if (match) {
      this.select(match, true);
    }
  }

  initTabs() {
    this.tabs.forEach((tab) => {
      tab.parent = this;
      if (tab.el.nativeElement.getAttribute('selected') !== null) {
        this.select(tab);
      }
    });
    this.selectByUrl(this.router.url);
  }

  ngAfterContentInit() {
    this.initTabs();
  }

  /** Selects the given tab (Component). */
  select(tab: TabComponent, skipRoute = false) {
    if (this.selected) {
      this.selected.deactivate();
    }
    this.selected = tab;
    tab.activate();
    if (tab.route && !skipRoute) {
      this.router.navigate(['../' + tab.route], { relativeTo: this.route });
    }
  }

}
