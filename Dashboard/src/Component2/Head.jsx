import React from "react";
import '../App.css'
import { Container, Row,} from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import HeaderComponent from "./HeaderComponent";
import { Doctor } from "./Members/Doctor";
import { CotTeam } from "./Members/CotTeam";
import Chatbox from './Chatbox/Chatbox1'
import PushNotification from "./Notification/PushNotification";
import NotificationsList from "./Notification/NotificationList";
import AccountRequest from "./AccountRequest/AccountRequest";
import PaitentTable from './Patient/PatientTable'



const Head = () => {
  return (
    <div className="d-flex">
      <div className="">
      {/* Sidebar */}
      <Sidebar />
      </div>
      {/* Main Content */}
      <div className="content-container flex-grow-1 min-vh-100" style={{ backgroundColor: "white" }}> 
        {/* rgb(246 247 243) */}
          <HeaderComponent />
        <Container>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/cotTeam" element={<CotTeam />} />
            <Route path="/chatbox" element={<Chatbox />} />
            <Route path="/pushNotification" element={<PushNotification />} />
            <Route path="/notification" element={<NotificationsList />} />
            <Route path="/acountRequest" element={<AccountRequest />} />
            <Route path="/patientTable" element={<PaitentTable />} />


            
            {/* <Route path="/fees" element={<Fees />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/location" element={<GetLocation />} />
            <Route path="/university" element={<GetUniversity/>} />
            <Route path="/state" element={<State />} />
            <Route path="/adddistrict" element={<District/>}/>
            <Route path="/city" element={<GetCity/>}/>
            <Route path="/college_registarion" element={<College_registration/>}/>
            <Route path="/notification" element={<Notification></Notification>}/>
            <Route path="/ivrequest" element={<IVReequest></IVReequest>}/>
            <Route path="/addlocation" element={<Location></Location>}/>
            <Route path="/addcity" element={<City/>}/>
            <Route path="/adduniversity" element={<University/>}/>
            <Route path="/getstate" element={<GetState/>}/>
            <Route path="/district" element={<GetDistrict/>}/>
            <Route path="/update_city" element={<Update_city/>}/>
            <Route path="/update_district" element={<Update_district/>}/>
            <Route path="/update_state" element={<Update_state/>}/>
            <Route path="/update_location" element={<Update_location/>}/>
            <Route path="/update_university" element={<Update_university/>}/>
            <Route path="/update_agenda" element={<Update_agenda/>}/>
            <Route path="/update_fees" element={<Update_fees/>}/>
            <Route path="/visitcomplete" element={<VisitCompleted></VisitCompleted>}/>
            <Route path="/media" element={<GalleryAdd/>}/>
            <Route path="/totalvisits" element={<Total_Visits/>}/>
            <Route path="/currentweekvisits" element={<CurrentWeekVisits/>}/>
            <Route path="/currentmonthvisists" element={<CurrentMonthVisits/>}/>
            <Route path="/totalcollege" element={<TotalCollege/>}/>
            <Route path="/mousigned" element={<MouSigned/>}/>
            <Route path="/nonmousigned" element={<NonMouSigned/>}/>
            <Route path="/upcomingVisits" element={<UpcomingVisits/>}/>
            <Route path="/report" element={<Report/>}/>
            <Route path="/feeverification" element={<FeesVerification/>}/>
            <Route path="/feedback" element={<FeedbackDisplayComponent/>}/>
            <Route path="/getagenda" element={<GetAgenda/>}/>
            <Route path="/getfees" element={<GetFees/>}/>
            <Route path="/cancelledvisit" element={<CancelledVisits/>}/>
            <Route path="/calender" element={<Calender/>}/> */}
  
          </Routes>
        </Container>
      </div>
    </div>
  );
};

export default Head;
