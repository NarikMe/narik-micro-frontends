import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  RendererFactory2,
  SimpleChanges,
  Type,
  ViewContainerRef,
} from '@angular/core';
import {
  isString,
  MicroFrontendsService,
} from '@narik/micro-frontends-infrastructure';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'extension-host',
  templateUrl: 'extension-host.component.html',
})
export class ExtensionHostComponent implements OnChanges, OnDestroy {
  @Input() key?: string;
  @Input() app?: string;

  private change: Subject<string> = new Subject<string>();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private microFrontendsService: MicroFrontendsService,
    private rendererFactory: RendererFactory2,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private element: ElementRef<any>
  ) {
    this.change
      .pipe(debounceTime(100), distinctUntilChanged())
      .subscribe(() => {
        this.applyChanges();
      });
  }

  clear() {
    while (this.element.nativeElement.firstChild) {
      this.element.nativeElement.firstChild.remove();
    }
    this.viewContainerRef.clear();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.next(
      `${
        (changes?.hasOwnProperty('key')
          ? changes.key.currentValue
          : this.key) ?? ''
      }_${
        (changes?.hasOwnProperty('app')
          ? changes.app.currentValue
          : this.app) ?? ''
      }`
    );
  }

  private applyChanges() {
    this.clear();
    if (this.key) {
      this.microFrontendsService.getApps(this.key).then((apps: any[]) => {
        for (const app of apps) {
          this.renderApp(app);
        }
      });
    } else if (this.app) {
      this.microFrontendsService.getApp(this.app).then((app) => {
        this.renderApp(app);
      });
    }
  }

  private renderApp(app: any) {
    if (isString(app)) {
      const renderer = this.rendererFactory.createRenderer(null, null);
      const element = renderer.createElement(app);
      renderer.appendChild(this.element.nativeElement, element);
    } else if (app instanceof HTMLElement) {
      const renderer = this.rendererFactory.createRenderer(null, null);
      renderer.appendChild(this.element.nativeElement, app);
    } else if (app instanceof ComponentFactory) {
      this.viewContainerRef.createComponent(app, undefined, this.injector);
    } else {
      const factory =
        this.componentFactoryResolver.resolveComponentFactory(app);
      this.viewContainerRef.createComponent(factory, undefined, this.injector);
    }
  }

  ngOnDestroy(): void {
    this.clear();
  }
}
