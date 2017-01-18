import { Headers } from '@angular/http';
export const hostUrl = "http://localhost:8000";
export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');