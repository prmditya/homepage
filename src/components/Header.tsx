const Header = () => {
  return (
    <header className="bg-black border-b border-green-alpha">
      <div className="max-w-4xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <span className="text-green text-sm">[prmditya@homepage ~]$</span>
          <div className="flex items-center space-x-4 text-xs text-gray">
            <span>TTY1</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
