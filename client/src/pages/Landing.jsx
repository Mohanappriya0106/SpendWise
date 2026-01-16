import LandingHeader from "../components/LandingHeader";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <LandingHeader />

      {/* HERO SECTION */}
      {/* HERO SECTION */}
<main className="flex-1">
  <section className="max-w-5xl mx-auto px-6 py-20">
    {/* Hero Text */}
    <div className="text-center space-y-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
        Smarter Personal Finance,
        <br />
        <span className="text-indigo-600">Made Simple</span>
      </h1>

      <p className="text-lg text-slate-600 max-w-2xl mx-auto">
        Track income and expenses, analyze spending patterns,
        and gain complete visibility into your financial life —
        all in one secure dashboard.
      </p>

      <div className="flex justify-center gap-4">
        <a
          href="/register"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Start Free
        </a>

        <a
          href="/login"
          className="border border-slate-300 px-6 py-3 rounded-lg font-medium text-slate-700 hover:bg-slate-100 transition"
        >
          Sign In
        </a>
      </div>
    </div>

    {/* Feature Cards */}
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
      <FeatureCard
        title="Expense Tracking"
        description="Categorize and monitor where your money goes every month."
      />

      <FeatureCard
        title="Income vs Expense Insights"
        description="Visualize financial health with clear charts and summaries."
      />

      <FeatureCard
        title="Smart Summaries"
        description="Monthly and yearly insights to help you plan better."
      />

      <FeatureCard
        title="Secure & Private"
        description="Your data stays protected with modern authentication."
      />
    </div>
  </section>
</main>


      {/* Testimonials Section */}
<section className="mt-24 bg-white py-20 border-t border-slate-100">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <h2 className="text-3xl font-semibold text-slate-900 text-center">
      Trusted by individuals who value clarity
    </h2>

    <p className="mt-3 text-slate-500 text-center max-w-2xl mx-auto">
      SpendWise helps people stay in control of their finances without
      unnecessary complexity.
    </p>

    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Testimonial 1 */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
        <p className="text-slate-700 text-sm leading-relaxed">
          “SpendWise gave me a clear picture of where my money was going.
          The summaries and charts are exactly what I needed.”
        </p>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center font-semibold text-indigo-600">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">
              Ankit Sharma
            </p>
            <p className="text-xs text-slate-500">
              Software Engineer
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
        <p className="text-slate-700 text-sm leading-relaxed">
          “Simple, clean, and secure. I like how the app focuses on insights
          instead of overwhelming features.”
        </p>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center font-semibold text-emerald-600">
            R
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">
              Riya Patel
            </p>
            <p className="text-xs text-slate-500">
              MBA Student
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial 3 */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
        <p className="text-slate-700 text-sm leading-relaxed">
          “The monthly summaries and income-expense comparison helped me
          plan better without spreadsheets.”
        </p>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center font-semibold text-amber-600">
            S
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">
              Suresh Kumar
            </p>
            <p className="text-xs text-slate-500">
              Small Business Owner
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* FOOTER */}
      <footer className="text-center text-sm text-slate-500 py-6 border-t bg-white">
        © {new Date().getFullYear()} SpendWise. Built for better financial clarity.
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
    <h3 className="font-semibold text-slate-900 mb-2">
      {title}
    </h3>
    <p className="text-sm text-slate-600 leading-relaxed">
      {description}
    </p>
  </div>
);


export default Landing;

