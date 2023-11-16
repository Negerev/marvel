import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <ErrorMessage/>
        <p style={{'marginBottom': '20px', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
        <Link to="/" style={{'display': 'block','textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Back to main page</Link>
    </div>
  )
}

export default Page404;