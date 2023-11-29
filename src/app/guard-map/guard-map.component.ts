import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/service/SharedService';
import { LayoutComponent } from '../layout/layout.component';
import { DatePipe } from '@angular/common';
import { Constant } from '../shared/constant/Contant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-guard-map',
  templateUrl: './guard-map.component.html',
  styleUrls: ['./guard-map.component.scss']
})
export class GuardMapComponent implements OnInit {
  zoom = 10;
  lat = 28.622524;
  lng = 77.3661221;
  public origin: any;
  public destination: any;
  filterDate = "";
  filterEmpId = "";
  distanceTravel = "";
  mapViewList = [];
  employeeList = [];
  loginEmpId = "";
  loginEmpRole = "";
  loginEmpRoleId = "";
  alertFadeoutTime = 0;
  tenentId = "";
  alarmRecall = 0; // in second
  public markerOptions = {
    origin: {
        // icon: './assets/img/ok.png',
        // label: 'MARKER LABEL',
        // draggable: true,
        infoWindow : '<h4>Origin<h4>'
    },
    destination: {
        // icon: './assets/img/notok.png',
        // label: 'MARKER LABEL',
        infoWindow : '<h4>Destination<h4>'
        // opacity: 0.8,
    },
  }

  constructor(private sharedService : SharedService, private toastr: ToastrService,
    private layoutComponent : LayoutComponent,
    private datePipe : DatePipe) {
      this.loginEmpId = localStorage.getItem("empId");
      this.loginEmpRole = localStorage.getItem("loginEmpRole");
      this.loginEmpRoleId = localStorage.getItem("empRoleId");
      this.alertFadeoutTime = Constant.ALERT_FADEOUT_TIME;
      this.tenentId = localStorage.getItem("tenentId");
      this.layoutComponent.setPageTitle("Map");
      this.alarmRecall = 60;
  }

  ngOnInit(): void {
    this.filterDate = this.datePipe.transform(new Date(),'yyyy-MM-dd');
    this.getAllList();
  }

  getAllList(){
    this.sharedService.getAllList('employee', this.tenentId)
    .subscribe((response) =>{
      this.employeeList = response.empList;
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getAllList"),"Alert !",{timeOut : this.alertFadeoutTime});
    });
  }

//   public dirs: Array<any> = [{
//     origin: { lat: 28.6225485,lng: 77.3660792 },
//     destination: { lat: 28.6202079,lng: 77.2865235 },
//     renderOptions: { polylineOptions: { strokeColor: '#f00' } },
//   }, {
//     origin: { lat: 28.6202079,lng: 77.2865235 },
//     destination: { lat: 28.6477114,lng: 77.4181692 },
//     renderOptions: { polylineOptions: { strokeColor: '#0f0' } },
//   },
//   {
//     origin: { lat: 28.6477114,lng: 77.4181692 },
//     destination: { lat: 28.6299003,lng: 77.3965514 },
//     renderOptions: { polylineOptions: { strokeColor: '#f00' } },
//   },
//   {
//     origin: { lat: 28.6299003,lng: 77.3965514 },
//     destination: { lat: 28.6337363,lng: 77.4507828 },
//     renderOptions: { polylineOptions: { strokeColor: '#0f0' } },
//   }
// ];




  viewMap(){
    if(this.filterDate == ''){
      this.distanceTravel = ""; 
      this.mapViewList = [];
      return;
    }
    else if(this.filterEmpId == ''){
      this.distanceTravel = ""; 
      this.mapViewList = [];
      return;
    }
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRoleId : this.loginEmpRoleId,
      filterDate : this.filterDate,
      filterEmpId : this.filterEmpId,
      tenentId : this.tenentId
    }

    this.sharedService.getAllListBySelectType(jsonData,"mapView")
    .subscribe(
      (result)=>{
        this.distanceTravel = result.distanceTravel;
        this.mapViewList = result.mapViewList;
        if(this.mapViewList.length == 0){
          this.distanceTravel = "";
          this.toastr.warning("No priodic data found","Alert !",{timeOut : this.alertFadeoutTime});
        }
        // console.log(JSON.stringify(this.mapViewList))
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("viewMap"),"Alert !",{timeOut : this.alertFadeoutTime});
      }
    )
  }

  previous
  clickedMarker(infowindow,index){
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }

  openedWindow : number = 0; // alternative: array of numbers

  openWindow(id) {
    this.zoom = 13;
    this.openedWindow = id; // alternative: push to array of numbers
  }

  isInfoWindowOpen(id) {
      return this.openedWindow == id; // alternative: check if id is in array
  }

}
