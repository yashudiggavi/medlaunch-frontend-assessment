import StepShell from "../components/StepShell";
import SectionCard from "../components/SectionCard";

function Step4SiteInformation({
  formData,
  setFieldValue,
  nextStep,
  prevStep,
  errors,
}) {
  const isSingle = formData.siteMode === "single";
  const isMultiple = formData.siteMode === "multiple";

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const fileNames = files.map((file) => file.name);

    setFieldValue("uploadedFiles", [...formData.uploadedFiles, ...fileNames]);

    e.target.value = "";
  };

  return (
    <StepShell
      title="Site Information"
      stepText="Step 4 of 6"
      activeStep={4}
      leftButton={
        <button type="button" className="btn-outline" onClick={prevStep}>
          Previous
        </button>
      }
      middleButtons={
        <>
          <button type="button" className="btn-primary">
            Save
          </button>
          <button type="button" className="btn-primary" onClick={nextStep}>
            Continue
          </button>
        </>
      }
    >
      <SectionCard>
        <h2 className="section-title">Do you have multiple sites or locations?</h2>

        <div className="option-grid">
          <div
            className={`option-box ${isSingle ? "selected" : ""}`}
            onClick={() => {
              setFieldValue("siteMode", "single");
              setFieldValue("siteInputMethod", "");
              setFieldValue("uploadedFiles", []);
            }}
          >
            <div className="option-box__title">Single Location</div>
            <div className="option-box__text">
              We operate from one facility only
            </div>
          </div>

          <div
            className={`option-box ${isMultiple ? "selected" : ""}`}
            onClick={() => setFieldValue("siteMode", "multiple")}
          >
            <div className="option-box__title">Multiple Locations</div>
            <div className="option-box__text">
              We have multiple facilities or practice locations
            </div>
          </div>
        </div>

        {errors?.siteMode && <p className="error">{errors.siteMode}</p>}

        {isMultiple && (
          <div className="section-divider-space">
            <h2 className="section-title">
              How would you like to add your site information?
            </h2>

            <div
              className={`option-box ${
                formData.siteInputMethod === "upload" ? "selected" : ""
              }`}
              onClick={() => setFieldValue("siteInputMethod", "upload")}
            >
              <div className="option-box__title">Upload CSV / Excel</div>
              <div className="option-box__text">
                Upload a spreadsheet with all site information
              </div>
            </div>

            {errors?.siteInputMethod && (
              <p className="error">{errors.siteInputMethod}</p>
            )}

            <div className="upload-panel">
              <div className="upload-dropzone">
                <div>
                  <div style={{ fontSize: "22px", marginBottom: "10px" }}>⇪</div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      marginBottom: "8px",
                    }}
                  >
                    Upload Site Information
                  </div>
                  <div
                    style={{
                      fontSize: "8px",
                      color: "#888",
                      marginBottom: "10px",
                    }}
                  >
                    Drag and drop your CSV or Excel file here, or click to select
                  </div>

                  <input
                    id="siteFileUpload"
                    type="file"
                    accept=".csv,.xls,.xlsx"
                    multiple
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() =>
                      document.getElementById("siteFileUpload").click()
                    }
                  >
                    Select file
                  </button>

                  <div
                    style={{
                      fontSize: "9px",
                      color: "#2b5c94",
                      marginTop: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Download CSV Template
                  </div>
                </div>
              </div>

              <div style={{ fontSize: "9px", color: "#666", marginBottom: "6px" }}>
                Uploaded
              </div>

              {formData.uploadedFiles.length === 0 ? (
                <div style={{ fontSize: "9px", color: "#888" }}>No files selected</div>
              ) : (
                formData.uploadedFiles.map((file, index) => (
                  <div key={`${file}-${index}`} className="upload-file-row">
                    <span>{file}</span>
                    <span>Selected</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </SectionCard>
    </StepShell>
  );
}
export default Step4SiteInformation;