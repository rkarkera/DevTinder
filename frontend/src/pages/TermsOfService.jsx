const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <p className="mb-4">
        By using DevTinder, you agree to comply with these terms.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Eligibility</h2>
      <p>You must be at least 18 years old to use this platform.</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">User Conduct</h2>
      <ul className="list-disc ml-6">
        <li>No fake profiles</li>
        <li>No harassment or abuse</li>
        <li>No unlawful content</li>
        <li>No unauthorized access attempts</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4 mb-2">
        Account Suspension
      </h2>
      <p>
        We reserve the right to suspend accounts that violate these terms.
      </p>
    </div>
  );
};

export default TermsOfService;