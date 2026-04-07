import { Link } from "react-router";

import { AppButton } from "../../components/Button/AppButton";
import { TextInput } from "../../components/inputs/TextInput/TextInput";
import { Surface } from "../../components/Surface/Surface";

/**
 * Displays the forgot password page layout.
 */
export function ForgotPasswordPage() {
  return (
    <div className="pm-auth-page__panel">
      <Surface
        accent="secondary"
        description="We will send a password reset link to the address you provide."
        eyebrow="Recovery"
        title="Forgot password"
      >
        <form className="pm-auth-form">
          <TextInput
            autoComplete="email"
            fullWidth
            label="Email address"
            placeholder="name@company.com"
            type="email"
          />
          <div className="pm-auth-form__actions">
            <AppButton fullWidth size="large" type="submit">
              Send reset link
            </AppButton>
            <div className="pm-auth-links">
              <Link className="pm-auth-link" to="/">
                Back to login
              </Link>
              <Link className="pm-auth-link" to="/registration">
                Create an account
              </Link>
            </div>
          </div>
        </form>
      </Surface>
    </div>
  );
}
