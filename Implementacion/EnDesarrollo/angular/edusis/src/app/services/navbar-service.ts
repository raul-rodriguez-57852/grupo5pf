import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root",
}
    
)
export class NavbarService{
    private getSoruce = new Subject<any>();
    data = this.getSoruce.asObservable();

    triggerNavbarGet(){
        this.getSoruce.next(null);
    }
}