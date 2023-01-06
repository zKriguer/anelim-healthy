import LoginForm from "../components/LoginForm";

function Home() {
  return (
    <>
      <div className="bg-white rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] max-h-[85vh] py-10 px-14">
        <LoginForm />
      </div>
    </>
  );
}

export default Home;
