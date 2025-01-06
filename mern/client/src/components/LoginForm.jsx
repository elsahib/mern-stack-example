import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    navigate('/records');
  };

  return (
    <div className=" flex items-center justify-center h-screen" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="card shadow-lg h-96" style={{ minWidth: "400px", maxWidth: "800px" }}>
        <div className="text-3xl md:text-4xl font-semibold text-black text-center py-3">
          <h3 >{isLogin ? 'Login' : 'Sign Up'}</h3>
        </div>
        <div className="card-body p-4 max-h-60">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="w-full px-3 dark:text-gray-900 dark:bg-gray-200 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                id="email"
                value={form.email}
                onChange={(e) => updateForm({ email: e.target.value })}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="w-full px-3 dark:text-gray-900 dark:bg-gray-200 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                id="password"
                value={form.password}
                onChange={(e) => updateForm({ password: e.target.value })}
                placeholder="Enter password"
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="inline-flex items-center justify-center border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition transform hover:translate-y-[-2px] hover:shadow-md">
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="btn btn-link text-decoration-none"
            >
              {isLogin ? <p>Need an account? <a class="text-red-500 hover:underline"href="#">Sign up</a></p> : <p>Already have an account? <a class="text-red-500 hover:underline"href="#">Login</a></p>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
