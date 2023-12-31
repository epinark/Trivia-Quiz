const StartAnimation = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="border-t-4 border-gray-500 rounded-full animate-spin h-14 w-14"></div>
        <span className="ml-3 pt-4 text-gray-500 text-lg">Loading...</span>
      </div>
    </div>
  );
};

export default StartAnimation;
