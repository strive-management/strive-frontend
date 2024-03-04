import { Link } from "react-router-dom";

export default function Login() {
    return (
        <>
        <div>
            <h3>Login</h3>
            <form>
                <input type="email" placeholder="email" />
                <input type="password" />
                <button type="submit">Login</button>
            </form>
            <Link to="/register" />
        </div>
        </>
    )
}