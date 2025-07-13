const Footer = () => {
  return (
    <footer className="bg-black border-t border-green-alpha sticky bottom-0 bg-black">
      <div className="max-w-4xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center text-xs text-gray">
          <span>~/homepage</span>
          <div className="flex space-x-4">
            <span>Uptime: {Math.floor(Date.now() / 1000)} seconds</span>
            <span>Memory: 42MB</span>
            <span>Load: 0.01</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
