import LandingHeader from "../components/LandingHeader";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <LandingHeader />

      {/* HERO SECTION */}
      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          {/* Hero Text */}
          <div className="text-center space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 leading-snug sm:leading-tight">
              Smarter Personal Finance,
              <br className="hidden sm:block" />
              <span className="text-indigo-600"> Made Simple</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Track income and expenses, analyze spending patterns,
              and gain complete visibility into your financial life —
              all in one secure dashboard.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <link
                to="/register"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Start Free
              </link>
              <link
                to="/login"
                className="border border-slate-300 px-6 py-3 rounded-lg font-medium text-slate-700 hover:bg-slate-100 transition"
              >
                Sign In
              </link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
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
      <section className="bg-white py-12 sm:py-20 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 text-center">
            Trusted by individuals who value clarity
          </h2>

          <p className="mt-2 sm:mt-3 text-slate-500 text-center max-w-2xl mx-auto">
            SpendWise helps people stay in control of their finances without
            unnecessary complexity.
          </p>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            <Testimonial
              text="SpendWise gave me a clear picture of where my money was going. The summaries and charts are exactly what I needed."
              name="Ankit Sharma"
              role="Software Engineer"
              accent="indigo"
              initial="A"
            />

            <Testimonial
              text="Simple, clean, and secure. I like how the app focuses on insights instead of overwhelming features."
              name="Riya Patel"
              role="MBA Student"
              accent="emerald"
              initial="R"
            />

            <Testimonial
              text="The monthly summaries and income-expense comparison helped me plan better without spreadsheets."
              name="Suresh Kumar"
              role="Small Business Owner"
              accent="amber"
              initial="S"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-xs sm:text-sm text-slate-500 py-4 sm:py-6 border-t bg-white">
        © {new Date().getFullYear()} SpendWise. Built for better financial clarity.
        <br />
        <a
          href="https://storyset.com/online"
          className="hover:underline"
        >
          Online illustrations by Storyset
        </a>
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition">
    <h3 className="font-semibold text-slate-900 mb-2">
      {title}
    </h3>
    <p className="text-sm text-slate-600 leading-relaxed">
      {description}
    </p>
  </div>
);

const Testimonial = ({ text, name, role, initial, accent }) => (
  <div className="bg-slate-50 rounded-xl p-5 sm:p-6 border border-slate-100">
    <p className="text-slate-700 text-sm leading-relaxed">
      “{text}”
    </p>

    <div className="mt-4 flex items-center gap-3">
      <div
        className={`h-9 w-9 rounded-full bg-${accent}-100 flex items-center justify-center font-semibold text-${accent}-600`}
      >
        {initial}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-900">{name}</p>
        <p className="text-xs text-slate-500">{role}</p>
      </div>
    </div>
  </div>
);

export default Landing;


