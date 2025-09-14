import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, User, Mail, Lock, BookOpen, PenTool } from 'lucide-react';

interface AuthFormProps {
  language?: 'so' | 'en';
  onLogin?: (email: string, password: string) => void;
  onRegister?: (userData: RegisterData) => void;
  onSocialLogin?: (provider: 'google' | 'github' | 'replit') => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'instructor';
  acceptTerms: boolean;
}

export default function AuthForm({
  language = 'so',
  onLogin = () => {},
  onRegister = () => {},
  onSocialLogin = () => {}
}: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    role: 'student',
    acceptTerms: false
  });

  const handleLogin = () => {
    if (loginData.email && loginData.password) {
      onLogin(loginData.email, loginData.password);
      console.log('Login attempted:', loginData.email);
    }
  };

  const handleRegister = () => {
    if (registerData.name && registerData.email && registerData.password && registerData.acceptTerms) {
      onRegister(registerData);
      console.log('Register attempted:', registerData);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'github' | 'replit') => {
    onSocialLogin(provider);
    console.log('Social login:', provider);
  };

  const texts = {
    so: {
      login: "Gal",
      register: "Iska qor",
      welcome: "Soo dhaweyn",
      createAccount: "Abuur akoon cusub",
      loginDescription: "Gal akoonkaaga si aad u gashid koorsadaada",
      registerDescription: "Abuur akoon cusub si aad u bilaawto barashada",
      name: "Magaca oo dhan",
      email: "Emayl",
      password: "Furaha",
      confirmPassword: "Xaqiji furaha",
      role: "Doorka",
      student: "Arday",
      instructor: "Macalin",
      acceptTerms: "Waan aqbalay shuruudaha iyo qaynuunka",
      loginButton: "Gal",
      registerButton: "Abuur akoon",
      forgotPassword: "Ma ilowday furaha?",
      orContinueWith: "Ama ku sii wad",
      alreadyHaveAccount: "Akoon ma hayday?",
      dontHaveAccount: "Akoon ma lihid?",
      loginHere: "Halkan ka gal",
      registerHere: "Halkan ka qor",
      withGoogle: "Google",
      withGithub: "GitHub",
      withReplit: "Replit"
    },
    en: {
      login: "Sign In",
      register: "Sign Up",
      welcome: "Welcome back",
      createAccount: "Create new account",
      loginDescription: "Sign in to your account to access your courses",
      registerDescription: "Create a new account to start learning",
      name: "Full name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      role: "Role",
      student: "Student", 
      instructor: "Instructor",
      acceptTerms: "I accept the terms and privacy policy",
      loginButton: "Sign In",
      registerButton: "Create Account",
      forgotPassword: "Forgot password?",
      orContinueWith: "Or continue with",
      alreadyHaveAccount: "Already have an account?",
      dontHaveAccount: "Don't have an account?",
      loginHere: "Sign in here",
      registerHere: "Sign up here",
      withGoogle: "Google",
      withGithub: "GitHub", 
      withReplit: "Replit"
    }
  };

  const text = texts[language];

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs defaultValue="login" className="w-full">
        <CardHeader>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger data-testid="tab-login" value="login">
              {text.login}
            </TabsTrigger>
            <TabsTrigger data-testid="tab-register" value="register">
              {text.register}
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <TabsContent value="login">
          <CardHeader className="space-y-1 pt-0">
            <CardTitle className="text-2xl">{text.welcome}</CardTitle>
            <CardDescription>{text.loginDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{text.email}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  data-testid="input-login-email"
                  type="email"
                  placeholder={text.email}
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">{text.password}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  data-testid="input-login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={text.password}
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button 
              data-testid="button-login-submit"
              onClick={handleLogin}
              className="w-full"
            >
              {text.loginButton}
            </Button>

            <div className="text-center">
              <Button variant="ghost" size="sm">
                {text.forgotPassword}
              </Button>
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="register">
          <CardHeader className="space-y-1 pt-0">
            <CardTitle className="text-2xl">{text.createAccount}</CardTitle>
            <CardDescription>{text.registerDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{text.name}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  data-testid="input-register-name"
                  placeholder={text.name}
                  value={registerData.name}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{text.email}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  data-testid="input-register-email"
                  type="email"
                  placeholder={text.email}
                  value={registerData.email}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">{text.password}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  data-testid="input-register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={text.password}
                  value={registerData.password}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{text.role}</label>
              <Select 
                value={registerData.role} 
                onValueChange={(value: 'student' | 'instructor') => 
                  setRegisterData(prev => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger data-testid="select-register-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {text.student}
                    </div>
                  </SelectItem>
                  <SelectItem value="instructor">
                    <div className="flex items-center gap-2">
                      <PenTool className="w-4 h-4" />
                      {text.instructor}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                data-testid="checkbox-accept-terms"
                id="terms"
                checked={registerData.acceptTerms}
                onCheckedChange={(checked) => 
                  setRegisterData(prev => ({ ...prev, acceptTerms: !!checked }))
                }
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {text.acceptTerms}
              </label>
            </div>

            <Button 
              data-testid="button-register-submit"
              onClick={handleRegister}
              className="w-full"
              disabled={!registerData.acceptTerms}
            >
              {text.registerButton}
            </Button>
          </CardContent>
        </TabsContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {text.orContinueWith}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full">
            <Button 
              data-testid="button-google-login"
              variant="outline" 
              onClick={() => handleSocialLogin('google')}
            >
              {text.withGoogle}
            </Button>
            <Button 
              data-testid="button-github-login"
              variant="outline" 
              onClick={() => handleSocialLogin('github')}
            >
              {text.withGithub}
            </Button>
            <Button 
              data-testid="button-replit-login"
              variant="outline" 
              onClick={() => handleSocialLogin('replit')}
            >
              {text.withReplit}
            </Button>
          </div>
        </CardFooter>
      </Tabs>
    </Card>
  );
}