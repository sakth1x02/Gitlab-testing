"use client";
export const dynamic = "force-static"; 
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getSeoFromLambda } from "@/app/api/seoApi";
import { CheckCircle, Shield, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthPage() {
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordSignup, setShowPasswordSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const json = { type: "CHECK_USER", data: loginData };
    let Account_Status = await getSeoFromLambda(json);
    if ( Account_Status.data.body.statuscode == 200) {
      localStorage.setItem("adminAuth", "true");
      localStorage.setItem(
        "adminUser",
        JSON.stringify({
          name: "Admin User",
          email: loginData.email,
        })
      );

      toast({
        title: "Welcome Back!",
        description: "Successfully logged into HADS Admin Dashboard",
      });
      router.push("/admin/seo");
    } else {
      toast({
        title: "Authentication Failed",
        description: Account_Status.data.body.bodymsg,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please ensure both passwords match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    const json = { type: "CREATE_ACCOUNT", data: signupData };
    let Account_Status = await getSeoFromLambda(json);
    console.log("Account_Status", Account_Status.data.body.statuscode);
    if (Account_Status.data.body.statuscode == 200) {
      if (signupData.name && signupData.email && signupData.password) {
        localStorage.setItem("adminAuth", "true");
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            name: signupData.name,
            email: signupData.email,
          })
        );
        toast({
          title: "Account Created Successfully!",
          description: "Welcome to HADS Admin Dashboard",
        });
        router.push("/admin/seo");
      }
      setIsLoading(false);
    } else {
      toast({
        title: "Error",
        description: Account_Status.data.body.bodymsg,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center z-10">
        {/* Left Branding */}
        <div className="hidden lg:flex flex-col justify-center px-6">
          <div className="space-y-4">
            <div className="relative w-[460px] h-[180px]">
              <Image
                src="/images/hads-logo.png"
                alt="HADS TechNovations Admin"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 leading-tight">
              Manage Your Cloud Infrastructure with{" "}
              <span className="bg-gradient-to-r from-hads-purple to-hads-teal bg-clip-text text-transparent">
                Confidence
              </span>
            </h2>
            <p className="text-base text-gray-600">
              Access tools to monitor, secure, and optimize your cloud services
              with enterprise-grade performance.
            </p>
            <div className="space-y-3">
              {[
                "Real-time Infrastructure Monitoring",
                "Advanced Security Analytics",
                "Automated Compliance Reporting",
                "24/7 System Health Tracking",
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Auth Form */}
        <div className="w-full max-w-md mx-auto px-4">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-6">
            <div className="relative w-full max-w-[320px] h-[120px] mx-auto">
              <Image
                src="/images/hads-logo.png"
                alt="HADS TechNovations Admin"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mt-4">HADS Admin Portal</h1>
            <p className="text-sm text-gray-600">Secure access to your dashboard</p>
          </div>

          {/* Card Container */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl text-gray-800 font-bold">Welcome Back</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Sign in or create a new admin account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                {/* Tabs */}
                <TabsList className="grid grid-cols-2 bg-gray-100 rounded-md overflow-hidden mb-5">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-white data-[state=active]:shadow text-sm font-semibold"
                  >
                    Sign In
                  </TabsTrigger>

                  <div
                    className="flex items-center justify-center text-sm font-semibold text-gray-400 cursor-not-allowed"
                    title="Contact the Administrator for the Create the Account"
                  >
                    Create Account
                  </div>
                </TabsList>

                {/* Login Form */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="relative">
                      <Label htmlFor="login-email">Email Address</Label>
                      <Mail className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="admin@hads.com"
                        className="pl-10 h-10"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="relative">
                      <Label htmlFor="login-password">Password</Label>
                      <Lock className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPasswordLogin ? "text" : "password"}
                        placeholder="Enter password"
                        className="pl-10 pr-10 h-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-9 text-gray-400"
                        onClick={() => setShowPasswordLogin(!showPasswordLogin)}
                      >
                        {showPasswordLogin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        Remember me
                      </label>
                      {/* <button type="button" className="text-hads-purple hover:underline">Forgot password?</button> */}
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-10 bg-gradient-to-r from-hads-purple to-hads-teal text-white font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Signing In...</span>
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* Signup Form (if ever re-enabled) */}
                {/* ... keep as is */}
              </Tabs>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-6 space-y-1 text-xs text-gray-500">
            <p>© 2024 HADS Technovations LLP. All rights reserved.</p>
            <div className="flex justify-center space-x-3">
              <button className="hover:text-gray-600">Privacy</button>
              <span>•</span>
              <button className="hover:text-gray-600">Terms</button>
              <span>•</span>
              <button className="hover:text-gray-600">Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
