import { HttpClient } from "@angular/common/http";
import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  Input
} from '@angular/core';
import { HtmlExtractionService } from "./html-extraction.service";
import { MyStoreService } from "./my-store.service";

@Component({
  selector: 'my-cmp',
  template: `
    <h1>here is the {{title}}</h1>
    <table>
      <thead>
      <tr>
        <th><em>Namn</em></th>
        <th>Längd</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let d of data">
        <td><span>{{ d }}</span></td>
        <td>{{ !!d && d.length || 0 }}</td>
      </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./app.component.css']
})
export class MyComponent {
  @Input() title: string;

  constructor(private readonly myService: MyStoreService) {

  }

  get data(): Array<String> {
    return this.myService.data;
  }

}

@Component({
  selector: 'app-root',
  template: `
    <input #inp>
    <button (click)="create(inp.value)">Create</button>
    <hr>
    <a *ngIf="!!href" [href]="href" target="_blank" >Link to PDF document for {{title}}</a>
  `,
})
export class AppComponent {
  title: string;
  href: string;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
              private readonly appRef: ApplicationRef,
              private readonly injector: Injector,
              private readonly http: HttpClient,
              private readonly htmlService: HtmlExtractionService) {
  }

  create(title: string) {
    this.title = title;
    const html = this.htmlService.extractHtml(MyComponent, {title: 'offline view for '+title});
    this.http.post(`/convert-html-to-pdf`, html, {observe: 'response',  responseType: 'text'})
      .subscribe(r => {
        console.log(`filename: ${r.body}`);
        this.href = `/pdf-document/${r.body}`;
      });
  }
}
