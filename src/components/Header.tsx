export default function Header() {
  return (
    <>
      <nav>
        <div className="flex flex-row place-content-start pl-[300px] items-center bg-gray-300 dark:bg-[#1a0429]/80 w-full h-20">
          <h1
            style={{ fontFamily: "'Lato', sans-serif" }}
            className="text-gray-300 text-xl place-content-center"
          >
            Dashboard
          </h1>
        </div>
      </nav>
    </>
  );
}
