import { useMemo, useState } from "react";
import StepShell from "../components/StepShell";
import SectionCard from "../components/SectionCard";

const serviceCategories = {
  "Emergency & Critical Care": [
    "Emergency Department",
    "Neonatal Intensive Care Services",
    "Pediatric Intensive Care Services",
  ],
  "Cardiac Services": [
    "Cardiac Catheterization Laboratory",
    "Open Heart",
  ],
  "Diagnostic Services": [
    "Magnetic Resonance Imaging (MRI)",
    "Diagnostic Radioisotope Facility",
    "Lithotripsy",
  ],
};

const standardOptions = [
  "Emergency Department",
  "Inpatient Acute Care",
  "General Anesthetizing Location",
  "Diagnostic Services",
  "Therapy Services",
];

function Step5ServicesCertifications({
  formData,
  setFieldValue,
  nextStep,
  prevStep,
  errors,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const filteredServiceCategories = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase();

    if (!trimmed) return serviceCategories;

    const filteredEntries = Object.entries(serviceCategories)
      .map(([category, services]) => {
        const matchedServices = services.filter((service) =>
          service.toLowerCase().includes(trimmed)
        );
        return [category, matchedServices];
      })
      .filter(([, services]) => services.length > 0);

    return Object.fromEntries(filteredEntries);
  }, [searchTerm]);

  const toggleService = (service) => {
    const exists = formData.services.includes(service);
    if (exists) {
      setFieldValue(
        "services",
        formData.services.filter((item) => item !== service)
      );
    } else {
      setFieldValue("services", [...formData.services, service]);
    }
  };

  const addOtherService = () => {
    setFieldValue("otherServices", [...formData.otherServices, ""]);
  };

  const updateOtherService = (index, value) => {
    const updated = [...formData.otherServices];
    updated[index] = value;
    setFieldValue("otherServices", updated);
  };

  const removeOtherService = (index) => {
    setFieldValue(
      "otherServices",
      formData.otherServices.filter((_, i) => i !== index)
    );
  };

  const addStandard = (value) => {
    if (!value) return;
    if (!formData.standards.includes(value)) {
      setFieldValue("standards", [...formData.standards, value]);
    }
  };

  const removeStandard = (value) => {
    setFieldValue(
      "standards",
      formData.standards.filter((item) => item !== value)
    );
  };

  const addDateChip = (field, value) => {
    if (!value) return;

    if (value > today) {
      alert("Future dates are not allowed.");
      return;
    }

    if (formData[field].includes(value)) {
      return;
    }

    setFieldValue(field, [...formData[field], value]);
  };

  const removeDateChip = (field, index) => {
    setFieldValue(
      field,
      formData[field].filter((_, i) => i !== index)
    );
  };

  return (
    <StepShell
      title="Services & Certifications"
      stepText="Step 5 of 6"
      activeStep={5}
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
        <h2 className="section-title">Service Offering</h2>
        <p className="section-subtext">Primary Site Service offering</p>

        <div className="mini-tab-row">
          <div className="mini-tab active">All Services</div>
        </div>

        <div className="search-input-wrap">
          <input
            className="search-input"
            placeholder="Search services..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">⌕</span>
        </div>

        <div className="service-grid">
          {Object.keys(filteredServiceCategories).length > 0 ? (
            Object.entries(filteredServiceCategories).map(([category, services]) => (
              <div key={category} className="service-card">
                <div className="service-card-title">{category}</div>

                {services.map((service, index) => (
                  <label key={`${service}-${index}`} className="service-check">
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => toggleService(service)}
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            ))
          ) : (
            <div style={{ fontSize: "12px", color: "#666" }}>
              No matching services found
            </div>
          )}
        </div>

        {errors?.services && <p className="error">{errors.services}</p>}

        <div style={{ marginTop: "14px" }}>
          <button type="button" className="btn-outline" onClick={addOtherService}>
            + Add Other Service
          </button>
        </div>

        {formData.otherServices.length > 0 && (
          <div className="other-service-block">
            <div className="service-card-title" style={{ marginBottom: "10px" }}>
              Other Service
            </div>

            {formData.otherServices.map((service, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "8px",
                  marginBottom: "8px",
                  alignItems: "center",
                }}
              >
                <input
                  className="text-input"
                  placeholder="Specify other service"
                  value={service}
                  onChange={(e) => updateOtherService(index, e.target.value)}
                />
                <button
                  type="button"
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#d33",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                  onClick={() => removeOtherService(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="section-divider-space">
          <h2 className="section-title">Standards to Apply</h2>

          <div className="form-group">
            <select
              className="select-input"
              defaultValue=""
              onChange={(e) => addStandard(e.target.value)}
            >
              <option value="">Select Standard(s)</option>
              {standardOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="tag-row">
            {formData.standards.map((item) => (
              <div key={item} className="review-tag">
                {item}
                <button
                  type="button"
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#285d9b",
                    cursor: "pointer",
                    marginLeft: "4px",
                  }}
                  onClick={() => removeStandard(item)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="two-col section-divider-space">
            <div className="form-group">
              <label className="form-label">
                Expiration Date of Current Stroke Certification
              </label>
              <input
                className="text-input"
                type="date"
                value={formData.expirationDate}
                onChange={(e) => setFieldValue("expirationDate", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Date of Application</label>
              <input
                className="text-input"
                type="date"
                value={formData.applicationDate}
                min={today}
                max={today}
                onChange={(e) => setFieldValue("applicationDate", e.target.value)}
              />
              {errors?.applicationDate && (
                <p className="error">{errors.applicationDate}</p>
              )}
            </div>
          </div>

          <div className="section-divider-space">
            <div className="form-group">
              <label className="form-label">
                Dates of last twenty-five thrombolytic administrations
              </label>
              <input
                className="text-input"
                type="date"
                max={today}
                onChange={(e) => addDateChip("thrombolyticDates", e.target.value)}
              />
              {errors?.thrombolyticDates && (
                <p className="error">{errors.thrombolyticDates}</p>
              )}
            </div>

            <div className="tag-row">
              {formData.thrombolyticDates.map((item, index) => (
                <div key={`${item}-${index}`} className="tag-chip">
                  <span>{item}</span>
                  <button
                    type="button"
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#fff",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    onClick={() => removeDateChip("thrombolyticDates", index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="section-divider-space">
            <div className="form-group">
              <label className="form-label">
                Dates of last fifteen thrombectomies
              </label>
              <input
                className="text-input"
                type="date"
                max={today}
                onChange={(e) => addDateChip("thrombectomyDates", e.target.value)}
              />
              {errors?.thrombectomyDates && (
                <p className="error">{errors.thrombectomyDates}</p>
              )}
            </div>

            <div className="tag-row">
              {formData.thrombectomyDates.map((item, index) => (
                <div key={`${item}-${index}`} className="tag-chip">
                  <span>{item}</span>
                  <button
                    type="button"
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#fff",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    onClick={() => removeDateChip("thrombectomyDates", index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>
    </StepShell>
  );
}

export default Step5ServicesCertifications;