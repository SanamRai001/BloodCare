
// import React, { useState } from "react";
// import { Button, Table, Form, InputGroup } from "react-bootstrap";
// import Footer from "./Footer";


// //inside or around ktm valley data
// const BloodBank = () => {
//   const [bloodBanks, setBloodBanks] = useState([
    // { name: "Bhaktapur NRCS Blood Bank", district: "Bhaktapur", contact: "01-6611661, 01-6612266" },
    // { name: "Central NRCS Blood Bank", district: "Soaltee-Mode", contact: "	01-4288485" },
    // { name: "Lalitpur NRCS Blood Bank", district: "	Pulchowk", contact: "+977 01-5427033" },
    // { name: "Frontline Hospital Blood Bank ", district: "	Old Baneshwor, Kathmandu", contact: "01-5970132  " },
    // { name: " Teaching Hospital Blood Bank", district: "	Maharajgunj, Kathmandu", contact: " 01-44123030, 01-4410911" },
    // { name: "Gangalal Hospital Blood Bank ", district: "		Bansbari, Kathmandu", contact: "01-4371322" },
    // { name: "Himal Hospital Blood Bank ", district: "	Gyaneshwor, Kathmandu", contact: " 986-2737316" },
    // { name: " Grande Hospital Blood Bank", district: "	Dhapasi", contact: "01-5159266 " },
    // { name: " Prasuti Griha Blood Bank", district: "Thapathali, Kathmandu	", contact: " 01-4260405" },
    // { name: " Nepal Mediciti Hospital Blood Bank", district: "	Nakhkhu Ukalo, Lalitpur", contact: "01-4217766 " },
    // { name: "Bir Hospital Blood Bank ", district: "	New Road gate, Kathmandu	", contact: " 01-4221119, 01-4221988" },
    // { name: "Nepal Police Hospital Blood Bank ", district: "	Maharajgunj, Kathmandu", contact: " 01-4412430" },
    // { name: "Civil Hospital Blood Bank ", district: "	Minbhawan, Kathmandu", contact: " 01-4107000" },
    // { name: "Patan Hospital Blood Bank ", district: "Patan, Lalitpur	", contact: " 	01-5522295" },
    // { name: " Birendra Army Hospital Blood Bank", district: "Kathmandu	", contact: " 01-4271941" },
    // { name: "Nepal Medical College Blood Bank ", district: "Gokarneswor, Kathmandu	", contact: " 01-4911008" },
    // { name: "Kathmandu Medical College & Teaching Hospital Blood Bank ", district: "Sinamangal, Kathmandu	", contact: " 01-4469064" },
   
    
//   ]);

