import AuthForm from '../AuthForm';

export default function AuthFormExample() {
  return (
    <AuthForm
      language="so"
      onLogin={(email, password) => console.log('Login:', email, password)}
      onRegister={(userData) => console.log('Register:', userData)}
      onSocialLogin={(provider) => console.log('Social login:', provider)}
    />
  );
}