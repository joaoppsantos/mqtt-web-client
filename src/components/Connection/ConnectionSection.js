export const ConnectionSection = ({
  setHostname,
  setUsername,
  setPassword,
  hostname,
  username,
  password,
}) => (
  <>
    <h3>Connection</h3>
    <form>
      <label>
        HOSTNAME:
        <input
          className="label"
          type="text"
          value={hostname}
          onChange={(e) => setHostname(e.target.value)}
        />
      </label>
      <br />
      <label>
        USERNAME:
        <input
          className="label"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        PASSWORD:
        <input
          className="label"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
    </form>
  </>
);
