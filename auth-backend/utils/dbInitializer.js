const BloodType = require('../models/BloodType');

const bloodTypesData = [
  {
    type: 'O-',
    canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    description: 'Universal donor'
  },
  {
    type: 'O+',
    canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
    description: 'Can donate to O+, A+, B+, AB+'
  },
  {
    type: 'A-',
    canDonateTo: ['A-', 'A+', 'AB-', 'AB+'],
    description: 'Can donate to A+, A-, AB+, AB-'
  },
  {
    type: 'A+',
    canDonateTo: ['A+', 'AB+'],
    description: 'Can donate to A+, AB+'
  },
  {
    type: 'B-',
    canDonateTo: ['B-', 'B+', 'AB-', 'AB+'],
    description: 'Can donate to B+, B-, AB+, AB-'
  },
  {
    type: 'B+',
    canDonateTo: ['B+', 'AB+'],
    description: 'Can donate to B+, AB+'
  },
  {
    type: 'AB-',
    canDonateTo: ['AB-', 'AB+'],
    description: 'Can donate to AB+, AB-'
  },
  {
    type: 'AB+',
    canDonateTo: ['AB+'],
    description: 'Can only receive from AB+'
  }
];

const initializeBloodTypes = async () => {
  try {
    const count = await BloodType.countDocuments();
    if (count === 0) {
      await BloodType.insertMany(bloodTypesData);
      console.log('Blood types database initialized successfully');
    }
  } catch (err) {
    console.error('Error initializing blood types:', err);
  }
};

module.exports = initializeBloodTypes;