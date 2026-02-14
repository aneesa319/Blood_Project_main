const bloodBondKnowledge = {
  website: {
    name: "LifeSaver System",
    description: "A smart blood donor recommendation system connecting donors, patients, and hospitals across Pakistan",
    tagline: "Your Blood Donation Matters. Give Today!",
    features: [
      "Smart donor matching by blood type and location",
      "Real-time donor search with compatibility",
      "Easy registration for donors and patients",
      "Blood type compatibility information",
      "Eligibility checker for blood donation",
      "Donation process guidance",
      "Volunteer program"
    ]
  },

  userRoles: {
    donor: {
      description: "Life-saving heroes who donate blood to help others",
      features: [
        "Quick registration process",
        "Dashboard to manage donations",
        "Find nearby patients in need",
        "Track donation history"
      ],
      registrationPath: "/registration",
      dashboardPath: "/donor/:id/dashboard"
    },
    patient: {
      description: "Patients who need blood donations",
      features: [
        "Search for compatible donors",
        "Emergency donor search",
        "Patient dashboard",
        "Contact donors directly"
      ],
      registrationPath: "/registration",
      dashboardPath: "/patient/:id/dashboard"
    }
  },

  processes: {
    bloodDonation: {
      title: "Complete Blood Donation Process",
      timeRequired: "45-60 minutes total",
      steps: [
        { step: 1, title: "Registration & Health History", duration: "10-15 minutes" },
        { step: 2, title: "Health Screening", duration: "15-20 minutes" },
        { step: 3, title: "Blood Donation", duration: "8-12 minutes" },
        { step: 4, title: "Recovery & Refreshments", duration: "10-15 minutes" },
        { step: 5, title: "Certificate & Next Steps", duration: "5 minutes" }
      ],
      requirements: {
        age: "17+ years (16 with consent)",
        weight: "Minimum 110 lbs (50kg)",
        health: "Good general health, no cold/flu symptoms",
        interval: "Every 56 days for whole blood"
      }
    }
  },

  bloodTypes: {
    compatibility: {
      "O-": { name: "Universal Donor", canGiveTo: ["O+","O-","A+","A-","B+","B-","AB+","AB-"], canReceiveFrom: ["O-"] },
      "O+": { name: "Most Common", canGiveTo: ["O+","A+","B+","AB+"], canReceiveFrom: ["O+","O-"] },
      "A+": { name: "Type A Positive", canGiveTo: ["A+","AB+"], canReceiveFrom: ["A+","A-","O+","O-"] },
      "A-": { name: "Type A Negative", canGiveTo: ["A+","A-","AB+","AB-"], canReceiveFrom: ["A-","O-"] },
      "B+": { name: "Type B Positive", canGiveTo: ["B+","AB+"], canReceiveFrom: ["B+","B-","O+","O-"] },
      "B-": { name: "Type B Negative", canGiveTo: ["B+","B-","AB+","AB-"], canReceiveFrom: ["B-","O-"] },
      "AB+": { name: "Universal Receiver", canGiveTo: ["AB+"], canReceiveFrom: ["O+","O-","A+","A-","B+","B-","AB+","AB-"] },
      "AB-": { name: "Type AB Negative", canGiveTo: ["AB+","AB-"], canReceiveFrom: ["A-","B-","AB-","O-"] }
    }
  }
};

const responseTemplates = {
  greeting: [
    "Hello! I'm your LifeSaver assistant, and I'm here to help you with blood donation! Whether you want to donate blood, search for donors, or learn more, I'm here for you. What's on your mind today?",
    "Welcome to LifeSaver System! I'm here to make blood donation simple, safe, and rewarding. How can I help you make a difference today?",
    "Hi there! As your LifeSaver assistant, I'm passionate about connecting donors with patients in need. What would you like to know?"
  ],

  emergencyHelp: "**Emergency - Let's Act Fast!**\n\nHere's what you can do:\n\n1. **Go to Search Donors** at /search/Donors\n2. **Use Compatibility Search** at /compatible-search\n3. **Specify blood type** needed\n4. **Contact matching donors** directly\n\nDo you need help finding a specific blood type?",

  donationInfo: "**Ready to become a life-saving hero?** Here's why donating with LifeSaver is amazing:\n\n* **Save 3 lives** with just one donation\n* **Free health checkup** every time\n* **Easy registration** at /registration\n* **Track your impact** on your dashboard\n\nWant me to help you get started?"
};

module.exports = { bloodBondKnowledge, responseTemplates };
