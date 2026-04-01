export default function RegisterForm() {
  return (
    <div>
      <h2>Register</h2>
      <form>
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}