import { FC, Fragment } from "react";
import Login from "pages/noAuthor/login";
import { useAuth } from "libs/context/authorityProvider";
import Author from "pages/author";
import { ErrorBoundary } from "components/error/error-boundary";
import { fullPageErrorFallback } from "components/error/fullPageErrorFallBack";
import { useBackground } from "libs/hooks";

import { BrowserRouter } from "react-router-dom";
const App: FC = () => {
  const { user } = useAuth();
  useBackground("#eff3fc");
  return (
    <BrowserRouter>
      <ErrorBoundary fallbackRender={fullPageErrorFallback}>
        <Fragment>{user ? <Author /> : <Login />}</Fragment>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
