const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to StudyConnect</h1>
      <p className="mt-4 text-lg text-gray-700">Your virtual study platform</p>
      <a href="/login" className="px-4 py-2 mt-6 text-white bg-blue-600 rounded hover:bg-blue-700">
        Get Started
      </a>
    </div>
  );
};

export default Home;
