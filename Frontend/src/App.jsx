/* 
RouterProvider is a component from React Router. It helps React understand:
which page/component to show
based on the URL/path
*/

import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { InterviewProvider } from "./features/interview/interview.context.jsx";

function App() {
  return (
    <InterviewProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </InterviewProvider>
  );
}

export default App;
