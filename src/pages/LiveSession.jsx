import  { useState } from 'react';

function LiveSession() {
  const [meetingCode, setMeetingCode] = useState('');
  const [zoomLink, setZoomLink] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const startLiveSession = () => {
    const code = generateRandomCode();
    setMeetingCode(code);
    setZoomLink('https://zoom.us/fr/signin#/login');
    setShowDetails(true);
  };

  const generateRandomCode = () => {
    let code = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 10; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-purple-700 mb-4">Live Sessions</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="text-gray-600 mb-4">Click the button below to start a live session. A meeting code will be generated, and you can join the session using a Zoom account.</p>
        <button className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-900 mt-4" onClick={startLiveSession}>
          Start Live Session
        </button>
        {showDetails && (
          <div className="mt-6">
            <p className="text-purple-700 font-bold">Meeting Code: <span>{meetingCode}</span></p>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mt-4">
              <a id="zoom-link" href={zoomLink} target="_blank" rel="noopener noreferrer">Join Live Session</a>
            </button>
          </div>
        )}
      </div>
      <footer className="mt-8 text-center">
        <div className="flex justify-center space-x-4">
          <a href="https://github.com/josedekajos" target="_blank" className="text-white">GitHub</a>
          <a href="https://www.linkedin.com/imele-azafa-jose-de-kajos" target="_blank" className="text-white">LinkedIn</a>
          <a href="https://www.tiaga.com/josedekajos" target="_blank" className="text-white">Tiaga</a>
          <a href="mailto:josedekajos@gmail.com" target="_blank" className="text-white">Email</a>
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4" onClick={() => document.getElementById('aboutUsModal').style.display = 'flex'}>
          About Us
        </button>
      </footer>
      <div id="aboutUsModal" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" style={{ display: 'none' }}>
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4">About Us</h3>
          <div>
            <div><strong>Imele Azafa</strong><br />Super handsome</div>
            <div><strong>Funwi Kelsea</strong><br />Super intelligent</div>
            <div><strong>Matike Frederic</strong><br />Super serious</div>
            <div><strong>GUimazue Danielle</strong><br />Super jocking</div>
            <div><strong>Itie Lloyd</strong><br />Super black</div>
          </div>
          <button className="bg-red-500 text-white py-2 px-4 rounded mt-4" onClick={() => document.getElementById('aboutUsModal').style.display = 'none'}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default LiveSession;