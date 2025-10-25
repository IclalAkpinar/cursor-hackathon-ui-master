import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { UseGet } from "./hooks";
import * as Routes from "./routes";
import { Loading } from "./sharedComponent/Loading";

function App() {
  // Authentication kontrolü - backend'den kullanıcı durumunu kontrol et
  const { loading, error, data } = UseGet<{ check: boolean; role: string }>(
    "/auth/check"
  );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <RouteSetter role={error ? "none" : data?.role || "none"} />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;

const RouteSetter = ({ role }: { role: string }) => {
  switch (role) {
    case "none":
      return <Routes.NoneRouter />;
  
    case "member":
      return <Routes.MemberRouter />;
  
    default:
      return <></>;
  }
};
