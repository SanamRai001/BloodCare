import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const provinces = [
 {
    name: 'Province No. 1',
    districts: ['Jhapa', 'Morang', 'Sunsari', 'Ilam', 'Dhankuta'],
    municipalities: {
      Jhapa: ['Birtamode', 'Damak', 'Mechinagar', 'Kankai'],
      Morang: ['Biratnagar', 'Rangeli', 'Urlabari', 'Belbari'],
      Sunsari: ['Inaruwa', 'Itahari', 'Dharan'],
      Ilam: ['Ilam Municipality', 'Mai', 'Deumai'],
      Dhankuta: ['Dhankuta Municipality', 'Pakhribas'],
    },
  },
  {
    name: 'Province No. 2',
    districts: ['Parsa', 'Bara', 'Rautahat', 'Sarlahi', 'Siraha'],
    municipalities: {
      Parsa: ['Birgunj', 'Pokhariya', 'Bahudarmai'],
      Bara: ['Kalaiya', 'Simraungadh', 'Jeetpur Simara'],
      Rautahat: ['Gaur', 'Chandrapur'],
      Sarlahi: ['Malangwa', 'Haripur', 'Lalbandi'],
      Siraha: ['Lahan', 'Siraha Municipality'],
    },
  },
  {
    name: 'Bagmati Province',
    districts: ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Makwanpur', 'Chitwan'],
    municipalities: {
      Kathmandu: ['Kathmandu', 'Kirtipur'],
      Lalitpur: ['Lalitpur', 'Godawari'],
      Bhaktapur: ['Bhaktapur', 'Madhyapur Thimi'],
      Makwanpur: ['Hetauda', 'Thaha'],
      Chitwan: ['Bharatpur', 'Ratnanagar'],
    },
  },
  {
    name: 'Gandaki Province',
    districts: ['Kaski', 'Tanahun', 'Gorkha', 'Lamjung', 'Baglung'],
    municipalities: {
      Kaski: ['Pokhara', 'Lekhnath'],
      Tanahun: ['Damauli', 'Shuklagandaki'],
      Gorkha: ['Gorkha Municipality', 'Palungtar'],
      Lamjung: ['Besisahar', 'Madhyanepal'],
      Baglung: ['Baglung Municipality', 'Galkot'],
    },
  },
  {
    name: 'Lumbini Province',
    districts: ['Rupandehi', 'Kapilvastu', 'Dang', 'Banke', 'Bardiya'],
    municipalities: {
      Rupandehi: ['Butwal', 'Siddharthanagar'],
      Kapilvastu: ['Taulihawa', 'Kapilvastu Municipality'],
      Dang: ['Ghorahi', 'Tulsipur'],
      Banke: ['Nepalgunj', 'Kohalpur'],
      Bardiya: ['Gulariya', 'Thakurbaba'],
    },
  },
  {
    name: 'Karnali Province',
    districts: ['Surkhet', 'Dailekh', 'Jumla', 'Kalikot', 'Dolpa'],
    municipalities: {
      Surkhet: ['Birendranagar', 'Gurbhakot'],
      Dailekh: ['Narayan', 'Dullu'],
      Jumla: ['Chandannath'],
      Kalikot: ['Manma', 'Tilagufa'],
      Dolpa: ['Dunai'],
    },
  },
  {
    name: 'Sudurpashchim Province',
    districts: ['Kailali', 'Kanchanpur', 'Bajura', 'Doti', 'Achham'],
    municipalities: {
      Kailali: ['Dhangadhi', 'Tikapur'],
      Kanchanpur: ['Mahendranagar', 'Belauri'],
      Bajura: ['Martadi'],
      Doti: ['Dipayal Silgadhi'],
      Achham: ['Mangalsen', 'Sanphebagar'],
    },
  },

];

