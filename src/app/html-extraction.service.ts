import { HttpClient } from "@angular/common/http";
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
  Type
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HtmlExtractionService {

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
              private readonly appRef: ApplicationRef,
              private readonly injector: Injector,
              private readonly http: HttpClient) {
  }

  extractHtml<T>(component: Type<T>, componentProperties?: any) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    const ref = factory.create(this.injector);
    for (let prop in componentProperties) {
      ref.instance[prop] = componentProperties[prop];
    }
    this.appRef.attachView(ref.hostView);
    this.appRef.tick();

    const result = ref.location.nativeElement.outerHTML;

    this.appRef.detachView(ref.hostView);

    return result;
  }
}
