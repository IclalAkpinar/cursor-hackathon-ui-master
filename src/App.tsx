import { BrowserRouter } from "react-router-dom";
import "./App.css";
// import { UseGet } from "./hooks";
import * as Routes from "./routes";
// import { Loading } from "./sharedComponent/Loading";

function App() {
  // Geçici olarak login API'si olmadığı için direkt member olarak set ediyoruz
  // Gerçek API hazır olduğunda aşağıdaki kodu uncomment edin
  // const { loading, error, data } = UseGet<{ check: boolean; role: string }>(
  //   "/auth/check"
  // );

  // return (
  //   <>
  //     {loading ? (
  //       <Loading />
  //     ) : (
  //       <BrowserRouter>
  //         <RouteSetter role={error ? "none" : data?.role || "none"} />
  //       </BrowserRouter>
  //     )}
  //   </>
  // );

  // Geçici test için
  return (
    <BrowserRouter>
      <RouteSetter role="member" />
    </BrowserRouter>
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
