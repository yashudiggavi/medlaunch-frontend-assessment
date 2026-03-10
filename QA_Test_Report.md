# QA Test Report

## Project
MedLaunch Frontend Developer Assessment

## Objective
The objective of this QA testing process was to verify that the multi-step hospital application form works correctly and meets the requirements specified in the assessment document.

The testing focused on validating form navigation, data persistence, review page accuracy, submission functionality, and export features.

---

## Test Environment

Operating System: Windows 11  
Browser: Google Chrome (latest version)  
Framework: React with Vite  

Testing was performed locally using the development server.

---

## Tools Used

The following tools were used during testing:

Google Chrome Developer Tools – Used to inspect console output and verify that the final payload was logged correctly.  
Manual Testing – Used to verify form functionality and navigation across steps.  

No automated testing tools were used for this assignment.

---

## Test Scenarios Executed

### 1. Multi-Step Navigation

Test Case  
Verify that the user can navigate through the form using Next and Previous buttons.

Steps  
1. Open the application.  
2. Click Next to move to the next step.  
3. Click Previous to return to the previous step.

Expected Result  
The user should be able to move between steps without errors.

Actual Result  
Navigation worked correctly across all steps.

Status  
PASS

---

### 2. Form Data Persistence

Test Case  
Verify that entered data remains when navigating between steps.

Steps  
1. Enter values in Step 1.  
2. Move to Step 2 and Step 3.  
3. Return to Step 1.

Expected Result  
Previously entered values should remain in the form fields.

Actual Result  
All entered values remained intact.

Status  
PASS

---

### 3. Review Page Validation

Test Case  
Verify that all user-entered information appears correctly on the Review & Submit page.

Steps  
1. Complete all form steps.  
2. Navigate to the Review page (Step 6).

Expected Result  
All information from previous steps should be displayed correctly.

Actual Result  
All fields were displayed accurately.

Status  
PASS

---

### 4. Confirmation Checkbox Validation

Test Case  
Verify that the form cannot be submitted unless the confirmation checkbox is selected.

Steps  
1. Navigate to Step 6.  
2. Attempt to submit the form without selecting the confirmation checkbox.

Expected Result  
Submission should be blocked.

Actual Result  
Submission was prevented until the checkbox was selected.

Status  
PASS

---

### 5. Form Submission

Test Case  
Verify that the application logs the final payload when the user submits the form.

Steps  
1. Fill all form steps.  
2. Select the confirmation checkbox.  
3. Click Submit Application.

Expected Result  
The final payload should appear in the browser console.

Actual Result  
The payload was successfully logged to the console.

Status  
PASS

---

### 6. CSV Export

Test Case  
Verify that the CSV export button downloads the application data.

Steps  
1. Navigate to Step 6.  
2. Click Export to CSV.

Expected Result  
A CSV file should download containing form data.

Actual Result  
CSV file downloaded successfully.

Status  
PASS

---

### 7. PDF Download

Test Case  
Verify that the Download as PDF button works.

Steps  
1. Navigate to Step 6.  
2. Click Download as PDF.

Expected Result  
Browser print dialog should open allowing the page to be saved as PDF.

Actual Result  
Browser print dialog opened successfully.

Status  
PASS

---

## Bugs Identified

### Duplicate Key Warning in Console

Issue  
A React warning appeared in the console indicating that two elements had the same key when rendering a list.

Impact  
Low – This warning did not affect the functionality of the application.

Resolution  
Keys were updated to ensure uniqueness when rendering mapped lists.

Status  
Resolved

---

## Conclusion

All required features described in the assessment were implemented and tested successfully.

The multi-step form functions correctly, data persists across steps, and the final form payload is logged to the console upon submission as required.