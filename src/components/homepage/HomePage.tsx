import { useSignIn } from "../../contexts/SignInContext";

function HomePage() {
  const { authResponse } = useSignIn();

  return (
    <div>
      {authResponse ? (
        <h1>
          Welcome, {authResponse.username}! my number is {authResponse.userid}
        </h1>
      ) : (
        <p>Please sign in to view this page.</p>
      )}
    </div>
  );
}

export default HomePage;
