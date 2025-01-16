const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-700">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="px-4 py-2 mt-6 text-white bg-red-600 rounded hover:bg-red-700">
        Go Home
      </a>
    </div>
  );
};

export default NotFound;
