import Sidebar from './Sidebar';

const DashboardLayout = ({ children, title, subtitle }) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <main className="flex-1 ml-64 min-h-screen">
      <div className="p-8 max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="mb-8">
            {title && <h1 className="section-title">{title}</h1>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        <div className="animate-fade-in">{children}</div>
      </div>
    </main>
  </div>
);

export default DashboardLayout;
