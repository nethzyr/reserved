import {Component, OnInit} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import {Account, LoginModalService, Principal} from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    searchInput: string;
    currentSearch: string;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService
    ) {
    }

    ngOnInit() {
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    search() {
        this.currentSearch = this.searchInput;
    }

    clear() {
        this.currentSearch = '';
        this.searchInput = '';
    }
}
