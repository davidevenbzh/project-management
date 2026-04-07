import { Link } from "react-router";

import { AppButton } from "../../components/Button/AppButton";
import { TextInput } from "../../components/inputs/TextInput/TextInput";
import { Surface } from "../../components/Surface/Surface";
import { AppText } from "../../components/Text/AppText";

/**
 * Displays the default login experience for the app homepage.
 */
export function LoginPage() {
  return (
    <div className="pm-auth-page__panel">
      <Surface
        accent="primary"
        description="Use your workspace credentials to access the portfolio dashboard."
        eyebrow="Access"
        title="Login"
      >
        <form className="pm-auth-form">
          <TextInput
            autoComplete="email"
            fullWidth
            label="Email address"
            placeholder="name@company.com"
            type="email"
          />
          <TextInput
            autoComplete="current-password"
            fullWidth
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <div className="pm-auth-form__actions">
            <AppButton fullWidth size="large" type="submit">
              Sign in
            </AppButton>
            <div className="pm-auth-form__meta">
              <Link className="pm-auth-link" to="/forgot-password">
                Forgot password?
              </Link>
              <div className="pm-auth-links">
                <AppText tone="muted" variant="body2">
                  New here?
                </AppText>
                <Link className="pm-auth-link" to="/registration">
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </form>
      </Surface>
    </div>
  );
}
