// seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const BloodBank = require("./models/BloodBank");

const bloodBanks = [
  {
    name: "Nepal Red Cross Society, Bhaktapur Branch",
    location: {
      type: "Point",
      coordinates: [85.42232821529674, 27.67241562185881], // Approximate coordinates of Bhaktapur Red Cross
    },
    address: "Bhaktapur Municipality-10, Nepal",
    contact: "016611661",
    bloodInventory: {
      "O+": 14,
      "O-": 4,
      "A+": 12,
      "A-": 3,
      "B+": 15,
      "B-": 2,
      "AB+": 8,
      "AB-": 1,
    },
  },
  {
    name: "Civil Service Hospital of Nepal",
    location: {
      type: "Point",
      coordinates: [85.3387996870091, 27.686429396977587], // Approximate coordinates of Bhaktapur Red Cross
    },
    address: "Minbhawan Marg, Kathmandu 44600",
    contact: "014107000",
    bloodInventory: {
      "O+": 18,
      "O-": 4,
      "A+": 12,
      "A-": 0,
      "B+": 15,
      "B-": 2,
      "AB+": 8,
      "AB-": 1,
    },
  },

  {
    name: "मदरल्याण्ड हस्पिटल प्रा. लि",
    location: {
      type: "Point",
      coordinates: [85.35985293253538, 27.68939773253168], // Approximate coordinates of Bhaktapur Hospital
    },
    address: "Bhaktapur Road, Kathmandu 44600",
    contact: "014992788",
    bloodInventory: {
      "O+": 4,
      "O-": 5,
      "A+": 14,
      "A-": 2,
      "B+": 0,
      "B-": 3,
      "AB+": 0,
      "AB-": 1,
    },
  },
  {
    name: "Everest Hospital Pvt. Ltd. ",
    location: {
      type: "Point",
      coordinates: [85.33281290710842, 27.688550560262925], // Approximate coordinates of Bhaktapur Hospital
    },
    address: "Kathmandu 44600",
    contact: "014793024",
    bloodInventory: {
      "O+": 0,
      "O-": 5,
      "A+": 14,
      "A-": 2,
      "B+": 18,
      "B-": 3,
      "AB+": 6,
      "AB-": 1,
    },
  },
  {
    name: "Madhyapur Thimi Hospital Blood Bank",
    location: {
      type: "Point",
      coordinates: [85.38798382179867, 27.6725942430451], // Approximate coordinates of Bhaktapur Hospital
    },
    address: "Thimi, Bhaktapur",
    contact: "+977 981-0105711",
    bloodInventory: {
      "O+": 0,
      "O-": 0,
      "A+": 14,
      "A-": 2,
      "B+": 18,
      "B-": 3,
      "AB+": 0,
      "AB-": 0,
    },
  },
  {
    name: "Korea Nepal Friendship Hospital, Bhaktapur",
    location: {
      type: "Point",
      coordinates: [85.38374386247705, 27.67864708178822], // Approximate coordinates of Bhaktapur Hospital
    },
    address: "Thimi, Bhaktapur",
    contact: "016633442",
    bloodInventory: {
      "O+": 7,
      "O-": 0,
      "A+": 0,
      "A-": 0,
      "B+": 0,
      "B-": 3,
      "AB+": 6,
      "AB-": 1,
    },
  },

  {
    name: "KMC Hospital - Duwakot",
    location: {
      type: "Point",
      coordinates: [85.43262189831094, 27.668541914508772], // Approximate coordinates of Bhaktapur Hospital
    },
    address: "Changunarayan Rd, Bhaktapur 44800",
    contact: "016618007",
    bloodInventory: {
      "O+": 12,
      "O-": 0,
      "A+": 14,
      "A-": 0,
      "B+": 0,
      "B-": 3,
      "AB+": 6,
      "AB-": 1,
    },
  },
  {
    name: "Bhaktapur Cancer Hospital",
    location: {
      type: "Point",
      coordinates: [85.42229984258873, 27.673439943828324], // Approximate coordinates of Bhaktapur Hospital
    },
    address: "MCFC+7W8 cancer hospital, Bhaktapur 44800",
    contact: "not available",
    bloodInventory: {
      "O+": 8,
      "O-": 0,
      "A+": 0,
      "A-": 0,
      "B+": 0,
      "B-": 3,
      "AB+": 0,
      "AB-": 1,
    },
  },
  {
    name: "KMC Hospital - Duwakot",
    location: {
      type: "Point",
      coordinates: [85.36647792489445, 27.67493810971918], // Approximate coordinates of Bhaktapur Hospital
    },
    address: "Changunarayan Rd, Bhaktapur 44800",
    contact: "016637171",
    bloodInventory: {
      "O+": 12,
      "O-": 0,
      "A+": 0,
      "A-": 2,
      "B+": 0,
      "B-": 3,
      "AB+": 6,
      "AB-": 1,
    },
  },
  {
    name: "Bhaktapur Model Hospital",
    location: {
      type: "Point",
      coordinates: [85.36188693322383, 27.67438809316802], // Approximate coordinates of Bhaktapur Hospital
    },
    address: "M9F6+PQP, Araniko Highway, Madhyapur Thimi 44800",
    contact: "015924640",
    bloodInventory: {
      "O+": 12,
      "O-": 0,
      "A+": 0,
      "A-": 2,
      "B+": 0,
      "B-": 3,
      "AB+": 6,
      "AB-": 1,
    },
  },
  {
    name: "Aarogya Multispeciality Hospital",
    location: {
      type: "Point",
      coordinates: [85.37805443095232, 27.67203618825906], // Approximate coordinates of Bhaktapur Hospital
    },
    address: "M9CH+G47, Sundarnagar, 44600, Madhyapur Thimi 44600",
    contact: "016637137",
    bloodInventory: {
      "O+": 2,
      "O-": 0,
      "A+": 14,
      "A-": 2,
      "B+": 0,
      "B-": 3,
      "AB+": 0,
      "AB-": 0,
    },
  },
  {
    name: "MED VALLEY MULTISPECIALITY HOSPITAL",
    location: {
      type: "Point",
      coordinates: [85.40803771189793, 27.67717465740435], // Approximate coordinates of Bhaktapur Hospital
    },
    address: "MCG5+M73, Bhaktapur Road, Bhaktapur 44800",
    contact: "9849088733",
    bloodInventory: {
      "O+": 15,
      "O-": 0,
      "A+": 14,
      "A-": 2,
      "B+": 0,
      "B-": 3,
      "AB+": 6,
      "AB-": 1,
    },
  },
  {
    name: "Human Organ Transplant Centre (Shahid Dharma Bhakta Hospital)",
    location: {
      type: "Point",
      coordinates: [85.42190960026143, 27.67303764803329], // Approximate coordinates of Bhaktapur Hospital
    },
    address:
      "Bhaktapur Hospital & Human Organ Transplant Centre, Bhaktapur 44800",
    contact: "016614709",
    bloodInventory: {
      "O+": 6,
      "O-": 0,
      "A+": 0,
      "A-": 2,
      "B+": 18,
      "B-": 3,
      "AB+": 0,
      "AB-": 1,
    },
  },
  {
    name: "Khwopa Hospital",
    location: {
      type: "Point",
      coordinates: [85.43901628491605, 27.674527550088456], // Approximate coordinates of Bhaktapur Hospital
    },
    address:
      "MCCQ+P67, Chyamhasingha Bhaktapur Minicipality ward-9, Garud Kundal Road, Bhaktapur 44800",
    contact: "016610317",
    bloodInventory: {
      "O+": 6,
      "O-": 0,
      "A+": 14,
      "A-": 0,
      "B+": 18,
      "B-": 3,
      "AB+": 6,
      "AB-": 1,
    },
  },
  {
    name: "Dr. Iwamura Memorial Hospital  (DRIM HOSPITAL)",
    location: {
      type: "Point",
      coordinates: [85.41181905002449, 27.672561971327948], // Approximate coordinates in Bhaktapur
    },
    address: "Kamalbinayak, Bhaktapur",
    contact: "016612705",
    bloodInventory: {
      "O+": 10,
      "O-": 0,
      "A+": 8,
      "A-": 1,
      "B+": 1,
      "B-": 2,
      "AB+": 4,
      "AB-": 0,
    },
  },
  {
    name: "Tribhuvan University Teaching Hospital",
    location: {
      type: "Point",
      coordinates: [85.320763, 27.679499],
    },
    address: "Maharajgunj, Kathmandu",
    contact: "014413111",
    bloodInventory: {
      "O+": 25,
      "O-": 8,
      "A+": 20,
      "A-": 5,
      "B+": 22,
      "B-": 4,
      "AB+": 10,
      "AB-": 2,
    },
  },
  {
    name: "Patan Hospital",
    location: {
      type: "Point",
      coordinates: [85.325236, 27.676214],
    },
    address: "Lagankhel, Lalitpur",
    contact: "015521111",
    bloodInventory: {
      "O+": 20,
      "O-": 6,
      "A+": 18,
      "A-": 4,
      "B+": 15,
      "B-": 3,
      "AB+": 9,
      "AB-": 1,
    },
  },
  {
    name: "Bir Hospital",
    location: {
      type: "Point",
      coordinates: [85.316662, 27.704929],
    },
    address: "Kantipath, Kathmandu",
    contact: "014242424",
    bloodInventory: {
      "O+": 30,
      "O-": 10,
      "A+": 25,
      "A-": 6,
      "B+": 20,
      "B-": 5,
      "AB+": 12,
      "AB-": 3,
    },
  },
  {
    name: "Nepal Mediciti Hospital",
    location: {
      type: "Point",
      coordinates: [85.352014, 27.717649],
    },
    address: "Bansbari, Kathmandu",
    contact: "014466777",
    bloodInventory: {
      "O+": 15,
      "O-": 5,
      "A+": 12,
      "A-": 3,
      "B+": 10,
      "B-": 2,
      "AB+": 6,
      "AB-": 1,
    },
  },
  {
    name: "Grande International Hospital",
    location: {
      type: "Point",
      coordinates: [85.348892, 27.745819],
    },
    address: "Dhapasi, Kathmandu",
    contact: "015543333",
    bloodInventory: {
      "O+": 18,
      "O-": 6,
      "A+": 15,
      "A-": 4,
      "B+": 12,
      "B-": 3,
      "AB+": 8,
      "AB-": 2,
    },
  },
  {
    name: "Norvic International Hospital",
    location: {
      type: "Point",
      coordinates: [85.327862, 27.712983],
    },
    address: "Thapathali, Kathmandu",
    contact: "015970000",
    bloodInventory: {
      "O+": 12,
      "O-": 4,
      "A+": 10,
      "A-": 2,
      "B+": 8,
      "B-": 2,
      "AB+": 5,
      "AB-": 1,
    },
  },
  {
    name: "Om Hospital and Research Center",
    location: {
      type: "Point",
      coordinates: [85.316083, 27.690717],
    },
    address: "Chabahil, Kathmandu",
    contact: "014470000",
    bloodInventory: {
      "O+": 10,
      "O-": 3,
      "A+": 8,
      "A-": 2,
      "B+": 7,
      "B-": 1,
      "AB+": 4,
      "AB-": 0,
    },
  },
  {
    name: "Kanti Children's Hospital",
    location: {
      type: "Point",
      coordinates: [85.318854, 27.712984],
    },
    address: "Maharajgunj, Kathmandu",
    contact: "014412121",
    bloodInventory: {
      "O+": 8,
      "O-": 3,
      "A+": 6,
      "A-": 1,
      "B+": 5,
      "B-": 1,
      "AB+": 3,
      "AB-": 0,
    },
  },
  {
    name: "Maternity Hospital",
    location: {
      type: "Point",
      coordinates: [85.315943, 27.697454],
    },
    address: "Thapathali, Kathmandu",
    contact: "014261122",
    bloodInventory: {
      "O+": 15,
      "O-": 5,
      "A+": 12,
      "A-": 3,
      "B+": 10,
      "B-": 2,
      "AB+": 6,
      "AB-": 1,
    },
  },
  {
    name: "Nepal Eye Hospital",
    location: {
      type: "Point",
      coordinates: [85.320456, 27.704321],
    },
    address: "Tripureshwor, Kathmandu",
    contact: "014263461",
    bloodInventory: {
      "O+": 5,
      "O-": 2,
      "A+": 4,
      "A-": 1,
      "B+": 3,
      "B-": 1,
      "AB+": 2,
      "AB-": 0,
    },
  },
  {
    name: "Nobel Medical College Teaching Hospital",
    location: {
      type: "Point",
      coordinates: [85.342781, 27.671452],
    },
    address: "Gairidhara, Kathmandu",
    contact: "014431111",
    bloodInventory: {
      "O+": 12,
      "O-": 4,
      "A+": 10,
      "A-": 2,
      "B+": 8,
      "B-": 2,
      "AB+": 5,
      "AB-": 1,
    },
  },
  {
    name: "Kathmandu Medical College",
    location: {
      type: "Point",
      coordinates: [85.346782, 27.678923],
    },
    address: "Sinamangal, Kathmandu",
    contact: "014479999",
    bloodInventory: {
      "O+": 15,
      "O-": 5,
      "A+": 12,
      "A-": 3,
      "B+": 10,
      "B-": 2,
      "AB+": 6,
      "AB-": 1,
    },
  },
  {
    name: "Nepal Police Hospital",
    location: {
      type: "Point",
      coordinates: [85.329456, 27.723456],
    },
    address: "Maharajgunj, Kathmandu",
    contact: "014412345",
    bloodInventory: {
      "O+": 10,
      "O-": 3,
      "A+": 8,
      "A-": 2,
      "B+": 6,
      "B-": 1,
      "AB+": 4,
      "AB-": 1,
    },
  },
  {
    name: "Siddhi Memorial Hospital",
    location: {
      type: "Point",
      coordinates: [85.425678, 27.673456],
    },
    address: "Bhaktapur",
    contact: "016612345",
    bloodInventory: {
      "O+": 8,
      "O-": 3,
      "A+": 6,
      "A-": 2,
      "B+": 5,
      "B-": 1,
      "AB+": 3,
      "AB-": 0,
    },
  },
  {
    name: "Scheer Memorial Hospital",
    location: {
      type: "Point",
      coordinates: [85.512345, 27.634567],
    },
    address: "Banepa, Kavre",
    contact: "011660123",
    bloodInventory: {
      "O+": 10,
      "O-": 4,
      "A+": 8,
      "A-": 2,
      "B+": 6,
      "B-": 1,
      "AB+": 4,
      "AB-": 1,
    },
  },
  {
    name: "Dhulikhel Hospital",
    location: {
      type: "Point",
      coordinates: [85.556789, 27.623456],
    },
    address: "Dhulikhel, Kavre",
    contact: "011490490",
    bloodInventory: {
      "O+": 12,
      "O-": 4,
      "A+": 10,
      "A-": 3,
      "B+": 8,
      "B-": 2,
      "AB+": 5,
      "AB-": 1,
    },
  },
  {
    name: "HAMS Hospital",
    location: {
      type: "Point",
      coordinates: [85.334567, 27.712345],
    },
    address: "Lagankhel, Lalitpur",
    contact: "015523456",
    bloodInventory: {
      "O+": 8,
      "O-": 3,
      "A+": 6,
      "A-": 2,
      "B+": 5,
      "B-": 1,
      "AB+": 3,
      "AB-": 0,
    },
  },

  // Note: Inventory numbers are illustrative - real-time data would require API connection
];

async function seedDatabase() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/bloodDonationDB",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    await BloodBank.deleteMany({});
    await BloodBank.insertMany(bloodBanks);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
