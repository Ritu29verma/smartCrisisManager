export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <a 
          href="/" 
          className="px-6 py-3 bg-crisis-primary text-white rounded-lg hover:bg-opacity-80 transition-colors duration-200"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}