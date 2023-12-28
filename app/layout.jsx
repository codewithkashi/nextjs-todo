import "@styles/globals.css";
import Header from "./header";
import { ContextProvider } from "@components/clients";
export const metadata = {
  title: "Next Todo",
  description: "Keep your tasks ",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <>
            {" "}
            <Header />
            {children}
          </>
        </ContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
