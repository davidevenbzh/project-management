import { Link } from "react-router";

import { AppButton } from "../../components/Button/AppButton";
import { TextInput } from "../../components/inputs/TextInput/TextInput";
import { Surface } from "../../components/Surface/Surface";

/**
 * Displays the registration page layout.
 */
export function RegistrationPage() {
  return (
    <div className="pm-auth-page__panel">
      <Surface
        accent="primary"
        description="Create your account to access boards, task lists, and release planning views."
        eyebrow="Registration"
        title="Join the workspace"
      >
        <form className="pm-auth-form">
          <TextInput autoComplete="name" fullWidth label="Full name" placeholder="Alex Johnson" />
          <TextInput
            autoComplete="email"
            fullWidth
            label="Email address"
            placeholder="name@company.com"
            type="email"
          />
          <TextInput
            autoComplete="new-password"
            fullWidth
            label="Password"
            placeholder="Create a secure password"
            type="password"
          />
          <div className="pm-auth-form__actions">
            <AppButton fullWidth size="large" type="submit">
              Create account
            </AppButton>
            <div className="pm-auth-links">
              <Link className="pm-auth-link" to="/">
                Back to login
              </Link>
              <Link className="pm-auth-link" to="/forgot-password">
                Need account recovery?
              </Link>
            </div>
          </div>
        </form>
      </Surface>
    </div>
  );
}