//   const [newBank, setNewBank] = useState({
//     name: "",
//     district: "",
//     contact: "",
//   });
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleInputChange = (e) => {
//     setNewBank({ ...newBank, [e.target.name]: e.target.value });
//   };

//   const handleAdd = () => {
//     if (newBank.name && newBank.district && newBank.contact) {
//       setBloodBanks([...bloodBanks, newBank]);
//       setNewBank({ name: "", district: "", contact: "" });
//     }
//   };

//   const filteredBanks = bloodBanks.filter(
//     (bank) =>
//       bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       bank.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       bank.contact.includes(searchTerm)
//   );

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4 text-center">Major Blood Bank in and around Kathmandu Valley</h2>


//       {/* Search */}
//       {/* <InputGroup className="mb-3">
//         <Form.Control
//           placeholder="Search blood bank..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <Button variant="primary">Search</Button>
//       </InputGroup> */}

// <div className="d-flex justify-content-end mb-3">
//   <InputGroup style={{ maxWidth: "300px" }}>
//     <Form.Control
//       placeholder="Search blood bank..."
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//     />
//     <Button variant="primary">Search</Button>
//   </InputGroup>
// </div>

//       {/* Table */}
//       <Table striped bordered hover responsive>
//         <thead className="table-danger" >
//           <tr>
//             <th>Name of Blood Bank</th>
//             <th>District/Place</th>
//             <th>Contact Number</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredBanks.map((bank, index) => (
//             <tr key={index}>
//               <td>{bank.name}</td>
//               <td>{bank.district}</td>
//               <td>{bank.contact}</td>
//             </tr>
//           ))}
//         </tbody>
//         <br></br>
//         <i>Showing 1 to 17 of 17 entries</i>
//       </Table>
//       {/* ✅ FOOTER GOES HERE */}
//       <Footer />
//     </div>
//   );
// };


// export default BloodBank;

import React, { useState } from "react";
import { Table, Form, Button, InputGroup } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Footer from "./Footer";


const BloodBank = () => {
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");

  const data1 = [
    { name: "Bhaktapur NRCS Blood Bank", district: "Bhaktapur", contact: "01-6611661, 01-6612266" },
    { name: "Central NRCS Blood Bank", district: "Soaltee-Mode", contact: "	01-4288485" },
    { name: "Lalitpur NRCS Blood Bank", district: "	Pulchowk", contact: "+977 01-5427033" },
    { name: "Frontline Hospital Blood Bank ", district: "	Old Baneshwor, Kathmandu", contact: "01-5970132  " },
    { name: " Teaching Hospital Blood Bank", district: "	Maharajgunj, Kathmandu", contact: " 01-44123030, 01-4410911" },
    { name: "Gangalal Hospital Blood Bank ", district: "		Bansbari, Kathmandu", contact: "01-4371322" },
    { name: "Himal Hospital Blood Bank ", district: "	Gyaneshwor, Kathmandu", contact: " 986-2737316" },
    { name: " Grande Hospital Blood Bank", district: "	Dhapasi", contact: "01-5159266 " },
    { name: " Prasuti Griha Blood Bank", district: "Thapathali, Kathmandu	", contact: " 01-4260405" },
    { name: " Nepal Mediciti Hospital Blood Bank", district: "	Nakhkhu Ukalo, Lalitpur", contact: "01-4217766 " },
    { name: "Bir Hospital Blood Bank ", district: "	New Road gate, Kathmandu	", contact: " 01-4221119, 01-4221988" },
    { name: "Nepal Police Hospital Blood Bank ", district: "	Maharajgunj, Kathmandu", contact: " 01-4412430" },
    { name: "Civil Hospital Blood Bank ", district: "	Minbhawan, Kathmandu", contact: " 01-4107000" },
    { name: "Patan Hospital Blood Bank ", district: "Patan, Lalitpur	", contact: " 	01-5522295" },
    { name: " Birendra Army Hospital Blood Bank", district: "Kathmandu	", contact: " 01-4271941" },
    { name: "Nepal Medical College Blood Bank ", district: "Gokarneswor, Kathmandu	", contact: " 01-4911008" },
    { name: "Kathmandu Medical College & Teaching Hospital Blood Bank ", district: "Sinamangal, Kathmandu	", contact: " 01-4469064" },
   
  ];

  const data2 = [
    { name: "NRCS Regional BTSC ", district: "Banke, Nepalgunj ", contact: "	081 – 520174 " },
    { name: " NRCS Regional BTSC", district: "	Bharatpur, Chitwan ", contact: " 056 – 520880" },
    { name: "NRCS Regional BTSC ", district: "Pokhara, Kaski", contact: " 061 – 521091, 061 – 540191" },
    { name: " NRCS Regional BTSC", district: "Rangeli Road, Biratnagar ", contact: " 021 – 523326" },
    { name: "Dhulikhel Hospital ", district: "Dhulikhel ", contact: "011 – 490497 " },
    { name: "Manipal Teaching Hospital ", district: "Pokhara, Kaski ", contact: "061-526416 " },
    { name: " BP Koirala Memorial Cancer Hospital", district: "Bharatpur ", contact: "056-524501 " },
    { name: " Janaki Medical College Teaching Hospital", district: "Dhanusha, Janakpur ", contact: " 01-4435957" },
    { name: "Universal College of Medical Sciences ", district: "Bhairahawa, Sidarthnagar ", contact: "071-522896 " },
    { name: "Bardiya DBTSC ", district: " Bardiya", contact: "084‐420835 " },
    { name: "Dang District BTSC ", district: "Ghorahi, Dang ", contact: "082‐561460 " },
    { name: " Jumla District BTSC", district: "Jumla", contact: "	087‐520036 " },
    { name: "Sunsari District BTSC ", district: "Dharan", contact: "025 – 525555" },
    { name: "Jhapa District BTSC ", district: "	Birtamode, Jhapa ", contact: " 	023‐541833" },
    { name: "Ilam District BTSC ", district: " 	Ilam", contact: "	027‐520022 " },
    { name: "Panchthar District BTSC ", district: " Panchthar", contact: "024‐570273 " },
    { name: "Butwal District BTSC ", district: "Butwal ", contact: "071‐550462 " },
    { name: " Siraha District BTSC", district: " Siraha", contact: " 033‐560975" },
    { name: "Terhathum District BTSC ", district: " 	Myaglung", contact: "026‐460101" },
    { name: "Makawanpur District BTSC ", district: "Makwanpur", contact: " 057‐522977" },
    { name: "Parsa District BTSC ", district: " Parsa", contact: " 051 – 522504" },
    { name: "Dhanusha District BTSC", district: "Janakpur Provincial Hospital ", contact: "041 – 520870 " },
    { name: "Kavre District BTSC ", district: " Banepa, Kavre", contact: "011 – 661431 " },
    { name: "Kanchanpur District BTSC ", district: "Kanchapur ", contact: " 099‐525588" },
    { name: "Scheer Memorial Hospital ", district: " Banepa, Kavre", contact: " 011 – 661111" },
    { name: "Nepalgunj Medical College ", district: "Banke ", contact: "972 – 3001626 " },
    { name: " Tikapur Hospital", district: " Kailali", contact: "091-560406 " },
    { name: "Padama Hospital ", district: " 	Kailali", contact: "099-550355 " },
    { name: "United Mission Hospital ", district: "Palpa ", contact: " 075 – 520958" },
    { name: "Lamjung Community Hospital ", district: " Besisahar, Lamjung", contact: "066 – 520183 " },
    { name: "Dr. Megh Bahadur Parajuli Community Hospital ", district: "Illam", contact: " 027-520417" },
  ];

  const filteredData1 = data1.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm1.toLowerCase()) ||
      item.district.toLowerCase().includes(searchTerm1.toLowerCase()) ||
      item.contact.includes(searchTerm1)
  );

  const filteredData2 = data2.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm2.toLowerCase()) ||
      item.district.toLowerCase().includes(searchTerm2.toLowerCase()) ||
      item.contact.includes(searchTerm2)
  );

  return (
    <div className="container mt-4">
      <h2 style={{ color: "#003366" }} className="mb-4 text-center fs-1">Blood Banks in Kathmandu, Lalitpur, and Bhaktapur | Contact Information</h2>
<hr></hr>

      {/* First Table */}
      <h4 style={{ color: "#003366" }} className="fs-3">Blood Banks in and around Kathmandu Valley</h4>

      <div className="d-flex justify-content-end mb-3">
        <InputGroup size="sm" style={{ maxWidth: "300px" }}>
          <Form.Control
            placeholder="Search..."
            value={searchTerm1}
            onChange={(e) => setSearchTerm1(e.target.value)}
          />
          <Button variant="primary" size="sm">
            Search
          </Button>
        </InputGroup>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr className="table-info text-left">
              <th>Blood Bank Name</th>
              <th>District</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredData1.length > 0 ? (
              filteredData1.map((bank, index) => (
                <tr key={index}>
                  <td>{bank.name}</td>
                  <td>{bank.district}</td>
                  <td>{bank.contact}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <i>Showing 1 to 17 of 17 entries</i>
      </div>

<Card className="mt-4 shadow-sm bg-danger text-white">
  <Card.Body>
    <Card.Title className="text-dark fs-3">Note:</Card.Title>
    <Card.Text className="fs-5 fst-italic">
      The information displayed here have been extracted from legitimate and verified online sources. 
      Please ensure all details are correct before taking further actions. If you notice any errors, contact the administrator.
    </Card.Text>
  </Card.Body>
</Card>
<br></br>
<br></br>
      {/* Second Table */}
      <h4 style={{ color: "#003366" }} className="fs-3">Blood Banks outside Kathmandu Valley</h4>

      <div className="d-flex justify-content-end mb-3">
        <InputGroup size="sm" style={{ maxWidth: "300px" }}>
          <Form.Control
            placeholder="Search..."
            value={searchTerm2}
            onChange={(e) => setSearchTerm2(e.target.value)}
          />
          <Button variant="primary" size="sm">
            Search
          </Button>
        </InputGroup>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr className="table-info text-left">
              <th>Blood Bank Name</th>
              <th>District</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredData2.length > 0 ? (
              filteredData2.map((bank, index) => (
                <tr key={index}>
                  <td>{bank.name}</td>
                  <td>{bank.district}</td>
                  <td>{bank.contact}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <i>Showing 1 to 31 of 31 entries</i>
        
      </div>
       {/* ✅ FOOTER GOES HERE */}
      <Footer />
    </div>
  );
};

export default BloodBank;
