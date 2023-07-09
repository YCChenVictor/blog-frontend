const Navigation = () => {
  return (
    <nav className="flex flex-wrap items-center justify-center px-2 py-4 mb-6">
      <div className="absolute left-0 top-0">
        <a href="/blog/" className="!px-0 !py-0">
          <img className="p-4 w-24 rounded-full" src={`../assets/img/title.jpeg`} alt="title image" />
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
  