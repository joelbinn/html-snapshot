import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  AppComponent,
  MyComponent
} from './app.component';
import { HtmlExtractionService } from "./html-extraction.service";
import { MyStoreService } from "./my-store.service";

@NgModule({
  declarations: [
    AppComponent,
    MyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [MyStoreService, HtmlExtractionService],
  bootstrap: [AppComponent],
  entryComponents: [MyComponent]
})
export class AppModule {
}
