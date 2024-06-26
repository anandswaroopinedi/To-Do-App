import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  Router,
  NavigationEnd,
  Event as NavigationEvent,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { routePaths } from '../../../shared/route-paths/route-paths';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() flag: EventEmitter<null> = new EventEmitter<null>();
  pageName: string = '';
  routerSubscription!: Subscription;
  constructor(private router: Router, private toaster: ToastrService) {}
  ngOnInit() {
    this.setPageName();
  }
  setPageName() {
    let name = this.router.url.split('/').pop();
    if (name) this.pageName = name[0].toUpperCase() + name.slice(1);
    this.routerSubscription = this.router.events.subscribe(
      (event: NavigationEvent) => {
        if (event instanceof NavigationEnd) {
          let name = event.urlAfterRedirects.split('/').pop();
          if (name) 
            this.pageName = name[0].toUpperCase() + name.slice(1);
        }
      }
    );
  }
  onSignOut() {
    sessionStorage.removeItem('Token');
    this.toaster.success('Signed out successfully');
    this.router.navigate(routePaths.index);
    debugger;
  }
  sendAddTaskRequest() {
    this.flag.emit();
  }
  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
