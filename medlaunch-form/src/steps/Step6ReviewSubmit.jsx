import StepShell from "../components/StepShell";
import SectionCard from "../components/SectionCard";

function ReviewSection({ title, children }) {
  return (
    <div className="review-section">
      <div className="review-section-header">
        <span>⌃ {title}</span>
        <span>Edit</span>
      </div>
      <div className="review-section-body">{children}</div>
    </div>
  );
}

function displayValue(value) {
  if (value === null || value === undefined || String(value).trim() === "") {
    return "—";
  }
  return value;
}

function joinedDates(list) {
  if (!list || list.length === 0) return "—";
  return list.join(", ");
}

function formatPhoneNumber(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length !== 10) return displayValue(value);
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function Step6ReviewSubmit({ formData, setFieldValue, prevStep }) {
  const handleSubmit = () => {
    if (!formData.submitConfirmed) {
      alert("Please confirm that the information is accurate before submitting.");
      return;
    }

    console.log("Final Form Payload:", formData);
    alert("Application submitted successfully. Check the console for the payload.");
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const uploadedFileNames =
    formData.uploadedFiles?.length > 0
      ? formData.uploadedFiles.map((file) =>
          typeof file === "string" ? file : file.name
        )
      : [];

  const primaryContactAddress = [
    formData.billingStreet,
    formData.billingCity,
    formData.billingState,
    formData.billingZip,
  ]
    .filter((item) => String(item || "").trim() !== "")
    .join(", ");

  const handleExportCSV = () => {
    const rows = [
      ["Field", "Value"],
      ["Legal Entity Name", displayValue(formData.legalEntityName)],
      ["DBA Name", displayValue(formData.dbaName)],
      [
        "Primary Contact Name",
        `${displayValue(formData.primaryFirstName)} ${displayValue(
          formData.primaryLastName
        )}`,
      ],
      ["Primary Title", displayValue(formData.primaryTitle)],
      ["Primary Work Phone", formatPhoneNumber(formData.primaryWorkPhone)],
      ["Primary Cell Phone", formatPhoneNumber(formData.primaryCellPhone)],
      ["Primary Email", displayValue(formData.primaryEmail)],
      ["Primary Address", displayValue(primaryContactAddress)],
      [
        "Primary Email Verified",
        formData.primaryEmailVerified ? "Yes" : "No",
      ],
      [
        "Facility Type",
        formData.facilityType === "Other"
          ? `Other - ${displayValue(formData.facilityOther)}`
          : displayValue(formData.facilityType),
      ],
      [
        "CEO Name",
        `${displayValue(formData.ceoFirstName)} ${displayValue(
          formData.ceoLastName
        )}`,
      ],
      ["CEO Phone", formatPhoneNumber(formData.ceoPhone)],
      ["CEO Email", displayValue(formData.ceoEmail)],
      [
        "Director of Quality Name",
        `${displayValue(formData.qualityFirstName)} ${displayValue(
          formData.qualityLastName
        )}`,
      ],
      ["Director of Quality Phone", formatPhoneNumber(formData.qualityPhone)],
      ["Director of Quality Email", displayValue(formData.qualityEmail)],
      [
        "Invoicing Contact Name",
        `${displayValue(formData.invoicingFirstName)} ${displayValue(
          formData.invoicingLastName
        )}`,
      ],
      ["Invoicing Title", displayValue(formData.invoicingTitle)],
      ["Invoicing Phone", formatPhoneNumber(formData.invoicingPhone)],
      ["Invoicing Email", displayValue(formData.invoicingEmail)],
      ["Billing Street", displayValue(formData.billingStreet)],
      ["Billing City", displayValue(formData.billingCity)],
      ["Billing State", displayValue(formData.billingState)],
      ["Billing Zip", displayValue(formData.billingZip)],
      [
        "Site Configuration",
        formData.siteMode === "multiple"
          ? "Multiple Locations"
          : "Single Location",
      ],
      [
        "Input Method",
        formData.siteMode === "multiple"
          ? formData.siteInputMethod === "upload"
            ? "File Upload"
            : "Direct Entry"
          : "Direct Entry",
      ],
      [
        "Uploaded Files",
        uploadedFileNames.length ? uploadedFileNames.join(", ") : "—",
      ],
      [
        "Services Provided",
        formData.services?.length ? formData.services.join(", ") : "—",
      ],
      [
        "Other Services",
        formData.otherServices?.filter((item) => String(item).trim() !== "")
          .length
          ? formData.otherServices
              .filter((item) => String(item).trim() !== "")
              .join(", ")
          : "—",
      ],
      [
        "Standards to Apply",
        formData.standards?.length ? formData.standards.join(", ") : "—",
      ],
      ["Date of Application", displayValue(formData.applicationDate)],
      [
        "Expiration Date of Current Stroke Certification",
        displayValue(formData.expirationDate),
      ],
      [
        "Dates of last twenty-five thrombolytic administrations",
        joinedDates(formData.thrombolyticDates),
      ],
      [
        "Dates of last fifteen thrombectomies",
        joinedDates(formData.thrombectomyDates),
      ],
    ];

    const csvContent = rows
      .map((row) =>
        row.map((item) => `"${String(item).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "application-review.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <StepShell
      title="Review & Submit"
      stepText="Step 6 of 6"
      activeStep={6}
      leftButton={
        <button type="button" className="btn-outline" onClick={prevStep}>
          Previous
        </button>
      }
      middleButtons={
        <button
          type="button"
          className="btn-primary"
          onClick={handleSubmit}
          disabled={!formData.submitConfirmed}
          style={{
            opacity: formData.submitConfirmed ? 1 : 0.6,
            cursor: formData.submitConfirmed ? "pointer" : "not-allowed",
          }}
        >
          Submit Application
        </button>
      }
    >
      <SectionCard>
        <h2 className="section-title" style={{ fontSize: "18px" }}>
          Hospital Information
        </h2>

        <ReviewSection title="Basic Information">
          <table className="review-table">
            <tbody>
              <tr>
                <td>Legal Entity Name</td>
                <td>{displayValue(formData.legalEntityName)}</td>
              </tr>
              <tr>
                <td>d/b/a Name</td>
                <td>{displayValue(formData.dbaName)}</td>
              </tr>
              <tr>
                <td>Primary Contact</td>
                <td>
                  <div className="review-highlight-box">
                    <strong>
                      {displayValue(formData.primaryFirstName)}{" "}
                      {displayValue(formData.primaryLastName)}
                    </strong>
                    <br />
                    {displayValue(formData.primaryTitle)}
                    <br />
                    Work: {formatPhoneNumber(formData.primaryWorkPhone)} | Cell:{" "}
                    {formatPhoneNumber(formData.primaryCellPhone)}
                    <br />
                    Email: {displayValue(formData.primaryEmail)}{" "}
                    {formData.primaryEmailVerified && (
                      <span
                        style={{
                          background: "#9bd89f",
                          padding: "2px 6px",
                          borderRadius: "10px",
                          fontSize: "8px",
                        }}
                      >
                        Verified
                      </span>
                    )}
                    <br />
                    Address: {displayValue(primaryContactAddress)}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </ReviewSection>

        <ReviewSection title="Facility Details">
          <table className="review-table">
            <tbody>
              <tr>
                <td>Facility Type</td>
                <td>
                  {formData.facilityType === "Other"
                    ? `Other - ${displayValue(formData.facilityOther)}`
                    : displayValue(formData.facilityType)}
                </td>
              </tr>
            </tbody>
          </table>
        </ReviewSection>

        <ReviewSection title="Leadership Contacts">
          <table className="review-table">
            <tbody>
              <tr>
                <td>CEO</td>
                <td>
                  <div className="review-highlight-box">
                    <strong>
                      {displayValue(formData.ceoFirstName)}{" "}
                      {displayValue(formData.ceoLastName)}
                    </strong>
                    <br />
                    Phone: {formatPhoneNumber(formData.ceoPhone)}
                    <br />
                    Email: {displayValue(formData.ceoEmail)}
                  </div>
                </td>
              </tr>

              <tr>
                <td>Director of Quality</td>
                <td>
                  <div className="review-highlight-box">
                    <strong>
                      {displayValue(formData.qualityFirstName)}{" "}
                      {displayValue(formData.qualityLastName)}
                    </strong>
                    <br />
                    Phone: {formatPhoneNumber(formData.qualityPhone)}
                    <br />
                    Email: {displayValue(formData.qualityEmail)}
                  </div>
                </td>
              </tr>

              <tr>
                <td>Invoicing Contact</td>
                <td>
                  <div className="review-highlight-box">
                    <strong>
                      {displayValue(formData.invoicingFirstName)}{" "}
                      {displayValue(formData.invoicingLastName)}
                    </strong>
                    <br />
                    Title: {displayValue(formData.invoicingTitle)}
                    <br />
                    Phone: {formatPhoneNumber(formData.invoicingPhone)}
                    <br />
                    Email: {displayValue(formData.invoicingEmail)}
                    <br />
                    Billing Address: {displayValue(formData.billingStreet)},{" "}
                    {displayValue(formData.billingCity)},{" "}
                    {displayValue(formData.billingState)}{" "}
                    {displayValue(formData.billingZip)}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </ReviewSection>

        <ReviewSection title="Site Information">
          <table className="review-table">
            <tbody>
              <tr>
                <td>Site Configuration</td>
                <td>
                  {formData.siteMode === "multiple"
                    ? "Multiple Locations"
                    : "Single Location"}
                </td>
              </tr>
              <tr>
                <td>Input Method</td>
                <td>
                  {formData.siteMode === "multiple"
                    ? formData.siteInputMethod === "upload"
                      ? "File Upload"
                      : "Direct Entry"
                    : "Direct Entry"}
                </td>
              </tr>

              {formData.siteMode === "multiple" && (
                <tr>
                  <td>Uploaded Files</td>
                  <td>
                    {uploadedFileNames.length
                      ? uploadedFileNames.join(", ")
                      : "—"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ReviewSection>

        <ReviewSection title="Services & Certifications">
          <table className="review-table">
            <tbody>
              <tr>
                <td>Services Provided</td>
                <td>
                  <div className="review-tag-list">
                    {formData.services?.length > 0 ? (
                      formData.services.map((item, index) => (
                        <span key={`${item}-${index}`} className="review-tag">
                          {item}
                        </span>
                      ))
                    ) : (
                      <span>—</span>
                    )}
                  </div>
                </td>
              </tr>

              {formData.otherServices?.filter((item) => String(item).trim() !== "")
                .length > 0 && (
                <tr>
                  <td>Other Services</td>
                  <td>
                    <div className="review-tag-list">
                      {formData.otherServices
                        .filter((item) => String(item).trim() !== "")
                        .map((item, index) => (
                          <span key={`${item}-${index}`} className="review-tag">
                            {item}
                          </span>
                        ))}
                    </div>
                  </td>
                </tr>
              )}

              <tr>
                <td>Standards to Apply</td>
                <td>
                  <div className="review-tag-list">
                    {formData.standards?.length > 0 ? (
                      formData.standards.map((item, index) => (
                        <span key={`${item}-${index}`} className="review-tag">
                          {item}
                        </span>
                      ))
                    ) : (
                      <span>—</span>
                    )}
                  </div>
                </td>
              </tr>

              <tr>
                <td>Date of Application</td>
                <td>{displayValue(formData.applicationDate)}</td>
              </tr>

              <tr>
                <td>Expiration Date of Current Stroke Certification</td>
                <td>{displayValue(formData.expirationDate)}</td>
              </tr>

              <tr>
                <td>Dates of last twenty-five thrombolytic administrations</td>
                <td style={{ color: "#005baa", fontWeight: 600 }}>
                  {joinedDates(formData.thrombolyticDates)}
                </td>
              </tr>

              <tr>
                <td>Dates of last fifteen thrombectomies</td>
                <td style={{ color: "#005baa", fontWeight: 600 }}>
                  {joinedDates(formData.thrombectomyDates)}
                </td>
              </tr>
            </tbody>
          </table>
        </ReviewSection>

        <div
          className="section-card ready-submit-card"
          style={{ marginTop: "14px", maxWidth: "100%" }}
        >
          <div className="section-title">Ready to Submit?</div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={formData.submitConfirmed}
              onChange={(e) => setFieldValue("submitConfirmed", e.target.checked)}
            />
            <span>
              I certify that all information provided is accurate and complete to the
              best of my knowledge
            </span>
          </label>

          <div className="ready-submit-text">
            By submitting this form, you agree to our terms and conditions. DNV will
            review your application and contact you within 2-3 business days.
          </div>

          <div className="file-action-row">
            <button
              type="button"
              className="btn-outline"
              onClick={handleDownloadPDF}
            >
              Download as PDF
            </button>
            <button
              type="button"
              className="btn-outline"
              onClick={handleExportCSV}
            >
              Export to CSV
            </button>
          </div>
        </div>
      </SectionCard>
    </StepShell>
  );
}

export default Step6ReviewSubmit;