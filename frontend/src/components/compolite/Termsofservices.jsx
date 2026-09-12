const Termsofservices = () => {


  return (
    <div className="terms-page">
      <div className="terms-container">
        {/* Header */}
        <div className="terms-card">
          <div className="terms-header">
            <div className="terms-icon">📜</div>
            <h1 className="terms-title">Terms of Service</h1>
            <p className="terms-subtitle">
              Please read these terms carefully before using JobPortal.
            </p>
            <p className="terms-updated">Last Updated: August 2026</p>
          </div>
        </div>

        {/* Introduction */}
        <div className="terms-card terms-card--soft">
          <p className="terms-text">
            Welcome to <strong>JobPortal</strong>. By accessing or using our
            platform, you agree to comply with and be bound by these Terms of
            Service. If you do not agree with any part of these terms, please do
            not use our services.
          </p>
        </div>

        {/* Section 1 */}
        <section className="terms-card terms-card--soft">
          <h2 className="terms-section-title">1. Acceptance of Terms</h2>
          <p className="terms-text">
            By creating an account, browsing jobs, applying for positions, or
            using any feature of JobPortal, you acknowledge that you have read,
            understood, and agreed to these Terms of Service.
          </p>
        </section>

        {/* Section 2 */}
        <section className="terms-card terms-card--soft">
          <h2 className="terms-section-title">
            2. User Responsibilities
          </h2>
          <ul className="terms-list">
            <li>Provide accurate and up-to-date information.</li>
            <li>Maintain the confidentiality of your account.</li>
            <li>Use the platform lawfully and responsibly.</li>
            <li>Respect the rights of other users and employers.</li>
            <li>Do not engage in fraudulent activities.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="terms-card terms-card--soft">
          <h2 className="terms-section-title">3. Account Registration</h2>
          <p className="terms-text">
            You may be required to create an account to access certain
            services. You are responsible for safeguarding your login
            credentials and for all activities conducted under your account.
          </p>
        </section>

        {/* Section 4 */}
        <section className="terms-card terms-card--soft">
          <h2 className="terms-section-title">4. Job Applications</h2>
          <p className="terms-text">
            JobPortal acts as a bridge between job seekers and employers. We do
            not guarantee employment, interview opportunities, or the accuracy of
            job postings submitted by employers.
          </p>
        </section>

        {/* Section 5 */}
        <section className="terms-card terms-card--soft">
          <h2 className="terms-section-title">
            5. Prohibited Activities
          </h2>
          <ul className="terms-list">
            <li>Posting false or misleading information.</li>
            <li>Attempting unauthorized access to accounts.</li>
            <li>Uploading malicious software or harmful content.</li>
            <li>Violating intellectual property rights.</li>
            <li>Using the platform for unlawful purposes.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="terms-card terms-card--soft">
          <h2 className="terms-section-title">6. Intellectual Property</h2>
          <p className="terms-text">
            All content, branding, logos, designs, and materials on JobPortal are
            protected by intellectual property laws and may not be copied,
            distributed, or reused without permission.
          </p>
        </section>

        {/* Section 7 */}
        <section className="terms-card terms-card--soft">
          <h2 className="terms-section-title">
            7. Limitation of Liability
          </h2>
          <p className="terms-text">
            JobPortal shall not be liable for any direct, indirect, incidental,
            or consequential damages resulting from the use or inability to use
            our services.
          </p>
        </section>

        {/* Section 8 */}
        <section className="terms-card terms-card--soft">
          <h2 className="terms-section-title">8. Termination</h2>
          <p className="terms-text">
            We reserve the right to suspend or terminate accounts that violate
            these Terms of Service or engage in activities harmful to the platform
            or its users.
          </p>
        </section>

        {/* Section 9 */}
        <section className="terms-card terms-card--soft">
          <h2 className="terms-section-title">9. Changes to Terms</h2>
          <p className="terms-text">
            We may update these Terms of Service from time to time. Any changes
            will be posted on this page, and continued use of the platform
            constitutes acceptance of the updated terms.
          </p>
        </section>

        {/* Contact */}
        <section className="terms-contact">
          <h2>Contact Us</h2>
          <div className="terms-text" style={{ color: "#fff" }}>
            <p>📧 support@jobportal.com</p>
            <p>📞 +91 XXXXX XXXXX</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Termsofservices;

