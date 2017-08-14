import { Component, ViewEncapsulation } from '@angular/core';
import { mocked } from '../mocks/data';
// import { Pagination } from '@ec.components/core'; //real world imports
// import { Datamanager, modelConfig } from '@ec.components/data';
import { ModelConfig } from '../packages/data';
import { FormConfig, List, Pagination } from '../packages/core';
import * as moment from 'moment';
import { demoRoutes } from './demo.routes';

@Component({
  selector: 'demo-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoComponent {

  private demos = demoRoutes;

  private mocked = mocked;
  private pagination = new Pagination({});
  currentPage: number = this.pagination.getPage();
  private formConfig: FormConfig<any>;
  private randomData: any;

  constructor(private modelConfig: ModelConfig) {
    // Datamanager.useEnvironment(environment);
    this.pagination.setTotal(5100);
    this.pagination.change$.debounceTime(500)
    .subscribe((p) => {
      this.currentPage = this.pagination.getPage();
    });

    this.randomData = new List([
      {
        "_id": "5913045637a2029d6b203b60",
        "index": 0,
        "guid": "808a140f-d53c-49e0-9b6c-74406ea86fda",
        "isActive": true,
        "balance": "$3,122.50",
        "picture": "http://placehold.it/32x32",
        "age": 22,
        "eyeColor": "green"
      },
      {
        "_id": "59130456385a181e2cd8882c",
        "index": 1,
        "guid": "4cf73bcb-5920-4da1-a39e-3e66c9ba34e5",
        "isActive": false,
        "balance": "$1,569.01",
        "picture": "http://placehold.it/32x32",
        "age": 38,
        "eyeColor": "green"
      },
      {
        "_id": "59130456aea7b4280bfbc2e3",
        "index": 2,
        "guid": "13f3bc36-875d-4f90-b055-a5ede48c8cfe",
        "isActive": false,
        "balance": "$1,279.79",
        "picture": "http://placehold.it/32x32",
        "age": 23,
        "eyeColor": "green"
      },
      {
        "_id": "591304568f43d111fe0b3b25",
        "index": 3,
        "guid": "2861de18-1a67-4484-96e8-c174c552396b",
        "isActive": false,
        "balance": "$1,460.45",
        "picture": "http://placehold.it/32x32",
        "age": 29,
        "eyeColor": "blue"
      },
      {
        "_id": "5913045630b43e85cac486a4",
        "index": 4,
        "guid": "3f214e1c-4270-4e9f-8b51-2b9735af169c",
        "isActive": false,
        "balance": "$2,498.39",
        "picture": "http://placehold.it/32x32",
        "age": 29,
        "eyeColor": "green"
      },
      {
        "_id": "591304561117ca8ac8c1a894",
        "index": 5,
        "guid": "29ad1a78-eee7-4724-9f1c-0c970f0d907d",
        "isActive": true,
        "balance": "$1,877.49",
        "picture": "http://placehold.it/32x32",
        "age": 39,
        "eyeColor": "blue"
      },
      {
        "_id": "59130456a736d5078a4e1f0f",
        "index": 6,
        "guid": "ad3e7daa-f3fa-4896-9a6d-f970242cd538",
        "isActive": false,
        "balance": "$1,640.63",
        "picture": "http://placehold.it/32x32",
        "age": 38,
        "eyeColor": "green"
      },
      {
        "_id": "59130456ecac6edaba5ada8d",
        "index": 7,
        "guid": "7b59eaa0-97f1-4a9c-8408-91585ed56f80",
        "isActive": true,
        "balance": "$1,021.39",
        "picture": "http://placehold.it/32x32",
        "age": 28,
        "eyeColor": "blue"
      },
      {
        "_id": "5913045647426d5bb317efbf",
        "index": 8,
        "guid": "493d5e78-4dad-4198-9741-15eabf7ec8a8",
        "isActive": true,
        "balance": "$1,592.38",
        "picture": "http://placehold.it/32x32",
        "age": 24,
        "eyeColor": "blue"
      },
      {
        "_id": "591304564fad3e46ed2d1e73",
        "index": 9,
        "guid": "12325fb2-c591-4f5b-9504-9417074b8cec",
        "isActive": true,
        "balance": "$1,877.61",
        "picture": "http://placehold.it/32x32",
        "age": 30,
        "eyeColor": "green"
      },
      {
        "_id": "591304565b658780b2bc0f83",
        "index": 10,
        "guid": "075954a4-9c91-4d25-a5e8-d0464341658e",
        "isActive": false,
        "balance": "$1,364.28",
        "picture": "http://placehold.it/32x32",
        "age": 34,
        "eyeColor": "green"
      },
      {
        "_id": "591304563f096da7d4e6d751",
        "index": 11,
        "guid": "073570a6-e235-4fd3-8a48-57847a7d9a21",
        "isActive": true,
        "balance": "$2,887.70",
        "picture": "http://placehold.it/32x32",
        "age": 20,
        "eyeColor": "green"
      },
      {
        "_id": "591304561aeaf20fbe3b30bb",
        "index": 12,
        "guid": "18b99651-22b2-45bf-9f75-71c3a6a2a1d4",
        "isActive": false,
        "balance": "$2,180.36",
        "picture": "http://placehold.it/32x32",
        "age": 32,
        "eyeColor": "green"
      },
      {
        "_id": "59130456074fd6227fb0b66d",
        "index": 13,
        "guid": "475ccea2-0c40-4ef6-8e08-0544b6320703",
        "isActive": false,
        "balance": "$3,083.30",
        "picture": "http://placehold.it/32x32",
        "age": 26,
        "eyeColor": "brown"
      },
      {
        "_id": "5913045695cf5fb9313dbff5",
        "index": 14,
        "guid": "9ffc302d-f533-40ee-8ef7-524585b9d0b3",
        "isActive": true,
        "balance": "$2,384.88",
        "picture": "http://placehold.it/32x32",
        "age": 28,
        "eyeColor": "blue"
      },
      {
        "_id": "59130456ad2dc84bf0fec60a",
        "index": 15,
        "guid": "4126366a-aa21-4966-bfeb-3ed47c5f9099",
        "isActive": false,
        "balance": "$3,915.65",
        "picture": "http://placehold.it/32x32",
        "age": 24,
        "eyeColor": "green"
      },
      {
        "_id": "59130456741bdc85952c13e9",
        "index": 16,
        "guid": "9440e11b-bf19-4d94-b6a0-a48bda4334e4",
        "isActive": false,
        "balance": "$1,073.04",
        "picture": "http://placehold.it/32x32",
        "age": 35,
        "eyeColor": "green"
      },
      {
        "_id": "5913045639a99fe676913814",
        "index": 17,
        "guid": "3256e4a6-6ed6-4469-8196-8dbe9a71c805",
        "isActive": false,
        "balance": "$3,817.39",
        "picture": "http://placehold.it/32x32",
        "age": 31,
        "eyeColor": "green"
      },
      {
        "_id": "59130456e0aa54d8b0a1c127",
        "index": 18,
        "guid": "52dead11-f83b-4dce-b7d4-70daafff2ad0",
        "isActive": true,
        "balance": "$3,348.02",
        "picture": "http://placehold.it/32x32",
        "age": 40,
        "eyeColor": "green"
      },
      {
        "_id": "591304569f86461e6fe92724",
        "index": 19,
        "guid": "94af430d-3707-4c63-b89d-6779f2401f9e",
        "isActive": true,
        "balance": "$2,577.89",
        "picture": "http://placehold.it/32x32",
        "age": 40,
        "eyeColor": "blue"
      },
      {
        "_id": "591304566dfeaed0337d1834",
        "index": 20,
        "guid": "c9d603e1-a6ec-45da-86d6-6dd9f57f4e92",
        "isActive": false,
        "balance": "$1,415.43",
        "picture": "http://placehold.it/32x32",
        "age": 29,
        "eyeColor": "green"
      },
      {
        "_id": "59130456d5bfba993b4ee1c4",
        "index": 21,
        "guid": "f4ded8a9-571b-4219-8f14-1ad8b3e54a22",
        "isActive": false,
        "balance": "$1,037.84",
        "picture": "http://placehold.it/32x32",
        "age": 29,
        "eyeColor": "brown"
      },
      {
        "_id": "591304564527165c6506f05a",
        "index": 22,
        "guid": "190fe40a-ca66-4f6d-b181-7c3f1bbd3776",
        "isActive": false,
        "balance": "$3,148.44",
        "picture": "http://placehold.it/32x32",
        "age": 20,
        "eyeColor": "brown"
      },
      {
        "_id": "5913045631a7cf9712dd62f4",
        "index": 23,
        "guid": "82adacd7-0d2c-4b90-9a07-da726fb689d7",
        "isActive": true,
        "balance": "$1,575.14",
        "picture": "http://placehold.it/32x32",
        "age": 26,
        "eyeColor": "green"
      },
      {
        "_id": "59130456f0dcae2e84b397e2",
        "index": 24,
        "guid": "694bd1d3-34e2-4fd2-a23e-24d6b614593a",
        "isActive": false,
        "balance": "$3,347.29",
        "picture": "http://placehold.it/32x32",
        "age": 25,
        "eyeColor": "brown"
      },
      {
        "_id": "591304561bc422bd1d3a997d",
        "index": 25,
        "guid": "46eb1c4e-e610-4d7f-9926-a3a21de81cde",
        "isActive": true,
        "balance": "$2,801.98",
        "picture": "http://placehold.it/32x32",
        "age": 38,
        "eyeColor": "blue"
      },
      {
        "_id": "59130456f070e74a9ab94d25",
        "index": 26,
        "guid": "eb902f93-079a-404c-8d42-7a963e079744",
        "isActive": true,
        "balance": "$1,544.35",
        "picture": "http://placehold.it/32x32",
        "age": 33,
        "eyeColor": "green"
      },
      {
        "_id": "59130456d2604b7f268f6e61",
        "index": 27,
        "guid": "02544bd4-9cab-4063-a0b6-410a0459fcd9",
        "isActive": true,
        "balance": "$2,347.94",
        "picture": "http://placehold.it/32x32",
        "age": 30,
        "eyeColor": "green"
      },
      {
        "_id": "5913045677bed82e2baf255a",
        "index": 28,
        "guid": "c2e004cd-3708-49cf-a6ae-41a7b0fd3c4a",
        "isActive": true,
        "balance": "$3,799.55",
        "picture": "http://placehold.it/32x32",
        "age": 25,
        "eyeColor": "brown"
      },
      {
        "_id": "59130456a846d5062ef81803",
        "index": 29,
        "guid": "b5730be9-09c4-4b9f-a574-a38dcd4e7eb7",
        "isActive": true,
        "balance": "$3,971.78",
        "picture": "http://placehold.it/32x32",
        "age": 23,
        "eyeColor": "brown"
      },
      {
        "_id": "59130456914894592e886fb4",
        "index": 30,
        "guid": "54e4c884-00db-46eb-84e6-0b578a9ac2ba",
        "isActive": true,
        "balance": "$1,177.30",
        "picture": "http://placehold.it/32x32",
        "age": 21,
        "eyeColor": "blue"
      },
      {
        "_id": "591304563cab168a8ca191ae",
        "index": 31,
        "guid": "3c79a0ea-099a-4435-a8a1-3326c91c9152",
        "isActive": false,
        "balance": "$3,662.05",
        "picture": "http://placehold.it/32x32",
        "age": 31,
        "eyeColor": "blue"
      },
      {
        "_id": "59130456457aa41579818b24",
        "index": 32,
        "guid": "e6bd8171-6ebf-4aee-81c8-140d4ce010aa",
        "isActive": false,
        "balance": "$2,814.67",
        "picture": "http://placehold.it/32x32",
        "age": 38,
        "eyeColor": "brown"
      },
      {
        "_id": "59130456ad517de0ee3cf6a4",
        "index": 33,
        "guid": "ff693c74-a8c7-4aed-817f-43dde8fbc524",
        "isActive": true,
        "balance": "$3,971.51",
        "picture": "http://placehold.it/32x32",
        "age": 31,
        "eyeColor": "brown"
      },
      {
        "_id": "59130456e10d207f5eab8894",
        "index": 34,
        "guid": "f01afb18-8520-41d4-92e5-edd4e6665bd9",
        "isActive": false,
        "balance": "$2,883.56",
        "picture": "http://placehold.it/32x32",
        "age": 38,
        "eyeColor": "brown"
      },
      {
        "_id": "59130456a88bd6b93311ae2f",
        "index": 35,
        "guid": "4dbe6ce3-db6c-4885-b4d6-691363c35bc2",
        "isActive": true,
        "balance": "$2,575.33",
        "picture": "http://placehold.it/32x32",
        "age": 27,
        "eyeColor": "green"
      },
      {
        "_id": "591304563bed9d56b5ef6615",
        "index": 36,
        "guid": "734950db-5080-4441-be41-360011351d08",
        "isActive": true,
        "balance": "$1,634.98",
        "picture": "http://placehold.it/32x32",
        "age": 36,
        "eyeColor": "green"
      },
      {
        "_id": "59130456ebbe6374a07f6667",
        "index": 37,
        "guid": "5c486ee4-9edd-4bbf-a737-64a0cc1f8172",
        "isActive": true,
        "balance": "$2,711.46",
        "picture": "http://placehold.it/32x32",
        "age": 33,
        "eyeColor": "brown"
      },
      {
        "_id": "591304564f64c86e0c081afe",
        "index": 38,
        "guid": "ee8a931e-8334-407a-a6ca-052d8b036ec2",
        "isActive": false,
        "balance": "$3,994.51",
        "picture": "http://placehold.it/32x32",
        "age": 32,
        "eyeColor": "blue"
      },
      {
        "_id": "59130456df79f8c6b45102b4",
        "index": 39,
        "guid": "670a2139-f3fc-45da-a878-e1731a0b9077",
        "isActive": true,
        "balance": "$1,650.75",
        "picture": "http://placehold.it/32x32",
        "age": 34,
        "eyeColor": "green"
      },
      {
        "_id": "5913045611170018abe635df",
        "index": 40,
        "guid": "4e8d99be-23c1-47af-9d2e-3d8a7699da50",
        "isActive": true,
        "balance": "$3,337.41",
        "picture": "http://placehold.it/32x32",
        "age": 25,
        "eyeColor": "blue"
      },
      {
        "_id": "59130456cedc8140b115d752",
        "index": 41,
        "guid": "ffd67c64-fbb1-4e6e-a6bb-7e8eddb1e8b8",
        "isActive": false,
        "balance": "$3,549.46",
        "picture": "http://placehold.it/32x32",
        "age": 33,
        "eyeColor": "blue"
      },
      {
        "_id": "591304568d207cf65d41c88e",
        "index": 42,
        "guid": "cb03d5d2-7f59-49fb-b3e3-df468aca48d4",
        "isActive": false,
        "balance": "$3,068.87",
        "picture": "http://placehold.it/32x32",
        "age": 30,
        "eyeColor": "blue"
      },
      {
        "_id": "5913045690a3d52f3411d401",
        "index": 43,
        "guid": "6d564a09-1bd1-47c8-855e-a42289ff37e9",
        "isActive": true,
        "balance": "$3,668.98",
        "picture": "http://placehold.it/32x32",
        "age": 37,
        "eyeColor": "blue"
      },
      {
        "_id": "59130456b47633bd5ce6f25f",
        "index": 44,
        "guid": "75405cc5-05cb-4924-979b-41ad2dffc9d7",
        "isActive": true,
        "balance": "$2,028.88",
        "picture": "http://placehold.it/32x32",
        "age": 21,
        "eyeColor": "blue"
      },
      {
        "_id": "59130456561cfe6e4b7c6520",
        "index": 45,
        "guid": "cbed1e16-da05-4b54-8a8a-6ecc952cb06f",
        "isActive": true,
        "balance": "$2,684.86",
        "picture": "http://placehold.it/32x32",
        "age": 31,
        "eyeColor": "green"
      },
      {
        "_id": "59130456ca5d0ee3802ba109",
        "index": 46,
        "guid": "d8436b4f-693f-4cd2-b07a-2c44269d0ef5",
        "isActive": false,
        "balance": "$2,778.66",
        "picture": "http://placehold.it/32x32",
        "age": 37,
        "eyeColor": "blue"
      },
      {
        "_id": "591304568e983600bfc0316c",
        "index": 47,
        "guid": "1993eff7-eeec-4902-bebf-dd6d4eb0312d",
        "isActive": false,
        "balance": "$1,233.33",
        "picture": "http://placehold.it/32x32",
        "age": 25,
        "eyeColor": "blue"
      },
      {
        "_id": "59130456def7623e0577a8b9",
        "index": 48,
        "guid": "114556d3-8f26-4bed-a52c-281ad37133e5",
        "isActive": false,
        "balance": "$3,943.06",
        "picture": "http://placehold.it/32x32",
        "age": 24,
        "eyeColor": "green"
      },
      {
        "_id": "591304568c418bd0acfb295c",
        "index": 49,
        "guid": "389d8670-0037-436a-b0c3-eb6c6e18c6e3",
        "isActive": true,
        "balance": "$2,956.65",
        "picture": "http://placehold.it/32x32",
        "age": 20,
        "eyeColor": "brown"
      },
      {
        "_id": "591304561fdd816bcd7e8c25",
        "index": 50,
        "guid": "d9ae64e3-60fb-4fc8-b575-d656b5e57375",
        "isActive": false,
        "balance": "$1,362.88",
        "picture": "http://placehold.it/32x32",
        "age": 25,
        "eyeColor": "green"
      },
      {
        "_id": "5913045655394a7607773c1f",
        "index": 51,
        "guid": "46034ee4-5d8c-4460-a3b4-38ab83532bd9",
        "isActive": true,
        "balance": "$3,301.95",
        "picture": "http://placehold.it/32x32",
        "age": 21,
        "eyeColor": "brown"
      },
      {
        "_id": "5913045627840cb33a15b4aa",
        "index": 52,
        "guid": "1b6b03ee-291d-414f-aba3-1c9c4d12a3c4",
        "isActive": false,
        "balance": "$3,353.98",
        "picture": "http://placehold.it/32x32",
        "age": 20,
        "eyeColor": "green"
      },
      {
        "_id": "591304576567d90440cc5d14",
        "index": 53,
        "guid": "d46689b1-8c54-460c-9fb8-d6a185c65d1f",
        "isActive": false,
        "balance": "$1,388.27",
        "picture": "http://placehold.it/32x32",
        "age": 35,
        "eyeColor": "blue"
      },
      {
        "_id": "59130457f91b834acea8ab56",
        "index": 54,
        "guid": "61af0b80-ab18-45b9-a8ee-e9332e74b00d",
        "isActive": true,
        "balance": "$3,249.45",
        "picture": "http://placehold.it/32x32",
        "age": 26,
        "eyeColor": "green"
      },
      {
        "_id": "591304577a19f6af6f210d47",
        "index": 55,
        "guid": "8f7d1d02-d8bf-4151-b10a-cec32d4c7dec",
        "isActive": false,
        "balance": "$3,874.62",
        "picture": "http://placehold.it/32x32",
        "age": 27,
        "eyeColor": "blue"
      },
      {
        "_id": "591304577b3a5b5b881d8769",
        "index": 56,
        "guid": "1f95b909-1b80-43a8-bd7b-677e921a8e6d",
        "isActive": false,
        "balance": "$2,560.29",
        "picture": "http://placehold.it/32x32",
        "age": 35,
        "eyeColor": "blue"
      },
      {
        "_id": "591304576995d74ec9873690",
        "index": 57,
        "guid": "be721eee-4481-420d-ad36-020d35b54c4f",
        "isActive": false,
        "balance": "$3,907.07",
        "picture": "http://placehold.it/32x32",
        "age": 35,
        "eyeColor": "green"
      },
      {
        "_id": "59130457116d37b484e7d0f0",
        "index": 58,
        "guid": "f98799d1-1236-419e-a872-4e1f35af449d",
        "isActive": false,
        "balance": "$3,044.96",
        "picture": "http://placehold.it/32x32",
        "age": 34,
        "eyeColor": "brown"
      },
      {
        "_id": "59130457a856ce636f60af41",
        "index": 59,
        "guid": "cbc1bda5-6108-48b6-8106-a8e1f0e31d86",
        "isActive": false,
        "balance": "$3,004.15",
        "picture": "http://placehold.it/32x32",
        "age": 26,
        "eyeColor": "blue"
      },
      {
        "_id": "59130457a68833061288c3eb",
        "index": 60,
        "guid": "cf8f85b8-177b-43f2-84b5-ea7587e3e19e",
        "isActive": false,
        "balance": "$2,035.31",
        "picture": "http://placehold.it/32x32",
        "age": 38,
        "eyeColor": "brown"
      },
      {
        "_id": "59130457059165bf8a838059",
        "index": 61,
        "guid": "50eb2162-cb1e-4e33-a3c8-93db6c0f96cb",
        "isActive": false,
        "balance": "$2,310.08",
        "picture": "http://placehold.it/32x32",
        "age": 34,
        "eyeColor": "blue"
      },
      {
        "_id": "59130457c1052147c1268685",
        "index": 62,
        "guid": "5bf542dc-5fc5-4388-858b-184699adaf76",
        "isActive": false,
        "balance": "$1,192.44",
        "picture": "http://placehold.it/32x32",
        "age": 25,
        "eyeColor": "green"
      },
      {
        "_id": "59130457b3ce32f087884dbf",
        "index": 63,
        "guid": "20c3ebd6-77da-418d-9bc2-b704f6205291",
        "isActive": true,
        "balance": "$1,016.27",
        "picture": "http://placehold.it/32x32",
        "age": 25,
        "eyeColor": "green"
      },
      {
        "_id": "5913045754f17f20e4b3e546",
        "index": 64,
        "guid": "3cbd833e-48d4-4ce8-9445-4ef6f239587f",
        "isActive": true,
        "balance": "$2,673.57",
        "picture": "http://placehold.it/32x32",
        "age": 35,
        "eyeColor": "brown"
      },
      {
        "_id": "5913045798cc9e8dad46e7c9",
        "index": 65,
        "guid": "c98404c6-dbe0-4a1f-abdf-26f2599780f9",
        "isActive": false,
        "balance": "$1,979.28",
        "picture": "http://placehold.it/32x32",
        "age": 32,
        "eyeColor": "green"
      },
      {
        "_id": "59130457afd88e757b4bc9c4",
        "index": 66,
        "guid": "07a6152e-0c25-4492-a066-46de35a206e7",
        "isActive": false,
        "balance": "$1,602.55",
        "picture": "http://placehold.it/32x32",
        "age": 24,
        "eyeColor": "blue"
      },
      {
        "_id": "5913045714e1ce5a1f199a9a",
        "index": 67,
        "guid": "9d9eb38f-5224-48ea-9263-b79bdcbb32c6",
        "isActive": false,
        "balance": "$2,769.25",
        "picture": "http://placehold.it/32x32",
        "age": 26,
        "eyeColor": "blue"
      },
      {
        "_id": "59130457f88dec8f1befa423",
        "index": 68,
        "guid": "0b8a9235-3bf9-4b0d-94b6-a1b70582a864",
        "isActive": false,
        "balance": "$3,404.71",
        "picture": "http://placehold.it/32x32",
        "age": 40,
        "eyeColor": "brown"
      },
      {
        "_id": "5913045781c3c4dc6d3d30b6",
        "index": 69,
        "guid": "1625e865-d29c-4ec3-8496-ad1f0accafb4",
        "isActive": false,
        "balance": "$1,434.22",
        "picture": "http://placehold.it/32x32",
        "age": 34,
        "eyeColor": "brown"
      },
      {
        "_id": "591304577ab1260da7266488",
        "index": 70,
        "guid": "0874a974-6f91-47d8-b3f4-abda00344660",
        "isActive": false,
        "balance": "$2,814.79",
        "picture": "http://placehold.it/32x32",
        "age": 37,
        "eyeColor": "green"
      },
      {
        "_id": "59130457372852e7e8bfbf14",
        "index": 71,
        "guid": "8cebfbbb-2bfb-4c7c-aa99-71277faff853",
        "isActive": true,
        "balance": "$1,788.91",
        "picture": "http://placehold.it/32x32",
        "age": 28,
        "eyeColor": "green"
      },
      {
        "_id": "591304574c22b34917614eb5",
        "index": 72,
        "guid": "5d790346-9591-4120-9ef5-4304ab7c3e87",
        "isActive": true,
        "balance": "$1,824.96",
        "picture": "http://placehold.it/32x32",
        "age": 39,
        "eyeColor": "green"
      },
      {
        "_id": "59130457551903672642fb1f",
        "index": 73,
        "guid": "33ba1e6d-ba5e-4811-8509-b82cb188779e",
        "isActive": false,
        "balance": "$2,662.58",
        "picture": "http://placehold.it/32x32",
        "age": 35,
        "eyeColor": "blue"
      },
      {
        "_id": "591304570d0f6629b6bc857a",
        "index": 74,
        "guid": "7b454115-a828-46a9-8ff1-54b353ef3e1d",
        "isActive": false,
        "balance": "$1,254.40",
        "picture": "http://placehold.it/32x32",
        "age": 31,
        "eyeColor": "brown"
      },
      {
        "_id": "59130457ade00f56d243816b",
        "index": 75,
        "guid": "efc95268-1a22-4fbb-8384-6ac21d1126c7",
        "isActive": true,
        "balance": "$2,963.07",
        "picture": "http://placehold.it/32x32",
        "age": 39,
        "eyeColor": "green"
      }
    ], {
      fields: {
        index: {
          view: 'number'
        },
        isActive: {
          view: 'boolean'
        },
        age: {
          display: (age) => {
            return age > 10 ? 'zu alt!!!' : 'zu jung';
          },
          group: (age) => {
            return age > 10 ? 'zu alt!' : 'zu jung';
          }
        }
      }
    });
    this.formConfig = {
      fields: {
        name: {
          label: 'Name',
          required: true,
          view: 'string'
        },
        age: {
          label: 'Alter',
          view: 'number'
        },
        dead: {
          label: 'Ist Tot?',
          view: 'boolean'
        },
      }
    };

    this.modelConfig.set('muffin', {
      fields: {
        pictures: {
          label: 'Bilder'
        },
        name: {
          label: 'Muffin Name',
          group: (name) => {
            return name[0].toUpperCase()
          },
          required: true
        },
        _created: {
          label: 'Erstellt',
          form: false,
          group: (value) => moment(value).format('YYYY')
        },
        amazement_factor: {
          label: 'Amazement Faktor',
          display: (value) => {
            return (value * 10) + '%'
          },
          group: (value) => {
            return value > 5 ? 'Größer als 50%' : 'Kleiner als 50%';
          },
          validate: (value) => {
            if (typeof value !== 'number') {
              return;
            }
            if (value < 1) {
              return 'Muss mindestens 1 sein';
            } else if (value > 10) {
              return 'Darf maximal 10 sein';
            }
          }
        },
      }
    });

    this.modelConfig.set('baker', {
      fields: {
        name: {
          label: 'Bäcker'
        },
        muffins: {
          label: 'Muffins',
          display: (value, item) => {
            let muffins = item.getTitle('muffins') || [];
            if (muffins && !Array.isArray(muffins)) {
              muffins = [muffins];
            }
            return muffins;
          }
        }
      }
    });
  }

}
