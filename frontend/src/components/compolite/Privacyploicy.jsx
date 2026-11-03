import React from "react";

const Privacypolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">


        <div className="bg-white rounded-3xl shadow-lg border border-blue-100 p-10 text-center mb-6">
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-4xl">🔒</span>
            </div>
          </div>

          <h1 className="text-5xl font-bold text-blue-800 mb-3">
            Privacy Policy
          </h1>

          <p className="text-gray-600 text-lg">
            Your privacy and data security are important to us.
          </p>

          <p className="mt-4 text-blue-600 font-semibold">
            Last Updated: August 2026
          </p>
        </div>


        <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6 text-center mb-6">
          <p className="text-gray-700 leading-8">
            Welcome to{" "}
            <span className="font-semibold text-blue-700">
              JobPortal
            </span>
            . We value your privacy and are committed to protecting your
            personal information. This Privacy Policy explains how we
            collect, use, and safeguard your information when you use our
            platform.
          </p>
        </div>


        <section className="bg-white rounded-2xl shadow-md border border-blue-100 p-8 text-center mb-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">
            1. Information We Collect
          </h2>

          <ul className="space-y-4 text-gray-700">
            <li>✅ Full Name</li>
            <li>✅ Email Address</li>
            <li>✅ Phone Number</li>
            <li>✅ Resume / CV</li>
            <li>✅ Education Details</li>
            <li>✅ Work Experience</li>
            <li>✅ Skills & Certifications</li>
          </ul>
        </section>


        <section className="bg-white rounded-2xl shadow-md border border-blue-100 p-8 text-center mb-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">
            2. How We Use Your Information
          </h2>

          <ul className="space-y-4 text-gray-700">
            <li>Create and manage user accounts.</li>
            <li>Help employers find suitable candidates.</li>
            <li>Send job alerts and notifications.</li>
            <li>Improve platform performance and user experience.</li>
            <li>Ensure platform security and prevent fraud.</li>
          </ul>
        </section>


        <section className="bg-white rounded-2xl shadow-md border border-blue-100 p-8 text-center mb-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">
            3. Information Sharing
          </h2>

          <p className="text-gray-700 leading-8">
            We may share your information with employers when you apply
            for jobs. We do not sell your personal information to third
            parties.
          </p>
        </section>


        <section className="bg-white rounded-2xl shadow-md border border-blue-100 p-8 text-center mb-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">
            4. Data Security
          </h2>

          <p className="text-gray-700 leading-8">
            We implement industry-standard security measures to protect
            your data. However, no online platform can guarantee complete
            security.
          </p>
        </section>


        <section className="bg-white rounded-2xl shadow-md border border-blue-100 p-8 text-center mb-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">
            5. Cookies
          </h2>

          <p className="text-gray-700 leading-8">
            We use cookies to enhance user experience, analyze traffic,
            and improve our services.
          </p>
        </section>


        <section className="bg-white rounded-2xl shadow-md border border-blue-100 p-8 text-center mb-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">
            6. Your Rights
          </h2>

          <ul className="space-y-4 text-gray-700">
            <li>Access your personal data.</li>
            <li>Update your profile information.</li>
            <li>Delete your account.</li>
            <li>Opt out of marketing emails.</li>
          </ul>
        </section>


        <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-3xl shadow-xl p-10 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Contact Us
          </h2>

          <div className="space-y-3 text-lg">
            <p>📧 support@jobportal.com</p>
            <p>📞 +91 XXXXX XXXXX</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Privacypolicy;