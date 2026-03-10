# QA Test Report

## Project
MedLaunch Frontend Developer Assessment

## Objective
Verify that the multi-step form functions correctly and satisfies the requirements described in the assessment document.

---

## Test Environment

Browser: Google Chrome  
Operating System: Windows 11  
Framework: React (Vite)

---

## Test Scenarios

### 1. Step Navigation

Test Case  
Navigate between steps using Next and Previous buttons.

Expected Result  
User should be able to move between steps without losing data.

Result  
PASS

---

### 2. Form Data Persistence

Test Case  
Enter values in earlier steps, move forward and return back.

Expected Result  
Previously entered values should remain populated.

Result  
PASS

---

### 3. Review Page Display

Test Case  
Navigate to Step 6 review page.

Expected Result  
All previously entered information should be displayed correctly.

Result  
PASS

---

### 4. Email Verification Indicator

Test Case  
Enter email and verify the indicator.

Expected Result  
Verified label appears next to the email address.

Result  
PASS

---

### 5. Submit Confirmation Validation

Test Case  
Attempt to submit without selecting confirmation checkbox.

Expected Result  
Submission should be blocked and a message should appear.

Result  
PASS

---

### 6. Form Submission

Test Case  
Submit the form after selecting confirmation checkbox.

Expected Result  
Application payload should be logged to the browser console.

Result  
PASS

---

### 7. CSV Export

Test Case  
Click Export to CSV.

Expected Result  
CSV file downloads containing form data.

Result  
PASS

---

### 8. PDF Download

Test Case  
Click Download as PDF.

Expected Result  
Browser print dialog opens to save the page as PDF.

Result  
PASS

---

## Bugs Identified

Minor React warning about duplicate keys during list rendering.

Impact  
Low – does not affect functionality.

Status  
Pending cleanup in future updates.

---

## Conclusion

All core functionality described in the assessment requirements has been implemented and tested successfully.  
The multi-step form works correctly and the submission payload is logged to the browser console as expected.