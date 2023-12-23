import { useSignIn } from "../../contexts/SignInContext";

function HomePage() {
  const { authResponse } = useSignIn();

  return (
    <div>
      <h1>{authResponse?.username}</h1>
    </div>
  );
}

export default HomePage;
