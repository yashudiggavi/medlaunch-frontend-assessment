import StepShell from "../components/StepShell";
import SectionCard from "../components/SectionCard";

function formatFileSize(bytes) {
  if (!bytes || Number.isNaN(bytes)) return "0 KB";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  const kb = bytes / 1024;
  return `${kb.toFixed(1)} KB`;
}

function Step4SiteInformation({
  formData,
  setFieldValue,
  nextStep,
  prevStep,
  errors,
}) {
  const isSingle = formData.siteMode === "single";
  const isMultiple = formData.siteMode === "multiple";

  const allowedExtensions = [".csv", ".xls", ".xlsx"];

  const isValidFile = (file) => {
    const lowerName = file.name.toLowerCase();
    return allowedExtensions.some((ext) => lowerName.endsWith(ext));
  };

  const processFiles = (files) => {
    const fileArray = Array.from(files || []);
    if (fileArray.length === 0) return;

    const invalidFiles = fileArray.filter((file) => !isValidFile(file));
    if (invalidFiles.length > 0) {
      alert("Only CSV and Excel files (.csv, .xls, .xlsx) are allowed.");
      return;
    }

    const uploadedFileObjects = fileArray.map((file) => ({
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      file,
      url: URL.createObjectURL(file),
    }));

    setFieldValue("uploadedFiles", [...formData.uploadedFiles, ...uploadedFileObjects]);
  };

  const handleFileChange = (e) => {
    processFiles(e.target.files);
    e.target.value = "";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    processFiles(e.dataTransfer.files);
  };

  const handleRemoveFile = (indexToRemove) => {
    const fileToRemove = formData.uploadedFiles[indexToRemove];
    if (fileToRemove?.url) {
      URL.revokeObjectURL(fileToRemove.url);
    }

    setFieldValue(
      "uploadedFiles",
      formData.uploadedFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleDownloadTemplate = () => {
    const csvContent =
      "Site Name,Street Address,City,State,ZIP Code\n" +
      "Main Hospital,123 Main St,Riverside,CA,92501\n";

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "site-information-template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePreviewFile = (fileItem) => {
    if (!fileItem?.url) return;

    const lowerName = fileItem.name.toLowerCase();

    if (lowerName.endsWith(".csv")) {
      window.open(fileItem.url, "_blank");
      return;
    }

    alert("Preview works directly for CSV files. Excel files will be downloaded instead.");
    const link = document.createElement("a");
    link.href = fileItem.url;
    link.download = fileItem.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadUploadedFile = (fileItem) => {
    if (!fileItem?.url) return;

    const link = document.createElement("a");
    link.href = fileItem.url;
    link.download = fileItem.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              formData.uploadedFiles.forEach((fileItem) => {
                if (fileItem?.url) URL.revokeObjectURL(fileItem.url);
              });

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
              <div
                className="upload-dropzone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div>
                  <div style={{ fontSize: "22px", marginBottom: "10px" }}>⇪</div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      marginBottom: "8px",
                    }}
                  >
                    Upload Site Information
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      marginBottom: "10px",
                    }}
                  >
                    Drag and drop your CSV or Excel file here
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
                      fontSize: "14px",
                      color: "#2b5c94",
                      marginTop: "8px",
                      cursor: "pointer",
                    }}
                    onClick={handleDownloadTemplate}
                  >
                    Download CSV Template
                  </div>
                </div>
              </div>

              <div style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>
                Uploaded
              </div>

              {formData.uploadedFiles.length === 0 ? (
                <div style={{ fontSize: "12px", color: "#888" }}>
                  No files selected
                </div>
              ) : (
                formData.uploadedFiles.map((file, index) => (
                  <div key={`${file.name}-${index}`} className="upload-file-row">
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "12px" }}>
                        {file.name}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          marginTop: "4px",
                          fontSize: "12px",
                        }}
                      >
                        <span
                          style={{ color: "#2b5c94", cursor: "pointer" }}
                          onClick={() => handlePreviewFile(file)}
                        >
                          Preview
                        </span>
                        <span
                          style={{ color: "#2b5c94", cursor: "pointer" }}
                          onClick={() => handleDownloadUploadedFile(file)}
                        >
                          Download
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <span style={{ fontSize: "12px", color: "#666" }}>
                        {file.size}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        style={{
                          border: "none",
                          background: "#0a66c2",
                          color: "#fff",
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          cursor: "pointer",
                          fontSize: "16px",
                          lineHeight: 1,
                        }}
                      >
                        ×
                      </button>
                    </div>
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