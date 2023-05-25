import { Component, ElementRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavbarService } from "angular-bootstrap-md";
import { DataApiService } from "src/app/services/data-api.service";



@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

    constructor(
        private dataApiService: DataApiService,
        private elementRef: ElementRef,
        private router: Router,
        private navbarService: NavbarService
      ) { }

    ngOnInit() {
        this.findLoggedUser();
    }

    async findLoggedUser() {
        var userFound = await this.dataApiService.findUser();
        if (!userFound) {
            this.router.navigate(['login']);
            return;
        }
        if (this.dataApiService.getCookie(this.dataApiService.studentCookie)) {
            this.router.navigate(['home-alumno'])
            return;
        }

        if (this.dataApiService.getUserType() == this.dataApiService.getTutorType()) {
            this.router.navigate(['perfiles']);
            return;
        }

        if (this.dataApiService.getUserType() == this.dataApiService.getProfesorType()) {
            this.router.navigate(['home-profesor']);
            return;
        }
    }
}