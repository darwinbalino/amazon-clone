import { Provider as AuthProvider } from "next-auth/client";
import { Provider } from "react-redux";
import "tailwindcss/tailwind.css";
import { store } from "../stores/store";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />;
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
