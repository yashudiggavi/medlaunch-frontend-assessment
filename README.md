# MedLaunch Frontend Developer Assessment

## Overview
This project implements a multi-step hospital application form using React.  
The form collects hospital information across multiple steps and allows users to review all entered data before submitting the application.

When the user submits the form, the complete application payload is logged to the browser console as required in the assessment instructions.

---

## Tech Stack

- React (JavaScript)
- Vite
- Pure CSS

No external UI libraries or CSS frameworks were used.

---

## Features

- Multi-step form navigation (Next / Previous)
- State management across all steps
- Review page displaying all entered information
- Confirmation checkbox before submission
- Payload logging to browser console on submit
- Export application data to CSV
- Download review page as PDF using browser print

---

## Project Structure

src  
 ├─ components  
 │   ├─ StepShell.jsx  
 │   └─ SectionCard.jsx  

 ├─ steps  
 │   ├─ Step1QuoteRequest.jsx  
 │   ├─ Step2FacilityDetails.jsx  
 │   ├─ Step3LeadershipContacts.jsx  
 │   ├─ Step4SiteInformation.jsx  
 │   ├─ Step5ServicesCertifications.jsx  
 │   └─ Step6ReviewSubmit.jsx  

 └─ App.jsx  

---

## Installation & Setup

Clone the repository

git clone <repository-url>

Navigate to project folder

cd medlaunch-frontend-assessment

Install dependencies

npm install

Run the development server

npm run dev

Open in browser

http://localhost:5173

---

## Form Submission

When the **Submit Application** button is clicked:

- The application checks if the confirmation checkbox is selected
- If confirmed, the full form payload is logged to the browser console

Example:

Final Form Payload: { ...formData }

---

## Assumptions

- Backend integration was not required for this assignment
- Email verification is simulated
- File uploads are simulated by displaying file names

---

## Known Limitations

- No backend API integration
- PDF export uses browser print functionality
- CSV export includes key fields only
- Limited form validation

---

## Future Improvements

- API integration for form submission
- Real email verification flow
- Additional form validations
- Improved responsive design
- Unit tests for form components