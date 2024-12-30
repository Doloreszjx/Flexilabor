import { useState } from 'react';
import Footer from '@/app/components/footer';
import Header from '@/app/components/header';
import PostedJob from '@/app/components/postedjob';
import DashboardAnalytics from '@/app/components/dashboardanalytics';
import TransactionLogs from '@/app/components/transactionlogs';
import { auth } from '@/app/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import ErrorPage from './errorPage';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedUser] = useAuthState(auth)

  const activeTabContent = () => {
    switch (activeTab) {
      case "transaction":
        return <TransactionLogs />;
      case "postedJobs":
        return <PostedJob />;
      case "dashboard":
        return <DashboardAnalytics />;
      default:
        return <DashboardAnalytics />;
    }
  };
  if (!loggedUser) return <ErrorPage />;
  return (
    <div className="bg-blue-50">
      <Header />
      {loggedUser && <div className="flex py-12 px-8 container max-w-screen-xl mx-auto">
        <button
          className="md:hidden  h-[250px] block text-[#01ABF0] p-3"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          &nbsp; <svg className='h-3 w-3text-gray-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" /></svg>
        </button>

        <aside onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`fixed md:static z-50 md:z-auto bg-white min-h-[450] md:min-h-full md:w-auto w-72 p-6 border  shadow-lg  rounded-2xl transition-transform transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center space-x-3 px-4 py-2 w-full rounded-lg ${activeTab === "dashboard"
                ? "bg-blue-50"
                : "hover:bg-[#01ABF0] hover:text-white"
                }`}
            >
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("transaction")}
              className={`flex items-center space-x-3 px-4 py-2 w-full rounded-lg ${activeTab === "transaction"
                ? "bg-blue-50"
                : "hover:bg-[#01ABF0] hover:text-white"
                }`}
            >
              <span>Transaction Logs</span>
            </button>
            <button
              onClick={() => setActiveTab("postedJobs")}
              className={`flex items-center space-x-3 px-4 py-2 w-full rounded-lg ${activeTab === "postedJobs"
                ? "bg-blue-50"
                : "hover:bg-[#01ABF0] hover:text-white"
                }`}
            >
              <span>Posted Jobs</span>
            </button>
          </nav>
        </aside>

        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-25 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}

        <main className="flex-1 bg-blue-50 ml-0 md:ml-6">
          {activeTabContent()}
        </main>
      </div>}
      <Footer />
    </div>
  );
}