const BecomeVolunteer = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contact: '',
    permanentProvince: '',
    permanentDistrict: '',
    permanentMunicipality: '',
    permanentWard: '',
    temporaryProvince: '',
    temporaryDistrict: '',
    temporaryMunicipality: '',
    temporaryWard: '',
    dob: '',
    gender: 'male',
    nationality: '',
    expertise: '',
    desiredSkills: '',
    sectors: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const sectorsList = [
    'Blood Service', 'Disaster Response', 'Community Health and First-Aid',
    'Emergency Health and WASH', 'Mental Health and Psycho-social Support',
    'IT, Digitalization and Innovation', 'Information Management and Reporting',
    'Migration and Population Movement', 'Emergency Shelter', 'Logistics',
    'Events and Promotional Campaigns', 'Finance and Fundraising',
    'Communications and Translations', '1130 Hotline', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      sectors: checked
        ? [...prev.sectors, value]
        : prev.sectors.filter(s => s !== value),
    }));
  };

  const getDistricts = (province) => {
    const selected = provinces.find(p => p.name === province);
    return selected ? selected.districts : [];
  };

  const getMunicipalities = (province, district) => {
    const selected = provinces.find(p => p.name === province);
    return selected?.municipalities[district] || [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Validate required fields
      if (!formData.fullName || !formData.contact) {
        throw new Error('Full name and contact number are required');
      }

      const volunteerData = {
        fullName: formData.fullName,
        email: formData.email,
        contact: formData.contact,
        permanentAddress: {
          province: formData.permanentProvince,
          district: formData.permanentDistrict,
          municipality: formData.permanentMunicipality,
          ward: formData.permanentWard
        },
        temporaryAddress: {
          province: formData.temporaryProvince,
          district: formData.temporaryDistrict,
          municipality: formData.temporaryMunicipality,
          ward: formData.temporaryWard
        },
        dob: formData.dob,
        gender: formData.gender,
        nationality: formData.nationality,
        expertise: formData.expertise,
        desiredSkills: formData.desiredSkills,
        sectors: formData.sectors
      };

      const response = await axios.post('https://localhost:5000/api/volunteers', volunteerData);
      
      if (response.status === 201) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          contact: '',
          permanentProvince: '',
          permanentDistrict: '',
          permanentMunicipality: '',
          permanentWard: '',
          temporaryProvince: '',
          temporaryDistrict: '',
          temporaryMunicipality: '',
          temporaryWard: '',
          dob: '',
          gender: 'male',
          nationality: '',
          expertise: '',
          desiredSkills: '',
          sectors: [],
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(error.response?.data?.message || error.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  
return (
    <div className="volunteer-background">
      {/* Banner */}
      <div className="banner-wrapper mb-4">
        <img src="/voln.webp" alt="Volunteer Banner" className="banner-img" />
        <div className="banner-text">
          <h1>Become a Volunteer</h1>
          <p>Join us to save lives and support communities.</p>
        </div>
      </div>

      {/* Form Area */}
      <div className="container volunteer-form-container">
        <div className="row">
          {/* Form */}
          <div className="col-lg-9">
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow">
              <h2 className="mb-4">Become a Volunteer</h2>

              {/* Contact Info */}
              <div className="p-3 mb-3 bg-light">
                <div className="row g-3">
                  <div className="col-md-6">
                    <input type="text" className="form-control" name="fullName" required placeholder="Full Name *" value={formData.fullName} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <input type="email" className="form-control" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <input type="text" className="form-control" name="contact" required placeholder="Contact Number *" value={formData.contact} onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="card shadow-sm mb-4 border-0">
                <div className="card-body bg-light rounded">
                  <h5 className="card-title mb-3">Personal Details</h5>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label">Date of Birth</label>
                      <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label d-block">Gender</label>
                      {['male', 'female', 'other'].map(g => (
                        <div key={g} className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="gender" id={`gender-${g}`} value={g} checked={formData.gender === g} onChange={handleChange} />
                          <label className="form-check-label" htmlFor={`gender-${g}`}>{g.charAt(0).toUpperCase() + g.slice(1)}</label>
                        </div>
                      ))}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Nationality</label>
                      <input type="text" className="form-control" name="nationality" placeholder="e.g., Nepali" value={formData.nationality} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Addresses */}
              <div className="row mt-5">
                {/* Permanent Address */}
                <div className="col-md-6 p-3 bg-light">
                  <h5>Permanent Address</h5>
                  <label className="form-label">Province</label>
                  <select className="form-select mb-2" name="permanentProvince" value={formData.permanentProvince} onChange={handleChange}>
                    <option value="">--- Select ---</option>
                    {provinces.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                  </select>
                  <label className="form-label">District</label>
                  <select className="form-select mb-2" name="permanentDistrict" value={formData.permanentDistrict} onChange={handleChange} disabled={!formData.permanentProvince}>
                    <option value="">--- Select ---</option>
                    {getDistricts(formData.permanentProvince).map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <label className="form-label">Municipality</label>
                  <select className="form-select mb-2" name="permanentMunicipality" value={formData.permanentMunicipality} onChange={handleChange} disabled={!formData.permanentDistrict}>
                    <option value="">--- Select ---</option>
                    {getMunicipalities(formData.permanentProvince, formData.permanentDistrict).map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <label className="form-label">Ward No.</label>
                  <input type="text" className="form-control" name="permanentWard" value={formData.permanentWard} onChange={handleChange} />
                </div>

                {/* Temporary Address */}
                <div className="col-md-6 p-3 bg-light">
                  <h5>Temporary Address</h5>
                  <label className="form-label">Province</label>
                  <select className="form-select mb-2" name="temporaryProvince" value={formData.temporaryProvince} onChange={handleChange}>
                    <option value="">--- Select ---</option>
                    {provinces.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                  </select>
                  <label className="form-label">District</label>
                  <select className="form-select mb-2" name="temporaryDistrict" value={formData.temporaryDistrict} onChange={handleChange} disabled={!formData.temporaryProvince}>
                    <option value="">--- Select ---</option>
                    {getDistricts(formData.temporaryProvince).map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <label className="form-label">Municipality</label>
                  <select className="form-select mb-2" name="temporaryMunicipality" value={formData.temporaryMunicipality} onChange={handleChange} disabled={!formData.temporaryDistrict}>
                    <option value="">--- Select ---</option>
                    {getMunicipalities(formData.temporaryProvince, formData.temporaryDistrict).map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <label className="form-label">Ward No.</label>
                  <input type="text" className="form-control" name="temporaryWard" value={formData.temporaryWard} onChange={handleChange} />
                </div>
              </div>

              {/* Skills */}
              <div className="row mt-5">
                <div className="p-3 mb-3 bg-light">
                  <h5>Skills & Interests</h5>
                  <textarea className="form-control mb-2" rows="3" name="expertise" placeholder="Your expertise or special skills" value={formData.expertise} onChange={handleChange} />
                  <textarea className="form-control" rows="3" name="desiredSkills" placeholder="Skills or trainings you want" value={formData.desiredSkills} onChange={handleChange} />
                </div>

                {/* Volunteer Sectors */}
                <div className="p-3 mb-3 bg-light">
                  <h5>Sectors to Volunteer In</h5>
                  <div className="row">
                    {sectorsList.map((sector, i) => (
                      <div key={i} className="col-6">
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id={`s${i}`} value={sector} checked={formData.sectors.includes(sector)} onChange={handleCheckbox} />
                          <label className="form-check-label" htmlFor={`s${i}`}>{sector}</label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-text mt-4">
                By submitting, I certify that I agree to the <span className="text-danger fw-bold">Code of Conduct</span> of BloodCare.
              </div>

              <button type="submit" className="btn btn-danger mt-3">Submit Application</button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="col-lg-3 mb-4">
            <div className="d-grid gap-3">
              <button className="btn btn-danger">Become a Volunteer</button>
              <button className="btn btn-outline-danger">Become a Member</button>
              <button className="btn btn-outline-danger">Donate to Blood Care</button>
              <button className="btn btn-outline-danger">Find a BloodCare Near You</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeVolunteer;