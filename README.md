# MedLaunch Frontend Developer Assessment

## Overview

This project implements a multi-step hospital application form using React.

The application collects hospital information across multiple steps and allows users to review all entered data before submitting the application.

Once the form is submitted, the complete application payload is logged to the browser console as required in the assessment instructions.

---

## Tech Stack

The following technologies were used to build the project:

React (JavaScript) – UI development  
Vite – Development build tool  
Pure CSS – Styling  

No external UI libraries or CSS frameworks were used.

---

## How to Install and Run the App Locally

1. Clone the repository

git clone https://github.com/yashudiggavi/medlaunch-frontend-assessment.git

2. Navigate to the repository folder

cd medlaunch-frontend-assessment

3. Navigate to the React application folder

cd medlaunch-form

4. Install dependencies

npm install

5. Start the development server

npm run dev

6. Open the application

Open your browser and go to:

http://localhost:5173

---

## Development Approach

The application was implemented as a multi-step form workflow where each step is built as a separate React component.

Each step collects a specific category of information such as:

- Hospital basic information
- Facility details
- Leadership contacts
- Site information
- Services and certifications

The form state is managed centrally and passed between components using props to ensure that data persists across steps.

Reusable layout components such as StepShell and SectionCard were created to maintain consistent UI structure across all steps.

A Review & Submit page allows users to verify all entered data before submitting the form.

When the user clicks the Submit Application button, the full form payload is logged to the browser console.

---

## Project Structure

medlaunch-frontend-assessment

medlaunch-form  
│  
├── src  
│   ├── components  
│   │   ├── StepShell.jsx  
│   │   └── SectionCard.jsx  
│   │  
│   ├── steps  
│   │   ├── Step1QuoteRequest.jsx  
│   │   ├── Step2FacilityDetails.jsx  
│   │   ├── Step3LeadershipContacts.jsx  
│   │   ├── Step4SiteInformation.jsx  
│   │   ├── Step5ServicesCertifications.jsx  
│   │   └── Step6ReviewSubmit.jsx  
│   │  
│   └── App.jsx  
│  
├── package.json  
├── vite.config.js  

README.md  
QA_Test_Report.md  

---

## Form Submission

When the Submit Application button is clicked:

1. The application checks if the confirmation checkbox is selected.
2. If confirmed, the complete form payload is logged to the browser console.

Example console output:

Final Form Payload: { ...formData }

To view this:

1. Open browser developer tools  
2. Go to the Console tab  
3. Click Submit Application  

---

## Assumptions

Backend integration was not required for this assignment.

Email verification is simulated for demonstration purposes.

File uploads are simulated by displaying file names rather than uploading files to a server.

CSV export contains key form data fields.

---

## Known Issues / Limitations

There is no backend API integration.

PDF download uses browser print functionality.

Form validation is limited to basic checks.

Minor React warnings may appear for duplicate keys during list rendering.

---

## Future Improvements

Integrate backend API for real form submission.

Implement real email verification functionality.

Add stronger input validation and error handling.

Improve responsive design for smaller screens.

Add automated testing for form components.