import { Component, OnInit } from '@angular/core';

import { UserService } from './../../shared/core/user.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-pre-verification',
  templateUrl: './pre-verification.component.html',
  styleUrls: ['./pre-verification.component.css']
})
export class PreVerificationComponent implements OnInit {
  userAttributes: any;

  userData: any = {
    FirstName: new Attribute('', '', ''),
    Surname: new Attribute('', '', ''),
    MiddleName: new Attribute('', '', '')
  };


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().then((data) => {
      this.userData = JSON.parse(data['_body']);
      this.fillData();
    })
    .catch(err => console.log(err));
  }

  fillData() {
    this.userAttributes = this.userData.attrs;
    console.log(this.userAttributes);

    this.userData.FirstName = _.find(this.userData.attrs, { 'code': AttributeTypes.FirstName });
    this.userData.MiddleName = _.find(this.userData.attrs, { 'code': AttributeTypes.MiddleName });
    // tslint:disable-next-line:max-line-length
    this.userData.Surname = _.find(this.userData.attrs, { 'code': AttributeTypes.Surname }) ? undefined : { code: AttributeTypes.Surname, value: '', validation: null};
  }
}

enum AttributeTypes {
  Email = '1050',
  FirstName = '1001',
  Surname = '1002',
  MiddleName = '1003',
  Gender = '1060',
  BirthDate = '1010',
  CountryCode = '1021',
  Zip = '1031',
  State = '1032',
  City = '1033',
  Street = '1034',
  House = '1035',
  Flat = '1036',
  PassportType = '1041',
  PassportNumber = '1042',
  PassportIssueDate = '1043',
  PassportExpirationDate = '1044',
  PassportPhoto = '1070',
  AddressPhoto = '1071',
  UserPhoto = '1072'
}

export class Attribute {
  constructor(private Code: string, private Value: string, private Validation: string) {}
}
